import {Prisma} from '@prisma/client';
import {Chance as chance} from 'chance';
const Cats: (nuts: number) => Prisma.CatUncheckedCreateInput[] = (
  nuts = 10
) => {
  return [...Array(nuts)].map((_, index) => {
    return {
      age: chance(index + 1).age({type: 'child'}), // https://chancejs.com/person/age.html
      name: chance(index + 1).animal({type: 'pet'}), // https://chancejs.com/thing/animal.html
      ownerId: chance(index + 1).integer({min: 1, max: 3}),
    };
  });
};
export {Cats};
