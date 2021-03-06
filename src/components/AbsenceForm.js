import React, { useState } from "react";
import '../styling/App.css';
import '../styling/AbsenceForm.css';
import axios from "axios";
import Modal from 'react-modal';
import swal from 'sweetalert2';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import sv from 'date-fns/locale/sv';
registerLocale('sv', sv)

Modal.setAppElement('#root');

const AbsenceForm = ({isModalOpen, setModal}) => {

    const [startDate, setStartDate] = useState(new Date());
    const [reason, setReason] = useState('');

    let chosenDate = startDate;
    let convertedDate = chosenDate.toISOString().slice(0, 10);

    let childId = localStorage.getItem("childId");

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

    function saveAbsence() {
        if (reason === '') {
            swal.fire({
                icon: 'warning',
                title: 'Vänligen ange anledning till frånvaro',
            });
        };

        let saveAbsenceUrl = 'http://localhost:8080/educator/absence/' + childId + '/' + convertedDate + '/' + reason;
        axios.get(saveAbsenceUrl)
            .then(() => {
                swal.fire({
                    icon: 'success',
                    title: 'Frånvaro är sparad',
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function handleSavingAbsence() {
        saveAbsence();
    };

    function closeModal() {
        setModal(false);
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
                style={customStyles} >
                <div id="absence-form">
                    <div>
                        <div id="date-today-form">
                            <label className="font-size">
                                <input
                                    type="checkbox"
                                    id="checkbox-today"
                                    onChange={setDateToToday} />
                                Idag
                            </label>
                            <label
                                className="font-size">
                                Eller välj annan dag (tryck på datumet nedanför)
                            </label>
                        </div>
                        <div id="date-picker">
                            <DatePicker
                                locale="sv"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className="myDatePicker" />
                        </div>
                        <div id="reason-form">
                            <form>
                                <label className="font-size"> Anledning:
                                    <input
                                        type="text"
                                        id="reason"
                                        onChange={getReason} />
                                </label>
                            </form>
                        </div>
                        <label className="font-size">
                            <input
                                type="checkbox"
                                id="checkbox-offtime"
                                onChange={setReasonAsDayOff} />
                            Ledig
                        </label>
                    </div>
                    <div className="buttons-modal">
                        <button
                            className="save-button"
                            onClick={closeModal}>
                            Stäng
                        </button>
                        <button
                            onClick={handleSavingAbsence}
                            className="save-button">
                            Spara
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AbsenceForm;