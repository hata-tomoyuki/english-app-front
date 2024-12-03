import React,{ useEffect, useState } from 'react';
// import { DataContext } from '../context/DataContext';
import Modal from 'react-modal';
import axios from 'axios';
import { useCookies } from 'react-cookie';     

Modal.setAppElement('#root'); // アクセシビリティのため

const UpdateModalMemo2 = ({ isOpen, onRequestClose, data, dataDisplay, setTable, apiUrl}) => {
  // const { memo1Table, setMemo1Table } = useContext(DataContext);
  const [ cookies ] = useCookies(['current-token']);
  const token = cookies['current-token'];           

  // deleteでは不要だったがformDataを更新するために必要。

  const [ formData1, setFormData1 ]= useState(data.memo1);
  const [ formData2, setFormData2 ]= useState(data.memo2);

  useEffect(() => {
    if (isOpen && data) {
      setFormData1(data.memo1); // モーダルが開いたときにデータを初期化
      setFormData2(data.memo2); // モーダルが開いたときにデータを初期化
    }
  }, [isOpen, data]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}${data.id}/`,
        {id:   data.id,
         user: data.user,
         memo1: formData1,
         memo2: formData2,
         reg_date: data.reg_date},{
        headers: {
          'Authorization': `Token ${token}`, 
        },
      });
      
      console.log('更新成功')
      setTable(prevTable => prevTable.map(mapdata => mapdata.id === data.id ?
      {...mapdata, memo1: formData1, memo2: formData2 } : mapdata ));
      onRequestClose(); 
    } catch (error) {
      console.log(`${apiUrl}${data.id}/`)
      console.log(`${token}`)
      console.error('更新失敗:', error.response ? error.response.data : error.message);
    }
  };

  const handleInputChange1 = (e) => {
    setFormData1(e.target.value);
  };
  const handleInputChange2 = (e) => {
    setFormData2(e.target.value);
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
          <label htmlFor="memo">memo:</label>
          <textarea
            id="memo1"
            name="memo1"
            rows="2"
            cols="200"
            style={{ backgroundColor: '#f0f0f0', width: '100%' }}
            placeholder="Type your memo here"
            value={formData1}
            onChange={handleInputChange1}
          />
          </p>
          <p>
          <textarea
            id="memo2"
            name="memo2"
            rows="6"
            cols="200"
            style={{ backgroundColor: '#f0f0f0', width: '100%' }}
            placeholder="Type your memo here"
            value={formData2}
            onChange={handleInputChange2}
          />
          </p>





        {/* <p>
          <label htmlFor="memo">memo:</label>
          <textarea
            id="memo"
            name="memo"
            rows="6"
            cols="300"
            style={{ width: '100%' }}
            value={formData}
            onChange={handleInputChange}
          />
        </p> */}
        <div class ='container' style={{display: 'flex', gap: '0.5rem'}}>
        <button type="submit" className="btn btn-outline-dark block btn-custom" style={{width:'5rem'}}>Update</button>
        <button type="button" onClick={()=>{onRequestClose();setFormData1('');}} className="btn btn-outline-dark block btn-custom" style={{width:'5rem'}}>Close</button>
        </div>
      </form>

    </Modal>
  );
};

export default UpdateModalMemo2;