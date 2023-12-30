import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const FurnitureList = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [furnitures, setFurnitures] = useState([]);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/furnitures`).then((res) => {
      console.log(res);
      setFurnitures(res.data.furnitures);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }
  var furnitureDetails = "";
  furnitureDetails = furnitures
    .filter((item) => {
      return search.toLowerCase() === ""
        ? item
        : item.name.toLowerCase().includes(search);
    })
    .map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.productCode}</td>
          <td>{item.avatar}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>
            <Link to="/" className="btn btn-success">
              Edit
            </Link>
          </td>
          <td>
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
      );
    });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className=" card">
              <div className="card-header">
                <h4>
                  Furniture List
                  <Link
                    to="/furnitures/create"
                    className="btn btn-primary float-end"
                  >
                    Add Furniture
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-control"
                  placeholder="Seach Furniture"
                />
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Product Code</th>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>{furnitureDetails}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FurnitureList;
