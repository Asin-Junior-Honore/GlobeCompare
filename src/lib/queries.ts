import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries @rest(type: "Country", path: "all") {
      name @type(name: "CountryName") {
        common
      }
      flags @type(name: "Flag") {
        png
      }
      capital
      region
      population
      area
      gdp
    }
  }
`;


export const GET_COUNTRY_BY_NAME = gql`
  query GetCountryByName($name: String!) {
    country(name: $name) 
      @rest(type: "Country", path: "name/{args.name}?fullText=true") {
      
      name @type(name: "CountryName") {
        common
        official
      }
      flags @type(name: "Flag") {
        png
      }
      population
      capital
      region
      subregion
      languages
      currencies
      timezones
      continents
      tld
      cca2
      cca3
      idd @type(name: "IDD") {
        root
        suffixes
      }
      maps @type(name: "Maps") {
        googleMaps
        openStreetMaps
      }
      demonyms @type(name: "Demonyms") {
        eng @type(name: "EnglishDemonyms") {
          m
          f
        }
      }
      area
      startOfWeek
      coatOfArms @type(name: "CoatOfArms") {
        png
      }
      postalCode @type(name: "PostalCode") {
        format
      }
      fifa
      car @type(name: "CarInfo") {
        side
      }
    }
  }
`;
