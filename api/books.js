// https://openlibrary.org/dev/docs/api/

// Fetch all books given a query
export async function getBooks(query, limit) {
  const res = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&fields=title,key,cover_edition_key,editions,editions.key&limit=${limit}`
  );
  if (!res.ok) throw Error("Failed to fetch books");

  const books = await res.json();

  return books;
}

// Fetch book data given a key
export async function getBookData(key) {
  const res = await fetch(
    `https://openlibrary.org/works/${key}.json`
  );
  if (!res.ok) throw Error("Failed to fetch book data");

  const bookData = await res.json();

  return bookData;
}