import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  return (
    <header className="navbar bg-base-100 top-0 absolute z-50 flex mx-auto justify-center">
      <div className="flex max-w-5xl w-full">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">Memory Game</a>
        </div>
        <div className="navbar-end">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
