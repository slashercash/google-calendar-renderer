declare const CALENDAR_ID: string
declare const API_KEY: string

interface EventsResponse {
  items: Array<Item>
}

interface Item {
  start: Timestamp
  end: Timestamp
}

interface Timestamp {
  date: string | undefined
}

interface CalendarEvent {
  startTime: number
  endTime: number
}

interface CalendarDay {
  date: Date
  bookedMorning: boolean
  bookedEvening: boolean
}
