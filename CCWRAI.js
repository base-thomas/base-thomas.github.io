
let cIndex = 0; //index of current creature (run)
let nClicks = 0; //number of times big cookie has been clicked
const maxClicks = 15;
const nCreatures = 10;
const index2id = [-1, 0, 1, 2, 3, 0, 1, 2, 3, 7, 8, 9, 10, 11, 16, 57, 75]; //convert output index to building/upgrade ingame id (-1 is click big cookie)
const start777 = 'Mi4wNDh8fDE2NzcxMDk0NTI2OTM7MTY3NzEwOTQ1MjY5NjsxNjc3MTA5OTY4NTE2O0NydW1ibHkgUGl4aWU7eGtoeGJ8MTExMTExMDExMDAxMDExMDAxMDEwMTEwMDAxfDA7MDswOzE7MDswOzA7MDswOzA7MDswOzA7MDswOzE7MDswOzA7MDswOzA7OzA7MDswOzA7MDswOzA7LTE7LTE7LTE7LTE7LTE7MDswOzA7MDs3NTswOzA7LTE7LTE7MTY3NzEwOTQ1MjY5NzswOzA7OzQxOzA7MDswOzUwO3wwLDAsMCwwLCwwLDA7MCwwLDAsMCwsMCwwOzAsMCwwLDAsLDAsMDswLDAsMCwwLCwwLDA7MCwwLDAsMCwsMCwwOzAsMCwwLDAsLDAsMDswLDAsMCwwLCwwLDA7MCwwLDAsMCwsMCwwOzAsMCwwLDAsLDAsMDswLDAsMCwwLCwwLDA7MCwwLDAsMCwsMCwwOzAsMCwwLDAsLDAsMDswLDAsMCwwLCwwLDA7MCwwLDAsMCwsMCwwOzAsMCwwLDAsLDAsMDswLDAsMCwwLCwwLDA7MCwwLDAsMCwsMCwwOzAsMCwwLDAsLDAsMDswLDAsMCwwLCwwLDA7fDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMHwwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwfDYsMzkwLDI4Niw3Nzc7fENvb2tpZU1vbnN0ZXI6eyJzZXR0aW5ncyI6eyJDUFNNb2RlIjoxLCJBdmdDUFNIaXN0IjozLCJBdmdDbGlja3NIaXN0IjowLCJDYWxjV3JpbmsiOjAsIlNjYWxlIjoyLCJTY2FsZURlY2ltYWxzIjoyLCJTY2FsZVNlcGFyYXRvciI6MCwiU2NhbGVDdXRvZmYiOjk5OTk5OSwiVGltZUZvcm1hdCI6MCwiRGV0YWlsZWRUaW1lIjoxLCJQUERpc3BsYXlUaW1lIjowLCJCdWlsZENvbG91ciI6MSwiUFBPbmx5Q29uc2lkZXJCdXlhYmxlIjowLCJQUEV4Y2x1ZGVUb3AiOjAsIlBQUmlnaWRlbE1vZGUiOjAsIlBQU2Vjb25kc0xvd2VyTGltaXQiOjAsIkNvbG91ckJsdWUiOiIjNGJiOGYwIiwiQ29sb3VyR3JlZW4iOiIjMDBmZjAwIiwiQ29sb3VyWWVsbG93IjoiI2ZmZmYwMCIsIkNvbG91ck9yYW5nZSI6IiNmZjdmMDAiLCJDb2xvdXJSZWQiOiIjZmYwMDAwIiwiQ29sb3VyUHVycGxlIjoiI2ZmMDBmZiIsIkNvbG91ckdyYXkiOiIjYjNiM2IzIiwiQ29sb3VyUGluayI6IiNmZjE0OTMiLCJDb2xvdXJCcm93biI6IiM4YjQ1MTMiLCJCb3RCYXIiOjEsIlRpbWVyQmFyIjoxLCJUaW1lckJhclBvcyI6MCwiVGltZXJCYXJPdmVybGF5IjoyLCJBdXRvc2F2ZVRpbWVyQmFyIjowLCJVcEJhckNvbG91ciI6MSwiVXBncmFkZUJhckZpeGVkUG9zIjoxLCJTb3J0QnVpbGRpbmdzIjowLCJTb3J0VXBncmFkZXMiOjAsIlVwZ3JhZGVzTmV2ZXJDb2xsYXBzZSI6MCwiRHJhZ29uQXVyYUluZm8iOjEsIkdyaW1vaXJlQmFyIjoxLCJHQ1RpbWVyIjoxLCJGYXZpY29uIjoxLCJXcmlua2xlckJ1dHRvbnMiOjEsIkhpZGVTZWN0aW9uc0J1dHRvbnMiOjAsIlRvb2x0aXBCdWlsZFVwZ3JhZGUiOjEsIlRvb2x0aXBBbW9yIjowLCJUb29sV2Fybkx1Y2t5IjoxLCJUb29sV2Fybkx1Y2t5RnJlbnp5IjoxLCJUb29sV2FybkNvbmp1cmUiOjEsIlRvb2xXYXJuQ29uanVyZUZyZW56eSI6MSwiVG9vbFdhcm5FZGlmaWNlIjoxLCJUb29sV2FyblVzZXIiOjAsIlRvb2xXYXJuQm9uIjoxLCJUb29sV2FyblBvcyI6MSwiVG9vbHRpcEdyaW0iOjEsIlRvb2x0aXBXcmluayI6MSwiVG9vbHRpcEx1bXAiOjEsIlRvb2x0aXBQbG90cyI6MSwiVG9vbHRpcFBhbnRoZW9uIjoxLCJUb29sdGlwQXNjZW5kQnV0dG9uIjoxLCJTdGF0cyI6MSwiTWlzc2luZ1VwZ3JhZGVzIjoxLCJNaXNzaW5nQWNoaWV2ZW1lbnRzIjowLCJVcFN0YXRzIjoxLCJIZWF2ZW5seUNoaXBzVGFyZ2V0IjoxLCJTaG93TWlzc2VkR0MiOjEsIlRpdGxlIjoxLCJHZW5lcmFsU291bmQiOjEsIkdDTm90aWZpY2F0aW9uIjowLCJHQ0ZsYXNoIjoxLCJDb2xvdXJHQ0ZsYXNoIjoiI2ZmZmZmZiIsIkdDU291bmQiOjEsIkdDVm9sdW1lIjoxMDAsIkdDU291bmRVUkwiOiJodHRwczovL2ZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy82Ni82NjcxN185MzE2NTUtbHEubXAzIiwiRm9ydHVuZU5vdGlmaWNhdGlvbiI6MCwiRm9ydHVuZUZsYXNoIjoxLCJDb2xvdXJGb3J0dW5lRmxhc2giOiIjZmZmZmZmIiwiRm9ydHVuZVNvdW5kIjoxLCJGb3J0dW5lVm9sdW1lIjoxMDAsIkZvcnR1bmVTb3VuZFVSTCI6Imh0dHBzOi8vZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzE3NC8xNzQwMjdfMzI0MjQ5NC1scS5tcDMiLCJTZWFOb3RpZmljYXRpb24iOjAsIlNlYUZsYXNoIjoxLCJDb2xvdXJTZWFGbGFzaCI6IiNmZmZmZmYiLCJTZWFTb3VuZCI6MSwiU2VhVm9sdW1lIjoxMDAsIlNlYVNvdW5kVVJMIjoiaHR0cHM6Ly93d3cuZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzEyMS8xMjEwOTlfMjE5MzI2Ni1scS5tcDMiLCJHYXJkRmxhc2giOjEsIkNvbG91ckdhcmRGbGFzaCI6IiNmZmZmZmYiLCJHYXJkU291bmQiOjEsIkdhcmRWb2x1bWUiOjEwMCwiR2FyZFNvdW5kVVJMIjoiaHR0cHM6Ly9mcmVlc291bmQub3JnL2RhdGEvcHJldmlld3MvMTAzLzEwMzA0Nl84NjE3MTQtbHEubXAzIiwiTWFnaWNOb3RpZmljYXRpb24iOjAsIk1hZ2ljRmxhc2giOjEsIkNvbG91ck1hZ2ljRmxhc2giOiIjZmZmZmZmIiwiTWFnaWNTb3VuZCI6MSwiTWFnaWNWb2x1bWUiOjEwMCwiTWFnaWNTb3VuZFVSTCI6Imh0dHBzOi8vZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzIyMS8yMjE2ODNfMTAxNTI0MC1scS5tcDMiLCJXcmlua2xlck5vdGlmaWNhdGlvbiI6MCwiV3JpbmtsZXJGbGFzaCI6MSwiQ29sb3VyV3JpbmtsZXJGbGFzaCI6IiNmZmZmZmYiLCJXcmlua2xlclNvdW5kIjoxLCJXcmlua2xlclZvbHVtZSI6MTAwLCJXcmlua2xlclNvdW5kVVJMIjoiaHR0cHM6Ly9mcmVlc291bmQub3JnL2RhdGEvcHJldmlld3MvMTI0LzEyNDE4Nl84MDQzLWxxLm1wMyIsIldyaW5rbGVyTWF4Tm90aWZpY2F0aW9uIjowLCJXcmlua2xlck1heEZsYXNoIjoxLCJDb2xvdXJXcmlua2xlck1heEZsYXNoIjoiI2ZmZmZmZiIsIldyaW5rbGVyTWF4U291bmQiOjEsIldyaW5rbGVyTWF4Vm9sdW1lIjoxMDAsIldyaW5rbGVyTWF4U291bmRVUkwiOiJodHRwczovL2ZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy8xNTIvMTUyNzQzXzE1NjYzLWxxLm1wMyIsIkJ1bGtCdXlCbG9jayI6MSwiRmF2b3VyaXRlU2V0dGluZ3MiOjF9LCJoZWFkZXJzIjp7IkZhdm91cml0ZSI6MSwiQ2FsY3VsYXRpb24iOjEsIk5vdGF0aW9uIjoxLCJDb2xvdXJzIjoxLCJCYXJzRGlzcGxheSI6MSwiVG9vbHRpcCI6MSwiU3RhdGlzdGljcyI6MSwiTm90aWZpY2F0aW9uIjoxLCJOb3RpZmljYXRpb25HZW5lcmFsIjoxLCJOb3RpZmljYXRpb25HQyI6MSwiTm90aWZpY2F0aW9uRkMiOjEsIk5vdGlmaWNhdGlvblNlYSI6MSwiTm90aWZpY2F0aW9uR2FyZCI6MSwiTm90aWZpY2F0aW9uTWFnaSI6MSwiTm90aWZpY2F0aW9uV3JpbmsiOjEsIk5vdGlmaWNhdGlvbldyaW5rTWF4IjoxLCJNaXNjZWxsYW5lb3VzIjoxLCJMdWNreSI6MSwiQ2hhaW4iOjEsIlNwZWxscyI6MSwiR2FyZGVuIjoxLCJQcmVzdGlnZSI6MSwiV3JpbmsiOjEsIlNlYSI6MSwiQWNoaWV2cyI6MSwiTWlzYyI6MSwiaW5mb01lbnUiOjEsIm9wdGlvbnNNZW51IjoxfSwiZmF2b3VyaXRlU2V0dGluZ3MiOltdLCJ2ZXJzaW9uIjoiMi4wNDguMTAifTtjb29raWVNb25zdGVyRnJhbWV3b3JrOnsic2V0dGluZ3MiOnt9LCJoZWFkZXJzIjp7ImluZm9NZW51IjoxLCJvcHRpb25zTWVudSI6MX0sImZhdm91cml0ZVNldHRpbmdzIjpbXX07%21END%21';
const tickRate = 100 //ms

