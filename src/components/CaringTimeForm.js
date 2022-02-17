import React, { useState } from "react";
import TimePicker from 'react-time-picker';
import axios from "axios";
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'react-clock/dist/Clock.css';
import '../styling/App.css';
import '../styling/CaringTimeForm.css';

Modal.setAppElement('#root');

const CaringTimeForm = ({ isModalOpen, setModal }) => {

    const [startValue, setStartValue] = useState('8:00');
    const [endValue, setEndValue] = useState('16:00');
    const [weekday, setWeekday] = useState('');

    let splittedStartTime = startValue.split(':');
    let startHour = splittedStartTime[0];
    let startMinute = splittedStartTime[1];

    let splittedEndTime = endValue.split(':');
    let endHour = splittedEndTime[0];
    let endMinute = splittedEndTime[1];

    let childId = localStorage.getItem("childId");

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
        }
    };

    function changeCaringTime() {
        
        if (weekday === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Vänligen ange veckodag'
            });
        };

        let putCaringTimeUrl = 'http://localhost:8080/caregiver/upsert-caring-time/' + childId;
        axios.put(putCaringTimeUrl, caringTimeResource)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Ändringen är sparad'
                });
            })
            .catch((error) => {
                    console.log(error);
            });
    };

    function closeModal() {
        setModal(false);
        window.location.reload();
    }

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
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <div id="caring-time-form">
                    <h4>Välj veckodag</h4>
                    <div id="margin-top" className="caring-time-picker">
                        <div id="days-checkboxes">
                            <label>
                                <input
                                    type="radio"
                                    onChange={setWeekDay}
                                    value="Måndag"
                                    name="days" />
                                Måndag
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    onChange={setWeekDay}
                                    value="Tisdag"
                                    name="days" />
                                Tisdag
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    onChange={setWeekDay}
                                    value="Onsdag"
                                    name="days" />
                                Onsdag
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    onChange={setWeekDay}
                                    value="Torsdag"
                                    name="days" />
                                Torsdag
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    onChange={setWeekDay}
                                    value="Fredag"
                                    name="days" />
                                Fredag
                            </label>
                        </div>
                        <div className="time-pickers">
                            <div className="time-picker-start">
                                <h4>Starttid</h4><br></br>
                                <TimePicker
                                    value={startValue}
                                    onChange={setStartValue}
                                    locale="sv" />
                            </div>
                            <div className="time-picker-end">
                                <h4>Sluttid</h4><br></br>
                                <TimePicker
                                    value={endValue}
                                    onChange={setEndValue}
                                    locale="sv" />
                            </div>
                        </div>
                    </div>
                    <div className="buttons-modal">
                        <button
                            onClick={closeModal}
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