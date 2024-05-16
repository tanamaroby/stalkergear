"use client";
import { FC } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { map } from "lodash";
import Link from "next/link";

const navigationMenuItems: { href: string; title: string }[] = [
  { href: "/", title: "Home" },
];

const Navbar: FC = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {...map(navigationMenuItems, (item) => {
          return (
            <NavigationMenuItem>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
