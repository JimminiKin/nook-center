import { Node } from "./Common";

import {
  VillagerBaseLoader,
  getAllIds,
  getOne,
} from "@apollo/loaders/VillagerBaseLoader";

import data from "@data/villagers.json";

import { Species, Personality } from "@gen/common/graphql";
import { VillagerCampsiteProbabilityArgs } from "@gen/server/graphql";

import {
  getStarSign,
  getGender,
  getPersonality,
  getSpecies,
} from "@apollo/resolvers/utils";

export class VillagerResolver implements Node {
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  async name() {
    try {
      return getOne(this.id).name;
    } catch (e) {
      return null;
    }
  }

  async frName() {
    try {
      return getOne(this.id).translations.french;
    } catch (e) {
      return null;
    }
  }

  async gender() {
    try {
      const gender = getGender(getOne(this.id).gender);
      if (gender === null) {
        throw new Error("Invalid Or Missing Villager Gender");
      }
      return gender;
    } catch (e) {
      return null;
    }
  }

  async personality() {
    try {
      const personality = getPersonality(getOne(this.id).personality);
      if (personality === null) {
        throw new Error("Invalid Or Missing Villager Personality");
      }
      return personality;
    } catch (e) {
      return null;
    }
  }

  async species() {
    try {
      const species = getSpecies(getOne(this.id).species);
      if (species === null) {
        throw new Error("Invalid Or Missing Villager Species");
      }
      return species;
    } catch (e) {
      return null;
    }
  }

  async starSign() {
    try {
      const starSign = getStarSign(getOne(this.id).starsign);
      if (starSign === null) {
        throw new Error("Invalid Or Missing Villager Star Sign");
      }
      return starSign;
    } catch (e) {
      return null;
    }
  }

  async saying() {
    try {
      return getOne(this.id).saying;
    } catch (e) {
      return null;
    }
  }

  async description() {
    try {
      return getOne(this.id).description;
    } catch (e) {
      return null;
    }
  }

  async birthday() {
    try {
      return getOne(this.id).birthday;
    } catch (e) {
      return null;
    }
  }

  async nookiPediaPage() {
    try {
      return getOne(this.id).nookiPediaPage;
    } catch (e) {
      return null;
    }
  }

  async picture() {
    try {
      const src = getOne(this.id);
      return src.image;
    } catch (e) {
      return null;
    }
  }

  async randomIslandSpawnProbability(): Promise<number> {
    const allVillagers = getAllIds();
    let sameSpeciesCount = 0;

    for (let i = 0; i < allVillagers.length; i++) {
      const villagerId = allVillagers[i];
      if (
        (await new VillagerResolver(villagerId).species()) ===
        (await this.species())
      ) {
        sameSpeciesCount++;
      }
    }

    return ((1 / Object.keys(Species).length) * 1) / sameSpeciesCount;
  }

  async campsiteProbability(params: VillagerCampsiteProbabilityArgs) {
    if (!params.villageState) {
      return null;
    }

    const {
      currentVillagers,
      pastCampers,
      pastVillagers,
    } = params.villageState;

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

    for (let i = 0; i < currentVillagers.length; i++) {
      const villagerId = currentVillagers[i];
      currentVillagersPersonalityCount[
        await new VillagerResolver(villagerId).personality()
      ]++;
    }

    const allVillagers = getAllIds();

    for (let i = 0; i < allVillagers.length; i++) {
      const villagerId = allVillagers[i];
      if (
        !currentVillagers.includes(villagerId) &&
        !pastVillagers.includes(villagerId) &&
        !pastCampers.includes(villagerId)
      ) {
        filteredVillagersPersonalityCount[
          await new VillagerResolver(villagerId).personality()
        ]++;
      }
    }

    if (
      currentVillagers.includes(this.id) ||
      pastVillagers.includes(this.id) ||
      pastCampers.includes(this.id)
    ) {
      return 0;
    }

    const personnality = await this.personality();
    if (currentVillagersPersonalityCount[personnality] === 0) {
      return 0.6 * (1 / filteredVillagersPersonalityCount[personnality]);
    }

    return (
      0.4 *
      (1 / (Object.keys(Personality).length - 1)) *
      (1 / filteredVillagersPersonalityCount[personnality])
    );
  }

  // async congeners(parent) {
  //   // return cleanData.filter((elm) => elm && parent.species === elm.species);
  // }
  // async getsAlong(parent) {
  //   // return cleanData.filter((elm) => {
  //   //   if (parent.personality === undefined || elm.personality === undefined) {
  //   //     throw new Error("bisous");
  //   //   }
  //   //   return (
  //   //     relationShips(parent.personality)[elm.personality] ===
  //   //     RelationshipQuality.Like
  //   //   );
  //   // });
  // }
}
