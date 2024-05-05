
import { createBrowserRouter } from "react-router-dom";

import { Login }  from '@/pages/Login.tsx';
import { Chatbot } from '@/pages/Chatbot.tsx';
import { loginLoader, protectedLoader } from './loaders.ts';

export const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          Component: Chatbot,
          loader: protectedLoader,
        },
        {
          path: "login",
          Component: Login,
          loader: loginLoader,
        },
      ],
    },
  ]);

