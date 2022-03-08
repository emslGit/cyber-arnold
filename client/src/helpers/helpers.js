export const shuffleJSON = (list) => {
  return list
    .map(value => ({ ...value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
}