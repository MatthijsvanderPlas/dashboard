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
  title,
}: {
  labels: (string | string[])[];
  csvdifficulty: number[];
  csvfun: number[];
  title: string | undefined;
}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 25,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 5,
        stepSize: 1,
      },
      x: {
        ticks: {
          minRotation: 90,
          maxRotation: 90,
          font: {
            size: 10,
          },
        },
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
