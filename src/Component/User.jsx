import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import Swal from "sweetalert2";
export default function User() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    getUser();
  }, []);
  const getUser = async () => {
    await axios.get("https://www.melivecode.com/api/users").then((rep) => {
      setData(rep.data);
    });
  };
  const delUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Delete this user already.", "success");
        let headersList = {
          Accept: "*/*",
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          "Content-Type": "application/json",
        };

        let bodyContent = JSON.stringify({
          id: id,
        });

        let reqOptions = {
          url: "https://www.melivecode.com/api/users/delete",
          method: "DELETE",
          headers: headersList,
          data: bodyContent,
        };

        await axios.request(reqOptions);
        getUser();
      }
    });
  };
  const editUser = (id) => (window.location.href = `/editUser/${id}`);
  return (
    <div>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <HashLoader color={"#05BFDB"} loading={loading} size={100} />
        </div>
      ) : (
        <Container className="my-5">
          <Link to={"/addUser"}>
            <Button className="mb-4">AddUser</Button>
          </Link>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Username</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((elm, index) => {
                return (
                  <tr key={elm.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={elm.avatar} height={"50px"} width={"50px"} style={{borderRadius:"50%"}} alt={elm.avatar} />
                    </td>
                    <td>{elm.username}</td>
                    <td>{elm.fname}</td>
                    <td>{elm.lname}</td>
                    <td>
                      <ButtonGroup aria-label="Basic example">
                        <Button
                          variant="secondary"
                          className="btn-success"
                          onClick={() => editUser(elm.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="secondary"
                          className="btn-warning"
                          onClick={() => delUser(elm.id)}
                        >
                          DEL
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      )}
    </div>
  );
}
