/**Created by the LayaAirIDE*/



enum Shape{
	Null,
	Rect,
	Circle,
	Add
	//Trian
};
const repx:number = 10;
const repy:number = 11;
const size:number = 80;//percentage of rectangular in cell
const ballspeed :number = 5;
let rect_len:number;

enum Status{
	ChooseDir,
	Running,
	NextTurn,
	Dead
}

module ui.test{

	import mouse = Laya.MouseManager;
	import Event = Laya.Event;
	export class MainView extends ui.test.MainViewUI{
		restart: view.test.RestartDialog;
		
		my_ball :Array<ball> = [];
		my_block:Array<block> = [];
		ballnum:number;
		sta:number;
		dif:number;//难度
		dir:point = new point();//发射方向
		startpoint:point;
		last_ballnum:number;//未加载的小球
		intervalid;//定时器id
		intervalid2;//定时器id
		score: number;
		res:Array<any>;
		turn_num : number;


		rect_len:number;

		constructor(){
			super();
			this.res = [
				{url:"res/pic/left.png",type:Laya.Loader.IMAGE},
				{url:"res/pic/right.png",type:Laya.Loader.IMAGE},
				{url:"res/pic/rect.png",type:Laya.Loader.IMAGE},
				{url:"res/pic/circle.png",type:Laya.Loader.IMAGE},
				{url:"res/sound/winsound.mp3",type:Laya.Loader.SOUND},
				{url:"res/sound/bgsound.mp3",type:Laya.Loader.SOUND},
				{url:"res/sound/scoresound.mp3",type:Laya.Loader.SOUND}
			
			]; 

			this.startpoint = new point(this.MyMap.width / 2,this.MyMap.height - 8);
			
			this.init();
			this.addEvent();
			this.draw();
			this.updateLine();
			
			
		}

		private Restart():void
		{
			this.init();
			this.draw();
			this.updateLine();
			this.BallNum.text = ": " + this.ballnum.toString();
			

		}


		private updateBlock():void{
			for (let i = repx * repy - 1;i >= repx;i--)
			{
				this.my_block[i].copy(this.my_block[i - repx]);
			}
			let dead : Boolean = false;
			for (let i = 0;i < repx;i++)
			{
				if (this.my_block[repx * repy - 1 - i].sta !== Shape.Null && this.my_block[repx * repy - 1 - i].sta !== Shape.Add)
				{
					dead = true;
				}
			}
			if (dead === true)
			{
				this.sta = Status.Dead;
				laya.media.SoundManager.playMusic("res/sound/winsound.mp3",1);
				if (this.restart)
				{
					this.restart.removeSelf();
					this.restart.destroy();
				}
				this.restart = new view.test.RestartDialog(this.score);
				Laya.stage.addChild(this.restart);
				this.restart.on(Event.REMOVED,this,this.Restart);

			}
			else
			{
				let tem :number = Math.floor(Math.random() *  1.5 * this.ballnum * Math.cos(Math.PI / this.turn_num / 2)) + this.ballnum;//all
				let te : number = Math.floor(Math.random() * 5) + 1;
				for (let i = 0;i < repx;i++)
				{
					this.my_block[i].sta = Shape.Null;
					this.my_block[i].strength = 0;
					this.my_block[i].center = new point();
					this.my_block[i].setcenter(rect_len / 2 + i * rect_len,15);
				}
				let temp = [];

				for (let i = 0;i < te;i++){
					temp.push(Math.floor(Math.random() * (repx + 1)));
				}
				for (let i = 0;i < te;i++)
				//第一排
				{
					if (i === te - 1)
					{
						this.my_block[temp[i]].strength += tem > 0 ? tem : 1;
					}
					else
					{
						let pipi = Math.floor((Math.random() * 50 + 25) / 100 * tem) + 1;
						this.my_block[temp[i]].strength += pipi > 0? pipi : 1;
						tem -= pipi;
					}
					
					switch(Math.floor(Math.random() * 3))
					{
						case 0:
							this.my_block[temp[i]].sta = Shape.Circle;
						break;
						case 1:
							this.my_block[temp[i]].sta = Shape.Rect;
							this.my_block[temp[i]].anger = Math.floor(Math.random() * 90)	 - 45; 
						break;
						default:
						break;
					}
				}

				if(Math.random() < 1 / 3)
				{
					this.my_block[Math.floor(Math.random() * (repx + 1))].sta = Shape.Add;
				}
			}
			this.sta = Status.ChooseDir;
		}

