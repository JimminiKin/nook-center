import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import Link from "next/link";

import { withApollo } from "@apollo/client";

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

  console.log(
    {
      gender,
      personality,
      species,
      starSign,
      text: searchText,
    },
    StarSign
  );

  const { loading, error, data, refetch } = useVillagersSearchQuery({
    variables: {
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
    throw new Error("Error searching for villagers");
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
          value={searchText}
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
          {Object.keys(Species).map((key) => {
            return (
              <option key={key} value={key}>
                {Species[key]}
              </option>
            );
          })}
        </select>
        <select
          value={starSign || ""}
          className="p-2"
          onChange={(event) => setStarSign(event.target.value || "")}
        >
          <option value="">Star Sign</option>
          {Object.keys(StarSign).map((key) => {
            return (
              <option key={key} value={key}>
                {StarSign[key]}
              </option>
            );
          })}
        </select>
        <select
          value={personality || ""}
          className="p-2"
          onChange={(event) => setPersonality(event.target.value || "")}
        >
          <option value="">Personality</option>
          {Object.keys(Personality).map((key) => {
            return (
              <option key={key} value={key}>
                {Personality[key]}
              </option>
            );
          })}
        </select>
        <button
          className="block bg-green-900 text-gray-100 p-2 px-3 rounded-lg"
          onClick={() => {
            setGender(undefined);
            setPersonality(undefined);
            setSpecies(undefined);
            setStarSign(undefined);
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
        <ResultGrid villagers={data.villagers} />
      )}
    </>
  );
};

const ResultGrid: React.FC<{
  villagers: VillagersSearchQuery["villagers"];
}> = ({ villagers }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
      {villagers.map((villager) => {
        return (
          <div
            key={villager.id}
            className="bg-white rounded-lg overflow-hidden border-gray-600 items-center flex justify-between p-4"
          >
            <Link href="/villager/[id]" as={`/villager/${villager.id}`}>
              <div className="w-1/3 max-h-full">
                <a>
                  <img
                    loading="lazy"
                    className="block h-full w-full"
                    src={villager.picture.big}
                    alt={`Picture of ${villager.name}`}
                  />
                </a>
              </div>
            </Link>
            <div className="w-2/3 pl-4">
              <h4>{villager.name}</h4>
              <p>{villager.frName}</p>
              <p>{villager.gender}</p>
              <p>{villager.personality}</p>
              <p>{villager.species}</p>
              <p>{villager.starSign}</p>
              <p>{(villager.randomIslandSpawnProbability * 100).toFixed(2)}%</p>
              <a href={villager.nookiPediaPage} target="_blank">
                Nookiepedia
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default withApollo(VillagerIndex);
