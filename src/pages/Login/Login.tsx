import { yupResolver } from '@hookform/resolvers/yup';
import { watch } from 'fs';
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/Components/Input';
import { formData } from 'src/type/@type';
import { getRules, loginSchema } from 'src/utils/rules';
type loginFormData = Omit<formData, 'confirm_password'>
export default function Login() {
  const { register, handleSubmit, formState: { errors }, getValues, watch } = useForm<any>({
    resolver: yupResolver(loginSchema)
  })

  const email = getValues('email')
  const rules = getRules()
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  })
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng nhập</div>

              <Input type='email' className='mt-8' placeholder='Email' register={register} rules={rules.email} name='email' />
              <Input type='password' className='mt-3' placeholder='Password' register={register} rules={rules.password} name='password' />
              <div className='mt-3'>
                <button type='submit' className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng nhập
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}