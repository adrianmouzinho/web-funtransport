'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { Loading } from './Loading'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import cookie from 'js-cookie'

const registerProductFormSchema = z.object({
  model: z.string().nonempty('O modelo é obrigatório'),
  brand: z.string().nonempty('A marca é obrigatória'),
  description: z.string().nonempty('A descrição é obrigatória'),
  coverUrl: z.string().url('Formato de url inválido'),
  hourlyValue: z.string().transform((value) => Number(value)),
})

type RegisterProductFormData = z.infer<typeof registerProductFormSchema>

interface ConfirmReturnModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Color {
  id: string
  name: string
  code: string
}

interface Size {
  id: string
  size: string
}

interface Category {
  id: string
  name: string
}

interface Supplier {
  id: string
  name: string
}

export function RegisterProductModal({
  isOpen,
  onClose,
}: ConfirmReturnModalProps) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [colors, setColors] = useState<Color[]>([])
  const [sizes, setSizes] = useState<Size[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [selectedCategoy, setSelectedCategoy] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProductFormData>({
    resolver: zodResolver(registerProductFormSchema),
  })

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/suppliers'),
      api.get('/colors'),
      api.get('/sizes'),
    ])
      .then(
        ([
          categoriesResponse,
          suppliersResponse,
          colorsResponse,
          sizesResponse,
        ]) => {
          setCategories(categoriesResponse.data)
          setSuppliers(suppliersResponse.data)
          setColors(colorsResponse.data)
          setSizes(sizesResponse.data)
        },
      )
      .catch((error) => console.log(error))

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

  async function registerProduct({
    model,
    brand,
    description,
    hourlyValue,
    coverUrl,
  }: RegisterProductFormData) {
    setLoading(true)

    if (
      !selectedCategoy ||
      !selectedSupplier ||
      !selectedColor ||
      !selectedSize
    ) {
      setError(
        'Você precisa escolher a categoria, o fornecedor, a cor e o tamanho',
      )
      setLoading(false)
      return
    }

    try {
      const token = cookie.get('token')

      await api.post(
        '/products',
        {
          model,
          brand,
          description,
          hourlyValue,
          coverUrl,
          categoryId: selectedCategoy,
          supplierId: selectedSupplier,
          colorId: selectedColor,
          sizeId: selectedSize,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      setLoading(false)

      onClose()

      return router.push('/products', { forceOptimisticNavigation: true })
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
          Cadastrar novo equipamento
          <button onClick={handleCloseModal}>
            <X />
          </button>
        </header>

        <form onSubmit={handleSubmit(registerProduct)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm font-semibold">
              Categoria
              <select
                name="category"
                id="category"
                className="h-10 appearance-none rounded border border-zinc-300 px-2 font-normal text-zinc-600 placeholder:text-zinc-500 focus:outline focus:outline-emerald-300"
                value={selectedCategoy}
                onChange={(e) => setSelectedCategoy(e.target.value)}
              >
                <option disabled value="">
                  Selecione uma categoria
                </option>

                {categories.map((category) => {
                  return (
                    <option
                      key={category.id}
                      value={category.id}
                      className="flex items-center gap-2"
                    >
                      {category.name}
                    </option>
                  )
                })}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm font-semibold">
              Fornecedor
              <select
                name="supplier"
                id="supplier"
                className="h-10 appearance-none rounded border border-zinc-300 px-2 font-normal text-zinc-600 placeholder:text-zinc-500 focus:outline focus:outline-emerald-300"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
              >
                <option disabled value="">
                  Selecione um fornecedor
                </option>

                {suppliers.map((supplier) => {
                  return (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  )
                })}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm font-semibold">
              Marca
              <input
                type="text"
                placeholder="Digite a marca"
                className="h-10 rounded border border-zinc-300 px-2 font-normal text-zinc-600 placeholder:text-zinc-500 focus:outline focus:outline-emerald-300"
                {...register('brand')}
              />
              {errors.brand && (
                <span className="text-sm font-normal text-red-500">
                  {errors.brand.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-1 text-sm font-semibold">
              Modelo
              <input
                type="text"
                placeholder="Digite o modelo"
                className="h-10 rounded border border-zinc-300 px-2 font-normal text-zinc-600 placeholder:text-zinc-500 focus:outline focus:outline-emerald-300"
                {...register('model')}
              />
              {errors.model && (
                <span className="text-sm font-normal text-red-500">
                  {errors.model.message}
                </span>
              )}
            </label>
          </div>

          <label className="flex flex-col gap-1 text-sm font-semibold">
            Descrição
            <input
              type="text"
              placeholder="Digite uma pequena descrição do equipamento"
              className="h-10 rounded border border-zinc-300 px-2 font-normal text-zinc-600 placeholder:text-zinc-500 focus:outline focus:outline-emerald-300"
              {...register('description')}
            />
            {errors.description && (
              <span className="text-sm font-normal text-red-500">
                {errors.description.message}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-1 text-sm font-semibold">
            Valor por hora (em centavos)
            <input
              type="number"
              placeholder="Digite o valor por hora do equipamento"
              className="h-10 rounded border border-zinc-300 px-2 font-normal text-zinc-600 placeholder:text-zinc-500 focus:outline focus:outline-emerald-300"
              {...register('hourlyValue')}
            />
            {errors.hourlyValue && (
              <span className="text-sm font-normal text-red-500">
                {errors.hourlyValue.message}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-1 text-sm font-semibold">
            URL da imagem
            <input
              type="url"
              placeholder="Digite a url da imagem"
              className="h-10 rounded border border-zinc-300 px-2 font-normal text-zinc-600 placeholder:text-zinc-500 focus:outline focus:outline-emerald-300"
              {...register('coverUrl')}
            />
            {errors.coverUrl && (
              <span className="text-sm font-normal text-red-500">
                {errors.coverUrl.message}
              </span>
            )}
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm font-semibold">
              Cor
              <select
                name="color"
                id="color"
                className="h-10 appearance-none rounded border border-zinc-300 px-2 font-normal text-zinc-600 placeholder:text-zinc-500 focus:outline focus:outline-emerald-300"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option disabled value="">
                  Selecione uma cor
                </option>

                {colors.map((color) => {
                  return (
                    <option
                      key={color.id}
                      value={color.id}
                      className="flex items-center gap-2"
                    >
                      {color.name}
                    </option>
                  )
                })}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm font-semibold">
              Tamanho
              <select
                name="size"
                id="size"
                className="h-10 appearance-none rounded border border-zinc-300 px-2 font-normal text-zinc-600 placeholder:text-zinc-500 focus:outline focus:outline-emerald-300"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option disabled value="">
                  Selecione uma cor
                </option>

                {sizes.map((size) => {
                  return (
                    <option key={size.id} value={size.id}>
                      {size.size}
                    </option>
                  )
                })}
              </select>
            </label>
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
