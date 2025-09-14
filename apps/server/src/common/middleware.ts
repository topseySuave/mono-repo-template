import type { NextFunction, Request, Response } from 'express'
import { ZodError, AnyZodObject } from 'zod'
import { AppError } from './errors'
import { Send } from './http'

export function validate({ body, params, query }: { body?: AnyZodObject; params?: AnyZodObject; query?: AnyZodObject }) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (body) req.body = body.parse(req.body)
      if (params) req.params = params.parse(req.params)
      if (query) req.query = query.parse(req.query)
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        return Send.BadRequest(res, 'Validation failed', err.format())
      }
      next(err)
    }
  }
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ success: false, error: { code: err.code, message: err.message, details: err.details } })
  }
  return Send.ServerError(res)
}


