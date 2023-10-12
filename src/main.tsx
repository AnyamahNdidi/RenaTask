import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { element } from "./routes/Allroutes.tsx"
import { GlobalStyles } from "./assets/style/GlobalAtyles.tsx"
import { Provider } from "react-redux"
import { store } from "./Global/store.tsx"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools  initialIsOpen={false}/ >
                    <GlobalStyles/>
        <RouterProvider router={element}/>
        
      </QueryClientProvider>
    
      </Provider>
    
  </React.StrictMode>
)
