import AuthPage from './pages/authPage';
import { BrowserRouter as Router,} from "react-router-dom"
import { Routes, Route } from 'react-router';
import DashboardPage from './pages/dashboardPage';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

function App() {
  const cookies = new Cookies()
  // const [loggedIn, setLoggedIn] = useState(false)
// useEffect(() => {
//   if(!cookies.get('user')) {
//     window.location.href = "/login"
//   }
// },[])
  return (
    <Router>
      <div className='h-[100vh]'>
    <Routes>
      <Route path='/login' element={ <AuthPage />} />
      <Route path='/' element={<DashboardPage />} />
    </Routes>
    </div>
    </Router>
  );
}

export default App;
