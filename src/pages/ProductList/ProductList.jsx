// CSS import
import './ProductList.css';

import ProductBox from '../../components/ProductBox/ProductBox';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllProducts, getAllProductsByCategory } from '../../apis/fakeStoreProdApis';

function ProductList() {
   const [productList, setProductList] = useState(null);
   const [query]=useSearchParams();

    async function downloadProducts(category) {
       const downloadUrl= category ? getAllProductsByCategory(category) : getAllProducts();
        const response = await axios.get(downloadUrl);
        setProductList(response.data);
        console.log(response.data);
    }

    useEffect(() => {
        downloadProducts(query.get("category"));
    }, []) 
    return (
        <div className='container'>
            <div className='row'>
                <h2 className='product-list-title text-center'>All Products</h2>
                <div className='product-list-wrapper d-flex flex-row'>

                    <div className='product-list-box' id='productList'>

                        {productList && productList.map((product)=><ProductBox key={product.id} 
                                            name={product.title}
                                            price={product.price}
                                            productImage={product.image}/>)}

                    </div>


                </div>
            </div>
        </div>
    )
}

export default ProductList;