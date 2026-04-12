"use client";

import Link from "next/link";
import React from "react";

interface AestheticLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export default function AestheticLink({ href, children, className = "", external, ...props }: AestheticLinkProps) {
  const isExternal = external || href.startsWith("http");

  const classes = `aesthetic-link ${className}`;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
