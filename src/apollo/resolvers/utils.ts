import {
  Gender,
  Species,
  Personality,
  StarSign,
  RelationshipQuality,
} from "@gen/common/graphql";

export const getGender = (gender: String): Gender | null => {
  switch (gender) {
    case "Male":
      return Gender.Male;
    case "Female":
      return Gender.Female;
    default:
      return null;
  }
};

export const getPersonality = (personality: String): Personality | null => {
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

export const getSpecies = (species: String): Species | null => {
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

export const getStarSign = (starSign: String): StarSign | null => {
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

export const relationShips = (
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
