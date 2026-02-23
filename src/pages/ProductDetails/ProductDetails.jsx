// CSS imports
import { useParams, Link } from 'react-router-dom';
import './ProductDetails.css';
import { useEffect, useState, useContext } from 'react';
import { getProduct } from '../../apis/fakeStoreProdApis';
import UserContext from '../../context/UserContext';
import CartContext from '../../context/CartContext';
import axios from 'axios';

function ProductDetails() {
    const {id} = useParams();
    const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addingToCart, setAddingToCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

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

    async function addToCart() {
        if (!user) {
            alert('Please login to add items to cart');
            return;
        }

        if (!product) {
            return;
        }

        try {
            setAddingToCart(true);
                const cartItem = {
                productId: parseInt(id),
                quantity: 1
            };

            let newCart;
            if (cart && cart.products) {
                const existingItemIndex = cart.products.findIndex(
                    item => item.productId === parseInt(id)
                );
                
                if (existingItemIndex > -1) {
                    newCart = {
                        ...cart,
                        products: cart.products.map((item, index) => 
                            index === existingItemIndex 
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    };
                } else {
                    newCart = {
                        ...cart,
                        products: [...cart.products, cartItem]
                    };
                }
            } else {
                newCart = {
                    id: Date.now(), 
                    userId: user.id,
                    date: new Date().toISOString().split('T')[0],
                    products: [cartItem]
                };
            }

            setCart(newCart);
            setAddedToCart(true);
            
            setTimeout(() => setAddedToCart(false), 2000);

        } catch (err) {
            console.error('Error adding to cart:', err);
            alert('Failed to add item to cart. Please try again.');
        } finally {
            setAddingToCart(false);
        }
    }

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

                            <button 
                                onClick={addToCart}
                                disabled={addingToCart || !user}
                                className={`product-details-action btn ${addedToCart ? 'btn-success' : 'btn-primary'} text-decoration-none`}
                            >
                                {addingToCart ? 'Adding...' : addedToCart ? 'Added to Cart!' : 'Add to cart'}
                            </button>
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