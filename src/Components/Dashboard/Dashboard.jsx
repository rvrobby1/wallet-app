import React from "react";
import { Container } from "@mui/material";
function Dashboard({children}) {

  return (
      <Container
        // fluid
        sx={{paddingLeft:0, paddingRight:0}}
      >
        {children}
      </Container>
  );
}

export default Dashboard;