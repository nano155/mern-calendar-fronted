import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onOpenModal } from "../store/ui/uiSlice"


export const useUiStore = () => {

    const {isDataModalOption} =useSelector(state => state.ui)
       const dispatch = useDispatch()
    const openDateModal = () =>{
        dispatch(onOpenModal())
    }
    
    const closedDateModal = () =>{
        dispatch(onCloseModal())
    }
    
    const toggleDateModal = () =>{
        (isDataModalOption)
        ?openDateModal()
        :closedDateModal()
        
    }


  return {
    isDataModalOption,
    openDateModal,
    closedDateModal,
    toggleDateModal, 
  }
}
