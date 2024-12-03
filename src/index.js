// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider, withCookies } from 'react-cookie';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <CookiesProvider>
      <App />
    </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import reportWebVitals from './reportWebVitals';
// import * as serviceWorker from './serviceWorker';
// import {Route,BrowserRouter,Routes} from 'react-router-dom'; 

// import Login from './components/Login';
// import App from './App';

// import WordComp from './components/WordComp';
// import Memo1Comp from './components/Memo1Comp';
// import Memo2Comp from './components/Memo2Comp';

// import { CookiesProvider} from 'react-cookie';

// const routing = (
//   <React.StrictMode>
//     <BrowserRouter>
//     <CookiesProvider>
//       {/* cookies providerで囲むことでnavbarで提供される削除等の処理が */}

//       <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/main" element={<App />} />
//           <Route path="/word" element={<WordComp />} />
//           <Route path="/memo1" element={<Memo1Comp />} />
//           <Route path="/memo2" element={<Memo2Comp />} />

//       </Routes>

//     </CookiesProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// )




// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   routing
// );

// reportWebVitals();
