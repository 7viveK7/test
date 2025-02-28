import { useState } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Home from './hom'; // Assuming 'hom' is intended to be 'home'
import ButtonUsage from './toggleButton';
import { store } from './store';

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2em',
  },
  content: {
    width: '80%',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function App() {
  const [color, setColor] = useState('lavender');

  return (
    <Provider store={store}>
      <div style={{ ...styles.container, backgroundColor: color }}>
        <div style={styles.content}>
          <ButtonUsage color={color} setColor={setColor} />
          <Home />
        </div>
      </div>
    </Provider>
  );
}

export default App;