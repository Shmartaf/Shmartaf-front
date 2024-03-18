import { Button, Card, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDataContext } from "../context/DataContext";
import { useState } from "react";
import CustomModal from "./Modal";
import ChildrenTable from "./ChildrenDetailsTable";

const getStatusColor = (status) => {
  if (status === "Completed") {
    return "#51CB3C";
  } else if (status === "Pending") {
    return "#036EFF";
  } else {
    return "#FC2725";
  }
}

const JobOpp = () => {
  const { parents } = useDataContext();
  const [selectedParent, setSelectedParent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  console.log("parents", parents);
  const handleOpenModal = (parent) => {
    console.log("parent", selectedParent);
    setSelectedParent(parent);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const rows = parents.map((parent, index) => ({
    id: index + 1,
    number: index + 1,
    date: parent.user.registrationdate,
    name: parent.user.name,
    status: "Status", // Replace with appropriate status based on your data
    image: `https://i.pravatar.cc/30?img=${index + 1}`, // Replace with appropriate image URL
    childrens: parent.childrens,
    favorites: parent.favorites,
    description: parent.description,
    address: `${parent.user.city}, ${parent.user.street}`,

  }));

  const actionColumn = [
    {
      field: "action",
      headerName: "",
      width: 80,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button
              LinkComponent={Link}
              // to={`/orders/${params.row.id}`}
              // state={params.row}
              onClick={() => handleOpenModal(params.row)}
              variant="contained"
              style={{ textDecoration: "none" }}
              size="small"
              sx={{ textTransform: "none" }}
            >
              Details
            </Button>
          </Box>
        );
      },
    },
  ];

  const columns = [
    { field: "number", headerName: "No.", width: 60 },
    {
      field: "date",
      headerName: "Date",
      width: 120,
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
          <Typography>{params.row.date}</Typography>
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Parent",
      width: 230,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <img
            src={params.row.image}
            style={{ width: "34px", height: "34px", borderRadius: "50%" }}
            alt={params.row.name}
          />
          <Typography>{params.row.name}</Typography>
        </Box>
      ),
    },
    {
      field: "Address",
      headerName: "Address",
      width: 400,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>

          <Typography>{params.row.address}</Typography>
        </Box>
      ),
    },
    {
      field: "Childrens",
      headerName: "Childrens",
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography>{params.row.childrens.length}</Typography>
        </Box>
      ),
    }
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        pt: 2,
        pr: 2,
        backgroundColor: "#F8F7F1",
      }}
    >
      <Card
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 250,
          width: "100%",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Box
          width={"100%"}
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Typography variant="h6">Job Opportunities</Typography>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns.concat(actionColumn)}
          pageSize={10}
          checkboxSelection={false}
        />
      </Card>

      <CustomModal
        isOpen={showModal}
        onClose={handleCloseModal}
        children={<ChildrenTable children={selectedParent?.childrens} />}
      // children={<ChildrenTable parent={selectedParent.childrens} />}
      />
    </Box>
  );
};

export default JobOpp;
