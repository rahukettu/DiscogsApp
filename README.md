# Music Search App with Discogs API, Expo and React Native
A React Native Expo App with Discogs API


## Overview

The Music Artist Search App allows users to search for artists using the Discogs API without requiring OAuth authentication. Users can input the artist's name, view search results, and select an artist to see detailed information, including their profile and aliases.

Additionally, the app provides functionality for searching releases that requires OAuth authentication.

This project is built with React Native and utilizes functional components along with hooks for state management.

## Features

- **Artist Search**: Search for artists by name without needing OAuth.
- **Release Search**: Search for music releases (requires OAuth authentication).
- **Artist Information**: View detailed information about selected artists.
- **User-Friendly Interface**: Simple and intuitive design for easy navigation.
- **Dynamic Search Results**: Quickly find artists and releases.

## Technologies Used

- React Native
- Expo
- Discogs API
- JavaScript
- Node.js for authentication, or temporary auth with React (Node recommended for safety)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (install globally using `npm install -g expo-cli`)
- [Git](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/rahukettu/DiscogsApp.git
cd DiscogsApp
```
Install Dependencies

```bash

npm install
```
Environment Variables

You will need to create a .env file in the root of the project directory and add your Discogs API keys:

plaintext

DISCOGS_CONSUMER_KEY=your_consumer_key
DISCOGS_CONSUMER_SECRET=your_consumer_secret
ACCESS_TOKEN=your_access_token
ACCESS_TOKEN_SECRET=your_access_token_secret

Run the App

To start the application, run:

```bash

npx expo start
```
This will open a new browser tab with Expo Dev Tools. You can then run the app on an iOS simulator, Android emulator, or your physical device.

Usage

    Artist Search:
        Enter an artist's name in the search box.
        Click the "Search" button.
        Select an artist from the list to view detailed information.
        Use the "New Search" button to go back to the search screen.

    Release Search (OAuth required):
        To access the release search feature, follow the OAuth authentication flow.
        Use the provided OAuth keys to authenticate with the Discogs API and retrieve music releases.

License

This project is licensed under the GNU General Public License v3.0. See the LICENSE file for more details.

Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

Contact

For any inquiries, please[ reach out to rahukettu@gmx.com.
API info in Discogs: (https://www.discogs.com/developers)
