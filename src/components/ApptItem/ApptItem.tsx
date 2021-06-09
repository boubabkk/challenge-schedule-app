import './ApptItem.css';

import {IAppt, IDoctor, IPatient} from '../../lib/types';

interface Props {
  appointment: IAppt,
  doctor?: IDoctor,
  patient?: IPatient,
}
export default function ApptItem({ appointment, doctor, patient }: Props) {
  return (
    <div className="appt-row">
      <div className="appt-patient">
        <p><strong>Patient: </strong>{patient === undefined ? "unassigned": patient.name}</p>
        {
          patient !== undefined &&
          <img src={patient.photoURL} className="patient-img" alt={patient.name} />
        }
      </div>
      <div className="appt-info">
        <p><strong>Date: </strong>{new Date(appointment.requestedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })}</p>
        <p><strong>Reason: </strong><br/> {appointment.requestReason}</p>
        
        {
          (appointment.status === 'completed' || appointment.status === 'cancelled')  &&
          <p>
            <strong>
              {appointment.status ==='completed' ? "Diagnosis: " : "Reason for Cancellation: " } 
            </strong> <br/>
            {appointment.statusReason}
          </p>
        }
      </div>
      <div className="appt-doctor">
        <p><strong>Doctor: </strong>{doctor === undefined ? "unassigned": doctor.name}</p>
        {
          doctor !== undefined &&
          <img src={doctor.photoURL} className="doctor-img" alt={doctor.name} /> 
        }
      </div>
    </div>
  );
};

