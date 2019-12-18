import router from './router'
import { Route } from 'vue-router'

import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

import { UserModule } from './store/modules/user'
import { ArticleModule } from './store/modules/article'
import { followsModule } from './store/modules/follow'

NProgress.configure({ showSpinner: false })

router.beforeEach(async(to: Route, from: Route, next: any) => {
  NProgress.start()
  if (UserModule.token) {
    // 获取用户的信息
    await UserModule.GetUserInfo() 
    // 获取用户点赞的信息
    await ArticleModule.getLikeLists()
    // 用户关注人
    await followsModule.getFollows() 
  }
  next()
  NProgress.done()
})
router.afterEach((to: Route) => {
  // set page title
  NProgress.done()
  if (to.meta.title) {
    document.title = to.meta.title
  }
})
