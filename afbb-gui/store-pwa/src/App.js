import { useEffect, useState } from 'react';
import AppFooter from './AppFooter';
import './App.css';

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => fetch(`${process.env.REACT_APP_API}/category/getAll`)
    .then(response => response.json())
    .then(data => setCategories(data))
  , []);

  return (
    <div className="App">
      <div className="container">
        <ul>{categories.map(c => (<li key={c.id}>{c.name}</li>))}</ul>
      </div>
      <AppFooter />
    </div>
  );
};

export default App;
