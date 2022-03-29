import { StyleSheet } from "react-native";
import { Text, View } from "react-native-web";
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
