import React, { useEffect, useState } from "react";
import { getSingleUser } from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header";
import { LiaUserEditSolid } from "react-icons/lia";
import { AiOutlineUserDelete } from "react-icons/ai";
import EditUserCanvas from "../../components/EditUserCanvas";
import DeleteUser from "../../components/DeleteUser";
import { useRouter } from "next/navigation";

function profile({ id }) {
  const [editCanvasVisible, setEditCanvasVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const SingleUser = useSelector((state) => state.persist.singleUser);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, [id]);

  const openEditCanvas = () => {
    setEditCanvasVisible(true);
  };

  const closeEditCanvas = () => {
    setEditCanvasVisible(false);
  };

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const redirectToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b text-white from-gray-900 via-purple-900 to-violet-600 min-h-screen p-4">
        <div className="mb-4 flex justify-start">
          <button
            onClick={redirectToDashboard}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex"
          >
            Back to Dashboard
          </button>
        </div>
        <div className="w-full mx-auto dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-5">
          <div className="mb-4">
            <div className="flex justify-end">
              <div className="flex items-center">
                <button
                  onClick={openEditCanvas}
                  className="flex items-center font-semibold text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 p-2 ml-3 rounded"
                >
                  <LiaUserEditSolid className="text-xl" />
                  <span className="ml-1">Edit</span>
                </button>
                <button
                  onClick={openDeleteModal}
                  className="flex items-center font-semibold text-white bg-red-500 p-2 ml-3 rounded-sm hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-red-800"
                >
                  <AiOutlineUserDelete className="text-xl" />
                  <span className="ml-1">Delete</span>
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white mt-4">
              User FullName :{" "}
              <span className="text-blue-500">{`${SingleUser.firstname} ${SingleUser.lastname} `}</span>
            </h1>
            <div className="mt-4">
              <span className="text-white font-medium block">
                Email : {SingleUser.email}
              </span>
              <span className="text-white block">
                Mobile: {SingleUser.mobile}
              </span>
              <span className="text-white block">
                Address 1 : {SingleUser.address1}
              </span>
              <span className="text-white block">
                Address 2 :{SingleUser.address2 ? SingleUser.address2 : `-`}
              </span>
              <span className="text-white block">
                Country :{SingleUser.country.map((country) => country.label)}
              </span>
              <span className="text-white block">
                State : {SingleUser.state.map((state) => state.label)}
              </span>
              <span className="text-white block">
                City : {SingleUser.city.map((city) => city.label)}
              </span>
              <span className="text-white block">
                Zip-Code :{SingleUser.zipcode}
              </span>
            </div>
          </div>
        </div>
      </div>
      {editCanvasVisible && (
        <EditUserCanvas userId={id} onClose={closeEditCanvas} />
      )}
      {deleteModalVisible && (
        <DeleteUser userId={id} onClose={closeDeleteModal} />
      )}
    </>
  );
}

export default profile;

export async function getServerSideProps(context) {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
}
