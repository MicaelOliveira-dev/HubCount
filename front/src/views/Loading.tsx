import { CgSpinnerTwo } from "react-icons/cg";
interface LoadingProps {
  big: boolean;
}
const Loading = ({big}: LoadingProps) => {
  return (
    <div className={`${big ? "h-[800px]" : "h-[400px]"} w-full flex flex-col justify-center items-center italic text-bodyColor`}>
      <div className="flex flex-row items-center justify-center w-full gap-x-2 text-sm">
        <p>Carregando... </p>
        <CgSpinnerTwo className="animate-spin" />{" "}
      </div>
    </div>
  );
};

export default Loading;
