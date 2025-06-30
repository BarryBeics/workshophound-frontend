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
        title="SCALPEL HOUND"
        subtitle="An indie trader's journey. Built in public. Sharpened by the Pack."
      />

      <Section>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: colors.houndGold[500] }}
        >
          Why This Matters
        </Typography>
        <Typography variant="body1" mb={3}>
          Five years ago, I discovered crypto — and I was hooked. I read
          everything I could. Eventually, I started trading. It was chaotic,
          messy, and addictive.
          <br />
          <br />
          That experience sparked a question that changed my path:
          <br />
          <em>
            “What if I could build a bot to trade for me — logically,
            consistently, without emotion?”
          </em>
          <br />
          <br />
          That question led me to retrain as a developer. Today, I lead the
          backend/microservices team at a company building its own patented
          database system.
          <br />
          <br />
          And through all that, my personal trading project —{" "}
          <strong>Scalpel Hound</strong> — has evolved from late-night
          experiments to a consistent, public, focused mission.
        </Typography>
      </Section>

      <Section>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: colors.houndGold[500] }}
        >
          The Project
        </Typography>
        <Typography variant="body1">
          Since March 2025, I've committed code every single weekend. April was
          the tipping point — progress became daily.
          <br />
          <br />
          I designed the logo. Registered the company. Drew a line in the sand:
          this is real.
          <br />
          <br />
          Scalpel Hound is no longer "my bot". It’s a journey in the open. A
          real-time log of building a smarter trading system — and learning
          publicly along the way.
          <br />
          <br />
          I’m not promising results. I’m not selling a dream. I’m showing the
          work.
        </Typography>
      </Section>

      <Section>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: colors.houndGold[500] }}
        >
          Why Share It?
        </Typography>
        <Typography variant="body1">
          A friend (ex-engineer) looked at the system and said:
          <br />
          <em>
            “This isn’t a side project anymore. People would love to be part of
            this.”
          </em>
          <br />
          <br />
          And that hit me. There’s no shortage of gurus and noisy Discords.
          <br />
          But what if you had front-row seats to something real? A project you
          could nudge. A builder you could root for?
          <br />
          <br />I love this saying{" "}
          <strong>
            “Gorau Chwarae Cyd Chwarae” — best played when played together.
          </strong>
          <br />
          That’s what I want this to be.
        </Typography>
      </Section>

      <Section>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: colors.houndGold[500] }}
        >
          What I'm Building
        </Typography>

        <Typography variant="body1" mb={2}>
          <strong>Scalpel Hound</strong> is:
        </Typography>

        <List>
          <ListItem disableGutters dense>
            <ListItemText primary="A strategy builder and paper trading engine" />
          </ListItem>
          <ListItem disableGutters dense>
            <ListItemText primary="Real-time data from live crypto markets" />
          </ListItem>
          <ListItem disableGutters dense>
            <ListItemText primary="Transparent logs, code updates, and GitHub streaks" />
          </ListItem>
          <ListItem disableGutters dense>
            <ListItemText primary="A pack of like-minded traders who shape what comes next" />
          </ListItem>
        </List>

        <Typography variant="body1" mt={2}>
          This could be like <em>Strava for Traders</em> — chart your progress,
          compare systems, improve together.
        </Typography>
      </Section>

      <Section>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: colors.houndGold[500] }}
        >
          Join the Pack
        </Typography>
        <Typography variant="body1">
          If this speaks to you, you’re already one of us.
          <br />
          <br />
          Founding Members get:
        </Typography>
        <List>
          <ListItem disableGutters dense>
            <ListItemText primary="Early access to paper trading + strategy builder features" />
          </ListItem>
          <ListItem disableGutters dense>
            <ListItemText primary="A seat in the private forum: vote on what gets built next" />
          </ListItem>
          <ListItem disableGutters dense>
            <ListItemText primary="Direct updates from me — no hype, just honest progress" />
          </ListItem>
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
          No ads. No promises. Just progress.
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
