import { formData } from 'src/type/@type'
import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup';
type Rules = { [key in keyof formData]?: RegisterOptions<formData> }
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
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp')
})

export const loginSchema = schema.omit(['confirm_password'])
export type Schema = yup.InferType<typeof schema>