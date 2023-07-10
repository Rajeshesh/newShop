import { Fragment, useCallback, useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Loader from ".././layouts/Loader";
import MetaData from ".././layouts/MetaData";
import Product from ".././product/Product";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import RangeSlider from "./Slider";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Rating,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FilterAltTwoTone } from "@mui/icons-material";
import { Stack } from "@mui/system";
import FlexBetween, { FlexCenter } from "../styledComponents/FlexBetween";

const categories = [
  "Electronics",
  "Mobile Phones",
  "Laptops",
  "Accessories",
  "Headphones",
  "Food",
  "Books",
  "Clothes",
  "Shoes",
  "Misc",
  "Beauty/Health",
  "Sports",
  "Outdoor",
  "Home",
];

const CategoriesFilter = memo(({ setCategory }) => (
  <>
    <Box ml="5px" component="h4">
      Categories
    </Box>
    <List>
      {categories.map((category, i) => (
        <ListItem sx={{ maxWidth: "200px" }} key={i}>
          <ListItemButton
            key={i}
            onClick={() => {
              setCategory(category);
            }}
            style={{
              cursor: "pointer",
              listStyleType: "none",
            }}
          >
            <ListItemText>{category}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </>
));

const RatingFilter = memo(({ setRating }) => (
  <>
    <Box ml="5px" component="h4">
      Ratings
    </Box>
    <List>
      {[5, 4, 3, 2, 1].map((star, i) => (
        <ListItem sx={{ maxWidth: "200px" }} key={i}>
          <ListItemButton
            key={i}
            onClick={() => {
              setRating(star);
            }}
          >
            <ListItemText>
              <Rating
                name="half-rating-read"
                defaultValue={star}
                precision={1}
                readOnly
              />
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </>
));

export default function ProductSearch() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { keyword } = useParams();
  const large = useMediaQuery("(min-width:900px)");

  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 10000]);
  const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);
  const [filter, setFilter] = useState(false);

  const setRatingUCB = useCallback((n) => setRating(n), [rating]);
  const setCategoryUCB = useCallback((v) => setCategory(v), [category]);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setFilter(open);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    dispatch(getProducts(keyword, priceChanged, category, rating, currentPage));
  }, [error, currentPage, keyword, priceChanged, category, rating]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />
          <FlexBetween width="100%">
            <Box textAlign="center" component="h4">
              Search Products
            </Box>
            {!large && (
              <Button
                onClick={(e) => setFilter((v) => (v ? false : true))}
                endIcon={<FilterAltTwoTone />}
                variant="outlined"
                color="secondary"
              >
                Filter
              </Button>
            )}
          </FlexBetween>
          <section id="products">
            <Stack direction="row">
              <SwipeableDrawer
                anchor="right"
                open={filter}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                sx={{
                  width: { xs: "280px", sm: "350px" },
                  "& .MuiDrawer-paper": {
                    color: theme.palette.secondary[200],
                    backgroundColor: theme.palette.background.alt,
                    boxSizing: "border-box",
                    borderWidth: "2px",
                    width: { xs: "280px", sm: "350px" },
                  },
                }}
              >
                <Box width="100%" bgcolor={theme.palette.background.alt1}>
                  <Box
                    onMouseUp={() => setPriceChanged(price)}
                    maxWidth="250px"
                    m="10px"
                  >
                    <Typography variant="h4">Price Range</Typography>
                    <RangeSlider price={price} setPrice={setPrice} />
                  </Box>
                </Box>
                <Divider />
                <div>
                  <CategoriesFilter setCategory={setCategoryUCB} />
                </div>
                <Divider />
                <div>
                  <RatingFilter setRating={setRatingUCB} />
                </div>
              </SwipeableDrawer>

              {large && (
                <Box flex="0.25" height="100%">
                  <Box>
                    <Box width="100%" bgcolor={theme.palette.background.alt1}>
                      <Box
                        onMouseUp={() => setPriceChanged(price)}
                        maxWidth="210px"
                        m="10px"
                      >
                        <Typography variant="h4">Price Range</Typography>
                        <RangeSlider price={price} setPrice={setPrice} />
                      </Box>
                    </Box>
                    <Divider />
                    <div>
                      <CategoriesFilter setCategory={setCategoryUCB} />
                    </div>
                    <Divider />
                    <div>
                      <RatingFilter setRating={setRatingUCB} />
                    </div>
                  </Box>
                </Box>
              )}
              <Box flex={large ? "0.75" : "1"}>
                <Box className="products">
                  {products &&
                    products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                </Box>
                {productsCount > 0 && productsCount > resPerPage ? (
                  <FlexCenter className=" mt-5">
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
              </Box>
            </Stack>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}
