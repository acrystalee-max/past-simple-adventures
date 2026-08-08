export const regular=[
 {base:'play',choices:['played','plaied','playd'],right:'played',rule:'Add -ed'},
 {base:'live',choices:['liveed','lived','livied'],right:'lived',rule:'Ends in e: add -d'},
 {base:'study',choices:['studied','studyed','studdied'],right:'studied',rule:'Consonant + y → ied'},
 {base:'stop',choices:['stoped','stopped','stopt'],right:'stopped',rule:'Double the last consonant'},
 {base:'visit',choices:['visited','visitted','visitied'],right:'visited',rule:'Add -ed'},
 {base:'dance',choices:['danced','danceed','danct'],right:'danced',rule:'Ends in e: add -d'}
];
export const pairs=[['go','went'],['see','saw'],['have','had'],['do','did'],['get','got'],['make','made'],['take','took'],['come','came'],['eat','ate'],['drink','drank'],['find','found'],['write','wrote']];
export const scenes=[
 {place:'Playground',icon:'⚽',desc:'Fresh footprints circle the goal. A silver feather shines by the bench.'},
 {place:'Workshop',icon:'⚙',desc:'A tiny robot is asleep. One tool is missing from the wall.'},
 {place:'Clock Tower',icon:'◷',desc:'The clock stopped at 6:15. A red scarf hangs from the stairs.'}
];
export const witnesses=[
 {name:'Lucy',role:'Robot builder',color:'#6fe4ff',q:'Did Lucy see the robot?',answers:['Yes, she did.','Yes, she saw.','Yes, she does.'],right:0,reply:'I saw Max near the workshop at six!'},
 {name:'Tom',role:'Goalkeeper',color:'#ffb85c',q:'What did Tom take?',answers:['He took the key.','He did took the key.','He taked the key.'],right:0,reply:'I took a brass key, not the crystal gear.'},
 {name:'Max',role:'Time scout',color:'#b890ff',q:'Where did Max go?',answers:['He went to the clock tower.','He did went to the tower.','He goed to the tower.'],right:0,reply:'I went to fix the clock. Lucy gave me the gear!'}
];
