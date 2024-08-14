import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter users based on the search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-6">User Card Lists</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow-md flex">
            <img
              src={`https://placehold.co/100x100?text=${user.name[0]}${
                user.name.split(" ")[1][0]
              }`}
              alt={user.name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="font-bold">
                {user.name} (@{user.username})
              </h2>
              <p className="text-blue-600">{user.email}</p>
              <p>Company: {user.company.name}</p>
              <p>Phone: {user.phone}</p>
              <p>
                Website:{" "}
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website}
                </a>
              </p>
              <Link to={`/user/${user.id}`}>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
                  Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
