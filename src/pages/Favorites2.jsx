import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import BabysitterCard from "../components/BabysitterCard";
import { useAuth } from "../AuthContext";
import { fetchParent } from "../api";

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user && favorites.length === 0) {
        console.log(user);
        console.log(user.userData);
        try {
          const parent = await fetchParent(user.id);
          console.log("parent", parent);
          if (parent && parent.favorites) {
            setFavorites(
              parent.favorites.map((fav) => ({ ...fav, isFavorite: true })),
            );
          }
        } catch (error) {
          console.error("Failed to fetch favorites", error);
        }
      }
    };

    fetchFavorites();
  }, [user, favorites.length]);

  const toggleFavorite = (babysitterId) => {
    setFavorites(
      favorites.map((fav) =>
        fav.babysitter.id === babysitterId
          ? { ...fav, isFavorite: !fav.isFavorite }
          : fav,
      ),
    );
  };

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
        favorites.map((fav) => (
          <BabysitterCard
            key={fav.babysitter.id}
            favorite={fav}
            toggleFavorite={toggleFavorite}
          />
        ))
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
