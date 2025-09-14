import type { Router } from 'express'

export type ModuleDescriptor = {
  basePath: string
  router: Router
}

// Register all module routers here
import { userRouter } from './user/routes/user.routes'

export const modules: ModuleDescriptor[] = [
  { basePath: '/users', router: userRouter },
]


