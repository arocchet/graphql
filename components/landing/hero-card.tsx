"use client";

import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@heroui/react";
import { Logo } from "../icons";
import { title } from "process";

type CardProps = {
  title: string;
  icon: string;
  description: string;
};

export default function HeroCard(props: CardProps) {
  return (
    <Card
      className="overflow-none relative w-[420px] border-small border-[var(--bgLevel2)] bg-right-bottom bg-gradient-to-br from-[#ff5555] to-[var(--black90)]"
      {...props}
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar
            className="border-small border-white/20 bg-transparent"
            icon={<Logo className="text-white" />}
          />
          <p className="text-large font-medium text-white">Lorem</p>
        </div>
      </CardHeader>
      <CardBody className="px-3">
        <div className="flex flex-col gap-2 px-2">
          <p className="text-large font-medium text-white/80">
            {props.title}
          </p>
          <p className="text-small text-white/60">
            {props.description}
          </p>
        </div>
      </CardBody>
      <CardFooter className="justify-end gap-2">
        <Button
          fullWidth
          className="border-small border-white/20 bg-white/10 text-white"
        >
          Lorem ipsum
        </Button>
      </CardFooter>
    </Card>
  );
}
