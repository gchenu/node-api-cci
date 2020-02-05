const dataService = require('../services/data.service');
const { readCountryData } = dataService;

const getCountryData = async(req, res) => {

    let search = [];

    try {
        const {country, year } = req.query;
        if(country | year) {
            
            let years = year ? year : '*';
            const response = await readCountryData(country, years);

            res.status(200).json({
                status: 200,
                error: null,
                total: response.length,
                message: response
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