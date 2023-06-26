'use client'

import { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import Image from 'next/image'
import { api } from '@/lib/axios'
import { RegisterProductModal } from './RegisterProductModal'

interface Product {
  id: string
  brand: string
  model: string
  coverUrl: string
  color: string
  size: number
  status: string
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  async function loadProducts() {
    try {
      const token = cookie.get('token')

      const response = await api.get('/productsInventory', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setProducts(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadProducts()
    setLoading(false)
  }, [])

  function handleCreateProduct(product: Product) {
    setProducts((prevState) => prevState.concat(product))
  }

  if (loading) {
    return <p className="mt-4 text-center">Carregando...</p>
  }

  return (
    <div className="mb-8 mr-8 space-y-2 text-right">
      <RegisterProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateProduct={handleCreateProduct}
      />

      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-lg bg-orange-500 p-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
      >
        Cadastrar equipamento
      </button>

      <div className="rounded-lg border border-zinc-200 p-4">
        <table className="min-w-full table-auto p-8 text-sm">
          <thead>
            <tr className="text-xs text-zinc-600">
              <th className="px-4 py-2 text-left uppercase">Modelo</th>
              <th className="px-4 py-2 text-left uppercase">Marca</th>
              <th className="px-4 py-2 text-left uppercase">Cor</th>
              <th className="px-4 py-2 text-left uppercase">Tamanho</th>
              <th className="px-4 py-2 text-left uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className=" px-4 py-2 text-left">
                  <div className="flex items-center gap-3">
                    <Image
                      src={product.coverUrl}
                      width={64}
                      height={64}
                      alt=""
                      className="h-16 w-16 rounded border border-zinc-200 bg-white"
                    />
                    <span>{product.model}</span>
                  </div>
                </td>
                <td className=" px-4 py-2 text-left">{product.brand}</td>
                <td className=" px-4 py-2 text-left">
                  <div
                    style={{ backgroundColor: `${product.color}` }}
                    className={`h-5 w-5 rounded border border-zinc-200`}
                  />
                </td>
                <td className=" px-4 py-2 text-left">{product.size}</td>
                <td className=" px-4 py-2 text-left">
                  <span
                    className={`flex h-fit w-fit items-center justify-center rounded-full px-2 py-1 text-xs ${
                      product.status === 'Disponível'
                        ? 'bg-emerald-100 text-emerald-500'
                        : 'bg-yellow-100 text-yellow-500'
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
