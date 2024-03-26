import {useEffect, useState } from "react";
import RestaurantCard from "./RestrauntCard";
// import restaurantList from "./RestrauntList";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnline from "../Utils/useOnline"

function filterData(searchText, restaurants) {
  const filterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return filterData;
}

// Body Component for body section: It contain all restaurant cards
// We are mapping restaurantList array and passing JSON data to RestaurantCard component as props with unique key as index
const Body = () => {
  // useState: To create a state variable, searchText is local state variable
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilterdRestaurants] = useState([]);
  const [allRestaurant, setAllRestaurant] = useState([]);
  useEffect(() => {
    getRestraunts();
  }, []);
  async function getRestraunts() {
    const data = await fetch(
      "https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.7195687&lng=75.8577258&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING", {
  headers: {
    'x-cors-api-key': 'temp_a60d405c4611c1e2df4b858c1fdfa35a',
  }
}
    );
    const json = await data.json();
    
    setAllRestaurant(
      json.data?.cards[4].card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilterdRestaurants(json.data?.cards[4].card?.card?.gridElements?.infoWithStyle?.restaurants
    );
   
  }

  const isOnline = useOnline();
  if (!isOnline) {
    return <h1>Offline check your internet connection !!</h1>
  }

if (!allRestaurant) return null;
  return allRestaurant.length === 0 ? ( <Shimmer/>)
    : 
    (
    <>
      <div className="search-container p-5 bg-slate-100 my-5">
        <input
          type="text"
          className="search-input border border-solid w-56 border-black"
          placeholder="Search a restaurant you want..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button
          className="search-btn px-5 py-1 mx-5 my-5 bg-black text-white hover:bg-white hover:text-black"
          onClick={() => {
            // filter the data
            const data = filterData(searchText, allRestaurant);
            // update the state of restaurants list
            setFilterdRestaurants(data);
          }}
        >
          Search 
        </button>
      </div>
      <div className="restaurant-list flex flex-wrap ">
          {filteredRestaurants.map((restaurants) => {
            return (
              <Link to={"/restaurant/" + restaurants.info.id} key={restaurants.info.id}>
                <RestaurantCard  {...restaurants.info} />
              </Link>
            );
        })}
      </div>
      </>
      )
};

export default Body;
