// app/admin/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { MenuItem } from '@/app/types/menuItem'
import { NewMenuItemForm } from '../../types/menuItem'
import {
  fetchMenuItems,
  toggleItemVisibility,
  addMenuItem,
  removeMenuItem,
  updateMenuItem
} from './utils'
import AddItemForm from '../../../components/AddItemForm'
import RemoveItemForm from '../../../components/RemoveItemForm'
import EditItemForm from '../../../components/EditItemForm'
import InventoryTable from '../../../components/InventoryTable'

export default function AdminPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  const [newItem, setNewItem] = useState<NewMenuItemForm>({
    name: '',
    price: '',
    is_visible: true,
    image_file: null,
    description: '',
    category_id: 1
  })

  const [formStates, setFormStates] = useState({
    showAddForm: false,
    showRemoveForm: false,
    showEditForm: false
  })

  const [removeItemId, setRemoveItemId] = useState('')
  const [editItemId, setEditItemId] = useState('')
  const [editItem, setEditItem] = useState({
    name: '',
    price: '',
    is_visible: true
  })

  const categories = [
    { id: 1, name: 'Not Set' },
    { id: 2, name: 'Mains' },
    { id: 3, name: 'Drinks' },
    { id: 4, name: 'Desserts' }
  ]

  

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const data = await fetchMenuItems()
        setMenuItems(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load menu items')
      } finally {
        setLoading(false)
      }
    }

    loadMenuItems()
  }, [])

  const toggleForm = (form: keyof typeof formStates) => {
    setFormStates(prev => ({
      showAddForm: form === 'showAddForm' ? !prev.showAddForm : false,
      showRemoveForm: form === 'showRemoveForm' ? !prev.showRemoveForm : false,
      showEditForm: form === 'showEditForm' ? !prev.showEditForm : false
    }))
  }

  const handleAddItem = async () => {
    try {
      const addedItem = await addMenuItem(newItem)
      setMenuItems(prev => [...prev, addedItem])
      setNewItem({
        name: '',
        price: '',
        is_visible: true,
        image_file: null,
        description: '',
        category_id: 1
      })
      setFormStates({ ...formStates, showAddForm: false })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item')
    }
  }

  const handleRemoveItem = async () => {
    try {
      const removedId = Number(await removeMenuItem(removeItemId))
      setMenuItems(prev => prev.filter(item => item.id !== removedId))
      setRemoveItemId('')
      setFormStates({ ...formStates, showRemoveForm: false })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item')
    }
  }

  const handleEditItem = async () => {
    try {
      const updated = await updateMenuItem(parseInt(editItemId), {
        name: editItem.name,
        price: parseFloat(editItem.price),
        is_visible: editItem.is_visible
      })
      setMenuItems(prev =>
        prev.map(item => (item.id === updated.id ? updated : item))
      )
      setEditItemId('')
      setEditItem({ name: '', price: '', is_visible: true })
      setFormStates({ ...formStates, showEditForm: false })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item')
    }
  }

  if (loading) return <div className="p-8">Loading...</div>
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => toggleForm('showAddForm')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {formStates.showAddForm ? 'Cancel' : 'Add Item'}
          </button>
          <button
            onClick={() => toggleForm('showRemoveForm')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {formStates.showRemoveForm ? 'Cancel' : 'Remove Item'}
          </button>
        </div>
      </div>

      {formStates.showAddForm && (
        <AddItemForm
          newItem={newItem}
          setNewItem={setNewItem}
          categories={categories}
          handleAddItem={handleAddItem}
        />
      )}

      {formStates.showRemoveForm && (
        <RemoveItemForm
          removeItemId={removeItemId}
          setRemoveItemId={setRemoveItemId}
          handleRemoveItem={handleRemoveItem}
        />
      )}

      {formStates.showEditForm && (
        <EditItemForm
          editItemId={editItemId}
          setEditItemId={setEditItemId}
          editItem={editItem}
          setEditItem={setEditItem}
          handleEditItem={handleEditItem}
          closeForm={() => setFormStates({ ...formStates, showEditForm: false })}
        />
      )}

      <InventoryTable
        menuItems={menuItems}
        setEditItemId={setEditItemId}
        setEditItem={setEditItem}
        toggleVisibility={toggleItemVisibility}
        setMenuItems={setMenuItems}
        openEditForm={() => toggleForm('showEditForm')}
        setFormStates={setFormStates}
      />
    </div>
  )
}
