import useCount from "./useCount";

const DEFINITIONS_PER_PAGES = 5;

const usePages = ({ author, word } = {}) =>
  Math.ceil(useCount({ author, word }) / DEFINITIONS_PER_PAGES);

export default usePages;
