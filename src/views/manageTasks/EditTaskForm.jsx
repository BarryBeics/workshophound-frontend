import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { GraphQLClient } from "graphql-request";
import formOptions from "../../config/formOptions.json";
import { graphqlEndpoint } from "../../config";
import { parseUKDate } from "../../utils/dateUtiles";
import { parse, isValid } from "date-fns";

import Header from "../../components/Header";
import AdminUserSelect from "../../components/AdminUserSelect";
import LabelSelector from "../../components/LabelSelector";
import DateInput from "../../components/DateInput";


import { READ_TASK_QUERY, READ_ALL_PROJECTS_QUERY } from "../../graph/tasks/queries";

import { DELETE_TASK_MUTATION, UPDATE_TASK_MUTATION } from "../../graph/tasks/mutations";

const client = new GraphQLClient(graphqlEndpoint);


const EditTaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const passedProjectId = location.state?.projectId || "";
  const redirectPath = location.state?.redirectPath || "/manageTasks";

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await client.request(DELETE_TASK_MUTATION, { id: String(id) });
      alert("Task deleted!");
      navigate(redirectPath);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete task.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ readTaskById }, { readProjectsFilter }] = await Promise.all([
        client.request(READ_TASK_QUERY, { id }),
        client.request(READ_ALL_PROJECTS_QUERY),
      ]);

      setProjects(readProjectsFilter);


        setInitialValues({
          title: readTaskById.title || "",
          description: readTaskById.description || "",
          status: readTaskById.status || "",
          labels: readTaskById.labels || [],
          assignedTo: readTaskById.assignedTo || "",
          dueDate:
            readTaskById.dueDate &&
            isValid(parse(readTaskById.dueDate, "dd-MM-yyyy", new Date()))
              ? readTaskById.dueDate
              : "",
          deferDate:
            readTaskById.deferDate &&
            isValid(parse(readTaskById.deferDate, "dd-MM-yyyy", new Date()))
              ? readTaskById.deferDate
              : "",
          department: readTaskById.department || "",
          projectId: readTaskById.projectId || "",
          duration: readTaskById.duration || "",
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [id]);

  const allowedLabels = formOptions?.labelOptions.map((l) => l.value) || [];

  const validationSchema = yup.object().shape({
    title: yup.string().required("required"),
    description: yup.string(),
    status: yup.string().required("required"),
    priority: yup.string(),
    type: yup.string(),
    labels: yup
      .array()
      .of(yup.string().oneOf(allowedLabels, "Invalid label"))
      .min(1, "Select at least one label")
      .required("Select at least one label"),
    assignedTo: yup.string(),
    dueDate: yup.string(),
    category: yup.string(),
    projectId: yup.string(),
  });

  const handleFormSubmit = async (values) => {
    const cleanedValues = { ...values };
    for (const key of Object.keys(cleanedValues)) {
      if (cleanedValues[key] === "") {
        cleanedValues[key] = null;
      }
    }

    cleanedValues.dueDate = cleanedValues.dueDate
      ? parseUKDate(cleanedValues.dueDate)
      : null;
    cleanedValues.deferDate = cleanedValues.deferDate
      ? parseUKDate(cleanedValues.deferDate)
      : null;
    cleanedValues.id = id;

    try {
      await client.request(UPDATE_TASK_MUTATION, {
        input: cleanedValues,
      });
      alert("Task updated!");
      navigate(redirectPath);
    } catch (err) {
      console.error("Update failed:", err.response?.errors || err);
      alert("Failed to update task.");
    }
  };

  if (!initialValues) return <div>Loading...</div>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="EDIT TASK"
          subtitle={`Edit task: ${initialValues.title}`}
        />
        <Tooltip title="Delete">
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete Task
          </Button>
        </Tooltip>
      </Box>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
              <TextField
                label="Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                multiline
                rows={3}
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />

              <LabelSelector
                selectedLabels={values.labels}
                setFieldValue={setFieldValue}
                error={errors.labels}
                touched={touched.labels}
              />

              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {formOptions.taskStatusOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <AdminUserSelect
                selectedAdmin={values.assignedTo}
                setFieldValue={setFieldValue}
              />

              <DateInput
                label="Due Date"
                name="dueDate"
                value={values.dueDate}
                onChange={setFieldValue}
                onBlur={handleBlur}
                setFieldValue={setFieldValue}
                error={errors.dueDate}
                touched={touched.dueDate}
              />

              <DateInput
                label="Defer Until"
                name="deferDate"
                value={values.deferDate}
                onChange={setFieldValue}
                onBlur={handleBlur}
                setFieldValue={setFieldValue}
                error={errors.deferDate}
                touched={touched.deferDate}
              />

              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={values.department}
                  onChange={handleChange}
                >
                  {formOptions.departmentOptions?.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <InputLabel>Project</InputLabel>
                <Select
                  name="projectId"
                  value={values.projectId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.projectId && !!errors.projectId}
                >
                  {projects.map((project) => (
                    <MenuItem key={project.id} value={project.id}>
                      {project.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box display="flex" justifyContent="flex-end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Save Changes
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditTaskForm;
