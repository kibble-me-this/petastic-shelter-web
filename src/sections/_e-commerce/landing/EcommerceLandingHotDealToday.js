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


// ... (previous imports and constants)

export default function EcommerceLandingHotDealToday() {
  const theme = useTheme();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const shelterAccountId = queryParams.get('shelter_account_id');
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);

  const apiUrl = `https://uot4ttu72a.execute-api.us-east-1.amazonaws.com/default/getPetsByAccountId?account_id=${shelterAccountId}`;

  const [shelterDetails, setShelterDetails] = useState(null);

  useEffect(() => {
    console.log('Fetching shelter details...');
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Response Data:', data);
        setShelterDetails(data);

        // Filter dogs and cats based on pet type
        const dogs = data.filter((pet) => pet.type === 'Anymal::Carnivora::Canidae::Canis::Canis Lupus Familiars::Domesticated Dog:Dog');
        const cats = data.filter((pet) => pet.type === 'Anymal::Carnivora::Felidae::Felis::Felis Catus::Domesticated Cat::Cat');
        setFilteredDogs(dogs);
        setFilteredCats(cats);
      })
      .catch((error) => {
        console.error('Error fetching shelter details:', error);
      });
  }, [apiUrl]);
  

  const isMdUp = useResponsive('up', 'md');

  const carouselRef = useRef(null);

  const [tab, setTab] = useState('Dogs');

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const maxSlidesToShow = 6; // Maximum number of slides to show

  let calculatedSlidesToShow = maxSlidesToShow;
  let calculatedSlidesToScroll = maxSlidesToShow;

  if (shelterDetails !== null) {
    calculatedSlidesToShow = Math.min(maxSlidesToShow, shelterDetails.length);
    calculatedSlidesToScroll = Math.min(maxSlidesToShow, shelterDetails.length);
  }

  const carouselSettings = {
    dots: true,
    arrows: false,
    slidesToShow: calculatedSlidesToShow,
    slidesToScroll: calculatedSlidesToScroll,
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

  const petsToRender = tab === 'Dogs' ? filteredDogs : filteredCats;

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

        {isMdUp && (
          <CarouselArrows
            onNext={handleNext}
            onPrev={handlePrev}
            flexGrow={1}
            spacing={2}
            justifyContent="flex-end"
          />
        )}

        <Typography variant="body1">
          Number of Pets: {shelterDetails ? shelterDetails.length : 0}
        </Typography>
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
          <Tab 
            key={category} 
            value={category} 
            label={`${category} (${category === 'Dogs' ? filteredDogs.length : filteredCats.length})`} 
          />
        ))}
      </Tabs>
      {shelterDetails !== null && shelterDetails.length >= carouselSettings.slidesToShow && (
      <Carousel ref={carouselRef} {...carouselSettings}>
          {petsToRender.map((pet, index) => (
            <Box
              key={pet.pet_passport_id}
              sx={{
                py: 0.5,
                px: { xs: 1, md: 1.5 },
              }}
            >
              <EcommerceProductItemHot product={pet} index={index} hotProduct />
            </Box>
          ))}
        </Carousel>
      )}
    </Container>
  );
}
