export async function fetchEvents() {
  try {
    const result = await fetch("http://localhost:5173/api/events");
    return result.json();
  } catch (err) {
    console.log(err);
  }
}
export async function createEvent(eventData) {
  try {
    const result = await fetch("http://localhost:5173/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    return await result.json();
  } catch (err) {
    console.log(err);
  }
}
export async function deleteEvent(id) {
  try {
    const result = await fetch(`http://localhost:5173/api/events/${id}`, {
      method: "DELETE",
    });
    if ((result.status = 404)) {
      console.log(`Event to be deleted with id=${id} not found`);
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function updateEvent(id, updates) {
  try {
    const result = await fetch(`http://localhost:5173/api/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (!result.ok) {
      console.log(`Failed to update event with id=${id}`);
      return null;
    }

    return await result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
