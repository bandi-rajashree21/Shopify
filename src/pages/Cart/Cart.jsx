import OrderDetailsProduct from '../../components/OrderDetailsProduct/OrderDetailsProduct';
import './Cart.css';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import useCart from '../../hooks/useCart';

function Cart() {
    const { user } = useContext(UserContext);
    const [cart, setCart, loading, error] = useCart(user?.id);

    return (
        <div className="container">
            <div className="row">
                <h2 className="cart-title text-center">Your cart</h2>
                
                {!user && (
                    <div className="alert alert-warning text-center">
                        <p>Please log in to view your cart.</p>
                        <a href="/signin" className="btn btn-primary">Login</a>
                    </div>
                )}

                {loading && (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Loading your cart...</p>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger" role="alert">
                        <p>{error}</p>
                    </div>
                )}

                {user && !loading && !error && (
                    <div className="cart-wrapper d-flex flex-row">
                    <div className="order-details d-flex flex-column" id="orderDetails">
                        <div className="order-details-title fw-bold">Order Details</div>
                        
                        <OrderDetailsProduct />
                        <hr />
                        <OrderDetailsProduct />
                        <hr />
                        
                    </div>

                    <div className="price-details d-flex flex-column" id="priceDetails">
                        <div className="price-details-box">


                            <div className="price-details-title fw-bold">Price Details</div>
                            <div className="price-details-data">
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Price</div>
                                    <div id="total-price"></div>
                                </div>
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Discount</div>
                                    <div>10</div>
                                </div>
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Delivery Charges</div>
                                    <div>FREE</div>
                                </div>
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Total</div>
                                    <div id="net-price"></div>
                                </div>
                            </div>

                        </div>
                        <div className="price-details-btn-group">
                            <a href="productList.html" className="continue-shopping-btn btn btn-info text-decoration-none">
                                Continue Shopping
                            </a>
                            <a href="checkout.html" className="checkout-btn btn btn-primary text-decoration-none">
                                Checkout
                            </a>
                        </div>
                        
                    </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart;