import { HospitalEntry } from "../types";
import { Typography, Box } from "@material-ui/core";

export default function HospitalEntries({ entry }: { entry: HospitalEntry }) {
  return (
    <Box style={{ border: "2px solid black" }}>
      <Typography>{entry.date}</Typography>
      <Typography>{entry.description}</Typography>
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  );
}
