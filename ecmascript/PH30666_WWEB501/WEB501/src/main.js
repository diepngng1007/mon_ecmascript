// import 'bootstrap/dist/css/bootstrap.min.css'
import {render, router} from './lib'
import SignIn from './page/signin'
import SignUp from './page/signup'

const app = document.querySelector('#app')
router.on('/signup', () => render(SignUp, app))
router.on('signin', () => render(SignIn, app))

router.resolve();