import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './components/Auth';
import Header from './components/Header';
import Greenhouse from './components/Greenhouse';
import Profile from './components/Profile';
import { setUser } from './features/authSlice';
import PrivateRoute from './components/PrivateRoute';
import './App.css';



function App() {
  const dispatch = useAppDispatch();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    dispatch(setUser(currentUser));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        <Router>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Header />
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route 
              path="/greenhouse" 
              element={
                <PrivateRoute>
                  <Header />
                  <Greenhouse />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;