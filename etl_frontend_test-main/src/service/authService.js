import * as cognito from "../config/cognito";
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");

export const loginUser = async (credentials) => {
  return new Promise((resolve, reject) => {
    const authData = {
      Username: credentials.email,
      Password: credentials.password,
    };

    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authData
    );

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(
      cognito.poolData
    );

    const userData = {
      Username: credentials.email,
      Pool: userPool,
    };

    const userAuth = new AmazonCognitoIdentity.CognitoUser(userData);

    userAuth.authenticateUser(authDetails, {
      onSuccess: async (session) => {
        resolve(session);
      },
      onFailure: (error) => {
        reject(error);
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        delete userAttributes.email_verified;
        delete userAttributes.email;

        userAuth.completeNewPasswordChallenge(
          credentials.password,
          userAttributes,
          {
            onSuccess: (session) => {
              resolve(session);
            },
            onFailure: (error) => {
              reject(error);
            },
          }
        );
      },
    });
  });
};

export const forgotPasswordUser = async (email) => {
  return new Promise((resolve, reject) => {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(
      cognito.poolData
    );

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.forgotPassword({
      onSuccess: (data) => {
        resolve(data);
      },
      onFailure: (err) => {
        reject(err);
      },
      inputVerificationCode: (data) => {
        resolve(data);
      },
    });
  });
};

export const resetPasswordUser = async (credentials, email) => {
  return new Promise((resolve, reject) => {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(
      cognito.poolData
    );

    const userData = {
      Username: email,
      Pool: userPool,
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmPassword(credentials.code, credentials.password, {
      onSuccess: (data) => {
        resolve(data);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

export const refreshTokenUser = async () => {
  return new Promise((resolve, reject) => {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(
      cognito.poolData
    );
    const cognitoUser = userPool.getCurrentUser();

    if (!cognitoUser) {
      return reject(new Error("User not found"));
    }

    cognitoUser.getSession((error, session) => {
      if (error) {
        return reject(new Error(error));
      }

      if (!session.isValid()) {
        return reject(new Error("Session not valid"));
      }

      resolve(session);
    });
  });
};

export const logoutUser = async () => {
  try {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(
      cognito.poolData
    );
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.signOut();
      return { success: true };
    }
    return { success: false, message: "No user to sign out" };
  } catch (error) {
    throw error;
  }
};
