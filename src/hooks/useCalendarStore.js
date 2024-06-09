import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onloadEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import { calendarApi } from "../api";
import { convertEventToDate } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const dispath = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispath(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async(calendarEvent) =>{
try {
  if(calendarEvent.id){
    await calendarApi.put(`/calendar/${calendarEvent.id}`, calendarEvent)

    return  dispath(onUpdateEvent({...calendarEvent, user}))
  }
    const {data:{evento}} = await calendarApi.post('/calendar', calendarEvent)
   

      dispath(onAddNewEvent({
          ...calendarEvent,
          id: evento.id,
          user
      }))
  
} catch (error) {
  console.log(error);
  Swal.fire('Error al guardar', error.response?.data.msg, "error")
}
  }

  const deleteEvent = async () =>{
    try {
      if(activeEvent){
        await calendarApi.delete(`/calendar/${activeEvent.id}`)
        dispath(onDeleteEvent())
        return
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error al Eliminar el evento', error.response?.data.msg, "error")
    }
  }

  const startLoadingEvents = async () =>{
    try {
      const {data:{evento}} = await calendarApi.get('calendar')
      
      const events = convertEventToDate(evento)
      dispath(onloadEvent(events))

      
    } catch (error) {
      console.log('error cargando info');
      console.log(error);
      
    }
  }

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent, 
    deleteEvent, 
    startLoadingEvents
  };
};
