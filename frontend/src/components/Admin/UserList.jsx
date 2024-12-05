import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import DeleteConfirm from "../Common/DeleteConfirm";
const UserList = () => {


    const [users, setUsers] = useState([])
    const { isAuthorized, user } = useSelector((state) => {
      return state.auth;
    }); 

    useEffect(() => {
        if (user && user.role === "Admin") {
            axios
              .get("http://localhost:4000/api/v1/user/getAllUsers", {
                withCredentials: true,
              })
              .then((res) => {
                console.log(res.data);
                setUsers(res.data.users);
              })
              .catch((error) => {
                toast.error(error.response.data.message);
              });
          } 

          if (!isAuthorized) {
            navigateTo("/");
            return null; // Prevent rendering while redirecting
          }
    }, [isAuthorized, user])

    const deleteUser = (email) => {
        try {
          axios
            .delete(`http://localhost:4000/api/v1/user/delete/${email}`, {
              withCredentials: true,
            })
            .then((res) => {
              toast.success(res.data.message);
              setUsers((prevUser) =>
              prevUser.filter((user) => user.email !== email)
              );
            });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };

    return (
        <section className="my_applications page">
            <div className="container">
          <h1>My Users</h1>
          {users.length <= 0 ? (
            <>
              <h4>No Users Found</h4>
            </>
          ) : (
                <DeleteUserCard 
                 deleteUser = {deleteUser}
                 users = {users}
                />
          )}
        </div>
        </section>
    )
}



const DeleteUserCard = ({ deleteUser, users }) => {
    return (
      <>
        {users.map(user => (
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
                <span>Created At:</span> {user.createdAt}
              </p>
            </div>

            <div className="btn_area">
            <DeleteConfirm
              message={`Are you sure you want to delete ${user.name}?`}
              onConfirm={() => deleteUser(user.email)}
              deleteButtonName={`Delete User`}
            />
          </div>
          </div>
        ))}
      </>
    );
  };

  export default UserList;