import classNames from "classnames/bind";
import styles from "~/components/Calendar/Calendar.module.scss"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ModalEditCalendar from "../ModalEditCalendar";
import { useDispatch, useSelector } from "react-redux";
import { getAnniversariesByCouple, updateAnni } from "~/store/anniversary/asyncAction";
import moment from "moment";
import * as anniversaryServices from '~/services/anniversaryServices'
import ModalDeleteAnni from "../ModalDeleteAnni";

const cx = classNames.bind(styles);

function Calendar(props) {
    const dispatch = useDispatch()
    const { couple } = useSelector(state => state.couple)
    const coupleId = couple._id
    const { anniversaries } = useSelector(state => state.anniversary)

    useEffect(() => {
        dispatch(getAnniversariesByCouple(coupleId))
    }, [dispatch, coupleId])

    const [showModalEditCalendar, setShowModalEditCalendar] = useState(false);
    const [showModalDeleteCalendar, setShowModalDeleteCalendar] = useState(false);
    const [idAnni, setIdAnni] = useState('')
    const [infoCalendar, setInfoCalendar] = useState({
        title: '',
        description: '',
        start: '',
        end: '',
        color:'',
    })
    const currentMonth = async(info) => {
        const m = info.view.calendar.currentDataManager.data.currentDate
        const mm = moment(m).format('M')
        const response = await anniversaryServices.apiCurrentMonth(coupleId,{mm})
        if(response.success) {
            props.onDataPassed(response.result)
        }
    }
    const handleSelect = (info) => {
        setShowModalEditCalendar(true)
        setInfoCalendar({
            ...infoCalendar,
            start: info.startStr,
            end: info.endStr
        })
    }

    const handleChange = async(info) => {
        const updateAnniId = info.event._def.extendedProps._id
        const data = {
            start: info.event.startStr,
            end: info.event.endStr
        }
        await anniversaryServices.apiUpdateEvent(updateAnniId,data)
        // dispatch(updateAnni({updateAnniId, data}))
    }
    const handleClick = (info)=>{
        setShowModalDeleteCalendar(true)
        const id = info.event._def.extendedProps._id
        setIdAnni(id)
    }


    return (
        <div className={cx('wrapper')}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                events={anniversaries}
                headerToolbar={{
                    left: 'prev, next, today',
                    center: 'title',
                    right: 'dayGridMonth, timeGridWeek, timeGridDay'
                }}
                selectable={true}
                select={handleSelect}
                datesSet={currentMonth}
                editable={true}
                eventChange={handleChange}
                eventClick={handleClick}
            />
            {/* Modal edit calendar */}
            {showModalEditCalendar && createPortal(
                <ModalEditCalendar data={infoCalendar} onClose={() => setShowModalEditCalendar(false)} />,
                document.body
            )}

            {/* Modal delete calendar */}
            {showModalDeleteCalendar && createPortal(
                <ModalDeleteAnni idAnni={idAnni} onClose={() => setShowModalDeleteCalendar(false)} />,
                document.body
            )}
        </div>
    );
}

export default Calendar;