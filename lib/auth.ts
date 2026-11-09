import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("hireloop_user");

export const auth = betterAuth({
  emailAndPassword: { 
    enabled: true, 
  },
  user: {
    additionalFields: {
      role: {
        type: ["candidate", "recruiter", "admin"],
      defaultValue: "Candidate",
        input: true,
      },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});