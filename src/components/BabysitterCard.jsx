import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Rating,
} from "@mui/material";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { get, addFavoriteBabysitter, removeFavoriteBabysitter } from "../api";
import { useAuth } from "../AuthContext";
import { useDataContext } from "../context/DataContext";

const BabysitterCard = (props) => {
  const [babysitterDetails, setBabysitterDetails] = useState(null);
  const { user } = useAuth();
  const [isReviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: "",
    flexibilityrating: 0,
    reliabilityrating: 0,
    interpersonalrating: 0,
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const { fetchParent, fetchBabysitter, babysitters } = useDataContext();

  console.log("babysitters card is in progress: ", props);
  console.log("Babysitter object: ", props.babysitter);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const babysitt = babysitters.find((b) => b.id === props.babysitter.id);
        setBabysitterDetails(babysitt);
        console.log("babysitterDetails", babysitterDetails);
      } catch (error) {
        console.error("Error fetching babysitter details:", error);
        setError(error);
      }
    };


    const checkFavoriteStatus = () => {
      if (user && babysitterDetails) {
        const isFav = user.userData.favorites.find(f => f.babysitter.id === babysitterDetails.id);
        setIsFavorite(!!isFav);
      }
    };

    if (props.babysitter) {
      fetchDetails();
    }
    checkFavoriteStatus();
  }, [props]);


  const toggleFavorite = async () => {
    if (!user || !babysitterDetails) {
      console.error("User or babysitterDetails not defined.");
      return;
    }
  
    const isFav = user.userData.favorites.find(f => f.babysitter.id === babysitterDetails.id);
    try {
      let response;
      if (!isFav) {
        response = await addFavoriteBabysitter(user.id, babysitterDetails.id);
      } else {
        response = await removeFavoriteBabysitter(user.id, babysitterDetails.id);
      }
      console.log("Favorite status updated", response);

      setIsFavorite(!isFav);

    } catch (error) {
      console.error("Error toggling favorite:", error);
      setError("Failed to update favorites, please try again.");
    }
  };
  
  const openReviewDialog = () => {
    setReviewDialogOpen(true);
  };

  const closeReviewDialog = () => {
    setReviewDialogOpen(false);
  };

  const handleReviewSubmit = async () => {
    try {
      if (user && user.userData.userType === "parent") {
        const reviewForm = {
          parentid: user.id,
          babysitterid: babysitterDetails.id,
          rating: reviewData.rating,
          comment: reviewData.comment,
          flexibilityrating: reviewData.flexibilityrating,
          reliabilityrating: reviewData.reliabilityrating,
          interpersonalrating: reviewData.interpersonalrating,
        };
        return await fetch(`${BASE_URL}/parents/${user.id}/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewForm),
        });
      } else {
        const reviewForm = {
          babysitterid: user.id,
          parentid: babysitterDetails.id,
          rating: reviewData.rating,
          comment: reviewData.comment,
          flexibilityrating: reviewData.flexibilityrating,
          reliabilityrating: reviewData.reliabilityrating,
          interpersonalrating: reviewData.interpersonalrating,
        };
        closeReviewDialog();
        const result = await fetch(
          `${BASE_URL}/babysitters/${user.id}/reviews`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewForm),
          },
        );
        if (!result.ok) {
          throw new Error("Failed to submit review");
        }
      }
      // Close the review dialog and update UI as needed
    } catch (error) {
      console.error("Error submitting review:", error);
      closeReviewDialog();
      setError("Failed to submit review, please try again.");
    }
  };

  return (
    <Box className="babysitter-card relative">
      {error && (
        <div className="bg-red-500 text-white p-2 mt-4 rounded">
          {error}
          <button className="float-right" onClick={() => setError(null)}>
            Close
          </button>
        </div>
      )}
      <img
        className="w-full"
        src={`https://i.pravatar.cc/300?img=${babysitterDetails?.pictureid}`}
        alt={`Babysitter - ${babysitterDetails?.user?.name}`}
      />
      <div className="absolute top-0 right-0 p-4">
        <Button onClick={toggleFavorite} className="mr-2">
          {isFavorite ? (
            <FavoriteIcon className="text-red-500" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </Button>

        <Button onClick={openReviewDialog} className="bg-blue-500 text-white">
          Write Review
        </Button>
      </div>
      <Box className="flex items-center space-x-2">
        <StarIcon sx={{ color: "#5B5CFD" }} />
        <Typography variant="h6">
          {babysitterDetails?.user?.rating || "4.5"}
        </Typography>
      </Box>
      <Typography variant="h5" fontWeight="bold" className="mt-2">
        {babysitterDetails?.user?.name}
      </Typography>

      <Typography variant="h6" fontWeight="bold">
        {babysitterDetails?.user?.street}, {babysitterDetails?.user?.city}
      </Typography>
      <Box className="flex items-center space-x-2 p-2">
        <Typography>{babysitterDetails?.description}</Typography>
      </Box>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onClose={closeReviewDialog}>
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <Rating
            name="rating"
            value={reviewData.rating}
            onChange={(event, newValue) =>
              setReviewData({ ...reviewData, rating: newValue })
            }
          />
          <TextField
            label="Comment"
            multiline
            rows={4}
            value={reviewData.comment}
            onChange={(event) =>
              setReviewData({ ...reviewData, comment: event.target.value })
            }
            className="w-full mt-4"
          />
          <Typography>Flexibility:</Typography>
          <Rating
            name="flexibilityRating"
            value={reviewData.flexibilityRating}
            onChange={(event, newValue) =>
              setReviewData({ ...reviewData, flexibilityRating: newValue })
            }
            className="mt-2"
          />
          <Typography>Reliability:</Typography>
          <Rating
            name="reliabilityRating"
            value={reviewData.reliabilityRating}
            onChange={(event, newValue) =>
              setReviewData({ ...reviewData, reliabilityRating: newValue })
            }
            className="mt-2"
          />
          <Typography>Interpersonal Skills:</Typography>
          <Rating
            name="interpersonalRating"
            value={reviewData.interpersonalRating}
            onChange={(event, newValue) =>
              setReviewData({ ...reviewData, interpersonalRating: newValue })
            }
            className="mt-2"
          />
          <Button
            onClick={handleReviewSubmit}
            className="mt-4 bg-blue-500 text-white"
          >
            Submit Review
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default BabysitterCard;
