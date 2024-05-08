interface TitleProps {
    message: string | React.ReactNode;
    green: boolean;
    center: boolean;
    bold: boolean;
    responsive?: boolean;
    fullWidth?: boolean;
}
const Title = ({message, green, center, bold, responsive, fullWidth}: TitleProps) => {
  return (
    <h1 className={` ${green ? "text-primaryNeon" : "text-newWhite"} ${center ? "text-center" : "text-left"} ${bold ? "font-bold" : "font-normal"} ${responsive ? "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl" : "text-navTitle"} font-title ${fullWidth ? "w-full" : "w-fit"}`}>
          {message}
        </h1>
  )
}

export default Title