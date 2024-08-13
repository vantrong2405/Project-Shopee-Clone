

import InputNumber from 'src/Components/InputNumber'
import path from 'src/constants/path'
import { Category } from 'src/type/category.type'
import { QueryConfig } from '../ProductList'
import { useForm, Controller } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from 'src/type/utils.type'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import Button from 'src/Components/Button'
interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>
const priceSchema = schema.pick(['price_min', 'price_max'])
export default function AsideFilter({ queryConfig, categories }: Props) {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema) as any
  })
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })
  const { category } = queryConfig
  const isActiveCategory = (isActive: string) => {
    return category === isActive
  }
  return (
    <div className='py-4' >
      <Link to={path.home} className={classNames('flex items-center font-bold', {
        'text-orange font-semibold': !category
      })} >
        <svg viewBox='0 0 12 10' className='w-3 h-4 mr-3 fill-current' >
          <g fillRule='evenodd' stroke='none' strokeWidth={1} >
            <g transform='translate(-373 -208)' >
              <g transform='translate(155 191)' >
                <g transform='translate(218 17)' >
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      < div className='bg-gray-300 h-[1px] my-4' />
      <ul>
        {categories.map((categorie) => {
          return (
            <li className='py-2 pl-2' key={categorie._id} >
              <Link to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  category: categorie._id
                }).toString()
              }} className={classNames('relative px-2 ', {
                'text-orange font-semibold': isActiveCategory(categorie._id)
              })}>
                <svg viewBox='0 0 4 7' className='fill-orange h-2 w-2 absolute top-1 left-[-10px]' >
                  <polygon points='4 3.5 0 0 0 7' />
                </svg>
                {categorie.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='flex items-center font-bold mt-4 uppercase' >
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='w-3 h-4 fill-current stroke-current mr-3'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      < div className='bg-gray-300 h-[1px] my-4' />
      <div className='my-5' >
        <div>Khoảng giá </div>
        <form className='mt-2' >
          <div className='flex items-start' >
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='₫ TỪ'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                  />
                )
              }}
            />
            <div className='mx-2 mt-2 shrink-0' > -</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='₫ ĐẾN'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                  />
                )
              }}
            />
          </div>
          <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
          <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center' >
            Áp dụng
          </Button>
        </form>
      </div>
      < div className='bg-gray-300 h-[1px] my-4' />
      <div className='text-sm' > Đánh giá </div>
      < ul className='my-3' >
        <li className='py-1 pl-2' >
          <Link to='' className='flex items-center text-sm' >
            {
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg viewBox='0 0 9.5 8' className='w-4 h-4 mr-1' key={index} >
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%' >
                        <stop offset={0} stopColor='#ffca11' />
                        <stop offset={1} stopColor='#ffad27' />
                      </linearGradient>
                      < polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      />
                    </defs>
                    < g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1} >
                      <g transform='translate(-876 -1270)' >
                        <g transform='translate(155 992)' >
                          <g transform='translate(600 29)' >
                            <g transform='translate(10 239)' >
                              <g transform='translate(101 10)' >
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ))
            }
            < span > Trở lên </span>
          </Link>
        </li>
        < li className='py-1 pl-2' >
          <Link to='' className='flex items-center text-sm' >
            {
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg viewBox='0 0 9.5 8' className='w-4 h-4 mr-1' key={index} >
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%' >
                        <stop offset={0} stopColor='#ffca11' />
                        <stop offset={1} stopColor='#ffad27' />
                      </linearGradient>
                      < polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      />
                    </defs>
                    < g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1} >
                      <g transform='translate(-876 -1270)' >
                        <g transform='translate(155 992)' >
                          <g transform='translate(600 29)' >
                            <g transform='translate(10 239)' >
                              <g transform='translate(101 10)' >
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ))
            }
            < span > Trở lên </span>
          </Link>
        </li>
      </ul>
      < div className='bg-gray-300 h-[1px] my-4' />
      <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center' >
        Xóa tất cả
      </Button>
    </div>
  )
}