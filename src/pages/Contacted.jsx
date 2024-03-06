import React, { useState, useEffect } from "react";
import ContactedListContainer from "../components/ContactedListComponent";
import { Grid, Typography } from "@mui/material";
import { useAuth } from "../AuthContext";
import { get } from "../api";
import ErrorBoundary from "./ErrorBoundary";
const Contacted = () => {
  const [contacted, setContacted] = useState([]);
  const { user } = useAuth();

  const fetchContacted = async () => {
    if (user.userData.user?.userType === "parent") {
      const parent = await get("parents", user.id);
      console.log("parent:", parent);
      const contacted = parent.contacted;
      console.log("contacted:", contacted);
      setContacted(contacted);
    } else {
      const babysitter = await get("babysitters", user.id);
      console.log("babysitter:", babysitter);
      const contacted = babysitter.contacted;
      console.log("contacted:", contacted);
      setContacted(contacted);
    }
  };

  useEffect(() => {
    if (user && !contacted) {
      fetchContacted();
      console.log("contacted:", contacted);
    }
  });
  return (
    <div>
      <h1>Contacted</h1>
      <Grid container spacing={2} className="ml-4">
        {contacted ? (
          contacted.map((item) => (
            <Grid item key={item.id} xs={4} sm={4} md={2} lg={2}>
              {/* Adjust the Grid item sizes based on your layout needs */}
              <ErrorBoundary errorType="modal">
                <ContactedListContainer contactedData={contacted} />
              </ErrorBoundary>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" className="m-4">
            No contacted babysitters
          </Typography>
        )}
      </Grid>
    </div>
  );
};
export default Contacted;
