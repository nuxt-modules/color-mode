import { parse } from 'cookie'

const cookieKey = '<%= options.cookie.key %>'

export default function (ctx, inject) {
  // Read from cookie
  let preference = '<%= options.preference %>'
  if (ctx.req) {
    // Check if cookie exist, otherwise TypeError: argument str must be a string
    const cookies = parse(ctx.req.headers.cookie || '')

    if (cookies[cookieKey] && cookies[cookieKey] !== preference) {
      preference = cookies[cookieKey]
    }
  }
  const colorMode = {
    preference: preference,
    value: preference
  }

  inject('colorMode', colorMode)
}
