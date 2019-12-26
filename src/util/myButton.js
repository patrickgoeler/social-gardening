import React from "react";

// Material
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

export default ({
  children,
  btnOnClick,
  tip,
  tipPlacement,
  btnClassName,
  tipClassName
}) => (
  <Tooltip title={tip} className={tipClassName} placement={tipPlacement}>
    <IconButton onClick={btnOnClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
);
