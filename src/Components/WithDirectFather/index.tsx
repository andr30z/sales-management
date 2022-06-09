import React from "react";

export function WithDirectFather<F, C>(Father: React.FC<F>, Child: React.FC) {
  return (props: F) => (
    <Father {...props}>
      <Child />
    </Father>
  );
}
