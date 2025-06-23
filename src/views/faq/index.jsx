import { Box, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
  <Header title="FAQ" subtitle="Frequently Asked Questions" />

  <Accordion defaultExpanded>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography color={colors.houndGold[500]} variant="h5">
        What is Scalpel Hound?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        Scalpel Hound is a trading platform built in public — for traders and curious minds who want honest tools, not empty promises.
        <br /><br />
        It offers live market data, paper trading, strategy building, and eventually, shareable dashboards — all shaped by the community.
      </Typography>
    </AccordionDetails>
  </Accordion>

  <Accordion defaultExpanded>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography color={colors.houndGold[500]} variant="h5">
        Is this a signal group or trading course?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        No. There are enough gurus selling "the secret."
        <br /><br />
        Scalpel Hound is a toolset — not a pitch. You configure, test, learn, and share. No signals. No shortcuts. Just tools, data and community.
      </Typography>
    </AccordionDetails>
  </Accordion>

  <Accordion defaultExpanded>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography color={colors.houndGold[500]} variant="h5">
        What do I get as a Founding Member?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        You get early access to:
        <ul>
          <li>Paper trading engine and strategy builder</li>
          <li>Private Forum to help shape the roadmap</li>
          <li>Dev logs, live updates, and early feature drops</li>
        </ul>
        This is your chance to help shape something real — not just use it.
      </Typography>
    </AccordionDetails>
  </Accordion>

  <Accordion defaultExpanded>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography color={colors.houndGold[500]} variant="h5">
        Is the platform live?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        Yes — development is active and consistent.
        <br /><br />
        It already pulls live market data, runs analytics, and supports paper trading logic. New features are shipped weekly — all in the open.
        <br /><br />
        If you want to help shape what gets built next, this is the time to get involved.
      </Typography>
    </AccordionDetails>
  </Accordion>

  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography color={colors.houndGold[500]} variant="h5">
        How much does it cost to join?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        There will be optional paid tiers in the future — but right now, early access is free to the early adopters.
        <br /><br />
        No recurring fees. No hidden upsells. Just support that helps drive development and rewards those who believe in the mission.
      </Typography>
    </AccordionDetails>
  </Accordion>

  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography color={colors.houndGold[500]} variant="h5">
        Will I need to connect my Binance or other exchange account?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        Not yet. For now, everything runs in **paper trading mode** — simulating real trades using live data.
        <br /><br />
        Live trading integrations will be opt-in later, and you’ll always retain control of your funds and API permissions.
      </Typography>
    </AccordionDetails>
  </Accordion>

  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography color={colors.houndGold[500]} variant="h5">
        Can I contribute ideas or request features?
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        Absolutely. That’s the whole point.
        <br /><br />
        Founding members help shape what gets built. You’ll have direct input through the roadmap, Forum, and voting feedback.
      </Typography>
    </AccordionDetails>
  </Accordion>

  {/* CTA Footer */}
  <Box mt={6} textAlign="center">
    <Typography variant="h5" gutterBottom>
      This isn’t just a platform — it’s a Pack.
    </Typography>
    <Button variant="contained" color="secondary" size="large" href="/joinThePack">
      Join the Pack
    </Button>
  </Box>
</Box>

  );
};

export default FAQ;
