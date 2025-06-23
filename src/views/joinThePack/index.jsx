import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";

import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { GraphQLClient, gql } from "graphql-request";
import { graphqlEndpoint } from "../../config";

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      firstName
      lastName
      email
      role
    }
  }
`;

const JoinThePack = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = async (values, { resetForm }) => {
    const client = new GraphQLClient(graphqlEndpoint);

    const input = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: "ballot-temp-password",
      role: "INTERESTED",
      invitedBy: null,
      interestReason: values.interestReason,
      experienceLevel: values.experienceLevel,
      twitterHandle: values.twitterHandle,
      referralSource: values.referralSource,
    };

    try {
      const data = await client.request(CREATE_USER_MUTATION, { input });
      console.log("Registration successful:", data.createUser);
      resetForm();
      setFormSubmitted(true);
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Hear More. See More. Get In Early"
        subtitle="Add your details to be first in line for exclusive updates, early results, and priority access."
      />

      <Typography variant="h4" gutterBottom>
        Join the Pack
      </Typography>
      <Typography variant="body1" gutterBottom>
        Be part of building the trading platform you wish existed.
      </Typography>
      <Typography variant="body1" mb={3}>
        Pack members get:
        <ul>
          <li>Private dev logs and progress updates</li>
          <li>Early access to strategy builder + paper trading features</li>
          <li>Invites to the private Forum community</li>
          <li>Voting rights to help shape the roadmap</li>
        </ul>
        This isn't about signals or shortcuts — it's about building tools that
        actually work. Together.
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        We respect your inbox. No spam. Just real progress, shared openly.
      </Typography>

      {formSubmitted ? (
        <Box mt={4} textAlign="center">
          <Typography
            variant="h4"
            gutterBottom
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <PetsIcon
              sx={{ color: colors.scalpelTeal[500], fontSize: "1.6rem", mx: 1 }}
            />
            Welcome to the Pack
            <PetsIcon
              sx={{ color: colors.scalpelTeal[500], fontSize: "1.6rem", mx: 1 }}
            />
          </Typography>

          <Typography variant="body1" mb={2}>
            Thanks for joining the pack. We’ll be in touch soon with updates,
            invites, and early access links.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            In the meantime, follow our build journey on Twitter or keep
            exploring the site.
          </Typography>
          <Button variant="outlined" color="secondary" href="/" sx={{ mt: 3 }}>
            Return Home
          </Button>
        </Box>
      ) : (
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={joinThePackSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  label="Last Name"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  label="Email"
                  name="email"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  label="What interests you about Scalpel Hound?"
                  name="interestReason"
                  multiline
                  minRows={3}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.interestReason}
                  error={!!touched.interestReason && !!errors.interestReason}
                  helperText={touched.interestReason && errors.interestReason}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  select
                  fullWidth
                  variant="filled"
                  label="Your experience level"
                  name="experienceLevel"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.experienceLevel}
                  error={!!touched.experienceLevel && !!errors.experienceLevel}
                  helperText={touched.experienceLevel && errors.experienceLevel}
                  sx={{ gridColumn: "span 4" }}
                >
                  <MenuItem value="BEGINNER">Beginner</MenuItem>
                  <MenuItem value="TRADER">Trader</MenuItem>
                  <MenuItem value="BUILDER">Builder / Developer</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  variant="filled"
                  label="Twitter Handle (optional)"
                  name="twitterHandle"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.twitterHandle}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  label="How did you hear about us? (optional)"
                  name="referralSource"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.referralSource}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>

              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Get Early Access
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
};

// Validation Schema
const joinThePackSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  interestReason: yup.string().required("Tell us why you're interested"),
  experienceLevel: yup
    .string()
    .oneOf(["BEGINNER", "TRADER", "BUILDER", "OTHER"])
    .required("Select your experience level"),
  twitterHandle: yup.string(),
  referralSource: yup.string(),
});

// Default Form Values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  interestReason: "",
  experienceLevel: "",
  twitterHandle: "",
  referralSource: "",
};

export default JoinThePack;
