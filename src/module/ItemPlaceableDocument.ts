import { BaseItemPlaceable } from './BaseItemPlaceable.js';

/**
 * The client-side ItemPlaceable embedded document which extends the common BaseItemPlaceable abstraction.
 * Each ItemPlaceable document contains ItemPlaceableData which defines its data schema.
 *
 * @extends abstract.Document
 * @extends abstract.BaseItemPlaceable
 * @extends ClientDocumentMixin
 *
 * @see {@link data.ItemPlaceableData}                 The ItemPlaceable data schema
 * @see {@link documents.Scene}                   The Scene document type which contains ItemPlaceable embedded documents
 * @see {@link applications.LightConfig}          The ItemPlaceable configuration application
 *
 * @param {data.ItemPlaceableData} [data={}]       Initial data provided to construct the ItemPlaceable document
 * @param {Scene} parent                The parent Scene document to which this ItemPlaceable belongs
 */
export class ItemPlaceableDocument extends CanvasDocumentMixin(BaseItemPlaceable) {}
