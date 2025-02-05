import {Model} from "mongoose";

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

export interface TrackMutation {
    album: string;
    title: string;
    duration: string;
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    googleID: string;
    avatar: string;
}

export interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;
