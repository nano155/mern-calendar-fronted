import { useSelector } from "react-redux"
import { useCalendarStore } from "../../hooks"


export const FabDelete = () => {

    const { deleteEvent, hasEventSelected } = useCalendarStore()
    
    const { isDataModalOption } = useSelector(state => state.ui)


    const handleClickDelete = () => {

        deleteEvent()
    }
    return (
        <button className={`btn btn-danger fab-danger ${hasEventSelected && !isDataModalOption ?'':'d-none'}`}
            onClick={handleClickDelete}>
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
