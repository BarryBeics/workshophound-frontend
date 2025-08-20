import {
  Box,
  Button,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme/tokens";

const LandingPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const Section = ({ children }) => (
    <Box my={6} p={4} backgroundColor="background.paper" borderRadius="5px">
      {children}
    </Box>
  );

  return (
    <Box>
      <Header
        title="WORKSHOP HOUND"
        subtitle="Simple job tracking for busy repair shops."
      />

      <Section>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: colors.houndGold[500] }}
        >
          What It Is
        </Typography>
        <Typography variant="body1" mb={3}>
          Workshop Hound helps repair shops manage customer jobs from booking
          to hand‑over—without clogging up bench time. Log items in, move them
          through clear stages (<em>received → on hold → in process → complete → collected</em>),
          and give customers a self‑serve portal for status, invoices, and payment.
        </Typography>
      </Section>

      <Section>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: colors.houndGold[500] }}
        >
          Why Shops Use It
        </Typography>
        <List>
          <ListItem disableGutters dense>
            <ListItemText primary="Smoother workflow: standardised statuses and simple hand‑offs" />
          </ListItem>
          <ListItem disableGutters dense>
            <ListItemText primary="Less interruption: customers check progress themselves" />
          </ListItem>
          <ListItem disableGutters dense>
            <ListItemText primary="Quicker turnarounds: techs stay on the tools, not in the inbox" />
          </ListItem>
          <ListItem disableGutters dense>
            <ListItemText primary="Cleaner hand‑over: invoice + pay online before collection" />
          </ListItem>
        </List>
      </Section>

      <Section>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: colors.houndGold[500] }}
        >
          Key Capabilities
        </Typography>

        <List>
          <ListItem disableGutters dense>
            <ListItemText primary="Book‑in flow with customer + item details, photos, and notes" />
          </ListItem>
          <ListItem disableGutters dense>
            <ListItemText primary="Drag‑drop job board: received, on hold, in process, complete, collected" />
          </ListItem>
          <ListItem disableGutters dense>
            <ListItemText primary="Customer portal: live status, approvals, messaging, and history" />
          </ListItem>
          <ListItem disableGutters dense>
            <ListItemText primary="Invoice creation: build from parts/labour, send in one click" />
          </ListItem>
          <ListItem disableGutters dense>
            <ListItemText primary="Online payment: customers pay securely before pickup" />
          </ListItem>
          <ListItem disableGutters dense>
            <ListItemText primary="Audit trail: timestamps for every status change and note" />
          </ListItem>
        </List>
      </Section>

      <Section>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: colors.houndGold[500] }}
        >
          Separation of Concerns (Less Friction)
        </Typography>
        <Typography variant="body1">
          Your techs fix things; the system handles updates, invoices, and payment.
          Customers log in, see status, and pay—so hand‑over is seconds, not minutes.
          The workshop team doesn’t need to process payments at the bench, which keeps
          the flow efficient and focused.
        </Typography>
      </Section>

      <Section>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: colors.houndGold[500] }}
        >
          Get Started
        </Typography>
        <Typography variant="body1" mb={2}>
          Set up your stages, invite your team, and start moving jobs today.
          No heavy training—just a clear board and happy customers.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          href="/signup"
        >
          Start Free Trial
        </Button>
        <Typography variant="caption" display="block" mt={2}>
          Prefer a tour first? <a href="/demo">Book a 10‑minute demo</a>.
        </Typography>
      </Section>

      <Box mt={8} textAlign="center">
        <Typography variant="body2">
          Workshop Hound — Less admin. More repair time.
        </Typography>
        <Typography variant="caption" display="block" mt={2}>
          Data remains yours. Payments handled securely by integrated providers.
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
