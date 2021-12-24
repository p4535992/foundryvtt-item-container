import { ItemPlaceableDocument } from './ItemPlaceableDocument';
import { ItemPlaceableData } from './ItemPlaceableData';
import { injectItemPlaceables } from './ItemPlaceableInjection';
import { handleTokenSelectRequestPlayer } from './ItemPlaceableInteraction';
import { getCanvas, getGame, ITEM_PLACEABLE_MODULE_NAME } from './settings';
import { error } from '../main';
import { handleModifyEmbeddedDocument, hookModifyDocument } from './ItemPlaceableManager';

export const readyHooks = async () => {
  //
  // https://github.com/ruipin/fvtt-lib-wrapper/#134-shim
  // Note: Don't simply pass in the function onCanvasDrop, or you lose 'this' referring to Droppable
  //@ts-ignore
  libWrapper.register(ITEM_PLACEABLE_MODULE_NAME, 'Canvas.prototype._onDrop', function (wrapper, ...args) {
    _onCanvasDrop(wrapper, ...args);
  });
};

export const initHooks = async () => {
  //
};

export const setupHooks = async () => {
  // inject itemPlaceable layer / embedded document in hardcoded places
  injectItemPlaceables();

  // redirect modifyDocument events for ItemPlaceable
  hookModifyDocument();

  // handle own events
  getGame().socket?.on('module.itemPlaceables', (message) => {
    const { eventName, data } = message;

    if (eventName === 'modifyDocument') {
      handleModifyEmbeddedDocument(data);
    } else if (eventName === 'tokenSelectRequestPlayer') {
      handleTokenSelectRequestPlayer(data);
    } else {
      error('unknown eventName:', eventName, data);
    }
  });
};

// Hooks.on('getSceneControlButtons', (controls) => {
//   if (!getGame().user?.isGM) return;
//   injectControls(controls);
// });

Hooks.on('sightRefresh', (sightLayer) => {
  // ItemPlaceable Icons
  //@ts-ignore
  for (const ip of getCanvas().controls?.itemPlaceables.children) {
    ip.visible = !sightLayer.tokenVision || ip.isVisible;
  }
});

/**
 * This function is called when something is dropped onto the canvas. If the
 * item dropped onto the canvas is a folder, it is handled here. Otherwise,
 * the original wrapper function is used.
 *
 * @param {fn} wrapper - The original onDrop function
 * @param  {...any} args - Any arguments provided with the original onDrop function
 */
function _onCanvasDrop(wrapper, ...args) {
  try {
    const [event] = args;
    //const data = this._getDataFromEvent(event);
    const data = JSON.parse(event.dataTransfer.getData('text/plain'));

    if (data.documentName === 'ItemPlaceable') {
      const item = <Item>getGame().items?.get(data.id);
      const topLeft = _translateToTopLeftGrid(event);
      const xPosition = topLeft[0];
      const yPosition = topLeft[1];
      const isHidden = <boolean>event.altKey;
      const elevation = NaN;
      return _dropItem(item, xPosition, yPosition, isHidden, elevation);
    } else {
      wrapper(...args);
      return;
    }
  } catch (error) {
    ui.notifications?.error(`${ITEM_PLACEABLE_MODULE_NAME} | Can't drop item`);
    wrapper(...args);
    return;
  }
}

async function _dropItem(item: Item, xPosition: number, yPosition: number, isHidden: boolean, elevation: number) {
  //@ts-ignore
  const itemPlaceableData = <ItemPlaceableData>item.data.itemPlaceable.toJSON();

  itemPlaceableData.x = xPosition;
  itemPlaceableData.y = yPosition;

  itemPlaceableData.hidden = <boolean>isHidden;

  if (elevation) {
    itemPlaceableData.elevation = elevation;
  }

  // TODO add randomize images like on token
  // if (itemPlaceableData.randomImg) {
  //   const images = await item.getTokenImages();
  //   const image = images[Math.floor(Math.random() * images.length)];
  //   itemPlaceableData.img = image;
  // }

  //@ts-ignore
  return ItemPlaceableDocument.create(itemPlaceableData, { parent: getCanvas().scene });
}

function _translateToTopLeftGrid(event): PointArray {
  const transform = <PIXI.Matrix>getCanvas().tokens?.worldTransform;
  const tx = (event.clientX - transform.tx) / <number>getCanvas().stage?.scale.x;
  const ty = (event.clientY - transform.ty) / <number>getCanvas().stage?.scale.y;

  return <PointArray>getCanvas().grid?.getTopLeft(tx, ty);
}
