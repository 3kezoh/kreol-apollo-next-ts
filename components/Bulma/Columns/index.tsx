import { ReactNode } from "react";
import classNames from "classnames";

type Props = {
  m?: number;
  p?: number;
  children?: ReactNode;
};

const Columns = ({ m, p, children }: Props) => {
  const classes: { [index: string]: boolean } = {};

  classes[`m-${m || "0"}`] = true;
  classes[`p-${p || "0"}`] = true;

  const className = classNames("columns", classes);

  return <div className={className}>{children}</div>;
};

export default Columns;
