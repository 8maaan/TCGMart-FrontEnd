import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './TCG-Mart-Pages/HomePage';
import LoginPage from './TCG-Mart-Pages/LoginPage';
import RegisterPage from './TCG-Mart-Pages/RegisterPage';
import MarketPage from './TCG-Mart-Pages/MarketPage';
import NotFoundPage from './TCG-Mart-Pages/NotFoundPage'
import CardPage from './TCG-Mart-Pages/CardPage'

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route index element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/market" element={<MarketPage/>}/>
            <Route path="/cards/:cardId" element={<CardPage />} />
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
