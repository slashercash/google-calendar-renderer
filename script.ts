const eventsUrl = new URL(`https://content.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`)

const spanMonth = document.getElementById('month') as HTMLSpanElement
const divCalendarBody = document.getElementById('calendar-body') as HTMLDivElement
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
const ONE_DAY = 86400000
const calendarDays: Array<CalendarDay> = []

const now = new Date(Date.now())
const selectedMonth = new Date(now.getFullYear(), now.getMonth())
let timeMin: Date
let timeMax: Date
switchMonth(0)

function switchMonth(i: number) {
  selectedMonth.setMonth(selectedMonth.getMonth() + i)

  timeMin = new Date(selectedMonth.getTime())
  let day = timeMin.getDay()
  // TODO: would for-loop be better?
  while (day !== 1) {
    timeMin.setDate(timeMin.getDate() - 1)
    day = timeMin.getDay()
  }
  timeMax = new Date(timeMin.getTime() + ONE_DAY * 35)

  for (let i = 0; i < 35; i++) {
    calendarDays[i] = {
      date: new Date(timeMin.getTime() + i * ONE_DAY),
      bookedMorning: false,
      bookedEvening: false
    }
  }

  spanMonth.innerText = selectedMonth.getFullYear() + ' ' + months[selectedMonth.getMonth()]

  fetchEvents()
}

function fetchEvents(): void {
  eventsUrl.search = new URLSearchParams({
    key: API_KEY,
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString()
  }).toString()

  fetch(eventsUrl)
    .then((res): Promise<EventsResponse> => res.json())
    .then((res) => res.items.forEach(setCalendarDays))
    .then(buildCalendar)
}

function setCalendarDays(item: Item) {
  if (item.start.date === undefined || item.end.date === undefined) return

  const endDate = new Date(item.end.date)
  endDate.setHours(0)
  const startDate = new Date(item.start.date)
  startDate.setHours(0)

  for (
    const indexDate = startDate;
    indexDate.getTime() < endDate.getTime();
    indexDate.setDate(indexDate.getDate() + 1)
  ) {
    const day = calendarDays.find((d) => d.date.getTime() === indexDate.getTime())
    if (day != undefined) {
      day.bookedMorning = true
      day.bookedEvening = true
    }
  }
}

function buildCalendar() {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const divs = calendarDays.map(({ date, bookedMorning, bookedEvening }) => {
    const div = document.createElement('div')
    bookedMorning && div.classList.add('booked-morning')
    bookedEvening && div.classList.add('booked-evening')
    date.getMonth() != selectedMonth.getMonth() && div.classList.add('faded')
    date.getTime() === today.getTime() && div.classList.add('today')
    div.innerText = date.getDate().toString()
    return div
  })
  divCalendarBody.replaceChildren(...divs)
}
