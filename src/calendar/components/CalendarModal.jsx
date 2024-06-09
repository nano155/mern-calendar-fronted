import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import Modal from 'react-modal'

import DatePicker, { registerLocale } from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import { es } from 'date-fns/locale/es';
registerLocale('es', es)

import { useCalendarStore, useUiStore } from '../../hooks';





const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
    const {isDataModalOption, closedDateModal} = useUiStore()
    const {activeEvent, startSavingEvent} = useCalendarStore()

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
    })
    const [formSubmitted, setFormSubmitted] = useState(false)


    const onChange = ({target}) =>{
        const {name, value} = target
       setFormValues({
           ...formValues,
            [name]:value
       })
    }

    const onChangeDate = (e ,arg) =>{
        setFormValues({
            ...formValues,
            [arg]:new Date(e)
        })
    }

    const onCloseModal = () => {
        closedDateModal()
    }

    const titleClass = useMemo(() => {
        if(!formSubmitted){
            return ''
        }
        return (formValues.title.length > 0 )
        ?''
        :'is-invalid'

    }, [formValues.title, formSubmitted])

    const onSubmit = async (e) =>{
        e.preventDefault()
        setFormSubmitted(true)

        const difference = differenceInSeconds(formValues.end, formValues.start)
        if(difference < 0 || isNaN(difference)){
            Swal.fire({
                title: 'Error en la fecha',
                text: 'Revisar las fechas ingresadas',
                icon:'error'
            })
            return
        }
        if(formValues.title.length <= 0) return

        await startSavingEvent(formValues)
        closedDateModal()
        setFormSubmitted(false)

    }

    useEffect(() => {
        if(activeEvent!== null){
            setFormValues({...activeEvent})
        }
    
   
    }, [activeEvent])
    

    return (
        <Modal
            isOpen={isDataModalOption}
            onRequestClose={onCloseModal}
            style={customStyles}
            contentLabel="Example Modal"
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form onSubmit={onSubmit} className="container">

                <div className="form-group mb-2 d-flex flex-column">
                    <label >Fecha y hora inicio</label>
                    <DatePicker 
                    className='form-control' 
                    selected={formValues.start} 
                    onChange={(date) => onChangeDate(date, 'start')} 
                    dateFormat={'Pp'}
                    locale={'es'}
                    showTimeSelect
                    />
                </div>

                <div className="form-group mb-2 d-flex flex-column">
                    <label>Fecha y hora fin</label>
                    <DatePicker 
                    className='form-control'
                    minDate={formValues.start}
                    selected={formValues.end} 
                    onChange={(date) => onChangeDate(date, 'end')} 
                    dateFormat={'Pp'}
                    locale={'es'}
                    showTimeSelect
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
