<img src="pictures/icon.svg" align="right" />

## Azure SAS token generator [ UNDER CONSTRUCTION ] 
> A simple JavaScript Azure SAS token generator

The current project is about how to programmatically generate a Shared Access Signature (SAS) token to use with Postman in order to post messages to Azure Service Bus Topic/Queue.

## Motivation
After googling for a while in order to generate the necessary token, to post messages to Azure service bus, i noticed that there is no clear explanations, how to ahieve it in JavaScript!!
I'm proud to offer you a simple JS way to generate Azure SAS token - using node - or angular.

## How to use?
[angular version]: you can use the online version, or to checkout the repository and run it locally on your computer.
[node version]: only by adding the dependency to your code, see example section.

```sh
npm run start
```

## Features
It contains two folders:
 - nodeJS: a simple node application to generate a token using your IDE
 - angular: an angular form allowing to generate a token based on the parameters filled in.

 If you prefer a simplier way to get fastly a token, you could use my angular application azure-sas-token from here:
 https://ah584d.github.io/azure-sas-token/

 This is the same application of the 'angular' folder.

 Don't forget to let me a Start :-)


## Installation
For node
```sh
npm install utf8
```

For angular
```sh
cd azure-sas-token/angular
npm install -d
npm run start
```

## Screenshots
The application is totally safe, nothing is saved on third party, no request is sent outside, everything is handled in JS browser side
![Azure SAS token generator](https://github.com/ah584d/azure-sas-token/blob/master/pictures/sas.jpg)

For those who still hesitate, you can checkout the code and run it locally on your computer


## Example [under construction]

In order to post message to Azure topic/queue, you have 
to send a request as following.

```javascript
// code away!

```


## Tests [under construction]
Describe and show how to run the tests with code examples.

## Build status [under consyruction]
Build status of continus integration i.e. travis, appveyor etc. Ex. - 

## Code style
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
 

## Contribute
Feel free to open PR.

## Credits
The only related topic that I founded on Microsoft Azure help

https://docs.microsoft.com/en-us/rest/api/eventhub/generate-sas-token

Icon from: http://www.kameleon.pics

## License
MIT © [Avraham Hamu]()
