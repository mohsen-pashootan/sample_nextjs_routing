import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/eventList";
import EventsSearch from "../../components/events/events-search";

function AllEventsPage({ events }) {
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Many Fun Events" />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 60, /// regenerated about half an hour
  };
}

export default AllEventsPage;
