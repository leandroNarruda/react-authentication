import './App.css';
import Routes from './routes'
import Menu from './components/Menu'
import { useState } from 'react';


function App() {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <Menu isAuth={isAuth} setIsAuth={setIsAuth}/>
        <Routes setIsAuth={setIsAuth} />
      </header>
    </div>
  );
}

export default App;
