import { ItemPlaceableControl } from './ItemPlaceableControl';
import { ItemPlaceableControlIcon } from './ItemPlaceableControlIcon';
import { getCanvas, getGame } from './settings';

/**
 * An ItemPlaceable is an implementation of PlaceableObject
 * @extends {PlaceableObject}
 */
export class ItemPlaceable extends PlaceableObject {
  /**
   * A reference to the ControlIcon used to configure this itemPlaceable
   * @type {ItemPlaceableControlIcon}
   */
  controlIcon: ItemPlaceableControlIcon;
  // static connectionTarget = {};
  otherPlaceable;
  nonMonogamous;
  _original;
  master;

  line;
  lockIcon;
  color;

  itemPlaceableControl: ItemPlaceableControl;

  /* -------------------------------------------- */

  /** @inheritdoc */
  // TODO: wait for https://github.com/tc39/proposal-static-class-features
  // static embeddedName = 'ItemPlaceable'

  // static setConnectionTarget(name = 'ip-' + utils.randomID(8), scene = getCanvas().scene?.id) {
  //   const connectionTarget = (ItemPlaceable.connectionTarget = { scene, name });
  //   return connectionTarget;
  // }

  // static resetConnectionTarget() {
  //   ItemPlaceable.connectionTarget = {};
  // }

  get icon(): PIXI.Sprite {
    return <PIXI.Sprite>this.data.icon;
  }

  get iconSrc(): string {
    return <string>this.data.iconSrc;
  }

  get label() {
    return typeof this.data.label === 'string' ? this.data.label : '';
  }

  /* -------------------------------------------- */

  /**
   * Determine if itemPlaceable is on current scene
   * @return {boolean}
   */
  get onScene() {
    return this.data.scene === null || this.data.scene === getCanvas().scene?.id;
  }

  /* -------------------------------------------- */

  // /**
  //  * Determine itemPlaceable status and icon tint
  //  * @return {Object}
  //  */
  // get status() {
  //   const { targetScene, targetData } = this.target;
  //   let background = 0x000000;
  //   let border = 0x000000;
  //   let name = 'connected';

  //   if (!this.onScene) {
  //     background = 0x000080;
  //   }

  //   // on other scene
  //   if (targetScene) {
  //     if (!targetData) {
  //       // missing partner on target scene
  //       name = 'no-partner-other-scene';
  //       border = 0xffbf00;
  //     }
  //   } else if (!this.otherPlaceable) {
  //     // missing partner on this scene
  //     name = 'no-partner';
  //     border = 0xffbf00;
  //   }

  //   if (this.nonMonogamous) {
  //     // has more than one partner
  //     name = 'non-monogamous';
  //     border = 0xde3264;
  //   }

  //   // status color for configuration sheet
  //   const config = `#${(border !== 0x000000 ? border : background).toString(16)}`;

  //   return { name: `itemPlaceables.ui.status.${name}`, color: { background, border, config } };
  // }

  // /**
  //  * Determine itemPlaceable render state
  //  * @return {String}
  //  */
  // get renderState() {
  //   // determine render state
  //   let renderState;
  //   if (this._original && this._original.otherPlaceable) {
  //     // we are a clone for an ongoing move action
  //     renderState = 'move';
  //   } else if (this.otherPlaceable) {
  //     if (this.master) {
  //       renderState = 'master';
  //     } else {
  //       renderState = 'slave';
  //     }
  //   } else {
  //     // no partner no line
  //     renderState = null;
  //   }

  //   return renderState;
  // }

  // /**
  //  * Find itemPlaceable target scene
  //  * @return {Object}
  //  */
  // get targetScene() {
  //   if (this.onScene) {
  //     return null;
  //   } else {
  //     // find target scene
  //     return getGame().scenes?.find((scene) => scene.id === this.data.scene);
  //   }
  // }

