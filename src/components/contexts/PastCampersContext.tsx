import React from "react";
import { Scalars } from "@gen/common/graphql";

import useLocalStorage from "@components/hooks/useLocalStorage";

export interface PastCampersContextType {
  pastCampers: Scalars["ID"][];
  addPastCamper: (pastCamperId: Scalars["ID"]) => void;
  removePastCamper: (pastCamperId: Scalars["ID"]) => void;
}

export const PastCampersContext = React.createContext<PastCampersContextType>({
  pastCampers: [],
  addPastCamper: (pastCamperId) => {},
  removePastCamper: (pastCamperId) => {},
});

const PastCampersProvider: React.FC = (props) => {
  const [pastCampers, setPastCampers] = useLocalStorage("pastCampers", [
    "Tank",
    "Olaf",
    "Frank",
    "Ken",
    "Bubbles",
    "Cally",
    "Lionel",
    "Leopold",
    "Lopez",
    "Shep",
    "Klaus",
    "Chops",
    "Clay",
    "Iggly",
    "Boomer",
    "Hans",
    "Pudge",
    "Henry",
    "Graham",
    "Marshal",
    "Rodney",
    "Dobie",
    "Keaton",
    "Cousteau",
    "Quillson",
    "Kidd",
    "Deli",
    "Colton",
    "Eugene",
    "Sylvana",
    "Zell",
    "Olive",
    "Beardo",
    "Camofrog",
  ]);

  const addPastCamper: PastCampersContextType["addPastCamper"] = (
    villagerId
  ) => {
    setPastCampers(pastCampers.concat([villagerId]));
  };

  const removePastCamper: PastCampersContextType["removePastCamper"] = (
    villagerId
  ) => {
    setPastCampers(pastCampers.filter((a) => a !== villagerId));
  };

  return (
    <PastCampersContext.Provider
      value={{ pastCampers, addPastCamper, removePastCamper }}
    >
      {props.children}
    </PastCampersContext.Provider>
  );
};

export default PastCampersProvider;
