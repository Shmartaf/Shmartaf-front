import React, { Component } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  reloadPage = () => {
    window.location.reload();
  };

  render() {
    const { errorType = "default" } = this.props;

    if (this.state.hasError) {
      switch (errorType) {
        case "modal":
          // Handle error with a modal and option to go back to login
          return (
            <Dialog open={true} onClose={this.reloadPage}>
              <DialogTitle>Error</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  An error occurred. Please go back to the login page and try
                  again.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={this.reloadPage}
                  variant="contained"
                  color="primary"
                >
                  Go Back to Login
                </Button>
              </DialogActions>
            </Dialog>
          );
        case "element":
          // Handle error by adding an element to the screen
          return (
            <Typography
              variant="body1"
              color="error"
              style={{ padding: "20px" }}
            >
              Error: Unable to load content. Please try again later.
            </Typography>
          );
        default:
          // Default case: Show a friendly message with reload option
          return (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <Typography variant="h6">Oops! Something went wrong.</Typography>
              <Typography>
                We're sorry, but an error occurred while loading the
                application.
              </Typography>
              <Button
                variant="contained"
                onClick={this.reloadPage}
                color="primary"
              >
                Reload the Page
              </Button>
            </div>
          );
      }
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
