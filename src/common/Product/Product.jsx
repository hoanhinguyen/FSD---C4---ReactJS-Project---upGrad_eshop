import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import "./Product.css";
import { confirmDialog } from "../ConfirmDialog/ConfirmDialog";

const Product = (props) => {
  const { Notice, product, setDeleteProductFunc } = props;
  const { id, name, price, description, imageUrl } = product;
  const navigate = useNavigate();

  const { role, token } = useContext(AuthContext);

  const handleDelete = () => {
    //delete method below
    confirmDialog("Are you sure you want to delete the product?", async () => {
      try {
        await axios.delete(`/products/${id}`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ` + token,
          },
        });
        setDeleteProductFunc((prev) => !prev);
        Notice(`Product ${name} deleted successfully`);
      } catch (err) {
        console.log(err);
      }
    });
  };

  const handleEdit = () => {
    navigate(`/update/${id}`, { state: { title: "Modify Product" } });
  };

  return (
    <Card className="card" sx={{ width: 350, height:450 }}>
      <CardMedia
        sx={{ height: 200 }}
        image={imageUrl}
        title="green iguana"
        alt={name}
      />
      <CardContent>
        <div className="cardContent">
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            ${price}
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions className="CTA" sx={{ mt: 2 }}>
        <Link className="buy" to={`/${id}`}>
          <Button size="small" variant="contained" color="primary">
            Buy
          </Button>
        </Link>

        {role === "ADMIN" && (
          <Typography className="adminOps">
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>

            <IconButton aria-label="delete" onClick={handleEdit}>
              <EditIcon fontSize="small" onClick={handleEdit} />
            </IconButton>
          </Typography>
        )}
      </CardActions>
    </Card>
  );
};

export default Product;
