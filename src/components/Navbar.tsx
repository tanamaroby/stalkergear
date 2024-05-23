"use client";
import { map, toUpper } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const navigationMenuItems: { href: string; title: string }[] = [
  { href: "/", title: "Home" },
  { href: "/users", title: "Users" },
];

const Navbar: FC = () => {
  return (
    <div className="flex flex-row justify-between items-center border-b-slate-500 border-b p-4 gap-x-8">
      <Link href="/">
        <Image src="logo.svg" alt="logo" height={100} width={100} />
      </Link>
      <div className="flex flex-row items-center gap-x-8">
        {...map(navigationMenuItems, (item) => {
          return (
            <Link
              href={item.href}
              key={item.title}
              className="text-lg hover:text-slate-400"
            >
              {toUpper(item.title)}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
