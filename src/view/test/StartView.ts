/**Created by the LayaAirIDE*/


module ui.test{
	export class StartView extends ui.test.StartViewUI{
		
		constructor(){
			super();
			this.StartButton.on(Laya.Event.CLICK,this,this.onStartClick);
			this.RankButton.on(Laya.Event.CLICK,this,this.onRankClick);
		}

		private onStartClick():void{
			Laya.stage.removeChild(this);
			Laya.stage.addChild(new ui.test.MainView());
		}

		private onRankClick():void{
			Laya.stage.removeChild(this);
			Laya.stage.addChild(new ui.test.RankView());
		}
	}
}