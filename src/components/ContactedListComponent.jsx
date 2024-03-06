import React from "react";
import BabysitterCard from "./BabysitterCard";

const ContactedListComponent = ({ contactedData }) => {
  return (
    <div>
      <h3>Contacted List Component</h3>
      <div>
        {contactedData.map(
          (contactedItem) => (
            console.log("contactedItem:", contactedItem),
            (
              <BabysitterCard
                key={contactedItem.babysitter}
                {...contactedItem.babysitter}
              />
            )
          ),
        )}
      </div>
    </div>
  );
};

export default ContactedListComponent;
