import { ItemPlaceableControlIcon } from './ItemPlaceableControlIcon';
import { GMs } from './ItemPlaceableInteraction';
import { getCanvas, getGame } from './settings';

/**
 * An icon representing a ItemPlaceable Control
 * @extends {PIXI.Container}
 */
export class ItemPlaceableControl extends PIXI.Container {
  itemPlaceable: any;
  label: any;
  icon: any;
  lockIcon: any;
  bg: any;
  border: any;

  constructor(itemPlaceable) {
    super();
    this.itemPlaceable = itemPlaceable;
    this.itemPlaceable.itemPlaceableControl = this;
  }

  /* -------------------------------------------- */

  /**
   * Draw the ItemPlaceableControl icon, displaying it's icon texture and border
   * @return {Promise<ItemPlaceableControl>}
   */
  async draw() {
    const scale = ItemPlaceableControlIcon.scale;
    const iconSize = ItemPlaceableControlIcon.iconSize;
    const borderSize = ItemPlaceableControlIcon.borderSize;
    const disabled = this.itemPlaceable.data.disabled === true;
    const hidden = this.itemPlaceable.data.hidden === true;

    // label
    this.label =
      this.label ||
      this.addChild(ItemPlaceableControlIcon.createLabel(this.itemPlaceable.label, this.itemPlaceable.labelTextStyle));
    this.label.text = this.itemPlaceable.label;
    this.label.style = this.itemPlaceable.labelTextStyle;

    // icon
    this.icon = this.icon || this.addChild(new PIXI.Sprite());
    this.icon.width = this.icon.height = iconSize;
    this.icon.texture = await loadTexture(this.itemPlaceable.icon);

    // lock icon
    this.lockIcon = this.lockIcon || this.addChild(new PIXI.Sprite());
    this.lockIcon.width = this.lockIcon.height = iconSize * 0.5;
    this.lockIcon.texture = await loadTexture('icons/svg/padlock.svg');
    this.lockIcon.visible = disabled && getGame().user?.isGM;
    this.lockIcon.position.set(iconSize * 0.5, iconSize * 0.5);

    // background
    this.bg = this.bg || this.addChild(new PIXI.Graphics());
    this.bg
      .clear()
      .beginFill(0x000000, 1.0)
      .drawRoundedRect(-2 * scale, -2 * scale, borderSize, borderSize, 5 * scale)
      .endFill();
    this.bg.alpha = 0;

    // border
    this.border = this.border || this.addChild(new PIXI.Graphics());
    this.border
      .clear()
      .lineStyle(1, 0xff5500, 0.8)
      .drawRoundedRect(-2 * scale, -2 * scale, borderSize, borderSize, 5 * scale)
      .endFill();
    this.border.visible = false;

    // control interactivity
    this.interactive = true;
    this.interactiveChildren = false;
    this.hitArea = new PIXI.Rectangle(-2 * scale, -2 * scale, borderSize, borderSize);

    // set position
    this.position.set(this.itemPlaceable.data.x - iconSize * 0.5, this.itemPlaceable.data.y - iconSize * 0.5);

    // set visibility
    this.alpha = hidden ? 0.5 : 1.0;

    // activate listeners
    this.removeAllListeners();
    this.on('mouseover', this._onMouseOver)
      .on('mouseout', this._onMouseOut)
      .on('mousedown', this._onMouseDown)
      .on('rightdown', this._onRightDown);

    // return the control icon
    return this;
  }

  /* -------------------------------------------- */

  /**
   * Determine whether the ItemPlaceableControl is visible to the calling user's perspective.
   * The control is always visible if the user is a GM and no Tokens are controlled.
   * @see {SightLayer#testVisibility}
   * @type {boolean}
   */
  get isVisible() {
    // hide itemPlaceable from players
    if (this.itemPlaceable.data.hidden === true) return getGame().user?.isGM;

    const data = this.itemPlaceable.data;
    const point = new PIXI.Point(data.x, data.y);
    return getCanvas().sight?.testVisibility(point, { tolerance: 2, object: this });
  }

  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  _onMouseOver(ev) {
    ev.stopPropagation();
    if (getGame().paused && !getGame().user?.isGM) return false;
    this.border.visible = true;
    this.bg.alpha = 0.25;
    //@ts-ignore
    getCanvas().itemPlaceables._hover = this.itemPlaceable;
  }

