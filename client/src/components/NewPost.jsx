import { useState } from "react";
import { makePost } from "../../../../Coursework/2306-GHP-ET-WEB-FT-SF/2306-GHP-ET-WEB-FT-SF/Unit-04/PokemonApp-Unit4/PokemonApp-Unit4/client/src/API/ajax-helpers";
import { useSelector } from "react-redux";

export default function NewPostForm() {
  const token = useSelector((state) => state.auth.token);
  const [pokename, setPokename] = useState("");
  const [national_num, setNational_num] = useState("");
  const [poketype1, setPoketype1] = useState("");
  const [pokespecies, setPokespecies] = useState("");
  const [sign_ability, setSign_ability] = useState("");
  console.log("pokename: ", pokename);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the data from state
    console.log({
      national_num,
      pokename,
      poketype1,
      pokespecies,
      sign_ability,
    });
    await makePost(
      national_num,
      pokename,
      poketype1,
      pokespecies,
      sign_ability
    );
    resetForm();
    setSubmitted(true);
  }

  function resetForm() {
    setNational_num("");
    setPokename("");
    setPoketype1("");
    setPokespecies("");
    setSign_ability("");
  }
  return (
    <>
      {submitted && (
        <h1 className="new-post-thanks">
          Your post has been added - Thank you!
        </h1>
      )}
      <form className="new-post-form" onSubmit={handleSubmit}>
        <h3 className="new-post-title">Add A Pokémon Here! </h3>
        <label>
          Pokémon National Number:{" "}
          <input
            value={national_num}
            onChange={(e) => {
              setNational_num(e.target.value);
            }}
          />
        </label>
        <hr />

        <label>
          Pokémon Name:{" "}
          <label>
            <input
              value={pokename}
              onChange={(e) => {
                setPokename(e.target.value);
              }}
            />
          </label>
        </label>
        <hr />
        <label>
          Pokémon Type:{" "}
          <label>
            <input
              value={poketype1}
              onChange={(e) => {
                setPoketype1(e.target.value);
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
        </div>
        <div>
          <button className="submit" type="submit">
            Submit form
          </button>
        </div>
      </form>
    </>
  );
}
