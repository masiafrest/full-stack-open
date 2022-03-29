import { FlatList, View, StyleSheet } from "react-native";
import repositories from "../../data/repositories";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;
export const renderItem = ({ item }) => <RepositoryItem repository={item} />;

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(repo) => repo.id}
    />
  );
};

export default RepositoryList;
