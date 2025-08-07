import {
  Box,
  Dialog,
  DialogTitle,
  ImageList,
  ImageListItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";
import { graphqlEndpoint } from "../config";

import { READ_AVATARS_QUERY } from "../graph/avatar/queries";

const SelectAvatarModal = ({ open, onClose, onSelect }) => {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    if (open) {
      const fetchAvatars = async () => {
        const client = new GraphQLClient(graphqlEndpoint);
        const res = await client.request(READ_AVATARS_QUERY);
        setAvatars(res.readAllAvailableAvatars);
      };
      fetchAvatars();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Choose Your Avatar
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box padding={2}>
        <ImageList cols={4} gap={12}>
          {avatars.map((avatar) => (
            <ImageListItem key={avatar.filename} onClick={() => onSelect(avatar.filename)}>
              <img
                src={`/assets/avatars/${avatar.filename}`}
                alt={avatar.filename}
                style={{ borderRadius: "8px", cursor: "pointer" }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Dialog>
  );
};

export default SelectAvatarModal;
