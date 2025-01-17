import React, { useState } from 'react';
import './style.css';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const [popupContent, setPopupContent] = useState<string>('');
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  const handleMenuClick = (content: string) => {
    setPopupContent(content);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <header>
      <h1>Сайт</h1>
      <nav>
        <ul>
          <li><a href="#about" onClick={() => handleMenuClick('Про нас: Ми компанія, яка займається...')}>Про нас</a></li>
          <li><a href="#contact" onClick={() => handleMenuClick('Контакти: Ви можете зв\'язатися з нами за номером...')}>Контакти</a></li>
          <li><a href="#cart" onClick={onCartClick}>🛒 Кошик</a></li>
        </ul>
      </nav>
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>&times;</span>
            <p>{popupContent}</p>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;