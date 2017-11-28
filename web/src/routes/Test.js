import React from "react";
import Test from "components/Test/AnimationTest";
import { withStyles } from "material-ui/styles";

const styles = theme => ({});

export default withStyles(styles)(() => (
    <div>
      <Test />
    </div>
  ));