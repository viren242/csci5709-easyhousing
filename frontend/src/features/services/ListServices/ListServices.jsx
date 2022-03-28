import React, { useState, useEffect } from "react";

import Axios from "axios";
import ServiceCard from "./ServiceCard/ServiceCard";
import { HiOutlinePlusCircle } from "react-icons/hi";

import "./ListServices.css";

const ListServices = () => {
  const [services, setServices] = useState([]);

  const fetchServices = () => {
    Axios.get("http://localhost:8080/services")
      .then((response) => {
        if (response.status === 200) {
          setServices(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  // fetch all services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const renderServiceList = services.map((service) => {
    return <ServiceCard
      key={service.id}
      id={service.id}
      title={service.title}
      description={service.description}
      img={`http://localhost:8080/image/${service.image}`}
      price={service.price}
      email={service.email}
      location={service.location}
    />
  })

  return (
    <div className="services-list">
      {renderServiceList}
      <a
        href="/services/create"
        className="services-list__add-service"
      >
        <HiOutlinePlusCircle />
      </a>
    </div>
  )
};

export default ListServices;
