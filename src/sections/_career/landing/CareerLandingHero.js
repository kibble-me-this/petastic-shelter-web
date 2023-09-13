import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Stack,
  Button,
  Divider,
  Container,
  Typography,
  Autocomplete, CircularProgress, TextField,
  Unstable_Grid2 as Grid,
} from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
import { fShortenNumber } from 'src/utils/formatNumber';
// _mock
import { _brands } from 'src/_mock';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// assets
import CareerHeroIllustration from 'src/assets/illustrations/CareerHeroIllustration';
// components
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
//
import { CareerFilterKeyword, CareerFilterLocations } from '../job/filters/components';

// ----------------------------------------------------------------------

const StyledRoot = styled(Stack)(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.grey[300], 0),
    imgUrl: '/assets/background/overlay_4.jpg',
  }),
  overflow: 'hidden',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    minHeight: '70vh',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: theme.spacing(10),
  },
}));

const StyledBar = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  [theme.breakpoints.up('md')]: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

// ----------------------------------------------------------------------

export default function CareerLandingHero() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [petType, setPetType] = useState("shelter");
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState([]);
  const [loadingBreeds, setLoadingBreeds] = useState(false);
  const [shelterAccountId, setShelterAccountId] = useState('');
  const autocompleteRef = useRef(null);

  const isMdUp = useResponsive('up', 'md');

  useEffect(() => {
    const cleanup = () => {
      setSearchTerm('');
    };
  
    // This function will run when the component unmounts
    return cleanup;
  }, []);

  const handleSearch = (event) => {
    const searchTermValue = event.target.value;
    setSearchTerm(searchTermValue);
    setLoadingBreeds(true);

    if (searchTermValue.trim() === '') {
      // Reset the shelters state to an empty array if the search term is empty
      setBreeds([]);
      setLoadingBreeds(false);
      return;
    }
  
    fetch(`https://uot4ttu72a.execute-api.us-east-1.amazonaws.com/default/getSheltersByPartialName?partialName=${searchTermValue}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Check if data is an array before mapping
      if (Array.isArray(data)) {
        const shelterNamesAndCities = data.map((shelter) => {
          const shelterName = shelter.name;
          const shelterCity = shelter.city;
          const shelterState = shelter.state;
          setShelterAccountId(shelter.account_id);

        
          // Capitalize the first letter of each word in shelterCity
          const capitalizedCity = shelterCity
          .split(/\s|-/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
          return `${shelterName}, ${capitalizedCity}, ${shelterState}`;
        });
        
        setBreeds(shelterNamesAndCities);

        
      } else {
        console.error('Invalid data format:', data);
      }
      setLoadingBreeds(false);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setLoadingBreeds(false);
    });
  
  };
  

  const [filters, setFilters] = useState({
    filterKeyword: null,
    filterLocation: null,
  });

  const handleChangeKeyword = (keyword) => {
    setFilters({
      ...filters,
      filterKeyword: keyword,
    });
  };

  const handleChangeLocation = (keyword) => {
    setFilters({
      ...filters,
      filterLocation: keyword,
    });
  };

  return (
    <StyledRoot>
      <Container>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid xs={12} md={6} lg={5}>
            <Stack
              spacing={5}
              sx={{
                textAlign: { xs: 'center', md: 'unset' },
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h1" sx={{ color: 'common.black' }}>
                  Earn cash for
                  <Box component="span" sx={{ color: 'primary.main' }}>
                    {` each pet `}
                  </Box>
                  that finds a home.
                </Typography>

                <Typography sx={{ color: 'grey.500' }}>
                  Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis
                  venenatis ante odio sit amet eros.
                </Typography>
              </Stack>

              <StyledBar spacing={{ xs: 1, md: 0 }}>
              <Autocomplete
                fullWidth
                onBlur={() => {
                  setLoadingBreeds(false); // Reset loading state
                }}
                ref={autocompleteRef}
                options={breeds}
                value={selectedBreed}
                onChange={(event, values) => setSelectedBreed(values)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Enter shelter name"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingBreeds ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                    sx={{
                      "& .MuiAutocomplete-endAdornment": {
                        display: "none",
                      },
                    }}
                    onChange={handleSearch}
                    value={searchTerm}
                    fullWidth
                    disabled={!petType}
                  />
                )}
                disabled={!petType}
                loading={loadingBreeds}
  loadingText="Fetching shelters..." // Set loading text here
  noOptionsText={petType ? `Enter ${petType} name` : 'Choose Cat or Dog'}
                // multiple
              />
                {isMdUp && <Divider orientation="vertical" sx={{ height: 24 }} />}
                <Button
  size="large"
  variant="contained"
  sx={{
    px: 0,
    minWidth: { xs: 1, md: 125 },
  }}
  onClick={() => navigate(`/e-commerce/landing?shelter_account_id=${shelterAccountId}`)}
>
  Claim Shelter
</Button>
              </StyledBar>
            </Stack>
          </Grid>

          {isMdUp && (
            <Grid xs={12} md={6} lg={6}>
              <CareerHeroIllustration />
            </Grid>
          )}
        </Grid>
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

const DividerStyle = <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />;

function BrandsSection() {
  return (
    <Stack
      flexWrap="wrap"
      direction="row"
      alignItems="center"
      sx={{
        mt: { md: 1 },
      }}
    >
      {_brands.slice(0, 4).map((brand) => (
        <Box
          key={brand.id}
          sx={{
            lineHeight: 0,
            my: { xs: 1.5, md: 0.5 },
            mr: { md: 3 },
            width: { xs: 0.5, md: 'auto' },
            '&:last-of-type': {
              mr: 0,
            },
          }}
        >
          <SvgColor
            src={brand.image}
            sx={{
              width: 94,
              height: 28,
              opacity: 0.8,
              color: 'grey.500',
            }}
          />
        </Box>
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

function SummarySection() {
  return (
    <Stack
      spacing={3}
      direction={{ xs: 'column', md: 'row' }}
      divider={DividerStyle}
      sx={{ pt: { md: 5 } }}
    >
      <Stack spacing={{ md: 3 }} direction="row" divider={DividerStyle}>
        <Stack spacing={0.5} sx={{ color: 'common.white', width: { xs: 0.5, md: 'auto' } }}>
          <Typography variant="h4">{fShortenNumber(2000000)}+</Typography>
          <Typography variant="body2" sx={{ opacity: 0.48 }}>
            Jobs
          </Typography>
        </Stack>

        <Stack spacing={0.5} sx={{ color: 'common.white', width: { xs: 0.5, md: 'auto' } }}>
          <Typography variant="h4">{fShortenNumber(500000)}+</Typography>
          <Typography variant="body2" sx={{ opacity: 0.48 }}>
            Successful Hiring
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={{ md: 3 }} direction="row" divider={DividerStyle}>
        <Stack spacing={0.5} sx={{ color: 'common.white', width: { xs: 0.5, md: 'auto' } }}>
          <Typography variant="h4">{fShortenNumber(250000)}+</Typography>
          <Typography variant="body2" sx={{ opacity: 0.48 }}>
            Partners
          </Typography>
        </Stack>

        <Stack spacing={0.5} sx={{ color: 'common.white', width: { xs: 0.5, md: 'auto' } }}>
          <Typography variant="h4">{fShortenNumber(156000)}+</Typography>
          <Typography variant="body2" sx={{ opacity: 0.48 }}>
            Employee
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
