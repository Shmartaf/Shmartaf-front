import Box from "@mui/material/Box";
import BabysitterCard from "../components/BabysitterCard/";
import { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { get } from "../api";
import { useAuth } from "../AuthContext";

// impport api

// babysitters = api.get("/babysitters)

const Find = () => {
  const [babysitters, setBabysitters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  console.log(user);
  console.log(user.userData);

  const fetchBabysitters = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await get("algo", user?.userData.user?.id);
      console.log("Babysitters", response);
      setBabysitters(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (babysitters && babysitters.length === 0) {
      fetchBabysitters();
    }
    console.log("babysitters from algo", babysitters);
  }, []);

  const Content = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (babysitters && babysitters.length === 0) {
      return <p>No Babysitters found</p>;
    }

    return (
      <>
        {babysitters &&
          babysitters.map(
            (babysitter) =>
              babysitter && (
                <BabysitterCard key={babysitter.id} {...babysitter} />
              ),
          )}
      </>
    );
  };

  return (
    <>
      <Box
        sx={{
          padding: "4px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#F8F7F1",
        }}
      >
        <Button
          variant="text"
          sx={{ textTransform: "none" }}
          size="large"
          onClick={fetchBabysitters}
        >
          Refresh Babysitters list
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          flexWrap: "wrap",
          padding: "20px 10px",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F8F7F1",
          minHeight: "100vh",
        }}
      >
        <Content />
      </Box>
    </>
  );
};
export default Find;
