import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.tsx';
import Main from './Main.tsx';
import Footer from './Footer.tsx';
import Cart from './Cart.tsx';
import product1Image from './img/1.png';
import product2Image from './img/image.png';

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

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Товар 1',
    description: 'Опис товару 1',
    image: product1Image || 'https://via.placeholder.com/150',
    price: 100,
  },
  {
    id: 2,
    title: 'Товар 2',
    description: 'Опис товару 2',
    image: product2Image || 'https://via.placeholder.com/150',
    price: 200,
  },
];


const App: React.FC = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orderMessage, setOrderMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sendProductsToServer(mockProducts);
  }, []);

  const sendProductsToServer = async (products: Product[]) => {
    try {
      const existingProducts = await axios.get<Product[]>('https://fakestoreapi.com/products');
      console.log('Existing products:', existingProducts.data);
  
      const filteredProducts = products.filter(
        (product) => !existingProducts.data.some((item) => item.title === product.title)
      );
  
      for (const product of filteredProducts) {
        const response = await axios.post('https://fakestoreapi.com/products', product);
        console.log('Product sent:', response.data);
      }
  
      fetchProductsFromServer();
    } catch (err: any) {
      console.error('Error sending products to server:', err.response || err.message);
      setError('Не вдалося відправити товари. Спробуйте пізніше.');
    }
  };
  
  const fetchProductsFromServer = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
      if (response.data) {
        setProducts(response.data);
        console.log('Fetched products:', response.data);
      } else {
        throw new Error('Порожній список товарів.');
      }
    } catch (err: any) {
      console.error('Error fetching products:', err.response || err.message);
      setError('Не вдалося завантажити товари. Спробуйте пізніше.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCartClick = () => {
    setIsCartVisible(true);
  };

  const handleCloseCart = () => {
    setIsCartVisible(false);
  };

  const handleAddToCart = (product: Product) => {
    setCartProducts((prevProducts) => {
      const existingProduct = prevProducts.find((p) => p.id === product.id);
      if (existingProduct) {
        return prevProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevProducts, { ...product, quantity: 1 }];
      }
    });
  };

  const handlePlaceOrder = () => {
    setOrderMessage('Замовлення оформлене');
    setCartProducts([]);
    setTimeout(() => {
      setOrderMessage('');
      setIsCartVisible(false);
    }, 2000);
  };

  return (
    <div>
      <Header onCartClick={handleCartClick} />
      <Main
        products={products}
        onAddToCart={handleAddToCart}
        isLoading={isLoading}
        error={error}
      />
      <Footer />
      {isCartVisible && (
        <Cart
          products={cartProducts}
          onClose={handleCloseCart}
          onPlaceOrder={handlePlaceOrder}
        />
      )}
      {orderMessage && <div className="order-message">{orderMessage}</div>}
    </div>
  );
};

export default App;
