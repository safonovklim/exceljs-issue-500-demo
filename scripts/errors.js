/* eslint-disable no-console */
export const proceedError = (err, defaultMessage, skip = false) => {
  if (skip === true) return null;

  console.log(`${err.name}: ${err.message}`);

  return null;
};
/* eslint-enable */
