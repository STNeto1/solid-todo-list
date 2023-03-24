import { JSX } from 'solid-js'

export const Label = (props: JSX.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      {...props}
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    />
  )
}
