import { Box, Button, Typography, useTheme, List, ListItem, ListItemText } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const LandingPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const Section = ({ children }) => (
    <Box my={6} p={4} backgroundColor={colors.grey[700]} borderRadius="5px">
      {children}
    </Box>
  );

  return (
    <Box m="20px">
  <Header
    title="SCALPEL HOUND LTD"
    subtitle="Built in public. Sharpened by the Pack."
  />

  <Section>
    <Typography variant="h5" gutterBottom>
      My Journey — and Why This Matters
    </Typography>
    <Typography variant="body1" mb={3}>
      Five years ago, I discovered crypto — and I was hooked. I read everything I could.  
      Eventually, I started trading. It was chaotic, messy, and addictive.
      <br /><br />
      That experience sparked a question that changed my life:
      <br />
      <em>“What if I could build a bot to trade for me — logically, consistently, without emotion?”</em>
      <br /><br />
      That question led me to quit my job and commit to becoming a developer.
      Today, I lead the backend/microservices team at a company building its own patented database system.
      <br /><br />
      And through all that, my personal trading project — <strong>Scalpel Hound</strong> — has evolved from late-night experiments to a fully formed, consistent, daily commitment.
    </Typography>
  </Section>

  <Section>
    <Typography variant="h4" gutterBottom>
      This Is No Longer a Side Project
    </Typography>
    <Typography variant="body1">
      Since March 2025, I’ve committed code to Scalpel Hound every weekend.
      In April, I levelled up: near-daily progress.
      <br />
      To keep myself accountable I registered as a limited company. I designed the logo. I drew a line in the sand — this is real now.
      <br /><br />
      I’ve had a 37-day GitHub streak (and counting) — more consistent than anything I’ve built personally.
      <br />
      Why? Because this isn’t just a trading tool. It’s my long-term goal.
      <br />
      To one day trade consistently with my own system. Maybe do it *together*.
    </Typography>
  </Section>

  <Section>
    <Typography variant="h4" gutterBottom>
      Why I’m Opening It Up
    </Typography>
    <Typography variant="body1">
      A close friend and former engineer saw what I’d built and said:
      <br />
      <em>“You should open this up. People would love to shape this — warts and all. It’s real.”</em>
      <br /><br />
      That hit me. There’s enough guru noise in this space.
      <br />
      But what if there was a place for crypto dreamers, thinkers, and traders who want honest tools, not promises?
      <br /><br />
      To share this now feels right, particulary because I believe in this Welsh quote:
      <br />
      <strong>“Gorau Chwarae Cyd Chwarae” — best played when played together.</strong>
      <br />
      That’s what I want for Scalpel Hound. A real Pack.
    </Typography>
  </Section>

  <Section>
    <Typography variant="h4" gutterBottom>
      What I’m Building — And How You Can Shape It
    </Typography>
    <Typography variant="body1">
      Scalpel Hound is:
      <List>
      {[
        "A strategy builder and paper trading engine",
        "Real-time data from live crypto markets ",
        "Transparent logs and dev updates",
        "A community shaping what comes next",
      ].map((item) => (
        <ListItem key={item} disableGutters dense>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
      It could be it like <em>Strava for Traders</em> — a way to log strategies, track performance, and share progress with the Pack.
    </Typography>
  </Section>

  <Section>
    <Typography variant="h4" gutterBottom>
      Join the Pack
    </Typography>
    <Typography variant="body1">
      Founding Members get:
    </Typography>
    <List>
      {[
        "Early access to tools: paper trading, strategy builder, dashboards",
        "A seat in the private Discord: shape features and vote on the roadmap",
        "Founder log + dev updates — building in public, the real way",
      ].map((item) => (
        <ListItem key={item} disableGutters dense>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
    <Button
      variant="contained"
      color="secondary"
      size="large"
      href="/joinThePack"
    >
      Join the Pack
    </Button>
    <Typography variant="caption" display="block" mt={2}>
      Community-first. Code-led. No ads. No hype.
    </Typography>
  </Section>

  <Box mt={8} textAlign="center">
    <Typography variant="body2">
      Barry Marples — Founder of Scalpel Hound Ltd
    </Typography>
    <Typography variant="caption" display="block" mt={2}>
      Information provided is not financial advice. Trading involves risk.
    </Typography>
  </Box>
</Box>


  );
};

export default LandingPage;
