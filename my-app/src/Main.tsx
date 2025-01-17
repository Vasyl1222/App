import React from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

interface MainProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  isLoading: boolean;
  error: string | null;
}

const Main: React.FC<MainProps> = ({ products, onAddToCart, isLoading, error }) => {
  if (isLoading) return <p>Завантаження товарів...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <div className="product-cards">
        {products.map((product) => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price} грн</p>
            <button onClick={() => onAddToCart(product)}>Купити</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Main;
