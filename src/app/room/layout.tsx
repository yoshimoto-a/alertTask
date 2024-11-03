import { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = {
  robots: {
    index: false,
  },
};
export default function RoomLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh">{children}</div>;
}
