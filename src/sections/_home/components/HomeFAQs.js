import { m } from 'framer-motion';
import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Button,
  Accordion,
  Container,
  Typography,
  AccordionDetails,
  AccordionSummary,
  Unstable_Grid2 as Grid,
} from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// assets
import { Pattern01 } from 'src/assets/illustrations/pattern';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const CONTENTS = [
  {
    question: `What is the animal economy?`,
    answer: `The animal economy encompasses various industries, including pet care, livestock farming, animal conservation, and wildlife management. It represents the vast network of economic activities related to animals, from domesticated pets to non-domesticated wildlife. Anymal Protocol supports this diverse economy by providing a decentralized ecosystem to manage animal data and enable custom applications for animal care, conservation, and welfare.`,
  },
  {
    question: `What challenges does the animal economy face in data infrastructure?`,
    answer: `The animal economy suffers from fragmented and inaccessible data storage and management, resulting in inefficiencies and high costs for all stakeholders. Anymal Protocol addresses these challenges by providing a decentralized ecosystem that enables efficient data management and reduces costs associated with traditional infrastructure. This empowers stakeholders to collaborate, innovate, and drive impactful animal care, conservation, and welfare initiatives.`,
  },   
  {
    question: `Why is a decentralized infrastructure suitable for the animal economy?`,
    answer: `The animal economy is naturally fragmented, encompassing diverse sectors like pet care, livestock farming, conservation, and wildlife management. A decentralized infrastructure aligns with this diversity, enabling collaboration, transparency, and innovation across the ecosystem. It promotes data sharing, reduces reliance on central authorities, and empowers stakeholders to collectively address the complex challenges of animal care and welfare. Anymal Protocol's decentralized ecosystem provides the ideal foundation to unite and leverage the collective efforts of the animal economy for the benefit of all animals.`,
  },
  {
    question: `Can the animal economy benefit from tokenization?`,
    answer: `Absolutely. Tokenization offers numerous advantages for the animal economy. The native token can be used for digital data transactions and real-world animal care expenses, including food, shelter, and other essential needs. This enables streamlined transactions and ensures proper care for animals within the ecosystem.`,
  },
  {
    question: `What is Anymal Protocol and what problem does it solve?`,
    answer: `Anymal Protocol is a decentralized ecosystem that revolutionizes animal data management and enables the development of custom applications for the animal economy. It addresses the fragmented and inaccessible nature of animal data storage and management, providing a cohesive infrastructure for all animal care stakeholders.`,
  },
  {
    question: 'How does Anymal Protocol leverage blockchain technology?',
    answer: `Anymal Protocol leverages blockchain technology to ensure secure and transparent animal data storage and transactions. It utilizes distributed ledger technology to create a decentralized network, enabling immutable records, data integrity, and enhanced trust for all participants.`,
  },
];

// ----------------------------------------------------------------------

export default function HomeFAQs() {
  const isSmUp = useResponsive('up', 'sm');

  const [expanded, setExpanded] = useState(false);

  const handleChangeExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container
      component={MotionViewport}
      sx={{
        position: 'relative',
        py: { xs: 5, md: 10 },
      }}
    >
      <Grid container spacing={{ md: 3 }} justifyContent="center">
        <Grid xs={12} md={8}>
          <m.div variants={varFade().in}>
            <Typography variant="h2" sx={{ textAlign: 'center' }}>
              Frequently Asked Questions
            </Typography>
          </m.div>

          <Box
            sx={{
              my: { xs: 8, md: 10 },
            }}
          >
            {CONTENTS.map((faq) => (
              <m.div key={faq.question} variants={varFade().in}>
                <Accordion
                  expanded={expanded === faq.question}
                  onChange={handleChangeExpanded(faq.question)}
                >
                  <AccordionSummary>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      {faq.question}
                    </Typography>

                    <Iconify
                      width={24}
                      icon={expanded === faq.question ? 'carbon:subtract' : 'carbon:add'}
                    />
                  </AccordionSummary>

                  <AccordionDetails>
                    <Typography variant="answer">{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              </m.div>
            ))}
          </Box>

          <Box
            sx={{
              borderWidth: 1,
              borderRadius: 3,
              textAlign: 'center',
              borderStyle: 'dashed',
              borderColor: (theme) => alpha(theme.palette.grey[500], 0.32),
              backgroundColor: '#C7F7D3',
              px: { xs: 3, md: 8 },
              py: { xs: 6, md: 8 },
            }}
          >
            <m.div variants={varFade().inUp}>
              <Typography variant="h2">Still Have Questions?</Typography>
            </m.div>

            <m.div variants={varFade().inUp}>
              <Typography sx={{ mt: 3, mb: 5, color: 'text.secondary' }}>
                Please describe your case to receive the most accurate advice.
              </Typography>
            </m.div>

            <m.div variants={varFade().inUp}>
              <Button
                size="large"
                color="inherit"
                variant="contained"
                endIcon={<img src="/assets/icons/platforms/ic_discord.svg" alt="Discord" style={{ filter: 'brightness(0) invert(1)' }} />}
                href=""
                sx={{
                  backgroundColor: '#212B36',
                  color: 'white',
                }}
                disabled
              >
                Join Discord
              </Button>
            </m.div>
          </Box>
        </Grid>
      </Grid>

      {/* {isSmUp && (
        <Pattern01
          sx={{
            top: 80,
            left: 0,
            right: 0,
            zIndex: -1,
            mx: 'auto',
            maxWidth: 600,
            maxHeight: 600,
          }}
        />
      )} */}
    </Container>
  );
}