		private nextturn():void{
			this.turn_num ++;
			this.updateBlock();
			this.draw();
			if(this.sta === Status.Dead)
			{


			}
			else
			{
				this.sta = Status.ChooseDir;
				this.BallNum.text = ": " + this.ballnum.toString();
			}

		}

		private addEvent():void{
			this.MyMap.on(Event.MOUSE_MOVE,this,this.mouseHandler);
			this.MyMap.on(Event.CLICK,this,this.mouseHandler);
		}

		private mouseHandler(e:Event):void{
			switch(e.type)
			{
				case Event.MOUSE_MOVE:
				if (this.sta === Status.ChooseDir)
				{
					this.updateLine();
				}
				break;
				case Event.CLICK:
				if (this.sta === Status.ChooseDir)
				{
					this.sta = Status.Running;
					this.MyMap.graphics.clear();
					this.MyMap.graphics.drawCircle(this.MyMap.width / 2,this.MyMap.height - 8,10,"black");
					this.dir.px = this.MyMap.mouseX;
					this.dir.py = this.MyMap.mouseY;
					console.log("start ball");
					this.startBall();
				}
				break;
				default:
				break;
			}
		}

		private drawball(this):void{
			for (let i = this.my_ball.length - 1;i >= 0 ;i--)
			{
				if (this.my_ball[i].label === null)
				{					
					this.my_ball[i].label = new Laya.Label("");
					
					
					this.my_ball[i].label.x = this.my_ball[i].center.px;
					this.my_ball[i].label.y = this.my_ball[i].center.py;
					this.my_ball[i].label.graphics.drawCircle(0,0,8,"#c0c0c0");					
					this.my_ball[i].label.filters = [new Laya.GlowFilter("#ffff00", 10, 0, 0)];
					this.BallList.addChild(this.my_ball[i].label);
				}
				else
				{
					if (this.my_ball[i].center.py < 0)
					{
						this.BallList.removeChild(this.my_ball[i].label);
						this.my_ball[i] = null;
						this.my_ball.splice(i,1);
						continue;
					}
					this.my_ball[i].next_pos();
				//	let translate_x = this.my_ball[i].center.px - this.my_ball[i].oldcenter.px;
			//		let translate_y = this.my_ball[i].center.py - this.my_ball[i].oldcenter.py;
				//	this.my_ball[i].label.transform.position(this.my_ball[i].center.px,this.my_ball[i].center.py);
					this.my_ball[i].label.x = this.my_ball[i].center.px;
					this.my_ball[i].label.y = this.my_ball[i].center.py;
				}
			}
		}

		private addball(this):void{
			let speed:number;
			let vx : number,vy :number;
			speed = Math.atan2(this.dir.py - this.startpoint.py,this.dir.px - this.startpoint.px) * 180 / Math.PI;
			let topush = new ball(this.startpoint,speed);
			this.my_ball.push(topush);
			this.last_ballnum --;
			if (this.last_ballnum <= 0)
			{
				console.log("finish add ball");
				clearInterval(this.intervalid);
			}
		}


