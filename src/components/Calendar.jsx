import React, { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "../assets/event-utils.js";
import "../Calendar.css";
import Logo from "./Logo.jsx";
import {
  deleteEvent,
  fetchEvents,
  createEvent,
  updateEvent,
} from "../api/Events";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setEvents(await fetchEvents());
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    }
    fetchData();
  }, []);

  function handleDateSelect(selectInfo) {
    let title = prompt("Please enter a new title for your event");
    if (title === null) {
      window.location.reload();
      return;
    }
    let color = prompt("Please enter a colour for your event");
    if (color === null) {
      window.location.reload();
      return;
    }
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
      color,
      textColor: color == "white" ? "black" : "white",
    });
  }

  function handleEventClick(clickInfo) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  return (
    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
      <div className="calendar-app-header">
        <Logo />
        <div className="calendar-people">
          <span className="person linked-up">Linked Up</span>
          <span className="person" style={{ backgroundColor: "#1DADA5" }}>
            Charlie Cryer
          </span>
          <span className="person" style={{ backgroundColor: "#D46424" }}>
            Jabez Mateo
          </span>
          <span className="person" style={{ backgroundColor: "#C32427" }}>
            Peter Huang
          </span>
          <span className="person" style={{ backgroundColor: "#8629C4" }}>
            Leo Wang
          </span>
          <span className="person" style={{ backgroundColor: "#CEBE14" }}>
            Hazel Tran
          </span>
        </div>
      </div>
      <div className="calendar-app">
        <div className="calendar-app-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="timeGridWeek"
            editable={true}
            height={"80vh"}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            events={events} // can use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventAdd={async function (eventInfo) {
              const plainObject = eventInfo.event.toPlainObject();
              await createEvent(plainObject);
            }}
            eventRemove={async function (eventInfo) {
              await deleteEvent(eventInfo.event.id);
            }}
            eventChange={async function (eventInfo) {
              await updateEvent(
                eventInfo.event.id,
                eventInfo.event.toPlainObject()
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.event.title} </b>
      {eventInfo.timeText}
    </>
  );
}

export default Calendar;
