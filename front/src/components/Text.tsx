interface TextProps {
    text: string;
    bold?: boolean;
}
const Text = ({text, bold}: TextProps) => {
  return (
    <p className={` ${bold ? "font-bold" : "font-normal"} text-sm capitalize`} >{text}</p>
  )
}

export default Text