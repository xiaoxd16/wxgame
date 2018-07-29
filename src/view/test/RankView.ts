/**Created by the LayaAirIDE*/
import Box = laya.ui.Box;
import Label = laya.ui.Label;


module ui.test{
	export class RankView extends ui.test.RankViewUI{
		rankListBtns: Array<Laya.Button> =  [
        this.BackBtn
   	 ];
		private ranklist:Array<RankData> = new Array<RankData>();
		constructor(){
			super();
			this.Init();
			this.Load();
		}
		private Init(): void{
			while(this.ranklist.length !== 0)
			{
				this.ranklist.pop();
				continue;
			}

		}
		private Load(){
			this.getList();
			this.RankList.repeatY = this.ranklist.length;
			this.RankList.array = this.ranklist;
			this.ranklist.map(console.log);
			this.RankList.renderHandler = new Laya.Handler(this,this.onListRender);

		}

		private onListRender(cell : Box,index:number) : void
		{
			if (index > this.RankList.array.length)
			{
				return ;
			}
			var data: RankData = this.RankList.array[index];
			var orderlabel : Laya.Label = cell.getChildByName("OrderLabel") as Laya.Label;
			var namelabel : Laya.Label = cell.getChildByName("NameLabel") as Laya.Label;
			var scorelabel : Laya.Label = cell.getChildByName("ScoreLabel") as Laya.Label;
			if (orderlabel === null || namelabel === null || scorelabel === null)
			{
				console.log("order :" + orderlabel);
				console.log("name :" + namelabel);
				console.log("score :" + scorelabel);
				console.log("Label not exist!");
				return ;
			}
			namelabel.text = data.name;
			scorelabel.text = (data.score.toString());
			orderlabel.text = (data.order.toString());
			
		}
		private getList():void{
			this.ranklist.push(new RankData(1,'xx',10));
			this.ranklist.push(new RankData(2,'xxx',9));
			this.ranklist.push(new RankData(3,'xxxx',8));
		}

	}
	class RankData{
		order:number;
		score:number;
		name:string;
		constructor(order,name,score){
			this.order = order;
			this.name = name;
			this.score = score;

		}
	}
}