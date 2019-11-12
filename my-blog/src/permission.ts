import router from './router'
import { Route } from 'vue-router'
import { UserModule } from './store/modules/user'
import { ArticleModule } from './store/modules/article'
import Axios from 'axios'


router.beforeEach(async(to: Route, from: Route, next: any) => {
  if (UserModule.token) {
    await UserModule.GetUserInfo()
    await ArticleModule.getLikeLists()
    next()
  } else {
    next()
  }
})
