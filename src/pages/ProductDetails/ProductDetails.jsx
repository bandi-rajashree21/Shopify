// CSS imports
import { useParams, Link } from 'react-router-dom';
import './ProductDetails.css';
import { useEffect, useState } from 'react';
import { getProduct } from '../../apis/fakeStoreProdApis';
import axios from 'axios';

function ProductDetails() {
    const {id} = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function downloadProduct(id) {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(getProduct(id));
            setProduct(response.data);
            console.log(response.data);
        } catch (err) {
            console.error('Error fetching product:', err);
            setError('Product not found or failed to load');
            setProduct(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        downloadProduct(id);
    }, [id]);

    return (
        <div className="container">
            <div className="row">
                {loading && (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Loading product...</p>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger" role="alert">
                        <h4>Error</h4>
                        <p>{error}</p>
                        <button 
                            className="btn btn-primary" 
                            onClick={() => downloadProduct(id)}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {product && !loading && !error && (
                    <div className="product-details-wrapper d-flex justify-content-between align-items-start flex-row">
                        <div className="product-img d-flex">
                            <img 
                                src={product.image}
                                alt="product image" 
                                id="product-img" 
                            />
                        </div>

                        <div className="product-details-box d-flex flex-column">
                            <div id="productDetails">
                                {/* <!-- product details --> */}
                                <div className="product-name" id="product-name">{product.title}</div>
                                <div className="product-price fw-bold" id="product-price">${product.price}</div>
                                <div className="product-description">
                                    <div className="product-description-title fw-bold">Description</div>
                                    <div className="product-description-data" id="product-description-data">
                                    {product.description}
                                    </div>
                                </div>
                            </div>

                            <div className="product-details-action btn btn-primary text-decoration-non">Add to cart</div>
                            <Link to="/cart" id="goToCartBtn" className="product-details-action btn btn-warning text-decoration-none">
                                Go to cart
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductDetails;