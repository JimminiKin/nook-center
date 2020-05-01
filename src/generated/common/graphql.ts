export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum Gender {
  Male = "MALE",
  Female = "FEMALE",
}

export type Island = {
  __typename?: "Island";
  id: Scalars["ID"];
  name: Scalars["String"];
  picture: Scalars["String"];
  maxOneDailyVisit: Scalars["Boolean"];
  probability: Scalars["Float"];
  requirements?: Maybe<Scalars["String"]>;
  description: Scalars["String"];
  trees: Scalars["String"];
  treesBadSpecial: Scalars["Boolean"];
  treesGoodSpecial: Scalars["Boolean"];
  flowers: Scalars["String"];
  flowersBadSpecial: Scalars["Boolean"];
  flowersGoodSpecial: Scalars["Boolean"];
  rocks: Scalars["String"];
  rocksBadSpecial: Scalars["Boolean"];
  rocksGoodSpecial: Scalars["Boolean"];
  insects: Scalars["String"];
  insectsBadSpecial: Scalars["Boolean"];
  insectsGoodSpecial: Scalars["Boolean"];
  fishes: Scalars["String"];
  fishesBadSpecial: Scalars["Boolean"];
  fishesGoodSpecial: Scalars["Boolean"];
};

export type IslandSearchInput = {
  treesBadSpecial?: Maybe<Scalars["Boolean"]>;
  treesGoodSpecial?: Maybe<Scalars["Boolean"]>;
  flowersBadSpecial?: Maybe<Scalars["Boolean"]>;
  flowersGoodSpecial?: Maybe<Scalars["Boolean"]>;
  rocksBadSpecial?: Maybe<Scalars["Boolean"]>;
  rocksGoodSpecial?: Maybe<Scalars["Boolean"]>;
  insectsBadSpecial?: Maybe<Scalars["Boolean"]>;
  insectsGoodSpecial?: Maybe<Scalars["Boolean"]>;
  fishesBadSpecial?: Maybe<Scalars["Boolean"]>;
  fishesGoodSpecial?: Maybe<Scalars["Boolean"]>;
};

export type NewVillagerProbaInput = {
  currentVillagers: Array<Scalars["ID"]>;
  pastVillagers: Array<Scalars["ID"]>;
  pastCampers: Array<Scalars["ID"]>;
};

export enum Personality {
  Cranky = "CRANKY",
  Jock = "JOCK",
  Lazy = "LAZY",
  Normal = "NORMAL",
  Peppy = "PEPPY",
  Sisterly = "SISTERLY",
  Smug = "SMUG",
  Snooty = "SNOOTY",
}

export type Picture = {
  __typename?: "Picture";
  small: Scalars["String"];
  big: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  villager?: Maybe<Villager>;
  villagers: Array<Villager>;
  island?: Maybe<Island>;
  islands: Array<Island>;
  newVillagerProba: Array<VillagerProbaOutput>;
};

export type QueryVillagerArgs = {
  villagerId: Scalars["ID"];
};

export type QueryVillagersArgs = {
  search: VillagerSearchInput;
};

export type QueryIslandArgs = {
  islandId: Scalars["ID"];
};

export type QueryIslandsArgs = {
  search: IslandSearchInput;
};

export type QueryNewVillagerProbaArgs = {
  input: NewVillagerProbaInput;
};

export enum RelationshipQuality {
  Like = "LIKE",
  Neutral = "NEUTRAL",
  Dislike = "DISLIKE",
}

export enum Species {
  Alligator = "ALLIGATOR",
  Anteater = "ANTEATER",
  Bear = "BEAR",
  Bird = "BIRD",
  Bull = "BULL",
  Cat = "CAT",
  Chicken = "CHICKEN",
  Cow = "COW",
  Cub = "CUB",
  Deer = "DEER",
  Dog = "DOG",
  Duck = "DUCK",
  Eagle = "EAGLE",
  Elephant = "ELEPHANT",
  Frog = "FROG",
  Goat = "GOAT",
  Gorilla = "GORILLA",
  Hamster = "HAMSTER",
  Hippo = "HIPPO",
  Kangaroo = "KANGAROO",
  Koala = "KOALA",
  Lion = "LION",
  Monkey = "MONKEY",
  Mouse = "MOUSE",
  Octopus = "OCTOPUS",
  Ostrich = "OSTRICH",
  Penguin = "PENGUIN",
  Rabbit = "RABBIT",
  Rhino = "RHINO",
  Sheep = "SHEEP",
  Pig = "PIG",
  Squirrel = "SQUIRREL",
  Wolf = "WOLF",
  Horse = "HORSE",
  Tiger = "TIGER",
}

export enum StarSign {
  Aquarius = "AQUARIUS",
  Pisces = "PISCES",
  Aries = "ARIES",
  Taurus = "TAURUS",
  Gemini = "GEMINI",
  Cancer = "CANCER",
  Virgo = "VIRGO",
  Libra = "LIBRA",
  Scorpio = "SCORPIO",
  Sagittarius = "SAGITTARIUS",
  Capricorn = "CAPRICORN",
  Leo = "LEO",
}

export type Villager = {
  __typename?: "Villager";
  id: Scalars["ID"];
  name: Scalars["String"];
  frName: Scalars["String"];
  gender: Gender;
  picture?: Maybe<Picture>;
  nookiPediaPage: Scalars["String"];
  species: Species;
  personality: Personality;
  relationShips: Array<Personality>;
  starSign: StarSign;
  birthday: Scalars["String"];
  description: Scalars["String"];
  saying: Scalars["String"];
  randomIslandSpawnProbability: Scalars["Float"];
  congeners: Array<Maybe<Villager>>;
  getsAlong: Array<Maybe<Villager>>;
};

export type VillagerProbaOutput = {
  __typename?: "VillagerProbaOutput";
  villager: Villager;
  probability: Scalars["Float"];
};

export type VillagerSearchInput = {
  text?: Maybe<Scalars["String"]>;
  personality?: Maybe<Personality>;
  species?: Maybe<Species>;
  gender?: Maybe<Gender>;
  starSign?: Maybe<StarSign>;
};
