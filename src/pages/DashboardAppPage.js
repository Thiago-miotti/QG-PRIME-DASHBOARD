import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Khipo Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Olá, Bem-vindo !
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Usuários" total={120} icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Usuários que fizeram check-in" total={70} color="info" icon={'ant-design:check-circle-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Usuários que não fizeram check-in" total={50} color="warning" icon={'ant-design:fall-outlined'} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Visitas as atrações"
              chartData={[
                { label: 'Claw Machine', value: 4344 },
                { label: 'Tabuleiro', value: 5435 },
                { label: 'Photo Freeze', value: 1443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Visitas as atrações"
              chartData={[
                { label: 'Claw Machine', value: 400 },
                { label: 'Tabuleiro', value: 430 },
                { label: 'Photo Freeze', value: 448 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppNewsUpdate
              title="Updates"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.fullName(),
                description: 'Fez check-in na atração Claw Machine',
                image: `/assets/images/avatars/avatar_${index + 3}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>


        </Grid>
      </Container>
    </>
  );
}
