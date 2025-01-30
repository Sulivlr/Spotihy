export interface User {
  _id: string;
  username: string;
  token: string;
  role: 'admin' | 'user';
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      message: string;
      name: string;
    },
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface TrackHistory {
  _id: string;
  user: User;
  track: Track;
  artist: Artist;
  datetime: string;
}

export interface Artist {
  _id: string;
  name: string;
  description: string;
  image: string | null;
}

export interface Album {
  _id: string;
  artist: Artist;
  title: string;
  created_at: number;
  image: string | null;
}

export interface Track {
  _id: string;
  album: Album;
  title: string;
  duration: string;
  track_number: number;
}

export interface AlbumMutation {
  title: string;
  artist: string;
  image: File | null;
  created_at: string;
  user: string;
}

export interface ArtistMutation {
  name: string;
  image: File | null;
  user: string;
}

export interface TrackMutation {
  album: string;
  title: string;
  duration: string;
  user: string;
}