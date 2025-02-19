import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectTrackIsRemoving,
  selectTracks,
  selectTracksFetching,
} from "./tracksSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTrack, fetchTracks, playTrack } from "./tracksThunks";
import { selectUser } from "../users/usersSlice";
import { Delete } from "@mui/icons-material";

const TrackList = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const tracksFetching = useAppSelector(selectTracksFetching);
  const isRemoving = useAppSelector(selectTrackIsRemoving);
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (id) {
      dispatch(fetchTracks(id));
    }
  }, [dispatch, id]);

  const navigateToTrack = (trackId: string) => {
    navigate(`/tracks/${trackId}`);
  };

  const addPlayTrack = (trackId: string) => {
    if (user) {
      dispatch(playTrack({ track: trackId, token: user.token }));
    }
  };

  const handleDeleteTrack = async (trackId: string) => {
    if (user) {
      await dispatch(deleteTrack(trackId));
      await dispatch(fetchTracks(id!));
      navigate(`/tracks/${id}`);
    }
  };

  if (tracksFetching) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (!tracks || tracks.length === 0) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Typography variant="h6">No tracks available</Typography>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {tracks.map((track) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={track._id}>
          <Card
            sx={{
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.05)" },
            }}
            onClick={() => navigateToTrack(track._id)}
          >
            <CardContent>
              <Typography variant="h6" noWrap>
                {track.title}
              </Typography>
              <Typography variant="body2">
                Track Number: {track.track_number}
              </Typography>
              <Typography variant="body2">
                Duration: {track.duration}
              </Typography>
              <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
                <Card
                  onClick={(e) => {
                    e.stopPropagation();
                    addPlayTrack(track._id);
                  }}
                  sx={{
                    width: 40,
                    height: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "50%",
                    cursor: "pointer",
                    boxShadow: 1,
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    ▶
                  </Typography>
                </Card>
              </Grid>
              {user && (
                <IconButton
                  onClick={() => handleDeleteTrack(track._id)}
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
      ))}
    </Grid>
  );
};

export default TrackList;
