// app/admin/InvManagement/utils.ts

import { NewMenuItemForm } from '../../types/menuItem'

export const fetchMenuItems = async () => {
  try {
    const response = await fetch('/api/admin')
    if (!response.ok) throw new Error('Failed to fetch menu items')
    const data = await response.json()
    console.log("Fetched menu items:", data);

    // Ensure price is converted to number
    return data.map((item: any) => ({
      ...item,
      price: Number(item.price),
      is_visible: item.is_visible ?? true // Default to true if null
    }))
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error occurred')
  }
}

export const toggleItemVisibility = async (id: number, isVisible: boolean) => {
  const response = await fetch(`/api/menu/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ is_visible: !isVisible }),
  })

  if (!response.ok) throw new Error('Failed to update item')
}

export const addMenuItem = async (newItem: NewMenuItemForm) => {
  const formData = new FormData()
  formData.append('name', newItem.name)
  formData.append('price', newItem.price)
  formData.append('description', newItem.description || '')
  formData.append('category_id', newItem.category_id.toString())
  formData.append('is_visible', String(newItem.is_visible))
  
  if (newItem.image_file) {
    formData.append('image', newItem.image_file)
  }

  const response = await fetch('/api/admin/inventory/add', {
    method: 'POST',
    body: formData,
  })
  
  console.log('Sending category_id:', newItem.category_id)

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Add item failed with status:', response.status, errorText)
    throw new Error(errorText || 'Failed to add item')
  }

  const addedItem = await response.json()

  return {
    ...addedItem,
    price: Number(addedItem.price),
    is_visible: addedItem.is_visible ?? true
  }
}

export const removeMenuItem = async (itemId: string) => {
  if (!itemId) {
    throw new Error('Item ID is required')
  }

  const response = await fetch(`/api/admin/inventory/remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: parseInt(itemId) }),
  })

  // Check if the response (API call) was successful
  if (!response.ok) {
    const errorText = await response.text(); // Get the raw response
    console.error('Remove item failed with status:', response.status, errorText)
    throw new Error('Failed to remove item')
  }

  // Parse the response JSON
  const removedItem = await response.json()
  console.log('Removed item response:', removedItem); // <- check this

  return removedItem.deletedItem.id
}

export const updateMenuItem = async ( id: number, inputData: { name: string; price: number; is_visible: boolean; }) => {
  //if (id === null) return
  const response = await fetch(`/api/admin/inventory/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...inputData }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update item');
  }

  const updatedData = await response.json();
  console.log("Fetched menu items:", updatedData); // <- check this in console.

  return {
    ...updatedData,
    price: Number(updatedData.price),
    is_visible: updatedData.is_visible ?? true,
  };
};
