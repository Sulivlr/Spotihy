import AppToolBar from "./UI/AppBar/AppToolBar";
import { Container, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Album from "./features/Albums/Album";
import ArtistList from "./features/Artists/ArtistList";
import Track from "./features/Tracks/Track";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import TrackHistory from "./features/TrackHistory/TrackHistory";
import AlbumForm from "./features/Albums/components/AlbumForm";
import ArtistForm from "./features/Artists/components/ArtistForm";
import TrackForm from "./features/Tracks/components/TrackForm";
import ProtectedRoute from "./UI/ProtectedRoute/ProtectedRoute";
import { selectUser } from "./features/users/usersSlice";
import { useAppSelector } from "./app/hooks";

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <>
        <header>
          <AppToolBar />
        </header>
        <Container maxWidth="xl" component="main">
          <Routes>
            <Route path="/" element={<ArtistList />} />
            <Route path="/albums/:id" element={<Album />} />
            <Route path="/tracks/:id" element={<Track />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/trackhistory" element={<TrackHistory />} />
            <Route
              path="/new-album"
              element={
                <ProtectedRoute
                  isAllowed={
                    user && (user.role === "admin" || user.role === "user")
                  }
                >
                  <AlbumForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/new-artist"
              element={
                <ProtectedRoute
                  isAllowed={
                    user && (user.role === "admin" || user.role === "user")
                  }
                >
                  <ArtistForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/new-track"
              element={
                <ProtectedRoute
                  isAllowed={
                    user && (user.role === "admin" || user.role === "user")
                  }
                >
                  <TrackForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={<Typography variant="h1">Page Doesn't Exist</Typography>}
            />
          </Routes>
        </Container>
      </>
    </>
  );
};

export default App;
