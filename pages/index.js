import Head from "next/head";
import Link from "next/link";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/eventList";
import NewsletterRegistration from "./../components/input/newsletter-registration";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta name="description" content="Many Fun Events" />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800, /// regenerated about half an hour
  };
}

export default HomePage;
