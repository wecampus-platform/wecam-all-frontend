export default function AddButton({ onclick }: { onclick: () => void }) {
  return (
    <button
      className=" py-2  px-3 w-56 text-gray-300 hover:text-blue-500 text-start"
      onClick={onclick}
    >
      추가하기
    </button>
  );
}
