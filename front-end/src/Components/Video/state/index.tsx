import * as firebase from "firebase";
import ky from "ky";
import React, { createContext, useContext, useState } from "react";
import { TwilioError } from "twilio-video";

export interface StateContextType {
  error: TwilioError | null;
  setError(error: TwilioError | null): void;
  getToken(name: string, room: string): Promise<string>;
  user: firebase.User | null;
  groupId: string;
  isFetching: boolean;
}

export const StateContext = createContext<StateContextType>(null!);

/*
  The 'react-hooks/rules-of-hooks' linting rules prevent React Hooks fron being called
  inside of if() statements. This is because hooks must always be called in the same order
  every time a component is rendered. The 'react-hooks/rules-of-hooks' rule is disabled below
  because the "if (process.env.REACT_APP_SET_AUTH === 'firebase')" statements are evaluated
  at build time (not runtime). If the statement evaluates to false, then the code is not
  included in the bundle that is produced (due to tree-shaking). Thus, in this instance, it
  is ok to call hooks inside if() statements.
*/

declare interface AppStateProviderProps {
  currentUser: firebase.User | null;
}
export default function AppStateProvider(
  props: React.PropsWithChildren<AppStateProviderProps>
) {
  const [error, setError] = useState<TwilioError | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  let contextValue = {
    error,
    setError,
    isFetching,
    groupId: window.location.href.substring(
      window.location.href.indexOf("?groupId=") + 9,
      window.location.href.length
    ),
    user: props.currentUser
  } as StateContextType;

  contextValue = {
    ...contextValue,
    getToken: async (userId, groupId) => {
      return ky
        .post(
          "https://us-central1-hoohacks2020-gcp.cloudfunctions.net/grant_video_token",
          {
            body: JSON.stringify({ userId, groupId })
          }
        )
        .then(res => res.text().then(text => text));
    }
  };

  const getToken: StateContextType["getToken"] = (name, room) => {
    setIsFetching(true);
    return contextValue
      .getToken(name, room)
      .then(res => {
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  return (
    <StateContext.Provider value={{ ...contextValue, getToken }}>
      {props.children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppStateProvider");
  }
  return context;
}
