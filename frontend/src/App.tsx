import AppToolBar from './UI/AppBar/AppToolBar';
import {Container, Typography} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Artist from './features/Artists/Artist';

const App = () => {
  return (
    <>
      <>
        <header>
          <AppToolBar/>
        </header>
        <Container maxWidth="xl" component="main">
          <Routes>
            <Route path="/" element={<Artist/>}/>
            <Route path="*" element={<Typography variant="h1">Page Doesn't Exist</Typography>}/>
          </Routes>
        </Container>
      </>
    </>
  );
};

export default App
