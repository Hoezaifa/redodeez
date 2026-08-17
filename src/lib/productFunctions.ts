import { createServerFn } from "@tanstack/react-start";
import {
  getProductOverridesFromDb,
  saveProductOverrideToDb,
  deleteProductOverrideFromDb,
} from "./dbService";

export interface ProductOverrideInput {
  productId: string;
  title?: string;
  price?: number;
  description?: string;
  sizes?: string[];
  colors?: string[];
}

export const getProductOverridesFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await getProductOverridesFromDb();
  } catch (err) {
    console.error("Error fetching product overrides from DB:", err);
    return {};
  }
});

export const saveProductOverrideFn = createServerFn({ method: "POST" })
  .validator((data: ProductOverrideInput) => data)
  .handler(async ({ data }) => {
    try {
      const { productId, ...overrideData } = data;
      const res = await saveProductOverrideToDb(productId, overrideData);
      if (!res.ok) {
        throw new Error(res.error || "Failed to save product override to database");
      }
      return await getProductOverridesFromDb();
    } catch (err: any) {
      console.error("Error saving product override to DB:", err);
      throw new Error(err?.message || "Failed to save product override to database");
    }
  });

export const deleteProductOverrideFn = createServerFn({ method: "POST" })
  .validator((productId: string) => productId)
  .handler(async ({ data: productId }) => {
    try {
      const res = await deleteProductOverrideFromDb(productId);
      if (!res.ok) {
        throw new Error(res.error || "Failed to delete product override from database");
      }
      return await getProductOverridesFromDb();
    } catch (err: any) {
      console.error("Error deleting product override from DB:", err);
      throw new Error(err?.message || "Failed to delete product override from database");
    }
  });
