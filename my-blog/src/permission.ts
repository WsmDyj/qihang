import router from './router'
import { Route } from 'vue-router'
import { UserModule } from './store/modules/user'


router.beforeEach(async(to: Route, from: Route, next: any) => {
  // if (UserModule.token) {
    
    next()
  // } else {
    
  // }
})
