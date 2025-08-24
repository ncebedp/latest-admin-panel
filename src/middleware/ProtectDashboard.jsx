// import React, {useContext} from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
// import StoreContext from '../context/storeContext';

// const ProtectDashboard = () => {
// const {store} = useContext(StoreContext);
// // console.log(store);
//     if (store.userInfo) {
//         return <Outlet />
//     } else {
//         return <Navigate to="/login" />
//     }
   
// };

// export default ProtectDashboard;

import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import StoreContext from '../context/storeContext';

const ProtectDashboard = () => {
  const { store } = useContext(StoreContext);

  if (store.loading) {
    return <div>Loading...</div>;
  }

  if (!store.userInfo) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectDashboard;
