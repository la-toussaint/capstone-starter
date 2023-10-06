import removeBg from "remove-bg";
import {
  getAllSneaks_data,
  updateSneaks_dataById,
} from "../../../server/db/helpers/sneaks_data";

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
export const fetchProfile =
  (token) => async (dispatch, setCustomer_Profile) => {
    try {
      const response = await fetch(`http://localhost:3000/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: "JSON",
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const result = await response.json();
      dispatch(setProfile(result));
    } catch (error) {
      console.error(error);
    }
  };

export const removeProduct_from_profile = async (token, sneaks_data_id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/sneaks_data`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: "JSON",
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default function RenderSelectedProfile(
  closet_customer_id,
  allClosets_customer_id,
  token
) {
  const fetchSingleCustomer = async (customer_id, token) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/customers/customer_id`,
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
    return selectedCustomers;
  };
  const customersCard = document.createCard("div");
  customersCard.classList.add("user");
  customersCard.innerHTML = `
	<h4>${customers.name}</h4>
	<p>${customers.customer_id}</p>
	<p>${customers.username}</p>
	<p>${customers.password}</p>
	<p>${customers.fav_brand}</p>
	<p>${customers.token}</p>
	<p>${customers.closets}</p>`;
  customersContainer.appendChild(usersCard);

  const [customers, setCustomers] = useState({});
  useEffect(() => {
    async function fetchSelectedCustomers(token) {
      try {
        const response = await fetch(`http://localhost:3000/test`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: "JSON",
        });
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
        <b>Posts: </b>
        {customers.post}
      </p>
    </div>
  );
}

export async function pickCloset(
  closet_background,
  closet_temp,
  closet_theme,
  closet_mirror,
  closet_movie,
  closet_music
) {
  try {
    const response = await fetch(`http://localhost:3000/api/closets_data`, {
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

export async function makePost(
  product_title,
  product_price,
  product_url,
  product_photo
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

export const removeBackground = async (product_photo, sneaks_data_id) => {
  if (!product_photo || !sneaks_data_id) {
    return null;
  }
  try {
    const customerSearch = await fetch(
      `https://real-time-amazon-data.p.rapidapi.com/search`
    );
    const remBg = require("rembg-node");
    const input = product_photo(imageUrl.png - o);
    const output = await remBg.input(imageUrl.png - b);
    const removedBackground = sneaksData.product_photo;
    const updatedSneaksData = await updateSneaks_dataById(
      sneaks_data_id,
      product_photo
    );

    return updatedSneaksData;
  } catch (error) {
    throw error;
  }
};
