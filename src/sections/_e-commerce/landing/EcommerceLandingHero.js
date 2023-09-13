import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook


// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// _mock
import { _productsCarousel } from 'src/_mock';
// components
import Carousel, { CarouselDots } from 'src/components/carousel';
//
import { EcommerceProductItemHero } from '../product/item';

// ----------------------------------------------------------------------

export default function EcommerceLandingHero() {
  const theme = useTheme();
  const location = useLocation(); // Use useLocation hook to access URL query parameters

  const carouselRef = useRef(null);

  const carouselSettings = {
    dots: true,
    fade: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      rounded: true,
      sx: {
        left: 0,
        right: 0,
        zIndex: 9,
        bottom: 40,
        mx: 'auto',
        position: 'absolute',
      },
    }),
  };

  const [shelterDetails, setShelterDetails] = useState(null); // State to store shelter details


  // Extract shelter_account_id from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const shelterAccountId = queryParams.get('shelter_account_id');

  // Define the API URL with shelterAccountId
  const apiUrl = `https://uot4ttu72a.execute-api.us-east-1.amazonaws.com/default/getPetsByAccountId=${shelterAccountId}`;

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
        // Store the shelter details in state
        setShelterDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching shelter details:', error);
      });
  }, [apiUrl]);
  

  return (
    <Container
      sx={{
        pt: { xs: 5, md: 8 },
      }}
    >
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.paper, 0.9),
            imgUrl: '/assets/background/overlay_1.jpg',
          }),
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Carousel ref={carouselRef} {...carouselSettings}>
          {_productsCarousel.map((product) => (
            <EcommerceProductItemHero key={product.id} product={product} />
          ))}
        </Carousel>
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: theme.spacing(1),
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <Typography variant="body1">
            Shelter Account ID: {shelterAccountId}
          </Typography>
        </Box>

      </Box>
    </Container>
  );
}
