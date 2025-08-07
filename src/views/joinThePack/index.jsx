import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  useMediaQuery,
  useTheme,
  List,
  ListItem, 
  ListItemText,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";

import { tokens } from "../../theme/tokens";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import SelectAvatarModal from "../../components/SelectAvatarModal";
import { GraphQLClient, gql } from "graphql-request";
import { graphqlEndpoint } from "../../config";

// Graph
import { CREATE_USER_MUTATION } from "../../graph/users/mutations";
import { CREATE_TASK_MUTATION } from "../../graph/tasks/mutations";
import { ASSIGN_AVATAR_MUTATION } from "../../graph/avatar/mutations";
import useGraphQLClient from "../../hooks/useGraphQLClient";

const JoinThePack = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const gqlClient = useGraphQLClient();


  const handleFormSubmit = async (values, { resetForm }) => {
    const client = new GraphQLClient(graphqlEndpoint);

    console.log("Form values submitted:", values);

    const input = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: "temp-password",
      role: "INTERESTED",
      invitedBy: null,
      avatar: values.avatar,
      interestReason: values.interestReason,
      experienceLevel: values.experienceLevel,
      twitterHandle: values.twitterHandle,
      referralSource: values.referralSource,
    };

    console.log("GraphQL input payload:", input);

    try {
    const response = await client.request(CREATE_USER_MUTATION, { input });
    const createdUser = response.createUser;
    console.log("User created:", createdUser);

    await client.request(ASSIGN_AVATAR_MUTATION, {
      email: createdUser.email,
      filename: values.avatar,
    });
    console.log("Avatar assigned:", values.avatar);

  const taskInput = {
    title: `Verify user: ${input.firstName} ${input.lastName}`,
    description: `Check and verify the legitimacy of this newly interested user submission.\n\nDetails:\nEmail: ${input.email}\nInterest: ${input.interestReason}`,
    status: "inbox",
    labels: ["user-verification", "public-form"],
    department: "admin",
    assignedTo: null, // optionally assign
    dueDate: null,
    deferDate: null,
    duration: null,
    projectId: null,
  };

  await gqlClient.request(CREATE_TASK_MUTATION, { input: taskInput });
  console.log("Auto-verification task created");

    resetForm();
    setFormSubmitted(true);
} catch (error) {
  console.error("Registration or task creation error", error);
}

  };

  return (
    <Box>
      <Header
        title="Hear More. See More. Get In Early"
        subtitle="Add your details to follow the journey and help shape what gets built next."
      />

      <Typography variant="h4" gutterBottom>
        Join the Pack
      </Typography>
      <Typography variant="body1" gutterBottom>
        Be part of building the trading platform you wish existed.
      </Typography>
      <Typography variant="body1" mb={1}>
        As a Pack Member, you'll get:
      </Typography>
      <List sx={{ paddingLeft: 2 }}>
        <ListItem disableGutters dense>
          <ListItemText primary="Private dev logs and weekly build updates" />
        </ListItem>
        <ListItem disableGutters dense>
          <ListItemText primary="Early access to paper trading + strategy builder tools" />
        </ListItem>
        <ListItem disableGutters dense>
          <ListItemText primary="Invites to the private Forum community" />
        </ListItem>
        <ListItem disableGutters dense>
          <ListItemText primary="Voting rights to help shape the roadmap" />
        </ListItem>
      </List>
      <Typography variant="body1" mb={3}>
        This isn't about signals or shortcuts — it's about building smarter
        tools, together.
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
              sx={{ color: colors.scalpelTeal[400], fontSize: "1.6rem", mx: 1 }}
            />
            Welcome to the Pack
            <PetsIcon
              sx={{ color: colors.scalpelTeal[400], fontSize: "1.6rem", mx: 1 }}
            />
          </Typography>

          <Typography variant="body1" mb={2}>
            Thanks for joining the journey. You’re now part of something being
            built in the open.
            <br />
            We’ll be in touch with updates, invites, and early access.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            In the meantime, follow the build on Twitter — or explore what’s
            live.
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
    setFieldValue, // 👈 required for avatar selection
  }) => (
    <>
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

        {/* Avatar selection UI */}
        <Box sx={{ gridColumn: "span 4", mt: 2 }}>
          <Typography>Select Your Avatar</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            {values.avatar ? (
              <img
                src={`/assets/avatars/${values.avatar}`}
                alt="selected avatar"
                width={64}
                height={64}
                style={{ borderRadius: "8px" }}
              />
            ) : (
              <Typography color="error">No avatar selected</Typography>
            )}

            <Button variant="outlined" onClick={() => setAvatarModalOpen(true)}>
              Choose Avatar
            </Button>
          </Box>
          {touched.avatar && errors.avatar && (
            <Typography color="error" fontSize="0.8rem">
              {errors.avatar}
            </Typography>
          )}
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

      {/* Avatar selection modal — outside form, still inside Formik */}
      <SelectAvatarModal
        open={avatarModalOpen}
        onClose={() => setAvatarModalOpen(false)}
        onSelect={(filename) => {
          setFieldValue("avatar", filename);
          setAvatarModalOpen(false);
        }}
      />
    </>
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
  avatar: yup.string().required("Please choose your avatar"),
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
  avatar: "",
};

export default JoinThePack;
