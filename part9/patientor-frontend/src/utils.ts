import { green, yellow, red, amber } from "@material-ui/core/colors";

export function getIcon(rating: number) {
  switch (rating) {
    case 0:
      return green[500];
    case 1:
      return yellow[500];
    case 2:
      return amber[500];
    case 3:
      return red[500];
    default:
      return "black";
  }
}
