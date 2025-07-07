// app/admin/components/EditItemForm.tsx
import React from 'react'

interface Props {
  editItemId: string
  setEditItemId: React.Dispatch<React.SetStateAction<string>>
  editItem: {
    name: string
    price: string
    is_visible: boolean
  }
  setEditItem: React.Dispatch<React.SetStateAction<{
    name: string
    price: string
    is_visible: boolean
  }>>
  handleEditItem: () => void
  closeForm: () => void
}

const EditItemForm: React.FC<Props> = ({
  editItemId,
  setEditItemId,
  editItem,
  setEditItem,
  handleEditItem,
  closeForm
}) => {
  return (
    <div className="mb-6 p-4 bg-gray-800 rounded-md">
      <h2 className="text-lg font-semibold mb-3 text-white">
        Edit Menu Item (ID: {editItemId})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-white">Name</label>
          <input
            type="text"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
            className="w-full p-2 border rounded-md"
            placeholder="Item name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white">Price (RM)</label>
          <input
            type="number"
            value={editItem.price}
            onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
            className="w-full p-2 border rounded-md"
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-white">Visibility</label>
          <select
            value={editItem.is_visible ? 'visible' : 'hidden'}
            onChange={(e) =>
              setEditItem({ ...editItem, is_visible: e.target.value === 'visible' })
            }
            className="w-full p-2 border rounded-md"
          >
            <option value="visible">Visible</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>
        <div className="flex items-end col-span-3 space-x-4">
          <button
            onClick={handleEditItem}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
          >
            Save Changes
          </button>
          <button
            onClick={closeForm}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditItemForm
