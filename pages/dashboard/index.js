import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, getSingleUser,reset } from "../../features/userSlice";
import { LiaUserEditSolid } from "react-icons/lia";
import { AiOutlineUserDelete } from "react-icons/ai";
import { CgEye } from "react-icons/cg";
import EditUserCanvas from "../../components/EditUserCanvas";
import DeleteUser from "../../components/DeleteUser";
import AddUserCanvas from "../../components/AddUserCanvas";
import { FiUserPlus } from "react-icons/fi";
function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [editCanvasVisible, setEditCanvasVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [addUserCanvasVisible,setAddUserCanvasVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(reset());
  }, [dispatch]);

  const usersList = useSelector((state) => state.persist.users);
  const openEditCanvas = (userId) => {
    setEditCanvasVisible(true);
    setSelectedUserId(userId);
  };

  const closeEditCanvas = () => {
    setEditCanvasVisible(false);
    setSelectedUserId(null);
  };

  const openDeleteModal = (userId) => {
    setDeleteModalVisible(true);
    setSelectedUserId(userId);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setSelectedUserId(null);
  };

  const openAddUserCanvas = () => {
     setAddUserCanvasVisible(true);
  }
  const closeAddUserCanvas = () => {
   setAddUserCanvasVisible(false)
  }

  const navigateClick = (userId) => {
    router.push(`/dashboard/${userId}`);
    dispatch(getSingleUser(userId));
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 h-screen p-4">
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              List Of Users
            </h5>
            <button
              onClick={openAddUserCanvas}
              className="flex items-center justify-end transition bg-blue-500 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg text-center text-sm"
            >
              <FiUserPlus className="mr-2 flex" />
              Add User
            </button>
          </div>

          <div className="">
            {usersList.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No users so far.
              </p>
            ) : (
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                {usersList
                  .slice()
                  .reverse()
                  .map((user) => (
                    <li key={user.id} className="py-3 sm:py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0"></div>
                        <div className="flex-1 min-w-0 ms-4">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {user.firstname}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                        <div className="text-white flex justify-between gap-4">
                          <CgEye
                            onClick={() => navigateClick(user._id)}
                            className="cursor-pointer  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:text-green-500 duration-300"
                          />
                          <LiaUserEditSolid
                            onClick={() => openEditCanvas(user._id)}
                            className="cursor-pointer  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300"
                          />
                          <AiOutlineUserDelete
                            onClick={() => openDeleteModal(user._id)}
                            className="cursor-pointer  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:text-red-500 duration-300"
                          />
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {editCanvasVisible && (
        <EditUserCanvas userId={selectedUserId} onClose={closeEditCanvas} />
      )}
      {deleteModalVisible && (
        <DeleteUser userId={selectedUserId} onClose={closeDeleteModal} />
      )}
      {addUserCanvasVisible && <AddUserCanvas onClose={closeAddUserCanvas} />}
    </>
  );
}

export default Dashboard;
