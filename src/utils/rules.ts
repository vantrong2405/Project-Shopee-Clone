import { formData } from 'src/type/@type'
import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
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