import { Image, View, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.backGroundColor.white,
  },
  cardTop: {
    marginLeft: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    height: 50,
    width: 50,
  },
  outerLanguage: {
    marginTop: 10,
    marginBottom: 10,
  },
  language: {
    color: theme.backGroundColor.white,
    backgroundColor: theme.backGroundColor.blue,
    padding: 6,
    borderRadius: 6,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
}

export default function RepositoryItem({ repository }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginBottom: 20, height: 70 }}>
        <Image
          style={styles.image}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.cardTop}>
          <Text fontSize="subheading" fontWeight="bold">
            {repository.fullName}
          </Text>
          <Text fontSize="subheading">{repository.description}</Text>
          <Text style={styles.outerLanguage}>
            <Text style={styles.language}>{repository.language}</Text>
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.cardBottom}>
          <Text fontWeight="bold">
            {kFormatter(repository.stargazersCount)}
          </Text>
          <Text fontWeight="bold">{kFormatter(repository.forksCount)}</Text>
          <Text fontWeight="bold">{repository.reviewCount}</Text>
          <Text fontWeight="bold">{repository.ratingAverage}</Text>
        </View>
        <View style={styles.cardBottom}>
          <Text>Starts</Text>
          <Text>Forks</Text>
          <Text>Reviews</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
}
