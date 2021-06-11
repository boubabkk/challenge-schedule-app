import { useState, useEffect } from "react"
import {IPatient} from '../lib/types';
import { API_ROOT } from "../constants";

export default function usePatients() {
  //states for patients
  const [patients, setPatients] = useState<IPatient[]>([])

  //load list of  patients on component mount
  useEffect(() => {
    fetch(API_ROOT+"/patients")
        .then((res) => res.json())
        .then((json) => {
        setPatients(json.patients)
    })
    .catch((err: Error) => console.log(err))
  }, []);

  return { patients };
};

