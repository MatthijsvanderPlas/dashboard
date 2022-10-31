interface button {
  text: string;
  func?: () => void;
}

const SliceButton = (props: button) => {
  return (
    <button
      className='mx-4 px-5 mt-8 border-slate-200 border-2 rounded active:scale-90 shadow-gray-500 shadow-md'
      onClick={props.func}
    >
      {props.text}
    </button>
  );
};

export default SliceButton;
