# JHA Manager

An app to manage JHAs

## Installation

Configuring MySQL:

```bash
create a database with your desired name
```
```bash
enter the db info into './config/db.config.js'
```
```bash
run this MySQL query to create the jhas table: 
  'CREATE TABLE IF NOT EXISTS `jhas` (
    id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    site varchar(255) NOT NULL,
    dept varchar(255) NOT NULL,
    ap varchar(255) NOT NULL,
    br varchar(255) NOT NULL,
    job varchar(255) NOT NULL,
    supervisor varchar(255) NOT NULL,
    prepared varchar(255) NOT NULL,
    date varchar(255) NOT NULL,
    steps text NOT NULL,
    training text NOT NULL,
    ppe text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;'
```

Install dependencies:

```bash
$ npm run install
```

Start the server:

```bash
$ npm run server
```

Start the client:

```bash
$ npm run client
```

# API

## Create a JHA

### Request

`POST /`

    curl -X POST localhost:5000/api/jhas -H 'Content-Type: application/json' \
    -d'{"site":"asfsafsaf","dept":"dsfsfds","ap":"sdfsdfdsf","br":"sdfdsfdsf","job":"sdfdsfdsf","supervisor":"sdfsfdghdghg","prepared":"dfgfdgfdgfd","date":"fdhgdfgdfgfdg","steps":"[{\"s\":\"add task/step\",\"h\":[\"add a hazard and consequence\"],\"c\":[\"add a control\"]}]","training":"[\"add required training\"]","ppe":"[\"add required PPE\"]"}'

### Response

    {"id":7,"site":"asfsafsaf","dept":"dsfsfds","ap":"sdfsdfdsf","br":"sdfdsfdsf","job":"sdfdsfdsf","supervisor":"sdfsfdghdghg","prepared":"dfgfdgfdgfd","date":"fdhgdfgdfgfdg","steps":"[{\"s\":\"add task/step\",\"h\":[\"add a hazard and consequence\"],\"c\":[\"add a control\"]}]","training":"[\"add required training\"]","ppe":"[\"add required PPE\"]"}

## Get all JHAs

### Request

`GET /`

    curl localhost:5000/api/jhas

### Response

    [{"id":4,"site":"asfsafsaf","dept":"dsfsfds","ap":"sdfsdfdsf","br":"sdfdsfdsf","job":"sdfdsfdsf","supervisor":"sdfsfdghdghg","prepared":"dfgfdgfdgfd","date":"fdhgdfgdfgfdg","steps":"[{\"s\":\"add task/step\",\"h\":[\"add a hazard and consequence\"],\"c\":[\"add a control\"]}]","training":"[\"add required training\"]","ppe":"[\"add required PPE\"]"},{"id":7,"site":"asfsafsaf","dept":"dsfsfds","ap":"sdfsdfdsf","br":"sdfdsfdsf","job":"sdfdsfdsf","supervisor":"sdfsfdghdghg","prepared":"dfgfdgfdgfd","date":"fdhgdfgdfgfdg","steps":"[{\"s\":\"add task/step\",\"h\":[\"add a hazard and consequence\"],\"c\":[\"add a control\"]}]","training":"[\"add required training\"]","ppe":"[\"add required PPE\"]"},{"id":8,"site":"asfsafsaf","dept":"dsfsfds","ap":"sdfsdfdsf","br":"sdfdsfdsf","job":"sdfdsfdsf","supervisor":"sdfsfdghdghg","prepared":"dfgfdgfdgfd","date":"fdhgdfgdfgfdg","steps":"[{\"s\":\"add task/step\",\"h\":[\"add a hazard and consequence\"],\"c\":[\"add a control\"]}]","training":"[\"add required training\"]","ppe":"[\"add required PPE\"]"}]

## Get one JHA

### Request

`GET /:id`

    curl localhost:5000/api/jhas/4

### Response

    {"id":4,"site":"asfsafsaf","dept":"dsfsfds","ap":"sdfsdfdsf","br":"sdfdsfdsf","job":"sdfdsfdsf","supervisor":"sdfsfdghdghg","prepared":"dfgfdgfdgfd","date":"fdhgdfgdfgfdg","steps":"[{\"s\":\"add task/step\",\"h\":[\"add a hazard and consequence\"],\"c\":[\"add a control\"]}]","training":"[\"add required training\"]","ppe":"[\"add required PPE\"]"}

## Update a JHA

### Request

`PUT /:id`

    curl -X PUT localhost:5000/api/jhas/4 -H 'Content-Type: application/json' \
    -d'{"site":"asfsafsaf","dept":"dsfsfds","ap":"sdfsdfdsf","br":"sdfdsfdsf","job":"sdfdsfdsf","supervisor":"sdfsfdghdghg","prepared":"dfgfdgfdgfd","date":"fdhgdfgdfgfdg","steps":"[{\"s\":\"add task/step\",\"h\":[\"add a hazard and consequence\"],\"c\":[\"add a control\"]}]","training":"[\"add required training\"]","ppe":"[\"add required PPE\"]"}'

### Response

    {"id":"4","site":"asfsafsaf","dept":"dsfsfds","ap":"sdfsdfdsf","br":"sdfdsfdsf","job":"sdfdsfdsf","supervisor":"sdfsfdghdghg","prepared":"dfgfdgfdgfd","date":"fdhgdfgdfgfdg","steps":"[{\"s\":\"add task/step\",\"h\":[\"add a hazard and consequence\"],\"c\":[\"add a control\"]}]","training":"[\"add required training\"]","ppe":"[\"add required PPE\"]"}

## Delete a JHA

### Request

`DELETE /:id`

    curl -X DELETE localhost:5000/api/jhas/4

### Response

    {"message":"Jha was deleted successfully!"}

    
