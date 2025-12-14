import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
  const { isAuth, setIsAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem('isAuth');
    navigate('/');
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li><Link to="/" className="nav-link">Inicio</Link></li>
          <li><Link to="/acercade" className="nav-link">Sobre Nosotros</Link></li>
          <li><Link to="/contacto" className="nav-link">Contacto</Link></li>
          <li><Link to="/carrito" className="nav-link">Carrito</Link></li>
          <li><Link to="/admin/pedidos" className="nav-link">Pedidos</Link></li>
          {!isAuth ? (
            <li><Link to="/login" className="nav-link">Login</Link></li>
          ) : (
            <>
              <li><Link to="/admin" className="nav-link">Admin</Link></li>
              <li>
                <button className="logout-button" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

