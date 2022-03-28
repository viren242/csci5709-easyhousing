import React from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

import ServiceForm from "../../features/services/ServiceForm/ServiceForm";
import Navbar from "../NavigationBar/Navbar";
import Footer from "../../features/ui/Footer/Footer";

const EditService = () => {
  // get the value of :id from route
  const params = useParams();

  // state
  const [editFormDefaultValues, setEditFormDefaultValues] = React.useState({
    title: "",
    description: "",
    location: "",
    email: "",
    price: ""
  });
  const [savedImageName, setSavedImageName] = React.useState("");
  const [serviceLoading, setServiceLoading] = React.useState(true);

  // get service details on mount
  React.useEffect(() => {
    Axios.get(`http://localhost:8080/services/${params.id}`)
      .then((response) => {
        const newDefaultValues = {
          title: response.data.title,
          description: response.data.description,
          location: response.data.location,
          email: response.data.email,
          price: response.data.price
        }

        setEditFormDefaultValues(newDefaultValues);
        setSavedImageName(response.data.image);
        setServiceLoading(false);
      })
      .catch((error) => console.error(error));
  }, [params]);

  if (serviceLoading) {
    return (
      <>
        <Navbar />
        <div className="wrapper">
          <p style={{
            textAlign: "center"
          }}>Loading...</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <ServiceForm
          mode="edit"
          serviceId={params.id}
          defaultFormFieldsState={editFormDefaultValues}
          savedImageName={savedImageName}
        />
      </div>
      <Footer />
    </>
  )
};

export default EditService;