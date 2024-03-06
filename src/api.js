// import axios from "axios";
// const api = axios.create({
//   baseURL: "http://localhost:8080",
// });
const BASE_URL = "https://shmartaf-2ca3a4ef2667.herokuapp.com";

const get = async (url, id) => {
  return fetch(`${BASE_URL}/${url}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};

const getAll = async (url) => {
  return fetch(`${BASE_URL}/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};
const fetchNeeds = () => {
  return fetch(`${BASE_URL}/requirements?skip=0&limit=10`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const fetchSkills = () => {
  return fetch(`${BASE_URL}/certifications?skip=0&limit=10`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const addUser = (user) => {
  return fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const addParent = (parent) => {
  return fetch(`${BASE_URL}/parents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parent),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const addBabysitter = (babysitter) => {
  return fetch(`${BASE_URL}/babysitters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(babysitter),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const addChildren = (children) => {
  return fetch(`${BASE_URL}/children`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(children),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const SignUp = (formData) => {
  return fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const addFavoriteBabysitter = async (parentId, babysitterId) => {
  const url = `${BASE_URL}/parents/${parentId}/favorites`;
  const payload = {
    parentid: parentId,
    babysitterid: babysitterId,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // If the server response is not ok, throw an error
      throw new Error(
        "Failed to add favorite babysitter. Status: " + response.status,
      );
    }

    const data = await response.json(); // Assuming the server responds with JSON
    console.log("Favorite babysitter added successfully", data);
    return data; // Return the response data for further processing
  } catch (error) {
    console.error("Error adding favorite babysitter:", error);
    throw error; // Rethrow the error for caller to handle if needed
  }
};

const fetchParent = (id) => {
  return fetch(`${BASE_URL}/parents/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export {
  BASE_URL,
  fetchNeeds,
  fetchSkills,
  addUser,
  addParent,
  addBabysitter,
  addChildren,
  SignUp,
  get,
  addFavoriteBabysitter,
  fetchParent,
  getAll,
};
