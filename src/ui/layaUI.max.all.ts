
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.test {
    export class MainViewUI extends View {
		public bgimage:Laya.Image;
		public BallNum:Laya.Label;
		public MyMap:Laya.List;
		public NumLabel:Laya.Label;
		public BallList:Laya.List;
		public border:Laya.Sprite;
		public ScoreLabel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"var":"bgimage","skin":"comp/bg.png","height":400,"sizeGrid":"26,0,0,0"},"child":[{"type":"Box","props":{"y":73,"x":42},"child":[{"type":"Circle","props":{"y":10,"x":10,"radius":10,"name":"ShowLabel","lineWidth":1,"fillColor":"#171717"}},{"type":"Label","props":{"y":4,"x":28,"var":"BallNum","text":"2"}}]},{"type":"Box","props":{"y":25,"x":150},"child":[{"type":"List","props":{"y":0,"x":0,"width":300,"var":"MyMap","spaceY":0,"spaceX":0,"repeatY":11,"repeatX":10,"mouseEnabled":true,"height":330},"child":[{"type":"Box","props":{"y":0,"x":0,"width":30,"renderType":"render","height":30},"child":[{"type":"Label","props":{"y":13,"x":13,"var":"NumLabel","text":"0","overflow":"visible","name":"NumLabel"}}]}]},{"type":"List","props":{"width":300,"var":"BallList","height":330}},{"type":"Sprite","props":{"var":"border"}}]},{"type":"Box","props":{"y":103,"x":42},"child":[{"type":"Label","props":{"y":4,"x":0,"width":35,"var":"ScoreLabel","text":"Score:0","height":12}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test.MainViewUI.uiView);

        }

    }
}

module ui.test {
    export class RankViewUI extends View {
		public BackBtn:Laya.Button;
		public RankList:Laya.List;
		public NameLabel:Laya.Label;
		public OrderLabel:Laya.Label;
		public ScoreLabel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","height":400,"sizeGrid":"26,0,0,0"}},{"type":"Button","props":{"y":168,"x":455,"var":"BackBtn","name":"BackBtn","label":"Back"}},{"type":"List","props":{"y":45,"x":206,"width":187,"var":"RankList","vScrollBarSkin":"comp/vscroll.png","spaceY":20,"spaceX":0,"repeatY":1,"repeatX":1,"name":"RankList","height":300},"child":[{"type":"Box","props":{"renderType":"render"},"child":[{"type":"Label","props":{"x":40,"var":"NameLabel","text":"label","name":"NameLabel"}},{"type":"Label","props":{"var":"OrderLabel","text":"label","name":"OrderLabel"}},{"type":"Label","props":{"x":110,"var":"ScoreLabel","text":"label","name":"ScoreLabel"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test.RankViewUI.uiView);

        }

    }
}

module ui.test {
    export class RestartDialogUI extends Dialog {
		public RestartBtn:Laya.Button;
		public scorelabel:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":250,"height":150},"child":[{"type":"Image","props":{"y":0,"x":0,"width":250,"skin":"comp/bg.png","height":150,"sizeGrid":"26,0,0,0"}},{"type":"Button","props":{"y":100,"x":85,"var":"RestartBtn","skin":"comp/button.png","label":"Restart"}},{"type":"Label","props":{"y":52,"x":96,"width":49,"var":"scorelabel","height":12}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test.RestartDialogUI.uiView);

        }

    }
}

module ui.test {
    export class StartViewUI extends View {
		public StartButton:Laya.Button;
		public RankButton:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","height":400,"sizeGrid":"26,0,0,0"}},{"type":"Button","props":{"y":174,"x":397,"var":"StartButton","skin":"comp/button.png","label":"Start"}},{"type":"Button","props":{"y":239,"x":398,"var":"RankButton","skin":"comp/button.png","label":"Rank"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test.StartViewUI.uiView);

        }

    }
}
