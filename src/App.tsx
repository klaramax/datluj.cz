import Stage from './components/Stage';
import Keyboard from './components/Keyboard';


const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Datlování</h1>
      <Stage />
      <Keyboard/>
    </div>
  );
};

export default App;