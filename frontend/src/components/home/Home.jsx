import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({ name: "", email: "" });
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:8080/api/v1/getUsers");
      setUsers(res.data.data);
    };

    fetchUsers();
  }, []);
  console.log(users);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/users/${id}`);

        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));

        alert("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user", error);
        alert("Failed to delete user.");
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setUpdatedData({ name: user.name, email: user.email });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (id) => {
    try {
      // Make the API call to update the user
      await axios.put(`http://localhost:8080/api/v1/user/${id}`, updatedData);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, ...updatedData } : user
        )
      );

      setEditingUser(null);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user", error);
      alert("Failed to update user.");
    }
  };

  return (
    <div className="bg-gray-200">
      <h1 className="text-center">Users List</h1>
      <div className="mt-10">
        <table border="1" className="w-full text-left">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="flex gap-5">
                      <button onClick={() => handleEdit(user._id)}>Edit</button>
                      <button onClick={() => handleDelete(user._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {editingUser && (
        <div className="mt-10">
          <div className="w-[50%] m-auto">
            <h2>Edit User</h2>
            <form
              className="mt-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editingUser._id);
              }}
            >
              <div>
                <label>Name: </label>
                <input
                  type="text"
                  name="name"
                  value={updatedData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Email: </label>
                <input
                  type="email"
                  name="email"
                  value={updatedData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="border px-5 py-2 bg-green-200 rounded-lg mt-5 ml-5"
              >
                Update User
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
