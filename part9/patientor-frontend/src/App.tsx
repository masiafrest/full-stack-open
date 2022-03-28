import React from "react";
import axios from "axios";
import { Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient, Diagnose } from "./types";

import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage/PatientPage";
import { Typography } from "@material-ui/core";

const App = () => {
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnoses } = await axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`);
        dispatch({ type: "SET_DIAGNOSES", payload: diagnoses });
      } catch (e) {
        console.error(e);
      }
    };

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
    void fetchDiagnoses();
  }, [dispatch]);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/patients/:id" element={<PatientPage />} />
          <Route path="/" element={<PatientListPage />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
