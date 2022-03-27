import { OccupationalHealthCareEntry } from "../types";
import { Typography, Box } from "@material-ui/core";

export default function OccupationalEntry({
  entry,
}: {
  entry: OccupationalHealthCareEntry;
}) {
  return (
    <Box style={{ border: "2px solid black" }}>
      <Typography>
        {entry.date} {entry.employerName}
      </Typography>
      <Typography>{entry.description}</Typography>
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  );
}
