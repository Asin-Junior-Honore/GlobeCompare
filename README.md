# GlobeCompare – Explore & Compare Countries

GlobeCompare is a web application that allows users to explore and compare country details, including population, currencies, languages, time zones, and more. The app fetches real-time country data from an external API and presents it in an easy-to-read format.

## Features

- Search for any country by name  
- View essential country details like capital, population, region, and subregion  
- Display currency information with symbols  
- See the national flag and coat of arms  
- Get direct links to **Google Maps** and **OpenStreetMap**  
- Compare multiple countries side by side  

## Technologies Used

- **React** (Frontend framework)  
- **GraphQL + Apollo Client** (Data fetching)  
- **Tailwind CSS** (Styling)  
- **Rest Countries API** (Data source)  

## Deployment

GlobeCompare is deployed on **Netlify** for seamless access and performance.

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/globecompare.git
   ```
2. Navigate to the project directory:
   ```sh
   cd globecompare
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## GraphQL Query (Fetching Country Data)

The app uses the following **GraphQL query** to fetch country details:

```graphql

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
```

## UI Preview
![GlobeCompare](https://github.com/user-attachments/assets/235a1824-9ee6-41ff-82e4-b3f2f21d5634)


## Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

1. Fork the project
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Added feature XYZ"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request
