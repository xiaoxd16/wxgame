/**Created by the LayaAirIDE*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Shape;
(function (Shape) {
    Shape[Shape["Null"] = 0] = "Null";
    Shape[Shape["Rect"] = 1] = "Rect";
    Shape[Shape["Circle"] = 2] = "Circle";
    Shape[Shape["Add"] = 3] = "Add";
    //Trian
})(Shape || (Shape = {}));
;
var repx = 10;
var repy = 11;
var size = 80; //percentage of rectangular in cell
var ballspeed = 5;
var rect_len;
var Status;
(function (Status) {
    Status[Status["ChooseDir"] = 0] = "ChooseDir";
    Status[Status["Running"] = 1] = "Running";
    Status[Status["NextTurn"] = 2] = "NextTurn";
    Status[Status["Dead"] = 3] = "Dead";
})(Status || (Status = {}));
var ui;
(function (ui) {
    var test;
    (function (test) {
        var Event = Laya.Event;
        var MainView = /** @class */ (function (_super) {
            __extends(MainView, _super);
            function MainView() {
                var _this = _super.call(this) || this;
                _this.my_ball = [];
                _this.my_block = [];
                _this.dir = new point(); //发射方向
                _this.res = [
                    { url: "res/pic/left.png", type: Laya.Loader.IMAGE },
                    { url: "res/pic/right.png", type: Laya.Loader.IMAGE },
                    { url: "res/pic/rect.png", type: Laya.Loader.IMAGE },
                    { url: "res/pic/circle.png", type: Laya.Loader.IMAGE },
                    { url: "res/sound/winsound.mp3", type: Laya.Loader.SOUND },
                    { url: "res/sound/bgsound.mp3", type: Laya.Loader.SOUND },
                    { url: "res/sound/scoresound.mp3", type: Laya.Loader.SOUND }
                ];
                _this.startpoint = new point(_this.MyMap.width / 2, _this.MyMap.height - 8);
                _this.init();
                _this.addEvent();
                _this.draw();
                _this.updateLine();
                return _this;
            }
            MainView.prototype.Restart = function () {
                this.init();
                this.draw();
                this.updateLine();
                this.BallNum.text = ": " + this.ballnum.toString();
            };
            MainView.prototype.updateBlock = function () {
                for (var i = repx * repy - 1; i >= repx; i--) {
                    this.my_block[i].copy(this.my_block[i - repx]);
                }
                var dead = false;
                for (var i = 0; i < repx; i++) {
                    if (this.my_block[repx * repy - 1 - i].sta !== Shape.Null && this.my_block[repx * repy - 1 - i].sta !== Shape.Add) {
                        dead = true;
                    }
                }
                if (dead === true) {
                    this.sta = Status.Dead;
                    laya.media.SoundManager.playMusic("res/sound/winsound.mp3", 1);
                    if (this.restart) {
                        this.restart.removeSelf();
                        this.restart.destroy();
                    }
                    this.restart = new view.test.RestartDialog(this.score);
                    Laya.stage.addChild(this.restart);
                    this.restart.on(Event.REMOVED, this, this.Restart);
                }
                else {
                    var tem = Math.floor(Math.random() * 1.5 * this.ballnum * Math.cos(Math.PI / this.turn_num / 2)) + this.ballnum; //all
                    var te = Math.floor(Math.random() * 5) + 1;
                    for (var i = 0; i < repx; i++) {
                        this.my_block[i].sta = Shape.Null;
                        this.my_block[i].strength = 0;
                        this.my_block[i].center = new point();
                        this.my_block[i].setcenter(rect_len / 2 + i * rect_len, 15);
                    }
                    var temp = [];
                    for (var i = 0; i < te; i++) {
                        temp.push(Math.floor(Math.random() * (repx + 1)));
                    }
                    for (var i = 0; i < te; i++) 
                    //第一排
                    {
                        if (i === te - 1) {
                            this.my_block[temp[i]].strength += tem > 0 ? tem : 1;
                        }
                        else {
                            var pipi = Math.floor((Math.random() * 50 + 25) / 100 * tem) + 1;
                            this.my_block[temp[i]].strength += pipi > 0 ? pipi : 1;
                            tem -= pipi;
                        }
                        switch (Math.floor(Math.random() * 3)) {
                            case 0:
                                this.my_block[temp[i]].sta = Shape.Circle;
                                break;
                            case 1:
                                this.my_block[temp[i]].sta = Shape.Rect;
                                this.my_block[temp[i]].anger = Math.floor(Math.random() * 90) - 45;
                                break;
                            default:
                                break;
                        }
                    }
                    if (Math.random() < 1 / 3) {
                        this.my_block[Math.floor(Math.random() * (repx + 1))].sta = Shape.Add;
                    }
                }
                this.sta = Status.ChooseDir;
            };
            MainView.prototype.nextturn = function () {
                this.turn_num++;
                this.updateBlock();
                this.draw();
                if (this.sta === Status.Dead) {
                }
                else {
                    this.sta = Status.ChooseDir;
                    this.BallNum.text = ": " + this.ballnum.toString();
                }
            };
            MainView.prototype.addEvent = function () {
                this.MyMap.on(Event.MOUSE_MOVE, this, this.mouseHandler);
                this.MyMap.on(Event.CLICK, this, this.mouseHandler);
            };
            MainView.prototype.mouseHandler = function (e) {
                switch (e.type) {
                    case Event.MOUSE_MOVE:
                        if (this.sta === Status.ChooseDir) {
                            this.updateLine();
                        }
                        break;
                    case Event.CLICK:
                        if (this.sta === Status.ChooseDir) {
                            this.sta = Status.Running;
                            this.MyMap.graphics.clear();
                            this.MyMap.graphics.drawCircle(this.MyMap.width / 2, this.MyMap.height - 8, 10, "black");
                            this.dir.px = this.MyMap.mouseX;
                            this.dir.py = this.MyMap.mouseY;
                            console.log("start ball");
                            this.startBall();
                        }
                        break;
                    default:
                        break;
                }
            };
            MainView.prototype.drawball = function () {
                for (var i = this.my_ball.length - 1; i >= 0; i--) {
                    if (this.my_ball[i].label === null) {
                        this.my_ball[i].label = new Laya.Label("");
                        this.my_ball[i].label.x = this.my_ball[i].center.px;
                        this.my_ball[i].label.y = this.my_ball[i].center.py;
                        this.my_ball[i].label.graphics.drawCircle(0, 0, 8, "#c0c0c0");
                        this.my_ball[i].label.filters = [new Laya.GlowFilter("#ffff00", 10, 0, 0)];
                        this.BallList.addChild(this.my_ball[i].label);
                    }
                    else {
                        if (this.my_ball[i].center.py < 0) {
                            this.BallList.removeChild(this.my_ball[i].label);
                            this.my_ball[i] = null;
                            this.my_ball.splice(i, 1);
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
            };
            MainView.prototype.addball = function () {
                var speed;
                var vx, vy;
                speed = Math.atan2(this.dir.py - this.startpoint.py, this.dir.px - this.startpoint.px) * 180 / Math.PI;
                var topush = new ball(this.startpoint, speed);
                this.my_ball.push(topush);
                this.last_ballnum--;
                if (this.last_ballnum <= 0) {
                    console.log("finish add ball");
                    clearInterval(this.intervalid);
                }
            };
            MainView.prototype.onColide = function (i) {
                var x = this.my_ball[i].center.px;
                var y = this.my_ball[i].center.py;
                var mainnum = Math.floor(x / 30) + Math.floor(y / 30) * 10;
                if (this.my_ball[i].center.px <= 8 || this.my_ball[i].center.px >= this.MyMap.width - 8) {
                    this.my_ball[i].anger = (540 - this.my_ball[i].anger) % 360;
                    return;
                }
                if (this.my_ball[i].center.py >= this.MyMap.height - 8) {
                    while (this.my_ball[i].anger <= 180) {
                        this.my_ball[i].anger = (360 - this.my_ball[i].anger) % 360;
                        if (Math.abs(this.my_ball[i].anger - 180) < 5) {
                            this.my_ball[i].anger = 190;
                        }
                    }
                    return;
                }
                //地形碰撞
                for (var j = 0; j < 3; j++) {
                    for (var k = 0; k < 3; k++) {
                        var p = mainnum - 10 + 10 * j - 1 + k;
                        if (p < 0 || p >= repx * repy) {
                            continue;
                        }
                        if (this.my_block[p].sta === Shape.Null) {
                            continue;
                        }
                        switch (this.my_block[p].onClilide(this.my_ball[i])) {
                            case 1:
                                this.score++;
                                if (this.my_block[p].strength === 0) {
                                    this.my_block[p].sta = Shape.Null;
                                }
                                this.draw();
                                break;
                            case 2:
                                this.ballnum++;
                                laya.media.SoundManager.playSound("res/sound/scoresound.mp3", 1);
                                this.my_block[p].sta = Shape.Null;
                                this.draw(); //add one ball
                                break;
                            default:
                                break;
                        }
                    }
                }
            };
            MainView.prototype.runBall = function () {
                if (this.my_ball.length <= 0) {
                    console.log("run ball finish");
                    clearInterval(this.intervalid2);
                    this.sta = Status.NextTurn;
                    this.nextturn();
                    return;
                }
                for (var i = 0; i < this.my_ball.length; i++) {
                    this.my_ball[i].next_pos();
                    this.onColide(i);
                }
                this.drawball();
            };
            MainView.prototype.startBall = function () {
                var _this = this;
                for (var i = this.my_ball.length; i >= 0; i--) {
                    this.my_ball[i] = null;
                }
                this.my_ball.splice(0, this.my_ball.length);
                this.last_ballnum = this.ballnum;
                this.addball();
                this.intervalid = setInterval(function () { _this.addball(); }, 150);
                this.intervalid2 = setInterval(function () { _this.runBall(); }, 50);
            };
            MainView.prototype.init = function () {
                laya.media.SoundManager.playMusic("res/sound/bgsound.mp3", 0);
                rect_len = 30;
                this.border.graphics.clear();
                this.border.graphics.loadImage("res/pic/left.png", -24, 0, 0, 0);
                this.border.graphics.loadImage("res/pic/right.png", 300, 0, 0, 0);
                this.turn_num = 1;
                this.score = 0;
                this.sta = Status.ChooseDir;
                this.ballnum = 2;
                this.my_ball = Array(0);
                if (typeof (this.my_block) === "undefined") {
                    this.my_block = new Array();
                }
                else {
                    for (var i = this.my_block.length - 1; i >= 0; i--) {
                        this.my_block[i] = null;
                    }
                    this.my_block.splice(0, this.my_block.length);
                }
                for (var i = 0; i < repx * repy; i++) {
                    this.my_block.push(new block(Shape.Null));
                    var px = (i % repx + 0.5) * rect_len, py = (Math.floor(i / repx) + 0.5) * rect_len;
                    this.my_block[i].setcenter(px, py);
                }
                this.MyMap.mouseEnabled = true;
                this.MyMap.on("click", this, this.onMapClick);
            };
            MainView.prototype.updateLine = function () {
                this.MyMap.graphics.clear();
                this.MyMap.graphics.drawCircle(this.MyMap.width / 2, this.MyMap.height - 8, 10, "black");
                var x = 0, y = 0;
                x = this.MyMap.mouseX;
                y = this.MyMap.mouseY;
                if (this.MyMap.width / 2 === x) {
                    y = 0;
                }
                else {
                    if ((this.MyMap.height - y) / Math.abs(this.MyMap.width / 2 - x) > this.MyMap.height * 2 / this.MyMap.width) {
                        x = this.MyMap.width / 2 + (x - this.MyMap.width / 2) * this.MyMap.height / (this.MyMap.height - y);
                        y = 0;
                    }
                    else {
                        y = this.MyMap.height - (this.MyMap.height - y) * this.MyMap.width / 2 / Math.abs(this.MyMap.width / 2 - x);
                        if (this.MyMap.width / 2 > x) {
                            x = 0;
                        }
                        else {
                            x = this.MyMap.width;
                        }
                    }
                }
                x = Math.floor(x);
                y = Math.floor(y);
                var max_len = Math.sqrt(Math.pow((this.MyMap.width / 2 - x), 2) + Math.pow((this.MyMap.height - 8 - y), 2));
                var cos = (x - this.MyMap.width / 2) / max_len;
                var sin = (y - this.MyMap.height + 8) / max_len;
                var line_len = 50;
                for (var i = 0; i < Math.floor(max_len / line_len + 0.5); i++) {
                    this.MyMap.graphics.drawLine(this.MyMap.width / 2 + line_len * i * cos, this.MyMap.height - 8 + line_len * i * sin, this.MyMap.width / 2 + line_len * i * cos + line_len / 2 * cos, this.MyMap.height - 8 + line_len * i * sin + line_len / 2 * sin, "#87CEFA", 3);
                }
            };
            MainView.prototype.draw = function () {
                this.MyMap.repeatX = repx;
                this.MyMap.repeatY = repy;
                this.MyMap.array = this.my_block;
                this.MyMap.renderHandler = new Laya.Handler(this, this.onListRender);
                this.ScoreLabel.text = "Score: " + this.score.toString();
            };
            MainView.prototype.onListRender = function (cell, index) {
                if (index > this.MyMap.array.length) {
                    return;
                }
                this.rect_len = cell.width / 2 * size / 100;
                var data = this.MyMap.array[index];
                var numlabel = cell.getChildByName("NumLabel");
                if (numlabel === null) {
                    console.log("num :" + numlabel);
                    console.log("Label not exist!");
                    return;
                }
                numlabel.align = "center";
                numlabel.x = cell.width / 2 - numlabel.fontSize / 2 + 3;
                numlabel.y = cell.height / 2 - numlabel.fontSize / 2;
                cell.graphics.clear();
                cell.pivot(0, 0).pos(data.center.px - 15, data.center.py - 15);
                if (data.sta === Shape.Null) {
                    numlabel.text = "";
                }
                else {
                    numlabel.text = data.strength.toString();
                    switch (data.sta) {
                        case Shape.Circle:
                            cell.graphics.loadImage("res/pic/circle.png", 3, 3, 0, 0);
                            cell.rotation = 0;
                            break;
                        case Shape.Rect:
                            cell.graphics.loadImage("res/pic/rect.png", 3, 3, 0, 0);
                            cell.pivot(15, 15).pos(data.center.px, data.center.py);
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
            };
            MainView.prototype.onMapClick = function () {
                console.log("click");
            };
            return MainView;
        }(ui.test.MainViewUI));
        test.MainView = MainView;
        var point = /** @class */ (function () {
            function point(x, y) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                this.px = x;
                this.py = y;
            }
            point.prototype.init = function () {
                this.px = this.py = 0;
            };
            return point;
        }());
        var block = /** @class */ (function () {
            function block(typ, strength, arg, anger) {
                if (strength === void 0) { strength = 0; }
                if (arg === void 0) { arg = 0; }
                if (anger === void 0) { anger = 0; }
                this.sta = typ;
                this.arg = arg;
                this.strength = strength;
                this.strength = 0;
                this.anger = anger;
                this.center = new point();
            }
            block.prototype.setcenter = function (px, py) {
                if (!this.center) {
                    this.center = new point();
                }
                this.center.px = px;
                this.center.py = py;
            };
            block.prototype.draw = function () {
            };
            block.prototype.copy = function (tocopy) {
                this.sta = tocopy.sta;
                this.arg = tocopy.arg;
                this.strength = tocopy.strength;
                this.anger = tocopy.anger;
            };
            block.prototype.onClilide = function (myball) {
                switch (this.sta) {
                    case Shape.Circle:
                        var a = rect_len * size / 100 / 2;
                        var dxc = myball.center.px - this.center.px;
                        var dyc = myball.center.py - this.center.py;
                        if (Math.sqrt(Math.pow(dxc, 2) + Math.pow(dyc, 2)) < a + 8) {
                            this.strength--;
                            var an = Math.atan2(dyc, dxc) * 180 / Math.PI;
                            myball.anger = (2 * an - myball.anger + 540) % 360;
                            return 1;
                        }
                        break;
                    case Shape.Rect:
                        var module_l = Math.pow((myball.center.py - this.center.py), 2) + Math.pow((myball.center.px - this.center.px), 2);
                        module_l = Math.sqrt(module_l);
                        var angc = Math.atan2(myball.center.py - this.center.py, myball.center.px - this.center.px) - this.anger / 180 * Math.PI; //pi
                        var speed_ang = myball.anger - this.anger; //180
                        //rotate
                        var w = rect_len * size / 100;
                        var rx = module_l * Math.cos(angc), ry = module_l * Math.sin(angc);
                        var dx = Math.min(rx, w * 0.5);
                        var dx1 = Math.max(dx, -w * 0.5);
                        var dy = Math.min(ry, w * 0.5);
                        var dy1 = Math.max(dy, -w * 0.5);
                        if ((dx1 - rx) * (dx1 - rx) + (dy1 - ry) * (dy1 - ry) <= 8 * 8) {
                            this.strength--;
                            if (Math.abs(rx) < w / 2 - 2) {
                                speed_ang = (360 - speed_ang) % 360;
                                myball.anger = speed_ang + this.anger;
                                return 1;
                            }
                            if (Math.abs(ry) < w / 2 - 2) {
                                speed_ang = (540 - speed_ang) % 360;
                                myball.anger = speed_ang + this.anger;
                                return 1;
                            }
                            var ang1 = void 0;
                            if (rx > 0 && ry > 0) {
                                ang1 = Math.atan2(ry - w / 2 - 2, rx - w / 2 - 2) / Math.PI * 180;
                            }
                            else {
                                if (rx > 0 && ry < 0) {
                                    ang1 = Math.atan2(ry + w / 2 + 2, rx - w / 2 - 2);
                                }
                                else {
                                    if (rx < 0 && ry > 0) {
                                        ang1 = Math.atan2(ry - w / 2 - 2, rx + w / 2 + 2);
                                    }
                                    else {
                                        ang1 = Math.atan2(ry + w / 2 + 2, rx + w / 2 + 2);
                                    }
                                }
                            }
                            speed_ang = (2 * ang1 + 180 - speed_ang) % 360;
                            myball.anger = speed_ang + this.anger;
                            myball.next_pos();
                            return 1;
                        }
                        break;
                    case Shape.Add:
                        var wa = rect_len;
                        var rxa = myball.center.px - this.center.px, rya = myball.center.py - this.center.py;
                        var dxa = Math.min(rxa, wa * 0.5);
                        var dx1a = Math.max(dxa, -wa * 0.5);
                        var dya = Math.min(rya, wa * 0.5);
                        var dy1a = Math.max(dya, -wa * 0.5);
                        if ((dx1a - rxa) * (dx1a - rxa) + (dy1a - rya) * (dy1a - rya) <= 8 * 8) {
                            return 2;
                        }
                        break;
                    default:
                        break;
                }
                return 0;
            };
            return block;
        }());
        var ball = /** @class */ (function (_super) {
            __extends(ball, _super);
            function ball(cen, ang) {
                var _this = _super.call(this) || this;
                _this.label = null;
                _this.center = new point();
                if (typeof (cen) !== "undefined") {
                    _this.center.px = cen.px;
                    _this.center.py = cen.py;
                }
                if (typeof (ang) !== "undefined") {
                    _this.anger = ang;
                }
                else {
                    _this.anger = 0;
                }
                return _this;
            }
            ball.prototype.next_pos = function () {
                this.center.px += ballspeed * Math.cos(this.anger / 180 * Math.PI);
                this.center.py += ballspeed * Math.sin(this.anger / 180 * Math.PI);
            };
            return ball;
        }(Laya.Sprite));
    })(test = ui.test || (ui.test = {}));
})(ui || (ui = {}));
//# sourceMappingURL=MainView.js.map