import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './TCG-Mart-Pages/HomePage';
import LoginPage from './TCG-Mart-Pages/LoginPage';
import RegisterPage from './TCG-Mart-Pages/RegisterPage';
import MarketPage from './TCG-Mart-Pages/MarketPage';
import NotFoundPage from './TCG-Mart-Pages/NotFoundPage';
import CardPage from './TCG-Mart-Pages/CardPage';
import ProfilePage from './TCG-Mart-Pages/ProfilePage';
import SellCardPage from './TCG-Mart-Pages/SellCardPage';
import PaymentPage from './TCG-Mart-Pages/PaymentPage';
import ListingsPage from './TCG-Mart-Pages/ListingsPage';
import LandingPage from './TCG-Mart-Pages/LandingPage';
import TransactionPage from './TCG-Mart-Pages/TransactionPage';
import EditCardPage from './TCG-Mart-Pages/EditCardPage';
import PaymentSucessPage from './TCG-Mart-Pages/PaymentSuccessPage'

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Common routes for both logged-in and not-logged-in users */}
          <Route path="/market" element={<MarketPage />} />
          <Route path="/cards/:cardId" element={<CardPage />} />
          <Route path="/home" element={<HomePage />} />

          {/* Routes for logged-in users */}
          {isLoggedIn && (
            <>
              <Route index element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/sellcard" element={<SellCardPage />} />
              <Route path="/cards/:cardId/payment" element={<PaymentPage />} />
              <Route path="/cards/:cardId/payment/sucess/:sellerId" element={<PaymentSucessPage />} />
              <Route path="/listings" element={<ListingsPage />} />
              <Route path="/transactions" element={<TransactionPage />} />
              <Route path='/editcard/:cardId' element={<EditCardPage />} />
            </>
          )}

          {/* Routes for not-logged-in users */}
          {!isLoggedIn && (
            <>
              <Route index element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </>
          )}
          
          {/* Route for not found pages */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
