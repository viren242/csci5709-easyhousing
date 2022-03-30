// Author: Pankti Vyas (B00886309)

import React from "react";

import { HiOutlinePencil, HiOutlineTrash, HiOutlineLocationMarker } from "react-icons/hi";
import Axios from "axios";

import "./ServiceCard.css";

const ServiceCard = ({ id, title, description, img, price, email, location }) => {

  const deleteService = async () => {
    try {
      const response = await Axios.delete(`https://easyhousingapi.herokuapp.com/services/${id}`);

      if (response.status === 200) {
        // redirect to /services
        window.location = "/services";
      }
    } catch (error) {
      console.error(error);
    }
  }

  const openEditServicePage = () => {
    window.location = `/services/edit/${id}`;
  }

  return (
    <div className="service-card">
        <div className="service-card-image">
          <img src={img} alt="service card" />
        </div>

        <div className="service-card-details">
          <div className="service-card-title">
            <h2>{title}</h2>

            <div className="service-card-details-icons">
              <button
                className="service-card-edit-button"
                onClick={openEditServicePage}
              >
                <HiOutlinePencil />
              </button>
              <button
                className="service-card-delete-button"
                onClick={deleteService}
              >
                <HiOutlineTrash />
              </button>
            </div>
          </div>

          <div className="service-card-location">
            <HiOutlineLocationMarker />

            <span>{location}</span>
          </div>

          <p className="service-card-description">
            {description}
          </p>

          <a
            href={`mailto:${email}`}
            className="service-card-email"
          >{email}</a>

          <p className="service-card-price">C${price}</p>
        </div>
      </div>
  )
}

export default ServiceCard;
