const sql = require('../db');

const readCountryData = async(country, year) => {

    let query;

    if(!country && year) {
        let table = (year === '*') ? year : 'year'+year;
        query = `SELECT CountryName, ${table}  FROM dataco2`;
    }
    
    if(country && !year) {
        query = query + ` WHERE CountryName='${country}'`;
    }

    console.log(query);

    const response = await sql.promise().query(query);
    return response[0];
}

module.exports = {
    readCountryData
}