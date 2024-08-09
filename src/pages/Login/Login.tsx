import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { watch } from 'fs';
import { omit } from 'lodash';
import { useContext } from 'react';
import { useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { loginAccount } from 'src/apis/auth.api';
import Button from 'src/Components/Button';
import Input from 'src/Components/Input';
import { themeContext } from 'src/context/app.context';
import { RespponseApi } from 'src/type/utils.type';
import { getRules, Schema, schema } from 'src/utils/rules';
import { isAxiosUnprocessableEntityError } from 'src/utils/utils';
type FormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])
export default function Login() {
  const { isAuthenicated, setIsAuthenicated } = useContext(themeContext)
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, setError, watch } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const rules = getRules()

  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => loginAccount(body)
  });

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: () => {
        setIsAuthenicated(true)
        navigate('/')
      },
      onError: (error) => {
        console.log(error);

        if (isAxiosUnprocessableEntityError<RespponseApi<FormData>>(error)) {
          const formError = error.response?.data.data;

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
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
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10 '>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng nhập</div>

              <Input type='email' className='mt-8' placeholder='Email' register={register} rules={rules.email} name='email' />
              <Input type='password' className='mt-3' placeholder='Password' register={register} rules={rules.password} name='password' autoComplete='on' />
              <div className='mt-3'>
                <Button disabled={loginAccountMutation.isPending} isLoading={loginAccountMutation.isPending} type='submit' className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center'>
                  Đăng nhập
                </Button>
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