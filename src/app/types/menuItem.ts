export type MenuItem = {
  id: number
  name: string
  price: number
  image_file: string
  description: string
  category: string
  is_visible: boolean
  category_id: number
}

export type NewMenuItemForm = {
  name: string
  price: string
  image_file: File | null
  description: string
  category_id: number
  is_visible: boolean
}

// export type EditableMenuItem = Omit<MenuItem, 'price'> & {
//   price: string;  // String for form input
// }