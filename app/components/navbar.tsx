export default function NavBar() {
  return (
    <header className="shadow-sm">
      <div className="container">
        <ul className="flex justify-between items-center py-4">
          <li>
            <h1 className="font-bold text-xl flex items-center gap-3">
              <a href="/">
                <img
                  src="/ikuma.png"
                  alt="ikuma-tのアイコン"
                  width="38px"
                  className="rounded-full shadow-md hover:opacity-80"
                />
              </a>
            </h1>
          </li>
          <li className="text-zinc-900 hover:opacity-80">
            <a
              href="https://ikuma-t.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
