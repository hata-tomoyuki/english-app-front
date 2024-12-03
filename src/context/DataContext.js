import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';     
import API_URL from '../config';

// Contextの作成
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [cookies] = useCookies(['current-token']);  // useCookiesを使う
    const token = cookies['current-token'];           // useCookiesを使う

    const [wordTable, setWordTable] = useState([]);
    const [memo1Table, setMemo1Table] = useState([]);
    const [memo2Table, setMemo2Table] = useState([]);
    const [userName, setUserName] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            
            try {

                const [res1, res2, res3 ] = await Promise.all([
                    axios.get(`${API_URL}/api_word/word/`,{
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    }),
                    axios.get(`${API_URL}/api_memo1/memo1/`,{
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    }),
                    axios.get(`${API_URL}/api_memo2/memo2/`,{
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    }),
                ]);
                setWordTable(res1.data);
                setMemo1Table(res2.data);
                setMemo2Table(res3.data);

                console.log("READING CONTEXT");

                // setMemo2Table(res3.data);
            } catch (error) {
                console.error('データの取得に失敗しました:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    return (
        <DataContext.Provider value={{ 
            wordTable,
            setWordTable,
            memo1Table,
            setMemo1Table,
            memo2Table,
            setMemo2Table,
            loading,
            userName,
            setUserName,
            // updateTable1
        }}>
            {children}
        </DataContext.Provider>
    );
};

// export const useDataContext = () => {
//     return useContext(DataContext);
// };
