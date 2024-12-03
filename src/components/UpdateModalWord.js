import React,{ useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';
import Modal from 'react-modal';
import axios from 'axios';
import { useCookies } from 'react-cookie';

Modal.setAppElement('#root'); // アクセシビリティのため

const UpdateModalWord = ({ isOpen, onRequestClose, data, dataDisplay, setTable, apiUrl}) => {
  // const { memo1Table, setMemo1Table } = useContext(DataContext);
  const [ cookies ] = useCookies(['current-token']);
  const token = cookies['current-token'];           

  // 1つのformDataで3つのデータの状態管理。
  const [ formData, setFormData ]= useState({word:data.word, mean1:data.mean1,mean2:data.mean2});

  useEffect(() => {
    if (isOpen && data) {
      setFormData({word: data.word,mean1:data.mean1,mean2:data.mean2}) 
    }
  }, [isOpen, data]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}${data.id}/`,
        {id:   data.id,
         user: data.user,
         word: formData.word,
         mean1: formData.mean1,
         mean2: formData.mean2,
         reg_date: data.reg_date},{
        headers: {
          'Authorization': `Token ${token}`, 
        },
      });
      
      console.log('更新成功')
      setTable(prevTable => prevTable.map(mapdata => mapdata.id === data.id ?
      {...mapdata, word: formData.word, mean1: formData.mean1 ,mean2: formData.mean2} : mapdata ));
      onRequestClose(); 
    } catch (error) {
      console.log(`${apiUrl}${data.id}/`)
      console.log(`${token}`)
      console.error('更新失敗:', error.response ? error.response.data : error.message);
    }
  };

  const handleInputChange1 = (e) => {
    setFormData({ ...formData, word: e.target.value });
  };
  const handleInputChange2 = (e) => {
    setFormData({ ...formData, mean1: e.target.value });
  };
  const handleInputChange3 = (e) => {
    setFormData({ ...formData, mean2: e.target.value });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',

          width: '90%', // 画面幅の90%を占める
          maxWidth: '500px', // 最大幅を500pxに制限
          // height: 'auto', // 自動で高さ調整
          // maxHeight: '80vh', // 画面高さの80%以内に制限
          // overflow: 'auto', // 内容がオーバーフローした場合にスクロール
        },
        overlay: {
          backgroundColor: 'rgba(0.5, 0.5, 0.5, 0.01)',
        },
      }}
    >

      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '90%' }}>
      <p style={{ color: 'silver' }}>入力日時：
        {new Date(data.reg_date).toLocaleDateString('ja-JP',
        { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <p>
          <label htmlFor="word">word:</label>
          <textarea
            id="word"
            name="word"
            rows="1"
            cols="200"
            style={{ backgroundColor: '#f0f0f0', width: '100%' }}
            placeholder={data.word}
            value={formData.word}
            onChange={handleInputChange1}
          />
          </p>
          <p>
          <label htmlFor="mean1">mean1:</label>
          <textarea
            id="mean1"
            name="mean1"
            rows="1"
            cols="200"
            style={{ backgroundColor: '#f0f0f0', width: '100%' }}
            placeholder={data.mean1}
            value={formData.mean1}
            onChange={handleInputChange2}
          />
          </p>
          <p>
          <label htmlFor="mean2">mean1:</label>
          <textarea
            id="mean2"
            name="mean2"
            rows="4"
            cols="200"
            style={{ backgroundColor: '#f0f0f0', width: '100%' }}
            placeholder={data.mean2}
            value={formData.mean2}
            onChange={handleInputChange3}
          />
          </p>

        <div class ='container' style={{display: 'flex', gap: '0.5rem'}}>
        <button type="submit" className="btn btn-outline-dark block btn-custom" style={{width:'5rem'}}>Update</button>
        <button type="button" onClick={()=>{onRequestClose();setFormData('') }} className="btn btn-outline-dark block btn-custom" style={{width:'5rem'}}>Close</button>
        </div>
      </form>

    </Modal>
  );
};

export default UpdateModalWord;