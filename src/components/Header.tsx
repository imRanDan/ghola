import React from 'react'
import Image from 'next/image'

export default function Header() {
  return (
    <>
      <header className='flex items-center justify-center py-4'>
        <Image 
          src="/ghola-final-logo-transparent.png"
          width={100}
          height={100}
          alt="Ghola logo transparent"
        />
        <h1 className='text-4xl italic font-bold text-orange-200'>Ghola</h1>
      </header>
    </>
  )
}
