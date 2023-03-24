import { JSX } from 'solid-js'

export const Input = (props: JSX.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-800"
    />
  )
}
