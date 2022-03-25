/* Variables */
let Commands={};
let CMCommands={};
let CWatcher=require('chokidar').watch('./Commands',{atomic:true,ignoreInitial:true,usePolling:true,interval:250});
let CMWatcher=require('chokidar').watch('./Context menu commands',{atomic:true,ignoreInitial:true,usePolling:true,interval:250});
let fs=require('fs');

/* Get commands */
fs.readdirSync('./Commands').forEach(Category=>{
/* Add category to command list */
Commands[Category]={};

/* Get commands in category */
fs.readdirSync(`./Commands/${Category}`).forEach(Command=>{
/* Add to category */
try{
Commands[Category][Command.slice(0,Command.length-3)]=require(`./Commands/${Category}/${Command}`);
}catch(e){
/* Log error */
console.log(`Failed to load command: ${Command}\nError: ${e}\n`);
};
});
});

/* Get context menu commands */
fs.readdirSync(`./Context menu commands/${Category}`).forEach(Command=>{
/* Add to category */
try{
Commands[Category][Command.slice(0,Command.length-3)]=require(`./Context menu commands/${Command}`);
}catch(e){
/* Log error */
console.log(`Failed to load context menu command: ${Command}\nError: ${e}\n`);
};
});

/* Handle new commands */
CWatcher.on('add',(a)=>{
/* Variables */
let Category=a.slice(9).split('\\')[0];
let Name=a.slice(9).split('\\')[1];

/* Add to category */
try{
Commands[Category][Name.slice(0,Name.length-3)]=require(`./Commands/${Category}/${Name}`);
console.log(`Added command: ${Name}`);
}catch(e){
/* Log error */
console.log(`Failed to add command: ${Name}\nError: ${e}\n`);
};
});

/* Handle updated commands */
CWatcher.on('change',(a)=>{
/* Variables */
let Category=a.slice(9).split('\\')[0];
let Name=a.slice(9).split('\\')[1];

/* Update in category */
try{
Commands[Category][Name.slice(0,Name.length-3)]=require(`./Commands/${Category}/${Name}`);
console.log(`Updated command: ${Name}`);
}catch(e){
/* Log error */
console.log(`Failed to update command: ${Name}\nError: ${e}\n`);
};
});

/* Handle removed commands */
CWatcher.on('unlink',(a)=>{
/* Variables */
let Category=a.slice(9).split('\\')[0];
let Name=a.slice(9).split('\\')[1];

/* Remove from category */
try{
delete Commands[Category][Name.slice(0,Name.length-3)];
console.log(`Removed command: ${Name}`);
}catch(e){
/* Log error */
console.log(`Failed to remove command: ${Name}\nError: ${e}\n`);
};
});

/* Handle new CMCommands */
CMWatcher.on('add',(a)=>{
/* Variables */
let Name=a.slice(9).split('\\')[1];

/* Add to category */
try{
CMCommands[Name.slice(0,Name.length-3)]=require(`./context menu command/${Name}`);
console.log(`Added context menu command: ${Name}`);
}catch(e){
/* Log error */
console.log(`Failed to add context menu command: ${Name}\nError: ${e}\n`);
};
});

/* Handle updated CMCommands */
CMWatcher.on('change',(a)=>{
/* Variables */
let Name=a.slice(9).split('\\')[1];

/* Update in category */
try{
CMCommands[Name.slice(0,Name.length-3)]=require(`./context menu command/${Name}`);
console.log(`Updated context menu command: ${Name}`);
}catch(e){
/* Log error */
console.log(`Failed to update context menu command: ${Name}\nError: ${e}\n`);
};
});

/* Handle removed CMCommands */
CMWatcher.on('unlink',(a)=>{
/* Variables */
let Name=a.slice(9).split('\\')[1];

/* Remove from category */
try{
delete CMCommands[Name.slice(0,Name.length-3)];
console.log(`Removed context menu command: ${Name}`);
}catch(e){
/* Log error */
console.log(`Failed to remove context menu command: ${Name}\nError: ${e}\n`);
};
});

/* Handle slash commands */
exports.SlashCommand=(Interaction)=>{

};

/* Handle context menu commands */
exports.CMenuCommand=(Interaction)=>{

};