import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const baseStyles = "cursor-pointer h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950  ";

  const variantStyles = {
    primary: "disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90",
    secondary: "bg-slate-100 text-black hover:text-slate-900 hover:bg-slate-900/30 shadow-sm",
    danger: " bg-red-500 text-gray-50 shadow-sm hover:bg-red-300/90",
  };

  const buttonStyles = clsx(baseStyles, variantStyles[variant], className);

  return <button className={buttonStyles} {...props} />;
}
