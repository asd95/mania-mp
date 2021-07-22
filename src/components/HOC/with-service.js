import React from "react";
import { ServiceConsumer } from "../../service";

const withService = () => (Wrapped) => {
  return (props) => {
    return (
      <ServiceConsumer>
        {(service) => {
          return <Wrapped {...props} service={service} />;
        }}
      </ServiceConsumer>
    );
  };
};

export default withService;
