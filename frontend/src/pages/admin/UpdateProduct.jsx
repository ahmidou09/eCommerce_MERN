import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import FormFields from "../../components/ui/FormFields";
import Loading from "../../components/ui/Loading";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadSingleProductImageMutation,
  useUploadMultipleProductImagesMutation,
} from "../../redux/slices/productsApiSlice";

const UpdateProduct = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProductByIdQuery(productId);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [uploadSingleProductImage, { isLoading: isUploadingSingle }] =
    useUploadSingleProductImageMutation();
  const [uploadMultipleProductImages, { isLoading: isUploadingMultiple }] =
    useUploadMultipleProductImagesMutation();

  const [formFields, setFormFields] = useState({
    name: "",
    image: "",
    images: [],
    colors: [],
    sizes: [],
    description: "",
    brand: "",
    category: "",
    price: 0,
    oldPrice: 0,
    discount: 0,
    countInStock: 0,
  });

  useEffect(() => {
    if (product) {
      setFormFields({
        name: product.name || "",
        image: product.image ? product.image : "",
        images: product.images?.map((file) => file) || [],
        colors: product.colors || [],
        sizes: product.sizes || [],
        description: product.description || "",
        brand: product.brand || "",
        category: product.category || "",
        price: product.price || 0,
        oldPrice: product.oldPrice || 0,
        discount: product.discount || 0,
        countInStock: product.countInStock || 0,
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [id]:
        type === "file"
          ? id === "images"
            ? Array.from(files)
            : files[0]
          : id === "colors" || id === "sizes"
          ? value.split(",").map((item) => item.trim())
          : type === "number"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = { ...formFields };

      // Handle image upload
      if (updatedProduct.image instanceof File) {
        const formData = new FormData();
        formData.append("image", updatedProduct.image);
        const res = await uploadSingleProductImage(formData).unwrap();
        updatedProduct.image = res.image;
      }

      // Handle additional images upload
      if (
        Array.isArray(updatedProduct.images) &&
        updatedProduct.images.length &&
        updatedProduct.images[0] instanceof File
      ) {
        const imagesFormData = new FormData();
        updatedProduct.images.forEach((file) =>
          imagesFormData.append("images", file)
        );
        const res = await uploadMultipleProductImages(imagesFormData).unwrap();
        updatedProduct.images = res.images;
      }

      await updateProduct({ id: productId, ...updatedProduct }).unwrap();
      toast.success("Product updated successfully");
      refetch();
      navigate(`/products/${productId}`);
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(error?.data?.message || error.error);
    }
  };

  const fields = [
    { id: "name", label: "Name", type: "text", required: true },
    { id: "image", label: "Image", type: "file", required: false },
    {
      id: "images",
      label: "Additional Images",
      type: "file",
      multiple: true,
      required: false,
    },
    { id: "colors", label: "Colors", type: "text", required: false },
    { id: "sizes", label: "Sizes", type: "text", required: false },
    { id: "description", label: "Description", type: "text", required: true },
    { id: "brand", label: "Brand", type: "text", required: true },
    { id: "category", label: "Category", type: "text", required: true },
    { id: "price", label: "Price", type: "number", required: true },
    { id: "oldPrice", label: "Old Price", type: "number", required: true },
    { id: "discount", label: "Discount", type: "number", required: false },
    {
      id: "countInStock",
      label: "Count In Stock",
      type: "number",
      required: true,
    },
  ];

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>Error loading product details</div>
      ) : (
        <>
          <Link to="/admin/products">Go Back</Link>
          <FormContainer onSubmit={handleSubmit}>
            <h2>Edit Product</h2>
            <FormFields
              fields={fields}
              formFields={formFields}
              handleInputChange={handleInputChange}
            />
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Product"}
            </Button>
          </FormContainer>
        </>
      )}
      {(isUploadingSingle || isUploadingMultiple) && <Loading />}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const FormContainer = styled.form`
  max-width: 60rem;
  padding: 2rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const Button = styled.button`
  background-color: var(--color-primary-1);
  color: var(--color-white);
  border: none;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-primary-2);
  }
`;

export default UpdateProduct;
