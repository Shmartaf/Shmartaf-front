import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import BabysitterCard from "../components/BabysitterCard";
import { useAuth } from "../AuthContext";
import { useDataContext } from "../context/DataContext";

const Contacted = () => {
  const data = useDataContext();
  const [contacted, setContacted] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
      const contacted2 = user.userData.contacted || [];
      setContacted(contacted2);

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
      {contacted.length > 0 ? (
        contacted.map(
          (contacted) => (
            (
              <BabysitterCard
                key={contacted.babysitter.id}
                {...{"babysitter": contacted.babysitter}}
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
          <p>No contacted</p>
        </div>
      )}
    </Box>
  );
};

export default Contacted;
