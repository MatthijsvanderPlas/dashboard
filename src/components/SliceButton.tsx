import { useAppSelector } from '~/store/hooks';
import { filteredStudents } from '~/store/selectors';

interface button {
  text: string;
  func: (name: string) => void;
}

const SliceButton = (props: button) => {
  const filter = useAppSelector(filteredStudents);
  return (
    <button
      className={`px-4 min-w-[100px]  m-1 border-gray-600 border-[1px] rounded active:scale-90 shadow-gray-200 shadow-sm ${
        !filter.includes(props.text) ? 'line-through bg-slate-300 opacity-50' : ''
      }`}
      onClick={() => props.func(props.text)}
    >
      {props.text}
    </button>
  );
};

export default SliceButton;
