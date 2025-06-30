import { Avatar } from "@mui/material";

const UserAvatar = ({ fullName = "", size = 32, src }) => {
    const [firstName = "", lastName = ""] = fullName.split(" ");
    const initials =
      firstName.charAt(0).toUpperCase() +
      (lastName.charAt(0)?.toUpperCase() || "");
  
      const color = getColorFromName(fullName);

    return (
      <Avatar
      src={src}
        sx={{
          width: size,
          height: size,
          fontSize: size / 2.5,
           bgcolor: src ? "transparent" : "primary.main", // transparent if logo
        }}
      >
        {initials}
      </Avatar>
    );
  };
  

function getColorFromName(name) {
  const pastelColors = [
    "#AEDFF7", "#C9E4DE", "#FCE1E4", "#FFF4C1", "#E0C3FC",
    "#FFD8BE", "#BFD7EA", "#E6F0FF", "#D0E8F2", "#F3D1F4",
  ];
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return pastelColors[hash % pastelColors.length];
}

export default UserAvatar;
