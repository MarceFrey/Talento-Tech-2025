import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import './Toast.css';

const Toast = () => {
  const { mensaje } = useContext(CartContext);

  if (!mensaje) return null;

  return (
    <div className="toastt">
      {mensaje}
    </div>
  );
};

export default Toast;

