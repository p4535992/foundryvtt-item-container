import { ItemPlaceable } from './ItemPlaceable';
import { i18n } from '../main';
import { getGame } from './settings';
import { ItemPlaceableDocument } from './ItemPlaceableDocument';

/// Hook modifyDocument events
/// we need to hijack them and redirect the save location
export const hookModifyDocument = () => {
  //@ts-ignore
  const origDispatch = SocketInterface.prototype.constructor.dispatch;
  //@ts-ignore
  SocketInterface.prototype.constructor.dispatch = function (eventName, request) {
    if (eventName === 'modifyDocument' && request.type === 'ItemPlaceable') {
      return new Promise((resolve, reject) => {
        // parent scene
        const sceneId = request.parentId;
        const scene = <Scene>getGame().scenes?.find((scene) => scene.id === sceneId);

        // log and report error for unexpected behaviour for further investigation
        const reportError = (...args) => {
          console.error(...args);
          ui.notifications?.error(i18n('itemPlaceables.ui.messages.data-update-error'));
        };

        // process itemPlaceables events
        const itemPlaceables = <ItemPlaceable[]>foundry.utils.duplicate(scene.data.flags.itemPlaceables || []);
        const result: ItemPlaceable[] = [];

        if (request.action === 'create') {
          for (const entry of request.data) {
            const itemPlaceable = foundry.utils.duplicate(entry.data);
            // add new itemPlaceable with random ID
            itemPlaceable._id = foundry.utils.randomID(16);
            itemPlaceables.push(itemPlaceable);
            result.push(itemPlaceable);
          }
        } else if (request.action === 'update') {
          for (const update of request.updates) {
            const idx = itemPlaceables.findIndex((oldItemPlaceable) => oldItemPlaceable.id === update._id);
            if (idx < 0) {
              return reportError('missing itemPlaceable to update', update, itemPlaceables);
            }
            itemPlaceables[idx] = <ItemPlaceable>foundry.utils.mergeObject(itemPlaceables[idx], update);
            result.push(itemPlaceables[idx]);
          }
        } else if (request.action === 'delete') {
          for (const id of request.ids) {
            const idx = itemPlaceables.findIndex((oldItemPlaceable) => oldItemPlaceable.id === id);
            if (idx < 0) {
              return reportError('missing itemPlaceable to delete', id, itemPlaceables);
            }
            itemPlaceables.splice(idx, 1);
            result.push(id);
          }
        } else {
          return reportError('unknown request action', request.action);
        }

        // update itemPlaceables
        scene.update({ 'flags.itemPlaceables': itemPlaceables });

        // create fake backend response
        const response = { request, result, userId: getGame().userId };
        resolve(response);

        // send itemPlaceable update event
        getGame().socket?.emit('module.itemPlaceables', { eventName, data: response });
      });
    } else {
      return origDispatch.bind(this)(eventName, request);
    }
  };
};

export const handleModifyEmbeddedDocument = (response) => {
  // skip own events
  if (response.userId === getGame().userId) {
    return;
  }

  const db = CONFIG.DatabaseBackend;

  switch (response.request.action) {
    case 'create':
      //@ts-ignore
      db._handleCreateEmbeddedDocuments(response);
      break;
    case 'update':
      //@ts-ignore
      db._handleUpdateEmbeddedDocuments(response);
      break;
    case 'delete':
      //@ts-ignore
      db._handleDeleteEmbeddedDocuments(response);
      break;
  }
};
