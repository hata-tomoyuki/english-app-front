import React,{ useContext,useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import dayjs from "dayjs";

import { CookiesProvider, withCookies } from 'react-cookie';
import styles from './css/main.module.css';
import axios from 'axios';
import API_URL from '../config';

const MainPage = (props) => {
  const { memo1Table, loading, userName } = useContext(DataContext);
  const navigate = useNavigate();

  const today = dayjs().format("YYYY-MM-DD");
  const oneWeekAgo = dayjs().subtract(7, "day").format("YYYY-MM-DD");

  const [startDate1,setStartDate1]=useState(oneWeekAgo)
  const [startDate2,setStartDate2]=useState(oneWeekAgo)
  const [startDate3,setStartDate3]=useState(oneWeekAgo)
  const [endDate1,setEndDate1]=useState(today)
  const [endDate2,setEndDate2]=useState(today)
  const [endDate3,setEndDate3]=useState(today)

  const handleSubmit1 = (event) => {
    event.preventDefault();
    console.log(startDate1,endDate1)
    navigate(`/word/calendar?startDate=${startDate1}&endDate=${endDate1}`);
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
    console.log(startDate2,endDate2)
    navigate(`/memo1/calendar?startDate=${startDate2}&endDate=${endDate2}`);
  };

  const handleSubmit3 = (event) => {
    event.preventDefault();
    console.log(startDate3,endDate3)
    navigate(`/memo2/calendar?startDate=${startDate3}&endDate=${endDate3}`);
  };

  const handleLogout = async () => {

    // const token = localStorage.getItem('current-token');
    // try {
    //   await axios.post(`${API_URL}/api/logout/`, null, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-CSRFToken': document.cookie.match(/csrftoken=([^;]*)/)?.[1], // CSRFトークンを取得
    //       ...(token && { 'Authorization': `Bearer ${token}` }),
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

    <div style={{
      backgroundImage: 'url("/images/login_background2.webp")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      color: '#d0d0d0',
      }}>
<div className={styles['main-container']}>
<div className = {styles["menu-container"]}>
        {/* <button class="media-large btn btn-secondary mb-2"  style={{marginTop:'5em'}}>チュートリアル</button> */}
        <Link to="/word">
                <button className="media-large btn btn-secondary mb-2" style={{marginTop:'1rem'}}>英単語帳編集</button>
        </Link>
        <Link to="/memo1">
                <button className="media-large btn btn-secondary mb-2" style={{marginTop:'1rem'}}>メモ帳１編集</button>
        </Link>
        <Link to="/memo2">
                <button className="media-large btn btn-secondary mb-2" style={{marginTop:'1rem'}}>メモ帳２編集</button>
        </Link>


        <div style={{border: '2px solid #8FBC8F', borderRadius: '10px', padding:'5%',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1em' }}>
        <form onSubmit={handleSubmit1}>
          <p style={{fontSize:'20px',marginBottom:'10px',alignSelf: 'flex-start'}}>英単語ドリル</p>
          <div style={{display: 'flex', justifyContent: 'flex-end',gap:'1em', width:'100%'}}>
          <label htmlFor="start_date" style={{justifyContent:'flex-start'}}>From:</label>
          <input type="date" id="start_date" value={startDate1} onChange={(e) => setStartDate1(e.target.value)}
          />
          </div>
          <br />
          <div style={{display: 'flex', justifyContent: 'flex-end',gap:'1em', width:'100%'}}>
          <label htmlFor="end_date">to:</label>
          <input type="date" id="end_date" value={endDate1} onChange={(e) => setEndDate1(e.target.value)}
          /></div>
          <br />
          <button type="submit" class='btn btn-success block' style={{width:'75%', alignSelf:'right'}}>開始</button>
        </form>
        </div>

        <div style={{border: '2px solid #339fff', borderRadius: '10px', padding:'5%',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1em'}}>
        <form onSubmit={handleSubmit2}>
        <p style={{fontSize:'20px',marginBottom:'10px',alignSelf: 'flex-start'}}>メモ帳１ドリル</p>
          <div style={{display: 'flex', justifyContent: 'flex-end',gap:'1em', width:'100%'}}>
          <label htmlFor="start_date" style={{justifyContent:'flex-start'}}>From:</label>
          <input type="date" id="start_date" value={startDate2} onChange={(e) => setStartDate2(e.target.value)}
          />
          </div>
          <br />
          <div style={{display: 'flex', justifyContent: 'flex-end',gap:'1em', width:'100%'}}>
          <label htmlFor="end_date">to:</label>
          <input type="date" id="end_date" value={endDate2} onChange={(e) => setEndDate2(e.target.value)}
          /></div>
          <br />
          <button type="submit" class='btn btn-primary block' style={{width:'75%', alignSelf:'right'}}>開始</button>
        </form>
        </div>

        <div style={{border: '2px solid #55d0ff', borderRadius: '10px', padding:'5%',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1em'}}>
        <form onSubmit={handleSubmit3}>
        <p style={{fontSize:'20px',marginBottom:'10px',alignSelf: 'flex-start'}}>メモ帳２ドリル</p>
          <div style={{display: 'flex', justifyContent: 'flex-end',gap:'1em', width:'100%'}}>
          <label htmlFor="start_date" style={{justifyContent:'flex-start'}}>From:</label>
          <input type="date" id="start_date" value={startDate3} onChange={(e) => setStartDate3(e.target.value)}
          />
          </div>
          <br />
          <div style={{display: 'flex', justifyContent: 'flex-end',gap:'1em', width:'100%'}}>
          <label htmlFor="end_date">to:</label>
          <input type="date" id="end_date" value={endDate3} onChange={(e) => setEndDate3(e.target.value)}
          /></div>
          <br />
          <button type="submit" class='btn btn-light block' style={{width:'75%', alignSelf:'right'}}>開始</button>
        </form>

        {/* <form method="get" action="{% url 'wlist:word_drill' %}" >
            <p class="block">英単語ドリル</p>
            <div style={{display: 'flex',justifyContent: 'flex-end',gap:'1em'}}>
            <label for="w1_date">From:</label> */}
            {/* <input type="date" id="w1_date" name="start_date" value="{{ start_date | date:'Y-m-d'}}"> */}
            {/* </div>
            <div style={{display: 'flex',justifyContent: 'flex-end',gap:'1em'}}>
            <label for="w2_date">To:</label> */}
            {/* <input type="date" id="w2_date" name="end_date" value="{{ end_date | date:'Y-m-d'}}"> */}
            {/* </div>
            <button class='btn btn-success block' style={{width: '85%', alignSelf: 'right'}} type="submit">開始</button>
        </form> */}

        </div>
</div>



<div className={styles["content-container"]}>
        <div className={styles["container"]} style={{display: "block",margin:"20px"}}>
            <h2>エビングハウス 英単語帳＆メモ帳</h2>
            <p>{props.cookies.get("username")} さん</p>    
        </div>
        <div className={styles["container"]} style={{display: "flex",margin:"20px"}}>
            <div id={styles["menu1"]} style={{border:"8px solid greenyellow",  backgroundColor:"rgba(0,100,100,0.2)"}}>
                <h3>英単語帳</h3>
                <Link to="/word/create">
                <button className="btn btn-success mb-2" >今日のインプット</button>
                </Link>
                <Link to="/word/review">
                <button className="btn btn-success mb-2" >復習（1,7,28日前）</button>
                </Link>
                <Link to="/word/all">
                <button className="btn btn-success mb-2" >ＡＬＬ</button>
                </Link>
            </div>

            <div id={styles["menu2"]} style={{border:"8px solid #339fff",  backgroundColor:"rgba(50,100,150,0.2)"}}>
                <h3>メモ帳１</h3>
                <Link to="/memo1/create">
                <button className="btn btn-primary mb-2" >今日のインプット</button>
                </Link>
                <Link to="/memo1/review">
                <button className="btn btn-primary mb-2" >復習（1,7,28日前）</button>
                </Link>
                <Link to="/memo1/all">
                <button className="btn btn-primary mb-2" >ＡＬＬ</button>
                </Link>
            </div>
            

            <div id={styles["menu1"]} style={{border:'8px solid #55d0ff', backgroundColor: 'rgba(60,100,60,0.2)'}}>
                <h3>メモ帳２</h3>
                <Link to="/memo2/create">
                <button className="btn btn-light mb-2" >今日のインプット</button>
                </Link>
                <Link to="/memo2/review">
                <button className="btn btn-light mb-2" >復習（1,7,28日前）</button>
                </Link>
                <Link to="/memo2/all">
                <button className="btn btn-light mb-2" >ＡＬＬ</button>
                </Link>
            </div>
            </div>
            <button className={styles['logout']} onClick={handleLogout} aria-label="ログアウト">ログアウト</button>
            </div></div>    </div>
  );
};

export default withCookies(MainPage);