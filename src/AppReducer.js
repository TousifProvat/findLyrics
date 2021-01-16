// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case 'GET_TRACKS':
      return {
        ...state,
        track_list: action.payload,
      };
    case 'SEARCH_TRACKS':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search Results',
      };
    default:
      return state;
  }
};
