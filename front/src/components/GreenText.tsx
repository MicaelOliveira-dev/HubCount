import React from 'react'
interface GreenTextProps {
    children: React.ReactNode;
    bold?: boolean;
}
const GreenText = ({children, bold}: GreenTextProps) => {
  return (
    <span className={`${bold ? "font-bold" : "font-normal"} text-sm text-primaryNeon underline`} >
        {children}
    </span>
  )
}

export default GreenText