import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import ImageIcon from '@mui/icons-material/Image';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

export const Body = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/category/getAll')
      .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
      .then(data => setCategories(data))
      .catch(msg => alert(msg));
  }, []);

  return (
    <Grid container sx={{ height: '100%'}}>
      <Grid item lg={4}>
        <List sx={{ flexGrow: 1, bgcolor: '#bbb' }}>
          {
            categories.map(category => (
              <ListItem key={category['id']}>
                <ListItemAvatar><Avatar src={`/media/categories/${category['name']}.jpg`}/></ListItemAvatar>
                <ListItemText primary={category['name'].toUpperCase()} secondary={category['description']}/>
              </ListItem>
            ))
          }
        </List>
      </Grid>
      <Grid item lg={8} sx={{ bgcolor: '#eee'}}/>
    </Grid>
  );
};