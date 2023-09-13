import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook

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
const TABS = ['Dogs', 'Cats'];

// ----------------------------------------------------------------------


export default function EcommerceLandingHotDealToday() {
  const theme = useTheme();
  const location = useLocation(); // Use useLocation hook to access URL query parameters


  const isMdUp = useResponsive('up', 'md');

  const carouselRef = useRef(null);

  const [tab, setTab] = useState('Dogs');

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

  const [shelterDetails, setShelterDetails] = useState(null); // State to store shelter details
  // Extract shelter_account_id from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const shelterAccountId = queryParams.get('shelter_account_id');

  // Define the API URL with shelterAccountId
  const apiUrl = `https://uot4ttu72a.execute-api.us-east-1.amazonaws.com/default/getPetsByAccountId?account_id=${shelterAccountId}`;

  useEffect(() => {
    // Fetch shelter details when the component mounts
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Response Data:', data);

        // Store the shelter details in state
        setShelterDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching shelter details:', error);
      });
  }, [apiUrl]);
  

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

        <Typography variant="body1">
            Shelter Account ID: {shelterAccountId}
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
        {shelterDetails &&
          shelterDetails.map((pet) => (
            <Box
              key={pet.pet_passport_id}
              sx={{
                py: 0.5,
                px: { xs: 1, md: 1.5 },
              }}
            >
              <EcommerceProductItemHot product={pet} hotProduct />
            </Box>
          ))}
      </Carousel>
    </Container>
  );
}
