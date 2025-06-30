import { Box, Chip, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme/tokens"; // adjust path as needed
import formOptions from "../config/formOptions.json";

const LabelSelector = ({ selectedLabels, setFieldValue, error, touched }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleToggle = (label) => {
    const newLabels = selectedLabels.includes(label)
      ? selectedLabels.filter((l) => l !== label)
      : [...selectedLabels, label];

    setFieldValue("labels", newLabels);
  };

  return (
    <Box width="100%" sx={{ gridColumn: "span 4" }}>
      <Typography variant="subtitle2" gutterBottom>
        Labels
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={1}>
        {formOptions.labelOptions.map((label) => {
          const isSelected = selectedLabels.includes(label.value);
          return (
            <Chip
              key={label.value}
              label={label.value}
              onClick={() => handleToggle(label.value)}
              clickable
              sx={{
                backgroundColor: isSelected ? colors.scalpelTeal[300] : colors.scalpelTeal[200],
                color: colors.grey[900],
                fontWeight: isSelected ? "bold" : "normal",
                border: isSelected ? `2px solid ${colors.scalpelTeal[500]}` : "1px solid transparent",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: colors.scalpelTeal[500],
                  color: colors.grey[100],
                },
              }}
            />
          );
        })}
      </Box>

      {touched && error && (
        <Typography variant="caption" color="error" mt={1}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default LabelSelector;
