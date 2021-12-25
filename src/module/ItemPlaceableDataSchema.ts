import { ItemDataSchema } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/itemData';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ItemPlaceableDataSchema extends ItemDataSchema {
  // _id: typeof fields.DOCUMENT_ID;
  // name: typeof fields.REQUIRED_STRING;
  // type: DocumentField<string> & {
  //   type: typeof String;
  //   required: true;
  //   validate: (t: unknown) => boolean;
  //   validationError: 'The provided Item type must be in the array of types defined by the game system';
  // };
  // img: FieldReturnType<typeof fields.IMAGE_FIELD, { default: () => string }>;
  // data: FieldReturnType<typeof fields.OBJECT_FIELD, { default: (data: { type: string }) => any }>; // TODO
  // effects: fields.EmbeddedCollectionField<typeof documents.BaseActiveEffect>;
  // folder: fields.ForeignDocumentField<{ type: typeof documents.BaseFolder }>;
  // sort: typeof fields.INTEGER_SORT_FIELD;
  // permission: typeof fields.DOCUMENT_PERMISSIONS;
  // flags: typeof fields.OBJECT_FIELD;
  scene: DocumentField<string> & {
    _id: typeof String;
    required: false;
    nullable: true;
  };
  x: typeof foundry.data.fields.REQUIRED_NUMBER;
  y: typeof foundry.data.fields.REQUIRED_NUMBER;
  label: typeof foundry.data.fields.STRING_FIELD;
  fontFamily: typeof foundry.data.fields.STRING_FIELD;
  fontSize: typeof foundry.data.fields.NONNEGATIVE_INTEGER_FIELD;
  textColor: typeof foundry.data.fields.COLOR_FIELD;
  icon: typeof foundry.data.fields.IMAGE_FIELD;
  disabled: typeof foundry.data.fields.BOOLEAN_FIELD;
  hidden: typeof foundry.data.fields.BOOLEAN_FIELD;
  animate: typeof foundry.data.fields.BOOLEAN_FIELD;
}
