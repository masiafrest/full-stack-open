import { StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  margin: {
    margin: 30,
  },
});
export default function AppBarTab({ label, to }) {
  return (
    <View>
      <Link style={styles.margin} to={to}>
        <Text style={styles.text}>{label}</Text>
      </Link>
    </View>
  );
}
