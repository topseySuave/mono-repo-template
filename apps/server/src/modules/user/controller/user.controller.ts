import type { Request, Response } from 'express'
import { createUser, listUsers } from '../services/user.service'
import { Send } from '../../../common/http'

export function getUsers(_req: Request, res: Response) {
  return Send.Ok(res, listUsers())
}

export function postUser(req: Request, res: Response) {
  const { email, name } = req.body ?? {}
  if (!email || !name) {
    return Send.BadRequest(res, 'email and name are required')
  }
  const user = createUser({ email, name })
  return Send.Created(res, user)
}


