import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { NextPage } from "next";
import Link from "next/link";
import InfiniteScroller from "react-infinite-scroller";

import { withApollo } from "@apollo/client";

import { ucfirst, getGenderEmoji, getZodiacEmoji } from "@modules/utils";
// import CampsiteProbability from "@components/Villager/CampsiteProbability";

const CampsiteProbability = dynamic(
  () => import("@components/Villager/CampsiteProbability"),
  { ssr: false }
);

import {
  useVillagersSearchQuery,
  VillagersSearchQuery,
} from "@query/villagersSearch";

import { Gender, Personality, StarSign, Species } from "@gen/common/graphql";
import { VillageStateInput } from "@gen/server/graphql";

const VillagerIndex: NextPage = (props) => {
  const [gender, setGender] = React.useState<string>("");
  const [personality, setPersonality] = React.useState<string>("");
  const [species, setSpecies] = React.useState<string>("");
  const [starSign, setStarSign] = React.useState<string>("");
  const [searchText, setSearchText] = React.useState<string>("");

  const { loading, error, data, fetchMore } = useVillagersSearchQuery({
    variables: {
      start: 30,
      search: {
        gender: Gender[gender] || undefined,
        personality: Personality[personality] || undefined,
        species: Species[species] || undefined,
        starSign: StarSign[starSign] || undefined,
        text: searchText || undefined,
      },
    },
  });

  if (error) {
    throw error;
  }

  return (
    <>
      <Head>
        <title>Villager Search - Nook Center</title>
      </Head>
      <div className="p-4 lg:flex lg:justify-evenly">
        <input
          type="text"
          className="inline-block p-2 px-3 rounded-lg m-4"
          value={searchText || ""}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Text Search"
        />

        <select
          value={gender || ""}
          className="inline-block p-2 m-4"
          onChange={(event) => setGender(event.target.value)}
        >
          <option value="">Gender</option>
          {Object.keys(Gender).map((key) => {
            return (
              <option key={key} value={key}>
                {ucfirst(Gender[key])}
              </option>
            );
          })}
        </select>
        <select
          value={species || ""}
          className="inline-block p-2 m-4"
          onChange={(event) => setSpecies(event.target.value || "")}
        >
          <option value="">Species</option>
          {Object.keys(Species).map((key) => (
            <option key={key} value={key}>
              {ucfirst(Species[key])}
            </option>
          ))}
        </select>
        <select
          value={starSign || ""}
          className="inline-block p-2 m-4"
          onChange={(event) => setStarSign(event.target.value || "")}
        >
          <option value="">Star Sign</option>
          {Object.keys(StarSign).map((key) => (
            <option key={key} value={key}>
              {ucfirst(StarSign[key])}
            </option>
          ))}
        </select>
        <select
          value={personality || ""}
          className="inline-block p-2 m-4"
          onChange={(event) => setPersonality(event.target.value || "")}
        >
          <option value="">Personality</option>
          {Object.keys(Personality).map((key) => (
            <option key={key} value={key}>
              {ucfirst(Personality[key])}
            </option>
          ))}
        </select>
        <button
          className="inline-block bg-green-900 text-gray-100 p-2 px-3 rounded-lg m-4"
          onClick={() => {
            setGender(undefined);
            setPersonality(undefined);
            setSpecies(undefined);
            setStarSign(undefined);
            setSearchText(undefined);
          }}
        >
          Reset
        </button>
      </div>
      {loading ? (
        <main className="items-center flex justify-around p-56">
          <h4>Loading Page ...</h4>
        </main>
      ) : (
        <InfiniteScroller
          element="ul"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4"
          hasMore={
            data && data.villagers ? data.villagers.pageInfo.hasNextPage : false
          }
          loadMore={() => {
            fetchMore({
              variables: {
                after: data.villagers.pageInfo.endCursor,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return {
                  villagers: {
                    edges: [
                      ...prev.villagers.edges,
                      ...fetchMoreResult.villagers.edges,
                    ],
                    pageInfo: fetchMoreResult.villagers.pageInfo,
                    __typename: prev.villagers.__typename,
                  },
                  __typename: prev.__typename,
                };
              },
            });
          }}
          loader={
            <li key="loader" className="items-center flex justify-center p-20">
              <h4>Loading More ...</h4>
            </li>
          }
        >
          {data.villagers.edges.map((edge) => {
            const { node: villager } = edge;
            return (
              <VillagerCard
                key={villager.id}
                villager={villager}
              ></VillagerCard>
            );
          })}
        </InfiniteScroller>
      )}
    </>
  );
};

const VillagerCard: React.FC<{
  villager: VillagersSearchQuery["villagers"]["edges"][0]["node"];
}> = ({ villager }) => {
  return (
    <li className="bg-white rounded-lg overflow-hidden border-gray-600 items-center flex justify-between p-4">
      <Link href="/villager/[id]" as={`/villager/${villager.id}`}>
        <div className="w-1/3 max-h-full cursor-pointer">
          <a>
            <img
              loading="lazy"
              className="block h-full w-full"
              src={villager.picture.medium}
              alt={`Picture of ${villager.name}`}
            />
          </a>
        </div>
      </Link>
      <div className="w-2/3 pl-4">
        <Link href="/villager/[id]" as={`/villager/${villager.id}`}>
          <h4 className="text-lg text-green-900 font-semibold cursor-pointer">
            {villager.name}
          </h4>
        </Link>
        <p>
          {ucfirst(villager.species)} |{" "}
          <span className="tooltip">
            {getGenderEmoji(villager.gender)}
            <span className="tooltip-text bg-green-200 rounded -ml-8 -mt-6">
              {ucfirst(villager.gender)}
            </span>
          </span>
        </p>
        <p>{ucfirst(villager.personality)}</p>
        <p>
          <span className="tooltip">
            {getZodiacEmoji(villager.starSign)}
            <span className="tooltip-text bg-green-200 rounded -ml-8 -mt-6">
              {ucfirst(villager.starSign)}
            </span>
          </span>
          <span className="ml-1 text-sm">{ucfirst(villager.birthday)}</span>
        </p>
        <p>
          <span className="tooltip">
            <span className="whitespace-no-wrap mr-1">
              <span className="mr-1">🏝</span>
              <span className="text-sm">
                {(villager.randomIslandSpawnProbability * 100).toFixed(2)}%
              </span>
            </span>
            <span className="tooltip-text bg-green-200 rounded -ml-8 -mt-6">
              <span>Probability of spawn on random island</span>
            </span>
          </span>

          <CampsiteProbability villagerId={villager.id}></CampsiteProbability>
        </p>
      </div>
    </li>
  );
};

export default withApollo(VillagerIndex);
