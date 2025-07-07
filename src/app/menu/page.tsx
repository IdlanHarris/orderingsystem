'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Modal from '@/components/modal'
import { MenuItem } from '@/app/types/menuItem'
import { useCart } from '@/app/context/CartContext'
import { toast } from 'react-toastify';

const DEFAULT_IMAGE = '/images/fries.jpg'
const MIN_QUANTITY = 1

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [quantity, setQuantity] = useState(MIN_QUANTITY)
  const { addToCart } = useCart()
  const filteredItems = menuItems.filter(item => item.is_visible)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('/api/menu')
        if (!response.ok) throw new Error('Failed to fetch menu items')

        const data = await response.json()

        const formattedData = data.map((item: any) => {
          const parsedPrice = Number(item.price);
          const cleanImage = item.images?.startsWith('/images/')
            ? item.images
            : DEFAULT_IMAGE;

          console.log('Image Path:', cleanImage)
          console.log('Description:', item.description)

          return {
            ...item,
            price: !isNaN(parsedPrice) ? parsedPrice : 0,
            image: cleanImage

          }
        })

        setMenuItems(formattedData)
      } catch (error) {
        console.error('Menu fetch error:', error)
      }
    }

    fetchMenu()
  }, [])


  const handleAddToCart = () => {
    if (!selectedItem) return

    addToCart({
      id: selectedItem.id,
      name: selectedItem.name,
      price: selectedItem.price,
      image: selectedItem.image || DEFAULT_IMAGE,
      quantity: quantity,
    })

    toast.success(`Added ${quantity} ${selectedItem.name} to cart`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setSelectedItem(null)
    setQuantity(MIN_QUANTITY)
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || MIN_QUANTITY
    setQuantity(Math.max(MIN_QUANTITY, value))
  }

  const closeModal = () => setSelectedItem(null)

  return (
    <div className="p-8 flex justify-center">
      <div className="max-w-[1300px] w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Menu</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {filteredItems.map((item) => (
            <MenuItemCard 
              key={item.id}
              item={item}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </div>
      
      {selectedItem && (
        <ItemModal 
          item={selectedItem}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleAddToCart}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

type MenuItemCardProps = {
  item: MenuItem
  onClick: () => void
}

const MenuItemCard = ({ item, onClick }: MenuItemCardProps) => (
  <div
    onClick={onClick}
    className="w-full max-w-[600px] border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col items-center text-center cursor-pointer"
  >
    <Image
      src={item.image}
      alt={item.name}
      width={400}
      height={300}
      priority
      className="w-full h-48 object-cover rounded-md mb-4"
    />
    <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
    <p className="text-gray-600">RM {item.price.toFixed(2)}</p>
  </div>
)

type ItemModalProps = {
  item: MenuItem
  quantity: number
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAddToCart: () => void
  onClose: () => void
}

const ItemModal = ({ 
  item, 
  quantity, 
  onQuantityChange, 
  onAddToCart, 
  onClose 
}: ItemModalProps) => (
  <Modal onClose={onClose}>
    <div className="text-center">
      <Image
      src={item.image}
      alt={item.name}
      width={400}
      height={300}
      priority
      className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
      <p className="text-gray-600 italic mb-1">{item.category || 'No category available.'}</p>
      <p className="text-gray-600 italic mb-1">{item.description || 'No description available.'}</p>
      <p className="text-gray-700 text-lg mb-4">
        Price: RM {item.price.toFixed(2)}
      </p>

      <div className="flex justify-center items-center mb-4">
        <span className="mr-2 font-medium">Quantity:</span>
        <input
          type="number"
          value={quantity}
          min={MIN_QUANTITY}
          max={100}
          onChange={onQuantityChange}
          className="w-16 text-center border rounded-md p-1"
        />
      </div>

      <button 
        onClick={onAddToCart}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  </Modal>
)