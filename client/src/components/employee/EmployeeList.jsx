import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import EmployeeModal from "./EmployeeModal";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../services/api";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../../utils/constants";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [mode, setMode] = useState("create");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      toast.error(ERROR_MESSAGES.SERVER_ERROR);
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    setMode("create");
    setSelectedEmployee(null);
    setOpenModal(true);
  };

  const handleEditClick = (employee) => {
    setMode("edit");
    setSelectedEmployee(employee);
    setOpenModal(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        toast.success(SUCCESS_MESSAGES.EMPLOYEE_DELETED);
        fetchEmployees();
      } catch (error) {
        toast.error(ERROR_MESSAGES.SERVER_ERROR);
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (values[key] !== null) {
          formData.append(key, values[key]);
        }
      });

      if (mode === "edit") {
        await updateEmployee(selectedEmployee._id, formData);
        toast.success(SUCCESS_MESSAGES.EMPLOYEE_UPDATED);
      } else {
        await createEmployee(formData);
        toast.success(SUCCESS_MESSAGES.EMPLOYEE_CREATED);
      }

      setOpenModal(false);
      fetchEmployees();
    } catch (error) {
      toast.error(ERROR_MESSAGES.SERVER_ERROR);
      console.error("Error submitting employee:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Employee List
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Total Employees: {employees.length}
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleCreateClick}
            sx={{ height: "fit-content" }}
          >
            Create Employee
          </Button>
        </Stack>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile No</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Create Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee._id}</TableCell>
                <TableCell>
                  {employee.image ? (
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
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
                        src={`http://localhost:5000/${employee.image}`}
                        alt={employee.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/50";
                          console.log("Error loading image:", employee.image);
                        }}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#e0e0e0",
                        color: "#757575",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                    >
                      {employee.name.charAt(0).toUpperCase()}
                    </Box>
                  )}
                </TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.mobile}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.gender}</TableCell>
                <TableCell>{employee.course}</TableCell>
                <TableCell>
                  {new Date(employee.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(employee)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(employee._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EmployeeModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        initialValues={selectedEmployee}
        onSubmit={handleSubmit}
        mode={mode}
      />
    </Container>
  );
};

export default EmployeeList;
