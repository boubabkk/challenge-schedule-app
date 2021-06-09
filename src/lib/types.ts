export type IAppt = {
    id: string,
    requestedDate: string,
    requestReason: string,
    patientID: string,
    doctorID: string,
    status: string,
    statusReason: string
}
  
export type IDoctor = {
    id: string,
    name: string,
    photoURL: string,
    type: string
}

export type IPatient = {
    id: string,
    name: string,
    photoURL: string,
    type: string
}