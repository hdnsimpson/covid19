import React from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import './Cases.css';

class Cases extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: '',
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
        console.log(process.env.REACT_APP_TOKEN);

        // Get Access token on page load
        fetch("https://cors-anywhere.herokuapp.com/https://apigw.nubentos.com:443/token?grant_type=client_credentials", {
            "method": "POST",
            "headers": {
                "authorization": "Basic SEsxVjRfY0tlOGVVeUlUcHlEdnhuU01TRGljYTpKYjQwc0dNcXhmU2NDdEVDemg3djdmV0ttZjBh"
            }
        })
            .then(response => response.json())
            .then(json => this.setState({ token: json.access_token }))
            .then(() => this.makeApiCalls())
            .catch(err => {
                console.log(err);
            });
    }

    makeApiCalls() {
        const auth = 'Bearer ' + this.state.token;
        const config = {
            headers: { Authorization: auth }
        };

        // Get Active Cases
        axios.get('https://apigw.nubentos.com:443/t/nubentos.com/ncovapi/1.0.0/cases',
            config)
            .then(response => this.setState({ activeCases: response.data[0].cases }));

        // Get Suspected Cases
        axios.get('https://apigw.nubentos.com:443/t/nubentos.com/ncovapi/1.0.0/cases/suspected',
            config)
            .then(response => this.setState({ suspectedCases: response.data[0].data }));

        // Get Confirmed Cases
        axios.get('https://apigw.nubentos.com:443/t/nubentos.com/ncovapi/1.0.0/cases/confirmed',
            config)
            .then(response => this.setState({ confirmedCases: response.data[0].data }));

        // Get Deaths
        axios.get('https://apigw.nubentos.com:443/t/nubentos.com/ncovapi/1.0.0/deaths',
            config)
            .then(response => this.setState({ deaths: response.data[0].data }));

        // Get Recovered
        axios.get('https://apigw.nubentos.com:443/t/nubentos.com/ncovapi/1.0.0/recovered',
            config)
            .then(response => this.setState({ recovered: response.data[0].data }));
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
                <Card className='card'>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" className="heading">
                            Cases
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="div">
                            <div className='cont'>
                                <p className='left'>Active Cases: </p>
                                <p className='right'>{this.state.activeCases}</p>
                            </div>
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="div">
                            <div className='cont'>
                                <p className='left'>Suspected Cases: </p>
                                <p className='right'>{this.state.suspectedCases}</p>
                            </div>
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="div">
                            <div className='cont'>
                                <p className='left'>Confirmed Cases: </p>
                                <p className='right'>{this.state.confirmedCases}</p>
                            </div>
                        </Typography>
                    </CardContent>
                </Card>

                <Card className='card'>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" className="heading">
                            Deaths VS Recovered
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="div">
                            <div className='cont'>
                                <p className='left deaths'>Deaths: </p>
                                <p className='right'>{this.state.deaths}</p>
                            </div>
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="div">
                            <div className='cont'>
                                <p className='left recovered'>Recovered: </p>
                                <p className='right'>{this.state.recovered}</p>
                            </div>
                        </Typography>
                    </CardContent>
                </Card>

                <Card className='card'>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" className="heading">
                            Percentage Statistics
                        </Typography>
                        <Tooltip title='Deaths / World Population'>
                            <Typography variant="body1" color="textSecondary" component="div">
                                <div className='cont'>
                                    <p className='left'>Approx. Death Rate: </p>
                                    <p className='right'>{this.getDeathRate()}%</p>
                                </div>
                            </Typography>
                        </Tooltip>
                        <Tooltip title='Deaths / Confirmed Cases'>
                            <Typography variant="body1" color="textSecondary" component="div">
                                <div className='cont'>
                                    <p className='left'>Approx. Mortality Rate: </p>
                                    <p className='right'>{this.getMortalityRate()}%</p>
                                </div>
                            </Typography>
                        </Tooltip>
                        <Tooltip title='Confirmed Cases / World Population'>
                            <Typography variant="body1" color="textSecondary" component="div">
                                <div className='cont'>
                                    <p className='left'>Global Population Infected: </p>
                                    <p className='right'>{this.getPopulationInfected()}%</p>
                                </div>
                            </Typography>
                        </Tooltip>
                        <Tooltip title='Recovered / Confirmed Cases'>
                            <Typography variant="body1" color="textSecondary" component="div">
                                <div className='cont'>
                                    <p className='left'>Recovery Rate: </p>
                                    <p className='right'>{this.getRecoveryRate()}%</p>
                                </div>
                            </Typography>
                        </Tooltip>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default Cases;
