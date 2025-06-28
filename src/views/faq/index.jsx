import { 
  Box, 
  Button, 
  List,
  ListItem, 
  ListItemText,
  useTheme } from "@mui/material";
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
            Scalpel Hound is a trading project built in public — for indie
            traders who value transparency over hype.
            <br />
            <br />
            It’s a strategy builder, paper trading engine, and data hub — shaped
            by real users who help guide what gets built next.
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
            No. Scalpel Hound isn’t here to sell you a dream.
            <br />
            <br />
            It’s not signals. It’s not a course. It’s a real-time build — and a
            platform you can help shape. The tools are honest, the code is
            clean, and the journey is open.
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
          <Box>
            <Typography>Founding Members get early access to:</Typography>

            <List sx={{ paddingLeft: "1.25rem", marginY: "0.5rem" }}>
              <ListItem disableGutters dense>
                <ListItemText primary="Paper trading engine + strategy builder" />
              </ListItem>
              <ListItem disableGutters dense>
                <ListItemText primary="Private forum with roadmap voting + feature suggestions" />
              </ListItem>
              <ListItem disableGutters dense>
                <ListItemText primary="Unfiltered dev logs and honest progress reports" />
              </ListItem>
            </List>

            <Typography>
              You’re not just along for the ride — you help steer it.
            </Typography>
          </Box>
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
            Yes — development is active, and everything is built in public.
            <br />
            <br />
            Scalpel Hound already connects to live market data, handles basic
            strategy logic, and is expanding feature-by-feature. Weekly commits.
            Transparent roadmap.
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
            Nothing for now.
            <br />
            <br />
            Early access is free while the project is being shaped. In the
            future, optional paid tiers may be introduced — but only to support
            deeper features and reward early supporters.
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
            Not yet. Currently, everything runs in paper trading mode using live
            market data.
            <br />
            <br />
            Live trading will be opt-in only — and you’ll always maintain full
            control of your API keys and exchange funds.
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
            100% yes. This is why Scalpel Hound exists.
            <br />
            <br />
            Founding Members can vote on the roadmap, request new tools, and
            help shape how the platform evolves. This is a Pack — not a product.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* CTA Footer */}
      <Box mt={6} textAlign="center">
        <Typography variant="h5" gutterBottom>
          This isn’t just a platform — it’s a Pack.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          href="/joinThePack"
        >
          Join the Pack
        </Button>
      </Box>
    </Box>
  );
};

export default FAQ;
