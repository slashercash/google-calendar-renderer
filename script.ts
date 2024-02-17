const eventsUrl = new URL(`https://content.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`)

const spanMonth = document.getElementById('month') as HTMLSpanElement
const spanTimeMin = document.getElementById('time-min') as HTMLSpanElement
const spanTimeMax = document.getElementById('time-max') as HTMLSpanElement
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
const ONE_DAY = 86400000

const now = new Date(Date.now())
const selectedMonth = new Date(now.getFullYear(), now.getMonth())
let timeMin: Date
let timeMax: Date
switchMonth(0)

function switchMonth(i: number) {
  selectedMonth.setMonth(selectedMonth.getMonth() + i)

  timeMin = new Date(selectedMonth.getTime())
  let day = timeMin.getDay()
  while (day !== 1) {
    timeMin.setDate(timeMin.getDate() - 1)
    day = timeMin.getDay()
  }
  timeMax = new Date(timeMin.getTime() + ONE_DAY * 35)

  spanMonth.innerText = selectedMonth.getFullYear() + ' ' + months[selectedMonth.getMonth()]
  spanTimeMin.innerText = timeMin.toISOString()
  spanTimeMax.innerText = timeMax.toISOString()
}

function fetchEvents(): void {
  eventsUrl.search = new URLSearchParams({
    key: API_KEY,
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString()
  }).toString()

  fetch(eventsUrl)
    .then((res): Promise<EventsResponse> => res.json())
    .then((res) => console.log(res.items.map((item) => item.summary)))
}
