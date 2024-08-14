import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
    },
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setFormData(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, formData)
      .then((response) => {
        setUser(response.data);
        setIsEditing(false);
        navigate(`/`);
        alert("User Update Successfully")
      })
      .catch((error) => console.error(error));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-6">
        User Details for <span className="text-blue-600">@{user.username}</span>
      </h1>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div>
              <label className="block font-bold">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mb-4 p-2 border rounded w-full"
              />

              <label className="block font-bold">Email Address</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mb-4 p-2 border rounded w-full"
              />

              <label className="block font-bold">Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mb-4 p-2 border rounded w-full"
              />

              <label className="block font-bold">Address</label>
              <input
                name="street"
                value={formData.address.street}
                onChange={handleAddressChange}
                placeholder="Street"
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                name="suite"
                value={formData.address.suite}
                onChange={handleAddressChange}
                placeholder="Suite"
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                placeholder="City"
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                name="zipcode"
                value={formData.address.zipcode}
                onChange={handleAddressChange}
                placeholder="Zipcode"
                className="mb-4 p-2 border rounded w-full"
              />
            </div>
            <div>
              <label className="block font-bold">Company</label>
              <input
                name="name"
                value={formData.company.name}
                onChange={handleCompanyChange}
                placeholder="Company Name"
                className="mb-4 p-2 border rounded w-full"
              />

              <label className="block font-bold">Catch Phrase</label>
              <input
                name="catchPhrase"
                value={formData.company.catchPhrase}
                onChange={handleCompanyChange}
                placeholder="Catch Phrase"
                className="mb-4 p-2 border rounded w-full"
              />

              <label className="block font-bold">Industry</label>
              <input
                name="bs"
                value={formData.company.bs}
                onChange={handleCompanyChange}
                placeholder="Industry"
                className="mb-4 p-2 border rounded w-full"
              />
            </div>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Update
          </button>
        </form>
      ) : (
        <div className="flex items-start">
          <img
            src={`https://placehold.co/150x150?text=${user.name[0]}${user.name.split(" ")[1][0]}`}
            alt={user.name}
            className="w-24 h-24 rounded-full mr-6"
          />
          <div className="grid grid-cols-2 gap-4 w-full">
            <div>
              <label className="block font-bold">Name</label>
              <p className="mb-4 ">{user.name}</p>

              <label className="block font-bold">Email Address</label>
              <p className="mb-4">{user.email}</p>

              <label className="block font-bold">Username</label>
              <p className="mb-4">{user.username}</p>

              <label className="block font-bold">Address</label>
              <p className="mb-4">{`${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}</p>
            </div>
            <div>
              <label className="block font-bold">Company</label>
              <p className="mb-4">{user.company.name}</p>

              <label className="block font-bold">Catch Phrase</label>
              <p className="mb-4">{user.company.catchPhrase}</p>

              <label className="block font-bold">Industry</label>
              <p className="mb-4">{user.company.bs}</p>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {isEditing ? "Cancel" : "Edit"}
      </button>
    </div>
  );
};

export default UserDetail;
