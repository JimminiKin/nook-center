import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { withApollo, createApolloClient } from "@apollo/client";

import {
  useVillagerQuery,
  VillagerQuery,
  VillagerDocument,
} from "@query/villager";

import { Gender, Personality, StarSign, Species } from "@gen/common/graphql";
import { NextPage } from "next";

export const getStaticPaths = async () => {
  const data = require("@data/villagers.json");

  return {
    paths: data.map((villager) => `/villager/${villager.id}`),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const apolloClient = createApolloClient();
  await apolloClient.query({
    query: VillagerDocument,
    variables: { villagerId: params.id },
  });
  return {
    props: {
      apolloState: apolloClient.cache.extract(),
    },
  };
};

const Villager: NextPage = () => {
  const router = useRouter();

  const { loading, error, data } = useVillagerQuery({
    variables: {
      villagerId: router.query.id as string,
    },
  });

  if (error) {
    throw new Error("Error searching for villagers");
  }

  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      {loading ? (
        <div className="items-center flex justify-around p-56">
          <h4>Loading ...</h4>
        </div>
      ) : (
        <pre>{JSON.stringify(data.villager)}</pre>
      )}
    </>
  );
};

export default withApollo(Villager, { ssr: false });
