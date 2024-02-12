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

const spanMonth = document.getElementById('month') as HTMLSpanElement
const now = new Date(Date.now())

let selectedMonth = new Date(now.getFullYear(), now.getMonth())

const monthMap = new Map<number, string>([
  [0, 'Jan'],
  [1, 'Feb'],
  [2, 'Mar'],
  [3, 'Apr'],
  [4, 'Mai'],
  [5, 'Jun'],
  [6, 'Jul'],
  [7, 'Aug'],
  [8, 'Sep'],
  [9, 'Okt'],
  [10, 'Nov'],
  [11, 'Dez']
])

spanMonth.innerText = selectedMonth.getFullYear() + ' ' + monthMap.get(selectedMonth.getMonth())

function pre() {
  switchMonth(-1)
}

function next() {
  switchMonth(1)
}

function switchMonth(i: number) {
  selectedMonth.setMonth(selectedMonth.getMonth() + i)
  spanMonth.innerText = selectedMonth.getFullYear() + ' ' + monthMap.get(selectedMonth.getMonth())
}
