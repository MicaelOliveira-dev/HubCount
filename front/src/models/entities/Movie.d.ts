export interface MovieModel {
    adult: boolean;
    backdropPath: string; 
    genreIds: number[];
    id: number;
    originalTitle: string;
    overview: string;
    posterPath: string;
    releaseDate: string;
    voteAverage: number;
    voteCount: number;
    addedDate?: Date;
    budget: number;
    boxOffice: number;
    liked: number;
    didNotLike: number;
    synopsis: string;
    producers: string[];
    duration: string;
}
