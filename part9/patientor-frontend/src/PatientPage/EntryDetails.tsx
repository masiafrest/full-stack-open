import { Entry } from "../types";
import HospitalEntries from "./HospitalEntries";
import HealthEntry from "./HealthEntry";
import OccupationalEntry from "./OccupationalEntry";

export default function EntryDetails({ entry }: { entry: Entry }) {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntries entry={entry} />;
    case "HealthCheck":
      return <HealthEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalEntry entry={entry} />;
    default:
      return <span>no entries</span>;
  }
}
