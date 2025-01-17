import React from 'react';
import './style.css';

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

interface CartProduct extends Product {
  quantity: number;
}

interface CartProps {
  products: CartProduct[];
  onClose: () => void;
  onPlaceOrder: () => void;
}

const Cart: React.FC<CartProps> = ({ products, onClose, onPlaceOrder }) => {
  const totalAmount = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className="cart">
      <div className="cart-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Кошик</h2>
        {products.length === 0 ? (
          <p>Кошик порожній</p>
        ) : (
          <ul>
            {products.map(product => (
              <li key={product.id} className="cart-item">
                <img src={product.image} alt={product.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{product.title}</h3>
                  <p>{product.price} грн</p>
                  <p>Кількість: {product.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {products.length > 0 && (
          <>
            <p>Загальна сума: {totalAmount} грн</p>
            <button className="place-order-button" onClick={onPlaceOrder}>Оформити замовлення</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;