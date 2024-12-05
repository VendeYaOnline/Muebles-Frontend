"use client";

import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
import { clsx } from "clsx";

interface ActiveLinkProps extends LinkProps {
  children: React.ReactNode;
  activeClassName: string;
  className?: string;
}

const ActiveLink = ({
  href,
  children,
  activeClassName,
  className = "",
  ...props
}: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(className, { [activeClassName]: isActive })}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
