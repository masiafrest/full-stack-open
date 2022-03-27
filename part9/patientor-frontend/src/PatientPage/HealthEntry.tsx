import { HealthCheckEntry } from "../types";

import { getIcon } from "../utils";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Typography, Box } from "@material-ui/core";

export default function HealthEntry({ entry }: { entry: HealthCheckEntry }) {
  const color = getIcon(entry.healthCheckRating);
  return (
    <Box style={{ border: "2px solid black" }}>
      <Typography>{entry.date}</Typography>
      <Typography>{entry.description}</Typography>
      <FavoriteIcon style={{ color }} />
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  );
}
