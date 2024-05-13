import HttpExceptionHandler from '#exceptions/handler'
import type { Authenticators } from '@adonisjs/auth/types'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Admin middleware is used to authenticate HTTP requests and deny
 * access to users who are not authenticated or do not have the 'admin' role.
 */
export default class AdminMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    const user = await ctx.auth.authenticateUsing(options.guards)
    if (user && user.role === 'admin') {
      return next()
    }
    return ctx.response.status(403).send(HttpExceptionHandler.message('User not logged in'))
  }
}
