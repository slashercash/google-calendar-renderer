declare const CALENDAR_ID: string
declare const API_KEY: string

interface EventsResponse {
  items: Array<Item>
}

interface Item {
  summary: string
}
