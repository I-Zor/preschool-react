import React, { useState } from "react";
import './App.css';
/* import DateFnsUtils from "@date-io/date-fns/build/date-fns-utils";
import { TimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
 */


function CaringTimeForm() {

    const [selectedTime, handleTimeChange] = useState(new Date());

    return (
        <div id="caring-time-form">
            <h4>Välj veckodag</h4>
            <div id="caring-time-picker">
                <div id="week-days-picker">

                </div>
                <div id="time-picker">
                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                            value={selectedTime}
                        onChange={handleTimeChange}/>
                    </MuiPickersUtilsProvider> */}
                </div>
            </div>

            <button id="save-button-time-picker">Spara</button>
        </div>
    )
}

export default CaringTimeForm;