  /* -------------------------------------------- */

  _onMouseOut(ev) {
    ev.stopPropagation();
    if (getGame().paused && !getGame().user?.isGM) return false;
    this.border.visible = false;
    this.bg.alpha = 0;
    //@ts-ignore
    getCanvas().itemPlaceables._hover = null;
  }

  /* -------------------------------------------- */

  /**
   * Handle left mouse down events on the itemPlaceable control icon.
   * This should teleport selected tokens to the other itemPlaceable icon.
   * @param event
   * @private
   */
  async _onMouseDown(event) {
    event.stopPropagation();

    const selectedTokens = <Token[]>getCanvas().tokens?.controlled;

    // TODO DO SOMETHING
    /*

    // usage restrictions for players
    if (!getGame().user?.isGM) {
      // itemPlaceable is disabled
      if (this.itemPlaceable.data.disabled) {
        ui.notifications?.info(getGame().i18n.localize('itemPlaceables.ui.messages.disabled'))
        return false
      }

      // disallow usage for players if game is paused
      if (getGame().paused) {
        ui.notifications?.warn(getGame().i18n.localize('GAME.PausedWarning'))
        return false
      }

      // make sure at least one token is selected
      if (selectedTokens.length === 0) {
        ui.notifications?.info(getGame().i18n.localize('itemPlaceables.ui.messages.no-token-selected'))
        return false
      }
    }

    // target itemPlaceable + scene
    const { targetScene, targetData } = this.itemPlaceable.target

    // make sure we have a counter part of the itemPlaceable
    if (!targetData) {
      ui.notifications?.error(getGame().i18n.localize('itemPlaceables.ui.messages.no-partner'))
      return false
    }

    // collect required data for a teleport request
    const sourceData = this.itemPlaceable.data
    const sourceSceneId = getCanvas().scene?.id
    const selectedTokenIds = selectedTokens.map((token) => token.id)
    const targetSceneId = targetScene ? targetScene.id : null
    const data = { sourceSceneId, sourceData, selectedTokenIds, targetSceneId, targetData, userId: getGame().userId }

    // PreHook (can abort teleport)
    if (Hooks.call('PreItemPlaceableTeleport', data) === false) {
      return false
    }

    // teleport tokens across scenes
    if (targetSceneId !== null) {
      // preload target scene
      getGame().scenes?.preload(targetSceneId)

      if (getGame().user?.isGM) {
        if (selectedTokens.length > 0) {
          // do the teleport ourself
          await handleTeleportRequestGM(data)
          return false
        }
      } else {
        // missing GM for teleport
        if (GMs().length === 0) {
          ui.notifications?.error(getGame().i18n.localize('itemPlaceables.ui.messages.no-gm'))
          return false
        }

        // request teleport from a GM
        getGame().socket?.emit('module.itemPlaceables', { eventName: 'teleportRequestGM', data })
      }
    } else {
      // teleport/move tokens within scene (update position)
      const animate = this.itemPlaceable.data.animate === true
      const tokenData = selectedTokens.map(token => {
        return {
          _id: token.id,
          x: targetData.x - token.w / 2,
          y: targetData.y - token.h / 2
        }
      })
      await getCanvas().scene?.updateEmbeddedDocuments(Token.embeddedName, tokenData, { animate })

      // Hook
      Hooks.call('ItemPlaceableTeleport', data)
    }

    // GM pan to target
    if (selectedTokens.length === 0) {
      if (targetSceneId !== null) {
        await targetScene.view()
      }

      getCanvas().pan({ x: targetData.x, y: targetData.y })
    }
    */

    // event handled
    return false;
  }

  /* -------------------------------------------- */

  /**
   * Handle right mouse down events on the door control icon
   * This should toggle whether the door is LOCKED or CLOSED
   * @param event
   * @private
   */
  _onRightDown(event) {
    event.stopPropagation();
    if (!getGame().user?.isGM) return;

    const { originalEvent } = event.data;

    // disabled (right click)
    let attribute = 'disabled';
    if (originalEvent.altKey) {
      // hidden (alt + right click)
      attribute = 'hidden';
    }

    // toggle attribute state
    this.itemPlaceable.update({ [attribute]: !(this.itemPlaceable.data[attribute] === true) });
  }
}
