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
var Box = laya.ui.Box;
var Label = laya.ui.Label;
var ui;
(function (ui) {
    var test;
    (function (test) {
        var RankView = /** @class */ (function (_super) {
            __extends(RankView, _super);
            function RankView() {
                var _this = _super.call(this) || this;
                _this.rankListBtns = [
                    _this.BackBtn
                ];
                _this.ranklist = new Array();
                _this.Init();
                _this.Load();
                return _this;
            }
            RankView.prototype.Init = function () {
                while (this.ranklist.length !== 0) {
                    this.ranklist.pop();
                    continue;
                }
            };
            RankView.prototype.Load = function () {
                this.getList();
                this.RankList.repeatY = this.ranklist.length;
                this.RankList.array = this.ranklist;
                this.ranklist.map(console.log);
                this.RankList.renderHandler = new Laya.Handler(this, this.onListRender);
            };
            RankView.prototype.onListRender = function (cell, index) {
                if (index > this.RankList.array.length) {
                    return;
                }
                var data = this.RankList.array[index];
                var orderlabel = cell.getChildByName("OrderLabel");
                var namelabel = cell.getChildByName("NameLabel");
                var scorelabel = cell.getChildByName("ScoreLabel");
                if (orderlabel === null || namelabel === null || scorelabel === null) {
                    console.log("order :" + orderlabel);
                    console.log("name :" + namelabel);
                    console.log("score :" + scorelabel);
                    console.log("Label not exist!");
                    return;
                }
                namelabel.text = data.name;
                scorelabel.text = (data.score.toString());
                orderlabel.text = (data.order.toString());
            };
            RankView.prototype.getList = function () {
                this.ranklist.push(new RankData(1, 'xx', 10));
                this.ranklist.push(new RankData(2, 'xxx', 9));
                this.ranklist.push(new RankData(3, 'xxxx', 8));
            };
            return RankView;
        }(ui.test.RankViewUI));
        test.RankView = RankView;
        var RankData = /** @class */ (function () {
            function RankData(order, name, score) {
                this.order = order;
                this.name = name;
                this.score = score;
            }
            return RankData;
        }());
    })(test = ui.test || (ui.test = {}));
})(ui || (ui = {}));
//# sourceMappingURL=RankView.js.map