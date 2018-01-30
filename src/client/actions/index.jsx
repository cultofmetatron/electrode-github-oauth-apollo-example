export const toggleCheck = () => {
  return {
    type: "TOGGLE_CHECK"
  };
};

export const incNumber = () => {
  return {
    type: "INC_NUMBER"
  };
};

export const decNumber = () => {
  return {
    type: "DEC_NUMBER"
  };
};

export const updateSearchBox = ({query}) => {
  return {
    type: "SearchBox:searchTerm:update",
    query: query
  };
};

export const userLogin = ({accessToken}) => {
  return {
    type: "User:login",
    accessToken
  };
};