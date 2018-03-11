/* eslint-disable no-console */
import { proceedError } from './errors';

import createUsers from './bootstrap/createUser';

export async function seedAsync() {
  return await createUsers();
}


export default async function bootstrapFast() {
  try {
    const started = new Date();

    await seedAsync();

    const finished = new Date();
    const diff = Math.round((finished.getTime() - started.getTime()) / 1000);
    console.log(`[INFO] Data has been created in ${diff} sec`);
  } catch (err) {
    console.log('an error occurred during npm run db:data');
    proceedError(err);
  }
}
/* eslint-enable no-console */
