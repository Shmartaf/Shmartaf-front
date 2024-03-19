// Reviews.jsx

import React from "react";
import { Box, Typography, Paper, Rating } from "@mui/material";
import { useDataContext } from "../context/DataContext";

const Reviews = ({ reviews }) => {
  // const classes = useStyles();
  const { babysitters, parents } = useDataContext();

  const fetchName = (id) => {
    const babysitter = babysitters.find((b) => b.id === id);
    const parent = parents.find((p) => p.id === id);
    console.log("babysitter", babysitter);
    console.log("parent", parent);
    return babysitter?.user.name || parent?.user.name;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Reviews
      </Typography>
      {reviews.map((review) => (
        <Paper key={review.id} className="m-4" elevation={3}>
          <div className="m-4">
            <Typography
              variant="h6"
              component="span"
              style={{ marginRight: "10px" }}
            >
              {fetchName(review.reviewerid) || "Unknown"}:
            </Typography>
            <Rating
              name="rating"
              value={review.rating}
              readOnly
              precision={0.5}
            />
          </div>
          <Typography variant="subtitle1">
            Flexibility: {review.flexibilityrating}
          </Typography>
          <Typography variant="subtitle1">
            Reliability: {review.reliabilityrating}
          </Typography>
          <Typography variant="subtitle1">
            Interpersonal: {review.interpersonalrating}
          </Typography>
          <Typography className="m-4" variant="body1">
            {review.comment}
          </Typography>
        </Paper>
      ))}
    </div>
  );
};

export default Reviews;
