
import { useState } from 'react';
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import CartContext from './context/CartContext';
import UserContext from './context/UserContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);


  return (
    <>
    <UserContext.Provider value={{user, setUser}}>
    <CartContext.Provider value={{cart, setCart}}>
    <div className="app-wrapper">
      <Header 
        color="light" 
        light={true} 
        expand="md" 
        container="md"
      />
     <AppRoutes/>
      <Footer />
    </div>
    </CartContext.Provider>
    </UserContext.Provider>
    </>
  )
}

export default App
