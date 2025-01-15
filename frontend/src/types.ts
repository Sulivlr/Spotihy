export interface Artist {
  _id: string;
  name: string;
  description: string;
  image: string | null;
}

export interface Album {
  _id: string;
  artist: string;
  title: string;
  created_at: number;
  image: string | null;
}

export interface Track {
  _id: string;
  album: string;
  title: string;
  duration: string;
  track_number: number;
}