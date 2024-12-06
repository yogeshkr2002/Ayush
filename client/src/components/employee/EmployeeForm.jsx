import React, { useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
} from "@mui/material";
import { employeeValidation } from "../../utils/validation";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const EmployeeForm = ({ initialValues, onSubmit, mode }) => {
  const [imagePreview, setImagePreview] = useState(
    initialValues?.image
      ? `https://ayush-cyan.vercel.app/${initialValues.image}`
      : null
  );

  const formik = useFormik({
    initialValues: initialValues || {
      name: "",
      email: "",
      mobile: "",
      designation: "",
      gender: "",
      course: "",
      image: null,
    },
    validationSchema: employeeValidation,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="mobile"
            label="Mobile Number"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="designation"
            label="Designation"
            value={formik.values.designation}
            onChange={formik.handleChange}
            error={
              formik.touched.designation && Boolean(formik.errors.designation)
            }
            helperText={formik.touched.designation && formik.errors.designation}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            error={formik.touched.gender && Boolean(formik.errors.gender)}
          >
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              label="Gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            {formik.touched.gender && formik.errors.gender && (
              <FormHelperText>{formik.errors.gender}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="course"
            label="Course"
            value={formik.values.course}
            onChange={formik.handleChange}
            error={formik.touched.course && Boolean(formik.errors.course)}
            helperText={formik.touched.course && formik.errors.course}
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            {imagePreview && (
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {mode === "edit" ? "Update" : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EmployeeForm;
