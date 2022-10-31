import { useOutletContext, useParams } from 'react-router-dom';
import { CsvData } from '~/App';
import useStore from '~/useStore';
import { BarChart } from '../components/BarChart';
import SliceButton from '../components/SliceButton';
import Sitemap from './Sitemap';

export default function Student() {
  const { student } = useParams();
  const data = useOutletContext();
  const {
    labels,
    csvDifficulty,
    csvFun,
    nextSlice,
    prevSlice,
  }: {
    labels: (string | string[])[];
    csvDifficulty: number[];
    csvFun: number[];
    nextSlice: () => void;
    prevSlice: () => void;
  } = useStore(data as CsvData[], student);

  return (
    <>
      <div className=''>
        <Sitemap link='students' />
      </div>
      <div className='flex flex-col mx-auto max-w-5xl w-full  max-h-full'>
        <BarChart labels={labels} csvdifficulty={csvDifficulty} csvfun={csvFun} title={student} />
      </div>
      <div className='flex justify-center'>
        <SliceButton text='Prev Slice' func={prevSlice} />
        <SliceButton text='Next Slice' func={nextSlice} />
      </div>
    </>
  );
}
