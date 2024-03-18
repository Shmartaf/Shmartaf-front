import React from "react";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDataContext } from "../context/DataContext";
// import Modal from "./Modal";
// import Modal from "@mui/material/Modal";
import CustomModal from "./Modal";

import BabysitterCard from "./BabysitterCard";






const EventsTable = () => {
  const { babysitters } = useDataContext();
  const [open, setOpen] = React.useState(false);
  const [selectedBabysitter, setSelectedBabysitter] = React.useState(null);

  const handleOpen = (babysitter) => {
    setSelectedBabysitter(babysitter);
    setOpen(true);
  };


  const rows = babysitters.map((babysitter) => ({
    id: babysitter.user.id,
    number: babysitter.user.id,
    tag: babysitter.user.id.substr(0, 4), // Example tag based on user id
    name: babysitter.user.name,
    status: "Pending", // Example status
    image: `https://i.pravatar.cc/30?img=${babysitter.pictureid}`, // Example image based on picture id
  }));

  const getStatusColor = (status) => {
    if (status === "Completed") {
      return "#51CB3C";
    } else if (status === "Pending") {
      return "#036EFF";
    } else {
      return "#FC2725";
    }
  };
  const columns = [
    { field: "number", headerName: "No.", width: 100 },
    {
      field: "tag",
      headerName: "#Tag Any",
      width: 230,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            backgroundColor: "#f2f2f2",
            borderRadius: 2,
            padding: "5px 10px",
          }}
        >
          <Typography>{params.row.tag}</Typography>
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Babysitter",
      width: 230,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <img
            src={params.row.image}
            style={{ width: "34px", height: "34px", borderRadius: "50%" }}
          />
          <Typography>{params.row.name}</Typography>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <FiberManualRecordIcon
            sx={{ color: getStatusColor(params.row.status) }}
          />
          <Typography>{params.row.status}</Typography>
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {/* {console.log("babysitter in place:", babysitters.filter(babysitter => babysitter.user.id === params.row.id))} */}

          <Button
            LinkComponent={Link}
            onClick={() => handleOpen(babysitters.filter(babysitter => babysitter.user.id === params.row.id))}

            // to={`/orders/${params.row.id}`}
            // state={params.row}
            variant="contained"
            style={{ textDecoration: "none" }}
            size="small"
            sx={{ textTransform: "none" }}
          >
            Details
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Box width={"100%"} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5">Last Events</Typography>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 20, 50, 100]}
      />
      <CustomModal
        isOpen={open}
        onClose={() => setOpen(false)}
      >

        {selectedBabysitter && (
          <>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {console.log("selectedBabysitter", selectedBabysitter[0])}
              <BabysitterCard babysitter={selectedBabysitter[0]} />
            </Box>
          </>
        )}
        <Button onClick={() => setOpen(false)}>Close</Button>

      </CustomModal>

    </Box>
  );
};

export default EventsTable;