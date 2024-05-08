import React from "react";

interface CardProps {
  name: string;
  lastMessage: string;
  linkFoto: string;
}

const Card: React.FC<CardProps> = ({ name, lastMessage, linkFoto }) => {
  return (
    <div className="w-full h-[70px] border-b border-primaryBgBorder flex flex-row items-center hover:bg-primaryBgBorder transition duration-300 cursor-pointer justify-between text-sm gap-x-2 px-4 py-2 text-bodyColor group">
      <div className="rounded-full">
        <img className="rounded-full w-[60px] h-[40px]" src={linkFoto} alt="User Photo" />
      </div>
      <div className="flex flex-col w-full h-full justify-between">
        <p className="text-base  text-white">{name}</p>
        <p className="line-clamp-1 text-base">{lastMessage}</p>
      </div>
    </div>
  );
};

export default Card;
