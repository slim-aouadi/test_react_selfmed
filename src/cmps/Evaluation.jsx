import React, { Component } from "react";
import {
  Star as StarFilledIcon,
  StarBorder as StarEmptyIcon
} from "@material-ui/icons";

export const Evaluation = ({ stars, maxStars }) => {
  var indents = [];
  for (var i = 0; i < maxStars; i++) {
    var element = <StarEmptyIcon />
    if (i <= stars - 1) {
      element = <StarFilledIcon />
    }
    indents.push(element)
  }
  return indents;

};
