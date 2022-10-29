import { useOutletContext } from 'react-router-dom';

export default function Test() {
  const data = useOutletContext();
  return (
    <>
      {data.map((item, index) => (
        <p key={index}>{item.name}</p>
      ))}
    </>
  );
}
