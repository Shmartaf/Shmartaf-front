import React, { useState } from "react";
import Reviews from "../components/Reviews";
import { useDataContext } from "../context/DataContext";
import { BASE_URL } from "../api";
import { useAuth } from "../AuthContext";
// SampleData.js

export const sampleReviews = [
  {
    id: "1",
    reviewer: { id: "1", name: "John Doe" },
    rating: 4.5,
    flexibilityrating: 4,
    reliabilityrating: 5,
    interpersonalrating: 4.5,
    comment: "Great experience working with this user!",
  },
  // Add more sample reviews as needed
];

const ReviewsPage = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  // Simulate fetching reviews based on user_id
  // Replace this with your actual API call
  const fetchReviews = async (user_id) => {
    try {
      const response = await fetch(`${BASE_URL}/babysitters/${user_id}/reviews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Reviews data:", data);
        setReviews(data);
        console.log("Reviews:", reviews);
      } else {
        console.error("Error fetching reviews:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  React.useEffect(() => {
    // Assuming user_id is known or passed as a prop
    if (user && user.id) {
      fetchReviews(user.id);

    }


  }, []);

  return (
    <div>
      {/* Other components or content */}
      <Reviews reviews={reviews} />
    </div>
  );
};

export default ReviewsPage;
