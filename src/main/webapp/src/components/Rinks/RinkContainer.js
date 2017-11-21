import React from "react";
import RinkCard from "./RinkCard";
import { withStyles } from "material-ui/styles";

const rinks = [
  { name: "RinkOne" },
  { name: "RinkTwo" },
  { name: "RinkThree" }
];

const styles = theme => ({
  
});

export default withStyles(styles)(() => (
  <div>
    {
      rinks.map((rink) => <RinkCard rinkName={rink.name} />)
    }
  </div>
));