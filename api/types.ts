export interface ArtistMutation {
    name: string;
    description: string;
    image: string | null;
}

export interface AlbumMutation {
    artist: string;
    title: string;
    created_at: string;
    image: string | null;
}