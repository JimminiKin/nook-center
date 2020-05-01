import {
  Gender,
  Species,
  Personality,
  StarSign,
  Villager,
  RelationshipQuality,
  VillagerProbaOutput,
  Island,
} from "@gen/common/graphql";

import { Resolvers } from "@gen/server/graphql";

import data from "@data/villagers.json";

const relationShips = (
  personality: Personality
): Record<Personality, RelationshipQuality> => {
  const map: Record<Personality, Record<Personality, RelationshipQuality>> = {
    [Personality.Cranky]: {
      [Personality.Cranky]: RelationshipQuality.Like,
      [Personality.Jock]: RelationshipQuality.Neutral,
      [Personality.Lazy]: RelationshipQuality.Like,
      [Personality.Normal]: RelationshipQuality.Like,
      [Personality.Peppy]: RelationshipQuality.Dislike,
      [Personality.Sisterly]: RelationshipQuality.Dislike,
      [Personality.Smug]: RelationshipQuality.Dislike,
      [Personality.Snooty]: RelationshipQuality.Dislike,
    },
    [Personality.Jock]: {
      [Personality.Cranky]: RelationshipQuality.Dislike,
      [Personality.Jock]: RelationshipQuality.Neutral,
      [Personality.Lazy]: RelationshipQuality.Dislike,
      [Personality.Normal]: RelationshipQuality.Like,
      [Personality.Peppy]: RelationshipQuality.Like,
      [Personality.Sisterly]: RelationshipQuality.Like,
      [Personality.Smug]: RelationshipQuality.Like,
      [Personality.Snooty]: RelationshipQuality.Dislike,
    },
    [Personality.Lazy]: {
      [Personality.Cranky]: RelationshipQuality.Like,
      [Personality.Jock]: RelationshipQuality.Dislike,
      [Personality.Lazy]: RelationshipQuality.Like,
      [Personality.Normal]: RelationshipQuality.Neutral,
      [Personality.Peppy]: RelationshipQuality.Like,
      [Personality.Sisterly]: RelationshipQuality.Neutral,
      [Personality.Smug]: RelationshipQuality.Like,
      [Personality.Snooty]: RelationshipQuality.Dislike,
    },
    [Personality.Normal]: {
      [Personality.Cranky]: RelationshipQuality.Neutral,
      [Personality.Jock]: RelationshipQuality.Like,
      [Personality.Lazy]: RelationshipQuality.Neutral,
      [Personality.Normal]: RelationshipQuality.Like,
      [Personality.Peppy]: RelationshipQuality.Like,
      [Personality.Sisterly]: RelationshipQuality.Like,
      [Personality.Smug]: RelationshipQuality.Like,
      [Personality.Snooty]: RelationshipQuality.Neutral,
    },
    [Personality.Peppy]: {
      [Personality.Cranky]: RelationshipQuality.Dislike,
      [Personality.Jock]: RelationshipQuality.Like,
      [Personality.Lazy]: RelationshipQuality.Like,
      [Personality.Normal]: RelationshipQuality.Like,
      [Personality.Peppy]: RelationshipQuality.Like,
      [Personality.Sisterly]: RelationshipQuality.Like,
      [Personality.Smug]: RelationshipQuality.Like,
      [Personality.Snooty]: RelationshipQuality.Dislike,
    },
    [Personality.Sisterly]: {
      [Personality.Cranky]: RelationshipQuality.Dislike,
      [Personality.Jock]: RelationshipQuality.Like,
      [Personality.Lazy]: RelationshipQuality.Neutral,
      [Personality.Normal]: RelationshipQuality.Like,
      [Personality.Peppy]: RelationshipQuality.Like,
      [Personality.Sisterly]: RelationshipQuality.Dislike,
      [Personality.Smug]: RelationshipQuality.Neutral,
      [Personality.Snooty]: RelationshipQuality.Neutral,
    },
    [Personality.Smug]: {
      [Personality.Cranky]: RelationshipQuality.Dislike,
      [Personality.Jock]: RelationshipQuality.Neutral,
      [Personality.Lazy]: RelationshipQuality.Like,
      [Personality.Normal]: RelationshipQuality.Neutral,
      [Personality.Peppy]: RelationshipQuality.Like,
      [Personality.Sisterly]: RelationshipQuality.Dislike,
      [Personality.Smug]: RelationshipQuality.Like,
      [Personality.Snooty]: RelationshipQuality.Like,
    },
    [Personality.Snooty]: {
      [Personality.Cranky]: RelationshipQuality.Dislike,
      [Personality.Jock]: RelationshipQuality.Dislike,
      [Personality.Lazy]: RelationshipQuality.Dislike,
      [Personality.Normal]: RelationshipQuality.Like,
      [Personality.Peppy]: RelationshipQuality.Dislike,
      [Personality.Sisterly]: RelationshipQuality.Dislike,
      [Personality.Smug]: RelationshipQuality.Like,
      [Personality.Snooty]: RelationshipQuality.Dislike,
    },
  };

  return map[personality];
};

