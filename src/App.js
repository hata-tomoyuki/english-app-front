
import React, { useContext } from 'react';
import { DataContext } from './App';

import './App.css';

import Main from './components/Main';
import Test from './components/Test';

import { createTheme, ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import indigo from "@mui/material/colors/indigo";

import { Routes, Route } from 'react-router-dom';
import MainPage from './components/Main';
import Login from './components/Login';

import WordList from './components/WordList';
import WordCreate from './components/WordCreate';

// import WordReview from './components/WordReview';
import Memo1List from './components/Memo1List';
// import Memo1Review from './components/Memo1Review';
import Memo1Create from './components/Memo1Create';
import Memo2List from './components/Memo2List';
// import Memo2Review from './components/Memo2Review';

import Memo2Create from './components/Memo2Create';
import WordMemoReview from './components/WordMemoReview';

import { DataProvider } from './context/DataContext';
import PrivateRoute from './context/PrivateRoute';


// import Navbar from "./components/Navbar";  
// import DataProvider from './context/DataContext';

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: {
      main: "#f44336",
    },
  },
  typography: {
    fontFamily: "Comic Neue",
  },
});

function App() {
  return (
    // <MuiThemeProvider theme={theme}>
    <DataProvider>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route
          path="/*"
          element={
            <PrivateRoute>
              <Routes>
              <Route path="/main" element={<MainPage />} />

              <Route path="/word" element={<WordList />} />
              <Route path="/word/create" element={<WordCreate />} />
              <Route path="/word/review" element={<WordMemoReview selectedTable="word" isAll={true} isCalendar={false}/>} />
              <Route path="/word/all" element={<WordMemoReview selectedTable="word" isAll={true} isCalendar={false}/>} />
              <Route path="/word/calendar" element={<WordMemoReview selectedTable="word" isAll={false} isCalendar={true} startDate={null} endDate={null}/>} />

              <Route path="/memo1" element={<Memo1List />} />
              <Route path="/memo1/create" element={<Memo1Create />} />
              <Route path="/memo1/review" element={<WordMemoReview selectedTable="memo1" isAll={true}/>} />
              <Route path="/memo1/all" element={<WordMemoReview selectedTable="memo1" isAll={true} isCalendar={false}/>} />
              <Route path="/memo1/calendar" element={<WordMemoReview selectedTable="memo1" isAll={false} isCalendar={true} startDate={null} endDate={null}/>} />

              <Route path="/memo2" element={<Memo2List />} />
              <Route path="/memo2/create" element={<Memo2Create />} />
              <Route path="/memo2/review" element={<WordMemoReview selectedTable="memo2" isAll={false}/>} />
              <Route path="/memo2/all" element={<WordMemoReview selectedTable="memo2" isAll={true}/>} />
              <Route path="/memo2/calendar" element={<WordMemoReview selectedTable="memo2" isAll={false} isCalendar={true} startDate={null} endDate={null}/>} />
              
              </Routes>
            </PrivateRoute>
          }></Route>
      </Routes>
    </DataProvider>
    // </MuiThemeProvider>
  );
}

export default App;