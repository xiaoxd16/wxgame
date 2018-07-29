var test_module = ui.test;
var Handler = Laya.Handler;
var Loader = Laya.Loader;
var WebGL = Laya.WebGL;
//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(600, 400, WebGL);
///激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);
function beginLoad() {
    Laya.loader.load("res/atlas/comp.atlas", Handler.create(null, onLoaded));
}
function onLoaded() {
    //实例UI界面
    Laya.stage.scaleMode = Laya.Stage.SCALE_NOSCALE;
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
    Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
    var startUI = new test_module.StartView();
    Laya.stage.removeChildren();
    Laya.stage.addChild(startUI);
}
//# sourceMappingURL=LayaUISample.js.map