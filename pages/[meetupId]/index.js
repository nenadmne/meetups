import Head from "next/head";
import { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
import MeetUpDetail from "../../components/meetups/MeetUpDetail";

const MeetupIdPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title> {props.data.title}</title>
        <meta name="description" content={props.data.description} />
      </Head>
      <MeetUpDetail meetupData={props.data} />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://cosovicnenad14:arsenal95@cluster0.0rzttmk.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();
  const paths = meetups.map((item) => ({
    params: { meetupId: item._id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://cosovicnenad14:arsenal95@cluster0.0rzttmk.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const selectedMeetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();
  return {
    props: {
      data: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
      },
    },
  };
};
export default MeetupIdPage;
