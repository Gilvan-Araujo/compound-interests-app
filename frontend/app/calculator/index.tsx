import { useState } from 'react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Checkbox } from '~/components/ui/checkbox'
import { api } from '~/lib/axios'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router'

export const Calculator = () => {
  let navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [principal, setPrincipal] = useState(0)
  const [rate, setRate] = useState(0)
  const [time, setTime] = useState(0)
  const [monthlyContribution, setMonthlyContribution] = useState(0)
  const [includeContribution, setIncludeContribution] = useState(false)
  const [result, setResult] = useState(0)

  const calculateCompoundInterest = async () => {
    setLoading(true)
    console.log(principal, rate, time, monthlyContribution, includeContribution)
    try {
      const { data } = await api.post(
        'interest/calculate',
        {
          principal,
          rate,
          time,
          includeContribution,
          ...(includeContribution && {
            monthlyContribution,
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      setResult(data.result)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message.toLowerCase().includes('token')) {
          window.alert('Token inválido, faça login novamente.')
          localStorage.setItem('token', '')
          navigate('/')
        } else window.alert(error.response?.data.message || error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-[100vh] w-full flex items-center justify-center flex-col gap-4">
      <div className="max-w-md flex flex-col gap-8 items-center justify-center">
        <h1 className="text-2xl">Calculadora de Juros Compostos</h1>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="ml-2" htmlFor="startingValue">
            Valor Inicial
          </Label>
          <Input
            value={principal}
            onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
            type="number"
            id="startingValue"
            placeholder="Valor inicial"
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="ml-2" htmlFor="interestRate">
            Taxa de juros (%)
          </Label>
          <Input
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
            type="number"
            id="interestRate"
            placeholder="Juros (%)"
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="ml-2" htmlFor="timeInYears">
            Tempo (em anos)
          </Label>
          <Input
            value={time}
            onChange={(e) => setTime(parseFloat(e.target.value) || 0)}
            type="number"
            id="timeInYears"
            placeholder="Tempo"
          />
        </div>

        <div className="w-full max-w-sm flex flex-row items-center justify-between gap-4">
          <div className="flex flex-row items-center gap-1 cursor-pointer h-1/2">
            <Checkbox
              id="includeContribution"
              checked={includeContribution}
              onCheckedChange={(checked) => {
                setIncludeContribution(!!checked)
                if (!checked) setMonthlyContribution(0)
              }}
              className="cursor-pointer"
            />
            <Label
              htmlFor="includeContribution"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Incluir Aporte Mensal
            </Label>
          </div>

          <div
            className={`grid max-w-1/2 w-full items-center gap-1.5 ${
              includeContribution ? '' : 'invisible'
            } `}
          >
            <Label className="ml-2" htmlFor="monthlyInvestment">
              Aporte mensal
            </Label>
            <Input
              id="monthlyInvestment"
              value={monthlyContribution}
              className="w-full"
              disabled={!includeContribution}
              type="number"
              placeholder="Aporte Mensal"
              onChange={(e) =>
                setMonthlyContribution(parseFloat(e.target.value) || 0)
              }
            />
          </div>
        </div>

        <Button
          variant="default"
          className={`cursor-pointer ${loading ? 'disabled' : ''}`}
          onClick={calculateCompoundInterest}
        >
          Calcular
        </Button>
        <h2>Resultado: R$ {result}</h2>
      </div>
    </div>
  )
}
