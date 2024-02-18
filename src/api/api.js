export const getTransactions = async (p) => {
  const url = p
    ? `http://localhost:3000/transactions?p=${p}`
    : `http://localhost:3000/transactions`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const searchTransactions = async (searchTerm, p) => {
  const url = `http://localhost:3000/transactions/search?query=${searchTerm}&p=${p}`
  const response = await fetch(url)
  const result = await response.json()
  return result 
}
