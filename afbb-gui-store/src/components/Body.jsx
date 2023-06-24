import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// TODO: onCategoryClick should capture category id, OR consider using Router for enhancement
const CategoryList = ({categories, onCategoryClick}) => {
  const children = categories.map(category => (
    <ListItemButton key={category['id']} onClick={onCategoryClick}>
      <ListItemAvatar><Avatar src={`/media/categories/${category['name']}.jpg`} /></ListItemAvatar>
      <ListItemText primary={category['name'].toUpperCase()} secondary={category['description']} />
    </ListItemButton>
  ));
  return (<List sx={{ flexGrow: 1, bgcolor: '#bbb' }}>{children}</List>)
};

const ItemList = ({items}) => {
  const children = items.map(item => (
    <Card key={item['name']} sx={{flexFlow: 1}}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={`/media/items/${item['name']}.png`}
          alt={item['price']}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">{item['name'].toUpperCase()}</Typography>
          <Typography variant="body2" color="text.secondary">{item['description']}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ));
  return (<Box sx={{ display: 'flex' }}>{children}</Box>)
};

export const Body = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/category/getAll')
      .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
      .then(data => setCategories(data))
      .catch(msg => alert(msg));
  }, []);

  const onCategoryClick = (e) => {
    const {items} = categories[0];
    setItems(items);
  };

  return (
    <Grid container sx={{ height: '100%' }}>
      <Grid item lg={4}>
        <CategoryList categories={categories} onCategoryClick={onCategoryClick}/>
      </Grid>
      <Grid item lg={8} sx={{ bgcolor: '#eee' }}>
        <ItemList items={items}/>
      </Grid>
    </Grid>
  );
};