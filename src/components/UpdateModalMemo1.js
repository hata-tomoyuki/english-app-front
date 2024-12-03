import React,{ useEffect, useContext,useState } from 'react';
import { DataContext } from '../context/DataContext';
import Modal from 'react-modal';
import axios from 'axios';
import { useCookies } from 'react-cookie';     

Modal.setAppElement('#root'); // アクセシビリティのため

const UpdateModalMemo1 = ({ isOpen, onRequestClose, data, dataDisplay, setTable, apiUrl}) => {
  // const { memo1Table, setMemo1Table } = useContext(DataContext);
  const [ cookies ] = useCookies(['current-token']);
  const token = cookies['current-token'];           

  // deleteでは不要だったがformDataを更新するために必要。

  const [ formData, setFormData ]= useState(data.memo);

  useEffect(() => {
    if (isOpen && data) {
      setFormData(data.memo); // モーダルが開いたときにデータを初期化
    }
  }, [isOpen, data]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}${data.id}/`,
        {id:   data.id,
         user: data.user,
         memo: formData,
         reg_date: data.reg_date},{
        headers: {
          'Authorization': `Token ${token}`, 
        },
      });
      console.log('更新成功')
      setTable(prevTable => prevTable.map(mapdata => mapdata.id === data.id ?
      {...mapdata, memo: formData } : mapdata ));
      onRequestClose(); 
    } catch (error) {
      console.error('更新失敗:', error.response ? error.response.data : error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData(e.target.value);
  };

  // const renderFormArea = (listType) => {
  //   switch (listType) {
  //     case 'word':
  //       return (
  //         <p>
  //         <label htmlFor="memo">memo:</label>
  //         <textarea
  //           id="memo"
  //           name="memo"
  //           rows="6"
  //           cols="300"
  //           style={{ width: '100%' }}
  //           value={formData}
  //           onChange={handleInputChange}
  //         />
  //         </p>
  //       );
  //     case 'memo1':
  //       return (
  //         <p>
  //         <label htmlFor="memo">memo:</label>
  //         <textarea
  //           id="memo"
  //           name="memo"
  //           rows="10"
  //           cols="200"
  //           style={{ backgroundColor: '#f0f0f0', width: '100%' }}
  //           placeholder="Type your memo here"
  //           value={formData}
  //           onChange={handleInputChange}
  //         />
  //         </p>
  //       );
  //     case 'memo2':
  //       return (
  //         <p>
  //         <label htmlFor="memo">memo:</label>
  //         <textarea
  //           id="memo"
  //           name="memo"
  //           rows="8"
  //           cols="100"
  //           style={{ border: '2px solid red', width: '100%' }}
  //           value={formData}
  //           onChange={handleInputChange}
  //         />
  //         </p>
  //       );
  //     default:
  //       return null; // デフォルトの状態（該当しない場合）
  //   }
  // };


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
            id="memo"
            name="memo"
            rows="10"
            cols="200"
            style={{ backgroundColor: '#f0f0f0', width: '100%' }}
            placeholder="Type your memo here"
            value={formData}
            onChange={handleInputChange}
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
        <button type="button" onClick={()=>{onRequestClose();setFormData('');}} className="btn btn-outline-dark block btn-custom" style={{width:'5rem'}}>Close</button>
        </div>
      </form>

    </Modal>
  );
};

export default UpdateModalMemo1;