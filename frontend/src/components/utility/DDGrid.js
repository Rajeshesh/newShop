import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "./DataGridCustomToolbar";
import { Box, IconButton, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { DeleteOutline, Edit, Visibility } from "@mui/icons-material";
import FlexBetween from "../styledComponents/FlexBetween";
import { useDispatch } from "react-redux";
import { deleteProduct, deleteReview } from "../../actions/productActions";
import { deleteOrders } from "../../actions/orderAction";
import { deleteUser } from "../../actions/userActions";

const DDGrid = ({
  orderData,
  horizontal,
  size,
  ToolNon,
  AProductsData,
  AOrdersData,
  AUsersData,
  AReviewsData,
  productId,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  let data = {};
  data.data = orderData
    ? orderData
    : AProductsData
    ? AProductsData
    : AOrdersData
    ? AOrdersData
    : AUsersData
    ? AUsersData
    : AReviewsData
    ? AReviewsData
    : [];
  data.columns = orderData
    ? [
        { field: "_id", headerName: "ID" },
        {
          field: "orderItems",
          headerName: "Num of Items",
          renderCell: (params) => params.value.length,
        },
        { field: "totalPrice", headerName: "Amount" },
        {
          field: "orderStatus",
          headerName: "Status",
          renderCell: (params) =>
            params.value === "Delivered" ? (
              <Box color={theme.palette.green[500]}>{params.value}</Box>
            ) : (
              <Box color="red">{params.value}</Box>
            ),
        },
        {
          field: "action",
          headerName: "Action",
          renderCell: (params) => (
            <IconButton>
              <Link to={`/order/${params.row._id}`}>
                <Visibility />
              </Link>
            </IconButton>
          ),
        },
      ]
    : AProductsData
    ? [
        { field: "_id", headerName: "ID" },
        {
          field: "name",
          headerName: "Name",
          width: 250,
        },
        { field: "price", headerName: "Price" },
        { field: "stock", headerName: "Stock" },
        {
          field: "action",
          headerName: "Action",
          renderCell: (params) => (
            <FlexBetween>
              <IconButton>
                <Link to={`/admin/product/${params.row._id}`}>
                  <Edit />
                </Link>
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.target.disabled = true;
                  dispatch(deleteProduct(params.row._id));
                }}
              >
                <DeleteOutline />
              </IconButton>
            </FlexBetween>
          ),
        },
      ]
    : AOrdersData
    ? [
        { field: "_id", headerName: "ID" },
        {
          field: "orderItems",
          headerName: "Num of Items",
          renderCell: (params) => params.value.length,
        },
        { field: "totalPrice", headerName: "Amount" },
        {
          field: "orderStatus",
          headerName: "Status",
          renderCell: (params) =>
            params.value === "Delivered" ? (
              <Box color={theme.palette.green[500]}>{params.value}</Box>
            ) : (
              <Box color="red">{params.value}</Box>
            ),
        },
        {
          field: "action",
          headerName: "Action",
          renderCell: (params) => (
            <FlexBetween>
              <IconButton>
                <Link to={`/admin/order/${params.row._id}`}>
                  <Edit />
                </Link>
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.target.disabled = true;
                  dispatch(deleteOrders(params.row._id));
                }}
              >
                <DeleteOutline />
              </IconButton>
            </FlexBetween>
          ),
        },
      ]
    : AUsersData
    ? [
        { field: "_id", headerName: "ID" },
        { field: "name", headerName: "Name" },
        { field: "email", headerName: "Email" },
        {
          field: "role",
          headerName: "Role",
          renderCell: (params) =>
            params.value === "admin" ? (
              <Box color={theme.palette.secondary[500]}>{params.value}</Box>
            ) : (
              <Box>{params.value}</Box>
            ),
        },

        {
          field: "action",
          headerName: "Action",
          renderCell: (params) => (
            <FlexBetween>
              <IconButton>
                <Link to={`/admin/user/${params.row._id}`}>
                  <Edit />
                </Link>
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.target.disabled = true;
                  dispatch(deleteUser(params.row._id));
                }}
              >
                <DeleteOutline />
              </IconButton>
            </FlexBetween>
          ),
        },
      ]
    : AReviewsData
    ? [
        { field: "_id", headerName: "ID" },
        { field: "user", headerName: "Name" },
        { field: "email", headerName: "Email" },
        {
          field: "comment",
          headerName: "Comment",
        },
        {
          field: "rating",
          headerName: "Rating",
        },

        {
          field: "action",
          headerName: "Action",
          renderCell: (params) => (
            <IconButton
              onClick={(e) => {
                e.target.disabled = true;
                dispatch(deleteReview(productId, params.row._id));
              }}
            >
              <DeleteOutline />
            </IconButton>
          ),
        },
      ]
    : [];

  let sty = !horizontal
    ? {
        "& .MuiDataGrid-footerContainer , .MuiTablePagination-toolbar": {
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          alignContent: "center",
        },
        "& .MuiDataGrid-footerContainer + div": {
          display: "none",
        },
        "& .MuiTablePagination-actions , .MuiInputBase-root": {
          margin: 0,
        },
        "& .MuiTablePagination-selectLabel": {
          display: "none",
        },
        "& .MuiToolbar-root": {
          padding: 0,
        },
        textAlign: "center",
      }
    : {};
  let toolbar = !ToolNon ? { toolbar: DataGridCustomToolbar } : {};
  return (
    <DataGrid
      sx={sty}
      getRowId={(row) => row._id}
      rows={data.data}
      columns={data.columns}
      pageSizeOptions={[10, 20, 30, 40, 60]}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: size || 20 },
        },
      }}
      slots={toolbar}
    />
  );
};

export default DDGrid;
