import { AxiosError } from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { api } from '~/lib/axios'

export const Login = () => {
  let navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const response = await api.post('auth/login', {
        email,
        password,
      })

      localStorage.setItem('token', response.data.token)

      if (response.status === 200) {
        navigate('/calculator')
      }
    } catch (error) {
      if (error instanceof AxiosError)
        window.alert(error.response?.data.message)
    }
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto h-[100vh] items-center justify-center gap-8">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          placeholder="Email"
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          placeholder="Senha"
        />
      </div>

      <div className="flex flex-col justify-around w-full max-w-xs items-center gap-8">
        <Button onClick={handleLogin}>Entrar</Button>

        <Link to={'register'}>
          <Button>Registrar</Button>
        </Link>
      </div>
    </div>
  )
}
