'use client'

import { useRef } from 'react'
import { FaSearch } from 'react-icons/fa'

export const Searchbar: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null)

  const handleOnClickFocus = () => {
    ref.current?.focus()
  }

  return (
    <form>
      <label htmlFor="search" className="relative">
        <FaSearch
          className="absolute top-3.5 left-3 cursor-pointer text-white"
          size={16}
          onClick={handleOnClickFocus}
        />
        <input
          ref={ref}
          id="search"
          autoComplete="off"
          placeholder="Title, author"
          className="focus:border-primary transition-width [&:not(:placeholder-shown)]:border-primary peer block w-[0px] appearance-none rounded-lg border-2 border-transparent bg-transparent px-2.5 pl-5  pb-2.5 pt-2.5 text-sm text-white duration-500 focus:w-[280px] focus:pl-9 focus:outline-none focus:ring-0 [&:not(:placeholder-shown)]:w-[280px] [&:not(:placeholder-shown)]:pl-9 [&:not(:focus):not(:placeholder-shown)]:border-white"
        />
      </label>
    </form>
  )
}
