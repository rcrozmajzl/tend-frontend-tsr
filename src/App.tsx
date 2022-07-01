import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './pages/Auth';
import Header from './components/Header';
import Greenhouse from './pages/Greenhouse';
import Profile from './pages/Profile';
import Garden from './pages/Garden';
import Needs from './pages/Needs';
import Notifications from './pages/Notifications';
import { clearAuth, setAuth } from './features/authSlice';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import { selectAuth } from './features/authSlice';
import { authApi } from './services/authApi';
import { selectUsers, setUsers } from './features/userSlice';
import LoadingToAccess from './components/LoadingtoAccess';
import { selectUserNeeds, setUserNeeds } from './features/userNeedsSlice';
import { selectNeeds, setNeeds } from './features/needsSlice';



function App() {
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}")
  const authState = useAppSelector(selectAuth)
  const usersState = useAppSelector(selectUsers) 
  const needsState = useAppSelector(selectNeeds)
  const userNeedsState = useAppSelector(selectUserNeeds)
  const useFetchUsersResult = authApi.useFetchUsersQuery().data
  const useFetchNeedsResult = authApi.useFetchNeedsQuery().data
  const useFetchUserNeedsResult = authApi.useFetchUserNeedsQuery().data

  useEffect(() => {
    if (authState.authorized) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 5000)
    }
  }, [authState])

  useEffect(() => {
    if (!!authState.token && !!!currentUser.token) {
      localStorage.setItem(
        "user",
        JSON.stringify({
            username: authState.username,
            email: authState.email,
            birthdate: authState.birthdate,
            location: authState.location,
            avatar: authState.avatar,
            token: authState.token,
        })
      )
    }
  }, [authState, currentUser])

  useEffect(() => {
    if (!!!authState.token && authState.authorized)
      dispatch(clearAuth())
  }, [authState, dispatch])

  useEffect(() => {
    if (!!currentUser.token && !!!authState.token) {
      dispatch(setAuth({username: currentUser.username, email: currentUser.email, birthdate: currentUser.birthdate, location: currentUser.location, avatar: currentUser.avatar, token: currentUser.token}))
      console.log("App level auth confirmed")
    }
    // eslint-disable-next-line
  }, [authState, currentUser])

  useEffect(() => {
    if (!!currentUser.token && !!authState.token && usersState.length < 1) {
      console.log(useFetchUsersResult)
      dispatch(setUsers(useFetchUsersResult))
    }
    // eslint-disable-next-line
  }, [currentUser, authState, usersState])

  useEffect(() => {
    if(!!!authState.authorized && usersState.length > 1) {
      dispatch(setUsers([]))
    }
  }, [authState, usersState, dispatch])
  
  useEffect(() => {
    if(!!authState.token && needsState.length < 1) {
      dispatch(setNeeds(useFetchNeedsResult))
    }
    // eslint-disable-next-line
  }, [authState, needsState, dispatch])

  useEffect(() => {
    if(!!!authState.authorized && needsState.length > 1) {
      dispatch(setNeeds([]))
    }
  }, [authState, needsState, dispatch])
  
  useEffect(() => {
    if(!!authState.token && userNeedsState.length < 1) {
      dispatch(setUserNeeds(useFetchUserNeedsResult))
    }
    // eslint-disable-next-line
  }, [authState, userNeedsState, dispatch])
  
  useEffect(() => {
    if(!!!authState.authorized && userNeedsState.length > 1) {
      dispatch(setUserNeeds([]))
    }
  }, [authState, userNeedsState, dispatch])
  

  return (
    <div>
      {!authState.authorized ? (
        <div>
          <Router>
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Navigate to="/auth" replace />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<Navigate to="/auth" replace />} />
            </Routes>
          </Router>
        </div>
        ) : (
        <div>
          <Router>
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Navigate to="/greenhouse" replace />} />
              <Route path="/auth" element={<Navigate to="/greenhouse" replace />} />
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <Header />
                    <Profile />
                  </PrivateRoute>
                }
              />
              {loading ? (
                <Route 
                  path="/greenhouse" 
                  element={
                    <PrivateRoute>
                      <LoadingToAccess />
                    </PrivateRoute>
                  }
                />
              ) : (
                <Route 
                  path="/greenhouse" 
                  element={
                    <PrivateRoute>
                      <Header />
                      <Greenhouse />
                    </PrivateRoute>
                  }
                />
              )}
              <Route 
                path="/garden" 
                element={
                  <PrivateRoute>
                    <Header />
                    <Garden />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/needs" 
                element={
                  <PrivateRoute>
                    <Header />
                    <Needs />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/notifications" 
                element={
                  <PrivateRoute>
                    <Header />
                    <Notifications />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </div>
        )
      }
    </div>
  );
};

export default App;