  // /**
  //  * Find itemPlaceable target scene and target
  //  * @return {Object}
  //  */
  // get target() {
  //   // itemPlaceable has partner on this scene
  //   if (this.otherPlaceable) {
  //     return { targetScene: null, targetData: this.otherPlaceable.data };
  //   }

  //   // itemPlaceable has a target scene
  //   const targetScene = <Scene>this.targetScene;
  //   if (targetScene) {
  //     // find itemPlaceable with matching name
  //     //@ts-ignore
  //     const others = (targetScene.data.flags.itemPlaceables || []).filter((other) => this.data.name === other.name);

  //     if (others.length === 1) {
  //       // itemPlaceable has target scene and partner
  //       this.nonMonogamous = false;
  //       return { targetScene, targetData: others[0] };
  //     } else if (others.length > 1) {
  //       // sanity check failed
  //       this.nonMonogamous = true;
  //       console.warn('This itemPlaceable is in a non-monogamous relationship!');
  //       console.log(this, others);
  //     }

  //     // itemPlaceable has target scene but partner wasn't found
  //     return { targetScene, targetData: null };
  //   }

  //   // itemPlaceable is missing partner and target scene (either itemPlaceable is on this scene or scene missing)
  //   return { targetScene: null, targetData: null };
  // }

  // /**
  //  * Is this the connection target for a new itemPlaceable
  //  * @return {boolean}
  //  */
  // get isConnectionTarget() {
  //   if (ItemPlaceable.connectionTarget) {
  //     const { scene, name } = ItemPlaceable.connectionTarget;
  //     return scene === getCanvas().scene?.id && name === this.data.name;
  //   }

  //   return false;
  // }

  /* -------------------------------------------- */

  /**
   * Define a PIXI TextStyle object which is used for the label text
   * @returns {PIXI.TextStyle}
   */
  get labelTextStyle() {
    const style = <any>CONFIG.canvasTextStyle.clone();

    // alignment
    style.align = 'center';

    // font preferences
    style.fontFamily = this.data.fontFamily;
    style.fontSize = this.data.fontSize;

    // toggle stroke style depending on whether the text color is dark or light
    const color = <number>this.data.textColor ? <number>foundry.utils.colorStringToHex(this.data.textColor) : 0xffffff;
    const hsv = foundry.utils.rgbToHsv(...foundry.utils.hexToRGB(color));
    style.fill = color;
    style.strokeThickness = Math.max(Math.round(style.fontSize / 12), 2);
    style.stroke = hsv[2] > 0.6 ? 0x111111 : 0xeeeeee;

    // drop shadow
    style.dropShadow = true;
    style.dropShadowColor = style.stroke;
    style.dropShadowBlur = Math.max(Math.round(style.fontSize / 6), 4);
    style.dropShadowAngle = 0;
    style.dropShadowDistance = 0;

    return style;
  }

  /* -------------------------------------------- */

  /** @override */
  get bounds() {
    return new NormalizedRectangle(this.data.x, this.data.y, 1, 1);
  }

  /* -------------------------------------------- */
  /* Rendering
  /* -------------------------------------------- */

  /** @override */
  clear() {
    if (this.controlIcon) {
      this.controlIcon.parent.removeChild(this.controlIcon).destroy();
      this.controlIcon = new ItemPlaceableControlIcon();
    }
    super.clear();
    return this;
  }

  /** @override */
  async draw() {
    // create containers
    this.clear();
    this.line = this.addChild(new PIXI.Graphics());
    this.controlIcon = this.addChild(
      new ItemPlaceableControlIcon({
        label: this.label,
        textStyle: this.labelTextStyle,
        texture: this.iconSrc, //this.icon,
      }),
    );
    this.lockIcon = this.addChild(new PIXI.Sprite());

    // Initial rendering
    this.refresh();
    if (this.id) this.activateListeners();
    return this;
  }

  /* -------------------------------------------- */

