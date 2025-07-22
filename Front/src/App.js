import logo from './logo.svg';
import './App.css';
import IndexRouter from './router/indexRouter';
import './index.css'; 
import '@ant-design/v5-patch-for-react-19';

function App() {
  return (
    <div>
      <IndexRouter></IndexRouter>
    </div>
  );
}

export default App;
