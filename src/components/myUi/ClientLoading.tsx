import React from 'react'

const ClientLoading = () => {
  return (
    <div className="flex items-center justify-center bg-white inset-0 fixed z-50">
    <div className="flex space-x-4">
      <span className="animate-bounce [animation-delay:-0.3s] inline-flex h-6 w-6 rounded-full bg-red-300"></span>
      <span className="[animation-delay:-0.15s] inline-flex h-6 w-6 rounded-full bg-red-400"></span>
      <span className="animate-bounce inline-flex h-6 w-6 rounded-full bg-red-500"></span>
    </div>
  </div>
  )
}

export default ClientLoading