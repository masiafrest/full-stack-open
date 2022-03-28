import { State } from "./state";
import { Diagnose, Patient, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_FETCHED_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnose[];
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_FETCHED_PATIENT":
      return {
        ...state,
        fetchedPatient: action.payload,
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload,
      };
    case "ADD_ENTRY":
      state.fetchedPatient?.entries.push(action.payload);
      return {
        ...state,
      };
    default:
      return state;
  }
};
