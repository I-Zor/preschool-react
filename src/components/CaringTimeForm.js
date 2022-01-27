import React, { useState } from "react";
import '../App.css';
import TimePicker from 'react-time-picker';
import axios from "axios";

const CaringTimeForm = (props) => {

    const [startValue, setStartValue] = useState('8:00');
    const [endValue, setEndValue] = useState('16:00');
    const [weekday, setWeekday] = useState('');

    //    let chosenStartTime = startValue;
    let splittedStartTime = startValue.split(':');
    let startHour = splittedStartTime[0];
    let startMinute = splittedStartTime[1];

    let chosenEndTime = endValue;
    let splittedEndTime = chosenEndTime.split(':');
    let endHour = splittedEndTime[0];
    let endMinute = splittedEndTime[1];

    let childId = window.sessionStorage.getItem("childId");

    let caringTimeResource = {
        weekday: weekday,
        startHour: startHour,
        startMinut: startMinute,
        endHour: endHour,
        endMinut: endMinute
    };

    function setWeekDay(e) {
        if (e.target.checked) {
            setWeekday(e.target.value);
            console.log(e.target.value);
        };
    };

    if (!props.show) {
        return null
    };

    function changeCaringTime() {
        let putCaringTimeUrl = 'http://localhost:8080/caregiver/upsert-caring-time/' + childId;
        axios.put(putCaringTimeUrl, caringTimeResource)
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="modal">
            <div id="caring-time-form">
                <h4>Välj veckodag</h4>
                <div id="caring-time-picker">
                    <div id="days-checkboxes">
                        <label>
                            <input type="radio" id="checkbox-monday" onChange={setWeekDay} value="Måndag" name="days" /> Måndag
                        </label>
                        <label>
                            <input type="radio" id="checkbox-tuesday" onChange={setWeekDay} value="Tisdag" name="days"/> Tisdag
                        </label>
                        <label>
                            <input type="radio" id="checkbox-wednesday" onChange={setWeekDay} value="Onsdag" name="days"/> Onsdag
                        </label>
                        <label>
                            <input type="radio" id="checkbox-thursday" onChange={setWeekDay} value="Torsdag" name="days"/> Torsdag
                        </label>
                        <label>
                            <input type="radio" id="checkbox-friday" onChange={setWeekDay} value="Fredag" name="days"/> Fredag
                        </label>
                    </div>
                    <div id="time-pickers">
                        <div id="time-picker-start">
                            <h4>Starttid</h4><br></br>
                            <TimePicker
                                value={startValue}
                                onChange={setStartValue}
                                locale="sv" />
                        </div>
                        <div id="time-picker-end">
                            <h4>Sluttid</h4><br></br>
                            <TimePicker
                                value={endValue}
                                onChange={setEndValue}
                                locale="sv" />
                        </div>
                    </div>
                </div>
                <div id="buttons-caring-time">
                    <button onClick={props.close} id="close-button">Stäng</button>
                    <button onClick={changeCaringTime} id="save-button-time-picker">Spara</button>
                </div>
            </div>
        </div>
    )
}

export default CaringTimeForm;