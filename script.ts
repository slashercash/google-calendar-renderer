const eventsUrl = new URL(`https://content.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`)

function fetchEvents(): void {
  eventsUrl.search = new URLSearchParams({
    key: API_KEY,
    timeMin: new Date(2024, 1, 12).toISOString(),
    timeMax: new Date(2024, 1, 20).toISOString()
  }).toString()

  fetch(eventsUrl)
    .then((res): Promise<EventsResponse> => res.json())
    .then((res) => console.log(res.items.map((item) => item.summary)))
}
