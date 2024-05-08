interface MessageProps {
  message: string;
  user: string;
  receiver: boolean;
}
const Message = ({ message, user, receiver }: MessageProps) => {
  return (
    <>
      <div className={` ${!receiver ? "bg-newWhite text-black self-end" : "bg-primary text-black self-start"} min-w-[150px] md:max-w-[60%] h-auto flex flex-col flex-wrap justify-start gap-y-2 p-4 rounded-lg text-sm`}>
        <p className="text-xs italic font-bold">{ !receiver ? "Eu" : user}</p>
        <p className="flex flex-wrap w-full">{message}</p>
      </div>
    </>
  );
};

export default Message;
