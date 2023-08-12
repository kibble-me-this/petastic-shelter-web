import { useRef, useState } from 'react';
import { add } from 'date-fns';
// @mui
import { useTheme } from '@mui/material/styles';
import { Typography, Container, Stack, Box, Tabs, Tab } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// _mock
import { _products } from 'src/_mock';
// components
import Carousel, { CarouselDots, CarouselArrows } from 'src/components/carousel';
//
import { ProductCountdownBlock } from '../components';
import { EcommerceProductItemHot } from '../product/item';

// ----------------------------------------------------------------------
const TABS = ['Featured Products', 'Top Rated Products', 'Onsale Products'];

// ----------------------------------------------------------------------


export default function EcommerceLandingHotDealToday() {
  const theme = useTheme();

  const isMdUp = useResponsive('up', 'md');

  const carouselRef = useRef(null);

  const [tab, setTab] = useState('Featured Products');

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const carouselSettings = {
    dots: true,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 6,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      sx: {
        mt: 8,
        ...(isMdUp && { display: 'none' }),
      },
    }),
    responsive: [
      {
        // Down md
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        // Down sm
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        spacing={3}
        sx={{
          mb: 8,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          Pets at your shelter
        </Typography>

        {/* <ProductCountdownBlock
          hiddenLabel
          expired={add(new Date(), { hours: 1, minutes: 30 })}
          sx={{
            '& .value': {
              width: 36,
              height: 32,
              color: 'grey.800',
              bgcolor: 'text.primary',
              ...(theme.palette.mode === 'light' && {
                color: 'common.white',
              }),
            },
            '& .separator': { color: 'text.primary' },
          }}
        /> */}

        {isMdUp && (
          <CarouselArrows
            onNext={handleNext}
            onPrev={handlePrev}
            flexGrow={1}
            spacing={2}
            justifyContent="flex-end"
          />
        )}
      </Stack>
      <Tabs
        value={tab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleChangeTab}
        sx={{ my: 5 }}
      >
        {TABS.map((category) => (
          <Tab key={category} value={category} label={category} />
        ))}
      </Tabs>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {_products.map((product) => (
          <Box
            key={product.id}
            sx={{
              py: 0.5,
              px: { xs: 1, md: 1.5 },
            }}
          >
            <EcommerceProductItemHot product={product} hotProduct />
          </Box>
        ))}
      </Carousel>
    </Container>
  );
}
