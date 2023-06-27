import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader, { Ring } from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import { toast } from "react-toastify";
import { BorderFlowBySpan, BoxS } from "./styledComponents/AnimationComponent";
import { Box, useTheme, Pagination } from "@mui/material";
import { FlexCenter } from "./styledComponents/FlexBetween";

export default function Home() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    dispatch(getProducts(null, null, null, null, currentPage));
  }, [error, dispatch, currentPage]);

  return (
    <Box
      sx={
        {
          // background: `linear-gradient(to right,${theme.palette.primary[00]},${theme.palette.background.alt1})`,
        }
      }
      width="100%"
    >
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />
          <h3 className="mt-3 mb-1">Latest Products</h3>
          <section className="mt-2">
            <div className="products ">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage ? (
            <FlexCenter>
              <Pagination
                onChange={(e, p) => setCurrentPage(p)}
                page={currentPage}
                count={Math.ceil(productsCount / resPerPage)}
                showFirstButton={true}
                showLastButton={true}
                shape="rounded"
              />
            </FlexCenter>
          ) : null}
        </Fragment>
      )}
    </Box>
  );
}
