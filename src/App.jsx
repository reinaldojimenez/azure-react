import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import GenerateQRPage from './pages/GenerateQRPage'
import VerQRPage from './pages/VerQRPage'
import Navbar from './components/Navbar'
import ImprimirPDFPage from './pages/ImprimirPDFPage';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <main className='container mx-auto px-10'>
        <Navbar/>
          <Routes>                    
            <Route path='/login' element={ <LoginPage/> }/>

            <Route element={ <ProtectedRoute/> }>
              <Route path='/home' element={ <HomePage/> }/>
              <Route path='/generarqr' element={ <GenerateQRPage/> }/>
              <Route path='/verqr' element={ <VerQRPage/> }/> 
              <Route path='/imprimirqr' element={ <ImprimirPDFPage/> }/> 
            </Route>             
          </Routes> 
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
