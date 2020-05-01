import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { withApollo } from "@apollo/client";

import { useVillagerQuery, VillagerQuery } from "@query/villager";

import { Gender, Personality, StarSign, Species } from "@gen/common/graphql";
import { NextPage } from "next";

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

export default withApollo(Villager);
