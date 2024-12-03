import React,{useState,useEffect,useContext} from 'react'
import { DataContext } from '../context/DataContext';

import axios from 'axios'

import { useCookies } from 'react-cookie';
import dayjs from 'dayjs';

import './css/create.css';
import HoverMenu from './HoverMenu';
import API_URL from '../config';

const WordCreate = () => {
    const { wordTable, setWordTable } = useContext(DataContext);
    const [ cookies ] = useCookies(['current-token']);
    const token = cookies['current-token'];

    const today = dayjs().format('YYYY-MM-DD');
    
    const filteredData = wordTable.filter(data => 
        dayjs(data.reg_date).format('YYYY-MM-DD') === today)

    console.log(filteredData)
    console.log(today)

    const [ todayWord, setTodayWord ] = useState(filteredData);
    const [ formData1, setFormData1 ]= useState('');
    const [ isScrollable, setIsScrollable]= useState(false);
    
    // console.log(memo1Table[0].reg_date)

    useEffect(() => {
        const filteredData = wordTable.filter(data => 
          dayjs(data.reg_date).format('YYYY-MM-DD') === today
        );
        setTodayWord(filteredData);
      }, [wordTable]);

    useEffect(() => {
        if (todayWord.length > 8) {
          setIsScrollable(true);
        } else {
          setIsScrollable(false);
        }
      }, [todayWord]);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!formData1) return;
        try {
                const response = await axios.post(`${API_URL}/api_word/word/`,{
                    word: formData1,
                    reg_date: today,
                },{
                headers: {
                  'Authorization': `Token ${token}`, 
                },
              });
        //   setMemos([response.data, ...memos]); // 新しいメモをリストに追加
          setWordTable((prev) => [...prev, response.data]);
          setFormData1(''); // フォームをクリア
        } catch (error) {
          console.error('作成失敗:', error.response ? error.response.data : error.message);
        }
      };
    
      const handleInputChange1 = (e) => {
        setFormData1(e.target.value);
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
        style={{ marginBottom: '50px', display: 'flex', flexDirection: 'column', 
            alignItems: 'flex-start', width: '400px'}}>
        <label style={{ marginBottom: '10px' }}>New Word:</label>
        <textarea
          id="word"
          required
          value={formData1}
          rows="1"
          column="100"
          onChange={handleInputChange1}
          style={{ padding: '5px', fontSize: '16px', width:'100%', marginBottom: '10px', resize: 'vertical' }}
          placeholder="new word"
        ></textarea>

        <input type="submit" value="create" style={{ width: '80px', height: '30px', fontSize: '16px' }} />
      </form>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {todayWord.length > 0 ? (
          todayWord.map((record) => (
            <ul key={record.id} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <li style={{ display: 'flex', flex: 1 }}>
                <span style={{ flex: 0.15, overflow: 'hidden',textOverflow:'ellipsis'}}>{record.word}</span>
                <span style={{ flex: 0.15, overflow: 'hidden',textOverflow:'ellipsis'}}>{record.mean1}</span>
                <span style={{ flex: 0.7, overflow: 'hidden',textOverflow:'ellipsis'}}>{record.mean2}</span>
              </li>
            </ul>
          ))
        ) : (
          <p>本日の記録はありません。</p>
        )}
      </div>
    </div>
     <HoverMenu links={{href:'/word',text:'単語帳編集'}} />
    </div>
  )
}
export default WordCreate
