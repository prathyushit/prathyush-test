# ETL UI

## Project Structure

After cloning, your project should look like this:

```
.
└── Root
    ├── public
    └── src
        ├── assets
        │   ├── images                  Images folder used in the app
        │   │   └── ...
        │   └── theme                   Theme folder used in the app
        │       ├── base
        │       │   └── ...             Basic theme setup such as border, color, etc
        │       ├── components
        │       │   └── ...             Main components theme such as button, box, etc
        │       ├── functions
        │       │   └── ...             The functions used in components
        │       └── index.js            The theme entry point
        ├── components
        │   └── ...                     React components for the app
        ├── config
        │   ├── authUtils.js            Remove stored variables when logout
        │   ├── cognito.js              AWS cognito userPool variables
        │   ├── http.js                 base http request module
        │   └── storage.js              The file that stores variables for the app.
        ├── context
        │   ├── auth_provider.js        The provider file checks the current authentication state.
        │   └── index.js                The provider file handles theme changes in the app
        ├── layouts                     Main pages for this app
        │   ├── authentication
        │   │   ├── forgot-password
        │   │   │   └── index.js        forgot-password page file
        │   │   ├── reset-password
        │   │   │   └── index.js        reset-password page file
        │   │   └── sign-in
        │   │       └── index.js        sign-in page file
        │   └── home
        │       ├── components          The components for home page
        │       │   └── ...
        │       └── index.js            home page file
        ├── router
        │   ├── index.js                Main router for this app
        │   └── protect_route.js        redirect to the sign-in page if not logged in
        ├── service
        │   ├── authService.js          Primary authentication functions with AWS cognito
        │   └── dataService.js          Data functions such as getBucket, Validate, Transform etc.
        ├── store
        │   ├── authStore.js            The file stores the auth variables
        │   ├── dataStore.js            The file stores the data variables
        │   ├── index.js                The store entry point
        │   ├── pathStore.js            The file stores the current value of the stepper
        │   └── rootStore.js            The file contains instances of AuthStore, PathStore, and DataStore.
        ├── App.js                      The main App component with routes
        └── index.js                    The application entry point
```

## Project run

```
Environment: Node 18

npm install
npm run start
```

## Project deployment

- Main branch: https://master.d1uiuqbsqplvjx.amplifyapp.com/

- Dev branch: https://dev.d1uiuqbsqplvjx.amplifyapp.com/

## Integrate AWS Cognito Auth

To use AWS Cognito auth, you should first create a user pool in AWS Cognito. 

![Screenshot_1](https://github.com/KM-DS/etl_frontend/assets/54220183/76741043-49a0-4848-b5c2-297e17ee1103)

Select Email option in Cognito user pool sign-in options

![Screenshot_2](https://github.com/KM-DS/etl_frontend/assets/54220183/6b49431c-9e2c-47da-8273-b7a0f471e3e0)

Set Password policy with Cognito defaults

![Screenshot_3](https://github.com/KM-DS/etl_frontend/assets/54220183/ce74e208-066c-42de-896b-d6014678189c)

In this screen, select multi-factor authentication with No MFA

![Screenshot_4](https://github.com/KM-DS/etl_frontend/assets/54220183/d3c2ffee-be47-48a3-8253-bdd17e69fa94)

Keep default settings in Configure sign-up experience

![Screenshot_5](https://github.com/KM-DS/etl_frontend/assets/54220183/198e9c7d-90ed-486b-9b24-ab6920ab30cb)
![Screenshot_6](https://github.com/KM-DS/etl_frontend/assets/54220183/c04533a5-3d54-4e1c-9bfb-29cad96b17be)

In Configure message delivery step, select Send email with Cognito option

![Screenshot_7](https://github.com/KM-DS/etl_frontend/assets/54220183/947f71c2-1e1f-451e-ad5c-a1f6a09a13e6)

Set your user pool name as you want

![Screenshot_8](https://github.com/KM-DS/etl_frontend/assets/54220183/4c19f97e-2ff8-407a-853d-875c9f62eb6b)

Set your App client name as you want
![Screenshot_9](https://github.com/KM-DS/etl_frontend/assets/54220183/8eb66a2b-4d19-49e2-8f83-2890c0fc99a4)

Review your all settings on Review and Create page and press "Create user pool" button. New user pool will be created.

![Screenshot_10](https://github.com/KM-DS/etl_frontend/assets/54220183/70b6ebc9-3332-4f66-8cd3-13e206c606fb)
![Screenshot_11](https://github.com/KM-DS/etl_frontend/assets/54220183/2aef3777-6887-44b1-a322-a5563b48a73e)

Get User pool ID from new created user pool

![Screenshot_12](https://github.com/KM-DS/etl_frontend/assets/54220183/f108ab83-f79c-424e-a8e7-927b1be117c7)

To get clientID, choose "App Integration" Tab in new created user pool.

![Screenshot_13](https://github.com/KM-DS/etl_frontend/assets/54220183/ef553885-78d5-4898-923c-d663c96d62ae)

Get ClientID
![Screenshot_14](https://github.com/KM-DS/etl_frontend/assets/54220183/6dbcbbb1-c843-4186-82d0-4e1e4ec692c5)

Setup new created user pool Id and ClientID info in cognito.js file.(src/config/cognito.js)

![Screenshot_15](https://github.com/KM-DS/etl_frontend/assets/54220183/118a9392-f98c-4575-afbc-731635e18bdb)

Setup auth functions in authService.js file. (src/service/authService.js)

![Screenshot_16](https://github.com/KM-DS/etl_frontend/assets/54220183/dfff98e4-fd41-46b2-b0c4-66dee2c8cebb)
