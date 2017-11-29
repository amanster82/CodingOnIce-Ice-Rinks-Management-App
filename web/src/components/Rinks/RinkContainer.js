import React from "react";
import RinkCard from "./RinkCard";
import { withStyles } from "material-ui/styles";
import { compose, lifecycle, branch, renderComponent } from "recompose";
import { getAllRinks } from "lib/api/rinks";
import { CircularProgress } from "material-ui/Progress";

import rink1Image from "./images/rink1.jpg";
import rink2Image from "./images/rink2.jpg";
import rink3Image from "./images/rink3.jpg";
import rink4Image from "./images/rink4.jpg";
import rink5Image from "./images/rink5.jpg";
import rink6Image from "./images/rink6.jpg";
import rink7Image from "./images/rink7.jpg";
import rink9Image from "./images/rink9.jpg";
import rink10Image from "./images/rink10.jpg";

const images = [
  rink1Image,
  rink2Image,
  rink3Image,
  rink4Image,
  rink5Image,
  rink6Image,
  rink7Image,
  rink9Image,
  rink10Image
];

const rinks = [
  {
    name: "Dogwood Rink",
    description:
      "A medium sized rink with plenty of seating located within Victoria.",
    address: "1218 Admirals, Victoria, B.C.",
    info: "Wheelchair Accessible",
    capacity: "Groups of 1-50",
    hours: "8am-9pm Daily",
    image: rink10Image
  },
  {
    name: "Celestial Rink",
    description: "A sunlit rink perfect for small groups.",
    address: "4063 Carling Avenue, Victoria, B.C.",
    info: "Wheelchair Accessible",
    capacity: "Groups of 1-20",
    hours: "8am-8pm Daily",
    image: rink9Image
  },
  {
    name: "Crown Rink",
    description: "An enclosed rink with limited viewing area.",
    address: "1415 Blanshard, Victoria, B.C.",
    info: "Wheelchair Accessible",
    capacity: "Groups of 1-30",
    hours: "10am-10pm Daily",
    image: rink7Image
  },
  {
    name: "Dominion Rink",
    description: "An enclosed rink located on the north side of Victoria.",
    address: "581 Burdett Avenue, Victoria, B.C.",
    info: "Wheelchair Accessible",
    capacity: "Groups of 1-30",
    hours: "6am-8pm Daily",
    image: rink6Image
  },
  {
    name: "Gold Rink",
    description:
      "Located in the center of Nanaimo Gold rink can cater to small and medium sized groups.",
    address: "3178 Wallace Street, Nanaimo, B.C.",
    info: "Wheelchair Accessible",
    capacity: "Groups of 1-20",
    hours: "8am-9pm Daily",
    image: rink5Image
  },
  {
    name: "Heart Rink",
    description:
      "An indoor rink capable of handling moderately sized groups for ice related activities.",
    address: "2400 Roger Street, Nanaimo, B.C.",
    info: "Wheelchair Accessible",
    capacity: "Groups of 1-40",
    hours: "8am-10pm Daily",
    image: rink4Image
  },
  {
    name: "Riverside Rink",
    description: "A large rink capable of large groups and crowds.",
    address: "3806 Roger Street, Duncan, B.C.",
    info: "Wheelchair Accessible",
    capacity: "Groups of 1-60",
    hours: "7am-9pm Daily",
    image: rink3Image
  },
  {
    name: "Azure Rink",
    description:
      "A wood frame rink that can cater to small and moderate groups.",
    address: "471 Scotts Lane, Ladysmith, B.C.",
    info: "Wheelchair Accessible",
    capacity: "Groups of 1-40",
    hours: "6am-9pm Daily",
    image: rink2Image
  },
  {
    name: "Emerald Rink",
    description:
      "The biggest rink in the area capable of handling large groups.",
    address: "402 Rockside, Parksville, B.C.",
    info: "Wheelchair Accessible",
    capacity: "Groups of 1-50",
    hours: "6am-10pm Daily",
    image: rink1Image
  }
];

const styles = theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    //backgroundColor: theme.palette.grey[300]
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  }
});

export default compose(
  withStyles(styles),
  lifecycle({
    componentDidMount() {
      getAllRinks().then(({ res, json }) => {
        this.setState({ rinks: json });
      });
    }
  }),
  branch(
    ({ rinks }) => !rinks,
    renderComponent(({ classes: c }) => (
      <div className={c.loading}>
        <CircularProgress />
      </div>
    )),
    renderComponent(({ classes: c, rinks }) => (
      <div className={c.container}>
        {rinks.map((rink, i) => (
          <RinkCard
            key={rink.id}
            rinkId={rink.id}
            rinkName={rink.name}
            rinkImage={images[i % images.length]}
            rinkDescription={rink.description}
            rinkAddress={rink.address}
            rinkInfo={rink.info}
            rinkCapacity={rink.capacity}
            rinkStartHour={rink.startHour}
            rinkEndHour={rink.endHour}
          />
        ))}
      </div>
    ))
  )
)();
