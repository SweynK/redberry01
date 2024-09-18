import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="w-full h-[100px]   flex justify-center border-b border-lightGray">
      <nav className="w-[1596px]  flex items-center">
        <img src={logo} alt="logo" className="" />
      </nav>
    </header>
  );
}
