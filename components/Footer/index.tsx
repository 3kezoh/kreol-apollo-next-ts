import { ReactNode } from "react";

type Props = { children: ReactNode };

import { Footer as _Footer } from "react-bulma-components";

export const Footer = ({ children }: Props) => <_Footer>{children}</_Footer>;
