import React, { useState } from "react";
import Box from "@mui/material/Box";
import BabysitterCard from "../components/BabysitterCard";
import { useDataContext } from "../context/DataContext";
import { useAuth } from "../AuthContext";
const Favorites = () => {
  const data = useDataContext();
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();
  console.log(user);
  console.log("data", data);
  React.useEffect(() => {
    const favoriteBabysitters = user.userData.favorites || [];
    console.log("favoriteBabysitters", favoriteBabysitters);

    setFavorites(favoriteBabysitters);
  }, [user, data]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        flexWrap: "wrap",
        padding: "20px 10px",
        justifyContent: "center",
        alignItems: "start",
        backgroundColor: "#F8F7F1",
        minHeight: "100vh",
      }}
    >
      {favorites.length > 0 ? (
        favorites.map(
          (favorite) => (
            console.log("favorite", favorite),
            console.log("favorite.babysitter", favorite.babysitter),
            (
              <BabysitterCard
                key={favorite.babysitter.id}
                {...favorite.babysitter}
              />
            )
          ),
        )
      ) : (
        <div
          style={{
            flexGrow: 1,
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>No favorites</p>
        </div>
      )}
    </Box>
  );
};

export default Favorites;
