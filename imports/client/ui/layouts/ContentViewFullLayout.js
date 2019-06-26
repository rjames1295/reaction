/**
 * Component provies a fill width and height, non-scrollable container
 * for dashboard layouts that want to defin their on scroll zones.
 */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    paddingTop: theme.mixins.toolbar.minHeight,
    background: "",
    flexGrow: 1,
    transition: "padding 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    overflow: "hidden"
  },
  leftSidebarOpen: {
    paddingLeft: theme.spacing.drawerWidth
  }
});

const ContentViewFullLayout = ({ children, classes, isSidebarOpen }) => (
  <div
    className={
      classNames(classes.root, {
        [classes.leftSidebarOpen]: isSidebarOpen
      })
    }
  >
    {children}
  </div>
);

ContentViewFullLayout.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  isMobile: PropTypes.bool,
  isSidebarOpen: PropTypes.bool
};

export default withStyles(styles, { name: "RuiContentViewFullLayout" })(ContentViewFullLayout);