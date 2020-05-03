import React from "react";
import { Scalars } from "@gen/common/graphql";

import useLocalStorage from "@components/hooks/useLocalStorage";

export interface CurrentInhabitantsContextType {
  currentInhabitants: Scalars["ID"][];
  addCurrentInhabitant: (currentInhabitantId: Scalars["ID"]) => void;
  removeCurrentInhabitant: (currentInhabitantId: Scalars["ID"]) => void;
}

export const CurrentInhabitantsContext = React.createContext<
  CurrentInhabitantsContextType
>({
  currentInhabitants: [],
  addCurrentInhabitant: (currentInhabitantId) => {},
  removeCurrentInhabitant: (currentInhabitantId) => {},
});

const InhabitantsProvider: React.FC = (props) => {
  const [
    currentInhabitants,
    setInhabitants,
  ] = useLocalStorage("currentInhabitants", [
    "Filbert",
    "Octavian",
    "Julian",
    "Phoebe",
    "Flora",
    "Peck",
    "Fauna",
    "Tom",
    "Judy",
    "Snooty",
  ]);

  const addCurrentInhabitant: CurrentInhabitantsContextType["addCurrentInhabitant"] = (
    villagerId
  ) => {
    setInhabitants(currentInhabitants.concat([villagerId]));
  };

  const removeCurrentInhabitant: CurrentInhabitantsContextType["removeCurrentInhabitant"] = (
    villagerId
  ) => {
    setInhabitants(currentInhabitants.filter((a) => a !== villagerId));
  };

  return (
    <CurrentInhabitantsContext.Provider
      value={{
        currentInhabitants,
        addCurrentInhabitant,
        removeCurrentInhabitant,
      }}
    >
      {props.children}
    </CurrentInhabitantsContext.Provider>
  );
};

export default InhabitantsProvider;
