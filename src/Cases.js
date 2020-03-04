import React from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';

class Cases extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeCases: '',
            suspectedCases: '',
            confirmedCases: '',
            deaths: '',
            recovered: '',
            worldPop: 7770000000
        };
    }

    // Load covid data upon page load
    componentDidMount() {
        const configBearer = {
            headers: {
                Authorization: 'Basic Tl9JWUJjTlAwMUZZMElXYk04cnZ3TFNROHNrYTo0MVdYbGVXenJlZmY1YU1EbjBYZENHS0NDR1lh'
            }
        };

        // Get Bearer Token
        axios.post('https://apigw.nubentos.com:443/token?grant_type=client_credentials',
            configBearer)
            .then(response => console.log(response));

        // const config = {
        //     headers: { Authorization: 'Bearer b5ff055a-5763-34ad-8f0c-ab1c273b2952' }
        // };

        // // Get Active Cases
        // axios.get('https://apigw.nubentos.com:443/t/nubentos.com/ncovapi/1.0.0/cases',
        //     config)
        //     .then(response => this.setState({ activeCases: response.data[0].cases }));

        // // Get Suspected Cases
        // axios.get('https://apigw.nubentos.com:443/t/nubentos.com/ncovapi/1.0.0/cases/suspected',
        //     config)
        //     .then(response => this.setState({ suspectedCases: response.data[0].data }));

        // // Get Confirmed Cases
        // axios.get('https://apigw.nubentos.com:443/t/nubentos.com/ncovapi/1.0.0/cases/confirmed',
        //     config)
        //     .then(response => this.setState({ confirmedCases: response.data[0].data }));

        // // Get Deaths
        // axios.get('https://apigw.nubentos.com:443/t/nubentos.com/ncovapi/1.0.0/deaths',
        //     config)
        //     .then(response => this.setState({ deaths: response.data[0].data }));

        // // Get Deaths
        // axios.get('https://apigw.nubentos.com:443/t/nubentos.com/ncovapi/1.0.0/recovered',
        //     config)
        //     .then(response => this.setState({ recovered: response.data[0].data }));
    }

    getDeathRate() {
        return (this.state.deaths * 100 / this.state.worldPop).toFixed(5);
    }

    getMortalityRate() {
        return (this.state.deaths * 100 / this.state.confirmedCases).toFixed(5);
    }

    getPopulationInfected() {
        return (this.state.confirmedCases * 100 / this.state.worldPop).toFixed(5);
    }

    getRecoveryRate() {
        return (this.state.recovered * 100 / this.state.confirmedCases).toFixed(5);
    }

    render() {
        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Cases
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            Active Cases: {this.state.activeCases}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            Suspected Cases: {this.state.suspectedCases}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            Confirmed Cases: {this.state.confirmedCases}
                        </Typography>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Deaths VS Recovered
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            Deaths: {this.state.deaths}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            Recovered: {this.state.recovered}
                        </Typography>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Percentage Statistics
                        </Typography>
                        <Tooltip title='Deaths / World Population'>
                            <Typography variant="body1" color="textSecondary" component="p">
                                Approx. Death Rate: {this.getDeathRate()}%
                            </Typography>
                        </Tooltip>
                        <Tooltip title='Deaths / Confirmed Cases'>
                            <Typography variant="body1" color="textSecondary" component="p">
                                Approx. Mortality Rate: {this.getMortalityRate()}%
                            </Typography>
                        </Tooltip>
                        <Tooltip title='Confirmed Cases / World Population'>
                            <Typography variant="body1" color="textSecondary" component="p">
                                Global Population Infected: {this.getPopulationInfected()}%
                            </Typography>
                        </Tooltip>
                        <Tooltip title='Recovered / Confirmed Cases'>
                            <Typography variant="body1" color="textSecondary" component="p">
                                Recovery Rate: {this.getRecoveryRate()}%
                            </Typography>
                        </Tooltip>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default Cases;