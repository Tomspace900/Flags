import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {
  async show({ auth, response }: HttpContext) {
    if (auth.isAuthenticated) {
      const { id, username, firstname, lastname } = auth.user!

      return response.json({ id, username, firstname, lastname })
    } else {
      response.redirect('/')
    }
  }
}
