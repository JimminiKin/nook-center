import { withApollo } from "../apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";

const Index = () => {
  return (
    <div className="p-10 text-center">
      <h1 className="text-green-900 font-bold text-5xl">
        Welcome to Nook Center
      </h1>
      <p className="p-4 mt-4 text-xl">
        Use the menu, I'm too lazy to write anything here now
      </p>
      <p className="p-4 text-xl">
        Oh and islands page doesn't work as of now ...
      </p>
    </div>
  );
};

export default withApollo(Index);
