export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="py-10">
      <div className="container mx-auto ">
        <div className="bg-accent rounded-xl shadow-sm">
          <div className="p-4 sm:p-6 md:p-8">{children}</div>
        </div>
      </div>
    </main>
  );
}
