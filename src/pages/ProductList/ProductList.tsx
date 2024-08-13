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
import categoryApi from 'src/apis/category.api'
import useQueryConfig from 'src/hook/useQueryConfig'
export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function ProductList() {
  const queryConfig = useQueryConfig()
  const queryParams: ProductListConfig = useQueryParams()
  const { data: ProductsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000
  })
  const { data: CategoryData } = useQuery({
    queryKey: ['category', queryConfig],
    queryFn: () => categoryApi.getCategory(),
    placeholderData: keepPreviousData
  })
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {ProductsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3 bg-white px-6'>
              <AsideFilter queryConfig={queryConfig} categories={CategoryData?.data.data || []} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={ProductsData?.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {ProductsData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={ProductsData?.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
