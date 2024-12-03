import React, { useState, useEffect } from 'react';
import './css/hovermenu.css';
import axios from 'axios';
import API_URL from '../config';

const HoverMenu = ({links}) => {
  const [menuWidth, setMenuWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 567);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientX < 100) {
        setMenuWidth(100); // メニューを表示
      } else {
        setMenuWidth(0); // メニューを非表示
      }
    };

    // const handleResize = () => {
    //   if (window.innerWidth > 567) {
    //     window.addEventListener('mousemove', handleMouseMove);
    //   } else {
    //     window.removeEventListener('mousemove', handleMouseMove);
    //     setMenuWidth(0); // 小さい画面ではメニューを非表示
    //   }
    // };

  //   // 初期実行
  //   handleResize();
  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //     window.removeEventListener('resize', handleResize);
  //   };

  // }, []);


  const handleResize = () => {
    setIsMobile(window.innerWidth <= 567);
  };

  if (!isMobile) {
    window.addEventListener('mousemove', handleMouseMove);
  }

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', handleResize);
  };
}, [isMobile]);



  const handleLogout = async () => {
    // try {
    //   await axios.post(`${API_URL}/api/logout/`, null, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-CSRFToken': document.cookie.match(/csrftoken=([^;]*)/)?.[1], // CSRFトークンを取得
    //     },
    //     withCredentials: true, // クッキーを送信
    //   });
      
      localStorage.removeItem('current-token');
      localStorage.removeItem('username');
      window.location.href = '/';
    // } catch (error) {
    //   console.error('ログアウトエラー:', error);
    // }
  };
  
  return (
    <div
      id="hoverMenu"
      style={ isMobile ? {} : { width: `${menuWidth}px` }
        // width: `${menuWidth}px`,
        // height: '100vh',
        // position: 'fixed',
        // top: 0,
        // left: 0,
        // backgroundColor: '#333',
        // color: 'white',
        // overflow: 'hidden',
        // transition: 'width 0.3s ease',
      }
    >

      <a href="/main" >TOP</a>
      <a href={links.href} >{links.text}</a>

      <button className='LogoutButton' onClick={handleLogout} style={{
        backgroundColor: 'transparent',
        color: 'rgba(15, 115, 230, 1)',
        border: 'none',
        cursor: 'pointer',
      }}aria-label="ログアウト">LOG OUT</button>

    </div>
  );
};

export default HoverMenu;