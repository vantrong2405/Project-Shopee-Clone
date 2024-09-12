import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { useContext } from 'react'
import { themeContext } from 'src/context/app.context'
import userImage from '../../../../assets/images/user.png'
import { getAvatarUrl } from 'src/utils/utils'
export default function UserSideNav() {
  const { profile } = useContext(themeContext)
  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
        <img src={getAvatarUrl(profile?.avatar)} alt='' className='h-full w-full object-cover' />
        </Link>
        <div className='flex-grow pl-4'>
        <div className='mb-1 truncate font-semibold text-gray-600'>{profile?.email}</div>
          <Link to={path.profile} className='flex items-center capitalize text-gray-500'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <Link to={path.profile} className='flex items-center capitalize text-orange transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://img.favpng.com/1/4/11/portable-network-graphics-computer-icons-google-account-scalable-vector-graphics-computer-file-png-favpng-HScCJdtkakJXsS3T27RyikZiD.jpg' alt='' className='h-full w-full' />
          </div>
          Tài khoản của tôi
        </Link>
        <Link to={path.changePassword} className='mt-4 flex items-center capitalize text-gray-600 transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://www.pngfind.com/pngs/m/202-2021961_png-file-svg-change-password-line-icon-transparent.png' alt='' className='h-full w-full' />
          </div>
          Đổi mật khẩu
        </Link>
        <Link to={path.historyPurchase} className='mt-4 flex items-center capitalize text-gray-600 transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://www.clipartmax.com/png/middle/173-1736169_receipt-comments-purchase-invoice-icon-png.png' alt='' className='h-full w-full' />
          </div>
          Đơn mua
        </Link>
      </div>
    </div>
  )
}