const validateMapping = () => {
  Object.values(Personality).forEach((persoToCheck) => {
    console.log("For : ", persoToCheck);

    const rel = relationShips(persoToCheck);

    Object.keys(rel).forEach((subPerso) => {
      const checkedToCheckee = rel[subPerso as Personality];
      const checkeeToChecked = relationShips(subPerso as Personality)[
        persoToCheck
      ];
      const matched = checkedToCheckee == checkeeToChecked;
      const noNeutral =
        checkedToCheckee !== RelationshipQuality.Neutral &&
        checkeeToChecked !== RelationshipQuality.Neutral;
      if (!matched) {
        console.log("\tto", subPerso);
        console.log(
          "\t\t",
          `${persoToCheck} finds ${subPerso} ${checkedToCheckee}`
        );
        console.log(
          "\t\t",
          `${subPerso} finds ${persoToCheck} ${checkeeToChecked}`
        );
      }
    });
  });
};

const getGender = (gender: String): Gender | null => {
  switch (gender) {
    case "Male":
      return Gender.Male;
      break;
    case "Female":
      return Gender.Female;
      break;
    default:
      return null;
  }
};

const getPersonality = (personality: String): Personality | null => {
  switch (personality) {
    case "Cranky":
      return Personality.Cranky;
    case "Jock":
      return Personality.Jock;
    case "Female":
      return Personality.Jock;
    case "Lazy":
      return Personality.Lazy;
    case "Normal":
      return Personality.Normal;
    case "Peppy":
      return Personality.Peppy;
    case "Sisterly":
      return Personality.Sisterly;
    case "Smug":
      return Personality.Smug;
    case "Snooty":
      return Personality.Snooty;
    default:
      return null;
  }
};

const getSpecies = (species: String): Species | null => {
  switch (species) {
    case "Alligator":
      return Species.Alligator;
    case "Anteater":
      return Species.Anteater;
    case "Bear":
      return Species.Bear;
    case "Bird":
      return Species.Bird;
    case "Bull":
      return Species.Bull;
    case "Cat":
      return Species.Cat;
    case "Chicken":
      return Species.Chicken;
    case "Cow":
      return Species.Cow;
    case "Cub":
      return Species.Cub;
    case "Deer":
      return Species.Deer;
    case "Dog":
      return Species.Dog;
    case "Duck":
      return Species.Duck;
    case "Eagle":
      return Species.Eagle;
    case "Elephant":
      return Species.Elephant;
    case "Frog":
      return Species.Frog;
    case "Goat":
      return Species.Goat;
    case "Gorilla":
      return Species.Gorilla;
    case "Hamster":
      return Species.Hamster;
    case "Hippo":
      return Species.Hippo;
    case "Kangaroo":
      return Species.Kangaroo;
    case "Koala":
      return Species.Koala;
    case "Lion":
      return Species.Lion;
    case "Monkey":
      return Species.Monkey;
    case "Mouse":
      return Species.Mouse;
    case "Octopus":
      return Species.Octopus;
    case "Ostrich":
      return Species.Ostrich;
    case "Penguin":
      return Species.Penguin;
    case "Rabbit":
      return Species.Rabbit;
    case "Rhino":
      return Species.Rhino;
    case "Sheep":
      return Species.Sheep;
    case "Pig":
      return Species.Pig;
    case "Squirrel":
      return Species.Squirrel;
    case "Wolf":
      return Species.Wolf;
    case "Horse":
      return Species.Horse;
    case "Tiger":
      return Species.Tiger;
    default:
      return null;
  }
};

