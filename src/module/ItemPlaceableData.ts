// import { fields } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/module.mjs';
import DocumentData from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/abstract/data.mjs';
import { ItemDataSchema } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/itemData';
import { ItemData } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/module.mjs';
import { ItemPlaceableDataSchema } from './ItemPlaceableDataSchema';

const fields = foundry.data.fields;

/**
 * The data schema for a ItemPlaceable embedded document.
 * @extends DocumentData
 * @memberof data
 * @see BaseItemPlaceable
 *
 * @param {object} data                   Initial data used to construct the data object
 * @param {BaseItemPlaceable} [document]       The embedded document to which this data object belongs
 *
 * @property {string} _id                 The _id which uniquely identifies this BaseItemPlaceable embedded document
 * @property {number} [x=0]               The x-coordinate position of the origin of the itemPlaceable
 * @property {number} [y=0]               The y-coordinate position of the origin of the itemPlaceable
 * @property {string} [scene]             Target (partner) scene id or `null` if current scene
 * @property {string} [name]              ItemPlaceable name (id for connection)
 * @property {string} [label]             ItemPlaceable label
 * @property {string} [fontFamily]        Label font family
 * @property {number} [fontSize]          Label font size
 * @property {string} [textColor]         Label text color
 * @property {string} [icon]              ItemPlaceable icon (image path) or `null` for default
 * @property {boolean} [disabled]         Disabled (locked on `true`)
 * @property {boolean} [hidden]           Hide from players (hidden on `true`)
 * @property {boolean} [animate]          Animate movement within scene (animate on `true`)
 */
export class ItemPlaceableData extends ItemData {
  // foundry.abstract.DocumentData

  /**
   * The default icon used for newly created Item documents
   * @defaultValue `"icons/svg/item-bag.svg"`
   */
  static DEFAULT_ICON: string;

  x;
  y;

  static defineSchema(): ItemPlaceableDataSchema {
    return {
      // Original itemdata
      _id: fields.DOCUMENT_ID,
      name: fields.REQUIRED_STRING,
      type: {
        type: <any>fields.STRING_FIELD,
        required: true,
        validate: (t: unknown) => true,
        validationError: 'The provided Item type must be in the array of types defined by the game system',
      },
      img: <any>'',
      data: <any>{}, // TODO
      effects: <any>{},
      folder: <any>{},
      sort: <any>fields.INTEGER_SORT_FIELD,
      permission: <any>fields.DOCUMENT_PERMISSIONS,
      flags: <any>fields.OBJECT_FIELD,
      // Added
      scene: <any>{
        _id: <any>'',
        required: false,
        nullable: true,
      },
      x: fields.REQUIRED_NUMBER,
      y: fields.REQUIRED_NUMBER,
      label: fields.STRING_FIELD,
      fontFamily: fields.STRING_FIELD,
      fontSize: fields.NONNEGATIVE_INTEGER_FIELD,
      textColor: fields.COLOR_FIELD,
      icon: fields.IMAGE_FIELD,
      disabled: fields.BOOLEAN_FIELD,
      hidden: fields.BOOLEAN_FIELD,
      animate: fields.BOOLEAN_FIELD,
    };
  }

  /** @inheritdoc */
  _initialize() {
    super._initialize();
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
  }
}
