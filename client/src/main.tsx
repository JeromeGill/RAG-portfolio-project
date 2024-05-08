import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { 
  QueryClient, 
  QueryClientProvider
} from '@tanstack/react-query'
import { Layout } from '@/layouts'
import { router } from '@/routing'
import { WorkspaceProvider } from './contexts/workspace/WorkspaceProvider';

const queryClient = new QueryClient()

// @todo we need a logged in version of the tree
// Workspace provider makes no sense until you are logged in, and the layout should be different

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <WorkspaceProvider>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
    </WorkspaceProvider>
  </QueryClientProvider>
  </React.StrictMode>,
)
