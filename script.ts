const EVENTS_URL = `https://content.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
const ONE_DAY_MS = 86400000

const span_month = document.getElementById('month') as HTMLSpanElement
const div_calendarBody = document.getElementById('calendar-body') as HTMLDivElement

const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
const firstDayOfSelectedMonth = new Date(today.getFullYear(), today.getMonth(), 1)

switchMonth(0)

function switchMonth(i: number): void {
  firstDayOfSelectedMonth.setMonth(firstDayOfSelectedMonth.getMonth() + i)
  span_month.innerText = firstDayOfSelectedMonth.getFullYear() + ' ' + MONTHS[firstDayOfSelectedMonth.getMonth()]

  const firstDay = getLatestMonday(firstDayOfSelectedMonth)
  const timeMin = firstDay.toISOString()
  const timeMax = new Date(firstDay.getTime() + ONE_DAY_MS * 35).toISOString()

  fetch(EVENTS_URL + '?' + new URLSearchParams({ key: API_KEY, timeMin, timeMax }).toString())
    .then((res): Promise<EventsResponse> => res.json())
    .then(({ items }) => items.map(toEvent))
    .then((events) => toCalendarDays(firstDay.getTime(), events))
    .then((calendarDays) => calendarDays.map(toHTMLDivElement))
    .then((divs) => div_calendarBody.replaceChildren(...divs))
}

function getLatestMonday(date: Date): Date {
  var latestMonday = new Date(date.getTime())
  latestMonday.setDate(latestMonday.getDate() - ((latestMonday.getDay() + 6) % 7))
  return latestMonday
}

function toEvent(item: Item): CalendarEvent {
  const startDate = new Date(item.start.date ?? 0)
  const endDate = new Date(item.end.date ?? 0)
  startDate.setHours(0)
  endDate.setHours(0)
  return {
    startTime: startDate.getTime(),
    endTime: endDate.getTime()
  }
}

function toCalendarDays(firstDayTime: number, events: Array<CalendarEvent>): Array<CalendarDay> {
  const calendarDays: Array<CalendarDay> = []
  for (let i = 0; i < 35; i++) {
    const dayTime = firstDayTime + i * ONE_DAY_MS
    const booked = events.find(({ startTime, endTime }) => dayTime >= startTime && dayTime < endTime) != undefined
    calendarDays[i] = {
      date: new Date(dayTime),
      bookedMorning: booked,
      bookedEvening: booked
    }
  }
  return calendarDays
}

function toHTMLDivElement({ date, bookedMorning, bookedEvening }: CalendarDay): HTMLDivElement {
  const div = document.createElement('div')
  bookedMorning && div.classList.add('booked-morning')
  bookedEvening && div.classList.add('booked-evening')
  date.getMonth() != firstDayOfSelectedMonth.getMonth() && div.classList.add('faded')
  date.getTime() === today.getTime() && div.classList.add('today')
  div.innerText = date.getDate().toString()
  return div
}
