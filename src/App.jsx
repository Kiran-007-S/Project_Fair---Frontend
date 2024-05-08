import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import {Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Authentication from  './Pages/Authentication';
import Dashboard from './Pages/Dashboard';
import Project from './Pages/Project';
import PageNotefound from './Pages/PageNotFound';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
             <Route path='/' element={<Home/>}/>
             <Route path='/login' element={<Authentication/>}/>
             <Route path='/register' element={<Authentication register/>}/>
             <Route path='/dashboard' element={<Dashboard/>}/>
             <Route path='/projects' element={<Project/>}/>
             <Route path='*' element={<PageNotefound/>}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
