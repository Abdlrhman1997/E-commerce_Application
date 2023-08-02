import mongoose from "mongoose";

const dbConnection = async () => {
  await mongoose
    .connect(
      `mongodb+srv://abdlrhmanhegazy4:randycena619@cluster1.ofu8dzb.mongodb.net/E-commerce`
    )
    .then(() => console.log(`DB connected !`))
    .catch((err) => console.log(`DB failed to connect ${err}`));
};

export default dbConnection;
