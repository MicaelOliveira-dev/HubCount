import { IconType } from "react-icons";

export interface MovieGenreModel {
    id: number,
    name: string;
    icon?: string | IconType | React.ReactNode
}