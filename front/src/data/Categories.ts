import { MovieGenreModel } from "models/entities/movieGenre";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { MdTheaterComedy } from "react-icons/md";
import { GiCrimeSceneTape, GiJasonMask, GiBattleTank, GiLovers, GiDramaMasks, GiClassicalKnowledge, GiMusicalNotes, GiSherlockHolmes, GiTreasureMap, GiPistolGun, GiWesternHat, GiMineExplosion, GiVideoCamera } from "react-icons/gi";
import { SiAlienware } from "react-icons/si";
import { MdLocalMovies, MdFamilyRestroom } from "react-icons/md";
import { RiBearSmileFill } from "react-icons/ri";

export const AllCategories: MovieGenreModel[] = [
    { id: 1, name: "Ação", icon: GiPistolGun },
    { id: 2, name: "Aventura", icon: GiTreasureMap },
    { id: 3, name: 'Animação', icon: RiBearSmileFill },
    { id: 4, name: 'Comédia', icon: MdTheaterComedy },
    { id: 5, name: 'Crime', icon: GiCrimeSceneTape },
    { id: 6, name: 'Documentário', icon: GiVideoCamera },
    { id: 7, name: 'Drama', icon: GiDramaMasks },
    { id: 8, name: 'Família', icon: MdFamilyRestroom },
    { id: 9, name: 'Fantasia', icon: FaWandMagicSparkles },
    { id: 10, name: 'História', icon: GiClassicalKnowledge },
    { id: 11, name: 'Terror', icon: GiJasonMask },
    { id: 12, name: 'Música', icon: GiMusicalNotes },
    { id: 13, name: 'Mistério', icon: GiSherlockHolmes },
    { id: 14, name: 'Romance', icon: GiLovers },
    { id: 15, name: 'Ficção científica', icon: SiAlienware },
    { id: 16, name: 'Cinema TV', icon: MdLocalMovies },
    { id: 17, name: 'Thriller', icon: GiMineExplosion },
    { id: 18, name: 'Guerra', icon: GiBattleTank },
    { id: 19, name: 'Faroeste', icon: GiWesternHat },
    { id: 20, name: 'Outros', icon: MdLocalMovies }
];

