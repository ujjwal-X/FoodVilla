import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import Shimmer from "./Shimmer";
import React from 'react';
import '../index.css'




const RestrauntMenu = () => {
    //how to read a dynamic URL params
    const {resId} = useParams();
    const [Restaurant, setRestaurant] = useState(null);
    const [Menu, setMenu] = useState(null);
    useEffect(() => {
        getRestaurantInfo();
    })
    async function getRestaurantInfo() {
        const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.7195687&lng=75.8577258&restaurantId="+resId+"&catalog_qa=undefined&submitAction=ENTER");
        const json = await data.json();
        
        setRestaurant(json?.data?.cards[0].card.card.info)
       
        setMenu(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card)
        
    }
    if (!Restaurant && !Menu) {
        return<Shimmer/>
    }
    return (
        <div class="menu">
            <div>
            <h1>Restaurant id :{resId}</h1>
            <h2>{Restaurant.name}</h2>
            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + Restaurant.cloudinaryImageId} alt="img" />
            <h3>{Restaurant.area}</h3>
            <h3>{Restaurant.city}</h3>
            <h3>{Restaurant.avgRating}</h3>
            <h3>{ Restaurant.costForTwoMessage}</h3>
            </div>
            <div>
                <ul>
                    <h1>Menu</h1>
                    {Menu?.itemCards?.map(
                        (card) => <li key={card.card.info.id}>
                            {card.card.info.name}
                        </li>)}
                </ul>
            </div>
        </div>
    )
}
export default RestrauntMenu;