'use client'

import { createContext, useCallback, useEffect, useState } from "react";
import axios from "../../../axios";
import { useRouter } from "next/navigation";

// CREATING CONTEXT API
export const CartContext = createContext(null);

const CartContextWrapper = (props) => {
  const router = useRouter();

  const [cartData , setCartData] = useState([])

  const fetchCartDetails = useCallback(() => {
    let token
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('kardifywebtoken');
    }

    if (token) {
      axios.get('/api/get-carts', {
          headers: {
            Authorization: token
          },
        })
        .then((res) => {
          console.log(res)
          if (res.data.message === 'Session expired' || !localStorage.getItem('kardifywebtoken')) {
            // router.push('/login');
            localStorage.removeItem('kardifyuserid')
          } else if(res.data.status === 'success') {
            // console.log(res)
            setCartData(res.data.cartItems)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      fetchCartDetails();
    }

    return () => {
      unmounted = true;
    };
  }, [fetchCartDetails]);

  const [cartCounter, setCartCounter] = useState(0); 

  useEffect(() => {
    if (cartData) {
      setCartCounter(cartData.length);
    }
  }, [cartData]);

    const isLocalStorageAvailable = () => {
      try {
        const testKey = "__test__";
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
      } catch (e) {
        return false;
      }
    };
  
    useEffect(() => {
      if (isLocalStorageAvailable()) {
        // Your localStorage code
        const storedValue = localStorage.getItem('kardifyCartCounter');
        setCartCounter(storedValue !== null ? parseInt(storedValue) : 0);
  
        const handleStorageChange = (event) => {
          if (event.key === 'kardifyCartCounter') {
            setCartCounter(event.newValue !== null ? parseInt(event.newValue) : 0);
          }
        };
  
        window.addEventListener('storage', handleStorageChange);
  
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        };
      } else {
        console.error("localStorage is not available");
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem('kardifyCartCounter', cartCounter);
      fetchCartDetails()
    }, [cartCounter , fetchCartDetails]);

    return (
        // PASSING DATA STATE GETTER & SETTER AS CONTEXT VALUE
        <CartContext.Provider value={[cartCounter, setCartCounter]}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContextWrapper;