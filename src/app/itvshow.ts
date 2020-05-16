export interface ITVShow {
    id: number;
    name: string;
    description: string;
    image: string;
    rating: number;
    language: string;
    genres: string[];
    seasons: number[];
    cast: string[];
    network: string;
    //each show has a list of seasons
    //get API for show for specific showId: http://api.tvmaze.com/shows/:showID?embed=seasons
}

export interface IAiringShow {
    season: number,
    epsiode: number,
    airtime: string,
    runtime: number,
    show: ITVShow,
    network: string
}


export interface IAiringShowTest {
    network: string,
    "00.00": ITVShow,
    "09.00": ITVShow,
    "09.30": ITVShow,
    "10.00": ITVShow,
    "10.30": ITVShow,
    "11.00": ITVShow,
    "12.00": ITVShow,
    "12.30": ITVShow,
    "13.00": ITVShow,
    "13.30": ITVShow,
}

export interface ISeason {
    id: number;
    name: string;
}

export interface IEpisode {
    id: number;
    name: string;
    season: number;
    episode: number;
    image: string;
    description: string;
    //get API for list of episodes for a specific seasonId: http://api.tvmaze.com/seasons/:seasonId/episodes
    //get API for specific episode ID: http://api.tvmaze.com/episodes/:episodeId
}
