'use client'


import LoginForm from '@/components/LoginForm'

export default function Home() {
  
  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Main Page</h1>
      <p className="text-lg">Browse our menu or check your cart using the navigation above.</p>

      <LoginForm />
    </main>
  )
}