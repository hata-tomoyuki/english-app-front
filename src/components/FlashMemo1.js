import React, { useState, useEffect } from 'react';
import './css/flashcard.css';
import HoverMenu from './HoverMenu';

const FlashMemo1 = ({ cardData })  => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
  
    const slideToNextCard = () => {
      if (isAnimating) return; // アニメーション中は次のカードに移動しない
      setIsAnimating(true);
      const nextIndex = (currentIndex + 1) % cardData.length;
      setCurrentIndex(nextIndex);
  
      setTimeout(() => {
        setIsAnimating(false); // アニメーションが終わったらフラグをリセット
      }, 400); // アニメーション時間と一致させる
    };

    return (
      <>
        {cardData.length > 0 ?
        (<div className="flashcard-container" onClick={slideToNextCard}>
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`flashcard ${index === currentIndex ? 'active' : 'hidden'}`}
          >
            {card.memo}
          </div>
        ))}
      </div>)

      :(<div class="no-data">
      記録されているメモがありません。
      <div>
      <a href="/main" class="button">戻る</a>
      </div>
      </div>)}
      </>
    );
}

export default FlashMemo1
