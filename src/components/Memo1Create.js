import React,{useState,useEffect,useContext} from 'react'
import { DataContext } from '../context/DataContext';

import axios from 'axios'
import { Typography } from '@mui/material';

import { useCookies } from 'react-cookie';
import dayjs from 'dayjs';

import './css/create.css';
// import './css/list.css';
import HoverMenu from './HoverMenu';
import API_URL from '../config';

const Memo1Create = () => {
    const { memo1Table, setMemo1Table } = useContext(DataContext);
    const [ cookies ] = useCookies(['current-token']);
    const token = cookies['current-token'];

    const today = dayjs().format('YYYY-MM-DD');
    
    const filteredData = memo1Table.filter(data => 
        dayjs(data.reg_date).format('YYYY-MM-DD') === today)

    console.log(filteredData)
    console.log(today)

    const [ todayMemo, setTodayMemo ] = useState(filteredData);
    const [ formData, setFormData ]= useState('');
    const [ isScrollable, setIsScrollable]= useState(false);
    
    // console.log(memo1Table[0].reg_date)

    useEffect(() => {
        const filteredData = memo1Table.filter(data => 
          dayjs(data.reg_date).format('YYYY-MM-DD') === today
        );
        setTodayMemo(filteredData);
      }, [memo1Table]);

    useEffect(() => {
        if (todayMemo.length > 8) {
          setIsScrollable(true);
        } else {
          setIsScrollable(false);
        }
      }, [todayMemo]);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!formData) return;
        try {
                const response = await axios.post(`${API_URL}/api_memo1/memo1/`,{
                    memo: formData,
                    reg_date: today,
                },{
                headers: {
                  'Authorization': `Token ${token}`, 
                },
              });
        //   setMemos([response.data, ...memos]); // 新しいメモをリストに追加
          setMemo1Table((prev) => [...prev, response.data]);
          setFormData(''); // フォームをクリア
        } catch (error) {
          console.error('作成失敗:', error.response ? error.response.data : error.message);
        }
      };
    
      const handleInputChange = (e) => {
        setFormData(e.target.value);
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
          id="memo"
          required
          value={formData}
          onChange={handleInputChange}
          style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', resize: 'vertical' }}
          placeholder="新しいメモを入力"
        ></textarea>
        <input type="submit" value="create" style={{ width: '80px', height: '30px', fontSize: '16px' }} />
      </form>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {todayMemo.length > 0 ? (
          todayMemo.map((record) => (
            <ul key={record.id} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <li>
                <span style={{ flex: 1 }}>{record.memo}</span>
              </li>
            </ul>
          ))
        ) : (
          <p>本日の記録はありません。</p>
        )}
      </div>
    </div>
     <HoverMenu links={{href:'/memo1',text:'メモ帳編集'}} />
    </div>
  )
}



export default Memo1Create
