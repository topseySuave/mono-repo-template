import type { Response } from 'express'

export type ApiSuccess<T> = {
  success: true
  data: T
}

export type ApiError = {
  success: false
  error: {
    code: string
    message: string
    details?: unknown
  }
}

export class Send {
  static Ok<T>(res: Response, data: T) {
    const body: ApiSuccess<T> = { success: true, data }
    return res.status(200).json(body)
  }

  static Created<T>(res: Response, data: T) {
    const body: ApiSuccess<T> = { success: true, data }
    return res.status(201).json(body)
  }

  static BadRequest(res: Response, message: string, details?: unknown) {
    const body: ApiError = { success: false, error: { code: 'BAD_REQUEST', message, details } }
    return res.status(400).json(body)
  }

  static NotFound(res: Response, message = 'Not found') {
    const body: ApiError = { success: false, error: { code: 'NOT_FOUND', message } }
    return res.status(404).json(body)
  }

  static ServerError(res: Response, message = 'Internal server error', details?: unknown) {
    const body: ApiError = { success: false, error: { code: 'INTERNAL', message, details } }
    return res.status(500).json(body)
  }
}


