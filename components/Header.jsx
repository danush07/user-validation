import Link from "next/link";
import { CgUserList } from "react-icons/cg";

function Header() {
  return (
    <header className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-900">
      <div className="text-white flex font-bold cursor-pointer">
        <Link href="/" className="flex items-center">
          <CgUserList className="text-3xl mr-2" />{" "}
          <Link href="/">User Operations</Link>
        </Link>
      </div>
      <div className="w-full border-b border-gray-800 mt-3"></div>
    </header>
  );
}

export default Header;
