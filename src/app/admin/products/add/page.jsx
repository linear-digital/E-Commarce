'use client';
import { fetcher } from '@/Components/instance/api';
import React, { useEffect } from 'react';
import Details from '../Product/Details';

const page =  () =>
{
    const [categories, setCategories] = React.useState([]);
    const [brands, setBrands] = React.useState([]);
      useEffect(() =>
      {
        (async () =>
        {
          const res = await fetcher({
            path: "/api/categories",
          });
          setCategories(res);
          const res2 = await fetcher({
            path: "/api/brands",
          });
          setBrands(res2);
        })();
      }, []);
    
    return (
        <div>
            <Details categories={categories} brands={brands} />
        </div>
    );
};

export default page;