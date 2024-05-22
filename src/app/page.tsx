import { API_URL } from "@/lib/config";
import axios from "axios";
import { NextPage } from "next";

const Home: NextPage = async () => {
  //   const res = await fetch(`${API_URL}/users`, { method: "GET" });
  //   console.log("roby -> constHome:NextPage= -> data:", await res.json());

  return <div>Hello!</div>;
};

export default Home;
