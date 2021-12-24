import { injectItemPlaceables } from './ItemPlaceableInjection';
import { handleTokenSelectRequestPlayer } from './ItemPlaceableInteraction';
import { getCanvas, getGame, ITEM_PLACEABLE_MODULE_NAME } from './settings';

export const readyHooks = async () => {
  //
};

export const initHooks = async () => {
  //
};

export const setupHooks = async () => {
  // inject itemPlaceable layer / embedded document in hardcoded places
  injectItemPlaceables();

  // redirect modifyDocument events for ItemPlaceable
  // hookModifyDocument()

  // handle own events
  getGame().socket?.on('module.itemPlaceables', (message) => {
    const { eventName, data } = message;

    // if (eventName === 'modifyDocument') {
    //   handleModifyEmbeddedDocument(data)
    // }
    if (eventName === 'tokenSelectRequestPlayer') {
      handleTokenSelectRequestPlayer(data);
    } else {
      console.error('unknown eventName:', eventName, data);
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
  for (const sw of getCanvas().controls?.itemPlaceables.children) {
    sw.visible = !sightLayer.tokenVision || sw.isVisible;
  }
});
