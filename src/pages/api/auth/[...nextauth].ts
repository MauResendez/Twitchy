import { client } from "@app/config";
import { DynamoDBAdapter } from "@next-auth/dynamodb-adapter";
import NextAuth from "next-auth"
import TwitchProvider from "next-auth/providers/twitch";

export default NextAuth({
  adapter: DynamoDBAdapter(client, { 
    tableName: process.env.AWS_TABLE as string 
  }),
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
    }),
  ],
});