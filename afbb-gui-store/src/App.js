import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';

function renderCategories(categories) {
  return categories.map(c => (
    <li key={c.id}>{c.name}</li>
  )); 
}

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(
    () => {
      fetch('/category/getAll')
        .then(res => res.ok ? res.json() : console.log(res.body))
        .then(data => setCategories(data))
        .catch(e => alert(e))
    },
    []
  );

  return (
    <ul>{renderCategories(categories)}</ul>
  )
};

const el = document.getElementById('root');
const root = createRoot(el);
root.render(<App/>);