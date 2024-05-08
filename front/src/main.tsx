import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SideBarContextProvider } from "contexts/SidebarContext.tsx";
import { FavoritesMoviesContextProvider } from "contexts/favoritesMoviesContext.tsx";
import { LastTitleContextProvider } from "contexts/LastSearchedTitle.tsx";
import { WatchedListContextProvider } from "contexts/WatchedListContext.tsx";
import { LoginContextProvider } from "contexts/LoginContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
        <LoginContextProvider>
          <LastTitleContextProvider>
            <WatchedListContextProvider>
              <FavoritesMoviesContextProvider>
                <SideBarContextProvider>
                  <App />
                </SideBarContextProvider>
              </FavoritesMoviesContextProvider>
            </WatchedListContextProvider>
          </LastTitleContextProvider>
        </LoginContextProvider>
  </React.StrictMode>
);
