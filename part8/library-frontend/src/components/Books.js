import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const result = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading..</div>;
  }
  const books = result.data?.allBooks || [];
  const uniqueGenre = new Set();
  books.forEach((book) => {
    book.genres.forEach((genre) => uniqueGenre.add(genre));
  });

  return (
    <div>
      <h2>books</h2>
      {genre && <span>in genre {genre}</span>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => (genre ? book.genres.includes(genre) : book))
            .map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {[...uniqueGenre].map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      {genre && <button onClick={() => setGenre(null)}>All</button>}
    </div>
  );
};

export default Books;
