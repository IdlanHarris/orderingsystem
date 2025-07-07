// app/admin/components/AddItemForm.tsx
import React from 'react'
import { NewMenuItemForm } from '@/app/types/menuItem'

interface Props {
  newItem: NewMenuItemForm
  setNewItem: React.Dispatch<React.SetStateAction<NewMenuItemForm>>
  categories: { id: number; name: string }[]
  handleAddItem: () => void
}

const AddItemForm: React.FC<Props> = ({ newItem, setNewItem, categories, handleAddItem }) => {
  return (
    <div className="mb-6 p-4 bg-gray-800 rounded-md text-white">
      <h2 className="text-lg font-semibold mb-3">Add New Menu Item</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="w-full p-2 border rounded-md"
            placeholder="Item name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price (RM)</label>
          <input
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="w-full p-2 border rounded-md"
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={newItem.category_id}
            onChange={(e) =>
              setNewItem({ ...newItem, category_id: parseInt(e.target.value) })
            }
            className="w-full p-2 border rounded-md text"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id} className="text-white bg-gray-900">
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            className="w-full p-2 border rounded-md"
            placeholder="Enter description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image File</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) =>
              setNewItem({ ...newItem, image_file: e.target.files?.[0] || null })
            }
            className="w-full p-2 border rounded-md text-white bg-gray-900"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleAddItem}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddItemForm