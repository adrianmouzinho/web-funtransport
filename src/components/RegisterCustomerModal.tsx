'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { Loading } from './Loading'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const registerCustomerFormSchema = z.object({
  name: z.string().min(10, 'A senha precisa de no mínimo 10 caracteres'),
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inváido')
    .toLowerCase(),
  cpf: z.string().length(11, 'O cpf precisa ter 11 caracteres'),
  phone: z.string().length(11, 'O telefone precisa ter 11 caracteres'),
  address: z.string().min(10, 'O endereço precisa de no mínimo 10 caracteres'),
  password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres'),
})

type RegisterCustomerFormData = z.infer<typeof registerCustomerFormSchema>

interface Customer {
  id: string
  name: string
  email: string
  avatarUrl: string
  address: string
  phone: string
}

interface ConfirmReturnModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateCustomer: (customer: Customer) => void
}

export function RegisterCustomerModal({
  isOpen,
  onClose,
  onCreateCustomer,
}: ConfirmReturnModalProps) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCustomerFormData>({
    resolver: zodResolver(registerCustomerFormSchema),
  })

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    function handleClickOverlay(event: MouseEvent) {
      if (event.target === document.querySelector('.overlay')) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('click', handleClickOverlay)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('click', handleClickOverlay)
    }
  }, [onClose])

  if (!isOpen) {
    return null
  }

  async function registerCustomer({
    name,
    cpf,
    address,
    phone,
    email,
    password,
  }: RegisterCustomerFormData) {
    setLoading(true)

    try {
      const response = await api.post('/customers', {
        name,
        cpf,
        address,
        phone,
        email,
        password,
      })

      const customer = response.data as Customer

      setLoading(false)

      onCreateCustomer(customer)

      onClose()

      return router.push('/customers', { forceOptimisticNavigation: true })
    } catch (error: any) {
      setLoading(false)

      if (error.response.status === 400) {
        setError(error.response.data.error)
        return
      }

      console.log({ error })
    }
  }

  function handleCloseModal() {
    setError(null)
    onClose()
  }

  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/75">
      <div className="w-full max-w-3xl space-y-4 rounded-lg bg-white p-6 text-left">
        <header className="flex items-center justify-between text-lg font-bold">
          Cadastrar novo cliente
          <button onClick={handleCloseModal}>
            <X />
          </button>
        </header>

        <form onSubmit={handleSubmit(registerCustomer)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <fieldset className="space-y-4 rounded-md border border-gray-300 px-4 pb-4">
              <legend>Dados pessoais</legend>

              <label className="flex flex-col gap-1 text-sm font-semibold">
                Nome completo
                <input
                  type="text"
                  placeholder="Digite seu nome completo"
                  className="h-10 rounded border border-zinc-300 px-2 font-normal text-zinc-600 placeholder:text-zinc-500 focus:outline focus:outline-emerald-300"
                  {...register('name')}
                />
                {errors.name && (
                  <span className="text-sm font-normal text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-1 text-sm font-semibold">
                CPF (sem caracteres especiais)
                <input
                  type="text"
                  placeholder="Digite seu cpf"
                  className="h-10 rounded border border-zinc-300 px-2 font-normal text-zinc-600 placeholder:text-zinc-500 focus:outline focus:outline-emerald-300"
                  {...register('cpf')}
                />
                {errors.cpf && (
                  <span className="text-sm font-normal text-red-500">
                    {errors.cpf.message}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-1 text-sm font-semibold">
                Endereço
                <input
                  type="text"
                  placeholder="Digite seu e-mail"
                  className="h-10 rounded border border-zinc-300 px-2 font-normal text-zinc-600 placeholder:text-zinc-500 focus:outline focus:outline-emerald-300"
                  {...register('address')}
                />
                {errors.address && (
                  <span className="text-sm font-normal text-red-500">
                    {errors.address.message}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-1 text-sm font-semibold">
                Telefone (sem caracteres especiais)
                <input
                  type="text"
                  placeholder="Digite seu telefone"
                  className="h-10 rounded border border-zinc-300 px-2 font-normal text-zinc-600 placeholder:text-zinc-500 focus:outline focus:outline-emerald-300"
                  {...register('phone')}
                />
                {errors.phone && (
                  <span className="text-sm font-normal text-red-500">
                    {errors.phone.message}
                  </span>
                )}
              </label>
            </fieldset>

            <fieldset className="space-y-4 rounded-md border border-gray-300 px-4 pb-4">
              <legend>Dados de login</legend>

              <label className="flex flex-col gap-1 text-sm font-semibold">
                E-mail
                <input
                  type="email"
                  placeholder="Digite seu e-mail"
                  className="h-10 rounded border border-zinc-300 px-2 font-normal text-zinc-600 placeholder:text-zinc-500 focus:outline focus:outline-emerald-300"
                  {...register('email')}
                />
                {errors.email && (
                  <span className="text-sm font-normal text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-1 text-sm font-semibold">
                Senha
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  className="h-10 rounded border border-zinc-300 px-2 font-normal text-zinc-600 placeholder:text-zinc-500 focus:outline focus:outline-emerald-300"
                  {...register('password')}
                />
                {errors.password && (
                  <span className="text-sm font-normal text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </fieldset>
          </div>

          {error && <span className="text-sm text-red-500">{error}</span>}

          <button
            type="submit"
            disabled={loading}
            className="ml-auto flex h-10 w-fit items-center justify-center rounded bg-zinc-900 px-4 font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            {loading ? <Loading /> : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
