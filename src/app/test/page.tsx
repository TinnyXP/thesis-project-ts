'use client';

import React from 'react'
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

export default function page() {
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Music</BreadcrumbItem>
        <BreadcrumbItem>Artist</BreadcrumbItem>
        <BreadcrumbItem>Album</BreadcrumbItem>
        <BreadcrumbItem>Song</BreadcrumbItem>
      </Breadcrumbs>
    </div>
  )
}
