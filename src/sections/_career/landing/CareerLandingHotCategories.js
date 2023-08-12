import PropTypes from 'prop-types';
// @mui
import { Typography, Stack, Container, Box, Paper, Button } from '@mui/material';
// components
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

export default function CareerLandingHotCategories({ categories }) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        py: { xs: 10, md: 15 },
      }}
    >
    <Container>
      <Typography variant="h2" sx={{ textAlign: 'left' }}>
        How it works
      </Typography>
      <Typography sx={{ color: 'grey.500' }}>
        Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis
        venenatis ante odio sit amet eros.
      </Typography>

      <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 4,
            my: { xs: 8, md: 10 },
          }}
        >
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </Box>

      <Stack alignItems="center">
        <Button
          color="inherit"
          size="large"
          variant="outlined"
          endIcon={<Iconify icon="carbon:chevron-right" />}
        >
          View All Categories
        </Button>
      </Stack>
    </Container>
    </Box>
  );
}

CareerLandingHotCategories.propTypes = {
  categories: PropTypes.array,
};

// ----------------------------------------------------------------------

function CategoryItem({ category }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        flex: '1', // Equal fraction of available width
        minHeight: '250px', // Set the maximum height here
        display: 'flex', // Use display flex
        flexDirection: 'column', // Stack content vertically
        justifyContent: 'center', // Vertically center content
        alignItems: 'center', // Horizontally center content
        width: '100%',
        borderRadius: 2,
        cursor: 'pointer',
        textAlign: 'center',
        bgcolor: 'transparent',
        transition: (theme) => theme.transitions.create('all'),
        '&:hover': {
          bgcolor: 'background.paper',
          boxShadow: (theme) => theme.customShadows.z24,
          '& .icon': {
            bgcolor: 'primary.main',
            transition: (theme) => theme.transitions.create('all'),
            '& > span': {
              color: 'common.white',
            },
          },
        },
      }}
    >
      <Box
        className="icon"
        sx={{
          mb: 2.5,
          width: 72,
          height: 72,
          display: 'flex',
          borderRadius: '50%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SvgColor src={category.icon} sx={{ width: 48, height: 48 }} />
      </Box>

      <TextMaxLine variant="h6" line={1}>
        {category.name}
      </TextMaxLine>

      <Typography variant="body2" sx={{ color: 'text.disabled', mt: 0.5 }}>
        {category.totalJobs} jobs
      </Typography>
    </Paper>
  );
}


CategoryItem.propTypes = {
  category: PropTypes.shape({
    icon: PropTypes.node,
    name: PropTypes.string,
    totalJobs: PropTypes.number,
  }),
};
