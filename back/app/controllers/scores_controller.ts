import HttpExceptionHandler from '#exceptions/handler'
import Score from '#models/score'
import { type HttpContext } from '@adonisjs/core/http'

export default class ScoresController {
  async index({ auth }: HttpContext) {
    if (auth.isAuthenticated) {
      const scores = await Score.query().where('user_id', auth.user!.id)
      if (scores.length > 0) {
        return scores
      }

      return HttpExceptionHandler.message('No scores found')
    }
  }

  async store({ auth, request }: HttpContext) {
    if (auth.isAuthenticated) {
      const { time } = request.only(['time'])
      const score = await Score.create({ userId: auth.user!.id, time: Number.parseInt(time) })
      return score
    }
  }
}
