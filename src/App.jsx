
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {

  return (
    <>
      <Header color="light" light={true} expand="md" container="md" />
       <AppRoutes/>
      <Footer />
    </>
  )
}

export default App
