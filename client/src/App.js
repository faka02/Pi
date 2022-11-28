import './App.css';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import Form from './components/Form';
import { Route } from 'react-router-dom';
import Detail from './components/Detail';

function App() {
  return (
    <div className="App">
      <h1 className='title'>Recipe's Book</h1>

      <Route exact path={'/'}>
        <LandingPage/>
      </Route>

      <Route exact path={'/home'}>
        <Navbar/>
        <Home/>
      </Route>

      <Route path={'/post'}>
        <Navbar/>
        <Form/>
      </Route>

      <Route path={'/home/:id'} component={Detail}/>
    </div>
  );
}

export default App;
