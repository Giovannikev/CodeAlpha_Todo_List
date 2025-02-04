import * as React from "react"

import { clsx } from "clsx"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={clsx(
        "flex min-h-[60px] w-full rounded-md border border-gray-50 bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
