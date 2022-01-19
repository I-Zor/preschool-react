import React, { useState } from "react";
import '../App.css';
import TimePicker from 'react-time-picker';

const CaringTimeForm = (props) => {

    const [selectedTime, onChange] = useState(new Date());

    if (!props.show) {
        return null
    };

    return (
        <div className="modal">
            <div id="caring-time-form">
                <h4>Välj veckodag</h4>
                <div id="caring-time-picker">
                    <div id="days-checkboxes">
                        <label>
                            <input type="checkbox" id="checkbox-monday" /> Måndag
                        </label>
                        <label>
                            <input type="checkbox" id="checkbox-tuesday" /> Tisdag
                        </label>
                        <label>
                            <input type="checkbox" id="checkbox-wednesday" /> Onsdag
                        </label>
                        <label>
                            <input type="checkbox" id="checkbox-thursday" /> Torsdag
                        </label>
                        <label>
                            <input type="checkbox" id="checkbox-friday" /> Fredag
                        </label>
                    </div>
                    <div id="time-pickers">
                        <div id="time-picker-start">
                            <h4>Starttid</h4><br></br>
                            <TimePicker
                                value={selectedTime}
                                onChange={onChange} />
                        </div>
                        <div id="time-picker-end">
                            <h4>Sluttid</h4><br></br>
                            <TimePicker
                                value={selectedTime}
                                onChange={onChange} />
                        </div>
                    </div>
                </div>
                <div id="buttons-caring-time">
                    <button onClick={props.close} id="close-button">Stäng</button>
                    <button id="save-button-time-picker">Spara</button>
                </div>

            </div>
        </div>
    )
}

export default CaringTimeForm;