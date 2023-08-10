import { m } from 'framer-motion';
// @mui
import { Box, Paper, Container, Typography } from '@mui/material';
// components
import Image from 'src/components/image';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function HomeNewStart() {
  return (
    <Container
      component={MotionViewport}
      sx={{
        pt: { xs: 10, md: 15 },
        pb: { xs: 5, md: 10 },
      }}
    >
      <Paper
        sx={{
          pb: 10,
          borderRadius: 3,
          textAlign: 'center',
          bgcolor: 'background.neutral',
        }}
      >
        <m.div variants={varFade().inUp}>
          <Image
            alt="cover"
            src="/assets/images/home/new_start.png"
            sx={{ maxWidth: 720, mx: 'auto' }}
          />
        </m.div>

        <Box sx={{ mt: 3, mx: 'auto', px: 3, maxWidth: 560 }}>
          <m.div variants={varFade().inDown}>
            <Typography variant="overline" sx={{ color: 'text.disabled' }}>
              animal identity
            </Typography>
          </m.div>

          <m.div variants={varFade().inDown}>
            <Typography variant="h2" sx={{ my: 3 }}>
              The
              <Box component="span" sx={{ color: 'primary.main' }}>
                {` Anymal `}
              </Box>
              IDX
            </Typography>
          </m.div>

          <m.div variants={varFade().inDown}>
            <Typography sx={{ color: 'text.secondary' }}>
            Manage animal data on a global scale with Anymal&apos;s open-source IDX. Our data model is compatible with all animals, from pets to wildlife.
            </Typography>
          </m.div>
        </Box>
      </Paper>
    </Container>
  );
}
