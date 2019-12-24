const express = require('express')
const superagent = require('superagent')
const events = require('events')
var emitter = new events.EventEmitter()

setCookeie ();
emitter.on("setCookeie", getTitles)  
          //监听setCookeie事件

function setCookeie () {
  superagent.post('https://juejin.im/auth/type/email')  //学校里的一个论坛，这是登录提交地址
  .set('Origin', 'https://juejin.im') 
  .set('Referer', 'https://juejin.im/') 
  .set('Host','juejin.im' )
  .set('Cookie', 'ab={}; _ga=GA1.2.1128907161.1575040432; _gid=GA1.2.1552090837.1575040432; gr_user_id=d52888f2-4143-4f73-9bb7-16da68f3b8e1; Hm_lvt_93bbd335a208870aa1f296bcd6842e5e=1574921367,1575022779,1575039763; gr_session_id_89669d96c88aefbc=200da906-b489-45dd-ad3e-509f572ea083; gr_cs1_200da906-b489-45dd-ad3e-509f572ea083=objectId%3A5acde3bdf265da239b41cc68; gr_session_id_89669d96c88aefbc_200da906-b489-45dd-ad3e-509f572ea083=true; _gat=1; auth=; auth.sig=25Jg_aucc6SpX1VH8RlCoh6azLU; QINGCLOUDELB=229d9a3634d498216e02f8b4f3770be609f51ba16147f64a21f5d51a89fcd206|XeTH9|XeTH7; Hm_lpvt_93bbd335a208870aa1f296bcd6842e5e=1575274483') 
  .send({
    email:"shunwu2001@163.com",
    password:"shunwu2001@163.com"})                                                                                       //这肯定不是我真的用户名和密码啦
  .end(function(err, res){
    if (err) throw err;
    var cookie = res.header['set-cookie']             //从response中得到cookie
    console.log(cookie)
  })
}
function getTitles(cookie) {
  console.log(cookie)
}
function getInfo () {
  
// 用户信息
let userParams = {
  // operationName:"",
  // query:"",
  // variables: {
  //   first:20,
  //   after: "",
  //   order: "POPULAR"
  // },
  // extensions: {
  //   query: {
  //     id: "21207e9ddb1de777adeaca7a2fb38030"
  //   }
  // }
  email: '1575039884925',
  passworld:'shunwu2001@163.com'
}
superagent.post('https://juejin.im/auth/type/email')
    .send(userParams)
    .set('X-Agent', 'Juejin/Web')
    .end(res => {
      console.log(res)
    })

// 文章列表
  // let query = {
  //   src: 'web',
  //   uid: '5acde3bdf265da239b41cc68',
  //   device_id: '1575023763669',
  //   token: 'eyJhY2Nlc3NfdG9rZW4iOiJUOVR6c014QjR1VnZQbUVZIiwicmVmcmVzaF90b2tlbiI6IktvNHdWdTJRM3F6RDI0bm0iLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==',
  //   targetUid: '5acde3bdf265da239b41cc68',
  //   type: 'post',
  //   limit: 20,
  //   order:'createdAt'
  // }
  // superagent.get('https://timeline-merger-ms.juejin.im/v1/get_entry_by_self',query)
  //  .then((res) => {
  //     console.log(JSON.parse(res.text).d.entrylist[0].originalUrl)
  //   })
// 文章详情
//  let articleParams = {
//   token: 'eyJhY2Nlc3NfdG9rZW4iOiJUOVR6c014QjR1VnZQbUVZIiwicmVmcmVzaF90b2tlbiI6IktvNHdWdTJRM3F6RDI0bm0iLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==',
//   src: 'web',
//   type: 'entryView',
//   postId: '5dde18e1f265da05e97b4eed'
//  }
//  superagent.get('https://post-storage-api-ms.juejin.im/v1/getDetailData',articleParams)
//  .then(res => {
//    console.log(JSON.parse(res.text))
//  })
}
// getInfo()




