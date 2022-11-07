import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Data } from '~/useStore';

const Example = ({ data }: { data: Data[] }) => {
  const tickFormat = ({ payload }) => {
    return payload.value.toString();
  };

  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='assignment' tick={tickFormat} />
        <YAxis domain={[0, 4]} />
        <Tooltip />
        <Legend align='left' />
        <Bar dataKey='difficulty' fill='#8884d8' />
        <Bar dataKey='fun' fill='#82ca9d' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Example;
