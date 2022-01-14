import React, { useState } from "react";
import './App.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import sv from 'date-fns/locale/sv';
registerLocale('sv', sv)


function AbsenceForm() {

    const [startDate, setStartDate] = useState(new Date());

    return (
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
                <input type="checkbox" id="checkbox-today" />
                Ledig
            </label>
            <button id="save-buton">Spara</button>
        </div>
    )
}

export default AbsenceForm;