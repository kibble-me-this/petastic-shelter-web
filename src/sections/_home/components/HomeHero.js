import { useRef } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Stack, Button, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// hooks
import useResponsive from 'src/hooks/useResponsive';
import useBoundingClientRect from 'src/hooks/useBoundingClientRect';
// config
import { HEADER } from 'src/config-global';
// routes
import { paths } from 'src/routes/paths';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';


// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, 0),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    height: `calc(100vh - ${HEADER.H_MAIN_DESKTOP}px)`,
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const containerRef = useRef(null);

  const isMdUp = useResponsive('up', 'md');

  const container = useBoundingClientRect(containerRef);

  const offsetLeft = container?.left;

  return (
    <StyledRoot>
      <Container sx={{ height: 1 }}>
        <Grid container columnSpacing={3} alignItems="center" sx={{ height: 1 }}>
          <Grid xs={12} md={5}>
            <Stack
              spacing={5}
              justifyContent="center"
              alignItems={{ xs: 'center', md: 'flex-start' }}
              sx={{
                py: 15,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography variant="h1">
                The Web3 <br /> Ecosystem for all
                <Box component="span" sx={{ color: 'primary.main' }}>
                  {` Animals`}
                </Box>
              </Typography>

              <Typography sx={{ color: 'text.secondary' }}>
              Anymal Protocol is a decentralized network purpose-built to identify, 
              track, and manage the lives of all animals on earth.
              </Typography>

              <Button
                color="inherit"
                size="large"
                variant="contained"
                endIcon={<img src="/assets/icons/platforms/ic_discord.svg" alt="Discord" />}
                target="_blank"
                rel="noopener"
                href={paths.figmaPreview}
                disabled
              >
                <Stack direction="column" spacing={0}>
                  <Typography variant="button">Join Discord</Typography>
                  <Typography variant="caption" sx={{ pl:1.3, fontSize: 8 }}>
                    (earn 25 tokens)
                  </Typography>
                </Stack>
              </Button>


              <Stack spacing={3}>
                <Typography variant="overline">AVAILABLE FOR</Typography>
                <Stack direction="row" spacing={2.5} justifyContent="center">
                  {['dog', 'cat'].map((icon) => (
                    <SvgColor
                      key={icon}
                      src={`/assets/icons/ic_${icon}.svg`}
                      sx={{ width: 24, height: 24 }}
                    />
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          <Grid xs={12} md={7}>
            <Box ref={containerRef} />
          </Grid>
        </Grid>
      </Container>

      {isMdUp && (
        <Box
          sx={{
            maxWidth: {
              xs: 1280,
              lg: 800,
            },
            position: 'absolute',
            bottom: { md: '20%', lg: 70 },
            right: { md: -110, xl: 0 },
            width: { md: `calc(100% - ${offsetLeft}px)` },
          }}
        >
          <Image
            visibleByDefault
            disabledEffect
            alt="home hero"
            src="/assets/images/home/home_hero.png"
          />
        </Box>
      )}
    </StyledRoot>
  );
}
