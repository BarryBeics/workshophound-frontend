// components/SuggestionModal.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SuggestionForm from "./SuggestionForm";

const SuggestionModal = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>
      Add a Suggestion
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      <SuggestionForm onSuccess={onClose} />
    </DialogContent>
  </Dialog>
);

export default SuggestionModal;

