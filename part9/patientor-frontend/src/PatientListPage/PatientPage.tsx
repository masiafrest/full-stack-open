import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { Typography } from "@material-ui/core";
import { useStateValue } from "../state";
import DiagnoseList from "./DiagnoseList";

export default function PatientPage() {
  const [state, dispatch] = useStateValue();
  const patient = state.fetchedPatient;
  const params = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "SET_FETCHED_PATIENT", payload: patientFromApi });
      } catch (error) {
        console.log(error);
      }
    };

    if (params.id !== patient?.id) {
      params.id && void fetchPatient(params.id);
    }
  }, []);
  if (!patient) {
    return <span>no patient</span>;
  }

  return (
    <>
      <Typography variant="h2">{patient.name}</Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <Typography variant="h3">entries</Typography>
      {patient.entries.map((entry) => {
        // switch (entry.type) {
        //   case "HealthCheck":
        //     break;
        //   case "OccupationalHealthcare":
        //     break;
        //   case "Hospital":
        //     break;
        //   default:
        //     break;
        // }

        return (
          <>
            <span>{entry.description}</span>
            {entry.diagnosisCodes && (
              <DiagnoseList diagnosisCodes={entry.diagnosisCodes} />
            )}
          </>
        );
      })}
    </>
  );
}