Game.registerMod('CCWRAI',{
	//Default Methods
	init:function(){
		//Game.registerHook('reincarnate',function(){Game.mods['test mod'].addIntro();});
		//Game.registerHook('check',function(){if (!Game.playerIntro){Game.mods['test mod'].addIntro();}});
		//Game.registerHook('click',function(){Game.Notify(choose(['A good click.','A solid click.','A mediocre click.','An excellent click!']),'',0,0.5);});
		//Game.registerHook('cps',function(cps){return cps*2;});
		console.log('up to date commit #1')
		consolg.log(this)
		let config = {
			model: [
				{nodeCount: 1, type: "input"}, //cookies, CpS, (total earned?)
				{nodeCount: 17, type: "output", activationfunc: activation.RELU} //big click, 4 buildings, 12 upgrades
			],
			mutationRate: 0.05,
			crossoverMethod: crossover.RANDOM,
			mutationMethod: mutate.RANDOM,
			populationSize: nCreatures
		};
		this.neat = new NEAT(config);
	},
	save:function(){
		//note: we use stringified JSON for ease and clarity but you could store any type of string
		//return JSON.stringify({text:Game.playerIntro})
	},
	load:function(str){
		//var data=JSON.parse(str);
		//if (data.text) Game.mods['CCWRAI'].addIntro(data.text);
	},
	/*addIntro:function(text){
		//note: this is not a mod hook, just a function that's part of the mod
		Game.playerIntro=text||choose(['oh snap, it\'s','watch out, it\'s','oh no! here comes','hide your cookies, for here comes','behold! it\'s']);
		if (!l('bakerySubtitle')) l('bakeryName').insertAdjacentHTML('afterend','<div id="bakerySubtitle" class="title" style="text-align:center;position:absolute;left:0px;right:0px;bottom:32px;font-size:12px;pointer-events:none;text-shadow:0px 1px 1px #000,0px 0px 4px #f00;opacity:0.8;"></div>');
		l('bakerySubtitle').textContent='~'+Game.playerIntro+'~';
	},*/

	//AI Interface Methods
	AIlog:function(a){
		//save to a file? a is a string?
	},
	AIclickCookie:function(){
		if (nClicks < maxClicks) {
			nClicks++;
			let te = console.timeLog('currentRun') //time elapsed since this run (creature) started
			let tem = Math.floor(te/60000)
			if (tem > 9) {te = `${tem}:${te-tem*60000}`;} else {te = `0${tem}:${te-tem*60000}`;} //beautify time elapsed
			console.log(`[${te}] AI click cookie`);
			Game.BigCookieState=2;
			setTimeout(function() {Game.BigCookieState=0}, 100);
			Game.ClickCookie();
		}
	},
	AIbuyThing:function(index){
		//(Format) ingame id - info

		//Buildings
			//0 - cursor - 15
			//1 - grandma - 100
			//2 - farm - 1100
			//3 - mine - 12000

		//Upgrades
			//0 - mouse/cursor 2x #1 - 100 - req 1 - "Reinforced index finger"
			//1 - mouse/cursor 2x #2 - 500 - req 1 - "Carpal tunnel prevention cream"
			//2 - mouse/cursor 2x #3 - 10,000 - req 10 - "Ambidextrous"
			//3 - mouse/cursor +0.1c per bldg - 100,000 - req 25 - "Thousand fingers"
			//7 - grandma 2x #1 - 1,000 - req 1 - "Forwards from grandma"
			//8 - grandma 2x #2 - 5,000 - req 5 - "Steel-plated rolling pins"
			//9 - grandma 2x #3 - 50,000 - req 25 - "Lubricated dentures"
			//10 - farm 2x #1 - 11,000 - req 1 - "Cheap hoes"
			//11 - farm 2x #2 - 55,000 - req 5 - "Fertilizer"
			//16 - mine 2x #1 - 120,000 - req 1 - "Sugar gas"
			//57 - gma 2x & +1% farms per gma - 55,000 - req 15 farms 1 gma - "Farmer grandmas"
			//75 - click +1% of CpS - 50,000 - req 1000 handmade - "Plastic mouse"

		let i = index2id[index]
		let te = console.timeLog('currentRun') //time elapsed since this run (creature) started
		let tem = Math.floor(te/60000)
		if (tem > 9) {te = `${tem}:${te-tem*60000}`;} else {te = `0${tem}:${te-tem*60000}`;} //beautify time elapsed
		if (i === -1) { //actually a big cookie click
			this.AIclickCookie();
			return;
		}
		let s = false;
		if (index <= 3) { //building
			let thing = Game.ObjectsById[i];
			s = Game.cookies >= thing.getPrice()
			//if (s) {
			let cps = Game.cookiesPs
			console.log(`[${te}] AI click upgrade: ${thing.name} (${thing.amount}) (price: ${thing.getPrice()}) with ${Game.cookies} cookies in bank`);
			Game.ClickProduct(i);
			if (s) {console.log(`Old CpS = ${cps} - New CpS = ${Game.cookiesPs}`)}
		} else { //upgrade
			let thing = Game.UpgradesById[i];
			s = thing.buy();
			//if (s) {
			let cps = Game.cookiesPs
			console.log(`[${te}] AI click upgrade: ${thing.name} (price: ${thing.getPrice()}) with ${Game.cookies} cookies in bank`);
			if (s) {console.log(`Old CpS = ${cps} - New CpS = ${Game.cookiesPs}`)}
		}
		return s
	},
	AIload:function(s){
		let r
		if (s) {
			r = Game.ImportSaveCode(s);
			console.log("----- AI loaded save (custom) -----");
		} else {
			r = Game.ImportSaveCode(start777);
			console.log("----- AI loaded save (x777 start) -----");
		}
		if (!r) {console.log('LOAD FAILED');}
	},

	//Neural Network Methods
	getFitness:function(){
		return Game.cookies / (console.timeLog() / 1000);
	},
	startRun:function(){
		console.log(`Starting New Run (#${cIndex}) - Gen ${this.neat.generation}`)
		this.AIload();
		console.time('currentRun'); //start run timer
		this.continueRun();
	},
	endRun:function(){
		let c = this.neat.creatures[cIndex];
		let f = this.getFitness()
		console.log(`Gen ${this.neat.generation} Run #${cIndex} Done - Fitness score: ${f}`)
		c.setFitness(f)
		console.timeEnd('currentRun'); //time elapsed should automatically show in console, (this doesn't return value)
		cIndex++;
		if (cIndex >= nCreatures) { //end generation
			//console.log(`Generation #${this.neat.generation} Complete!`); // - Best # of Cookies: ${bcs}
			cIndex = 0;
			this.neat.doGen(); //console should log with gen #
			let bc = this.neat.bestCreature()
			console.log(`Best Gen ${this.neat.generation} Creature = #${bc} (${this.oldCreatures[bc].score} cookies)`); //will have to change once fitness is based on more than just # of cookies
			//save best creature? = bc
			//aggregation stats?
		}
		this.startRun(creatureIndex); //here we go again
	},
	continueRun:function(){
		let c = this.neat.creatures[cIndex];
		c.setInputs([Game.cookies], cIndex); //, Game.cookiesPs], cIndex);
		c.feedForward();
		let d = c.desicion();
		console.log(d);
		console.log(d.length);
		for (let i = d.length - 1; i >= 0; i--) { //try most expensive items first to speed up iteration
			if (d[i] === 1) {
				this.AIbuyThing(i);
				break;
			}
		}
		if (nClicks < maxClicks) {
			this.setTimeout(continueRun, tickRate);
		} else {
			this.endRun();
		}
	}
});

Game.Notify('CCWRAI Loaded!','',0,4);

//-----Usage-----//
//Load with bookmark:
//javascript:(function() { Game.LoadMod('https://base-thomas.github.io/CCWRAI.js'); }());
//Game.mods['CCWRAI'].AIclickCookie()
//etc
