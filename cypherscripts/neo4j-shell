CREATE CONSTRAINT ON (person:Person) ASSERT person.uniqueName IS UNIQUE




//Setup people

match (a)-[r]->(b) delete a,r;
match (a) delete a;

create (b:Person{name:"Bertil", born:"50"})-[:MARRIED_TO]->(k:Person{name:"Kerstin", born:"53", inlaw:true}),
b-[:PARENT_TO]->(jos:Person{name:"Josef", born:"86"}),
b-[:PARENT_TO]->(si:Person{name:"Simon", born:"88"}),
b-[:PARENT_TO]->(jon:Person{name:"Jonathan", born:"90"}),
b-[:PARENT_TO]->(sa:Person{name:"Samuel", born:"93"});
match (b{name:"Bertil"})-[:PARENT_TO]->(child), (k{name:"Kerstin"})
create k-[:PARENT_TO]->(child);

create (kristina:Person{name:"Kristina"}),
(yngve:Person{name:"Yngve", inlaw:true}),
(leo:Person{name:"Leo"}),
(kristina)-[:PARENT_TO]->(leo),
(yngve)-[:PARENT_TO]->(leo),
(kristina)-[:MARRIED_TO]->(yngve);

create (magnus:Person{name:"Magnus", inlaw:true})-[:MARRIED_TO]->(margareta:Person{name:"Margareta"}),
magnus-[:PARENT_TO]->(magdalena:Person{name:"Magdalena"}),
magnus-[:PARENT_TO]->(markus:Person{name:"Markus"}),
magnus-[:PARENT_TO]->(maria:Person{name:"Maria"}),
magnus-[:PARENT_TO]->(martin:Person{name:"Martin"});
match (magnus{name:"Magnus"})-[:PARENT_TO]->(child), (margareta{name:"Margareta"})
create (margareta)-[:PARENT_TO]->(child);

create (carladolf:Person{name:"Carl-Adolf"});
match (ca{name:"Carl-Adolf"}), (m{name:"Margareta"}), (b{name:"Bertil"}), (k{name:"Kristina"})
create (ca)-[:PARENT_TO]->(m),
(ca)-[:PARENT_TO]->(b),
(ca)-[:PARENT_TO]->(k);





create (axel:Person{name:"Axel"}),
(axel)-[:PARENT_TO]->(aja:Person{name:"Aja"}),
(axel)-[:PARENT_TO]->(mia:Person{name:"Mia"}),
(axel)-[:PARENT_TO]->(birgitta:Person{name:"Birgitta"}),
(axel)-[:PARENT_TO]->(lol:Person{name:"Lolo"}),
(axel)-[:PARENT_TO]->(lisen:Person{name:"Lisen"}),
(axel)-[:PARENT_TO]->(sanna:Person{name:"Sanna"}),
(axel)-[:PARENT_TO]->(thomas:Person{name:"Thomas"}),
(thomas)-[:PARENT_TO]->(ted:Person{name:"Ted"}),
(thomas)-[:PARENT_TO]->(douglas:Person{name:"Douglas"}),
(thomas)-[:PARENT_TO]->(charles:Person{name:"Charles"}),
(thomas)-[:PARENT_TO]->(rosanna:Person{name:"Rosanna"}),

(robert:Person{name:"Robert"}),
(robert)-[:PARENT_TO]->(andreas:Person{name:"Andreas"})-[:PARENT_TO]->(karl:Person{name:"Karl"}),
(robert)-[:PARENT_TO]->(christina:Person{name:"Christina"}),
(robert)-[:PARENT_TO]->(christofer:Person{name:"Christofer"}),
(robert)-[:PARENT_TO]->(isabella:Person{name:"Isabella"}),

(helene:Person{name:"Hélène"}),
(märtha:Person{name:"Märtha"}),
(bertil:Person{name:"Bertil"}),
(birgittaelder:Person{name:"Birgitta"}),
(annemargrethe:Person{name:"Anne-Margrethe"}),
(bengteric:Person{name:"Bengt-Eric"}),

(adolf:Person{name:"Adolf"}),
(adolf)-[:PARENT_TO]->(axel),
(adolf)-[:PARENT_TO]->(robert),
(adolf)-[:PARENT_TO]->(helene),
(adolf)-[:PARENT_TO]->(märtha),
(adolf)-[:PARENT_TO]->(bertil),
(adolf)-[:PARENT_TO]->(birgittaelder),
(adolf)-[:PARENT_TO]->(annemargrethe),
(adolf)-[:PARENT_TO]->(bengteric);

match (carladolf{name:"Carl-Adolf"})
match(adolf{name:"Adolf"})
create (adolf)-[:PARENT_TO]->(carladolf);









//Set unique names


