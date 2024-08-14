import React from "react";
import { Link } from "react-router-dom";

const getInitials = (name) => {
  const [first, last] = name.split(" ");
  return `${first.charAt(0)}${last.charAt(0)}`;
};

const UserCard = ({ user }) => {
  return (
    <div className="p-4 border rounded shadow ">
      <img
        src={`https://placehold.co/100x100?text=${getInitials(user.name)}`}
        alt={user.name}
        className="rounded-full mb-4 text-red-400"
      />
      <h2 className="text-lg font-bold">{user.name}</h2>
      <p>{user.email}</p>
      <Link to={`/user/${user.id}`} className="text-blue-500">
        View Details
      </Link>
    </div>
  );
};

export default UserCard;
