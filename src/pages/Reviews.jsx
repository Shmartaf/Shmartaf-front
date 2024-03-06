import React from "react";
import Reviews from "../components/Reviews";

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
  // Simulate fetching reviews based on user_id
  // Replace this with your actual API call
  const fetchReviews = (user_id) => {
    // Simulated API call with static data
    return sampleReviews;
  };

  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    // Assuming user_id is known or passed as a prop
    const user_id = "123";

    const res = fetchReviews(user_id);
    setReviews(res);
  }, []);

  return (
    <div>
      {/* Other components or content */}
      <Reviews reviews={reviews} />
    </div>
  );
};

export default ReviewsPage;
