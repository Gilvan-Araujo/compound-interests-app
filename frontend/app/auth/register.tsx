import { AxiosError } from 'axios'
import { useState } from 'react'
import { Link } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { api } from '~/lib/axios'
import { useNavigate } from 'react-router'

export const Register = () => {
  let navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const registerNewUser = async () => {
    try {
      const response = await api.post('auth/register', {
        email,
        password,
      })

      if (response.status === 201) {
        window.alert('Usuário cadastrado com sucesso!')
        navigate('/')
      }
    } catch (error) {
      if (error instanceof AxiosError)
        if (typeof error.response?.data.message === 'object')
          window.alert(error.response?.data.message[0])
        else window.alert(error.response?.data.message)
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
        <Button
          onClick={() => {
            registerNewUser()
          }}
        >
          Cadastrar
        </Button>

        <Link to={'/'}>
          <Button>Voltar para login</Button>
        </Link>
      </div>
      <ToastContainer position="bottom-center" theme="dark" />
      <ToastContainer position="bottom-center" theme="dark" />
      <ToastContainer position="bottom-center" theme="dark" />
    </div>
  )
}
