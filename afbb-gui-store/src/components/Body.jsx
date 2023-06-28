import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const CategoryList = ({categories, selectedCategoryId, onCategoryClick}) => {
  const children = categories.map(category => (
    <ListItemButton
      key={category['id']}
      selected={selectedCategoryId === category['id']}
      onClick={() => onCategoryClick(category['id'])}>
      <ListItemAvatar><Avatar src={`/media/categories/${category['name']}.jpg`}/></ListItemAvatar>
      <ListItemText primary={category['name'].toUpperCase()} secondary={category['description']}/>
    </ListItemButton>
  ));
  return (
    <Grid item md={4} sx={{pr: '2.5px'}}>
      <List>{children}</List>
    </Grid>
  );
};

const ItemList = ({items, cart, onItemAction}) => {
  const children = items.map(item => {
    const {name, description, price} = item;
    const qty = !!cart[name] ? cart[name] : 0;
    const total = qty * price;
    return (
      <Card key={name}>
        <CardMedia component="img" height="126" image={`/media/items/${name}.png`}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">{name.toUpperCase()}</Typography>
          <Typography variant="body1" color="text.secondary">{description}</Typography>
          <Typography variant="body2" color="text.secondary">Price: {price}</Typography>
          <Typography variant="body2" color="text.secondary">Quantity: {qty}</Typography>
          <Typography variant="body2" color="text.secondary">Total: {total}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" name="add" value={item['name']} onClick={onItemAction}>Add</Button>
          <Button size="small" name="remove" value={item['name']} onClick={onItemAction}>Remove</Button>
        </CardActions>
      </Card>
    )
  });
  return (
    <Grid item md={8} sx={{pl: '2.5px'}}>
      <Box sx={{display: 'flex', pt: '8px'}}>{children}</Box>
    </Grid>
  );
};

export const Body = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetch('/category/getAll')
      .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
      .then(data => setCategories(data))
      .catch(msg => alert(msg));
  }, []);

  const onCategoryClick = (id) => {
    const selectedCategory = categories.find(c => c['id'] === id);
    if (selectedCategory !== undefined) {
      setSelectedCategoryId(id);
      setItems(selectedCategory['items'] || []);
    }
  };

  const onItemAction = (e) => {
    const itemName = e.target.value;
    const action = e.target.name;
    let qty = !!cart[itemName] ? cart[itemName] : 0;
    if (action === 'add') {
      qty++;
    } else if (action === 'remove') {
      qty--;
      if (qty < 0) {
        qty = 0;
      }
    }
    const nextCart = {...cart, [itemName]: qty};
    setCart(nextCart);
  };

  return (
    <Grid container>
      <CategoryList
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategoryClick={onCategoryClick}/>
      <ItemList
        items={items}
        cart={cart}
        onItemAction={onItemAction}/>
    </Grid>
  );
};