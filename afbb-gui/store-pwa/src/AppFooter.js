import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const AppFooter = () => (
  <div className="App-footer">
    <Box sx={{padding: '15px'}}>
      <Typography
        align="center"
        component="div"
        paragraph
        variant="subtitle2"
      >
        &copy; Developed by <Link href="https://github.com/sunshine55?tab=repositories">sunshine55</Link>
      </Typography>
    </Box>
  </div>
);

export default AppFooter;
