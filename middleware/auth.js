import jwt from 'jsonwebtoken'

export const auth = (request, response, next) => {
  // Authorization / x-auth-token

  try {
    const token = request.header('x-auth-token')
    console.log(token)
    jwt.verify(token, process.env.SECRET_KEY)
    next()
  } catch (err) {
    response.status(401) // 200 or 401
    response.send({ err: err.message })
  }
}
