// app/admin/components/InventoryTable.tsx
import React, { useEffect, useState } from 'react'
import { MenuItem } from '@/app/types/menuItem'

export default function InventoryTable({
  menuItems,
  setEditItemId,
  setEditItem,
  toggleVisibility,
  setMenuItems,
  openEditForm,
  setFormStates
}: Props) {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/admin/inventory/categories')
        const data = await res.json()
        setCategories(data)
      } catch (err) {
        console.error('Failed to fetch categories:', err)
      }
    }
    fetchCategories()
  }, [])

  const getCategoryName = (categoryId: number) => {
    const found = categories.find(cat => cat.id === categoryId)
    return found ? found.name : 'Unknown'
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-black border border-gray-200">
        <thead>
          <tr className="bg-gray-700">
            <th className="py-2 px-4 border border-gray-300 w-16">No</th>
            <th className="py-2 px-4 border border-gray-300">Name</th>
            <th className="py-2 px-4 border border-gray-300 w-16">ID</th>
            <th className="py-2 px-4 border border-gray-300 w-24">Category</th>
            <th className="py-2 px-4 border border-gray-300 w-24">Price</th>
            <th className="py-2 px-4 border border-gray-300 w-24">Status</th>
            <th className="py-2 px-4 border border-gray-300 w-40">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-500">
              <td className="py-2 px-4 border border-gray-300 text-center">{index + 1}</td>
              <td className="py-2 px-4 border border-gray-300">{item.name}</td>
              <td className="py-2 px-4 border border-gray-300 text-center">{item.id}</td>
              <td className="py-2 px-4 border border-gray-300 text-center">{getCategoryName(item.category_id)}</td>
              <td className="py-2 px-4 border border-gray-300 text-center">
                {typeof item.price === 'number' && !isNaN(item.price)
                  ? item.price.toFixed(2)
                  : 'N/A'}
              </td>
              <td className="py-2 px-4 border border-gray-300 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${item.is_visible
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'}`}
                >
                  {item.is_visible ? 'Visible' : 'Hidden'}
                </span>
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={async () => {
                    try {
                      await toggleVisibility(item.id, item.is_visible)
                      setMenuItems(prev =>
                        prev.map(i =>
                          i.id === item.id ? { ...i, is_visible: !item.is_visible } : i
                        )
                      )
                    } catch {
                      alert('Failed to update visibility')
                    }
                  }}
                  className={`px-3 py-1 rounded-md text-sm ${item.is_visible
                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                    : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                >
                  {item.is_visible ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => {
                    setEditItemId(item.id.toString())
                    setEditItem({
                      name: item.name,
                      price: item.price.toString(),
                      is_visible: item.is_visible
                    })
                    openEditForm()
                    setFormStates(prev => ({ ...prev, showAddForm: false, showRemoveForm: false }))
                  }}
                  className="ml-2 px-3 py-1 rounded-md text-sm bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface Props {
  menuItems: MenuItem[]
  setEditItemId: (id: string) => void
  setEditItem: React.Dispatch<
    React.SetStateAction<{
      name: string
      price: string
      is_visible: boolean
    }>
  >
  toggleVisibility: (id: number, isVisible: boolean) => Promise<void>
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>
  openEditForm: () => void
  setFormStates: React.Dispatch<
    React.SetStateAction<{
      showAddForm: boolean
      showRemoveForm: boolean
      showEditForm: boolean
    }>
  >
}

type Category = {
  id: number
  name: string
}
