import React from "react";
import { withStyles } from "material-ui/styles";
import { GridList, GridListTile, GridListTileBar } from "material-ui/GridList";
import Subheader from "material-ui/List/ListSubheader";
import IconButton from "material-ui/IconButton";
import InfoIcon from "material-ui-icons/Info";
import tileData from "./tileData";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    background: theme.palette.background.paper
  },
  gridList: {
    flex: 1,
    height: '150px',
  }
});

export default withStyles(styles)(({ classes: c }) => (
  <div className={c.container}>
    <GridList cellHeight={180} className={c.gridList}>
      <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
        <Subheader component="div">December</Subheader>
      </GridListTile>
      {tileData.map(tile => (
        <GridListTile key={tile.img}>
          <img src={tile.img} alt={tile.title} />
          <GridListTileBar
            title={tile.title}
            subtitle={<span>{tile.author}</span>}
            actionIcon={
              <IconButton>
                <InfoIcon color="rgba(255, 255, 255, 0.54)" />
              </IconButton>
            }
          />
        </GridListTile>
      ))}
    </GridList>
  </div>
));
