import { User } from "@/lib/types";
import axios from "axios";
import dotenv from "dotenv";
import { NextPage } from "next";
import simpleOauth2 from "simple-oauth2";

dotenv.config();

const Home: NextPage = async () => {
  const config = {
    client: {
      id: process.env.UID!,
      secret: process.env.SECRET!,
    },
    auth: {
      tokenHost: "https://api.intra.42.fr",
    },
  };

  const tokenParams = {
    scope: "public",
  };

  const { ClientCredentials } = simpleOauth2;

  const client = new ClientCredentials(config);
  const accessToken = await client.getToken(tokenParams);

  let data: User[] = [];

  try {
    const { data: input } = await axios({
      url: "https://api.intra.42.fr/v2/campus/singapore/users",
      headers: { Authorization: `Bearer ${accessToken.token.access_token}` },
    });
    data = input;
  } catch (err) {
    console.error(err);
  }

  return (
    <div>
      {...data.map((elem) => {
        const { email, first_name, last_name } = elem;
        return (
          <div className="bg-blue p-4 flex flex-col gap-y-4">
            <p>{email}</p>
            <p>{first_name}</p>
            <p>{last_name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
