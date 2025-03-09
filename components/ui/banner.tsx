"use client";

import React from "react";
import { Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function BannerComponent() {
  return (
    <div className="flex items-center gap-x-3 border-1 rounded-large border-divider bg-background/[0.15] px-6 py-2 backdrop-blur-xl sm:px-3.5 sm:before:flex-1 self-center min-w-fit">
      <p className="text-small text-foreground">
        <Link className="text-inherit" href="#">
          The Winter 2024 Release is here: new editor, analytics API, and so
          much more.&nbsp;
        </Link>
      </p>
      <Button
        className="group relative h-9 overflow-hidden text-small p- font-normal bg-gradient-to-bl from-[#0072F5] to-[#5EA2EF] text-white border-[var(--bgLevel2)]"
        color="default"
        endContent={
          <Icon
            className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
            icon="solar:arrow-right-linear"
            width={16}
          />
        }
        variant="bordered"
      >
        Explore
      </Button>
      <div className="flex flex-1 justify-end">
        <Button isIconOnly className="-m-1" size="sm" variant="light">
          <span className="sr-only">Close Banner</span>
          <Icon className="text-default-500" icon="lucide:x" width={20} />
        </Button>
      </div>
    </div>
  );
}
