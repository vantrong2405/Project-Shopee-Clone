import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Input from 'src/Components/Input';
import { formData } from 'src/type/@type';
import { getRules, schema } from 'src/utils/rules';
import { registerAccount } from 'src/apis/auth.api';
import { omit } from 'lodash';
import { isAxiosUnprocessableEntityError } from 'src/utils/utils';
import { RespponseApi } from 'src/type/utils.type';

export default function Register() {
  const { register, handleSubmit, formState: { errors }, getValues, setError } = useForm<formData>({
    resolver: yupResolver(schema),
  });

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<formData, 'confirm_password'>) => registerAccount(body)
  });

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password']);
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);

        if (isAxiosUnprocessableEntityError<RespponseApi<Omit<formData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data;

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<formData, 'confirm_password'>, {
                message: formError[key as keyof Omit<formData, 'confirm_password'>] as string,
                type: 'Server'
              });
            });
          }
        }
      }
    });
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
                errorMessage={errors.email?.message}
                className='mt-8'
                placeholder='Email'
              />
              <Input
                name='password'
                register={register}
                type='password'
                errorMessage={errors.password?.message}
                className='mt-2'
                placeholder='Password'
              />
              <Input
                name='confirm_password'
                register={register}
                type='password'
                errorMessage={errors.confirm_password?.message}
                className='mt-2'
                placeholder='Confirm Password'
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
  );
}
