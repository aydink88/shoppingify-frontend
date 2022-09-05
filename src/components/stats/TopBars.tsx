import { useEffect, useMemo } from 'react';
import { ProgressBar, Stack } from 'react-bootstrap';

import useAsync from 'src/hooks/useAsync';

import TheSpinner from '../common/TheSpinner';

type TopBarsProps = {
  title: string;
  variant?: 'success' | 'danger' | 'warning' | 'info' | string;
  fetchData(): Promise<any>;
  howMany?: number;
};

export default function TopBars({ title, variant, fetchData, howMany = 3 }: TopBarsProps) {
  const { data, run } = useAsync<{ _id: string; name: string; amount: number }[]>([]);

  useEffect(() => {
    run(fetchData()).catch();
  }, []);

  const total = useMemo(() => {
    let t = 0;
    if (data?.length) {
      for (const item of data) {
        t += item.amount;
      }
    }
    return t;
  }, [data]);

  const dataSlice = useMemo(() => {
    if (!data?.length) return [];
    return data.slice(0, howMany);
  }, [data]);

  if (!data || !total) return <TheSpinner />;

  return (
    <div className="p-2 m-2">
      <h3>{title}</h3>
      {dataSlice.map((item) => {
        const percentage = (item.amount * 100) / total;
        return (
          <Stack key={item._id} className="my-3" data-testid="topbarsmember">
            <Stack direction="horizontal" className="justify-content-between">
              <span>{item.name}</span>
              <span>{percentage.toFixed(0)}%</span>
            </Stack>
            <ProgressBar
              variant={variant}
              now={percentage}
              label={`${percentage}%`}
              visuallyHidden
            />
          </Stack>
        );
      })}
    </div>
  );
}
