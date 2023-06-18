import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AddUser() {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState(false);

  const submitFrom = async (e) => {
    e.preventDefault();
    const input = fname || lname || email || avatar === "";
    const inputs = fname && lname && email && avatar !== "";
    if (input) {
      setError(true);
    }
    if (inputs) {
      await axios
        .post("https://www.melivecode.com/api/users/create", {
          fname: fname,
          lname: lname,
          username: `${fname}.${lname}@melivecode.com`,
          email: email,
          password: "1234",
          avatar: URL.createObjectURL(avatar),
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => console.log(err));
      setFname("");
      setLname("");
      setEmail("");
      setAvatar("");
    }
  };
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div style={{ width: "30rem" }}>
        <h1 className="text-center fw-bold text-info">AddUser</h1>
        <Form onSubmit={submitFrom}>
          <Form.Group className="mb-3">
            <Form.Label className="text-info">FirstName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your FirstName"
              onChange={(e) => setFname(e.target.value)}
              value={fname}
            />
            {error && fname.length <= 0 ? (
              <Form.Text className="text-danger">
                Please use your first name
              </Form.Text>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-info">LastName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your LastName"
              onChange={(e) => setLname(e.target.value)}
              value={lname}
            />
            {error && lname.length <= 0 ? (
              <Form.Text className="text-danger">
                Please use your last name
              </Form.Text>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-info">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {error && email.length <= 0 ? (
              <Form.Text className="text-danger">
                Please use your email
              </Form.Text>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-info">Avatar</Form.Label>
            <Form.Control
              type="file"
              placeholder="Enter your avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            {error && avatar.length <= 0 ? (
              <Form.Text className="text-danger">
                Please use your avatar
              </Form.Text>
            ) : (
              ""
            )}
          </Form.Group>
          <Button type="submit" variant="primary" size="md" className="w-100">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
