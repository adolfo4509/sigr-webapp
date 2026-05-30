import React from 'react'
import Link from 'next/link'

const MenuClientes = () => {
  return (
    <div>
      <h1>Menu disponible</h1>
      <Link href="/login">Login</Link>
        <br />
        <Link href="/dashboard">Ir al dashboard</Link>
    </div>
  )
}

export default MenuClientes