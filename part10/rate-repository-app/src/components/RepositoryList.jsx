import { FlatList, View, StyleSheet } from "react-native";
import useRepositories from "../hooks/useRepositories";
// import repositories from "../../data/repositories";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;
export const renderItem = ({ item }) => <RepositoryItem repository={item} />;

const RepositoryList = () => {
  const { data } = useRepositories();
  const repositories = data?.repositories;
  const respositoryNode = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={respositoryNode}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(repo) => repo.id}
    />
  );
};

export default RepositoryList;
