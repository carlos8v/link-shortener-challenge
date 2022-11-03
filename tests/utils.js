export const getRandomPort = () => {
  const min = 5000
  const max = 8000

  return Math.floor(Math.random() * (max - min + 1) + min)
}