		private onColide(i :number ):void{
			let x = this.my_ball[i].center.px;
			let y = this.my_ball[i].center.py;
			let mainnum = Math.floor(x / 30)  + Math.floor(y / 30) * 10; 

			if(this.my_ball[i].center.px <= 8 || this.my_ball[i].center.px >= this.MyMap.width - 8)
			{
				
				this.my_ball[i].anger = (540 - this.my_ball[i].anger ) % 360;
				return ;
			}
			if (this.my_ball[i].center.py >= this.MyMap.height - 8)
			{
				while(this.my_ball[i].anger <= 180)
				{
					this.my_ball[i].anger = (360 - this.my_ball[i].anger) % 360;
					if (Math.abs(this.my_ball[i].anger - 180) < 5)
					{
						this.my_ball[i].anger = 190;
					}
				}
				return ;
			}


			//地形碰撞
			for (let j = 0;j < 3;j++)
			{
				for (let k = 0;k < 3;k++)
				{
					let p = mainnum - 10 + 10 * j - 1 + k;
					if (p < 0 || p >= repx * repy)
					{
						continue;
					}
					if (this.my_block[p].sta === Shape.Null)
					{
						continue;
					}

					switch (this.my_block[p].onClilide(this.my_ball[i]))
					{
						case 1:
						this.score++;
						
						if (this.my_block[p].strength === 0)
						{
							this.my_block[p].sta = Shape.Null;
							
						}
						this.draw();
						break;
						case 2:
							this.ballnum++;
							laya.media.SoundManager.playSound("res/sound/scoresound.mp3",1);
							this.my_block[p].sta = Shape.Null;
							this.draw();//add one ball

						break;
						default:
						break;
					}

				}
			}
		}

		private runBall():void{
			if (this.my_ball.length <= 0)
			{
				console.log("run ball finish");
				clearInterval(this.intervalid2);
				this.sta = Status.NextTurn;
				this.nextturn();
				return ;
			}
			for (let i = 0;i < this.my_ball.length;i++)
			{
				this.my_ball[i].next_pos();
				this.onColide(i);
			}
			this.drawball();
		}

		private startBall():void{
			for (let i = this.my_ball.length;i >= 0;i--)
			{
				this.my_ball[i] = null;
			}
			this.my_ball.splice(0,this.my_ball.length);
			this.last_ballnum = this.ballnum;
			this.addball();
			this.intervalid = setInterval(() => {this.addball()},150);
			this.intervalid2 = setInterval(() => {this.runBall()},50);
		}

		private init():void{
			
			laya.media.SoundManager.playMusic("res/sound/bgsound.mp3",0);
			rect_len = 30;

			this.border.graphics.clear();
			this.border.graphics.loadImage("res/pic/left.png",-24,0,0,0);
			this.border.graphics.loadImage("res/pic/right.png",300,0,0,0);


			this.turn_num = 1;
			this.score = 0;
			this.sta = Status.ChooseDir;
			this.ballnum = 2;
			this.my_ball = Array<ball>(0);
			if (typeof(this.my_block) === "undefined")
			{
				this.my_block = new Array<block>();
			}
			else
			{
				for (let i = this.my_block.length - 1;i >= 0;i--)
				{
					this.my_block[i] = null;
				}
				this.my_block.splice(0,this.my_block.length);
			}
			for (let i = 0;i < repx * repy;i++)
			{
				this.my_block.push(new block(Shape.Null));
				let px :number = (i % repx + 0.5) * rect_len,py:number = (Math.floor(i / repx) + 0.5) * rect_len;
				this.my_block[i].setcenter(px,py);
			}
			this.MyMap.mouseEnabled = true;
			this.MyMap.on("click",this,this.onMapClick);
		}

