import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getProductsCat,
  getProductsOff,
} from "../actions/productActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import { toast } from "react-toastify";
import { Box, useTheme } from "@mui/material";

export default function Home() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { products, productsOff, productsCat, loading, error } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [resPerPage, setResPerPage] = useState(6);
  const [currentPageOff, setCurrentPageOff] = useState(1);
  const [resPerPageOff, setResPerPageOff] = useState(6);
  const [off, setOfff] = useState(17);

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    dispatch(getProducts(null, null, null, null, currentPage, resPerPage));
    dispatch(
      getProductsOff(null, null, null, null, currentPageOff, resPerPageOff, off)
    );
    dispatch(
      getProductsCat(null, null, "Electronics", null, currentPage, resPerPage)
    );
  }, [
    error,
    dispatch,
    currentPage,
    resPerPage,
    currentPageOff,
    resPerPageOff,
    off,
  ]);

  return (
    <Box width="100%">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />
          {products && (
            <>
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
            </>
          )}
          {productsOff && (
            <>
              <h3 className="mt-3 mb-1" id="top">
                More than {off}% off
              </h3>
              <section className="mt-2">
                <div className="products ">
                  {productsOff &&
                    productsOff.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                </div>
              </section>
            </>
          )}
          {productsCat && (
            <>
              <h3 className="mt-3 mb-1" id="top">
                New Electronic Gadgets
              </h3>
              <section className="mt-2">
                <div className="products ">
                  {productsCat &&
                    productsCat.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                </div>
              </section>
            </>
          )}
        </Fragment>
      )}
    </Box>
  );
}
