import Link from "next/link";
import { FiUserPlus } from "react-icons/fi";
import { FaUsers } from "react-icons/fa6";
import Header from "../components/Header";
import { useState } from "react";
import AddUserCanvas from "../components/AddUserCanvas";

export default function Home() {
  const [showOffCanvas, setShowOffcanvas] = useState(false);

  const openOffCanvas = () => {
    setShowOffcanvas(true);
  };

  const closeOffCanvas = () => {
    setShowOffcanvas(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen font-[inter] flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 p-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-center mb-4">
          Hi There, What Would you Like to Do Today?
        </h1>
        <div className="flex flex-col items-center space-y-4">
          <div
            className="flex items-center transition bg-blue-500 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg text-center text-sm"
            onClick={() => openOffCanvas()}
          >
            <FiUserPlus className="text-xl mr-2" /> Add User
          </div>
          <Link
            href="/dashboard"
            className="flex items-center transition bg-blue-500 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg text-center text-sm"
          >
            <FaUsers className="text-xl mr-2" /> View List of Users
          </Link>
        </div>
      </div>
      {showOffCanvas && <AddUserCanvas onClose={closeOffCanvas} />}
    </>
  );
}
