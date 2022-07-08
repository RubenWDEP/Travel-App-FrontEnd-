import {Routes, Route, useNavigate} from "react-router-dom";
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Main';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage'
import HomePage from "./Pages/HomePage";
import ResponsiveHeader from "./Components/responsiveHeader";


//Carlos, en las rutas falta por poner las rutas de las peticiones de la API que tu hiciste.

function App() {
  


  return (
    <main className="App">
      <ResponsiveHeader/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
      </Routes>
      <Footer/>
    </main>
  );
}

export default App;
