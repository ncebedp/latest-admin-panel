import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StoreContext from './context/storeContext';

// Pages
import Login from "./dashboard/pages/Login";
import MainLayout from "./dashboard/layout/MainLayout";
import Adminindex from "./dashboard/pages/Adminindex";
import Writerindex from './dashboard/pages/Writerindex';
import Unable from "./dashboard/pages/Unable";
import Profile from './dashboard/pages/Profile';
import News from './dashboard/pages/News';
import AddWriter from './dashboard/pages/AddWriter';
import Writers from './dashboard/pages/Writers';
import CreateNews from './dashboard/pages/CreateNews';
import EditWriter from './dashboard/pages/EditWriter';
import EditNews from './dashboard/pages/EditNews';

// Middleware
import ProtectDashboard from "./middleware/ProtectDashboard";
import ProtectRoll from "./middleware/ProtectRoll";

function App() {
  const { store } = useContext(StoreContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected dashboard routes */}
        <Route path="/dashboard" element={<ProtectDashboard />}>
          <Route path="" element={<MainLayout />}>

            {/* Default redirect after login */}
            <Route
              index
              element={
                store.userInfo?.role === "admin"
                  ? <Navigate to="admin" replace />
                  : store.userInfo?.role === "writer"
                  ? <Navigate to="writer" replace />
                  : <Navigate to="unable-access" replace />
              }
            />

            {/* Shared routes for all logged in users */}
            <Route path="unable-access" element={<Unable />} />
            <Route path="profile" element={<Profile />} />
            <Route path="news" element={<News />} />
            <Route path="news/create" element={<CreateNews />} />
            <Route path="news/edit/:news_id" element={<EditNews />} />

            {/* Admin-only routes */}
            <Route element={<ProtectRoll role="admin" />}>
              <Route path="admin" element={<Adminindex />} />
              <Route path="writer/add" element={<AddWriter />} />
              <Route path="writers" element={<Writers />} />
              <Route path="writer/edit/:id" element={<EditWriter />} />
            </Route>

            {/* Writer-only routes */}
            <Route element={<ProtectRoll role="writer" />}>
              <Route path="writer" element={<Writerindex />} />
            </Route>

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
