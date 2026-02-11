import React, { useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContext } from './toastContext';

export function ToastProvider({ children }) {
  const api = useMemo(
    () => ({
      success: (message, durationMs = 3200) => toast.success(message, { autoClose: durationMs }),
      error: (message, durationMs = 3200) => toast.error(message, { autoClose: durationMs }),
      info: (message, durationMs = 3200) => toast.info(message, { autoClose: durationMs }),
    }),
    []
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </ToastContext.Provider>
  );
}