  /** @override */
  refresh() {
    return this;
  }
  // /** @override */
  // refresh(): this {
  //   // update state
  //   this.position.set(this.data.x, this.data.y);
  //   this.updateOtherPlaceable();
  //   // this.updateConnectionTarget();
  //   this.updateMaster();

  //   // clear old line
  //   this.line.clear();

  //   // draw line when master or during move
  //   const renderState = this.renderState;
  //   if (renderState === 'master' || renderState === 'move') {
  //     // clear slave line
  //     if (renderState === 'master') {
  //       this.otherPlaceable.line.clear();
  //     }

  //     // draw connection line
  //     this.line
  //       .lineStyle(3, this.data.animate ? 0xccccff : 0x9fe2bf)
  //       .moveTo(0, 0)
  //       .lineTo(this.otherPlaceable.data.x - this.data.x, this.otherPlaceable.data.y - this.data.y);

  //     // set other itemPlaceable in front of us (and therfore the line)
  //     // TODO: this is not working for 'move' as those itemPlaceables are stored in this.layer.preview
  //     this.zIndex = -1;
  //     this.otherPlaceable.zIndex = 1;
  //   } else if (renderState === 'slave') {
  //     // trigger master update
  //     this.otherPlaceable.refresh();
  //   }

  //   // update icon tint
  //   const { background, border } = this.status.color;
  //   this.controlIcon.tint = this.data.disabled === true ? 0x999999 : 0x000000;
  //   this.controlIcon.typeColor = background;
  //   this.controlIcon.statusColor = border;
  //   this.controlIcon.draw();

  //   // lock icon
  //   this.lockIcon.width = this.lockIcon.height = ItemPlaceableControlIcon.iconSize * 0.5;
  //   this.lockIcon.texture = await loadTexture('icons/svg/padlock.svg');

  //   // Update visibility
  //   this.alpha = this.data.hidden === true ? 0.5 : 1.0;
  //   this.line.visible = this.layer._active;
  //   this.lockIcon.visible = this.layer._active && this.data.disabled === true;
  //   this.controlIcon.visible = this.layer._active;
  //   this.controlIcon.border.visible = this._hover || this.isConnectionTarget;

  //   return this;
  // }

  /* -------------------------------------------- */

  // updateOtherPlaceable() {
  //   // partner on other scene
  //   if (this.otherPlaceable || !this.onScene) {
  //     return;
  //   }

  //   if (this.otherPlaceable === false) {
  //     // partner is beeing deleted, skip search
  //     this.otherPlaceable = null;
  //   } else if (!this._original) {
  //     // find partner in same scene, ignore move clones
  //     const others = getCanvas().itemPlaceables.placeables.filter(
  //       (other) => other.onScene && !other._original && this.data.name === other.data.name && this !== other,
  //     );

  //     if (others.length === 1) {
  //       // found partner
  //       const otherPlaceable = others[0];
  //       this.nonMonogamous = false;

  //       // link itemPlaceables
  //       this.otherPlaceable = otherPlaceable;
  //       otherPlaceable.otherPlaceable = this;

  //       // update other
  //       // needed to remove isTarget highlight
  //       otherPlaceable.refresh();
  //     } else if (others.length > 1) {
  //       // sanity check failed
  //       this.nonMonogamous = true;
  //       console.warn('This itemPlaceable is in a non-monogamous relationship!');
  //       console.log(this, others);
  //     }
  //   } else if (this._original.otherPlaceable) {
  //     // use original other
  //     this.otherPlaceable = this._original.otherPlaceable;
  //   }
  // }

  /* -------------------------------------------- */

  // resetOtherPlaceable() {
  //   // unset this from other, update other
  //   if (this.otherPlaceable) {
  //     this.otherPlaceable.otherPlaceable = false;
  //     this.otherPlaceable.refresh();
  //     this.otherPlaceable = null;
  //   }
  // }

  /* -------------------------------------------- */

