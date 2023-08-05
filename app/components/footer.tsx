export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grid border-t border-zinc-100 place-content-center bg-yellow-400">
      <div className="container py-8">
        <p className="text-zinc-500 text-xs md:text-sm lg:text-md">
          &copy; Copyright ikuma-t {year}, All rights reserved
        </p>
      </div>
    </footer>
  );
}
