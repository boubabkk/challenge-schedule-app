import { useState, useEffect } from "react"
import {IDoctor} from '../lib/types';
import { API_ROOT } from "../constants";

export default function useDoctors() {
  //states for doctors
  const [doctors, setDoctors] = useState<IDoctor[]>([])

  //load list of appointments, doctors, patients on component mount
  useEffect(() => {
    fetch(API_ROOT+"/doctors")
        .then((res) => res.json())
        .then((json) => {
        setDoctors(json.doctors)
    })
    .catch((err: Error) => console.log(err))
  }, []);

  return { doctors };
};

