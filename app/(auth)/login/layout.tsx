export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto py-10">
      <div className="bg-accent">
        <div className="p-2 sm:p-4 md:p-6 lg:p-8">{children}</div>
      </div>
    </main>
  );
}
