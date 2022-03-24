import { useQuery } from "@apollo/client";
import { ME, ALL_BOOKS } from "../queries";
import BookTable from "./BookTable";

export default function Recommend({ show }) {
  const me = useQuery(ME);
  const books = useQuery(ALL_BOOKS, {
    variables: { genre: me.data?.me.favoriteGenre },
    skip: me.loading || !me.data?.me?.id,
  });

  if (!show) return null;

  if (me.loading) {
    return <div>...loading</div>;
  }
  const favoriteGenre = me.data?.me.favoriteGenre;
  return (
    <>
      <h2>Recommendations</h2>
      <span>books in your favorite genre {favoriteGenre}</span>
      {books.data?.allBooks.length === 0 ? (
        <div>no books on genre {favoriteGenre}</div>
      ) : (
        <BookTable books={books.data?.allBooks || []} />
      )}
    </>
  );
}
