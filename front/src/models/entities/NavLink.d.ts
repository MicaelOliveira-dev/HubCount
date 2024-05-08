import { IconType } from 'react-icons'
export interface NavbarLink {
    linkTo: string;
    linkText?: string;
    linkIcon?: IconType;
    show?: boolean;
}