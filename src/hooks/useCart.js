import { useContext, useEffect, useState } from "react";
import CartContext from "../context/CartContext";
import axios from "axios";
import { getCartByUser } from "../apis/fakeStoreProdApis";

function useCart(userId)
{
    const {cart,setCart}=useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchUserCart(userId)
    {
        if (!userId) {
            console.warn('UserId is not provided, skipping cart fetch');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(getCartByUser(userId));
            setCart(response.data[0] || null);
        } catch (err) {
            console.error('Error fetching user cart:', err);
            setError('Failed to load cart');
            setCart(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserCart(userId);
    }, [userId]);

    return [cart, setCart, loading, error];
}

export default useCart;