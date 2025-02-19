import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectAlbumIsRemoving,
  selectAlbums,
  selectAlbumsFetching,
} from "./albumsSlice";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteAlbum, fetchAlbums } from "./albumsThunks";
import notFoundImage from "../../assets/images/imgNotFound.jpg";
import { API_URL } from "../../config";
import { Album } from "../../types";
import { selectUser } from "../users/usersSlice";

const AlbumList = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const albumsFetching = useAppSelector(selectAlbumsFetching);
  const user = useAppSelector(selectUser);
  const isRemoving = useAppSelector(selectAlbumIsRemoving);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbums(id));
    }
  }, [dispatch, id]);

  const navigateToAlbum = (trackId: string) => {
    navigate(`/tracks/${trackId}`);
  };

  const handleDeleteAlbum = async (albumId: string) => {
    if (user) {
      await dispatch(deleteAlbum(albumId));
      await dispatch(fetchAlbums(id!));
    }
  };

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {albumsFetching && (
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Grid>
      )}
      {albums.map((album: Album) => {
        const image = album.image ? `${API_URL}/${album.image}` : notFoundImage;

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={album._id}>
            <Card
              sx={{
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.03)" },
                position: "relative",
              }}
            >
              <CardMedia
                component="img"
                alt={album.title}
                height="400"
                image={image}
                sx={{ borderRadius: "4px 4px 0 0", cursor: "pointer" }}
                onClick={() => navigateToAlbum(album._id)}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    color: "#333",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {album.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Created at: {album.created_at}
                </Typography>
                {user && (
                  <IconButton
                    onClick={() => handleDeleteAlbum(album._id)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      background: "rgba(255, 255, 255, 0.8)",
                    }}
                    disabled={isRemoving}
                  >
                    {isRemoving ? <CircularProgress size={24} /> : <Delete />}
                  </IconButton>
                )}
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AlbumList;
