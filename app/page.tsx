import Dashboard from "./dashboard/page";
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col ">
      <Navbar />
      <Dashboard />
    </div>
  );
}
