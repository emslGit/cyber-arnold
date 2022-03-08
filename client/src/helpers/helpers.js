export const csvToJson = (csv) => {
  const lines = csv.split('\r\n');
  const keys = lines[0].split(',');
  return lines.slice(1).map(line => {
    return line.split(',').reduce((acc, cur, i) => {
      const toAdd = {};
      toAdd[keys[i]] = cur;
      return { ...acc, ...toAdd };
    }, {});
  });
};

export const shuffleJSON = (list) => {
  return list
    .map(value => ({ ...value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
}