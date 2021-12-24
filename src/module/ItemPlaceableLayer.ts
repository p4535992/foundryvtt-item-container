import { error, i18n } from '../main';
import { ItemPlaceable } from './ItemPlaceable';
import { ItemPlaceableDocument } from './ItemPlaceableDocument';
import { getGame, getCanvas } from './settings';

// Between WallsLayer (40), TemplateLayer (50), TokenLayer (100)
const ITEM_PLACEABLE_LAYER_ZINDEX = 101;

TokenLayer
/**
 * The ItemPlaceable Layer which displays itemPlaceable icons within the rendered Scene.
 * @extends {PlaceablesLayer}
 */
//@ts-ignore
export class ItemPlaceableLayer extends PlaceablesLayer {
  /** @inheritdoc */
  // TODO: wait for https://github.com/tc39/proposal-static-class-features
  // static documentName = 'ItemPlaceable'

  _animate: boolean;
  _disabled: boolean;
  _hidden: boolean;
  options: any;
  gridPrecision: number;

  /** @override */
  static get layerOptions() {
    return foundry.utils.mergeObject(super.layerOptions, {
      name: 'itemPlaceables',
      canDragCreate: false,
      canDelete: getGame().user?.isGM,
      controllableObjects: false,
      rotatableObjects: false,
      snapToGrid: true,
      gridPrecision: 2,
      zIndex: ITEM_PLACEABLE_LAYER_ZINDEX,
    });
  }

  /* -------------------------------------------- */

  // static getConnectionTarget () {
  //   // name of itemPlaceable (used for connection)
  //   let connectionTarget

  //   if (ItemPlaceable.connectionTarget) {
  //     // use name and scene of connection target
  //     connectionTarget = ItemPlaceable.connectionTarget
  //     ItemPlaceable.resetConnectionTarget()
  //   } else {
  //     // auto generate new name, set current scene
  //     connectionTarget = foundry.utils.duplicate(ItemPlaceable.setConnectionTarget())
  //   }

  //   // don't use a specific scene if both itemPlaceables are on the same scene
  //   if (connectionTarget.scene === canvas.scene.id) {
  //     connectionTarget.scene = null
  //   }

  //   return connectionTarget
  // }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /** @override */
  _onClickLeft(event) {
    super._onClickLeft(event);

    // snap the origin to grid when shift isn't pressed
    const { originalEvent } = event.data;
    if (this.options.snapToGrid && !originalEvent.isShift) {
      const { origin } = event.data;
      event.data.origin = getCanvas().grid?.getSnappedPosition(origin.x, origin.y, this.gridPrecision);
    }

    // position
    const { origin } = event.data;

    // get options from layer control
    // `animate` should be synced with partner
    const animate = this._animate === true;
    const disabled = this._disabled === true;
    const hidden = this._hidden === true;

    // // create new itemPlaceable
    // const doc = new ItemPlaceableDocument({ ...ItemPlaceableLayer.getConnectionTarget(), disabled, hidden, animate, x: origin.x, y: origin.y }, { parent: canvas.scene })
    // const itemPlaceable = new ItemPlaceable(doc)
    // const cls = getDocumentClass(this.constructor.documentName)
    // cls.create(itemPlaceable.data.toObject(false), { parent: canvas.scene })

    // itemPlaceable.draw()

    // TODO do something ?
  }

  /* -------------------------------------------- */

  static onPasteItemPlaceable(_copy, toCreate) {
    // only one itemPlaceable should be pasteable at once, warn if we got more
    if (toCreate.length > 1) {
      error('more then one itemPlaceable was pasted', _copy, toCreate);
      ui.notifications?.error(i18n('itemPlaceables.ui.messages.internal-error'));
    }

    // set correct connection target on paste
    // for (const itemPlaceable of toCreate) {
    //   const connectionTarget = ItemPlaceableLayer.getConnectionTarget()
    //   for (const key in connectionTarget) {
    //     itemPlaceable[key] = connectionTarget[key]
    //   }
    // }
  }

  /* -------------------------------------------- */

  /** @override */
  _onDragLeftStart(...args) {
    //
  }

  /* -------------------------------------------- */

  /** @override */
  _onDragLeftMove(...args) {
    //
  }

  /* -------------------------------------------- */

  /** @override */
  _onDragLeftCancel(...args) {
    //
  }
}

// TODO: wait for https://github.com/tc39/proposal-static-class-features
//@ts-ignore
ItemPlaceableLayer.documentName = 'ItemPlaceable';
