type ToastType = "success" | "error" | "info"

interface Toast {
  id: number
  message: string
  type: ToastType
  duration: number
}
