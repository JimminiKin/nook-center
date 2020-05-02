import { StarSign } from "@gen/common/graphql";

const Zodiac: React.FC<
  {
    zodiac: StarSign;
  } & React.HTMLAttributes<HTMLSpanElement>
> = ({ zodiac, ...props }) => {
  switch (zodiac) {
    case StarSign.Aquarius:
      return <span {...props}>♒ Aquarius</span>;
    case StarSign.Aries:
      return <span {...props}>♈ Aries</span>;
    case StarSign.Cancer:
      return <span {...props}>♋ Cancer</span>;
    case StarSign.Capricorn:
      return <span {...props}>♑ Capricorn</span>;
    case StarSign.Gemini:
      return <span {...props}>♊ Gemini</span>;
    case StarSign.Leo:
      return <span {...props}>♌ Leo</span>;
    case StarSign.Libra:
      return <span {...props}>♎ Libra</span>;
    case StarSign.Pisces:
      return <span {...props}>♓ Pisces</span>;
    case StarSign.Sagittarius:
      return <span {...props}>♐ Sagittarius</span>;
    case StarSign.Scorpio:
      return <span {...props}>♏ Scorpio</span>;
    case StarSign.Taurus:
      return <span {...props}>♉ Taurus</span>;
    case StarSign.Virgo:
      return <span {...props}>♍ Virgo</span>;
    default:
      return <span {...props}>🤷 Dunno</span>;
  }
};

export default Zodiac;
