import React, { useState, useEffect } from 'react';
import './css/flashcard.css';
import HoverMenu from './HoverMenu';

const FlashWord = ({ cardData })  => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [paging, setPaging ] = useState(0);
    const [animation, setAnimation] = useState('');
  
    const slideToNextCard1 = () => {
      if (isAnimating) return; // アニメーション中は次のカードに移動しない
      setPaging(0);
      setIsAnimating(true);

      const nextIndex = (currentIndex + 1) % cardData.length;
      setCurrentIndex(nextIndex);
      setAnimation('enter-from-right'); 
      
      setTimeout(() => {
        setAnimation('activate'); 
        setIsAnimating(false); // アニメーションが終わったらフラグをリセット
      }, 400); // アニメーション時間と一致させる
    };

    const slideToNextCard2 = () => {
      if (isAnimating) return; // アニメーション中は次のカードに移動しない
      if (paging===0){
          setPaging(1);
          return
      }
        if (paging===1){
          setPaging(2);
          return
      }
        // if (isAnimating) return; // アニメーション中は次のカードに移動しない
        setPaging(0); 
        setIsAnimating(true);
        setAnimation('enter-from-right'); 
        const nextIndex = (currentIndex + 1) % cardData.length;
        setCurrentIndex(nextIndex);
    
        setTimeout(() => {
          setAnimation('activate'); 
          setIsAnimating(false); // アニメーションが終わったらフラグをリセット
        }, 400); // アニメーション時間と一致させる
      };

      const slideToPrevious1 = () => {
        if (isAnimating) return; // アニメーション中は次のカードに移動しない

        setPaging(0);
        setIsAnimating(true);
        setAnimation('enter-from-left'); 

        if (currentIndex ===0 ) {
          setCurrentIndex(cardData.length-1);
        }else{
          const nextIndex = (currentIndex -1 ) % cardData.length;
          setCurrentIndex(nextIndex);
        }
          setTimeout(() => {
          setAnimation('active')
          setIsAnimating(false); // アニメーションが終わったらフラグをリセット
        }, 400); // アニメーション時間と一致させる
      };
  
      const slideToPrevious2 = () => {
        if (isAnimating) return; // アニメーション中は次のカードに移動しない

        if (paging===2){
          setPaging(1);
        }else if(paging===1){
          setPaging(0);
        }else {
          setPaging(1);
        } 
      };



    return (
      <>
        {cardData.length > 0 ?
        (<div className="flashcard-container">
        {cardData.map((card, index) => (
          <div key={index} className={`flashcard ${index === currentIndex ? animation : 'hidden'}`}
          style = {{display:'block',width:'100%',height:'100%'}}>

          <div className={'upperpart'} style = {{height:'30%',position:'relative'}}>
            <div className={'left'} onClick={slideToPrevious1} style={{position: 'absolute',zIndex:"2",left:'0',width:'40%'}}></div>
            <div className={'right'} onClick={slideToNextCard1} style={{position: 'absolute',zIndex:"2",right:'0',width:'60%'}}></div>
            <span style={{position: 'absolute',zIndex:"1",top: '50%',left: '50%',transform: 'translate(-50%, -50%)'}}>
                {card.word} </span>
          </div>

          <div className={paging ===0 ? 'underpart graystatus' : 'underpart'} style = {{height:'65%',position:'relative'}}>
            <div className={'left'} onClick={slideToPrevious2} style={{position: 'absolute',zIndex:"2",left:'0',top:'0',width:'40%'}}></div>
            <div className={'right'} onClick={slideToNextCard2} style={{position: 'absolute',zIndex:"2",right:'0',top:'0',width:'60%'}}></div>
            <div style={{position: 'absolute',zIndex:"1"}}>
                  <span className={paging ===2 ? "mean1":"noneDisplay"}>{card.mean1}<br /><br /></span>
                  <span  className={paging===2 ? 'mean2':"noneDisplay"}>{card.mean2}</span>
                  <img  className={paging ===1 ? "meanImage": "noneDisplay"} src={card.img} alt="generated image by API" 
              style={{height:'100%',maxHeight: '100%', objectFit: 'contain',margin: 'auto',}} />
            </div>
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

export default FlashWord
