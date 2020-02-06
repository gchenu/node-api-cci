const sql = require('../db');

const readCountryData = async(country, year) => {

    let query;
    let search = [];
    let table = (year === '*') ? year : 'year'+year;

    // query builder
    if(!country) {
        query = `SELECT CountryName,?? FROM dataco2 ORDER BY ?? DESC`;
        search.push(table, table);
    } else {

        if(year === '*') {
            query = `SELECT * FROM dataco2 WHERE CountryName=?`;
            search.push(country)
        } else {
            query = `SELECT ?? FROM dataco2 WHERE CountryName=?`;
            search.push(table, country);
        }
    }

    const response = await sql.promise().query(query, search);
    return response[0];

}

module.exports = {
    readCountryData
}