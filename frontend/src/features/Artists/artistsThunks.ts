import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Artist, ArtistMutation } from "../../types";

export const fetchArtists = createAsyncThunk<Artist[]>(
  "Artists/fetchArtists",
  async () => {
    const { data: artists } = await axiosApi.get<Artist[]>("/artists");
    return artists;
  },
);

export const createArtist = createAsyncThunk<void, ArtistMutation>(
  "Artists/create",
  async (artistMutation) => {
    const formData = new FormData();
    const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];
    keys.forEach((key) => {
      const value = artistMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.post("/artists", formData);
  },
);

export const deleteArtist = createAsyncThunk<void, string>(
  "Artist/deleteArtist",
  async (id) => {
    await axiosApi.delete(`/artists/${id}`);
  },
);