		private updateLine():void{
			this.MyMap.graphics.clear();
			this.MyMap.graphics.drawCircle(this.MyMap.width / 2,this.MyMap.height - 8,10,"black");
			
			let x = 0,y = 0;
			x = this.MyMap.mouseX;
			y = this.MyMap.mouseY;
			
			if (this.MyMap.width / 2 === x)
			{
				y = 0;
			}
			else
			{
				 if ((this.MyMap.height - y) / Math.abs(this.MyMap.width / 2 - x) > this.MyMap.height  * 2 / this.MyMap.width)
				 {
					 x = this.MyMap.width / 2 + (x - this.MyMap.width / 2) * this.MyMap.height / (this.MyMap.height - y);
					 y = 0;
				 }
				 else
				 {
					 y = this.MyMap.height - (this.MyMap.height - y) * this.MyMap.width / 2  / Math.abs(this.MyMap.width / 2 - x);
					 if (this.MyMap.width / 2 > x)
					 {
						 x = 0;
					 }
					 else
					 {
						 x = this.MyMap.width;
					 }
				 }
			}
			x = Math.floor(x);
			y = Math.floor(y);
			let max_len = Math.sqrt((this.MyMap.width / 2 - x)**2 + (this.MyMap.height - 8 - y)**2);
			let cos =  (x - this.MyMap.width / 2) / max_len;
			let sin = (y - this.MyMap.height + 8) / max_len;
			let line_len = 50;
			for (let i = 0;i <Math.floor( max_len / line_len + 0.5);i++)
			{
				this.MyMap.graphics.drawLine(this.MyMap.width/2 + line_len * i * cos,
					this.MyMap.height -8 + line_len * i *sin,this.MyMap.width / 2 + line_len * i * cos + line_len / 2 * cos,this.MyMap.height - 8 + line_len * i *sin + line_len / 2 * sin,"#87CEFA",3);
			}
			
		
		}
		
		private draw():void{			
			this.MyMap.repeatX = repx;
			this.MyMap.repeatY = repy;
			this.MyMap.array = this.my_block;
			this.MyMap.renderHandler = new Laya.Handler(this,this.onListRender);
			this.ScoreLabel.text = "Score: " + this.score.toString();		
		}

		private onListRender(cell:Box,index:number):void{
			if (index > this.MyMap.array.length)
			{
				return ;
			}
			this.rect_len = cell.width / 2 * size /100;
			var data: block = this.MyMap.array[index];
			var numlabel : Laya.Label = cell.getChildByName("NumLabel") as Laya.Label;
			if (numlabel === null)
			{
				console.log("num :" + numlabel);
				console.log("Label not exist!");
				return ;
			}
			numlabel.align = "center";
			numlabel.x = cell.width / 2 - numlabel.fontSize / 2 + 3;
			numlabel.y = cell.height / 2 - numlabel.fontSize / 2;
			cell.graphics.clear();
			cell.pivot(0,0).pos(data.center.px - 15,data.center.py - 15);
			if (data.sta === Shape.Null)
			{
				numlabel.text = "";					
			}
			else
			{		
				numlabel.text = data.strength.toString();		
				switch(data.sta)
				{
					case Shape.Circle:
						cell.graphics.loadImage("res/pic/circle.png",3,3,0,0);
						cell.rotation = 0;
					break;
					case Shape.Rect:
						cell.graphics.loadImage("res/pic/rect.png",3,3,0,0);
						cell.pivot(15,15).pos(data.center.px,data.center.py);
						cell.rotation = data.anger;
					break;
					case Shape.Add:
						numlabel.text = "";				
						cell.graphics.loadImage("res/pic/add.png");
						cell.rotation = 0;
					break;
					default:
					break;
				}
			}
		}

		private onMapClick():void{			
			console.log("click");
		}

	}

	class point{
		px:number;
		py:number;
		constructor(x : number = 0,y : number = 0)
		{	
			this.px = x;
			this.py = y;

		}
		public init():void
		{
			this.px = this.py = 0;
		}
	}

	class block{
		sta:number;//type of block
		strength:number;
		anger:number;
		arg:number;//direction of rectangular;
		center :point;


		constructor(typ : Shape,strength:number = 0,arg:number = 0,anger :number = 0){
			this.sta = typ;
			this.arg = arg;
			this.strength = strength;
			this.strength = 0;
			this.anger = anger;
			this.center = new point();
			
		}
		setcenter(px,py):void{
			if (!this.center)
			{
				this.center = new point();
			}		
			this.center.px = px;
			this.center.py = py;	
		}

		draw():void{

		}

		copy(tocopy:block):void
		{
			this.sta = tocopy.sta;
			this.arg = tocopy.arg;
			this.strength = tocopy.strength;
			this.anger = tocopy.anger;
		}

