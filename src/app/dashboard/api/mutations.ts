import { useMutation } from "@tanstack/react-query";
import {
  createAttribute,
  deleteAttribute,
  updatedAttribute,
  createProduct,
  updatedProduct,
  deleteProduct,
  uploadImages,
  deleteImage,
  createFeaturedProduct,
  deleteFeaturedProduct,
  createUser,
  updatedUser,
  deleteUser,
  loginUser,
  createSales,
  deleteSale,
  updatedSale,
  createCategory,
  deleteCategory,
  updatedCategory,
} from "./request";

// * ATRIBUTOS

export const useMutationAttribute = () => {
  return useMutation({ mutationFn: createAttribute });
};

export const useMutationUpdatedAttribute = () => {
  return useMutation({ mutationFn: updatedAttribute });
};

export const useMutationDeleteAttribute = () => {
  return useMutation({ mutationFn: deleteAttribute });
};

// * PRODUCTOS

export const useMutationProduct = () => {
  return useMutation({ mutationFn: createProduct });
};

export const useMutationUpdatedProduct = () => {
  return useMutation({ mutationFn: updatedProduct });
};

export const useMutationDeleteProduct = () => {
  return useMutation({ mutationFn: deleteProduct });
};

// * PRODUCTOS DESTACADOS

export const useMutationCreateFeaturedProduct = () => {
  return useMutation({ mutationFn: createFeaturedProduct });
};

export const useMutationDeleteFeaturedProduct = () => {
  return useMutation({ mutationFn: deleteFeaturedProduct });
};

// * IMAGES

export const useMutationImages = () => {
  return useMutation({ mutationFn: uploadImages });
};

export const useMutationDeleteImage = () => {
  return useMutation({ mutationFn: deleteImage });
};

// * USUARIOS

export const useMutationUser = () => {
  return useMutation({ mutationFn: createUser });
};

export const useMutationUpdatedUser = () => {
  return useMutation({ mutationFn: updatedUser });
};

export const useMutationDeleteUser = () => {
  return useMutation({ mutationFn: deleteUser });
};

export const useMutationLoginUser = () => {
  return useMutation({ mutationFn: loginUser });
};

//VENTAS

export const useMutationSales = () => {
  return useMutation({ mutationFn: createSales });
};

export const useMutationDeleteSale = () => {
  return useMutation({ mutationFn: deleteSale });
};

export const useMutationUpdatedSale = () => {
  return useMutation({ mutationFn: updatedSale });
};

//CATEGORIAS

export const useMutationCategory = () => {
  return useMutation({ mutationFn: createCategory });
};

export const useMutationDeleteCategory = () => {
  return useMutation({ mutationFn: deleteCategory });
};

export const useMutationUpdatedCategory = () => {
  return useMutation({ mutationFn: updatedCategory });
};
