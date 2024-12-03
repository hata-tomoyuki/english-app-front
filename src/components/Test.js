import React, {useState, useEffect} from 'react'
import axios from 'axios'

// import Button from '@mui/material/Button'
// import Modal from 'react-modal'
// import Typography from '@mui/material/Typography'
// import TextField from '@mui/material/TextField'
// import {makeStyles} from '@mui/styles'
// import {RiMailAddLine} from 'react-icons/ri'
// import {IoIosSend} from 'react-icons/io'
// import {IoMdClose} from 'react-icons/io'


const Test = () => {
    const [ memoList, setMemoList] = useState([])

    useEffect(()=>{
      const fetchData = async () => {
        try{
          const response = await axios.get('http://localhost:8000/api/memo1/memo1',{
            headers:{}
          })
          response.data && setMemoList(response.data)

          for (let i=0;i<5;i++){
          console.log(response.data[i].memo)
        }
        }catch(error){
          console.log(error)
        }}
        fetchData();
    }, [] ) 
    

  return (
    <div className='Memo1 List'>
      <h1>メモリスト</h1>
      {memoList.map((memo1) => {
      return(      
      <div className="one-data">
      <span key={memo1.id} className="Memo1">{memo1.memo}</span>
      <span key={memo1.id} className="date" >{memo1.reg_date}</span>
      <div className="buttons">
       <a href ="{% url 'wlist:memo_update' m.pk %}" class="btn btn-info" tabindex="-1" role="button" aria-disabled="true">編集</a>
       <a href ="{% url 'wlist:memo_delete' m.pk %}" class="btn btn-success" tabindex="-1" role="button" aria-disabled="true">削除</a>
      </div>
      </div>
      )
    })}

    </div>
  )
}

export default Test


