import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function BarChart({
  labels,
  csvdifficulty,
  csvfun,
}: {
  labels: string[];
  csvdifficulty: number[];
  csvfun: number[];
}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Student Data',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Difficulty',
        data: csvdifficulty,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Fun',
        data: csvfun,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
