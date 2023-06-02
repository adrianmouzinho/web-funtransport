'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

import { api } from '@/lib/axios'

const signInUserFormSchema = z.object({
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inváido')
    .toLowerCase(),
  password: z.string().min(3, 'A senha precisa de no mínimo 3 caracteres'),
})

type SignInUserFormData = z.infer<typeof signInUserFormSchema>

interface TokenResponse {
  token: string
}

export function SignInForm() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUserFormData>({
    resolver: zodResolver(signInUserFormSchema),
  })

  async function signIn({ email, password }: SignInUserFormData) {
    try {
      const response = await api.post('/signIn', {
        email,
        password,
      })

      const { token } = response.data as TokenResponse

      cookie.set('token', token, { expires: 7, path: '/' })

      router.push('/')
    } catch (error: any) {
      if (error.response.status === 400) {
        setError(error.response.data.error)
        return
      }

      console.log({ error })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(signIn)}
      className="flex w-full max-w-xs flex-col gap-4 rounded-lg bg-zinc-50 p-6"
    >
      <h2 className="text-xl font-bold">Acesse a plataforma</h2>

      <p className="text-sm">
        Faça login para começar a gerenciar os equipamentos e os clientes ainda
        hoje
      </p>

      <label className="flex flex-col gap-1 text-sm font-semibold">
        E-mail
        <input
          type="email"
          placeholder="Informe seu e-mail"
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
        <span className="flex items-center justify-between">
          Senha
          <a href="" className="text-blue-600">
            Esqueceu sua senha?
          </a>
        </span>

        <input
          type="password"
          placeholder="Informe sua senha"
          className="h-10 rounded border border-zinc-300 px-2 font-normal text-zinc-600 placeholder:text-zinc-500 focus:outline focus:outline-emerald-300"
          {...register('password')}
        />

        {errors.password && (
          <span className="text-sm font-normal text-red-500">
            {errors.password.message}
          </span>
        )}
      </label>

      {error && <span className="text-sm text-red-500">{error}</span>}

      <button
        type="submit"
        className="h-10 rounded bg-pink-500 font-semibold text-white transition-colors hover:bg-pink-600"
      >
        Entrar
      </button>
    </form>
  )
}
