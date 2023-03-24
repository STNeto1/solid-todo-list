import { createCookieSessionStorage } from 'solid-start'

const sessionSecret = 'Cp288hsAjsDbi753Q2frPC8tqFPm6l6OXHB5k7x1WiQ=' as const

const storage = createCookieSessionStorage({
  cookie: {
    name: 'RJ_session',
    // secure doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: true,
    secrets: ['hello'],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
})

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'))
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request)
  const userId = session.get('userId')
  if (!userId || typeof userId !== 'string') return null
  return userId
}
