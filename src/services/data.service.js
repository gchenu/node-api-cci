const sql = require('../db');

const readCountryData = async(country, year, limit) => {

    let query;
    let search = [];
    let table = (year === '*') ? year : 'year'+year;

    // query builder
    if(!country) {
        query = `SELECT CountryName,?? FROM dataco2 ORDER BY ?? DESC`;
        search.push(table, table);
    } else {

        if(year === '*') {

            query = `SELECT * FROM dataco2 WHERE `;
            
            for(let i = 0; i < country.length; i++ ) {
                if( i === 0 ) {
                    query = query + `CountryName=? `;
                    search.push(country[i]);
                } else {
                    query = query + `OR CountryName=? `;
                    search.push(country[i]);
                }
            }
            
            search.push(country);
        } else {
            query = `SELECT ?? FROM dataco2 WHERE CountryName=?`;
            search.push(table, country);
        }
    }

    if(limit) {
        query = query + ` LIMIT ?`;
        search.push(+limit);
    }

    const response = await sql.promise().query(query, search);
    return response[0];

}

module.exports = {
    readCountryData
}