import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './TCG-Mart-Pages/HomePage';
import LoginPage from './TCG-Mart-Pages/LoginPage';
import RegisterPage from './TCG-Mart-Pages/RegisterPage';
import MarketPage from './TCG-Mart-Pages/MarketPage';
import NotFoundPage from './TCG-Mart-Pages/NotFoundPage';
import CardPage from './TCG-Mart-Pages/CardPage';
import ProfilePage from './TCG-Mart-Pages/ProfilePage';
import ListingCardPage from './TCG-Mart-Pages/ListCardPage';
import PaymentPage from './TCG-Mart-Pages/PaymentPage'

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Common routes for both logged-in and not-logged-in users */}
          <Route index element={<HomePage />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/cards/:cardId" element={<CardPage />} />

          {/* Routes for logged-in users */}
          {isLoggedIn && (
            <>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/sellcard" element={<ListingCardPage />} />
              {/* Added payment page */}
              <Route path="/cards/:cardId/payment" element={<PaymentPage />} />
            </>
          )}

          {/* Routes for not-logged-in users */}
          {!isLoggedIn && (
            <>
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
