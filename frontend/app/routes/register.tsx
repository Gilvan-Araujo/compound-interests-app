import type { Route } from './+types/register'
import { Register } from '~/auth/register'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Registro' },
    { name: 'description', content: 'Registre-se na CalculaJuros' },
  ]
}

export default function Home() {
  return <Register />
}
