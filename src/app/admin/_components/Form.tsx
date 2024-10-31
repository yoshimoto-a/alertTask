"use client";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
  onSubmit: (() => void) | ((e: React.FormEvent) => Promise<void>);
  title: string;
}

export const Form: React.FC<Props> = ({ children, onSubmit, title }) => {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <h2 className="text-2xl pt-10 pb-5">{title}</h2>
      <form
        onSubmit={onSubmit}
        className="mx-2 px-10 py-20 border-2 rounded-lg"
      >
        {children}
      </form>
    </div>
  );
};
