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
      fetch('/api/category/getAll')
        .then(res => res.json())
        .then(data => setCategories(data));
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