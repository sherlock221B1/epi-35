"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function addingTable(formData: FormData) {
  const name = formData.get("name") as string;
  const locationId = Number(formData.get("locationId"));

  await prisma.tables.create({
    data: { name, locationId },
  });

  redirect("/backoffice/tables");
}

export async function updatingTable(formData: FormData) {
  const name = formData.get("name") as string;
  const id = Number(formData.get("tableId"));
  const locationId = Number(formData.get("locationId"));

  await prisma.tables.update({
    data: { name, locationId },
    where: { id },
  });

  redirect("/backoffice/tables");
}

export async function deleteTable(formData: FormData) {
  const id = Number(formData.get("tableId"));

  await prisma.tables.delete({
    where: { id },
  });

  redirect("/backoffice/tables");
}
