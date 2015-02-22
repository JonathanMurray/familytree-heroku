function searchPerson(){
    var input = $("#searchPerson").find("input[type=search]").val();
    $("#searchPerson").find("input[type=search]").val("");
    var splitInput = input.split("_");
    var personName = splitInput[0];
    var searchUsingName = splitInput.length == 1;
    if(! searchUsingName){
        var personId = splitInput[1];
    }

    person = _.find(people, function(person){
        if(searchUsingName){
            return person.name.toLowerCase() === personName.toLowerCase();   
        }else{
            return person.id === personId;
        }
    });

    if(person != undefined){
    	selectPersonInMiniTree(person);
    	renderFromParentIfLeaf(person);
    }
}

function renderFromParentIfLeaf(person){
    if(person.PARENT_TO.length == 0){
        if(person.CHILD_TO.length > 0){
            parent = people[person.CHILD_TO[0]];
            renderFrom(parent); 
            return;
        }
    }
    renderFrom(person);
}

function idToPerson(id){
    return people[id];
}

function clickUpArrow(){
    parents = _.map(renderedFrom.CHILD_TO, idToPerson);
    if(parents.length == 0){
        // DO nothing
    }else{
    	selectPersonInMiniTree(parents[0]);
        renderFrom(parents[0]);
    }
}

function clickMiniPerson(personId){
	person = people[personId];
	selectPersonInMiniTree(person);
	renderFromParentIfLeaf(person);
}

function hoverPerson(anchorTag, id){
    person = people[id];
    var faceSelector = anchorTag.closest(".face");
    if(faceSelector.hasClass("selected")){
    	$("#tree .subtree").addClass("shaded");
    }
    var subtree = anchorTag.closest(".subtree").add(anchorTag.closest(".subtree").find(".subtree"));
    subtree.removeClass("shaded");
}

function unhoverPerson(anchorTag){
	$("#tree .subtree").removeClass("shaded");
}

function clickPerson(anchorTag, personId){
	var face = anchorTag.closest("#tree .subtree .face");
	person = people[personId];
	if(face.hasClass("selected")){  
    	selectPersonInMiniTree(person);
    	renderFromParentIfLeaf(person);
	}else{
		$("#tree .subtree .face").removeClass("selected");
		face.addClass("selected");
		selectPersonInMiniTree(person);
		hoverPerson(anchorTag, personId);
	}
}

function selectPersonInMiniTree(selectedPerson){
    if(typeof selectedPersonInMiniTree === 'object' && selectedPerson === selectedPersonInMiniTree){
        return;
    }
    selectedPersonInMiniTree = selectedPerson;
    $("#mini-tree .subtree .mini-face").removeClass("selected");
    $("#mini-tree .subtree .mini-face[data-personid='" + selectedPerson.id + "']").addClass("selected");
    $("#portrait-section").html(_.template(tmplPortrait, {person: selectedPerson}));    
}

function renderFrom(person){
	if(!_.isUndefined(person.inlaw) && person.inlaw){
		person = people[person.MARRIED_TO[0]];
	}
    if(typeof renderedFrom === 'object' && person === renderedFrom){ //No need to rerender
        return;
    }
    renderedFrom = person;
    $("#tree").html(_.template(tmplSubtree, {
        renderUpArrow: true,
        depth:1, 
        person:person, 
        tmplSubtree: _.template(tmplSubtree),
        tmplFace: _.template(tmplFace)})
    );
    
    var numGenerations = getMaxDepthFromPerson(person);
    $("#tree").removeClass("generations-1 generations-2 generations-3 generations-4");
    $("#tree").addClass("generations-" + numGenerations);

    $("#mini-tree .subtree .mini-face").removeClass("shown");
    $("#tree .subtree .face").each(function(index){
        var personId = $(this).attr("data-personid");
        $("#mini-tree .subtree .mini-face[data-personid='" + personId + "']").addClass("shown");
    })   
    
}

function renderMiniFrom(person){
    children = _.map(person.PARENT_TO, idToPerson);
    partner = idToPerson(person.MARRIED_TO);
    $("#mini-tree").html(_.template(tmplSubtree, {
        renderUpArrow: false,
        depth:1, 
        person:person, 
        tmplSubtree: _.template(tmplSubtree),
        tmplFace: _.template(tmplMiniFace)})
    );
}

function getMaxDepthFromPerson(person){
    var children = _.map(person.PARENT_TO, idToPerson);
    if(children.length == 0){
        return 1;
    }
    var maxChildDepth =  _.max(_.map(children, function(child){
        return getMaxDepthFromPerson(child);
    }));
    return maxChildDepth + 1;
}

function imgOnError(img){
    img.onerror = null; 
    img.attr('src', "images/avatar.jpg");
}

