var moduletank;
(function (moduletank) {
    var maxTankCount = 1000;
    var Tank = (function () {
        function Tank(texture) {
            var _this = this;
            this.sprite = new aphid.g2d.Sprite(texture);
            this.vx = Math.random() > 0.5 ? 0.1 : -0.1;
            this.vy = Math.random() > 0.5 ? 0.1 : -0.1;
            var winSize = aphid.g2d.director.winSize;
            this.sprite.position = new aphid.core.Point(Math.random() * winSize.width, Math.random() * winSize.height);
            this.sprite.scheduleUpdate();
            this.sprite.onframeupdate = function (target, interval) {
                var p = _this.sprite.position;
                p.x += interval * 1000 * _this.vx;
                p.y += interval * 1000 * _this.vy;
                var size = aphid.g2d.director.winSize;
                if(p.x < 0) {
                    p.x = 0;
                    _this.vx = -_this.vx;
                } else {
                    if(p.x > size.width) {
                        p.x = size.width;
                        _this.vx = -_this.vx;
                    }
                }
                if(p.y < 0) {
                    p.y = 0;
                    _this.vy = -_this.vy;
                } else {
                    if(p.y > size.height) {
                        p.y = size.height;
                        _this.vy = -_this.vy;
                    }
                }
                _this.sprite.position = p;
            };
        }
        return Tank;
    })();    
    var FPS = (function () {
        function FPS() {
            var _this = this;
            this.label = new aphid.g2d.LabelTTF("??.??");
            this.fpsCount = 0;
            this.lastTime = Date.now();
            this.label.position = new aphid.core.Point(100, 100);
            this.label.scheduleUpdate();
            this.label.onframeupdate = function (target, frameInterval) {
                _this.fpsCount++;
                var interval = Date.now() - _this.lastTime;
                if(interval >= 5000) {
                    _this.label.text = "" + (_this.fpsCount / interval * 1000).toFixed(2);
                    _this.fpsCount = 0;
                    _this.lastTime = Date.now();
                }
            };
        }
        return FPS;
    })();    
    function initialize() {
        var director = aphid.g2d.director;
        var scene = new aphid.g2d.Scene();
        var background = new aphid.g2d.Sprite(new aphid.g2d.Texture2D("background.png"));
        scene.addChild(background);
        var texture = new aphid.g2d.Texture2D("tank.png");
        var frames = [];
        var imgSize = texture.contentSize;
        for(var i = 0; i < 5; i++) {
            var frame = new aphid.g2d.SpriteFrame(texture, new aphid.core.Rect(imgSize.width * i / 5, 0, imgSize.width / 5, imgSize.height));
            frames.push(frame);
        }
        var animation = new aphid.g2d.Animation(frames, 0.05);
        var action = aphid.g2d.actions.repeatForever(aphid.g2d.actions.animate(animation, false));
        for(var i = 0; i < maxTankCount; i++) {
            var newTank = new Tank(frames[0].texture);
            newTank.sprite.runAction(action.copy());
            scene.addChild(newTank.sprite);
        }
        var fps = new FPS();
        scene.addChild(fps.label);
        director.runScene(scene);
    }
    moduletank.initialize = initialize;
})(moduletank || (moduletank = {}));
aphid.js.onload = moduletank.initialize;
