const { exec } = require('../db/mysql')
const { getUserInfo } = require('./user')

const getFollow = async (actionsdData = {}) => {
  const follow_author = actionsdData.username
  const following_author = actionsdData.author
  const sql = `insert into follows (follow_author, following_author) values ('${follow_author}', '${following_author}');`
  const insertData = await exec(sql)
  if (insertData.affectedRows > 0) {
    return true
  } else {
    return false
  }
}

const getUnfollow = async (actionsdData = {}) => {
  const follow_author = actionsdData.username
  const following_author = actionsdData.author
  const sql = `delete from follows where following_author='${following_author}' and follow_author='${follow_author}';`
  const insertData = await exec(sql)
  if (insertData.affectedRows > 0) {
    return true
  } else {
    return false
  }
}

const getFollowList = async (username) => {
  const followingSql = `select follows.follow_author as author from follows where following_author = '${username}';`
  const followsSql = `select follows.following_author as author from follows where follow_author = '${username}';`
  
  const followings = await exec(followingSql)
  const follows = await exec(followsSql)
 
  const followsData = await getFollowInfo(followings, '关注了')
  const followingsData = await getFollowInfo(follows, '关注者')
  
  const result = []
  result.push(followsData)
  result.push(followingsData)
  return result
}

const getFollowInfo = async (data, title) => {
  const FollowData = {
    title: title,
    data: [],
    count: data.length
  }
  for (let i = 0 ;i< data.length; i++) {
    const userInfo = await getUserInfo(data[i].author)
    Object.assign(data[i], userInfo)
    FollowData.data.push(data[i])
  } 
  return FollowData
}

module.exports = {
  getFollow,
  getUnfollow,
  getFollowList
}