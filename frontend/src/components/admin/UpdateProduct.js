import { Box, Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProduct, updateProduct } from "../../actions/productActions";
import { clearError, clearProductUpdated } from "../../slices/productSlice";
import Sidebar from "./Sidebar";
import { FlexCenter } from "../styledComponents/FlexBetween";
import { BorderFlowBySpan } from "../styledComponents/AnimationComponent";
import { FormContainer } from "../styledComponents/Form";

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const {
    loading,
    isProductUpdated,
    product = {},
    error,
  } = useSelector((state) => state.productState);

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState == 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const sumbitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("seller", seller);
    formData.append("category", category);
    formData.append("imagesCleared", imagesCleared);
    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateProduct(productId, formData));
  };

  const clearImagesHandler = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  };

  useEffect(() => {
    if (isProductUpdated) {
      toast("Product Updated Successfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearProductUpdated()),
      });
      setImages([]);
      navigate("/admin/products");

      return;
    }

    if (error) {
      toast(error, {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearError()),
      });
      return;
    }
    dispatch(getProduct(productId));
  }, [isProductUpdated, error, dispatch]);

  useEffect(() => {
    if (product._id) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description);
      setSeller(product.seller);
      setCategory(product.category);

      let images = [];
      product.images.forEach((image) => {
        images.push(image.image);
      });

      setImagesPreview(images);
    }
  }, [product]);

  const options = [
    {
      value: "Electronics",
      label: "Electronics",
    },
    {
      value: "Mobile Phones",
      label: "Mobile Phones",
    },
    {
      value: "Laptops",
      label: "Laptops",
    },
    {
      value: "Accessories",
      label: "Accessories",
    },
    {
      value: "Electronics",
      label: "Electronics",
    },
    {
      value: "Headphones",
      label: "Headphones",
    },
    {
      value: "Food",
      label: "Food",
    },
    {
      value: "Books",
      label: "Books",
    },
    {
      value: "Clothes/Shoes",
      label: "Clothes/Shoes",
    },
    {
      value: "Beauty/Health",
      label: "Beauty/Health",
    },
    {
      value: "Sports",
      label: "Sports",
    },
    {
      value: "Outdoor",
      label: "Outdoor",
    },
    {
      value: "Home",
      label: "Home",
    },
  ];

  return (
    <div className="">
      <Box className="">
        <Sidebar />
      </Box>
      <FlexCenter width="100%">
        <BorderFlowBySpan mt="20px">
          <span className="spanA"></span>
          <span className="spanA"></span>
          <span className="spanA"></span>
          <span className="spanA"></span>
          <FormContainer
            onSubmit={sumbitHandler}
            className="input__form"
            encType="multipart/form-data"
            component="form"
            p="15px"
            m="4px"
          >
            <h1>Update Product</h1>
            <div className="">
              <TextField
                sx={{ width: "100%" }}
                name="name"
                label="Name"
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="">
              <TextField
                sx={{ width: "100%" }}
                type="number"
                name="price"
                label="Price"
                variant="standard"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="">
              <TextField
                sx={{ width: "100%" }}
                label="Description"
                multiline
                rows={4}
                variant="standard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="">
              <TextField
                sx={{ width: "100%" }}
                select
                label="Category"
                helperText="Please select Product Category"
                variant="standard"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                sx={{ width: "100%" }}
                type="number"
                name="stock"
                label="Stock"
                variant="standard"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <TextField
                sx={{ width: "100%" }}
                name="sellerName"
                label="Seller Name"
                variant="standard"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
              />
            </div>

            <div>
              <label>Images</label>

              <div className="custom-file">
                <input
                  type="file"
                  name="product_images"
                  className="custom-file-input"
                  id="customFile"
                  multiple
                  onChange={onImagesChange}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Images
                </label>
              </div>
              {imagesPreview.length > 0 && (
                <span
                  onClick={clearImagesHandler}
                  className="mr-2 "
                  style={{ cursor: "pointer" }}
                >
                  <i className="fa fa-trash"></i>
                </span>
              )}
              {imagesPreview.map((image, i) => (
                <img
                  src={image}
                  width="55"
                  height="52"
                  alt="Image Priview"
                  className="mt-3 mr-2"
                  key={i}
                />
              ))}
            </div>

            <Button
              id="login_button"
              disabled={loading}
              type="submit"
              variant="contained"
              className="mt-3"
            >
              UPDATE
            </Button>
          </FormContainer>
        </BorderFlowBySpan>
      </FlexCenter>
    </div>
  );
}
