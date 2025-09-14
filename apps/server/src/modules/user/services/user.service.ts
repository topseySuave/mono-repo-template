import type { User } from '../model/user.model'

const users: User[] = []

export function listUsers(): User[] {
  return users
}

export function createUser(input: Pick<User, 'email' | 'name'>): User {
  const now = new Date()
  const user: User = {
    id: Math.random().toString(36).slice(2),
    email: input.email,
    name: input.name,
    createdAt: now,
    updatedAt: now,
  }
  users.push(user)
  return user
}


