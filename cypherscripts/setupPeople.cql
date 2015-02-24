//Setup family data

match (a)-[r]->(b) delete a,r;
match (a) delete a;


create 
(clancy:Person{name:"Clancy", born:"0"})-[:MARRIED_TO]->
(jackie:Person{name:"Jackie", born:"0", inlaw:"true"}),

(homer:Person{name:"Homer", born:"40", inlaw:"true"})-[:MARRIED_TO]->
(marge:Person{name:"Marge", born:"40"}),

(patty:Person{name:"Patty", born:"40"}),

(selma:Person{name:"Selma", born:"40"}),

(bart:Person{name:"Bart", born:"80"}),

(lisa:Person{name:"Lisa", born:"80"}),

(maggie:Person{name:"Maggie", born:"80"}),

(ling:Person{name:"Ling", born:"80"}),

abraham-[:PARENT_TO]->homer<-[:PARENT_TO]-mona,
abraham-[:PARENT_TO]->herb<-[:PARENT_TO]-mona,

clancy-[:PARENT_TO]->marge<-[:PARENT_TO]-jackie,
clancy-[:PARENT_TO]->patty<-[:PARENT_TO]-jackie,
clancy-[:PARENT_TO]->selma<-[:PARENT_TO]-jackie,

homer-[:PARENT_TO]->bart<-[:PARENT_TO]-marge,
homer-[:PARENT_TO]->lisa<-[:PARENT_TO]-marge,
homer-[:PARENT_TO]->maggie<-[:PARENT_TO]-marge,
selma-[:PARENT_TO]->ling;

