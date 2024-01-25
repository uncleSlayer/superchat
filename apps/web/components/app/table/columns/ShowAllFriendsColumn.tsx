"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Friends = {
  id: string,
  name: string,
  imageUrl: string,
  email: string
}

export const columns: ColumnDef<Friends>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
]
