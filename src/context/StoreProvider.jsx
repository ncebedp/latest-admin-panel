// import React , { useReducer} from 'react';
// import storeReducer from './storeReducer';
// import StoreContext from './storeContext';
// import decode_token from '../utils';

// const StoreProvider = ({children}) => {
//   const [store, dispatch] = useReducer(storeReducer,{
//     userInfo: decode_token(localStorage.getItem('newsToken')),
//     token: localStorage.getItem('newsToken') || ""
//   });
//   return <StoreContext.Provider value={{store, dispatch}}>
//       {children}
//     </StoreContext.Provider>



// };

// export default StoreProvider;
import React, { useReducer, useEffect, useState } from 'react';
import storeReducer from './storeReducer';
import StoreContext from './storeContext';

const StoreProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [store, dispatch] = useReducer(storeReducer, {
    userInfo: null,
    token: ""
  });

  useEffect(() => {
    const token = localStorage.getItem('newsToken');
    if (token) {
      dispatch({
        type: "login_success",
        payload: { token }
      });
    }
    setLoading(false);
  }, []);

  return (
    <StoreContext.Provider value={{ store: { ...store, loading }, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
