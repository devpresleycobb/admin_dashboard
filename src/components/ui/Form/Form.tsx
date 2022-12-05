import React from "react";

export default function Form({children, onSubmit}: {children: React.ReactNode, onSubmit: (e: React.MouseEvent<HTMLFormElement>) => void}) {
  console.log('children', children);
  console.log(React.Children.toArray(children));
  return (
    <form onSubmit={onSubmit}>{children}</form>
  )
}
