import { FaBars, FaHamburger } from "react-icons/fa";

import { Personality, Gender } from "@gen/common/graphql";
import { ucfirst } from "@modules/utils";

const getGenderEmoji = (gender: Gender) => {
  switch (gender) {
    case Gender.Male:
      return "♂️";
    case Gender.Female:
      return "♀️";
    default:
      return "🤷";
  }
};

const Zodiac: React.FC<
  {
    gender: Gender;
    personality: Personality;
  } & React.HTMLAttributes<HTMLSpanElement>
> = ({ gender, personality, ...props }) => {
  return (
    <span {...props}>
      {getGenderEmoji(gender)} {ucfirst(personality)}
    </span>
  );
};

export default Zodiac;
