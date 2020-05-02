import DataLoader from "dataloader";
import data from "@data/villagers.json";

const batchFunction = (keys: string[]): Promise<typeof data> => {
  return new Promise(() => {
    return keys.map((key) => {});
  });
};

export const VillagerBaseLoader = new DataLoader<string, typeof data[0]>(
  batchFunction
);

export const getAllIds = () => {
  return data.map((villager) => villager.id);
};

export const getOne = (key: string) => {
  return data.find((elm) => elm.id === key);
};
