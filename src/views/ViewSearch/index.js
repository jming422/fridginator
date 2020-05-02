/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { useRouteMatch } from "react-router-dom";

function ViewSearch() {
  const match = useRouteMatch("/view/:place");
  const place = match.params.place;

  return <p>view: {place}</p>;
}

export default ViewSearch;
