export * from './server'

export const ignoreErrors = [
  /Element (metadata|script|foreignObject|fe\w+|([a-z]+:[a-z]+)) not yet implemented/i,
  /entity not found/i,
  /Synchronous XMLHttpRequest/i,
  /SameSite/
]

export function filterConsoleWarn() {
  const { warn } = console
  const mockWarn = jest.spyOn(console, 'warn').mockImplementation((first, ...args: unknown[]) => {
    if (typeof first !== 'string'
      || ignoreErrors.every(_ => !_.test(first))
    ) {
      warn(first, ...args)
    }
  })

  return mockWarn.mockRestore.bind(mockWarn) as () => void
}

export function filterConsoleError() {
  const { error } = console
  const mockError = jest.spyOn(console, 'error').mockImplementation((first, ...args: unknown[]) => {
    if (typeof first !== 'string'
      || ignoreErrors.every(_ => !_.test(first))
    ) {
      error(first, ...args)
    }
  })

  return mockError.mockRestore.bind(mockError) as () => void
}

export function base64ToBuffer(base64: string, type = 'image') {
  let [extname, data] = base64.split(';base64,')

  extname = extname.replace(/^data:/, '')

  if (type && !extname.includes(type)) {
    throw new Error(`Invalid type: ${extname}`)
  }

  return Buffer.from(data, 'base64')
}
