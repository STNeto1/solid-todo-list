import { Show } from 'solid-js'
import { A, FormError } from 'solid-start'
import { createServerAction$ } from 'solid-start/server'
import { z } from 'zod'
import { Input } from '~/components/Input'
import { Label } from '~/components/Label'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export default function LoginPage() {
  const [loggingIn, { Form }] = createServerAction$(async (form: FormData) => {
    await new Promise((f) => setTimeout(f, 1000))

    const email = form.get('email')
    const password = form.get('password')

    const fields = { email, password }
    const schemaResult = loginSchema.safeParse(fields)

    if (!schemaResult.success) {
      const fieldErrors = {
        email: schemaResult.error.formErrors.fieldErrors.email?.join(', '),
        password: schemaResult.error.formErrors.fieldErrors.password?.join(', ')
      }

      throw new FormError('Fields invalid', { fieldErrors, fields })
    }

    console.log(schemaResult.data)

    // const user = await login({ username, password });
    // if (!user) {
    //   throw new FormError(`Username/Password combination is incorrect`, {
    //     fields,
    //   });
    // }
    // return createUserSession(`${user.id}`, redirectTo);
  })

  return (
    <main class="flex h-screen w-screen flex-col items-center justify-center py-12  sm:px-6 lg:px-8">
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h1 class="text-2xl font-bold text-gray-800 text-center">Login</h1>

          <Form class="space-y-4 mt-4">
            <div>
              <Label for="email-input">Email</Label>
              <Input
                name="email"
                placeholder="kody@mail.com"
                disabled={loggingIn.pending}
              />

              <Show when={loggingIn.error?.fieldErrors?.email}>
                <p class="mt-1 text-sm text-red-600" id="email-error">
                  {loggingIn.error.fieldErrors.email}
                </p>
              </Show>
            </div>

            <div>
              <Label for="password-input">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="your password"
                disabled={loggingIn.pending}
              />

              <Show when={loggingIn.error?.fieldErrors?.password}>
                <p class="mt-1 text-sm text-red-600" id="password-error">
                  {loggingIn.error.fieldErrors.password}
                </p>
              </Show>
            </div>
            {/* 
            <Show when={loggingIn.error}>
              <div
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span class="block sm:inline">{loggingIn.error.message}</span>
              </div>
            </Show> */}

            <button
              type="submit"
              class="w-full bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100 h-10 py-2 px-4 active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
              disabled={loggingIn.pending}
            >
              {'Login'}
            </button>
          </Form>

          {/* redirect to register page */}
          <div class="mt-8 flex justify-end gap-2">
            <span>Do not have an account? </span>
            <A
              href="/auth/register"
              class="text-slate-900 hover:text-slate-800 dark:text-slate-800 dark:hover:text-slate-800"
            >
              {'Register'}
            </A>
          </div>
        </div>
      </div>
    </main>
  )
}
