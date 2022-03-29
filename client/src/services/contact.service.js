import axios from "axios";


const emailUrl = "/api/contact";


export const contactEmail = (firstName, lastName, email, subject, message ) => {
    return axios
      .post(emailUrl, { firstName, lastName, email, subject, message})
      .then((response) => response.data)
      .catch((error) => {
        throw error.response.data;
      });
  };