import { forwardRef, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, ...props }, ref) => {
    const baseStyles =
      "cursor-pointer h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors";

    const variantStyles = {
      primary:
        "disabled:opacity-30 disabled:cursor-no-drop [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90",
      secondary:
        "bg-gray-100 text-black hover:bg-gray-300/90 shadow-sm",
      danger: "bg-red-500 text-gray-50 shadow-sm hover:bg-red-300/90",
    };

    const buttonStyles = clsx(baseStyles, variantStyles[variant], className);

    return <button ref={ref} className={buttonStyles} {...props} />;
  }
);

Button.displayName = "Button"; // Ajouté pour éviter des warnings avec React DevTools

export default Button;
