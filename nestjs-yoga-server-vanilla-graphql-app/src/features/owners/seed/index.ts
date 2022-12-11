import {Prisma} from '@prisma/client';
import {Chance as chance} from 'chance';
const Owners: (nuts: number) => Prisma.OwnerUncheckedCreateInput[] = (
  nuts = 3
) => {
  return [...Array(nuts)].map((_, index) => {
    return {
      age: chance(index + 1).age({type: 'adult'}), // https://chancejs.com/person/age.html
      name: chance(index + 1).name({full: true}),
    };
  });
};
export {Owners};