  // updateMaster() {
  //   if (this.otherPlaceable) {
  //     // be master when highlighted or when master is unclaimed
  //     if (this._hover || !this.otherPlaceable.master) {
  //       this.master = true;
  //       this.otherPlaceable.master = false;
  //     }
  //   }
  // }

  /* -------------------------------------------- */

  // updateConnectionTarget() {
  //   if (this.isConnectionTarget) {
  //     // if we already have a partner or the partner is on another scene
  //     if (this.otherPlaceable || this.nonMonogamous || !this.onScene) {
  //       // then clear connection target
  //       // this can happen when itemPlaceable is edited manually
  //       ItemPlaceable.resetConnectionTarget();
  //     }
  //   } else if (!this.otherPlaceable && this.onScene && !this.nonMonogamous && !ItemPlaceable.connectionTarget) {
  //     // there is no connection target and we no longer have a partner
  //     // make ourself the new connection target
  //     ItemPlaceable.setConnectionTarget(this.data.name);
  //   }
  // }

  /* -------------------------------------------- */

  /** @override */
  destroy(...args) {
    if (this.itemPlaceableControl) this.itemPlaceableControl.destroy({ children: true });
    super.destroy(...args);
  }

  /* -------------------------------------------- */
  /*  Socket Listeners and Handlers               */
  /* -------------------------------------------- */

  /** @override */
  _onCreate(data, options, userId) {
    super._onCreate(data, options, userId);
    //@ts-ignore
    getCanvas().controls?.createItemPlaceableControl(this);

    // const { targetScene, targetData } = this.target;
    // if (targetData) {
    //   // sync partner animate option
    //   const data = { animate: this.data.animate, scene: '' };

    //   // if partner is on another scene, update partner with our scene id
    //   if (targetScene) {
    //     data.scene = <string>getCanvas().scene?.id;
    //   }

    //   (targetScene || getCanvas().scene).updateEmbeddedDocuments('ItemPlaceable', [{ _id: targetData._id, ...data }]);
    // }

    // update sight when new itemPlaceable was added
    //@ts-ignore
    getCanvas().addPendingOperation('SightLayer.refresh', getCanvas().sight?.refresh, getCanvas().sight, {});
  }

  /* -------------------------------------------- */

  /** @override */
  _onUpdate(data, ...args) {
    super._onUpdate(data, ...args);

    // update partner animate option
    // const { targetScene, targetData } = this.target;
    // if (targetData) {
    //   const scene = targetScene || getCanvas().scene;
    //   const _id = targetData._id;

    //   scene.updateEmbeddedDocuments('ItemPlaceable', [{ _id, animate: data.animate }]);
    // }

    // refresh drawables / other connection
    if (this.itemPlaceableControl) this.itemPlaceableControl.draw();
    // this.resetOtherPlaceable();
    this.refresh();

    // update sight when itemPlaceable was updated
    //@ts-ignore
    getCanvas().addPendingOperation('SightLayer.refresh', getCanvas().sight.refresh, getCanvas().sight);
  }

  /** @override */
  _onDelete(options, userId) {
    // unset itemPlaceable connection target
    // if (this.isConnectionTarget) {
    //   ItemPlaceable.resetConnectionTarget();
    // }

    // this.resetOtherPlaceable();
    super._onDelete(options, userId);
  }

  /* -------------------------------------------- */

  /** @override */
  _canHUD(user, event) {
    return true;
  }

  /* -------------------------------------------- */

  /** @override */
  async _onClickRight(event) {
    // const { targetScene, targetData } = this.target;
    // // view target scene
    // if (targetScene) {
    //   await targetScene.view();
    // }
    // // pan to target itemPlaceable
    // if (targetData) {
    //   getCanvas().animatePan({ x: targetData.x, y: targetData.y });
    // }
  }
}

// TODO: wait for https://github.com/tc39/proposal-static-class-features
ItemPlaceable.embeddedName = 'ItemPlaceable';
