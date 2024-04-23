import HttpExceptionHandler from '#exceptions/handler'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async show({ auth, response }: HttpContext) {
    const user = await auth.use('web').authenticate()
    if (user) {
      return response.status(200).json(user)
    } else {
      return response.status(401).json(HttpExceptionHandler.message('Not authenticated'))
    }
  }

  async register({ request, auth, response }: HttpContext) {
    const userData = request.only(['firstname', 'lastname', 'username', 'password'])

    const existingUser = await User.findBy('username', userData.username)
    if (existingUser) {
      return response.status(400).json(HttpExceptionHandler.message('Username already exists'))
    }

    const user = await User.create(userData)

    // log in the user after creation
    await auth.use('web').login(user)

    return response.json(user)
  }

  async login({ request, auth, response }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])

    const user = await User.verifyCredentials(username, password)

    await auth.use('web').login(user)

    return response.json(user)
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.json({ message: 'Logged out' })
  }
}
