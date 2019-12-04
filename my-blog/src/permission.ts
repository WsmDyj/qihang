import router from './router'
import { Route } from 'vue-router'
import { UserModule } from './store/modules/user'
import { ArticleModule } from './store/modules/article'

router.beforeEach(async(to: Route, from: Route, next: any) => {
  if (UserModule.token) {
    // 获取用户的信息
    await UserModule.GetUserInfo() 
    // 获取用户点赞的信息
    await ArticleModule.getLikeLists()
  }
  next()
})
router.afterEach((to: Route) => {
  // set page title
  if (to.meta.title) {
    document.title = to.meta.title
  }
})
