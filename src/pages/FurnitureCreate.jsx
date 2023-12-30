import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const FurnitureCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});
  const [furniture, setFurnitures] = useState({
    name: "",
    productCode: "",
    avatar: "",
    price: "",
  });

  const handleInput = (e) => {
    e.persist();
    setFurnitures({ ...furniture, [e.target.name]: e.target.value });
  };

  const saveFurniture = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: furniture.name,
      avatar: furniture.avatar,
      price: furniture.price,
      productCode: furniture.productCode,
    };
    axios
      .post(`http://127.0.0.1:8000/api/furnitures`, data)
      .then((res) => {
        alert(res.data.message);
        navigate("/furnitures");
        setLoading(false);
      })
      .catch(function (error) {
        if (error.response.status === 422) {
          setInputErrorList(error.response.data.error);
          setLoading(false);
        }
        if (error.response.status === 500) {
          alert(error.response.data);
          setLoading(false);
        }
      });
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className=" card">
              <div className="card-header">
                <h4>
                  Add Furniture
                  <Link to="/furnitures" className="btn btn-danger float-end">
                    Back
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={saveFurniture}>
                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">{inputErrorList.name}</span>
                  </div>
                  <div className="mb-3">
                    <label>Product Code</label>
                    <input
                      type="text"
                      name="productCode"
                      value={furniture.productCode}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {inputErrorList.productCode}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label>Price</label>
                    <input
                      type="number"
                      name="price"
                      value={furniture.price}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">{inputErrorList.price}</span>
                  </div>
                  <div className="mb-3">
                    <label>Avatar</label>
                    <input
                      type="text"
                      name="avatar"
                      value={furniture.avatar}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">{inputErrorList.avatar}</span>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Save Student
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurnitureCreate;
