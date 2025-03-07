import { Calculator } from '~/calculator'
import type { Route } from './+types/login'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'CalculaJuros' },
    { name: 'description', content: 'CalculaJuros' },
  ]
}

export default function Home() {
  return <Calculator />
}
