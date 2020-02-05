const dataService = require('../services/data.service');
const { readCountryData } = dataService;

const getCountryData = async(req, res) => {

    try {

        const {country, year, graph } = req.query;

        if(country || year) {
            console.log(country);
            let years = year ? year : '*';
            const response = await readCountryData(country, years);

            let data = response;

            if(!year && graph) {
                delete response[0].CountryName;
                delete response[0].CountryCode;
                delete response[0].IndicatorName;
                delete response[0].IndicatorCode;
                data = Object.values(response[0]);
            }

            res.status(200).json({
                status: 200,
                error: null,
                total: response.length,
                message: data
            });

        } else {
            res.status(400).send({
                status: 400,
                error: 'Missing parameters',
                total: 0,
                message: response
            });
        }

    } catch (error) {
        res.status(500).send({
            status: 500,
            error: JSON.stringify(error.message),
            total: 0,
            message: []
        });
    }

}

module.exports = {
    getCountryData
}