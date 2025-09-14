export class AppError extends Error {
  public readonly status: number
  public readonly code: string
  public readonly details?: unknown

  constructor(message: string, options?: { status?: number; code?: string; details?: unknown }) {
    super(message)
    this.name = 'AppError'
    this.status = options?.status ?? 500
    this.code = options?.code ?? 'INTERNAL'
    this.details = options?.details
  }
}


