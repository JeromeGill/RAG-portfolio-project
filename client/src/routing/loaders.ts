
import {
    LoaderFunctionArgs,
    redirect,
  } from "react-router-dom";
  
import { AuthProvider } from "@/auth/AuthProvider.ts";

export function loginLoader() {
    if (AuthProvider.isAuthenticated) {
      alert("You are logged in");
      return redirect("/");
    }
    return null;
  }
  
export function protectedLoader({ request }: LoaderFunctionArgs) {
    // If the user is not logged in and tries to access `/protected`, we redirect
    // them to `/login` with a `from` parameter that allows login to redirect back
    // to this page upon successful authentication
    if (!AuthProvider.isAuthenticated) {
      alert("You must be logged in to access this page");
      const params = new URLSearchParams();
      params.set("from", new URL(request.url).pathname);
      return redirect("/login?" + params.toString());
    }
    return null;
}
