export const splitUserAndRents = (obj) => {
  const rents = obj.rents;
  delete obj.rents;
  const user = obj;
  return { user, rents };
};
