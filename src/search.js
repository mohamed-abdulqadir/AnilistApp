import { createContext } from "react";

export const SearchContext = createContext({
  input: "",
  setInput: () => {},
  filtered: "",
  setFiltered: () => {},
  sortBy: "",
  setSortBy: () => {},
  setToken: () => {},
  removeToken: () => {},
  info: [],
  type: "",
  setType: () => {},
  totalAnime: "",
  setTotalAnime: () => {},
  submitted: "",
  setSubmitted: () => {},
  token: "",
});
