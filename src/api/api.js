export const getTransactions = async (p) => {
  const url = p
    ? `https://yaya-coding-challenge.onrender.com/transactions?p=${p}`
    : `https://yaya-coding-challenge.onrender.com/transactions`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const searchTransactions = async (searchTerm, p) => {
  const url = `https://yaya-coding-challenge.onrender.com/transactions/search?query=${searchTerm}&p=${p}`
  const response = await fetch(url)
  const result = await response.json()
  return result 
}
