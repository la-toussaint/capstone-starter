import { RemoveBackground } from "remove-bg-node";

export const testAuth = async (token) => {
  try {
    const response = await fetch(`http://localhost:3000/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: "JSON",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    // Handle non-OK response status here (e.g., show an error message
  }
};

export const login = async (username, password) => {
  try {
    const response = await fetch(`http://localhost:3000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customers: {
          username,
          password,
        },
      }),
    });

    const result = await response.json();
    console.log("login", result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const registerCustomers = async (
  username,
  password,
  name,
  fav_brand
) => {
  try {
    const response = await fetch(`http://localhost:3000/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customers: {
          username,
          password,
          name,
          fav_brand,
        },
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    setError(`Authentication failed with status ${response.status}`);
    // Handle non-OK response status here (e.g., show an error message
  }
};
export const fetchAllCustomers = async () => {
  try {
    // write a fetch request for:
    // https://fsa-puppy-bowl.herokuapp.com/api/customers
    const response = await fetch(`http://localhost:3000/api/customers`);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }

  // update CustomerList with the results
};

//fetch_Profile sends token, returns user: {name, username, token, fav_brand}

export const fetchProfile = async (token) => {
  try {
    const response = await fetch(`http://localhost:3000/api/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

// export const addToCloset = async (token, username) => {
//   try {
//     const response = await fetch(
//       `http://localhost:3000/api/closet_sneaks_data`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: "JSON",
//       }
//     );
//     const result = await response.json();
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// };

export default function RenderSelectedProfile(customer_id, token) {
  const fetchSingleCustomer = async (customer_id, token) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/me/customer_id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: "JSON",
        }
      );
      const selectedCustomers = await response.json();
    } catch (error) {
      console.error(error);
    }
    return SingleProfile;
  };
  const customersCard = document.createCard("div");
  customersCard.classList.add("customers");
  customersCard.innerHTML = `
	<h4>${customers.name}</h4>
	<p>${customers.customer_id}</p>
	<p>${customers.username}</p>
	<p>${customers.password}</p>
	<p>${customers.fav_brand}</p>
	<p>${customers.token}</p>
	<p>${customers.sneaks_data_id}</p>`;
  (<p>${customers.costumes_data_id}</p>)`;
	<p>${customers.closet_id}</p>`;
  customersContainer.appendChild(usersCard);

  const [customers, setCustomers] = useState({});
  useEffect(() => {
    async function fetchSelectedCustomers(token) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/auth/me/customers`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: "JSON",
          }
        );
      } catch (error) {
        console.error(error);
      }
      fetchSelectedCustomers();
    }
  });

  return (
    <div>
      <p>
        <b>Name: </b>
        {customers.name}
      </p>
      <p>
        <b>Username: </b>
        {customers.username}
      </p>
      <p>
        <b>Favorite Brand: </b>
        {customers.fav_brand}
      </p>
      <p>
        <b>Closet: </b>
        {customers.closet_id ? closetSneaks_data_id : closetCostumes_data_id}
      </p>
      <p>
        <b>Closet: </b>
        {customers.closet_id ? closetCostumes_data_id : closetSneaks_data_id}
      </p>
    </div>
  );
}

export async function SingleProfile(username) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/auth/me/customers/sneaks_data`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: "JSON",
      }
    );
  } catch (error) {
    console.error(error);
  }
  return closet;
}

export async function makeContact(
	lastname,
	firstname,
	username,
	email,
	fav_brand,
   query,
   no_account
) {
  try {
    const response = await fetch(`http://localhost:3000/api/sneaks_data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: { product_title, product_price, product_url, product_photo },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const fetchAllSneaks_data = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/sneaks_data`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllCostumes_data = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/costumes_data`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const sneaksPhotoBackground = async (sneaks_data_id, fields) => {
  if (!product_photo || !sneaks_data_id) {
    return null;
  }
  try {
    const customerSearch = await fetch(
      `https://real-time-amazon-data.p.rapidapi.com/search`
    );
    let rm = new RemoveBackground();
    const input = product_photo.rm;
    const output = await removedBackground.input;
    const removedBackground = sneaksData.product_photo;
    const result = updatedSneaksData;

    return updatedSneaksData;
  } catch (error) {
    throw error;
  }
};

export const costumesPhotoBackground = async (sneaks_data_id, fields) => {
  if (!product_photo || !sneaks_data_id) {
    return null;
  }
  try {
    const customerSearch = await fetch(
      `https://real-time-amazon-data.p.rapidapi.com/search`
    );
    let rm = new RemoveBackground();
    const input = product_photo.rm;
    const output = await removedBackground.input;
    const removedBackground = costumesData.product_photo;
    const result = updatedCostumesData;

    return updatedCostumesData;
  } catch (error) {
    throw error;
  }
};

export const addClosetSneaks_data = async (
  closetSneaks_data,
  closet_id,
  sneaks_data_id,
  sneaks_data,
  product_title,
  product_price,
  product_url,
  product_photo
) => {
  try {
    const addSneaks_dataToCloset = await addClosetSneaks_data(
      `http://localhost:3000/api/closetSneaks_data/:closetSneaks_data_id`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          closetSneaks_data,
          sneaks_data_id,
          sneaks_data: {
            product_title,
            product_price,
            product_url,
            product_photo,
          },
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const deleteClosetSneaks_data = async (
  closet_id,
  closetSneaks_data_id,
  sneaks_data_id
) => {
  try {
    const closetSneaks_data_id = await axios.patch(
      `http://localhost:3000/api/closetSneaks_data`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          closetSneaks_data_id: {
            closet_id,
            sneaks_data_id,
          },
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const addClosetCostumes_data = async (
  closetCostumes_data,
  closet_id,
  costumes_data_id,
  costumes_data,
  product_title,
  product_price,
  product_url,
  product_photo
) => {
  try {
    const addCostumes_dataToCloset = await addClosetCostumes_data(
      `http://localhost:3000/api/closetCostumes_data/:closetCostumes_data_id`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          closetCostumes_data,
          costumes_data_id,
          costumes_data: {
            product_title,
            product_price,
            product_url,
            product_photo,
          },
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const deleteClosetCostumes_data = async (
  closet_id,
  closetCostumes_data_id,
  costumes_data_id
) => {
  try {
    const closetCostumes_data_id = await axios.patch(
      `http://localhost:3000/api/closetCostumes_data`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          closetCostumes_data_id: {
            closet_id,
            costumes_data_id,
          },
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
