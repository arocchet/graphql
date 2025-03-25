"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Divider,
  cn,
  NavbarProps,
  Button,
} from "@heroui/react";
import { Logo } from "../icons";
import { ThemeSwitch } from "../theme-switch";
import { siteConfig } from "@/config/site";

const BasicNavbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ classNames = {}, ...props }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const handleLinkClick = () => {
      setTimeout(() => {
        setIsMenuOpen(false);
      }, 100)
    };

    const handleLogout = () => {
      document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/";
    };

    const hasSessionCookie = document.cookie.includes("session=");

    return (
      <Navbar
        ref={ref}
        {...props}
        classNames={{
          base: cn(
            "fixed w-full items-center justify-center backdrop-blur-xl backdrop-saturate-150 max-w-xs sm:max-w-md md:max-w-screen-sm mx-auto rounded-large px-1.5 pr-[18px] md:pr-1.5 py-[5px] top-8 shadow-[0_4px_15px_0_rgba(0,0,0,0.25)]",
            {
              "border-none backdrop-blur-xl": isMenuOpen,
            }
          ),
          wrapper: "w-full max-w-[1024px] justify-between",
        }}
        height="40px"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        
      >
        {/* Left Content */}
        <NavbarBrand className="">
          <div className="rounded-large -ml-5">
            <Logo className="" />
          </div>
          <span className="ml-1 text-small font-medium text-default-700">
            {siteConfig.name}
          </span>
        </NavbarBrand>

        {/* Center Content */}
        <NavbarContent className="hidden md:flex" justify="center">
          {siteConfig.navItems.map((item, index) => (
            <NavbarItem key={index}>
              <Link className="text-[var(--textMinimal)]" href={item.href === "/login" && hasSessionCookie ? "/dashboard" : item.href} size="sm">
                {item.label === "Connexion" && hasSessionCookie
                  ? "Dashboard"
                  : item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Right Content */}
        <NavbarContent className="hidden md:flex mt-1" justify="end">
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
          {hasSessionCookie && (
            <NavbarItem>
              <Button
                size="sm"
                color="danger"
                onClick={handleLogout}
                className="ml-2 -mt-6"
              >
                Logout
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>

        {/* Moved NavbarMenuToggle to the right side */}
        <NavbarContent justify="end" className="md:hidden -mr-5">
          <ThemeSwitch />
          <NavbarMenuToggle
            className="text-default-400"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
          />
        </NavbarContent>

        <NavbarMenu
          className="z-30 px-6 fixed inset-x-0 w-screen flex-col gap-2 bottom-0 top-[initial] max-h-fit rounded-t-large bg-default-200/50 pb-6 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150"
          motionProps={{
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 50 },
            transition: {
              duration: 0.3,
              ease: "easeInOut",
            },
          }}
        >
          <NavbarMenuItem className="space-y-4">
            <div className="flex flex-col space-y-2">
              {siteConfig.navItems.map((item, index) => (
                <div key={index}>
                  <Link
                    className="text-medium text-default-500 w-full py-2"
                    href={item.href === "/login" && hasSessionCookie ? "/dashboard" : item.href}
                    size="md"
                    onClick={handleLinkClick}
                  >
                    {item.label === "Connexion" && hasSessionCookie
                      ? "Dashboard"
                      : item.label}
                  </Link>
                  {index < siteConfig.navItems.length - 1 && (
                    <Divider className="opacity-50" />
                  )}
                </div>
              ))}
              {hasSessionCookie && (
                <div>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={handleLogout}
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    );
  }
);

BasicNavbar.displayName = "BasicNavbar";

export default BasicNavbar;