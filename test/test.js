const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const { init, parseFile } = require('../index.js');
const inputFile = 'input.csv';
const outputFile0Location = './0_input.csv';
const outputFile1Location = './1_input.csv';

describe('check input', () => {
    it('check script without passing file name', () => {
        return new Promise(async function (resolve, reject){
            try{
                let output = await init();
                expect(output).to.equal(false);
                resolve();
            }catch(error){
                console.log('error >> ', error);
                resolve();
            }
        })
    });
    it('check script with passing file name', () => {
        return new Promise(async function (resolve, reject){
            try{
                let output = await init(inputFile);
                expect(output).to.equal(true);
                resolve();
            }catch(error){
                console.log('error >> ', error);
                reject();
            }
        })
    });
});

describe('check output', () => {
    it('check init function', () => {
        return new Promise(async function (resolve, reject){
            try{
                let output = await init(inputFile);
                expect(output).to.equal(true);
                expect(fs.existsSync(outputFile0Location)).to.equal(true);
                expect(fs.existsSync(outputFile1Location)).to.equal(true);
                resolve();
            }catch(error){
                console.log('error >> ', error);
                reject();
            }
        })
    });
    it('check parseFile function', () => {
        return new Promise(async function (resolve, reject){
            try{
                let output = await parseFile(inputFile);
                expect(output).to.be.an('array');
                expect(output.length).to.be.greaterThan(0);
                resolve();
            }catch(error){
                console.log('error >> ', error);
                reject();
            }
        })
    });
});
