import { VillageStateInput } from "@gen/common/graphql";
import { useCampsiteProbabilityQuery } from "@query/campsiteProbability";

const CampsiteProbability: React.FC<{
  villagerId: string;
}> = ({ villagerId }) => {
  let villageState: VillageStateInput = {
    currentVillagers: [
      "Filbert",
      "Octavian",
      "Maddie",
      "Phoebe",
      "Flora",
      "Peck",
      "Fauna",
      "Dizzy",
      "Tom",
      "Judy",
    ],
    pastVillagers: [
      "Reneigh",
      "Louie",
      "Huck",
      "Chadder",
      "Alli",
      "Lyman",
      "Snooty",
    ],
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
      "Klaus",
      "Chops",
      "Clay",
      "Iggly",
      "Boomer",
      "Hans",
      "Pudge",
      "Henry",
    ],
  };

  const { loading, error, data } = useCampsiteProbabilityQuery({
    variables: {
      villagerId,
      villageState,
    },
  });

  if (error) {
    throw error;
  }

  if (loading) {
    return <span>...</span>;
  }

  return (
    <span className="tooltip">
      <span className="whitespace-no-wrap">
        <span className="mr-1">⛺</span>
        <span className="text-sm">
          {data.villager.campsiteProbability
            ? `${(data.villager.campsiteProbability * 100).toFixed(2)}%`
            : "N/A"}
        </span>
      </span>
      <span className="tooltip-text bg-green-200 rounded -ml-8 -mt-6">
        <span>Probability of spawn in campsite</span>
      </span>
    </span>
  );
};

export default CampsiteProbability;
