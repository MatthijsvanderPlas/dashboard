import React, { useMemo } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { GradientTealBlue } from '@visx/gradient';
import letterFrequency, { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';
import { scaleBand, scaleLinear } from '@visx/scale';

const rawData = [
  {
    name: 'Bitcoin',
    price: 10,
    base: 'USD',
    date: '1560507303',
    creator: 'Satoshi Nakamoto',
  },
  {
    name: 'Bitcoin',
    price: 12,
    base: 'USD',
    date: '1560507303',
    creator: 'Satoshi Nakamoto',
  },
];

const getPrice = (value: number) => value * 100;

const getDate = (date: number) => new Date(date * 100);

const data = rawData.map((d) => ({
  price: getPrice(d.price),
  date: getDate(Number(d.date)),
}));

const Example = () => {
  return (
    <svg width={300} height={200}>
      <rect width={20} height={20} fill='orange'></rect>
    </svg>
  );
};

export default Example;
