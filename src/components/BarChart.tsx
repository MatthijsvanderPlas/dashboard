import { ResponsiveBar, Bar } from '@nivo/bar';

const Example = () => {
  const data = [
    {
      day: 'Monday',
      degress: 59,
    },
    {
      day: 'Tuesday',
      degress: 61,
    },
    {
      day: 'Wednesday',
      degress: 55,
    },
    {
      day: 'Thursday',
      degress: 78,
    },
    {
      day: 'Thurs',
      degress: 78,
    },
    {
      day: 'Thury',
      degress: 78,
    },
    {
      day: 'ay',
      degress: 78,
    },
    {
      day: 'y',
      degress: 78,
    },
    {
      day: 'day',
      degress: 78,
    },
    {
      day: 'Thursday',
      degress: 78,
    },
    {
      day: 'Thursday',
      degress: 78,
    },
    {
      day: 'Thursday',
      degress: 78,
    },
    {
      day: 'Thursday',
      degress: 78,
    },
  ];

  return (
    <ResponsiveBar
      width={1500}
      data={data}
      keys={['degress']}
      indexBy='day'
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.4}
      valueScale={{ type: 'linear' }}
      colors='#3182CE'
      animate={true}
      enableLabel={false}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'degrees',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
    />
  );
};

export default Example;
