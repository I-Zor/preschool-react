import React, { useState, useEffect, useRef } from "react";
import TimePicker from 'react-time-picker';
import axios from "axios";
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'react-clock/dist/Clock.css';
import '../styling/App.css';
import '../styling/CaringTimeForm.css';

Modal.setAppElement('#root');

const CaringTimeForm = (props) => {

    let caringTimeMonday = JSON.parse(localStorage.getItem("monday"));
    let caringTimeTuesday = JSON.parse(localStorage.getItem("tuesday"));
    let caringTimeWednesday = JSON.parse(localStorage.getItem("wednesday"));
    let caringTimeThursday = JSON.parse(localStorage.getItem("thursday"));
    let caringTimeFriday = JSON.parse(localStorage.getItem("friday"));

    let mondayStart = caringTimeMonday.startHour + ':' + caringTimeMonday.startMinut;
    let mondayEnd = caringTimeMonday.endHour + ':' + caringTimeMonday.endMinut;
    let tuesdayStart = caringTimeTuesday.startHour + ':' + caringTimeTuesday.startMinut;
    let tuesdayEnd = caringTimeTuesday.endHour + ':' + caringTimeTuesday.endMinut;
    let wednesdayStart = caringTimeWednesday.startHour + ':' + caringTimeWednesday.startMinut;
    let wednesdayEnd = caringTimeWednesday.endHour + ':' + caringTimeWednesday.endMinut;
    let thursdayStart = caringTimeThursday.startHour + ':' + caringTimeThursday.startMinut;
    let thursdayEnd = caringTimeThursday.endHour + ':' + caringTimeThursday.endMinut;
    let fridayStart = caringTimeFriday.startHour + ':' + caringTimeFriday.startMinut;
    let fridayEnd = caringTimeFriday.endHour + ':' + caringTimeFriday.endMinut;

    const [startValueMonday, setStartValueMonday] = useState(mondayStart);
    const [endValueMonday, setEndValueMonday] = useState(mondayEnd);
    const [startValueTuesday, setStartValueTuesday] = useState(tuesdayStart);
    const [endValueTuesday, setEndValueTuesday] = useState(tuesdayEnd);
    const [startValueWednesday, setStartValueWednesday] = useState(wednesdayStart);
    const [endValueWednesday, setEndValueWednesday] = useState(wednesdayEnd);
    const [startValueThursday, setStartValueThursday] = useState(thursdayStart);
    const [endValueThursday, setEndValueThursday] = useState(thursdayEnd);
    const [startValueFriday, setStartValueFriday] = useState(fridayStart);
    const [endValueFriday, setEndValueFriday] = useState(fridayEnd);

    const [weekday, setWeekday] = useState('');

    let splittedStartTimeMonday = startValueMonday.split(':');
    let startHourMonday = splittedStartTimeMonday[0];
    let startMinuteMonday = splittedStartTimeMonday[1];
    let splittedEndTimeMonday = endValueMonday.split(':');
    let endHourMonday = splittedEndTimeMonday[0];
    let endMinuteMonday = splittedEndTimeMonday[1];

    let splittedStartTimeTuesday = startValueTuesday.split(':');
    let startHourTuesday = splittedStartTimeTuesday[0];
    let startMinuteTuesday = splittedStartTimeTuesday[1];
    let splittedEndTimeTuesday = endValueTuesday.split(':');
    let endHourTuesday = splittedEndTimeTuesday[0];
    let endMinuteTuesday = splittedEndTimeTuesday[1];

    let splittedStartTimeWednesday = startValueWednesday.split(':');
    let startHourWednesday = splittedStartTimeWednesday[0];
    let startMinuteWednesdayy = splittedStartTimeWednesday[1];
    let splittedEndTimeWednesday = endValueWednesday.split(':');
    let endHourWednesday = splittedEndTimeWednesday[0];
    let endMinuteWednesday = splittedEndTimeWednesday[1];

    let splittedStartTimeThursday = startValueThursday.split(':');
    let startHourThursday = splittedStartTimeThursday[0];
    let startMinuteThursday = splittedStartTimeThursday[1];
    let splittedEndTimeThursday = endValueThursday.split(':');
    let endHourThursday = splittedEndTimeThursday[0];
    let endMinuteThursdayy = splittedEndTimeThursday[1];

    let splittedStartTimeFriday = startValueFriday.split(':');
    let startHourFriday = splittedStartTimeFriday[0];
    let startMinuteFriday = splittedStartTimeFriday[1];
    let splittedEndTimeFriday = endValueFriday.split(':');
    let endHourFriday = splittedEndTimeFriday[0];
    let endMinuteFriday = splittedEndTimeFriday[1];

    let childId = localStorage.getItem("childId");

    const [caringTimeResource, setCaringTimeResource] = useState({});
    const mondayRef = useRef('Måndag');
    const tuesdayRef = useRef('Tisdag');
    const wednesdayRef = useRef('Onsdag');
    const thursdayRef = useRef('Torsdag');
    const fridayRef = useRef('Fredag');

    useEffect(() => {
        function handleCaringTimeResource() {
            if (mondayRef.current.checked) {
                setCaringTimeResource({
                    weekday: weekday,
                    startHour: startHourMonday,
                    startMinut: startMinuteMonday,
                    endHour: endHourMonday,
                    endMinut: endMinuteMonday
                });
            };
            if (tuesdayRef.current.checked) {
                setCaringTimeResource({
                    weekday: weekday,
                    startHour: startHourTuesday,
                    startMinut: startMinuteTuesday,
                    endHour: endHourTuesday,
                    endMinut: endMinuteTuesday
                });
            };
            if (wednesdayRef.current.checked) {
                setCaringTimeResource({
                    weekday: weekday,
                    startHour: startHourWednesday,
                    startMinut: startMinuteWednesdayy,
                    endHour: endHourWednesday,
                    endMinut: endMinuteWednesday
                });
            };
            if (thursdayRef.current.checked) {
                setCaringTimeResource({
                    weekday: weekday,
                    startHour: startHourThursday,
                    startMinut: startMinuteThursday,
                    endHour: endHourThursday,
                    endMinut: endMinuteThursdayy
                });
            };
            if (fridayRef.current.checked) {
                setCaringTimeResource({
                    weekday: weekday,
                    startHour: startHourFriday,
                    startMinut: startMinuteFriday,
                    endHour: endHourFriday,
                    endMinut: endMinuteFriday
                });
            };
        };
        handleCaringTimeResource();
    }, [startHourMonday, startMinuteMonday, endHourMonday, endMinuteMonday,
        startHourTuesday, startMinuteTuesday, endHourTuesday, endMinuteTuesday,
        startHourWednesday, startMinuteWednesdayy, endHourWednesday, endMinuteWednesday,
        startHourThursday, startMinuteThursday, endHourThursday, endMinuteThursdayy,
        startHourFriday, startMinuteFriday, endHourFriday, endMinuteFriday, weekday]);

    if (!props.show) {
        return null
    };

    function setWeekDay(e) {
        if (e.target.checked) {
            setWeekday(e.target.value);
        };
    };

    function changeCaringTime() {
        let putCaringTimeUrl = 'http://localhost:8080/caregiver/upsert-caring-time/' + childId;
        axios.put(putCaringTimeUrl, caringTimeResource)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Ändringen är sparad',
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <div>
            <Modal
                isOpen={props.show}
                style={customStyles}
            >
                <div id="caring-time-form">
                    <h4 className="font-size">Välj veckodag</h4>
                    <div id="margin-top" className="caring-time-picker">
                        <div id="days-checkboxes">
                            <label className="font-size">
                                <input
                                    ref={mondayRef}
                                    type="radio"
                                    onChange={setWeekDay}
                                    value="Måndag"
                                    name="days" />
                                Måndag
                            </label>
                            <label className="font-size">
                                <input
                                    ref={tuesdayRef}
                                    type="radio"
                                    onChange={setWeekDay}
                                    value="Tisdag"
                                    name="days" />
                                Tisdag
                            </label>
                            <label className="font-size">
                                <input
                                    ref={wednesdayRef}
                                    type="radio"
                                    onChange={setWeekDay}
                                    value="Onsdag"
                                    name="days" />
                                Onsdag
                            </label>
                            <label className="font-size">
                                <input
                                    ref={thursdayRef}
                                    type="radio"
                                    onChange={setWeekDay}
                                    value="Torsdag"
                                    name="days" />
                                Torsdag
                            </label>
                            <label className="font-size">
                                <input
                                    ref={fridayRef}
                                    type="radio"
                                    onChange={setWeekDay}
                                    value="Fredag"
                                    name="days" />
                                Fredag
                            </label>
                        </div>
                        <div className="time-pickers">
                            <div className="individual-day">
                                <div className="time-picker-start">
                                    {/* <h4 className="font-size">Starttid</h4><br></br> */}
                                    <TimePicker
                                        name="startMonday"
                                        value={startValueMonday}
                                        onChange={setStartValueMonday}
                                        locale="sv" />
                                </div>
                                <div className="time-picker-end">
                                    {/* <h4 className="font-size">Sluttid</h4><br></br> */}
                                    <TimePicker
                                        name="endMonday"
                                        value={endValueMonday}
                                        onChange={setEndValueMonday}
                                        locale="sv" />
                                </div>
                            </div>
                            <div className="individual-day">
                                <div className="time-picker-start">
                                    {/* <h4 className="font-size">Starttid</h4><br></br> */}
                                    <TimePicker
                                        name="startTuesday"
                                        value={startValueTuesday}
                                        onChange={setStartValueTuesday}
                                        locale="sv" />
                                </div>
                                <div className="time-picker-end">
                                    {/* <h4 className="font-size">Sluttid</h4><br></br> */}
                                    <TimePicker
                                        name="endTuesday"
                                        value={endValueTuesday}
                                        onChange={setEndValueTuesday}
                                        locale="sv" />
                                </div>
                            </div>
                            <div className="individual-day">
                                <div className="time-picker-start">
                                    {/* <h4 className="font-size">Starttid</h4><br></br> */}
                                    <TimePicker
                                        name="startWednesday"
                                        value={startValueWednesday}
                                        onChange={setStartValueWednesday}
                                        locale="sv" />
                                </div>
                                <div className="time-picker-end">
                                    {/* <h4 className="font-size">Sluttid</h4><br></br> */}
                                    <TimePicker
                                        name="endWednesday"
                                        value={endValueWednesday}
                                        onChange={setEndValueWednesday}
                                        locale="sv" />
                                </div>
                            </div>
                            <div className="individual-day">
                                <div className="time-picker-start">
                                    {/* <h4 className="font-size">Starttid</h4><br></br> */}
                                    <TimePicker
                                        name="startThursday"
                                        value={startValueThursday}
                                        onChange={setStartValueThursday}
                                        locale="sv" />
                                </div>
                                <div className="time-picker-end">
                                    {/* <h4 className="font-size">Sluttid</h4><br></br> */}
                                    <TimePicker
                                        name="endThursday"
                                        value={endValueThursday}
                                        onChange={setEndValueThursday}
                                        locale="sv" />
                                </div>
                            </div>
                            <div className="individual-day">
                                <div className="time-picker-start">
                                    {/* <h4 className="font-size">Starttid</h4><br></br> */}
                                    <TimePicker
                                        name="startFriday"
                                        value={startValueFriday}
                                        onChange={setStartValueFriday}
                                        locale="sv" />
                                </div>
                                <div className="time-picker-end">
                                    {/* <h4 className="font-size">Sluttid</h4><br></br> */}
                                    <TimePicker
                                        name="endFriday"
                                        value={endValueFriday}
                                        onChange={setEndValueFriday}
                                        locale="sv" />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div id="buttons-modal">
                        <button
                            onClick={props.close}
                            className="save-button">
                            Stäng
                        </button>
                        <button
                            onClick={changeCaringTime}
                            className="save-button">
                            Spara
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CaringTimeForm;