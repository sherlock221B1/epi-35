"use server";

import { getCompanyId } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function addingLocation(formData: FormData) {
  const name = formData.get("name") as string;
  const companyId = (await getCompanyId()) as number;
  const locationId = Number(formData.get("locationId"));

  await prisma.locations.create({
    data: { name, companyId },
  });

  redirect("/backoffice/locations");
}

export async function updatingLocation(formData: FormData) {
  const name = formData.get("name") as string;
  const id = Number(formData.get("locationId"));

  await prisma.locations.update({
    data: { name },
    where: { id },
  });

  redirect("/backoffice/locations");
}

export async function deleteLocation(formData: FormData) {
  const id = Number(formData.get("locationId"));

  await prisma.locations.delete({
    where: { id },
  });

  redirect("/backoffice/locations");
}
