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
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var test;
    (function (test) {
        var RestartDialog = /** @class */ (function (_super) {
            __extends(RestartDialog, _super);
            function RestartDialog(score) {
                var _this = _super.call(this) || this;
                _this.pos(Laya.stage.width / 2, Laya.stage.height / 2);
                _this.scorelabel.text = "Your Score: " + score.toString();
                _this.RestartBtn.on(Laya.Event.CLICK, null, function () {
                    _this.OnButtonRestart();
                });
                return _this;
            }
            RestartDialog.prototype.OnButtonRestart = function () {
                this.removeSelf();
                this.destroy();
            };
            return RestartDialog;
        }(ui.test.RestartDialogUI));
        test.RestartDialog = RestartDialog;
    })(test = view.test || (view.test = {}));
})(view || (view = {}));
//# sourceMappingURL=RestartDialog.js.map