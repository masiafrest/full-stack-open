import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";

import { Typography, Button } from "@material-ui/core";
import { useStateValue } from "../state";

import { Patient, EntryFormValues, Entry } from "../types";

import EntryDetails from "./EntryDetails";
import AddEntryModal from "./AddEntryModal";

export default function PatientPage() {
  const [state, dispatch] = useStateValue();
  const patient = state.fetchedPatient;
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const res = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id as string}/entries`,
        values
      );
      dispatch({ type: "ADD_ENTRY", payload: res.data });
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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

    if (id !== patient?.id) {
      id && void fetchPatient(id);
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
        return (
          <div style={{ margin: "5px 0" }} key={entry.id}>
            <EntryDetails entry={entry} />
          </div>
        );
      })}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </>
  );
}
