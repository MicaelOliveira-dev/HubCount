import { NavbarLink } from 'models/entities/NavLink';
import {  BiSolidChat } from 'react-icons/bi';
import React from 'react';
import LoginContext from 'contexts/LoginContext';

const useNavLinks = () => {
  const { isLoggedIn } = React.useContext(LoginContext);

  const navLinks: Array<NavbarLink> = [
    {
      linkText: 'Início',
      linkTo: '/',
      show: true,
    },
    {
      linkText: 'Filmes',
      linkTo: '#',
      show: true,
    },
    {
      linkText: 'Cinéfilos',
      linkTo: '/Cinefilos',
      show: isLoggedIn,
    },
    {
      linkText: 'Perfil',
      linkTo: '/profile',
      show: isLoggedIn,
    },
    {
      linkText: 'Logout',
      linkTo: '/login',
      show: isLoggedIn,
    },
    {
      linkText: 'Login',
      linkTo: '/login',
      show: !isLoggedIn,
    },
    {
      linkTo: '/chat',
      linkText: 'Conversas',
      linkIcon: BiSolidChat,
      show: isLoggedIn,
    },
  ];

  return navLinks;
};

export default useNavLinks;
