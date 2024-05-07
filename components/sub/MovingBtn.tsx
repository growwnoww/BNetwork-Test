"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/moving-border";

export function MovingBorderDemo() {
  return (
    <div>
      <Link href='/howitworks'>
      <Button
        borderRadius="1.75rem"
        className=" dark:bg-slate-900  dark:text-white  dark:border-yellow-500"
      >
        View Plan
      </Button>
      </Link>
    </div>
  );
}
