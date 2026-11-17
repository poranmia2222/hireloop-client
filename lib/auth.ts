import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI as string);
export const db = client.db("hireloop_user");

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
  plugins: [
    admin()
  ],
  database: mongodbAdapter(db, {
    client,
  }),
});
// force rebuild: admin plugin provides auth.api.listUsers
