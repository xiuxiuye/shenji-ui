const consoleError = (value: string): Error => {
  const error = new Error(value)
  console.error(error)
  return error
}

export default consoleError
