import { User } from "./types";

export {}

// extending the jwt tokens

declare global{
    interface CustomJwtSessionClaims extends User {}
}