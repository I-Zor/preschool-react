import React, { useState } from "react";
import './App.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import sv from 'date-fns/locale/sv';
registerLocale('sv', sv)

const AbsenceForm = (props) => {

    const [startDate, setStartDate] = useState(new Date());

    if (!props.show) {
        return null
    };

    return (
         <div className="modal">
            <div id="absence-form">
                <div id="date-today-form">
                    <label>
                        <input type="checkbox" id="checkbox-today" />
                        Idag
                    </label>

                    <label>Eller välj annan dag (tryck på datumet nedanför)</label>
                </div>
                <div id="date-picker">
                    <DatePicker locale="sv" selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <div id="reason-form">
                    <form>
                        <label> Anledning:
                            <input type="text" id="reason" />
                        </label>
                    </form>
                </div>
                <label>
                    <input type="checkbox" id="checkbox-offtime" />
                    Ledig
                </label>
                <button onClick={props.close} id="save-buton">Spara</button>
            </div>
         </div>
    )
}

export default AbsenceForm;