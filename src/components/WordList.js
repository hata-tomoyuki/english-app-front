import React,{useContext,useState,useEffect} from 'react'
import { DataContext } from '../context/DataContext';

import { Typography } from '@mui/material';

import dayjs from 'dayjs';

import './css/list.css';
import HoverMenu from './HoverMenu';
import DeleteModal from './DeleteModal';
import UpdateModalWord from './UpdateModalWord';
import API_URL from '../config';

const WordList = () => {
  const { wordTable, setWordTable , loading } = useContext(DataContext);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);  // モーダル表示時の値の受渡し

  const api_url = `${API_URL}/api_word/word/`

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}月${date.getDate()}日`; // 月は0始まり
};

  if (loading) {
      return <p>Loading...</p>;
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try{
  //       const response = await axios.get('http://localhost:8000/api_word/word',{
  //         headers: {
  //           'Authorization': `Token ${token}`
  //         }
  //       })
  //       response.data && setTableData(response.data)

  //       for (let i=0;i<3;i++){
  //       console.log(response.data[i].word)
  //     }
  //     }catch(error){
  //       console.log(error)
  //     }
  //   setLoading(false);
  //   };fetchData();
  //   }, [] ) 

  //  const filteredData = tableData.filter(data => 
  //   [today,agoDay1,agoDay7,agoDay28].includes(data.reg_date));
   
//   const reviewData = tableData.filter(data => data.date.includes());

 

  return (
    <div>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4" style={{marginTop:'20px'}}>英単語リスト</h1>
    </div>
   </div>

   <div>
   <div class="container" style={{height:'100%'}}>
              {wordTable
              .slice()
              .sort((a,b)=> new Date(b.reg_date) - new Date(a.reg_date))
              .map(item => (
            <div class="word-and-buttons" key={item.id}>
              <span class="word">{ item.word }</span>
              <span class="mean1">{ item.mean1 }</span>
              <span class="mean2">{ item.mean2 }</span>
     
              <span class="date">{formatDate(item.reg_date)}</span>
            
            <div class="buttons">
            <button onClick={() => {setSelectedItem(item);setUpdateIsOpen(true)}} class="btn btn-info"   >編集</button>
            <button onClick={() => {setSelectedItem(item);setDeleteIsOpen(true)}} class="btn btn-success">削除</button>

            {selectedItem &&(
            <UpdateModalWord isOpen={updateIsOpen} onRequestClose={() => setUpdateIsOpen(false)}
            data={selectedItem} dataDisplay={selectedItem.word}
            setTable={setWordTable} apiUrl={api_url} />
            )}

            {selectedItem &&(
            <DeleteModal isOpen={deleteIsOpen} onRequestClose={() => setDeleteIsOpen(false)}
            data={selectedItem} dataDisplay={selectedItem.word.slice(0,20)}
            setTable={setWordTable} apiUrl={api_url}  />
            )}

            </div>
            </div>

    ))}
    </div>
    </div>

    <HoverMenu links={[]}/>
    </div>
  )
}

export default WordList
