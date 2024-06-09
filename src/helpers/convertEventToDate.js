import { parseISO } from "date-fns"



export const convertEventToDate = (event =[]) => {
  return event.map(event =>{
    event.end = parseISO(event.end)
    event.start = parseISO(event.start)

    return event
  })
}
