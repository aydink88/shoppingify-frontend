import { useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';

import useAsync from 'src/hooks/useAsync';
import { fetchMonthlySummary } from 'src/services/stats';

import TheSpinner from '../common/TheSpinner';

const months = Array.from({ length: 12 }, (_, i) => {
  return new Date(0, i + 1, 0).toLocaleDateString(undefined, { month: 'long' });
});

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function MonthlySummary() {
  const {
    data: monthlySummary,
    error,
    isLoading,
    run,
  } = useAsync<{ _id: { year: number; month: number }; amount: number }[]>([]);

  useEffect(() => {
    run(fetchMonthlySummary()).catch();
  }, []);

  const { labels, values } = useMemo(() => {
    const labels = [];
    const values = [];
    if (monthlySummary) {
      for (const item of monthlySummary) {
        labels.push(months[item._id.month - 1]);
        values.push(item.amount);
      }
    }
    return { labels, values };
  }, [monthlySummary]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'items',
        data: values,
        fill: false,
        backgroundColor: 'rgb(249, 161, 9)',
        borderColor: 'rgba(249, 161, 9, 0.4)',
      },
    ],
  };

  if (isLoading) return <TheSpinner />;
  if (!monthlySummary?.length) return <h1 className="text-center">Not enough data!</h1>;

  if (error) return <h1>{error}</h1>;
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}
