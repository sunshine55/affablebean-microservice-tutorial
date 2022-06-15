import { useEffect, useState } from 'react';

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => fetch(`${process.env.REACT_APP_API}/category/getAll`)
    .then(response => response.json())
    .then(data => setCategories(data))
  , []);

  return (
    <div>
      <ul>
        {categories.map(c => (<li key={c.id}>{c.name}</li>))}
      </ul>
    </div>
  );
}

export default App;
