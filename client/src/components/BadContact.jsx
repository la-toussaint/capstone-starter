import { useState } from "react";
import { submitForm } from "../API/ajax-helpers";
import { dispatch, useReducer, useSelector } from "react-redux";
import { makeContact } from "./API/ajax-helpers"
import { todoComplete, undoTodoComplete } from "./redux";

export default function ContactForm() {
const [lastname, setLastname]= useState("");
const [firstname, setFirstname]= useState("");
const [email, setEmail]= useState("");
const [fav_brand, setFav_brand]= useState("");
const [query, setQuery] = useState("");
const [submitted, setSubmitted] = useState(false);
const [todo, setTodoComplete] = useState(false);
const [undoTodo, setUndoTodoComplete] = useState(true);



const todoDispatch = () => {
	const [todos, dispatch] = React.useReducer(
	  authplusReducer,
	  initialTodos
	);
	const handleChange = todo => {
	  dispatch({
		type: todoComplete("checkbox") ? setTodoComplete(false) ("unchecked") : setTodoComplete(true) ("checked"),
		id: todo.id
	  });
	};
	
  
const handleSubmit = (e) => {
	e.preventDefault();

	await submitForm(lastname,firstname,email,fav_brand,query,todo);
	
	resetForm();
	setSubmitted(true);
	
  
	
	const resetForm = () => {
	setLastname(""),
	setFirstname(""),
	setEmail(""),
	setFav_brand(""),
   setQuery(""),
   setTodoComplete(false);
}
  
  return (      
	
	<div className="contact-us-background-container"> {submitted && 
	 <h1 className="contact-us-submitted-h1">Thank you for taking time to contact us! We appreciate it.</h1>}
      
	  <form className="contact-us-form" onSubmit={handleSubmit}>
       
		<h3 className="contact-us-h3">We always want to hear from you! Please provide ClosetShoppers staff with contact info via this secure form so we may send you tailored events and updates, and/or use the form anytime to ask questions/leave comments.</h3>
		<div>
	    <label>
          Last Name:
		  <label>         
			 <input
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
		  </label>
        </label>
        <hr />
        <label>
          First Name:
          <label>
            <input
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
          </label>
        </label>
		<hr />
        <label>
          Email:
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
		</div>
		<div>{todos.map(todo => (   
			<label> Do You Have a ClosetShopper login?
            <input key={todo.id}
              type="checkbox"
              checked={todoComplete}
              onChange={() => handleChange({dispatch.setTodoComplete(true)})}/>
            {todo.task}
			</label>
		))}
		  </div>
		  <hr />
        <div>
          <button className="reset" type="reset" onClick={resetForm}>
            Reset form
          </button>
		 
          <button className="submit" type="submit">
            Submit form
          </button>
	<button className="templates-click" path={"/"}>Home</button>
	<button class="shop-click" path={"/all-cards"}>Browse All Items</button>
	<button className="profile-click" path={"/profile"}>Your Profile Page </button>
	</div>
	;
</form>
</div>
)};
}}
