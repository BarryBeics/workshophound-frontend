import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { UserRole } from "../../constants/userRoles.ts";

// Graph
import { CREATE_USER_MUTATION } from "../../graph/users/mutations";
import useGraphQLClient from "../../hooks/useGraphQLClient";

const CreateUserForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const client = useGraphQLClient();

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const input = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        role: values.role,
        invitedBy: values.invitedBy || null,
        interestReason: values.interestReason,
        experienceLevel: values.experienceLevel,
        twitterHandle: values.twitterHandle || null,
        referralSource: values.referralSource || null,
      };

      await client.request(CREATE_USER_MUTATION, { input });
      alert("User created successfully!");
      resetForm();
      navigate("/manageUsers");
    } catch (err) {
      const message = err?.response?.errors?.[0]?.message || "Unexpected error";
      console.error("GraphQL Error:", err);
      alert(`Failed to create user: ${message}`);
    }
  };

  return (
    <Box>
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
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
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                label="Invited By"
                name="invitedBy"
                value={values.invitedBy}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText="Optional"
                sx={{ gridColumn: "span 4" }}
              />

              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel>User Role</InputLabel>
                <Select
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.role && !!errors.role}
                >
                  <MenuItem value={UserRole.INTERESTED}>Interested</MenuItem>
                  <MenuItem value={UserRole.MEMBER}>Member</MenuItem>
                  <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                label="What interests you about Scalpel Hound?"
                name="interestReason"
                multiline
                minRows={2}
                value={values.interestReason}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.interestReason && !!errors.interestReason}
                helperText={touched.interestReason && errors.interestReason}
                sx={{ gridColumn: "span 4" }}
              />

              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel>Experience Level</InputLabel>
                <Select
                  name="experienceLevel"
                  value={values.experienceLevel}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.experienceLevel && !!errors.experienceLevel}
                >
                  <MenuItem value="BEGINNER">Beginner</MenuItem>
                  <MenuItem value="TRADER">Trader</MenuItem>
                  <MenuItem value="BUILDER">Builder / Developer</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

// Validation
const validationSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  role: yup
    .string()
    .oneOf(["INTERESTED", "MEMBER", "ADMIN"])
    .required("Required"),
  password: yup.string().min(6).required("Required"),
  interestReason: yup.string().required("Tell us why you're interested"),
  experienceLevel: yup
    .string()
    .oneOf(["BEGINNER", "TRADER", "BUILDER", "OTHER"])
    .required("Select your experience level"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  invitedBy: "",
  role: UserRole.INTERESTED,
  interestReason: "",
  experienceLevel: "",
  twitterHandle: "",
  referralSource: "",
};

export default CreateUserForm;
