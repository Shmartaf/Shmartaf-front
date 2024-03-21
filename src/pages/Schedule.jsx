import {
  AccessTimeOutlined,
  Add,
  DeleteOutline,
  EditOutlined,
  NotesOutlined,
} from "@mui/icons-material";
import { Box, Typography, Card, Button, Modal, Input } from "@mui/material";
import { useState } from "react";

const DemoEvents = [
  {
    title: "Event Title",
    startTime: "09:00",
    endTime: "11:00",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elite.",
    image: "https://i.pravatar.cc/30?img",
    username: "User Name",
  },
  {
    title: "Event Title",
    startTime: "09:00",
    endTime: "11:00",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elite.",
    image: "https://i.pravatar.cc/30?img",
    username: "User Name",
  },
  {
    title: "Event Title",
    startTime: "09:00",
    endTime: "11:00",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elite.",
    image: "https://i.pravatar.cc/30?img",
    username: "User Name",
  },
];

const Schedule = () => {
  const [events, setEvents] = useState(DemoEvents);

  const generateWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() - currentDay + i);
      const dayName = day.toLocaleDateString("en-US", { weekday: "long" });
      const date = day.getDate();
      const month = day.toLocaleDateString("en-US", { month: "short" });

      days.push(`${dayName}, ${date} ${month}`);
    }

    return days;
  };

  const weekDays = generateWeekDays();

  const generateDailyHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const formattedHour = `${i.toString().padStart(2, "0")}:00`;
      hours.push(formattedHour);
    }
    return hours;
  };

  const dailyHours = generateDailyHours();

  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  const [openEvent, setOpenEvent] = useState(-1); //-1 Hidden, 0 New Event, 1> Editing Event by Index

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        width: "100%",
        backgroundColor: "#F8F7F1",
        padding: 5,
        minHeight: "100vh",
      }}
    >
      <Typography variant="h5" fontWeight={"bold"} gutterBottom={false}>
        Schedule
      </Typography>
      <Typography variant="p" gutterBottom={false}>
        {new Date().toDateString()}
      </Typography>

      <Card
        sx={{
          display: "flex",
          flexDirection: "column",

          borderRadius: 2,
          boxShadow: 2,
          marginTop: 3,
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 1.25,
            borderBottom: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          {weekDays.map((day, index) => (
            <Button
              onClick={() => {
                setCurrentDay(index);
              }}
              key={index}
              variant={currentDay == index ? "contained" : "outlined"}
            >
              {day}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr" }}>
          {/*<Box
            sx={{
              p: 2,
              borderRight: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="p" fontWeight={"500"} gutterBottom={false}>
              Select Time of Day
            </Typography>

            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}
            >
               {dailyHours.map((day, index) => (
                <Button
                  onClick={() => {
                    setCurrentHour(index);
                  }}
                  key={index}
                  variant={currentHour == index ? "contained" : "outlined"}
                >
                  {day}
                </Button>
              ))} 
            </Box>
          </Box>*/}
          <Box
            sx={{
              padding: "16px 24px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="p" gutterBottom={false}>
                Events at{" "}
                <span style={{ fontWeight: 500 }}>
                  {weekDays[currentDay]} ({dailyHours[currentHour]})
                </span>
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  onClick={() => setOpenEvent(0)}
                  variant="text"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <Add
                    sx={{ fontSize: 18, transform: "translateY(-0.75px)" }}
                  />
                  create Event
                </Button>
              </Box>
            </Box>

            <Box sx={{ maxWidth: "500px", margin: "auto" }}>
              {events.map((event, i) => (
                <Card
                  key={i}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    p: 2,
                    marginTop: 1.5,
                    boxShadow: 0,
                    backgroundColor: "#f8f8f8",
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="p"
                      sx={{ fontSize: 18 }}
                      fontWeight={500}
                      gutterBottom={false}
                    >
                      {event.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="p"
                    sx={{ fontSize: 15, mt: 0.5 }}
                    gutterBottom={false}
                  >
                    <AccessTimeOutlined
                      sx={{
                        fontSize: 17,
                        mr: 0.5,
                        transform: "translateY(-1.5px)",
                      }}
                    />
                    {event.startTime} - {event.endTime}
                  </Typography>

                  <Typography
                    variant="p"
                    sx={{ fontSize: 15, mt: 0.5 }}
                    gutterBottom={false}
                  >
                    <NotesOutlined
                      sx={{
                        fontSize: 17,
                        mr: 0.5,
                        transform: "translateY(-1.25px)",
                      }}
                    />
                    {event.note}
                  </Typography>

                  <Box
                    sx={{
                      mt: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        mt: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <img
                        src={event.image}
                        alt="avatar"
                        style={{ height: 25, width: 25, borderRadius: 100 }}
                      />
                      <Typography
                        variant="p"
                        sx={{ fontSize: 15 }}
                        gutterBottom={false}
                      >
                        {event.username}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        mt: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <button
                        onClick={() => {
                          const updatedEvents = events.filter(
                            (_, index) => index !== i
                          );
                          setEvents(updatedEvents);
                        }}
                      >
                        <DeleteOutline sx={{ fontSize: 22 }} />
                      </button>
                      <button onClick={() => setOpenEvent(i + 1)}>
                        <EditOutlined sx={{ fontSize: 22 }} />
                      </button>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Card>

      {openEvent >= 0 && (
        <EventModal
          openEvent={openEvent}
          object={
            openEvent > 0
              ? events[openEvent - 1]
              : {
                  title: "",
                  startTime: "",
                  endTime: "",
                  note: "",
                  image: "https://i.pravatar.cc/30?img",
                  username: "User Name",
                }
          }
          onClose={() => {
            setOpenEvent(-1);
          }}
          onSave={(event) => {
            if (openEvent == 0) {
              setEvents([...events, event]);
            } else if (openEvent > 0) {
              const updatedEvents = events.map((currentEvent, index) => {
                if (index === openEvent - 1) {
                  return event; // Return the updated event
                }
                return currentEvent; // Return unchanged event
              });
              setEvents(updatedEvents);
            }
          }}
        />
      )}
    </Box>
  );
};

// eslint-disable-next-line react/prop-types
function EventModal({ openEvent, object, onClose, onSave }) {
  console.log(object);
  const [event, setEvent] = useState(object);
  return (
    <Modal open={openEvent >= 0} onClose={() => onClose(-1)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",

          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {openEvent == 0 ? "Create Event" : "Edit Event"}
        </Typography>
        <Input
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
          placeholder="Event Title"
          sx={{ width: "100%", mt: 2 }}
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            mt: 3.5,
            gap: 2,
          }}
        >
          <div>
            <Typography sx={{}} variant="p">
              Start Time
            </Typography>
            <Input
              value={event.startTime}
              onChange={(e) =>
                setEvent({ ...event, startTime: e.target.value })
              }
              type="time"
              placeholder="Event Title"
              sx={{ width: "100%" }}
            />
          </div>

          <div>
            <Typography sx={{}} variant="p">
              End Time
            </Typography>
            <Input
              value={event.endTime}
              onChange={(e) => setEvent({ ...event, endTime: e.target.value })}
              type="time"
              placeholder="Event Title"
              sx={{ width: "100%" }}
            />
          </div>
        </Box>

        <Input
          value={event.note}
          onChange={(e) => setEvent({ ...event, note: e.target.value })}
          placeholder="Note"
          sx={{ width: "100%", mt: 3.5 }}
        />

        <Button
          onClick={() => {
            if (event.title && event.startTime && event.endTime) {
              onSave(event);
              setTimeout(() => {
                onClose(-1);
              }, 5);
            }
          }}
          variant="contained"
          sx={{ mt: 3, width: "100%" }}
        >
          {openEvent == 0 ? "Create Event" : "Edit Event"}
        </Button>
      </Box>
    </Modal>
  );
}
export default Schedule;
