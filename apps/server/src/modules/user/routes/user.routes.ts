import { Router } from 'express'
import { getUsers, postUser } from '../controller/user.controller'
import { validate } from '../../../common/middleware'
import { createUserBody } from '../validators/user.validators'

export const userRouter = Router()

userRouter.get('/', getUsers)
userRouter.post('/', validate({ body: createUserBody }), postUser)


