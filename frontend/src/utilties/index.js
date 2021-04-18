export function getFullTime() {
  const date = new Date()
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()

  const time = `${date.getHours()}:${minutes}:${seconds}`
  return time
}
