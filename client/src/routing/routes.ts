
import { createBrowserRouter } from "react-router-dom";

import { LoginPage, ChatbotPage }  from '@/pages';
import { loginLoader, protectedLoader } from './loaders.ts';

export const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          Component: ChatbotPage,
          loader: protectedLoader,
        },
        {
          path: "login",
          Component: LoginPage,
          loader: loginLoader,
        },
      ],
    },
  ]);

