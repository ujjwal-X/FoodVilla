const RestrauntCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  avgRatingString,
  sla
}) => {
  return (
    <>
      <div className="card w-[200px] p-2 m-5 shadow-lg bg-white ">
        <img className="rounded-xl"
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
            cloudinaryImageId
          }
          alt="img"
        />
        <h2 className="font-bold text-xl">{name}</h2>
        <h2 className="overflow-hidden">{cuisines.join(",")}</h2>
        <h2>{avgRatingString} Stars</h2>
        <h2>{sla.deliveryTime} minutes</h2>
        
      </div>
    </>
  );
};
export default RestrauntCard;
