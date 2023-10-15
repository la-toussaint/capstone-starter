import { useState } from "react";
import { makePost } from "../API/ajax-helpers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { makeContact } from "./API/ajax-helpers"

function ContactForm() {
const [lastname, setLastname]= useState("");
const [firstname, setFirstname]= useState("");
const [username, setUsername]= useState("");
const [email, setEmail]= useState("");
const [fav_brand, setFav_brand]= useState("");
const [query, setQuery] = useState("");
const [account, setAccount] = useState("");  
const token = useSelector((state) => state.auth.token);
const [submitted, setSubmitted] = useState(false);
const [radio, setRadio] = useState(false;)
const nav = useNavigate(); 


async function handleSubmit(e) {
	e.preventDefault();
	try {
    const submit = await sendContact(
      lastname,
	  firstname,
      username,
      email,
      fav_brand,
     query,
	 account
    );
	
    
	if (!Boolean(account?.error)) {
		dispatch(setToken(register.token));
		dispatch(setProfile(register.users));
		setUsername(username);
		setPassword(password);
		setMessage(
		  message.type, "success",
		  message.text, "Success! You have been registered. Thank you for signing up.",
		);
		nav("/new-post-form");
		return;
	  }
	registerCustomers(firstname, lastname, username, password, fav_brand)
	  resetForm();
    setSubmitted(true);
  }

  function registerCustomers () 
  
 
 function resetForm {
	setLastname{""};
	setFirstname{""};
	setUsername{""};
	setEmail{""};
	setFav_brand{""};
   setQuery{""};
   setAccount{
  }
  
  return (      
	
	
	{submitted} && <h1>Thank you for taking time to contact us! We appreciate it.</h1>
      <form className="new-post-form" onSubmit={handleSubmit}>
        <h3 className="new-post-title">Stay in touch! Please sign up for our mailing list for FreshFinds for ClosetShoppers, or use this form to ask a question or leave a comment.</h3>
        <label>
          Last Name:{" "}
          <input
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
        </label>
        <hr />
        <label>
          First Name:{" "}
          <label>
            <input
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
          </label>
        <hr />
        <label>
          Email:{" "}
          <label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
        </label>
        <hr />
        <label>
          Pokémon Species:{" "}
          <input
            value={pokespecies}
            onChange={(e) => {
              setPokespecies(e.target.value);
            }}
          />
        </label>
        <hr />
        <div>
          <label>
            Pokémon Signature Ability:{" "}
            <input
              value={sign_ability}
              onChange={(e) => {
                setSign_ability(e.target.value);
              }}
            />
          </label>
        </div>
        <hr />
        <div>
          <button className="reset" type="reset" onClick={resetForm}>
            Reset form
          </button>
		 
          <button className="submit" type="submit">
            Submit form
          </button>
	<button className="templates-click"><nav="/portfolio/templates-table"</button>">Portfolio</a></button>
	<button class="circle3" id="cv-butt"><a href="cv-index.html">Resume</a></button>
	nav("/posts");
</form>

)};

export ContactForm