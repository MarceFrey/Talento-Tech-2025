import './Cart.css';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Carrrito from '../../components/Carrito/Carrito'

const Cart = () => {
  return (
    <div className='cart-background'>
      <Header />
      <div className='cart-content'>
        <Carrrito/>
      </div>
      <Footer />
    </div>
  )
}

export default Cart
