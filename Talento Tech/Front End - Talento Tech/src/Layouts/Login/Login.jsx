import Header from '../../components/Header/Header';
import { useAuth } from '../../Context/AuthContext';
import './Login.css';

const Login = () => {
  const { email, setEmail, password, setPassword, handleSubmit, errors } = useAuth();

  return (
    <div className='login-background'>
      <Header />
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="login-title">Iniciar sesión</h1>

          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="login-error">{errors.email}</p>}
          </div>

          <div className="login-field">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="login-error">{errors.password}</p>}
          </div>

          <button type="submit" className="login-button">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;


