<template>
  <div>
    <label>
      用户名 <input type="text" id="textUsername"/>
    </label>
    <label>
      密码 <input type="password" id="textPassword"/>
    </label>
    <button @click="login" id="btnLogin">登录</button>
  </div>
</template>

<script>
import { fetchpost } from '../http/http'
export default {
  methods: {
    login () {
      fetchpost('/api/user/login', { username: 'zhangsan', password: '123' }).then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>
