import './Home.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';

const Home = () => {
  const {error , loading} = useContext(CartContext)

  return (
    <div className='home-background'>
      <Header />
      <div className='home-content'>
        {loading && <p>Cargando productos...</p>}
        {error && <p>{error}</p>}
        <ProductCard />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