const getStarSign = (starSign: String): StarSign | null => {
  switch (starSign) {
    case "Aquarius":
      return StarSign.Aquarius;
    case "Pisces":
      return StarSign.Pisces;
    case "Aries":
      return StarSign.Aries;
    case "Taurus":
      return StarSign.Taurus;
    case "Gemini":
      return StarSign.Gemini;
    case "Cancer":
      return StarSign.Cancer;
    case "Virgo":
      return StarSign.Virgo;
    case "Libra":
      return StarSign.Libra;
    case "Scorpio":
      return StarSign.Scorpio;
    case "Sagittarius":
      return StarSign.Sagittarius;
    case "Capricorn":
      return StarSign.Capricorn;
    case "Leo":
      return StarSign.Leo;
    default:
      return null;
  }
};

type baseVillagerProps =
  | "id"
  | "__typename"
  | "name"
  | "frName"
  | "gender"
  | "nookiPediaPage"
  | "species"
  | "personality"
  | "picture"
  | "starSign"
  | "birthday"
  | "description"
  | "saying";

type MinimalVillager = Pick<Villager, baseVillagerProps>;
type MinimalVillagerAndMaybeMore = Partial<Villager> & MinimalVillager;

const villagerDataToReturn = (
  src: typeof data[number]
): MinimalVillagerAndMaybeMore => {
  if (!src || !src.id) {
    throw new Error("Missing Villager ID");
  }

  const gender = getGender(src.gender);
  if (gender === null) {
    throw new Error("Invalid Or Missing Villager Gender");
  }

  const personality = getPersonality(src.personality);
  if (personality === null) {
    throw new Error("Invalid Or Missing Villager Personality");
  }

  const species = getSpecies(src.species);
  if (species === null) {
    throw new Error("Invalid Or Missing Villager Species");
  }

  const starSign = getStarSign(src.starSign);
  if (starSign === null) {
    throw new Error("Invalid Or Missing Villager Star Sign");
  }

  return {
    id: src.id,
    __typename: "Villager",
    name: src.name,
    frName: src.translations.french,
    gender,
    nookiPediaPage: src.nookiPediaPage,
    species,
    personality,
    picture: {
      small: src.pictureSmall,
      big: src.picture,
    },
    starSign,
    birthday: src.birthday,
    description: src.description,
    saying: src.saying,
  };
};

const cleanData = data
  .map(villagerDataToReturn)
  .filter((a) => a !== null) as MinimalVillager[];

const getOne = (villagerId: string): MinimalVillager => {
  const res = cleanData.find((elm) => elm && elm.id === villagerId);
  if (res === undefined || res === null) {
    throw new Error(`Can not find villager : ${villagerId}`);
  }
  return res;
};

