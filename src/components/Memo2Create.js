import React,{useState,useEffect,useContext} from 'react'
import { DataContext } from '../context/DataContext';

import axios from 'axios'
import { Typography } from '@mui/material';

import { useCookies } from 'react-cookie';
import dayjs from 'dayjs';

import './css/create.css';
import HoverMenu from './HoverMenu';
import API_URL from '../config';

const Memo2Create = () => {
    const { memo2Table, setMemo2Table } = useContext(DataContext);
    const [ cookies ] = useCookies(['current-token']);
    const token = cookies['current-token'];

    const today = dayjs().format('YYYY-MM-DD');
    
    const filteredData = memo2Table.filter(data => 
        dayjs(data.reg_date).format('YYYY-MM-DD') === today)

    console.log(filteredData)
    console.log(today)

    const [ todayMemo, setTodayMemo ] = useState(filteredData);
    const [ formData1, setFormData1 ]= useState('');
    const [ formData2, setFormData2 ]= useState('');
    const [ isScrollable, setIsScrollable]= useState(false);
    
    // console.log(memo1Table[0].reg_date)

    useEffect(() => {
        const filteredData = memo2Table.filter(data => 
          dayjs(data.reg_date).format('YYYY-MM-DD') === today
        );
        setTodayMemo(filteredData);
      }, [memo2Table]);

    useEffect(() => {
        if (todayMemo.length > 8) {
          setIsScrollable(true);
        } else {
          setIsScrollable(false);
        }
      }, [todayMemo]);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!formData1) return;
        if (!formData2) return;
        try {
                const response = await axios.post(`${API_URL}/api_memo2/memo2/`,{
                    memo1: formData1,
                    memo2: formData2,
                    reg_date: today,
                },{
                headers: {
                  'Authorization': `Token ${token}`, 
                },
              });
        //   setMemos([response.data, ...memos]); // 新しいメモをリストに追加
          setMemo2Table((prev) => [...prev, response.data]);
          setFormData1(''); // フォームをクリア
          setFormData2(''); // フォームをクリア
        } catch (error) {
          console.error('作成失敗:', error.response ? error.response.data : error.message);
        }
      };
    
      const handleInputChange1 = (e) => {
        setFormData1(e.target.value);
      };
      const handleInputChange2 = (e) => {
        setFormData2(e.target.value);
      };


  return (
    <div>
    <div style={{ display: 'flex',
                  justifyContent: isScrollable ? "flex-start" : "center",
                  padding: isScrollable ? "100px 20px 5px" : "5%",
                  overflowY: 'auto', alignItems: 'center',height: '100vh',
                  flexDirection: 'column', width: '100%'}}>
      <form
        onSubmit={handleCreate}
        style={{ marginBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '' }}
      >
        <label style={{ marginBottom: '10px' }}>New Memo:</label>
        <textarea
          id="memo1"
          required
          value={formData1}
          onChange={handleInputChange1}
          style={{ padding: '5px', fontSize: '16px', marginBottom: '10px', resize: 'vertical' }}
          placeholder="新しいメモを入力"
        ></textarea>

        <textarea
          id="memo2"
          required
          value={formData2}
          onChange={handleInputChange2}
          style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', resize: 'vertical' }}
          placeholder="新しいメモを入力"
        ></textarea>

        <input type="submit" value="create" style={{ width: '80px', height: '30px', fontSize: '16px' }} />
      </form>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {todayMemo.length > 0 ? (
          todayMemo.map((record) => (
            <ul key={record.id} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <li style={{ display: 'flex', flex: 1 }}>
                <span style={{ flex: 0.3, overflow: 'hidden',textOverflow:'ellipsis'}}>{record.memo1}</span>
                <span style={{ flex: 0.7, overflow: 'hidden',textOverflow:'ellipsis'}}>{record.memo2}</span>
              </li>
            </ul>
          ))
        ) : (
          <p>本日の記録はありません。</p>
        )}
      </div>
    </div>
     <HoverMenu links={{href:'/memo2',text:'メモ帳編集'}} />
    </div>
  )
}



export default Memo2Create
