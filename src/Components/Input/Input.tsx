import React from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
import { formData } from 'src/type/@type'

interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  name: keyof formData
  register: UseFormRegister<formData>
  rules?: RegisterOptions<formData>
}

export default function Input({ type, errorMessage, placeholder, className, name, register, rules }: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
        placeholder={placeholder}
        {...register(name, rules)}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm text-start'>{errorMessage}</div>
    </div>
  )
}
