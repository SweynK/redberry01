import Header from "../components/Header";
import { Outlet } from "react-router-dom";
// import Home from "../starter/Home";

export default function AppLayout() {
  return (
    <div className=" w-full">
      <Header />
      <main className="pt-[77px] max-w-[1596px] mx-auto ">
        <Outlet />
      </main>
    </div>
  );
}
