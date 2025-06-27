import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Button, TextField, FormControl, InputLabel, Select, MenuItem,
  FormControlLabel, Switch
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { GraphQLClient } from "graphql-request";
import Header from "../../components/Header";
import { graphqlEndpoint } from "../../config";

import { READ_USER_BY_EMAIL } from "../../graph/users/queries";
import { UPDATE_USER } from "../../graph/users/mutations";

const client = new GraphQLClient(graphqlEndpoint);

const validationSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().notRequired(),
  verifiedEmail: yup.boolean().required(),
  role: yup.string().oneOf(["GUEST", "INTERESTED", "MEMBER", "ADMIN"]).required("Required"),
  isDeleted: yup.boolean().required(),
  openToTrade: yup.boolean().notRequired(),
  binanceAPI: yup.string().notRequired(),
  notes: yup.string().notRequired(),
  invitedBy: yup.string().notRequired(),
  isPaidMember: yup.boolean().notRequired(),
  interestReason: yup.string().notRequired(),
  experienceLevel: yup.string().oneOf(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).notRequired(),
  twitterHandle: yup.string().notRequired(),
  referralSource: yup.string().notRequired(),
});

const EditUserForm = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { readUserByEmail } = await client.request(READ_USER_BY_EMAIL, { email });
        setInitialValues({
          id: readUserByEmail.id,
          firstName: readUserByEmail.firstName || "",
          lastName: readUserByEmail.lastName || "",
          email: readUserByEmail.email || "",
          password: "",
          verifiedEmail: readUserByEmail.verifiedEmail ?? false,
          role: readUserByEmail.role || "GUEST",
          isDeleted: readUserByEmail.isDeleted ?? false,
          openToTrade: readUserByEmail.openToTrade ?? false,
          binanceAPI: readUserByEmail.binanceAPI || "",
          notes: readUserByEmail.notes || "",
          invitedBy: readUserByEmail.invitedBy || "",
          isPaidMember: readUserByEmail.isPaidMember ?? false,
          interestReason: readUserByEmail.interestReason || "",
          experienceLevel: readUserByEmail.experienceLevel || "BEGINNER",
          twitterHandle: readUserByEmail.twitterHandle || "",
          referralSource: readUserByEmail.referralSource || "",
        });
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [email]);

  const handleSubmit = async (values) => {
    try {
      const input = { ...values, isDeleted: values.isDeleted ?? false };
      await client.request(UPDATE_USER, { input });
      alert("User updated successfully.");
      navigate("/manageUsers");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update user.");
    }
  };

  if (!initialValues) return <div>Loading...</div>;

  return (
    <Box m="20px">
      <Header title="EDIT USER" subtitle={`Edit ${initialValues.firstName} ${initialValues.lastName}`} />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            <Box display="grid" gap="20px" gridTemplateColumns="repeat(4, 1fr)">
              <TextField label="First Name" name="firstName" value={values.firstName}
                onChange={handleChange} onBlur={handleBlur} error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName} sx={{ gridColumn: "span 2" }} />

              <TextField label="Last Name" name="lastName" value={values.lastName}
                onChange={handleChange} onBlur={handleBlur} error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName} sx={{ gridColumn: "span 2" }} />

              <TextField label="Email" name="email" value={values.email}
                onChange={handleChange} onBlur={handleBlur} error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email} sx={{ gridColumn: "span 4" }} />

              <TextField label="Password (optional)" name="password" value={values.password}
                onChange={handleChange} type="password" sx={{ gridColumn: "span 4" }} />

              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <InputLabel>Role</InputLabel>
                <Select name="role" value={values.role} onChange={handleChange}>
                  <MenuItem value="GUEST">Guest</MenuItem>
                  <MenuItem value="INTERESTED">Interested</MenuItem>
                  <MenuItem value="MEMBER">Member</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <InputLabel>Experience Level</InputLabel>
                <Select name="experienceLevel" value={values.experienceLevel} onChange={handleChange}>
                  <MenuItem value="BEGINNER">Beginner</MenuItem>
                  <MenuItem value="INTERMEDIATE">Intermediate</MenuItem>
                  <MenuItem value="ADVANCED">Advanced</MenuItem>
                </Select>
              </FormControl>

              <TextField label="Binance API Key" name="binanceAPI" value={values.binanceAPI}
                onChange={handleChange} sx={{ gridColumn: "span 2" }} />

              <TextField label="Invited By" name="invitedBy" value={values.invitedBy}
                onChange={handleChange} sx={{ gridColumn: "span 2" }} />

              <TextField label="Referral Source" name="referralSource" value={values.referralSource}
                onChange={handleChange} sx={{ gridColumn: "span 2" }} />

              <TextField label="Interest Reason" name="interestReason" value={values.interestReason}
                onChange={handleChange} sx={{ gridColumn: "span 4" }} />

              <TextField label="Twitter Handle" name="twitterHandle" value={values.twitterHandle}
                onChange={handleChange} sx={{ gridColumn: "span 2" }} />

              <TextField label="Notes" name="notes" value={values.notes}
                onChange={handleChange} multiline minRows={3} sx={{ gridColumn: "span 4" }} />

              <FormControlLabel control={<Switch checked={values.verifiedEmail} onChange={handleChange} name="verifiedEmail" />} label="Verified Email" />
              <FormControlLabel control={<Switch checked={values.openToTrade} onChange={handleChange} name="openToTrade" />} label="Open To Trade" />
              <FormControlLabel control={<Switch checked={values.isPaidMember} onChange={handleChange} name="isPaidMember" />} label="Paid Member" />
              <FormControlLabel control={<Switch checked={values.isDeleted} onChange={handleChange} name="isDeleted" />} label="Is Deleted" />
            </Box>

            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button type="submit" variant="contained" color="secondary">
                Save Changes
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditUserForm;
