import React from "react";
import { PrivateBodyContainer } from "../components";

interface Props {}

export function Panel(props: Props) {
  return (
    <PrivateBodyContainer title="Panel">
      <div>Panel!</div>
    </PrivateBodyContainer>
  );
}
