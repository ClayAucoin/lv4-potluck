import { useState } from "react";
import PotluckMeals from "./components/PotluckMeals";
import PotluckBeverages from "./components/PotluckBeverages";
import PotluckUtensils from "./components/PotluckUtensils";
import GuestList from "./components/GuestList";
import supabase from "./utils/supabase";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("guest-list");
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);

  function goToMeals() {
    setCurrentPage("meals");
  }

  function goToBeverages() {
    setCurrentPage("beverages");
  }

  function goToGuests() {
    setCurrentPage("guest-list");
  }

  function goToUtensils() {
    setCurrentPage("utensils");
  }

  let pageContent;

  if (currentPage === "guest-list") {
    pageContent = <GuestList />;
  }

  if (currentPage === "meals") {
    pageContent = <PotluckMeals />;
  }

  if (currentPage === "beverages") {
    pageContent = <PotluckBeverages />;
  }

  if (currentPage === "utensils") {
    pageContent = <PotluckUtensils />;
  }

  async function handleLogin(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.email.value;
    console.log(email, password);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: "example@email.com",
      password: "example-password",
    });

    if (data.user) {
      setUser(data.user);
    }

    if (error) {
      console.log(error);
      alert(error);
    }
  }

  const loginForm = (
    <div>
      <h3>Login</h3>
      <form action="">
        <label htmlfor="">Email</label>
        <input type="email" name="email" id="email"></input>
        <label htmlfor="">Password</label>
        <input type="password" name="password" id="passowrd"></input>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );

  return (
    <>
      <div className="container m-4">
        <div className="card p-2" style={{ width: "600px" }}>
          <div className="card-body">
            <div className="d-flex justify-content-around">
              <button className="btn btn-primary" onClick={goToGuests}>
                Guest List
              </button>
              <button className="btn btn-primary" onClick={goToMeals}>
                Check Meals
              </button>
              <button className="btn btn-primary" onClick={goToBeverages}>
                Check Beverages
              </button>
              <button className="btn btn-primary" onClick={goToUtensils}>
                Check Utensils
              </button>
            </div>
            {loginForm}
          </div>
        </div>
      </div>
      {pageContent}
      {/* {user.email} */}
    </>
  );
}

export default App;
