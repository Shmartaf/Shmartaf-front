// Reviews.jsx

import React from "react";
import { Box, Typography, Paper, Rating } from "@mui/material";
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//     reviewContainer: {
//         padding: theme.spacing(2),
//         marginBottom: theme.spacing(2),
//     },
//     ratingContainer: {
//         display: 'flex',
//         alignItems: 'center',
//         marginBottom: theme.spacing(1),
//     },
//     comment: {
//         marginTop: theme.spacing(1),
//     },
// }));

const Reviews = ({ reviews }) => {
  // const classes = useStyles();

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
              {review.reviewer.name}:
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
