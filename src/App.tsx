import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthPage from './pages/Auth';
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
import NewUserNeedForm from './pages/NewUserNeedForm';



function App() {
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}")
  const authState = useAppSelector(selectAuth)
  const usersState = useAppSelector(selectUsers) 
  const needsState = useAppSelector(selectNeeds)
  const userNeedsState = useAppSelector(selectUserNeeds)
  const useFetchUsersResult = authApi.useFetchUsersQuery().data
  const useFetchUsersSuccess = authApi.useFetchUsersQuery().isSuccess
  const useFetchNeedsResult = authApi.useFetchNeedsQuery().data
  const useFetchNeedsSuccess = authApi.useFetchNeedsQuery().isSuccess
  const useFetchUserNeedsResult = authApi.useFetchUserNeedsQuery().data
  const useFetchUserNeedsSuccess = authApi.useFetchUserNeedsQuery().isSuccess

  useEffect(() => {
    if (authState.authorized) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 5000)
    }
  }, [authState])

  useEffect(() => {
    if (!!authState.jwt && !!!currentUser.jwt) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: authState.user.id,
          username: authState.user.username,
          jwt: authState.jwt,
        })
      )
    }
  }, [authState, currentUser])

  useEffect(() => {
    if (!!!authState.jwt && authState.authorized)
      dispatch(clearAuth())
  }, [authState, dispatch])

  useEffect(() => {
    if (!!currentUser.jwt && !!!authState.jwt) {
      localStorage.clear()
    }
  }, [authState, currentUser])

  useEffect(() => {
    if (!!currentUser.jwt && !!authState.jwt && usersState.length < 1) {
      console.log(useFetchUsersResult)
      dispatch(setUsers(useFetchUsersResult))
    }
    // eslint-disable-next-line
  }, [currentUser, authState, useFetchUsersSuccess, usersState])

  useEffect(() => {
    if(!!!authState.authorized && usersState.length > 1) {
      dispatch(setUsers([]))
    }
  }, [authState, usersState, dispatch])
  
  useEffect(() => {
    if(!!authState.jwt && needsState.length < 1 && useFetchNeedsSuccess) {
      dispatch(setNeeds(useFetchNeedsResult))
    }
    // eslint-disable-next-line
  }, [authState, useFetchNeedsSuccess, needsState, dispatch])

  useEffect(() => {
    if(!!!authState.authorized && needsState.length > 1) {
      dispatch(setNeeds([]))
    }
  }, [authState, needsState, dispatch])
  
  useEffect(() => {
    if(!!authState.jwt && userNeedsState.length < 1 && useFetchUserNeedsSuccess) {
      dispatch(setUserNeeds(useFetchUserNeedsResult))
    }
    // eslint-disable-next-line
  }, [authState, useFetchUserNeedsSuccess, userNeedsState, dispatch])
  
  useEffect(() => {
    if(!!!authState.authorized && userNeedsState.length > 1) {
      dispatch(setUserNeeds([]))
    }
  }, [authState, userNeedsState, dispatch])

  useEffect(() => {
    if(!!currentUser.jwt && !!authState.jwt) {
      localStorage.clear()
    }
  })
  

  return (
    <div>
      {!authState.authorized ? (
        <div>
          <Router>
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Navigate to="/auth" replace />} />
              <Route path="/auth" element={<AuthPage />} />
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
              <Route 
                path="/newuserneed" 
                element={
                  <PrivateRoute>
                    <Header />
                    <NewUserNeedForm />
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