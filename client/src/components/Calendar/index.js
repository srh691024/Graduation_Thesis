import classNames from "classnames/bind";
import styles from "~/components/Calendar/Calendar.module.scss"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

const cx = classNames.bind(styles);

function Calendar() {
    const handleSelect = (info) => {
        console.log(info.startStr, info.endStr);
    }
    return (
        <div className={cx('wrapper')}>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                selectable={true}
                select={handleSelect}
            />
        </div>
    );
}

export default Calendar;