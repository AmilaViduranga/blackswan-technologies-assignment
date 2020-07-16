export class Movie {
    id: number = new Date().getTime();
    title: string;
    year: number;
    cast: Array<string> = new Array<string>();
    genres: Array<string> = new Array<string>();
}