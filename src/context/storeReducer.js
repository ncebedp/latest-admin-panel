// import React from 'react';
// import decode_token from '../utils';

// const storeReducer = (state, action) => {
//     const {type, payload} = action;
//     if (type === "login_success") {
//         state.token = payload.token;
//         state.userInfo = decode_token(payload.token);
//     }
//     if (type === "logout") {
//         state.token = "";
//         state.userInfo = "";
//     }
//     return state;
// };

// export default storeReducer;

import decode_token from '../utils';

const storeReducer = (state, action) => {
  const { type, payload } = action;

  if (type === "login_success") {
    return {
      ...state,
      token: payload.token,
      userInfo: decode_token(payload.token)
    };
  }

  if (type === "logout") {
    return {
      ...state,
      token: "",
      userInfo: null
    };
  }

  return state;
};

export default storeReducer;
