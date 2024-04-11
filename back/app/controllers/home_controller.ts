import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async show({ response }: HttpContext) {
    return response.json({ message: 'Hello, world!' })
  }
}
