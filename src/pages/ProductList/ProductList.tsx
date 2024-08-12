import { keepPreviousData, useQuery } from '@tanstack/react-query'
import AsideFilter from './AsideFilter'
import Product from 'src/Components/Product'
import SortProductList from 'src/Components/SortProductList'
import useQueryParams from 'src/hook/useQueryParams'
import productApi from 'src/apis/product.api'
import Pagination from 'src/Components/Pagination'
import { useState } from 'react'
import { isUndefined, omitBy } from 'lodash'
import { ProductListConfig } from 'src/type/product.type'
export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function ProductList() {
  const queryParams: ProductListConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter
    },
    isUndefined
  )
  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    placeholderData: keepPreviousData
  })
  console.log(queryConfig);
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {data &&
          (<div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3 bg-white px-6'>
              <AsideFilter />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={data?.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {data.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={data?.data.data.pagination.page_size} />
            </div>
          </div>)
        }
      </div>
    </div>
  )
}