const eventsUrl = new URL(`https://content.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`)

const spanMonth = document.getElementById('month') as HTMLSpanElement
const spanTimeMin = document.getElementById('time-min') as HTMLSpanElement
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']

const now = new Date(Date.now())
const selectedMonth = new Date(now.getFullYear(), now.getMonth())
switchMonth(0)

function switchMonth(i: number) {
  selectedMonth.setMonth(selectedMonth.getMonth() + i)
  spanMonth.innerText = selectedMonth.getFullYear() + ' ' + months[selectedMonth.getMonth()]
  spanTimeMin.innerText = selectedMonth.toISOString()
}

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
