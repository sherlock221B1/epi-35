"use server";

import { getServerSession, User } from "next-auth";
import { use } from "react";
import { prisma } from "./prisma";
import { AddonCategories, Addons, Menus } from "@prisma/client";
import exp from "constants";

export async function createDefaultData(user: User) {
  const { name, email } = user;

  const company = await prisma.company.create({
    data: { name: "Default Company" },
  });

  await prisma.users.create({
    data: {
      name: name as string,
      email: email as string,
      companyId: company.id,
    },
  });

  const menuCategory = await prisma.menusCategories.create({
    data: { name: "Default Menu Category", companyId: company.id },
  });

  const menu = await prisma.menus.create({ data: { name: "Default Menu" } });

  await prisma.menusCategoriesAndMenus.create({
    data: { menuId: menu.id, menuCategoryIds: menuCategory.id },
  });

  const addonCategory = await prisma.addonCategories.create({
    data: { name: "Default Addon Category" },
  });

  await prisma.addonCategoriesAndMenus.create({
    data: { menuId: menu.id, addonCategoryId: addonCategory.id },
  });

  const addonNames = ["Default Addon 1", "Default Addon 2", "Default Addon 3"];
  const data = addonNames.map((addonName) => ({
    name: addonName,
    addonCategoryId: addonCategory.id,
  }));
  await prisma.addons.createMany({ data: data });

  const location = await prisma.locations.create({
    data: { name: "Default Location", companyId: company.id },
  });

  await prisma.tables.create({
    data: { name: "Default Table", locationId: location.id },
  });
}

export async function getCompanyId() {
  const session = await getServerSession();

  const user = await prisma.users.findFirst({
    where: { email: session?.user?.email as string },
  });

  const company = await prisma.company.findFirst({
    where: { id: user?.companyId },
  });

  return company?.id;
}

export async function getMenuCategoriesByCompanyId() {
  const menuCategories = await prisma.menusCategories.findMany({
    where: { companyId: await getCompanyId() },
  });
  return menuCategories;
}

export async function getMenusByCompanyId() {
  const menuCategories = await getMenuCategoriesByCompanyId();

  const menuCategoryIds = menuCategories.map((item) => item.id);

  const menuCategoriesAndMenus = await prisma.menusCategoriesAndMenus.findMany({
    where: { menuCategoryIds: { in: menuCategoryIds } },
  });
  const menuIds = menuCategoriesAndMenus.map((item) => item.menuId);

  const menus: Menus[] = await prisma.menus.findMany({
    where: { id: { in: menuIds } },
  });

  return menus;
}

export async function getAddonCategoriesByCompanyId() {
  const menus = await getMenusByCompanyId();
  const menuIds = menus.map((menu) => menu.id);

  const addonCategoriesAndMenus = await prisma.addonCategoriesAndMenus.findMany(
    { where: { menuId: { in: menuIds } } }
  );
  const addonCategoryIds = addonCategoriesAndMenus.map(
    (item) => item.addonCategoryId
  );
  const addonCategories: AddonCategories[] =
    await prisma.addonCategories.findMany({
      where: { id: { in: addonCategoryIds } },
    });
  return addonCategories;
}

export async function getAddonsByCompanyId() {
  const addonCategories = await getAddonCategoriesByCompanyId();
  const addonCategoryIds = addonCategories.map((item) => item.id);

  const addons = await prisma.addons.findMany({
    where: { addonCategoryId: { in: addonCategoryIds } },
  });

  return addons;
}

export async function getLocationsByCompanyId() {
  const companyId = await getCompanyId();
  const locations = await prisma.locations.findMany({
    where: { companyId },
    orderBy: { id: "asc" },
  });
  return locations;
}
export async function getTablesByCompanyId() {
  const locations = await getLocationsByCompanyId();
  const locationIds = locations.map((item) => item.id);

  const tables = await prisma.tables.findMany({
    where: { locationId: { in: locationIds } },
  });

  return tables;
}
