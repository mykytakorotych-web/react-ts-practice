import axios, { AxiosError } from "axios"
import Cookies from "js-cookie"
import { router } from "../main"

export const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
})

// === МАГИЯ ОЧЕРЕДИ ===
// Флаг: обновляем ли мы токен прямо сейчас?
let isRefreshing = false
// Массив (очередь) для запросов, которые ждут новый токен
interface QueueItem {
  // resolve принимает строку (наш новый токен) или null
  resolve: (value: string | null) => void
  // reject принимает ошибку (обычно это AxiosError или дефолтный Error)
  reject: (reason?: AxiosError | Error) => void
}

// 2. Типизируем сам массив
let failedQueue: QueueItem[] = []

// 3. Типизируем функцию
// Ошибка может быть null (если рефреш успешен), а токен - строкой (если успешен)
const processQueue = (
  error: AxiosError | Error | null,
  token: string | null = null,
): void => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  // Очищаем очередь после раздачи токенов/ошибок
  failedQueue = []
}

// === ПЕРЕХВАТЧИКИ ===
apiClient.interceptors.request.use(config => {
  const token = Cookies.get("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      // 1. ЕСЛИ КТО-ТО УЖЕ ПОШЕЛ ЗА ТОКЕНОМ...
      if (isRefreshing) {
        // ...мы не делаем еще один рефреш.
        // Возвращаем новый Промис, который "зависает" и попадает в очередь.
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then(token => {
            // Когда processQueue вызовет resolve(token), этот код разморозится!
            originalRequest.headers.Authorization = `Bearer ${token}`
            return apiClient(originalRequest) // Повторяем запрос
          })
          .catch(err => {
            return Promise.reject(err)
          })
      }

      // 2. ЕСЛИ МЫ ПЕРВЫЕ (Никто еще не пошел за токеном)
      originalRequest._isRetry = true
      isRefreshing = true // Вешаем табличку "Ушел за токеном"

      try {
        const refreshToken = Cookies.get("refreshToken")
        if (!refreshToken) throw new Error("Нет refresh токена")

        // Делаем чистый запрос без перехватчиков
        const { data } = await axios.post(
          "https://dummyjson.com/auth/refresh",
          {
            refreshToken: refreshToken,
            expiresInMins: 60,
          },
        )

        // Сохраняем новые токены
        Cookies.set("token", data.accessToken, { secure: true })
        Cookies.set("refreshToken", data.refreshToken, { secure: true })

        // 👇 РАЗДАЕМ ТОКЕН ВСЕМ ЖДУЩИМ В ОЧЕРЕДИ
        processQueue(null, data.accessToken)

        // Повторяем наш самый первый запрос
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        const safeError = axios.isAxiosError(refreshError)
          ? refreshError
          : new Error(String(refreshError))

        processQueue(safeError, null)

        Cookies.remove("token")
        Cookies.remove("refreshToken")
        router.navigate({ to: "/login" })

        return Promise.reject(refreshError)
      } finally {
        // В самом конце, независимо от успеха или провала, снимаем табличку
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)
