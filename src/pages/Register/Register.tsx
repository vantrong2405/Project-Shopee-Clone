import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import Input from 'src/Components/Input';
import { formData } from 'src/type/@type';
import { getRules, schema } from 'src/utils/rules';
export default function Register() {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<formData>({
    resolver: yupResolver(schema),
  });
  // const rules = getRules(getValues);
  const onSubmit = handleSubmit((data) => {
    // Xử lý dữ liệu khi form được submit
  });

  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                name='email'
                register={register}
                type='email'
                errorMessage={errors.email?.message} // Sửa từ errors.password sang errors.email
                className='mt-8'
                // rules={rules.email}
                placeholder='Email' // Thêm placeholder cho input
              />
              <Input
                name='password'
                register={register}
                type='password'
                errorMessage={errors.password?.message}
                className='mt-2'
                // rules={rules.password}
                placeholder='Password' // Thêm placeholder cho input
              />
              <Input
                name='confirm_password'
                register={register}
                type='password'
                errorMessage={errors.confirm_password?.message}
                className='mt-2'
                // rules={rules.confirm_password}
                placeholder='Confirm Password' // Thêm placeholder cho input
              />
              <div className='mt-2'>
                <button className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng ký
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
