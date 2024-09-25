import app from "./app.js";
import { ENV_VARS } from "./configurations/envVars.js";
import { DBConnect } from "./database/connection.js";

const port = ENV_VARS.PORT || 3006;
DBConnect().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
