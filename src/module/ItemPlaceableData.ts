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
export class ItemPlaceableData extends foundry.abstract.DocumentData {
  static defineSchema() {
    return {
      _id: fields.DOCUMENT_ID,
      scene: {
        ...fields.DOCUMENT_ID,
        required: false,
        nullable: true,
      },
      name: fields.REQUIRED_STRING,
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