const resolverMap: Resolvers<any> = {
  Query: {
    villager(_, { villagerId }) {
      return getOne(villagerId);
    },
    villagers(_, { search }) {
      const searchResult = cleanData.filter((elm) => {
        if (elm === null) {
          return false;
        }
        let keep = true;

        if (search.text) {
          if (
            elm.name.toUpperCase().includes(search.text.toUpperCase()) ||
            elm.frName.toUpperCase().includes(search.text.toUpperCase())
          ) {
            keep = keep && true;
          } else {
            return false;
          }
        }

        if (search.gender) {
          if (search.gender === elm.gender) {
            keep = keep && true;
          } else {
            return false;
          }
        }

        if (search.personality) {
          if (search.personality === elm.personality) {
            keep = keep && true;
          } else {
            return false;
          }
        }

        if (search.species) {
          if (search.species === elm.species) {
            keep = keep && true;
          } else {
            return false;
          }
        }

        if (search.starSign) {
          if (search.starSign === elm.starSign) {
            keep = keep && true;
          } else {
            return false;
          }
        }
        return keep;
      });
      return searchResult as Partial<Villager>[];
    },
    newVillagerProba(_, { input }) {
      const currentVillagersPersonalityCount: Record<Personality, number> = {
        [Personality.Cranky]: 0,
        [Personality.Jock]: 0,
        [Personality.Lazy]: 0,
        [Personality.Normal]: 0,
        [Personality.Peppy]: 0,
        [Personality.Sisterly]: 0,
        [Personality.Smug]: 0,
        [Personality.Snooty]: 0,
      };
      input.currentVillagers.forEach((villagerId) => {
        const villager = getOne(villagerId);
        currentVillagersPersonalityCount[villager.personality]++;
      });

      console.log(currentVillagersPersonalityCount);

      const filteredVillagersPersonalityCount: Record<Personality, number> = {
        [Personality.Cranky]: 0,
        [Personality.Jock]: 0,
        [Personality.Lazy]: 0,
        [Personality.Normal]: 0,
        [Personality.Peppy]: 0,
        [Personality.Sisterly]: 0,
        [Personality.Smug]: 0,
        [Personality.Snooty]: 0,
      };
      cleanData.forEach((villager) => {
        if (
          !input.currentVillagers.includes(villager.id) &&
          !input.pastVillagers.includes(villager.id) &&
          !input.pastCampers.includes(villager.id)
        ) {
          filteredVillagersPersonalityCount[villager.personality]++;
        }
      });

      const finalResult = cleanData.map((villager) => {
        if (
          input.currentVillagers.includes(villager.id) ||
          input.pastVillagers.includes(villager.id) ||
          input.pastCampers.includes(villager.id)
        ) {
          return {
            __typename: "VillagerProbaOutput",
            probability: 0,
            villager,
          } as VillagerProbaOutput;
        }

        if (currentVillagersPersonalityCount[villager.personality] === 0) {
          return {
            __typename: "VillagerProbaOutput",
            probability:
              (100 * 0.6 * 1) /
              filteredVillagersPersonalityCount[villager.personality],
            villager,
          } as VillagerProbaOutput;
        }

        return {
          __typename: "VillagerProbaOutput",
          probability:
            100 *
            0.4 *
            (1 / (Object.keys(Personality).length - 1)) *
            (1 / filteredVillagersPersonalityCount[villager.personality]),
          villager,
        } as VillagerProbaOutput;
      });

      const sameSpeciesCount = finalResult.reduce((count, villager) => {
        return count + villager.probability;
      }, 0);

      console.log(sameSpeciesCount);

      return finalResult;
    },
  },

  Villager: {
    randomIslandSpawnProbability(parent) {
      const sameSpeciesCount = cleanData.reduce((count, villager) => {
        if (villager.species === parent.species) {
          ++count;
        }
        return count;
      }, 0);

      return ((1 / Object.keys(Species).length) * 1) / sameSpeciesCount;
    },
    congeners(parent) {
      return cleanData.filter((elm) => elm && parent.species === elm.species);
    },
    getsAlong(parent) {
      return cleanData.filter((elm) => {
        if (parent.personality === undefined || elm.personality === undefined) {
          throw new Error("bisous");
        }
        return (
          relationShips(parent.personality)[elm.personality] ===
          RelationshipQuality.Like
        );
      });
    },
  },
};

export default resolverMap;
