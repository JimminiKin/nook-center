import { withApollo } from "../apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";

const Index = () => {
  // if (viewer) {
  //   return (
  //     <div>
  //       You're signed in as blublu {viewer.name} and you're {viewer.status} goto{" "}
  //       <Link href="/about">
  //         <a>static</a>
  //       </Link>{" "}
  //       page.
  //     </div>
  //   );
  // }

  return <h1>BLU</h1>;
};

export default withApollo(Index);
