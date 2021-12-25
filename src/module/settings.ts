import { log } from "../main";


export const ITEM_PLACEABLE_MODULE_NAME = 'foundryvtt-item-placeable';

/**
 * Because typescript doesn't know when in the lifecycle of foundry your code runs, we have to assume that the
 * canvas is potentially not yet initialized, so it's typed as declare let canvas: Canvas | {ready: false}.
 * That's why you get errors when you try to access properties on canvas other than ready.
 * In order to get around that, you need to type guard canvas.
 * Also be aware that this will become even more important in 0.8.x because no canvas mode is being introduced there.
 * So you will need to deal with the fact that there might not be an initialized canvas at any point in time.
 * @returns
 */
export function getCanvas(): Canvas {
  if (!(canvas instanceof Canvas) || !canvas.ready) {
    throw new Error('Canvas Is Not Initialized');
  }
  return canvas;
}
/**
 * Because typescript doesn't know when in the lifecycle of foundry your code runs, we have to assume that the
 * canvas is potentially not yet initialized, so it's typed as declare let canvas: Canvas | {ready: false}.
 * That's why you get errors when you try to access properties on canvas other than ready.
 * In order to get around that, you need to type guard canvas.
 * Also be aware that this will become even more important in 0.8.x because no canvas mode is being introduced there.
 * So you will need to deal with the fact that there might not be an initialized canvas at any point in time.
 * @returns
 */
export function getGame(): Game {
  if (!(game instanceof Game)) {
    throw new Error('Game Is Not Initialized');
  }
  return game;
}

export const registerSettings = function () {
  //
};


// /**
//  * This function is called when something is dropped onto the canvas. If the
//  * item dropped onto the canvas is a folder, it is handled here. Otherwise,
//  * the original wrapper function is used.
//  *
//  * @param {fn} wrapper - The original onDrop function
//  * @param  {...any} args - Any arguments provided with the original onDrop function
//  */
// export const CanvasPrototypeOnDropHandler = function (wrapper, ...args) {
//   try {
//     const [event] = args;
//     // Get data from event
//     const data = JSON.parse(event.dataTransfer.getData('text/plain'));
//     dropCanvasHandler(getCanvas(), data);
//     return wrapper(...args);
//   } catch (error) {
//     return wrapper(...args);
//   }
// };

// /**
//  * Handler for the dropCanvasData Foundry hook. This is used
//  * in Foundry 0.7.0 and above
//  * @param canvas
//  * @param dropData
//  */
// export const dropCanvasHandler = async (canvas, dropData) => {
//   log(` dropCanvasData | called with args:`);
//   log(canvas, dropData);

//   if (dropData.type === 'Item') {
//     handleItemDropped(await normalizeDropData(dropData));
//   }
// };