export default function Modal({ children, modalState, handleModal }) {
  return (
    <div
      className={`${
        modalState === "open"
          ? "flex flex-col absolute top-32 inset-x-1/4 bg-white backdrop-blur-xl bg-white/30 border-4 border-black p-8"
          : "hidden"
      }`}
    >
      <button onClick={handleModal} className="text-right px-2 text-white bg-gray-500 rounded-full w-fit h-fit my-4 font-bold">×</button>
      {children}
    </div>
  );
}
