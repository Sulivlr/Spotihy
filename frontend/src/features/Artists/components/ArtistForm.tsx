import { ArtistMutation } from "../../../types";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { TextField, Button, Grid, CircularProgress } from "@mui/material";
import FileInput from "../../../UI/FileInput/FileInput";
import { useAppDispatch } from "../../../app/hooks";
import { useSelector } from "react-redux";
import { selectArtistIsCreating } from "../artistsSlice";
import { createArtist } from "../artistsThunks";
import { useNavigate } from "react-router-dom";

const initialState: ArtistMutation = {
  name: "",
  image: null,
};

const ArtistForm = () => {
  const dispatch = useAppDispatch();
  const isCreating = useSelector(selectArtistIsCreating);
  const navigate = useNavigate();
  const [artistMutation, setArtistMutation] =
    useState<ArtistMutation>(initialState);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setArtistMutation((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;
    setArtistMutation((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(createArtist(artistMutation));
    navigate(`/`);
  };

  return (
    <Grid
      container
      justifyContent="center"
      style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
    >
      <Grid item xs={12}>
        <h2>Add New Artist</h2>
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <TextField
              label="Artist Name"
              name="name"
              value={artistMutation.name}
              onChange={onFieldChange}
              fullWidth
              required
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <FileInput
              label="Billboard"
              name="image"
              onChange={fileInputChangeHandler}
            />
          </div>

          <Button
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
            disabled={isCreating}
          >
            {isCreating ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default ArtistForm;
