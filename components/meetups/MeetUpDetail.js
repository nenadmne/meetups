import classes from "./MeetUpDetail.module.css";

const MeetUpDetail = ({ meetupData }) => {
  return (
    <section className={classes.detail}>
      <img src={meetupData.image} alt={meetupData.title} />
      <h2>{meetupData.title}</h2>
      <p>{meetupData.description}</p>
      <address>{meetupData.address}</address>
    </section>
  );
};
export default MeetUpDetail;
