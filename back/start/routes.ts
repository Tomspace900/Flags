import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const HomeController = () => import('#controllers/home_controller')
const SessionController = () => import('#controllers/session_controller')
const ProfileController = () => import('#controllers/profiles_controller')
const ScoresController = () => import('#controllers/scores_controller')

router.get('/', [HomeController, 'show'])

router
  .group(() => {
    router.post('/register', [SessionController, 'register']).use(middleware.guest())

    router.post('/login', [SessionController, 'login']).use(middleware.guest())

    router.post('/logout', [SessionController, 'logout']).use(middleware.auth())
  })
  .prefix('auth')

router.get('/profile', [ProfileController, 'show']).use(middleware.auth())

router.get('/scores', [ScoresController, 'index']).use(middleware.auth())

router.post('/scores', [ScoresController, 'store']).use(middleware.auth())
