import AppToolBar from './UI/AppBar/AppToolBar';
import {Container, Typography} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Album from './features/Albums/Album';
import ArtistList from './features/Artists/ArtistList';

const App = () => {
  return (
    <>
      <>
        <header>
          <AppToolBar/>
        </header>
        <Container maxWidth="xl" component="main">
          <Routes>
            <Route path="/" element={<ArtistList/>}/>
            <Route path="/albums/:id" element={<Album/>} />
            <Route path="*" element={<Typography variant="h1">Page Doesn't Exist</Typography>}/>
          </Routes>
        </Container>
      </>
    </>
  );
};

export default App
