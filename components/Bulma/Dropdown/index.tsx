import classNames from "classnames";
import { createElement, ReactNode } from "react";
import { Content } from "./Content";
import { Item } from "./Item";
import { Menu } from "./Menu";

type Props = { children: ReactNode; hoverable: boolean; active: boolean };

export const Dropdown = ({ hoverable, active, children, ...props }: Props) => {
  const classes = { "is-hoverable": hoverable, "is-active": active };
  const className = classNames("dropdown", classes);
  return createElement("ul", { className, ...props }, children);
};

Dropdown.Content = Content;
Dropdown.Item = Item;
Dropdown.Menu = Menu;
