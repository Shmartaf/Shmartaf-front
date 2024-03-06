import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const rows = [
  {
    id: 1,
    number: 1,
    tag: "6485",
    name: "Odel Levi",
    status: "Completed",
    image: "https://i.pravatar.cc/30?img=1",
  },

  {
    id: 2,
    number: 2,
    tag: "5665",
    name: "Razib Rahman",
    status: "Pending",
    image: "https://i.pravatar.cc/30?img=2",
  },

  {
    id: 3,
    number: 3,
    tag: "1755",
    name: "Luke Norton",
    status: "In route",
    image: "https://i.pravatar.cc/30?img=3",
  },
];

function getStatusColor(status) {
  if (status === "Completed") {
    return "#51CB3C";
  } else if (status === "Pending") {
    return "#036EFF";
  } else {
    return "#FC2725";
  }
}

const columns = [
  { field: "number", headerName: "No.", width: 100 },
  {
    field: "tag",
    headerName: "#Tag Any",
    width: 230,
    renderCell: (params) => {
      return (
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
      );
    },
  },
  {
    field: "name",
    headerName: "BabySitter",
    width: 230,
    renderCell: (params) => {
      return (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <img
            src={params.row.image}
            style={{ width: "34px", height: "34px", borderRadius: "50%" }}
          />
          <Typography>{params.row.name}</Typography>
        </Box>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    renderCell: (params) => {
      return (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <FiberManualRecordIcon
            sx={{ color: getStatusColor(params.row.status) }}
          />
          <Typography>{params.row.status}</Typography>
        </Box>
      );
    },
  },
];

const EventsTable = () => {
  const actionColumn = [
    {
      field: "action",
      headerName: "",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button
              LinkComponent={Link}
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
        );
      },
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Box width={"100%"} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5">Last Events</Typography>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 50 },
          },
          sorting: {
            sortModel: [{ field: "date", sort: "desc" }],
          },
        }}
        pageSizeOptions={[10, 20, 50, 100]}
        // checkboxSelection
        // onRowClick={(params) => { navigate(`/orders/${params.row.id}`) }}
      />
    </Box>
  );
};
export default EventsTable;
