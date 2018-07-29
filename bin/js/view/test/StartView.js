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
var ui;
(function (ui) {
    var test;
    (function (test) {
        var StartView = /** @class */ (function (_super) {
            __extends(StartView, _super);
            function StartView() {
                var _this = _super.call(this) || this;
                _this.StartButton.on(Laya.Event.CLICK, _this, _this.onStartClick);
                _this.RankButton.on(Laya.Event.CLICK, _this, _this.onRankClick);
                return _this;
            }
            StartView.prototype.onStartClick = function () {
                Laya.stage.removeChild(this);
                Laya.stage.addChild(new ui.test.MainView());
            };
            StartView.prototype.onRankClick = function () {
                Laya.stage.removeChild(this);
                Laya.stage.addChild(new ui.test.RankView());
            };
            return StartView;
        }(ui.test.StartViewUI));
        test.StartView = StartView;
    })(test = ui.test || (ui.test = {}));
})(ui || (ui = {}));
//# sourceMappingURL=StartView.js.map