		onClilide(myball:ball):Number{
			switch(this.sta)
			{
				case Shape.Circle:
					let a = rect_len *size / 100 / 2;
					let dxc =myball.center.px - this.center.px;
					let dyc = myball.center.py - this.center.py;
					if (Math.sqrt(dxc **2 + dyc** 2) < a + 8)
					{
						this.strength--;
						let an = Math.atan2(dyc,dxc) * 180 / Math.PI;
						myball.anger = (2 * an - myball.anger + 540 ) % 360;
						return 1;
					}
				break;

				case Shape.Rect:

					let module_l =(myball.center.py - this.center.py) ** 2+(myball.center.px -this.center.px) ** 2 ;
					module_l = Math.sqrt(module_l);
					let angc = Math.atan2(myball.center.py - this.center.py,myball.center.px -this.center.px) - this.anger / 180 * Math.PI;//pi
					let speed_ang = myball.anger - this.anger;//180

					//rotate
					let w = rect_len * size / 100;
					let rx :number = module_l * Math.cos(angc),ry : number = module_l * Math.sin(angc);
					let dx = Math.min(rx,w * 0.5);
					let dx1 = Math.max(dx,-w * 0.5);
					let dy = Math.min(ry,w * 0.5);
					let dy1 = Math.max(dy,-w * 0.5);
					if ((dx1 - rx) * (dx1 - rx) + (dy1 - ry) * (dy1 - ry)  <= 8 * 8)
					{											
						this.strength--;
						if (Math.abs(rx) < w / 2 - 2)
						{
							speed_ang = (360 - speed_ang) % 360;
							myball.anger = speed_ang +  this.anger;
							return 1;
						}
						if(Math.abs(ry) < w / 2 - 2)
						{
							speed_ang = (540 - speed_ang) % 360;
							myball.anger = speed_ang + this.anger;
							return 1;
						}
						let ang1 : number;
						if(rx > 0 && ry > 0)
						{
							ang1 = Math.atan2(ry - w / 2 - 2,rx - w / 2 - 2) / Math.PI * 180;
						}
						else
						{
							if (rx > 0 && ry < 0 )
							{
								ang1 = Math.atan2(ry + w / 2 + 2,rx - w / 2 - 2);
							}
							else
							{
								if (rx < 0 && ry > 0)
								{
									ang1 = Math.atan2( ry - w / 2 - 2,rx + w / 2 + 2);		
								}
								else
								{
									ang1 = Math.atan2( ry + w / 2 + 2,rx + w / 2 + 2);		
								}
							}
						}
						speed_ang = (2 * ang1 + 180 - speed_ang )% 360;
						myball.anger = speed_ang + this.anger;
						myball.next_pos();
						return 1;
					}
				break;

				case Shape.Add:
					let wa = rect_len;
					let rxa :number = myball.center.px -this.center.px,rya : number = myball.center.py - this.center.py;
					let dxa = Math.min(rxa, wa * 0.5);
					let dx1a = Math.max(dxa, -  wa* 0.5);
					let dya = Math.min(rya,wa * 0.5);
					let dy1a = Math.max(dya , - wa * 0.5);
					if ((dx1a - rxa) * (dx1a - rxa) + (dy1a - rya) * (dy1a - rya)  <= 8 * 8)
					{											
						return 2;
					}		
				break;
				default:
				break;
			}


			return 0;
		}

		

	}

	class ball extends Laya.Sprite{
		label:Laya.Label = null;	
		center:point = new point();
		energy: number;
		anger: number;
		constructor(cen?:point,ang?:number){
			super();
			if (typeof(cen) !== "undefined")
			{
					this.center.px = cen.px;
					this.center.py = cen.py;
			}
			if (typeof(ang) !== "undefined")
			{
				this.anger = ang;
			}
			else
			{
				this.anger = 0;
			}
		}
		public next_pos():void{
			this.center.px += ballspeed * Math.cos(this.anger / 180 * Math.PI);
			this.center.py += ballspeed * Math.sin(this.anger / 180 * Math.PI);	
		}
	}
}