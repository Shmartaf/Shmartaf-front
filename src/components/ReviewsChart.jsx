import React from 'react';
import { PieChart } from "@mui/x-charts/PieChart";
import { Card, Typography, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useAuth } from "../AuthContext";
import { BASE_URL } from "../api";

const ReviewsChart = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = React.useState([]);
  const [reviewsAmount, setReviewsAmount] = React.useState(0);

  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${BASE_URL}/babysitters/${user.id}/reviews`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
          setReviewsAmount(data.length);
        } else {
          console.error('Error fetching reviews:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchReviews();
  }, [user.id, user.token]);

  // Calculate summary for the PieChart
  const calculateSummary = () => {
    const summary = reviews.reduce((acc, review) => {
      const totalRating = review.rating + review.flexibilityrating + review.reliabilityrating + review.interpersonalrating;
      acc[review.rating] = (acc[review.rating] || 0) + (review.rating / totalRating) * 100;
      return acc;
    }, {});
    return Object.entries(summary).map(([rating, value]) => ({
      x: `Rating ${rating}`,
      value: Math.round(value),
    }));
  };

  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minWidth: 250,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h7" color={"#8a8a8a"}>
            Reviews
          </Typography>
          <Typography variant="h4" color={"#000"}>
            {reviewsAmount}
          </Typography>
          <Typography variant="h7" color={"#8a8a8a"}>
            people left a review
          </Typography>
        </Box>
        <InfoIcon sx={{ color: "gray" }} />
      </Box>
      <hr></hr>
      {reviews.length === 0 ? (
        <Typography variant="h7" color={"#8a8a8a"}>
          No reviews yet
        </Typography>
      ) : (
        <PieChart
          series={[{ data: calculateSummary() }]}
          padding={10}
          width={200}
          height={200}
        />
      )}
    </Card>
  );
};

export default ReviewsChart;
