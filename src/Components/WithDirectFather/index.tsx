import React from "react";

export function WithDirectFather<F = {}, C = {}>(
  Father: React.FC<F>,
  Child: React.FC<C>
) {
  return ({ childProps, fatherProps }: { fatherProps?: F; childProps?: C }) => (
    <Father {...(fatherProps as any)}>
      <Child {...(childProps as any)} />
    </Father>
  );
}
