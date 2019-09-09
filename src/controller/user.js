const loginCheck = (username, passworld) => {
  if (username === 'zhangsan' && passworld === '123') {
    return true
  } 
  return false
}

module.exports = {
  loginCheck
}