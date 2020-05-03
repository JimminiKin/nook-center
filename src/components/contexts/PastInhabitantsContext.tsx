import React from "react";
import { Scalars } from "@gen/common/graphql";

import useLocalStorage from "@components/hooks/useLocalStorage";

export interface PastInhabitantsContextType {
  pastInhabitants: Scalars["ID"][];
  addPastInhabitant: (pastInhabitantId: Scalars["ID"]) => void;
  removePastInhabitant: (pastInhabitantId: Scalars["ID"]) => void;
}

export const PastInhabitantsContext = React.createContext<
  PastInhabitantsContextType
>({
  pastInhabitants: [],
  addPastInhabitant: (pastInhabitantId) => {},
  removePastInhabitant: (pastInhabitantId) => {},
});

const InhabitantsProvider: React.FC = (props) => {
  const [pastInhabitants, setInhabitants] = useLocalStorage("pastInhabitants", [
    "Reneigh",
    "Louie",
    "Huck",
    "Chadder",
    "Alli",
    "Lyman",
    "Dizzy",
  ]);

  const addPastInhabitant: PastInhabitantsContextType["addPastInhabitant"] = (
    villagerId
  ) => {
    setInhabitants(pastInhabitants.concat([villagerId]));
  };

  const removePastInhabitant: PastInhabitantsContextType["removePastInhabitant"] = (
    villagerId
  ) => {
    setInhabitants(pastInhabitants.filter((a) => a !== villagerId));
  };

  return (
    <PastInhabitantsContext.Provider
      value={{ pastInhabitants, addPastInhabitant, removePastInhabitant }}
    >
      {props.children}
    </PastInhabitantsContext.Provider>
  );
};

export default InhabitantsProvider;
