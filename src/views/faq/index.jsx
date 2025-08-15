import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme/tokens";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Header title="FAQ" subtitle="Frequently Asked Questions" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.houndGold[500]} variant="h5">
            What is Workshop Hound?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Workshop Hound is a simple job‑tracking system for repair shops.
            Book items in, move them through clear stages
            (<em>received → on hold → in process → complete → collected</em>),
            and give customers a self‑serve portal for status, invoices, and payment.
            Less counter time, more bench time.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.houndGold[500]} variant="h5">
            How does job tracking work?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Log a job with customer details, item photos, and notes. Drag‑and‑drop
            cards across statuses. Every change is timestamped with who did it.
            Optional holds clarify why a job is paused (awaiting parts, awaiting customer approval, etc.).
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.houndGold[500]} variant="h5">
            Can customers see progress themselves?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes. Customers get a secure portal link to view live status, approve work,
            see notes/photos, and download invoices. That cuts down walk‑ins and phone calls.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.houndGold[500]} variant="h5">
            Do we take payments inside the workshop?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You don’t have to. Create an invoice and let customers pay online before collection.
            This separation of concerns keeps your techs focused on repairs while payments are handled
            securely through the portal. (In‑person payments are still fine if you prefer.)
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.houndGold[500]} variant="h5">
            What about invoices and parts/labour?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Build invoices from parts and labour lines, add notes/photos, and send in one click.
            Customers can pay online and you’ll have a clear audit trail on the job timeline.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.houndGold[500]} variant="h5">
            How long does setup take?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Most shops are up and running in under an hour. Configure your statuses, invite your team,
            and start booking jobs. No heavy training required.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.houndGold[500]} variant="h5">
            Does it support multiple staff and roles?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes. Add team members with appropriate access—front‑of‑house, technicians, owner/admin.
            Actions are attributed to the user for accountability.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.houndGold[500]} variant="h5">
            Can we customise statuses and notifications?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Core statuses are built‑in, and you can add holds/notes for clarity.
            Email/SMS notifications to customers can be enabled for key events
            (e.g. “ready for collection”, “awaiting approval”).
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.houndGold[500]} variant="h5">
            What does it cost?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Early access pricing is simple and usage‑based. Start free while we onboard
            repair shops; paid plans will be announced with plenty of notice and will
            scale with team size and features.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.houndGold[500]} variant="h5">
            Who owns our data?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You do. Export your data any time. Payments are processed by integrated providers,
            and sensitive payment info never touches your workshop systems.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* CTA Footer */}
      <Box mt={6} textAlign="center">
        <Typography variant="h5" gutterBottom>
          Ready to spend less time at the counter and more time on repairs?
        </Typography>
        <Button variant="contained" color="secondary" size="large" href="/signup">
          Start Free Trial
        </Button>
        <Typography variant="caption" display="block" mt={2}>
          Prefer a walkthrough? <a href="/demo">Book a 10‑minute demo</a>.
        </Typography>
      </Box>
    </Box>
  );
};

export default FAQ;
