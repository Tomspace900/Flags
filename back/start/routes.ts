import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const CountriesController = () => import('#controllers/countries_controller')
const HomeController = () => import('#controllers/home_controller')
const SessionController = () => import('#controllers/session_controller')
const ProfileController = () => import('#controllers/profiles_controller')
const ScoresController = () => import('#controllers/scores_controller')

router.get('/', [HomeController, 'show'])

router
  .group(() => {
    router.get('/session', [SessionController, 'show'])

    router.post('/register', [SessionController, 'register']).use(middleware.guest())

    router.post('/login', [SessionController, 'login']).use(middleware.guest())

    router.post('/logout', [SessionController, 'logout']).use(middleware.auth())
  })
  .prefix('auth')

router.get('/profile', [ProfileController, 'show']).use(middleware.auth())

router.get('/scores', [ScoresController, 'index']).use(middleware.auth())

router.post('/scores', [ScoresController, 'store']).use(middleware.auth())

router
  .group(() => {
    router.post('/', [CountriesController, 'store']).use(middleware.admin())

    router.get('/', [CountriesController, 'index'])

    router.get('/:id', [CountriesController, 'show'])

    router.put('/:id', [CountriesController, 'update']).use(middleware.admin())

    router.delete('/:id', [CountriesController, 'destroy']).use(middleware.admin())

    router.post('/seed', [CountriesController, 'seed']).use(middleware.admin())
  })
  .prefix('country')
