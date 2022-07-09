import './App.css';
import Weather from './weather';
import ToDo from './todo'
import MusicPlayer from './musicplayer';
import Clock from './clock';

function App() {
  return (
    <div className="App">
      <ToDo />
      <Clock />
      <MusicPlayer />
      <Weather />
    </div>
  );
}

export default App;
