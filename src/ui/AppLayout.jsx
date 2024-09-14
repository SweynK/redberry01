import Header from "../components/Header";
import { Outlet } from "react-router-dom";
// import Home from "../starter/Home";

export default function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
