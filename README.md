# RIVM Stookalert

Adds RIVM stookalert (fireplace/wood stove advisory) notifications to Homey.

## What is Stookalert?

The RIVM (Dutch National Institute for Public Health and the Environment) issues stookalerts when weather conditions are unfavorable for burning wood or other solid fuels. During a stookalert, residents are asked not to use their fireplace, wood stove, or outdoor fire pit to help maintain good air quality.

## Features

- Monitors the RIVM stookalert status for all 12 Dutch provinces
- Updates every 15 minutes
- Triggers a generic alarm capability when a stookalert is active
- Can be used in Homey Flows to automate notifications or other actions

## Supported Provinces

- Groningen
- Friesland
- Drenthe
- Overijssel
- Flevoland
- Gelderland
- Utrecht
- Noord-Holland
- Zuid-Holland
- Zeeland
- Noord-Brabant
- Limburg

## Usage

1. Add the app to your Homey
2. Add a new device and select your province
3. Use the device in Flows to trigger actions when a stookalert is active

## Data Source

Data is provided by [RIVM](https://www.rivm.nl/stookalert).
