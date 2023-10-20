import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

const Homepage = (props) => {
  return (
    <Fragment>
      <Head>
        <title> React meetups </title>
        <meta
          name="description"
          content="Browse a huge list of highly active meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://cosovicnenad14:arsenal95@cluster0.0rzttmk.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((item) => ({
        title: item.title,
        address: item.address,
        image: item.image,
        description: item.description,
        id: item._id.toString(),
      })),
    },
    revalidate: 1,
  };
};
export default Homepage;
