import { useState, useEffect } from "react";
import { UserId, User } from "../store/users/slice";
import { useUserActions } from "../hooks/useUserActions";
import { Input } from "./UI/Input";
import { Button } from "./UI/Button";

interface EditUserProps {
  id: UserId;
  userData: User;
  onClose: () => void;
}

const EditUser: React.FC<EditUserProps> = ({ id, userData, onClose }) => {
  const { editUser } = useUserActions();
  const [errors, setErrors] = useState<Partial<User>>({});
  const [formData, setFormData] = useState(userData);

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    editUser(id, formData);
    onClose();
    if (validateForm()) {
      editUser(id, formData);
      onClose();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Partial<User> = {};
    if (!formData.name) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.github) {
      newErrors.github = "GitHub username is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <div>
        <img
          style={{
            width: "120px",
            height: "120px",
            marginBottom: "10px",
            borderRadius: "50%",
            marginRight: "8px",
          }}
          src={`https://unavatar.io/github/${formData.github}`}
          alt={formData.name}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" style={{ color: "white" }}>
          Name:
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{ marginTop: "6px", marginBottom: "10px" }}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        <div>
          <label htmlFor="email" style={{ color: "white" }}>
            Email:
          </label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ marginTop: "6px", marginBottom: "10px" }}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="github" style={{ color: "white" }}>
            GitHub:
          </label>
          <Input
            id="github"
            name="github"
            value={formData.github}
            onChange={handleChange}
            style={{ marginTop: "6px", marginBottom: "10px" }}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.github}</p>}
        </div>
        <Button
          style={{ marginTop: "6px", marginBottom: "10px" }}
          type="submit">
          Update User
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
