import type { Route } from './+types/login'
import { Login } from '~/auth/login'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Login' },
    { name: 'description', content: 'Bem vindo à CalculaJuros!' },
  ]
}

export default function Home() {
  return <Login />
}
