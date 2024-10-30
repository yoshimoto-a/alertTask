"use client";
import { ReactNode, ComponentPropsWithRef, forwardRef } from "react";

interface Props extends Omit<ComponentPropsWithRef<"button">, "className"> {
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={
          "border-solid border-[1px] w-full h-full rounded-lg py-1 bg-black text-white hover:bg-white hover:text-black"
        }
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
