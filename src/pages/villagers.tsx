import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import Link from "next/link";
import InfiniteScroller from "react-infinite-scroller";

import Zodiac from "@components/Villager/Zodiac";
import GenderPersonality from "@components/Villager/GenderPersonality";

import { withApollo } from "@apollo/client";

import { ucfirst } from "@modules/utils";

import {
  useVillagersSearchQuery,
  VillagersSearchQuery,
} from "@query/villagersSearch";

import { Gender, Personality, StarSign, Species } from "@gen/common/graphql";

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
      villageState: {
        currentVillagers: [
          "Filbert",
          "Snooty",
          "Octavian",
          "Maddie",
          "Phoebe",
          "Flora",
          "Peck",
          "Fauna",
          "Dizzy",
          "Tom",
        ],
        pastVillagers: ["Reneigh", "Louie", "Huck", "Chadder", "Alli", "Lyman"],
        pastCampers: [
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
        ],
      },
    },
  });

  if (error) {
    throw new Error("Error searching for villagers " + error);
  }
  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      <div className="p-4 md:flex md:justify-evenly">
        <input
          type="text"
          className="block p-2 px-3 rounded-lg"
          value={searchText || ""}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Text Search"
        />
        <select
          value={gender || ""}
          className="p-2"
          onChange={(event) => setGender(event.target.value)}
        >
          <option value="">Gender</option>
          {Object.keys(Gender).map((key) => {
            return (
              <option key={key} value={key}>
                {Gender[key]}
              </option>
            );
          })}
        </select>
        <select
          value={species || ""}
          className="p-2"
          onChange={(event) => setSpecies(event.target.value || "")}
        >
          <option value="">Species</option>
          {Object.keys(Species).map((key) => (
            <option key={key} value={key}>
              {Species[key]}
            </option>
          ))}
        </select>
        <select
          value={starSign || ""}
          className="p-2"
          onChange={(event) => setStarSign(event.target.value || "")}
        >
          <option value="">Star Sign</option>
          {Object.keys(StarSign).map((key) => (
            <option key={key} value={key}>
              {StarSign[key]}
            </option>
          ))}
        </select>
        <select
          value={personality || ""}
          className="p-2"
          onChange={(event) => setPersonality(event.target.value || "")}
        >
          <option value="">Personality</option>
          {Object.keys(Personality).map((key) => (
            <option key={key} value={key}>
              {Personality[key]}
            </option>
          ))}
        </select>
        <button
          className="block bg-green-900 text-gray-100 p-2 px-3 rounded-lg"
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
        <div className="items-center flex justify-around p-56">
          <h4>Loading ...</h4>
        </div>
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
            <div key="loader" className="items-center flex justify-center p-20">
              <h4>Loading ...</h4>
            </div>
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
        <div className="w-1/3 max-h-full">
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
        <h4>{villager.name}</h4>
        <p>{villager.frName}</p>
        <p>
          <GenderPersonality
            gender={villager.gender}
            personality={villager.personality}
          />
        </p>
        <p>{ucfirst(villager.species)}</p>
        <p>
          <Zodiac zodiac={villager.starSign} />
        </p>
        <p>
          <span className="whitespace-no-wrap mr-1">
            <span className="mr-1">🏝</span>
            <span className="text-sm">
              {(villager.randomIslandSpawnProbability * 100).toFixed(2)}%
            </span>
          </span>
          <span className="whitespace-no-wrap">
            <span className="mr-1">⛺</span>
            <span className="text-sm">
              {villager.campsiteProbability
                ? `${(villager.campsiteProbability * 100).toFixed(2)}%`
                : "N/A"}
            </span>
          </span>
        </p>
        {/* <a href={villager.nookiPediaPage} target="_blank">
          Nookiepedia
        </a> */}
      </div>
    </li>
  );
};

export default withApollo(VillagerIndex);
