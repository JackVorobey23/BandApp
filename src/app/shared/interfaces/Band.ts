import Album from './Album';
import MediaPlatform from './MediaPlatform'
import Product from "./Product";
import ThemeColors from './ThemeColors';
export interface Band {
    BandId: number,
    Title: string,
    DateOfFoundation: Date,
    Albums: Album[],
    SocialMedia: MediaPlatform[],
    MusicPlatforms: MediaPlatform[],
    Products: Product[],
    ThemeColors: ThemeColors,
    BandLogo: string,
    Location: [number, number]
}