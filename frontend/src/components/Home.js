import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import { toast } from "react-toastify";
import { Box, useTheme } from "@mui/material";

export default function Home() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [resPerPage, setResPerPage] = useState(6);

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    dispatch(getProducts(null, null, null, null, currentPage, resPerPage));
  }, [error, dispatch, currentPage, resPerPage]);

  return (
    <Box width="100%">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />
          <h3 className="mt-3 mb-1" id="top">
            Latest Products
          </h3>
          <section className="mt-2">
            <div className="products ">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Box>
  );
}
