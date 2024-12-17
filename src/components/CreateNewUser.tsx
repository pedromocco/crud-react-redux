import { useState } from "react";
import { Button } from "./UI/Button";
import { Card } from "./UI/Card";
import { Input } from "./UI/Input";
import { useUserActions } from "../hooks/useUserActions";

const CreateNewUser = () => {
  const { addUser } = useUserActions();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (formData: FormData) => {
    const newErrors: { [key: string]: string } = {};

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const github = formData.get("github") as string;

    if (!name) newErrors.name = "Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!github) newErrors.github = "Github username is required";

    return newErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const github = formData.get("github") as string;

    addUser({ name, email, github });

    form.reset();
    setErrors({});
  };

  return (
    <Card>
      <h3 className="font-semibold text-gray-900 dark:text-gray-50">
        Create a new user
      </h3>
      <form onSubmit={handleSubmit} className="">
        <Input
          name="name"
          style={{ marginTop: "16px" }}
          placeholder="Name"
          aria-invalid={!!errors.name}
          aria-describedby="name-error"
        />
        {errors.name && (
          <p id="name-error" style={{ color: "red" }}>
            {errors.name}
          </p>
        )}
        <Input
          name="email"
          style={{ marginTop: "16px" }}
          placeholder="Email"
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />
        {errors.email && (
          <p id="email-error" style={{ color: "red" }}>
            {errors.email}
          </p>
        )}
        <Input
          name="github"
          style={{ marginTop: "16px" }}
          placeholder="Github"
          aria-invalid={!!errors.github}
          aria-describedby="github-error"
        />
        {errors.github && (
          <p id="github-error" style={{ color: "red" }}>
            {errors.github}
          </p>
        )}
        <div>
          <Button type="submit" style={{ marginTop: "16px" }}>
            Create user
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateNewUser;
