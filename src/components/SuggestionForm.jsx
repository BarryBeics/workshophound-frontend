// components/SuggestionForm.jsx
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useGraphQLClient from "../hooks/useGraphQLClient";
import { CREATE_TASK_MUTATION } from "../graph/tasks/mutations";

const suggestionSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string(),
});

const initialValues = {
  title: "",
  description: "",
  status: "inbox",
  labels: ["Suggestion"],
  assignedTo: "",
  dueDate: "",
  deferDate: "",
  department: "",
  duration: "",
  projectId: "", // optional if suggestions are uncategorized
};

const SuggestionForm = ({ onSuccess }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const client = useGraphQLClient();

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
        // convert empty strings to null (GraphQL-safe)
    const cleanedValues = { ...values };
    for (const key in cleanedValues) {
      if (cleanedValues[key] === "") {
        cleanedValues[key] = null;
      }
    }
      console.log("Submitting suggestion:", cleanedValues);
      await client.request(CREATE_TASK_MUTATION, { input: cleanedValues });
      resetForm();
      if (onSuccess) onSuccess(); // e.g., close modal
    } catch (err) {
      console.error("Error submitting suggestion:", err);
      alert("Failed to submit suggestion.");
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={suggestionSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Title"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              name="title"
              error={!!touched.title && !!errors.title}
              helperText={touched.title && errors.title}
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
              fullWidth
              variant="filled"
              multiline
              rows={4}
              label="Describe your suggestion"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              error={!!touched.description && !!errors.description}
              helperText={touched.description && errors.description}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="primary" variant="contained">
              Submit Suggestion
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SuggestionForm;