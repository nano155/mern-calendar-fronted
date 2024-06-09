import 'react-big-calendar/lib/css/react-big-calendar.css'
import {es} from 'date-fns/locale'
import { parse, startOfWeek, getDay, format } from "date-fns"
import { dateFnsLocalizer } from 'react-big-calendar'

const locales = {
  'es' : es,
}

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

