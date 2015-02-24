var express = require('express');
var router = express.Router();

var neo4j = require('neo4j');
var graph = new neo4j.GraphDatabase("http://familytree:8sJbZ3fktKLXbK5RKQrd@familytree.sb02.stations.graphenedb.com:24789");
var _und = require("underscore");
var http = require('http');

var marriageRelation = "MARRIED_TO";
var parentRelation = "PARENT_TO";
var childRelation = "CHILD_TO";

var fs = require('fs');








router.get('/', function(req, res) {
    res.sendfile("index.html", {root: './views'});
});

router.get('/advanced*', function(req, res) {
    console.log("/advanced*");
    res.sendfile("advanced.html", {root: './views'});
});

router.get('/getpeople/:name', function(req, res) {
    name = req.param('name');
    console.log("/getperson/" + name); 
    allResults = {
        "people":{},
        "selectedPerson":-1,
        "rootPerson":-1
    };

    waitingForDB = 0;
    waitingForImg = 0;
    isSendingResults = false;



    var queryDb = function(context, query, processResults){
        waitingForDB ++;
	    console.log("querying db...");

        graph.query(query, context, function(error, results){
            if(error){
                console.log(error);
            }else{
                // console.log(results);
                processResults(results);
                waitingForDB --;
                notifyDone();
            }
        });
    }

    var notifyDone = function(){
        if(waitingForDB == 0 && waitingForImg == 0 && !isSendingResults){
            isSendingResults = true;
            sortParents();
            res.jsonp(allResults);    
        }
    }

    function sortParents(){
         _und.each(allResults.people, function(person, key, list){
            person.CHILD_TO = _und.sortBy(person.CHILD_TO, function(parentId){
                var parent = allResults.people[parentId];
                // console.log(parent);
                if(! _und.isUndefined(parent.inlaw) && parent.inlaw){
                    return 1;
                }
                return 0;
            })
        });
    }

    function addPerson(id, personData){
        if(_und.isUndefined(allResults["people"][id])){
            personData = _und.clone(personData); //Sealed, so must be cloned
            personData.id = id;
            personData[marriageRelation] = [];
            personData[parentRelation] = [];
            personData[childRelation] = [];
            setImageSrc(personData);
            allResults["people"][id] = personData;
            if(personData.name === "Clancy"){ //TODO Must change when adding even older people
                allResults.rootPerson = personData.id;
            }
        }
    }

    function setImageSrc(personData){

        var imageSrc = "images/" + personData.name + ".jpg";

        var files = fs.readdirSync("public/images");
        _und.each(files, function(file){
            var re = new RegExp(personData.name + "\....");
            console.log(file);
            if(file.match(re) !== null){
                imageSrc = "images/" + file;
            }
        });
        
        waitingForImg ++;
        fs.exists("public/" + imageSrc, function(exists) {
            if (exists) {
                personData.imageSrc = imageSrc;
                waitingForImg --;
                notifyDone();
            } else {
                imageSrc = "images/" + personData.name + personData.id + ".jpg";
                fs.exists("public/" + imageSrc, function(exists) {
                    if (exists) {
                       personData.imageSrc = imageSrc;
                    } else {
                       personData.imageSrc = "images/avatar.jpg";
                    }
                    waitingForImg --;
                    notifyDone();
                });
            }
        });
    }


    function addRelation(person, relation){
        try{
            allResults["people"][person.id][relation.type].push(relation.end.id);
            if(relation.type === marriageRelation){
                allResults["people"][relation.end.id][marriageRelation].push(person.id);
            }else if(relation.type === parentRelation){
                allResults["people"][relation.end.id][childRelation].push(person.id);
            }
        }catch(err){
            console.log("ERROR:  ");
            console.log("_---------------------------------__");
            console.log(err);

            console.log(person);
            console.log(relation);

            console.log("\n\n\n\n\n");
        }
    }

    queryDb(
        {},
        "MATCH (person:Person) OPTIONAL MATCH (person:Person)-[relation]->() RETURN person,relation;",
        function(results){
            console.log(results);
            _und.each(results, function(result){
                person = result.person;
                addPerson(person.id, person.data);
                if(person.data.name === name){
                    allResults["selectedPerson"] = person.id;
                    allResults["selectedPerson"].selected = true;
                }
            });
            _und.each(results, function(result){
                if(!_und.isNull(result.relation))
                    addRelation(result.person, result.relation);
            });
        }
    );


});

module.exports = router;
