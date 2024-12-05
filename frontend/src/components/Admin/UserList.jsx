import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import DeleteConfirm from "../Common/DeleteConfirm";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const navigateTo = useNavigate();
  const [users, setUsers] = useState([]);
  const { isAuthorized, user } = useSelector((state) => state.auth);

  useEffect(() => {

    if (user && user.role === "Admin") {
      const fetchUsers = async () => {
        try {
          const res = await axios.get("http://localhost:4000/api/v1/user/getAllUsers", {
            withCredentials: true,
          });
          setUsers(res.data.users);
        } catch (error) {
          toast.error(error.response?.data?.message || "Failed to fetch users");
        }
      };

      fetchUsers();
    }
  }, [isAuthorized, user, navigateTo]);

  const deleteUser = async (email) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/v1/user/delete/${email}`, {
        withCredentials: true,
      });
      
      toast.success(res.data.message);
      setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  // If user is not an admin, return null or a restricted access message
  if (user?.role !== "Admin") {
    return <div>Access Denied: Admin privileges required</div>;
  }

  return (
    <section className="my_applications page">
      <div className="container">
        <h1>My Users</h1>
        {users.length === 0 ? (
          <h4>No Users Found</h4>
        ) : (
          <DeleteUserCard deleteUser={deleteUser} users={users} />
        )}
      </div>
    </section>
  );
};

const DeleteUserCard = ({ deleteUser, users }) => {
  return (
    <>
      {users.map((user) => (
        <div className="job_seeker_card" key={user.email}>
          <div className="detail">
            <p>
              <span>Name:</span> {user.name}
            </p>
            <p>
              <span>Email:</span> {user.email}
            </p>
            <p>
              <span>Role:</span> {user.role}
            </p>
            <p>
              <span>Created At:</span> {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="btn_area">
            <DeleteConfirm
              message={`Are you sure you want to delete ${user.name}?`}
              onConfirm={() => deleteUser(user.email)}
              deleteButtonName="Delete User"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default UserList;