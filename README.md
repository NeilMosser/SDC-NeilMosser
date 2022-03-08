# SDC-NeilMosser

The purpose of this project was to replace a system of API calls to get hardcoded data with a dynamic PostgreSQL database. Team Mewtwo was hired by the original website owners to do a complete overhaul of the database management system over a two-week time frame.

## Getting Started

## Prerequisites

Requirements for the software and other tools to build, test and push

- [node](https://nodejs.org/en/)
- [npm](https://docs.npmjs.com/cli/v7/configuring-npm/install)

### Installing
First install node/npm by following the links in the Prerequisites section above

To make sure you have the same version of node installed (v14.18.0) that was used in this project, run the following command

`node -v`
Next, install all the dependencies included in package.json by running the following command

`npm install`
Next, run the folliwing command to run webpack and transpile the .jsx code

`psql postgres`
Run the postgres database using this command

`psql -U username -d qadb -a -f myInsertFile`
Create the database by running the schema.sql file in the command line.  Replace the username (default is postgres). The file with the data is too large to upload to github, so reach out if you would like to populate the db!

## Deployment
Add additional notes to deploy this on a live system

## Authors | Section | github handle
**Neil Mosser** | Created Questions and Answers database | NeilMosser

**Sterling Mueller** | Created Reviews database | sterlingmuller

**Brett Mogen** | Created the Overview database | BrettMogen

## Acknowledgments
Team Mewtwo!
Hack Reactor
DEN16
