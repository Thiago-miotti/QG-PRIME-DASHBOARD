import {Helmet} from 'react-helmet-async';
import {faker} from '@faker-js/faker';
// @mui
import {useTheme} from '@mui/material/styles';
import {
    Grid,
    Container,
    Typography,
    Stack,
    CircularProgress,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
// components
import {useEffect, useMemo, useState} from 'react';
import axios from 'axios';
// sections
// eslint-disable-next-line import/no-unresolved
import AppMostViewShows from 'src/sections/@dashboard/app/AppMostViewShows';
import {AppCurrentVisits, AppWidgetSummary, AppConversionRates, AppNewsUpdate} from '../sections/@dashboard/app';
import {countOccurrences} from '../utils/countOccurrences';

export default function DashboardAppPage() {
    const theme = useTheme();

    const apiUrl = 'https://api-qg-amazon.azurewebsites.net/api';
    // const apiUrl = 'http://localhost:7071/api';

    const [userActivations, setUserActivations] = useState([]);
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [isUserActivationsRequestOnProgress, setIsUserActivationsRequestOnProgress] = useState(false);
    const [isUsersRequestOnProgress, setIsUsersRequestOnProgress] = useState(false);
    const [isUserAnswersRequestOnProgress, setIsUserAnswersRequestOnProgress] = useState(false);
    const [dateFilter, setDateFilter] = useState('all');

    const attractionsNameMapped = {
        1: 'Photo Freeze',
        2: 'Tabuleiro',
        3: 'Claw Machine',
        4: 'Tirolesa'
    }

    useEffect(() => {
        setIsUserActivationsRequestOnProgress(true);
        axios
            .get(`${apiUrl}/api-fetch-all-activations?dateFilter=${dateFilter}`)
            .then((response) => {
                setUserActivations(response.data);
            })
            .finally(() => setIsUserActivationsRequestOnProgress(false));

        setIsUsersRequestOnProgress(true);
        axios
            .get(`${apiUrl}/api-fetch-all-users?dateFilter=${dateFilter}`)
            .then((response) => {
                setUsers(response.data);
                if(dateFilter === 'all') setAllUsers(response.data);
            })
            .finally(() => setIsUsersRequestOnProgress(false));

        setIsUsersRequestOnProgress(true);
        axios
            .get(`${apiUrl}/api-fetch-all-user-answers?dateFilter=${dateFilter}`)
            .then((response) => {
                setUserAnswers(response.data);
            })
            .finally(() => setIsUserAnswersRequestOnProgress(false));
    }, [dateFilter]);

    const mappedResults = useMemo(() => countOccurrences(userActivations, 'activationStandId'), [userActivations]);

    const answersToMostWatchedShowsMappedToChard = useMemo(() => {

        const filteredAnswer = userAnswers.filter(ua => ua.answer.question.id === 5);
        const mappedAnswers = filteredAnswer.map(ua => {
            return { id: ua.id, description: ua.answer.description, userId: ua.userId }
        })

        return countOccurrences(mappedAnswers, 'description').map(a => ({x: a.description, y: a.occurrence}))
    }, [userAnswers])

    const usersThatSignPrimeVideo = useMemo(() => {
        const filteredAnswer = userAnswers.filter(ua => ua.answer.question.id === 3);
        const mappedAnswers = filteredAnswer.map(ua => {
            return { id: ua.id, description: ua.answer.description, userId: ua.userId }
        })

        return countOccurrences(mappedAnswers, 'description').map(a => ({label: a.description, value: a.occurrence}))
    }, [userAnswers])

    const uniqueDates = useMemo(() => {
        if(allUsers && allUsers.length){
            return [...new Set(allUsers.map((user) =>{
                    const userCreatedDate = new Date(user.createdAt);

                    return `${userCreatedDate.getDate()}/${userCreatedDate.getMonth() + 1}/${userCreatedDate.getFullYear()}`
                }
            ))]
        }
    }, [allUsers])

    return (
        <>
            <Helmet>
                <title> Khipo Dashboard </title>
            </Helmet>

            <Container maxWidth="xl">
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 2}}>
                    <Typography variant="h4">Olá, Bem-vindo !</Typography>

                    {(isUserActivationsRequestOnProgress || isUsersRequestOnProgress || isUserAnswersRequestOnProgress) && (
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <CircularProgress/>
                        </Box>
                    )}

                    <FormControl sx={{mb: 3, width: '200px'}}>
                        <InputLabel id="demo-simple-select-label">Data</InputLabel>
                        <Select label="Data" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
                            <MenuItem value={'all'}>Todos</MenuItem>
                            {uniqueDates?.map(date => (
                                <MenuItem value={date}>{date}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>



                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummary title="Usuários" total={users.length} icon={'ant-design:user-outlined'}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummary
                            title="Usuários que fizeram check-in"
                            total={users.filter((u) => u.userActivations.length > 0).length}
                            color="info"
                            icon={'ant-design:check-circle-filled'}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummary
                            title="Usuários que não fizeram check-in"
                            total={users.filter((u) => u.userActivations.length === 0).length}
                            color="warning"
                            icon={'ant-design:fall-outlined'}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentVisits
                            title="Assinantes Prime Video"
                            chartData={usersThatSignPrimeVideo}
                            chartColors={[theme.palette.primary.main, theme.palette.error.main]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppConversionRates
                            title="Visitas as atrações"
                            chartData={mappedResults.map((res) => ({
                                label: attractionsNameMapped[res.activationStandId],
                                value: res.occurrence,
                            }))}
                        />
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                        <AppMostViewShows title='Séries mais assistidas'
                                          chartData={[{
                                              data: answersToMostWatchedShowsMappedToChard
                                          }]}
                        />
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                        <AppNewsUpdate
                            title="Updates"
                            list={userActivations.slice(1).slice(-5).map((u, index) => ({
                                id: u.id,
                                description: `Novo check-in na atração ${u.activationStand.name}`,
                                image: `/assets/images/avatars/avatar_${index + 3}.jpg`,
                                postedAt: u.createdAt,
                            })).reverse()}
                        />
                    </Grid>

                </Grid>
            </Container>
        </>
    );
}
