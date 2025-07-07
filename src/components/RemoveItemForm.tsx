// app/admin/components/RemoveItemForm.tsx
import React from 'react'

interface Props {
  removeItemId: string
  setRemoveItemId: React.Dispatch<React.SetStateAction<string>>
  handleRemoveItem: () => void
}

const RemoveItemForm: React.FC<Props> = ({ removeItemId, setRemoveItemId, handleRemoveItem }) => {
  return (
    <div className="mb-6 p-4 bg-gray-800 rounded-md">
      <h2 className="text-lg font-semibold mb-3 text-white">Remove Menu Item</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-white">Item ID</label>
          <input
            type="text"
            value={removeItemId}
            onChange={(e) => setRemoveItemId(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter item ID to remove"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleRemoveItem}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Remove Item
          </button>
        </div>
      </div>
    </div>
  )
}

export default RemoveItemForm
