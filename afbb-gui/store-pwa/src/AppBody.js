import { useEffect, useState } from 'react';

const AppBody = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetch(`${process.env.REACT_APP_API}/category/getAll`)
      .then(response => response.json())
      .then(data => {
        if (mounted) setCategories(data);
      });
    return () => mounted = false;
  }, []);

  return (
    <div className="App-body">
      <ul>{categories.map(c => (<li key={c.id}>{c.name}</li>))}</ul>
    </div>
  );
};

export default AppBody;
