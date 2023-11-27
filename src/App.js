import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './TCG-Mart-Pages/HomePage';
import LoginPage from './TCG-Mart-Pages/LoginPage';
import RegisterPage from './TCG-Mart-Pages/RegisterPage';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route index element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
