const dataService = require('../services/data.service');
const { readCountryData } = dataService;

const getCountryData = async(req, res) => {

    try {

        const {country, year, graph, limit } = req.query;

        if(country || year) {

            const countryList = country ? country.split(',') : country;

            let years = year ? year : '*';
            const response = await readCountryData(countryList, years, limit);

            let data = response;

/*             if(!year && graph) {
                delete response[0].CountryName;
                delete response[0].CountryCode;
                delete response[0].IndicatorName;
                delete response[0].IndicatorCode;
                data = Object.values(response[0]);
            } */

            if(country && !year) {
                data = [];
                response.forEach( element => {
                    let name = element.CountryName;
                    delete element.CountryName;
                    delete element.CountryCode;
                    delete element.IndicatorName;
                    delete element.IndicatorCode;
                    data.push({
                        CountryName: name,
                        data: Object.values(element)
                    });
                })
            }

    
            if(year && !country) {
                data = [];
                response.forEach(element => {

                   data.push({
                       CountryName: element.CountryName,
                       data: element[`year${year}`]
                   })

                });
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