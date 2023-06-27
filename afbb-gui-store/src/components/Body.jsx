import React, {useEffect, useState} from 'react';
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

const ItemList = ({items}) => {
  const children = items.map(item => (
    <Card key={item['name']}>
      <CardActionArea>
        <CardMedia component="img" height="126" image={`/media/items/${item['name']}.png`}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">{item['name'].toUpperCase()}</Typography>
          <Typography variant="body1" color="text.secondary">{item['description']}</Typography>
          <Typography variant="body2" color="text.secondary">Price: {item['price']}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ));
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

  return (
    <Grid container>
      <CategoryList
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategoryClick={onCategoryClick}/>
      <ItemList items={items}/>
    </Grid>
  );
};