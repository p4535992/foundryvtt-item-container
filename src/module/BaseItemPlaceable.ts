import { ItemPlaceableData } from './ItemPlaceableData';
import { ItemPlaceableDocument } from './ItemPlaceableDocument';

/**
 * The ItemPlaceable embedded document model.
 * @extends Document
 * @memberof documents
 *
 * @param {object} data                     Initial data from which to construct the embedded document.
 * @property {data.ItemPlaceableData} data       The constructed data object for the embedded document.
 */
export class BaseItemPlaceable<Item, Scene> extends foundry.abstract.Document<ItemPlaceableData, ItemPlaceableDocument> {
  //  foundry.abstract.Document

  constructor(data?: any, context?: any) {
    super(data, context);
  }

  /** @inheritdoc */
  static get schema() {
    return ItemPlaceableData;
  }

  /** @inheritdoc */
  static get metadata() {
    return foundry.utils.mergeObject(super.metadata, {
      name: 'ItemPlaceable',
      collection: 'itemPlaceables',
      label: 'DOCUMENT.ItemPlaceable',
      isEmbedded: true,
    });
  }
}
