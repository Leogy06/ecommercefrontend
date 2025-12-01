import React from "react";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen overflow-y-auto">
      <div className="container mx-2 sm:mx-4 md:mx-auto py-10">
        <div className="space-y-4">{children}</div>
      </div>
    </main>
  );
}
