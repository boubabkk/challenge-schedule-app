import { useState, useEffect } from "react"

import './ApptList.css';
import ApptItem from '../ApptItem';
import {IAppt, IDoctor, IPatient} from '../../lib/types';
import { API_ROOT } from "../../constants";

export default function ApptList() {
  //states for appointments
  const [appointments, setAppointments] = useState<IAppt[]>([])
  //states for doctors
  const [doctors, setDoctors] = useState<IDoctor[]>([])
  //states for patients
  const [patients, setPatients] = useState<IPatient[]>([])

  //load list of appointments, doctors, patients on component mount
  useEffect(() => {

    fetch("/api-v1/appointments")
      .then((res) => res.json())
      .then((json) => {
        setAppointments(json.appointments)
    })
    .catch((err: Error) => console.log(err))

    fetch("/api-v1/doctors")
      .then((res) => res.json())
      .then((json) => {
        setDoctors(json.doctors)
    })
    .catch((err: Error) => console.log(err))

    fetch("/api-v1/patients")
      .then((res) => res.json())
      .then((json) => {
        setPatients(json.patients)
    })
    .catch((err: Error) => console.log(err))

  }, [])
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

  return (
    <>
      <h1>Appointments</h1>
      <section className="new-appointment-section">
        <h3>NEW</h3>
        {appointments.map((appointment:IAppt) => {
          let patient = patients.find(p => p.id === appointment.patientID);
          let doctor = doctors.find(d => d.id === appointment.doctorID);
          return (
            (appointment.status === 'new') && 
            <ApptItem 
              key={appointment.id}
              appointment={appointment} 
              patient={patient} 
              doctor={doctor} 
              cancelAppt={handleCancelAppointment}
              confirmAppt={handleConfirmAppointment}
              completeAppt={handleCompleteAppointment} />
          )
        })}
      </section>
      <section className="confirmed-appointment-section">
        <h3>CONFIRMED</h3>
        {appointments.map((appointment:IAppt) => {
          let patient = patients.find(p => p.id === appointment.patientID);
          let doctor = doctors.find(d => d.id === appointment.doctorID);
          return (
            (appointment.status === 'confirmed') && 
            <ApptItem 
              key={appointment.id}
              appointment={appointment} 
              patient={patient} 
              doctor={doctor} 
              cancelAppt={handleCancelAppointment}
              confirmAppt={handleConfirmAppointment}
              completeAppt={handleCompleteAppointment} />
          )
        })}
      </section>
      <section className="completed-appointment-section">
        <h3>COMPLETED</h3>
        {appointments.map((appointment:IAppt) => {
          let patient = patients.find(p => p.id === appointment.patientID);
          let doctor = doctors.find(d => d.id === appointment.doctorID);
          return (
            (appointment.status === 'completed') && 
            <ApptItem 
              key={appointment.id}
              appointment={appointment} 
              patient={patient} 
              doctor={doctor} 
              cancelAppt={handleCancelAppointment}
              confirmAppt={handleConfirmAppointment}
              completeAppt={handleCompleteAppointment} />
          )
        })}
      </section>
      <section className="cancelled-appointment-section">
        <h3>CANCELLED</h3>
        {appointments.map((appointment:IAppt) => {
          let patient = patients.find(p => p.id === appointment.patientID);
          let doctor = doctors.find(d => d.id === appointment.doctorID);
          return (
            (appointment.status === 'cancelled') && 
            <ApptItem 
              key={appointment.id}
              appointment={appointment} 
              patient={patient} 
              doctor={doctor} 
              cancelAppt={handleCancelAppointment}
              confirmAppt={handleConfirmAppointment}
              completeAppt={handleCompleteAppointment} />
          )
        })}
      </section>
    </>
  )  
};

