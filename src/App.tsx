import './App.css';

import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import ApptList from './components/ApptList';

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="container">
        <Sidebar />
        <main>
          <ApptList />
        </main>
      </div>
    </>
  );
}

export default App;
