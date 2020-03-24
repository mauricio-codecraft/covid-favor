// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  aws: {
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://8lx7wnv8p8.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_BzYg5NjcD",
      APP_CLIENT_ID: "6kairpdpj2bsp6st0o5o00cavd",
      IDENTITY_POOL_ID: "us-east-1:d0dbd07d-0911-42b9-9554-8cc121000c45"
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
