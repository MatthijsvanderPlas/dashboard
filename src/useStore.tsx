const [parsedCsvData, setParsedCsvData] = useState<CsvData[]>([]);
const [labels, setLabels] = useState<(string | string[])[]>([]);
const [csvDifficulty, setCsvDifficulty] = useState<number[]>([]);
const [csvFun, setCsvFun] = useState<number[]>([]);
const [slice, setSlice] = useState<number[]>([0, 10]);
const [total] = useState<number>(56);

useEffect(() => {
  let LabelsArray: string[] = Array.from(parsedCsvData, (item) => item.assignment);
  const LabelsSet: Set<string> = new Set(LabelsArray);
  LabelsArray = [...LabelsSet];
  const splitLabelsArray = LabelsArray.map((label) =>
    label.includes(' ') ? label.replaceAll('- ', '').split(' ') : label,
  );
  setLabels([...splitLabelsArray.slice(...slice)]);

  const difficultyArray: number[] = [];

  for (let i = 0; i < LabelsArray.length; i++) {
    const number = parsedCsvData.filter((item) => item.assignment === LabelsArray[i]);
    difficultyArray.push(number.reduce((a, b) => a + b.difficulty, 0) / number.length) as number;
  }
  setCsvDifficulty([...difficultyArray.slice(...slice)]);

  const funArray: number[] = [];

  for (let i = 0; i < LabelsArray.length; i++) {
    const number = parsedCsvData.filter((item) => item.assignment === LabelsArray[i]);
    funArray.push(number.reduce((a, b) => a + b.fun, 0) / number.length) as number;
  }
  setCsvFun([...funArray.slice(...slice)]);
}, [parsedCsvData, slice]);

const nextSlice = () => {
  if (slice[1] >= total) return;
  setSlice((prev) => [prev[1], prev[1] + 10]);
};

const prevSlice = () => {
  if (slice[0] === 0) return;
  setSlice((prev) => [prev[0] - 10, prev[0]]);
};




<BarChart
labels={labels}
csvdifficulty={csvDifficulty}
csvfun={csvFun}
title: string='Student Data'
/>
<button
className='mx-4 px-5 mt-8 border-purple-300 border-2 rounded active:scale-90 shadow-gray-500 shadow-md'
onClick={prevSlice}
>
Previous Slice
</button>
<button
className='mx-4 px-5 border-sky-300 border-2 rounded active:scale-90 shadow-gray-500 shadow-md'
onClick={nextSlice}
>
Next Slice
</button>



name: item.c[0].v,
assignment: item.c[1].v,
difficulty: item.c[2].v,
fun: item.c[3].v,