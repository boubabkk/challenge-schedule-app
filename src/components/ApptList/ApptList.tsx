
import './ApptList.css';
import ApptItem from '../ApptItem';
import {IAppt, IDoctor, IPatient} from '../../lib/types';
import useAppointments from "../../hooks/useAppointments";
import useDoctors from "../../hooks/useDoctors";
import usePatients from "../../hooks/usePatients";

interface Props {
  appointments: IAppt[],
  doctors: IDoctor[],
  patients: IPatient[],
  status: string,
  handleCancelAppointment: (appt: IAppt) => void,
  handleCompleteAppointment: (appt: IAppt) => void,
  handleConfirmAppointment: (appt: IAppt) => void,
}

function FilteredApptList(props: Props) {
  const { appointments, doctors, patients, status } = props;
  const { handleCancelAppointment, handleCompleteAppointment, handleConfirmAppointment } = props;
    const filteredAppts = appointments.filter(appt => appt.status === status);
    return <> {filteredAppts.map((appointment:IAppt) => {
      let patient = patients.find(p => p.id === appointment.patientID);
      let doctor = doctors.find(d => d.id === appointment.doctorID);
      return (
        <ApptItem 
          key={appointment.id}
          appointment={appointment} 
          patient={patient} 
          doctor={doctor} 
          cancelAppt={handleCancelAppointment}
          confirmAppt={handleConfirmAppointment}
          completeAppt={handleCompleteAppointment} />
      )
    })} </>
}

export default function ApptList() {
  
  const {
    appointments, 
    handleConfirmAppointment, 
    handleCancelAppointment, 
    handleCompleteAppointment
  } = useAppointments(); 

  //get doctors
  const { doctors } = useDoctors();
  //get patients
  const { patients } = usePatients();

  return (
    <>
      <h1>Appointments</h1>
      <section className="new-appointment-section">
        <h3>NEW</h3>
        <FilteredApptList 
          status='new'
          {...{appointments, patients, doctors, handleCancelAppointment, handleConfirmAppointment, handleCompleteAppointment}}
        />
      </section>
      <section className="confirmed-appointment-section">
        <h3>CONFIRMED</h3>
        <FilteredApptList 
          status='confirmed'
          {...{appointments, patients, doctors, handleCancelAppointment, handleConfirmAppointment, handleCompleteAppointment}}
        />
      </section>
      <section className="completed-appointment-section">
        <h3>COMPLETED</h3>
        <FilteredApptList 
          status='completed'
          {...{appointments, patients, doctors, handleCancelAppointment, handleConfirmAppointment, handleCompleteAppointment}}
        />
      </section>
      <section className="cancelled-appointment-section">
        <h3>CANCELLED</h3>
        <FilteredApptList 
          status='cancelled'
          {...{appointments, patients, doctors, handleCancelAppointment, handleConfirmAppointment, handleCompleteAppointment}}
        />
      </section>
    </>
  )  
};

