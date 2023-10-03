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
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const registerCustomers = async (username, password, name, fav_brand) => {
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
export const fetchShopper_Profile = (token) => async (dispatch, setCustomer_Profile) => {
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

export const deleteCloset = async (token, closet_customer_id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/shoppers/closet_shopper_id`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: "JSON",
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default function RenderSelectedProfile(closet_customer_id, allClosets_customer_id, token) {
  const fetchSingleCustomer = async (customer_id, token) => {
    try {
      const response = await fetch(`http://localhost:3000/api/shoppers/shopper_id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: "JSON",
      });
      const selectedCustomers = await response.json();
    } catch (error) {
      console.error(error);
    }
    return selectedCustomers;
  };
  const usersCard = document.createCard("div");
  usersCard.classList.add("user");
  usersCard.innerHTML = `
	<h4>${customers.name}</h4>
	<p>${customers.user_id}</p>
	<p>${customers.username}</p>
	<p>${customers.password}</p>
	<p>${customers.fav_brand}</p>
	<p>${customers.token}</p>
	<p>${customers.posts}</p>`;
  usersContainer.appendChild(usersCard);

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

export async function makePost(

) {
  try {
    const response = await fetch(`http://localhost:3000/api/pokedata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
