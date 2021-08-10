import { Fragment } from "react";
import { useRouter } from "next/dist/client/router";
import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/eventList";
import EventsSearch from "../../components/events/events-search";

function AllEventsPage() {
  const router = useRouter();
  const events = getAllEvents();

  const findEventsHandler = (year, month) => {
    const fullPath = `/event/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default AllEventsPage;
