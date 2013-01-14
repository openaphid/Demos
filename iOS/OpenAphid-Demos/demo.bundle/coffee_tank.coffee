moduletank = {}

moduletank.maxTankCount = 1000

class moduletank.Tank
  constructor : (texture) ->
    @sprite = new aphid.g2d.Sprite(texture)
    @vx = if Math.random() > 0.5 then 0.1 else -0.1
    @vy = if Math.random() > 0.5 then 0.1 else -0.1

    winSize = aphid.g2d.director.winSize
    @sprite.position = new aphid.core.Point(Math.random() * winSize.width, Math.random() * winSize.height)
    
    @sprite.scheduleUpdate()
    #Use CoffeeScript's fat arrow syntax for easy function binding
    @sprite.onframeupdate = (target, interval) =>
      p = @sprite.position
      p.x += interval * 1000 * @vx
      p.y += interval * 1000 * @vy
      size = aphid.g2d.director.winSize

      if p.x < 0
        p.x = 0
        @vx = -@vx
      else if p.x > size.width
        p.x = size.width
        @vx = -@vx

      if p.y < 0
        p.y = 0
        @vy = -@vy
      else if p.y > size.height
        p.y = size.height
        @vy = -@vy

      @sprite.position = p

  getSprite : () -> @sprite

class moduletank.FPS
  constructor : () ->
    @label = new aphid.g2d.LabelTTF("??.??")
    @label.position = new aphid.core.Point(100, 100)
    @fpsCount = 0
    @lastTime = Date.now()

    @label.scheduleUpdate()
    #Use CoffeeScript's fat arrow syntax for easy function binding
    @label.onframeupdate = (target, frameInterval) =>
      @fpsCount++
      interval = Date.now() - @lastTime
      if interval > 5000
        @label.text = "" + (@fpsCount / interval * 1000).toFixed(2)
        @fpsCount = 0
        @lastTime = Date.now()

  getLabel : () -> @label

moduletank.initialize = () ->
  director = aphid.g2d.director

  scene = new aphid.g2d.Scene()

  background = new aphid.g2d.Sprite(new aphid.g2d.Texture2D("background.png"))
  scene.addChild(background)

  texture = new aphid.g2d.Texture2D("tank.png")
  imgSize = texture.contentSize

  frames = (
    new aphid.g2d.SpriteFrame(texture, new aphid.core.Rect(imgSize.width * i / 5, 0, imgSize.width / 5, imgSize.height)) for i in [0..4]
    )

  animation = new aphid.g2d.Animation(frames, 0.05)
  action = aphid.g2d.actions.repeatForever(
    aphid.g2d.actions.animate(animation, false)
    )

  for i in [1..moduletank.maxTankCount]
    tank = new moduletank.Tank(frames[0].texture)
    tank.getSprite().runAction(action.copy())
    scene.addChild(tank.getSprite())

  fps = new moduletank.FPS()
  scene.addChild(fps.getLabel())

  director.runScene(scene)

aphid.js.onload = moduletank.initialize