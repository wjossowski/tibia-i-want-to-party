export class HttpError extends Error {
  constructor(public status: number, public message: string) {
    super(message)
  }
}

export const applicationErrors = {
  badRequest(message: string) {
    return new HttpError(400, message || 'Bad request')
  },
  notFound(message: string) {
    return new HttpError(404, message || 'Not found')
  },
}
