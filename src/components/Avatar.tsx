import { BigHead, facialHairMap } from '@bigheads/core';

type IFacialHair = 'none' | 'none2' | 'none3' | 'stubble' | 'mediumBeard';
const FEMALE = ['Evelyn', 'Aranka', 'Martina', 'Rahima', 'Sandra'];

function Avatar({ student }: { student: string }) {
  let facialHair: IFacialHair;
  if (FEMALE.includes(student)) {
    facialHair = 'none';
  } else {
    facialHair = Object.keys(facialHairMap)[
      Math.floor(Math.random() * Object.keys(facialHairMap).length)
    ] as IFacialHair;
  }
  return <BigHead body={FEMALE.includes(student) ? 'breasts' : 'chest'} facialHair={facialHair} />;
}

export default Avatar;
