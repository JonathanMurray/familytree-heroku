CREATE CONSTRAINT ON (person:Person) ASSERT person.uniqueName IS UNIQUE




//Setup people

match (a)-[r]->(b) delete a,r;
match (a) delete a;

create (b:Person{name:"Donald", born:"50"})-[:MARRIED_TO]->(k:Person{name:"Daisie", born:"53", inlaw:true}),
b-[:PARENT_TO]->(jos:Person{name:"Scrooge", born:"86"});
match (b{name:"Donald"})-[:PARENT_TO]->(child), (k{name:"Daisie"})
create k-[:PARENT_TO]->(child);
