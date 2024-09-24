import app from "./server.js";
import { ENV_VARS } from "./configurations/envVars.js";
import { DBConnect } from "./database/connection.js";

const port = ENV_VARS.PORT || 3004;
DBConnect().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});