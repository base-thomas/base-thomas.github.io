Game.registerMod('CCWRAI',{
	/*
		what this example mod does:
		-double your CpS
		-display a little popup for half a second whenever you click the big cookie
		-add a little intro text above your bakery name, and generate that intro text at random if you don't already have one
		-save and load your intro text
	*/
	init:function(){
		//Game.registerHook('reincarnate',function(){Game.mods['test mod'].addIntro();});
		//Game.registerHook('check',function(){if (!Game.playerIntro){Game.mods['test mod'].addIntro();}});
		Game.registerHook('click',function(){Game.Notify(choose(['A good click.','A solid click.','A mediocre click.','An excellent click!']),'',0,0.5);});
		Game.registerHook('cps',function(cps){return cps*2;});
	},
	save:function(){
		//note: we use stringified JSON for ease and clarity but you could store any type of string
		return JSON.stringify({text:Game.playerIntro})
	},
	load:function(str){
		var data=JSON.parse(str);
		if (data.text) Game.mods['CCWRAI'].addIntro(data.text);
	},
	addIntro:function(text){
		//note: this is not a mod hook, just a function that's part of the mod
		Game.playerIntro=text||choose(['oh snap, it\'s','watch out, it\'s','oh no! here comes','hide your cookies, for here comes','behold! it\'s']);
		if (!l('bakerySubtitle')) l('bakeryName').insertAdjacentHTML('afterend','<div id="bakerySubtitle" class="title" style="text-align:center;position:absolute;left:0px;right:0px;bottom:32px;font-size:12px;pointer-events:none;text-shadow:0px 1px 1px #000,0px 0px 4px #f00;opacity:0.8;"></div>');
		l('bakerySubtitle').textContent='~'+Game.playerIntro+'~';
	},
	AIclickCookie:function(n){
		console.log('AI cookie click')
		Game.BigCookieState=2;
		setTimeout(function() {Game.BigCookieState=0}, 100);
		Game.ClickCookie()
	},
	listUpgrades:function(){
		//0 - mouse/cursor 2x #1 - 100 - req 1 - "Reinforced index finger"
		//1 - mouse/cursor 2x #2 - 500 - req 1 - "Carpal tunnel prevention cream"
		//2 - mouse/cursor 2x #3 - 10,000 - req 10 - "Ambidextrous"
		//3 - mouse/cursor +0.1c per bldg - 100,000 - req 25 - "Thousand fingers"
		//7 - grandma 2x #1 - 1,000 - req 1 - "Forwards from grandma"
		//8 - grandma 2x #2 - 5,000 - req 5 - "Steel-plated rolling pins"
		//9 - grandma 2x #3 - 50,000 - req 25 - "Lubricated dentures"
		//10 - farm 2x #1 - 11,000 - req 1 - "Cheap hoes"
		//11 - farm 2x #2 - 55,000 - req 5 - "Fertilizer"
		//12 - farm 2x #3 - 550,000 - req 25 - "Cookie trees"
		//16 - mine 2x #1 - 120,000 - req 1 - "Sugar gas"
		//57 - gma 2x & +1% farms per gma - 55,000 - req 15 farms 1 gma - "Farmer grandmas"
		//75 - click +1% of CpS - 50,000 - req 1000 handmade - "Plastic mouse"
		
	},
	//get building: Game.ClickProduct(0); //0 is cursor and so on
	//check price: Game.ObjectsById[0].getPrice();
	//get upgrade: Game.UpgradesById[0].click();
	//check price: Game.UpgradesById[0].getPrice(); //also .canBuy() method and .bought field exist (use together)
});

Game.Notify('CCWRAI Loaded!','',0,2);
