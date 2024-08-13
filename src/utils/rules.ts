import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup';
type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}
export const getRules = (getValues?: any): Rules => {
  return {
    email: {
      required: true,
      maxLength: {
        value: 160,
        message: 'Độ dài ký tự phải từ 5-160'
      },
      minLength: {
        value: 5,
        message: 'Độ dài ký tự phải từ 5-160'
      },
      pattern: {
        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        message: 'Email không đúng định dạng'
      }
    },
    password: {
      required: 'Mật khẩu là bắt buộc',
      maxLength: {
        value: 160,
        message: 'Độ dài ký tự phải từ 6-160'
      },
      minLength: {
        value: 6,
        message: 'Độ dài ký tự phải từ 6-160'
      }
    },
    confirm_password: {
      required: 'Xác nhận mật khẩu là bắt buộc',
      maxLength: {
        value: 160,
        message: 'Độ dài ký tự phải từ 6-160'
      },
      minLength: {
        value: 6,
        message: 'Độ dài ký tự phải từ 6-160'
      },
      validate: typeof getRules === 'function' ? ((value) => value === getValues('password') || "Confirm chưa giống với password") : undefined
    },
  }
}


export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  })
})


export type Schema = yup.InferType<typeof schema>
