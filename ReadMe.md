# Requirements
- [node.js](https://nodejs.org/en/download/)
- npm

# How to run script
- First need to install required module i.e.`csv` to parse csv file which can be done by entering following command.
```sh
npm i 
```
- The input csv (`input.csv`) file should be in the root folder.
- Enter following command to process csv file:
```sh
npm start
```
- If all goes well the program will process the csv and create new files  `0_input.csv` and  `1_input.csv` in root folder, else it will print error message.

# Troubleshooting
- If program printing error message please do following:
1. Make sure that `node.js` is installed in system.
2. Check whether `csv` module is installed properly as per the instructions.
3. Make sure that input file is present in root folder.
4. Check whether the input file name in command and input file name in root folder are same.
5. Ensure that command is written properly with proper spelling for input file.

# How to execute test cases
- First need to install required module i.e.`chai` and `mocha` which can be done by entering following command.
```sh
npm i 
```
- The input csv (`input.csv`) file should be in the root folder.
- Enter following command to execute test cases:
```sh
npm test
```
- If all goes well it'll show 4 passing test cases, else it will print error message.
