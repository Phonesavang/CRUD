import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams,Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const submitFrom = async (e) => {
    e.preventDefault();
    await axios
      .put("https://www.melivecode.com/api/users/update", {
        id,
        fname,
        lname,
        email,
        avatar:URL.createObjectURL(avatar),
      })
      .catch((err) => console.log(err));
    navigate("/")
  };
  useEffect(() => {
    axios
      .get(`https://www.melivecode.com/api/users/${id}`)
      .then((rep) => {
        setFname(rep.data["user"]["fname"]);
        setLname(rep.data["user"]["lname"]);
        setEmail(rep.data["user"]["email"]);
        setAvatar(rep.data["user"]["avatar"]);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div style={{ width: "30rem" }}>
        <h1 className="text-center fw-bold text-info">EditUser</h1>
        <Form onSubmit={submitFrom}>
          <Form.Group className="mb-3">
            <Form.Label className="text-info">FirstName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your FirstName"
              onChange={(e) => setFname(e.target.value)}
              value={fname}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-info">LastName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your LastName"
              onChange={(e) => setLname(e.target.value)}
              value={lname}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-info">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-info">Avatar</Form.Label>
            <Form.Control
              type="file"
              placeholder="Enter your avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
              // value={''}
            />
          </Form.Group>
          <Button type="submit" variant="primary" size="md" className="w-100">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
