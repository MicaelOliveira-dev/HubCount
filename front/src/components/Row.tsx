import React from 'react'
interface RowProps {
    children: React.ReactNode;
    baseline?: boolean;
    space?: boolean;
    moreGap?: boolean;
    responsive?: boolean;
}
const Row = ({children, baseline, space, moreGap, responsive}: RowProps) => {
  return (
    <div className={`flex ${responsive ? "flex-col  sm:flex-row" : "flex-row"}  w-full ${baseline ? "items-baseline" : "items-center"} ${space && "justify-between"} ${moreGap ? "gap-6" : "gap-2"} `}>{children}</div>
  )
}

export default Row