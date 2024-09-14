import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="max-w-[1920px] h-[100px]  mx-auto  flex justify-center border-b border-lightGray">
      <nav className="w-[1596px]  flex items-center">
        <img src={logo} alt="logo" className="" />
      </nav>
    </header>
  );
}
