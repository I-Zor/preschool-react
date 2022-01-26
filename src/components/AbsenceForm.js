import React, { useState } from "react";
import '../App.css';
import axios from "axios";
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import sv from 'date-fns/locale/sv';
registerLocale('sv', sv)

const AbsenceForm = (props) => {

    const [startDate, setStartDate] = useState(new Date());
    const [reason, setReason] = useState('');

    if (!props.show) {
        return null
    };

    let chosenDate = startDate;
    let convertedDate = chosenDate.toISOString().slice(0,10);

    let childId = window.sessionStorage.getItem("childId");

    function setDateToToday(e) {
        if (e.target.checked) {
             setStartDate(new Date());
        };
    };

    function setReasonAsDayOff(e) {
        if (e.target.checked) {
            setReason('Ledig');
        }
    };

    function getReason(e) {
        setReason(e.target.value)
    }

    console.log(convertedDate)

     function saveAbsence() {
        let saveAbsenceUrl = 'http://localhost:8080/educator/absence/' + childId + '/' + convertedDate + '/' + reason;
         axios.get(saveAbsenceUrl)
             .then((response) => {
                 let id = response.data;
                 console.log(id);
             })
             .catch((error) => {
                 console.log(error);
             });
    };

    function handleSavingAbsence() {
        saveAbsence();
    }
 
    return (
         <div className="modal">
            <div id="absence-form">
                <div id="date-today-form">
                    <label>
                        <input type="checkbox" id="checkbox-today" onChange={setDateToToday}/>
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
                            <input type="text" id="reason" onChange={getReason}/>
                        </label>
                    </form>
                </div>
                <label>
                    <input type="checkbox" id="checkbox-offtime" onChange={setReasonAsDayOff} />
                    Ledig
                </label>
                <div className="buttons">
                <button onClick={handleSavingAbsence} className="save-button">Spara</button>
                <button className="save-button" onClick={props.close}> Stäng</button>
                </div>
            </div>
         </div>
    )
}

export default AbsenceForm;