import React,{ useContext,useState,useEffect } from 'react';
import { DataContext } from '../context/DataContext';

// import axios from 'axios'
import { Typography } from '@mui/material';

// import { useCookies } from 'react-cookie';          // useCookiesを使う
import dayjs from 'dayjs';

// import './css/flashcard.css';
// import FlashCard from './FlashCard';
import './css/list.css';
import HoverMenu from './HoverMenu';
import DeleteModal from './DeleteModal';
import UpdateModalMemo2 from './UpdateModalMemo2';

import API_URL from '../config';

const Memo2List = () => {
  const { memo2Table, setMemo2Table , loading } = useContext(DataContext);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);  // モーダル表示時の値の受渡し

  const api_url = `${API_URL}/api_memo2/memo2/`

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}月${date.getDate()}日`; // 月は0始まり
};

  if (loading) {
      return <p>Loading...</p>;
  }


  return (
    <div>
   <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4" style={{marginTop:'20px'}}>メモリスト</h1>
    </div>
   </div>
    
      <div>
          <div class="container" style={{height:'100%'}}>
              {memo2Table
              .slice()
              .sort((a,b)=> new Date(b.reg_date) - new Date(a.reg_date))
              .map(item => (
            <div class="word-and-buttons" key={item.id}>
              <span class="memo1">{ item.memo1 }</span>
              <span class="memo2">{ item.memo2 }</span>
     
              <span class="date">{formatDate(item.reg_date)}</span>
            
            <div class="buttons">
            <button onClick={() => {setSelectedItem(item);setUpdateIsOpen(true)}} class="btn btn-info"   >編集</button>
            <button onClick={() => {setSelectedItem(item);setDeleteIsOpen(true)}} class="btn btn-success">削除</button>

            {selectedItem &&(
            <UpdateModalMemo2 isOpen={updateIsOpen} onRequestClose={() => setUpdateIsOpen(false)}
            data={selectedItem} dataDisplay={selectedItem.memo1}
            setTable={setMemo2Table} apiUrl={api_url} />
            )}

            {selectedItem &&(
            <DeleteModal isOpen={deleteIsOpen} onRequestClose={() => setDeleteIsOpen(false)}
            data={selectedItem} dataDisplay={selectedItem.memo1.slice(0,30)}
            setTable={setMemo2Table} apiUrl={api_url}  />
            )}

            </div>
            </div>

            ))}
          </div>

          {/* <ul>
              {memo1Table.map(item => (
                <div class="word-and-buttons">
               <li key={item.id}>{item.memo}</li>
               </div>
            ))}
          </ul> */}
        </div>
    {/* <HoverMenu links={{ href: '/memo1', text: 'メモ帳編集'}} /> */}
    <HoverMenu links={[]} />
    {/* <DeleteModal /> */}
    </div>
  );
}


export default Memo2List
