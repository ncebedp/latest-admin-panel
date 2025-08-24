// import React, { useContext} from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
// import StoreContext from '../context/storeContext';

// const ProtectRoll = ({role}) => {
// const {store} = useContext(StoreContext);
//     if (store.userInfo?.role === role) {
//         return <Outlet />
//     } else {
//         return <Navigate to="/dashboard/unable-access" />
//     }
// };

// export default ProtectRoll;

import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import StoreContext from '../context/storeContext';

const ProtectRoll = ({ role }) => {
  const { store } = useContext(StoreContext);

  if (store.loading) {
    return <div>Loading...</div>;
  }

  if (store.userInfo?.role !== role) {
    return <Navigate to="/dashboard/unable-access" replace />;
  }

  return <Outlet />;
};

export default ProtectRoll;
