export function validateUsername (value: string, callback: Function) {
  if (value.length < 1) {
    callback(new Error('Please enter the correct user name'))
  } else {
    callback()
  }
}