import HttpExceptionHandler from '#exceptions/handler'
import type { Authenticators } from '@adonisjs/auth/types'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    if (await ctx.auth.authenticateUsing(options.guards)) {
      return next()
    }
    return ctx.response.status(403).send(HttpExceptionHandler.message('User not logged in'))
  }
}
