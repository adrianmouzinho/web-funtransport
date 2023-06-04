'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

import { api } from '@/lib/axios'
import { Loading } from './Loading'

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
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUserFormData>({
    resolver: zodResolver(signInUserFormSchema),
  })

  async function signIn({ email, password }: SignInUserFormData) {
    setLoading(true)

    try {
      const response = await api.post('/signIn', {
        email,
        password,
      })

      const { token } = response.data as TokenResponse

      cookie.set('token', token, { expires: 7, path: '/' })

      setLoading(false)

      return router.push('/')
    } catch (error: any) {
      setLoading(false)

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
      className="flex w-full flex-col gap-4"
    >
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
        <span className="flex items-center justify-between">
          Senha
          <a href="" className="text-blue-600 hover:underline">
            Esqueceu sua senha?
          </a>
        </span>

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

      {error && <span className="text-sm text-red-500">{error}</span>}

      <button
        type="submit"
        disabled={loading}
        className="flex h-10 items-center justify-center rounded bg-zinc-900 font-semibold text-white transition-colors hover:bg-zinc-800"
      >
        {loading ? <Loading /> : 'Entrar'}
      </button>
    </form>
  )
}
