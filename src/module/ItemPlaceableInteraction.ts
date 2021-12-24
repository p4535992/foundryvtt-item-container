import { ItemPlaceable } from './ItemPlaceable';
import { getCanvas, getGame } from './settings';

export const GMs = () => {
  return [...(<IterableIterator<User>>getGame().users?.values())]
    .filter((u: User) => u.active && u.isGM)
    .sort((a, b) => (<string>a.id).localeCompare(<string>b.id));
};

const isFirstGM = () => {
  return GMs().findIndex((u) => u.id === getGame().userId) === 0;
};

export const handleTokenSelectRequestPlayer = async (data) => {
  const { selectedItemPlaceableIds, targetSceneId, targetData, userId } = data;

  // ignore requests for other players
  if (userId !== getGame().userId) {
    return;
  }

  // find target scene
  // const targetScene = getGame().scenes?.find((scene) => scene.id === targetSceneId);
  // if (!targetScene) {
  //   console.warn('target scene not found', data);
  //   return;
  // }

  // switch to target scene
  // await targetScene.view();

  // TODO: we may do a premature select if the tokens aren't there yet
  // we then may end up with a different token selected

  // re-select itemPlaceables on target scene
  const targetItemPlaceables =
    //@ts-ignore
    getCanvas().itemPlaceable?.placeables.filter((token) => {
      selectedItemPlaceableIds.indexOf(token.id) >= 0;
    });
  for (const itemPlaceable of targetItemPlaceables) {
    itemPlaceable.control();
  }

  // pan to itemPlaceable target
  getCanvas().pan({ x: targetData.x, y: targetData.y });

  // call hook
  // TODO add click handler
  // Hooks.callAll('ItemPlaceableRender', data);
};
