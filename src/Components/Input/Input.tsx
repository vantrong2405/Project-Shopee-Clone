// import React from 'react'
// import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
// interface Props {
//   type: React.HTMLInputTypeAttribute
//   errorMessage?: string
//   placeholder?: string
//   name: string
//   register: UseFormRegister<any>
//   rules?: RegisterOptions
// }
// export default function Input({ props }: Props) {
//   return (
//     <div className='mt-8'>
//       <input
//         type='email'
//         className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
//         placeholder='Email'
//         {...register('email', rules.email)}
//       />
//       <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm text-start'>{errors.email?.message}</div>
//     </div>
//   )
// }

import React from 'react'

export default function Input() {
  return (
    <div>Input</div>
  )
}
