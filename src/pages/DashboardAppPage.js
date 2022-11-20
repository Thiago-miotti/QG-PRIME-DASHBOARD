import {Helmet} from 'react-helmet-async';
import {faker} from '@faker-js/faker';
// @mui
import {useTheme} from '@mui/material/styles';
import {Grid, Container, Typography, Stack, CircularProgress, Box} from '@mui/material';
// components
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
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
import {countOccurrences} from "../utils/countOccurrences";


export default function DashboardAppPage() {
    const theme = useTheme();

    const [userActivations, setUserActivations] = useState([]);
    const [users, setUsers] = useState([]);
    const [isUserActivationsRequestOnProgress, setIsUserActivationsRequestOnProgress] = useState(false);
    const [isUsersRequestOnProgress, setIsUsersRequestOnProgress] = useState(false);

    useEffect(() => {
        setIsUserActivationsRequestOnProgress(true);
        axios.get('https://api-qg-prime.azurewebsites.net/api/api-fetch-all-activations').then(response => {
            setUserActivations(response.data);
            setIsUserActivationsRequestOnProgress(false);
        }).finally(() => setIsUserActivationsRequestOnProgress(false))

        setIsUsersRequestOnProgress(true);
        axios.get('https://api-qg-prime.azurewebsites.net/api/api-fetch-all-users').then(response => {
            setUsers(response.data)
            setIsUsersRequestOnProgress(false);
        }).finally(() => setIsUsersRequestOnProgress(false));
    }, [])

    const mappedResults = useMemo(() => countOccurrences(userActivations, 'activationStandId'), [userActivations]);


    return (
        <>
            <Helmet>
                <title> Khipo Dashboard </title>
            </Helmet>

            <Container maxWidth="xl">
                <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{mb: 5}}>
                    <Typography variant="h4" >
                        Olá, Bem-vindo !
                    </Typography>

                    {isUserActivationsRequestOnProgress && (
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <CircularProgress/>
                        </Box>
                    )}
                </Stack>


                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummary title="Usuários" total={users.length} icon={'ant-design:user-outlined'}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummary title="Usuários que fizeram check-in"
                                          total={users.filter(u => u.userActivations.length > 0).length} color="info"
                                          icon={'ant-design:check-circle-filled'}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummary title="Usuários que não fizeram check-in"
                                          total={users.filter(u => u.userActivations.length === 0).length}
                                          color="warning"
                                          icon={'ant-design:fall-outlined'}/>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentVisits
                            title="Visitas as atrações"
                            chartData={mappedResults.map(res => {
                                return {
                                    label: res.activationStandId === 3 ? "Claw Machine" : res.activationStandId === 2 ? "Tabuleiro" : "Photo Freeze",
                                    value: res.occurrence
                                }
                            })}
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
                            chartData={mappedResults.map(res => {
                                return {
                                    label: res.activationStandId === 3 ? "Claw Machine" : res.activationStandId === 2 ? "Tabuleiro" : "Photo Freeze",
                                    value: res.occurrence
                                }
                            })}
                        />
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                        <AppNewsUpdate
                            title="Updates"
                            list={userActivations.slice(1).slice(-5).map((u, index) => ({
                                id: u.id,
                                title: `${u.user.name} ${u.user.lastname}`,
                                description: `Fez check-in na atração ${u.activationStand.name}`,
                                image: `/assets/images/avatars/avatar_${index + 3}.jpg`,
                                postedAt: u.createdAt,
                            }))}
                        />
                    </Grid>


                </Grid>
            </Container>
        </>
    );
}
