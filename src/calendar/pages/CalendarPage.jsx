import { getMessagesES, localizer } from "../../helpers"

import { Navbar, CalendarEvent, CalendarModal } from "../"
import { Calendar } from 'react-big-calendar'

import { useEffect, useState } from "react"
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks"
import { FabAddNew } from "../components/FabAddNew"
import { FabDelete } from "../components/FabDelete"



export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView')|| 'week')

  const {user} = useAuthStore()
  const {openDateModal} = useUiStore()
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore()


  const enventStyleGetter = (event) => {
    // event, start, end, isSelected
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);

    const style = {

      backgroundColor: isMyEvent 
      ? '#347CF7'
      : '#465660',

      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = () =>{
    openDateModal()
  }

  const onSelect = (event) =>{
    setActiveEvent(event)
  }

  const onViewEvent = (event) =>{
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  useEffect(() => {
    startLoadingEvents()  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  


  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={
          getMessagesES()
        }
        eventPropGetter={enventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewEvent}
      />
      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>
    </>
  )
}
