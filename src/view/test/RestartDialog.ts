/**Created by the LayaAirIDE*/
module view.test{
	export class RestartDialog extends ui.test.RestartDialogUI{
		constructor(score :number){
			super();
			this.pos(Laya.stage.width / 2,Laya.stage.height / 2);
			this.scorelabel.text = "Your Score: " + score.toString();
			this.RestartBtn.on(Laya.Event.CLICK,null,() =>{
				this.OnButtonRestart();
			})

			
		}
		private OnButtonRestart():void{
				this.removeSelf();
				this.destroy();
			}
		
	}
}