import { useQuery } from "@apollo/client";
import { ME } from "../queries";

export default function Recommend() {
  const result = useQuery(ME);
  if (result.loading) {
    return <div>...loading</div>;
  }

  return (
    <>
      <h2>Recommendations</h2>
      <span>books in your favorite genre {result.data.me.favoriteGenre}</span>
    </>
  );
}
