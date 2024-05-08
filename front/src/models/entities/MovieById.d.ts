export interface MovieByIdModel {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
        backdrop_path: string;
        id: number;
        name: string;
        poster_path: string;
    };
    budget: number;
    genres: Array<MovieByIdGenres>;
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Array<MovieByIdCompanies>;
    production_countries: Array<MovieByIdCountries>[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Array<MovieByIdSpokenLanguages>[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieByIdGenresModel {
    id: number;
    name: string;
}

export interface MovieByIdCompaniesModel {
    name: string;
}

export interface MovieByIdCountriesModel {
    iso_3166_1: string;
    name: string;
}

export interface MovieByIdSpokenLanguagesModel {
    english_name: string;
    iso_639_1: string;
    name: string;
}