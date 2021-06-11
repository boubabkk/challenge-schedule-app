import { useState, useEffect } from "react"
import {IAppt} from '../lib/types';
import { API_ROOT } from "../constants";

export default function useAppointments() {
  //states for appointments
  const [appointments, setAppointments] = useState<IAppt[]>([])
  //load list of appointments, doctors, patients on component mount
  useEffect(() => {
    fetch(API_ROOT+"/appointments")
      .then((res) => res.json())
      .then((json) => {
        setAppointments(json.appointments)
    })
    .catch((err: Error) => console.log(err))
  }, []);
  //change appointment status when click cancel button
  const handleCancelAppointment = (appointment:IAppt) => {
    fetch(API_ROOT+"/appointments/"+appointment.id, {
      method: 'DELETE',
      body: JSON.stringify({reason: "Met with another doctor"}),
    })
      .then((res) => res.json())
      .then((json) => {
        let index = appointments.findIndex((appt) => appt.id === appointment.id);
        appointments[index].status = 'cancelled';
        appointments[index].statusReason = 'Met with another doctor';
        setAppointments([...appointments]);
    })
    .catch((err: Error) => console.log(err))
  };
  //change appointment status when click confirm button
  const handleConfirmAppointment = (appointment:IAppt) => {
    fetch(API_ROOT+"/appointments/"+appointment.id+"/confirm", {
      method: 'POST',
      body: JSON.stringify({doctorID: "1"}),
    })
      .then((res) => res.json())
      .then((json) => {
        let index = appointments.findIndex((appt) => appt.id === appointment.id);
        appointments[index].status = 'confirmed';
        appointments[index].doctorID = "1";
        setAppointments([...appointments]);
    })
    .catch((err: Error) => console.log(err))
  };
  //change appointment status when click complete button
  const handleCompleteAppointment = (appointment:IAppt) => {
    const index = appointments.findIndex((appt) => appt.id === appointment.id);
    appointments[index].status = 'completed';
    appointments[index].statusReason = 'completed';
		setAppointments([...appointments]);
  };

  return {appointments, handleCancelAppointment, handleConfirmAppointment, handleCompleteAppointment};
};

