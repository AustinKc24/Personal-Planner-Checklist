import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-2_oiVdOEQBj",
    ClientId: "62s908bo98pfcse117m6m8vnuu"
}

export default new CognitoUserPool(poolData);