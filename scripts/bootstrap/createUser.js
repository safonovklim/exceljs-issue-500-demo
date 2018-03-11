import { range } from 'lodash';
import models from '../../server/db/postgres';

export default function createUsers() {
  return models.User.bulkCreate([
    {
      firstName: 'Elon',
      middleName: 'J',
      lastName: 'Musk',
      email: 'elon@spacex.gov',
    },
    {
      firstName: 'Tim',
      middleName: 'A',
      lastName: 'Cook',
      email: 'tim@apple.com',
    },
    {
      firstName: 'Sergey',
      middleName: 'G',
      lastName: 'Brin',
      email: 's@google.com',
    },
    {
      firstName: 'Larry',
      middleName: 'G',
      lastName: 'Page',
      email: 'l@google.com',
    },
    ...range(1, 100000).map(i => ({
      firstName: `x${i}`,
      middleName: 'fake',
      lastName: 'user',
      email: `x${i}@fake.com`,
    }))
  ]);
}
