import React, { useState, useEffect } from 'react';
import './css/flashcard.css';
import HoverMenu from './HoverMenu';

const FlashCard = ({ cardData })  => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [paging, setPaging ] = useState(0);
  
    const slideToNextCard1 = () => {
      if (isAnimating) return; // アニメーション中は次のカードに移動しない
      setPaging(0);
      setIsAnimating(true);
      const nextIndex = (currentIndex + 1) % cardData.length;
      setCurrentIndex(nextIndex);
  
      setTimeout(() => {
        setIsAnimating(false); // アニメーションが終わったらフラグをリセット
      }, 400); // アニメーション時間と一致させる
    };

    const slideToNextCard2 = () => {
        if (paging===0){
        setPaging(1);
        return
    }
        // if (isAnimating) return; // アニメーション中は次のカードに移動しない
        setPaging(0); 
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
        (<div className="flashcard-container">
        {cardData.map((card, index) => (
          <div key={index} className={`flashcard ${index === currentIndex ? 'active' : 'hidden'}`}
          style = {{display:'block',width:'100%',height:'100%'}}>
          <div className={'upperpart'}  onClick={slideToNextCard1} style = {{width:'100%',height:'60%',alignContent:'center',fontSize:'5rem', justifyContent:'center',
              alignItems: 'center'}}>{card.memo1}</div>
          <div className={paging===0 ? 'underpart graystatus' : 'underpart'}
          onClick={slideToNextCard2} style = {{width:'100%',height:'35%',alignContent:'center',fontSize:'3rem'}}>{card.memo2}
          </div>
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

export default FlashCard


