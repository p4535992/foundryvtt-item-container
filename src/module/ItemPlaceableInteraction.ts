export const GMs = () => {
  return [...getGame().users.values()].filter((u) => u.active && u.isGM).sort((a, b) => a.id > b.id);
};

const isFirstGM = () => {
  return GMs().findIndex((u) => u.id === getGame().userId) === 0;
};

export const handleTokenSelectRequestPlayer = async (data) => {
  const { selectedTokenIds, targetSceneId, targetData, userId } = data;

  // ignore requests for other players
  if (userId !== getGame().userId) {
    return;
  }

  // find target scene
  const targetScene = getGame().scenes.find((scene) => scene._id === targetSceneId);
  if (!targetScene) {
    console.warn('target scene not found', data);
    return;
  }

  // switch to target scene
  await targetScene.view();

  // TODO: we may do a premature select if the tokens aren't there yet
  // we then may end up with a different token selected

  // re-select tokens on target scene
  const targetTokens = getCanvas().tokens.placeables.filter((token) => selectedTokenIds.indexOf(token.id) >= 0);
  for (const token of targetTokens) {
    token.control();
  }

  // pan to stairway target
  getCanvas().pan({ x: targetData.x, y: targetData.y });

  // call hook
  Hooks.callAll('StairwayTeleport', data);
};
