const express = require("express");
const router = express.Router();

// query
// STRING
// Phone
// REQUIRED
// Search query. Supports both free-form text queries or a product asin.

// Optional Parameters
// page
// STRING
// 1
// OPTIONAL
// Results page to return.

// Default: 1

// country
// STRING
// US
// OPTIONAL
// Sets the marketplace country, language and currency.

// Default: US

// Allowed values: US, AU, BR, CA, CN, FR, DE, IN, IT, MX, NL, SG, ES, TR, AE, GB, JP

// sort_by
// ENUM
// OPTIONAL
// Return the results in a specific sort order.

// Default: RELEVANCE

// Allowed values: RELEVANCE, LOWEST_PRICE, HIGHEST_PRICE, REVIEWS, NEWEST

// category_id
// STRING
// aps
// OPTIONAL
// Find products in a specific category / department. Use the Product Category List endpoint to get a list of valid categories and their ids for the country specified in the request.

// Default: aps (All Departments)

// min_price
// NUMBER
// OPTIONAL
// Only return product offers with price greater than a certain value. Specified in the currency of the selected country. For example, in case country=US, a value of 105.34 means $105.34.

// max_price
// NUMBER
// OPTIONAL
// Only return product offers with price lower than a certain value. Specified in the currency of the selected country. For example, in case country=US, a value of 105.34 means $105.34.

// brand
// STRING
// OPTIONAL
// Find products with a specific brand. Multiple brands can be specified as a comma (,) separated list. The brand values can be seen from Amazon's search left filters panel, as seen here.

// e.g. SAMSUNG
// e.g. Google,Apple

// const amazonOffersUrl =
//   "https://real-time-amazon-data.p.rapidapi.com/product-offers?asin=B07ZPKBL9V&country=US&limit=100";

// try {
//   const response = await fetch(amazonOffersUrl, {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "560011da9bmsh83c028acaee1b02p1ed28djsn902b2020edfc",
//       "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
//     },
//   });
//   const result = await response.json();
//   console.log(result);
// } catch (error) {
//   console.error(error);
// }

// asin = required
// STRING
// B07ZPKBL9V
// REQUIRED
// Product ASIN for which to get offers. Supports batching of up to 10 ASINs in a single request, separated by comma (e.g. B08PPDJWC8,B07ZPKBL9V, B08BHXG144).

// Note that each ASIN in a batch request is counted as a single request against the plan quota.country
// STRING
// US
// OPTIONAL
// Sets the marketplace country, language and currency.

// Default: US

// Allowed values: US, AU, BR, CA, CN, FR, DE, IN, IT, MX, NL, SG, ES, TR, AE, GB, JP

// product_condition
// STRING
// OPTIONAL
// Find products in specific conditions, specified as a comma delimited list of the following values: NEW, USED_LIKE_NEW, USED_VERY_GOOD, USED_GOOD, USED_ACCEPTABLE.

// e.g. NEW,USED_LIKE_NEW
// e.g. USED_VERY_GOOD,USED_GOOD,USED_LIKE_NEW

// delivery
// STRING
// OPTIONAL
// [EXPERIMENTAL]
// Find products with specific delivery option, specified as a comma delimited list of the following values: PRIME_ELIGIBLE,FREE_DELIVERY.

// e.g. FREE_DELIVERY
// e.g. PRIME_ELIGIBLE,FREE_DELIVERY

// limit
// NUMBER
// 100
// OPTIONAL
// Maximum number of offers to return.

// Default: 100

// const fetch ('https://asos10.p.rapidapi.com/api/v1/getCountries')
// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': '560011da9bmsh83c028acaee1b02p1ed28djsn902b2020edfc',
//     'X-RapidAPI-Host': 'asos10.p.rapidapi.com'
//   }
// };

// try {
//   const response = await fetch(url, options);
//   const result = await response.text();
//   console.log(result);
// } catch (error) {
//   console.error(error);
// }

// const fetch = require("node-fetch");

// const amazonProdCatUrl =
//   "https://real-time-amazon-data.p.rapidapi.com/product-category-list?country=US";

// try {
//   const response = await fetch(amazonProdCatUrl, options);
//   const result = await response.text();
//   console.log(result);
// } catch (error) {
//   console.error(error);
// }
