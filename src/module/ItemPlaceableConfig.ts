// export const STAIRWAY_DEFAULTS = {
//   scene: 'null',
//   icon: 'modules/itemPlaceables/icons/itemPlaceable.svg',
//   fontFamily: CONFIG.defaultFontFamily,
//   fontSize: 24,
//   textColor: '#FFFFFF'
// }

/**
 * ItemPlaceable Configuration Sheet
 * @implements {DocumentSheet}
 *
 * @param itemPlaceable {ItemPlaceable} The ItemPlaceable object for which settings are being configured
 * @param options {Object}     ItemPlaceableConfig ui options (see Application)
 */
export class ItemPlaceableConfig extends ItemSheet {
  // DocumenSheet
  /** @inheritdoc */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['sheet', 'itemPlaceable-sheet', 'item'],
      title: 'itemPlaceables.ui.config.title',
        //     template: 'modules/itemPlaceables/templates/itemPlaceable-config.hbs',
  //     width: 480,
  //     tabs: [{ navSelector: '.tabs', contentSelector: 'form', initial: 'main' }]
    });
  }
  // /* -------------------------------------------- */
  // /** @override */
  // getData (options) {
  //   const data = super.getData(options)
  //   const scenes = {
  //     null: game.i18n.localize('itemPlaceables.ui.config.current-scene')
  //   }
  //   for (const scene of game.scenes) {
  //     scenes[scene.id] = scene.name
  //   }
  //   const iconName = (name) => game.i18n.localize(`itemPlaceables.ui.config.icons.${name}`)
  //   const icons = {
  //     [STAIRWAY_DEFAULTS.icon]: iconName('itemPlaceable'),
  //     'icons/svg/door-steel.svg': iconName('door-steel'),
  //     'icons/svg/door-closed.svg': iconName('door-closed'),
  //     'icons/svg/door-exit.svg': iconName('door-exit'),
  //     'icons/svg/cave.svg': iconName('cave'),
  //     'icons/svg/house.svg': iconName('house'),
  //     'icons/svg/city.svg': iconName('city'),
  //     'icons/svg/castle.svg': iconName('castle')
  //   }
  //   const fontFamilies = CONFIG.fontFamilies.reduce((obj, f) => {
  //     obj[f] = f
  //     return obj
  //   }, {})
  //   // replace null with defaults
  //   for (const key in STAIRWAY_DEFAULTS) {
  //     data.data[key] ??= STAIRWAY_DEFAULTS[key]
  //   }
  //   return {
  //     ...data,
  //     status: this.document.status,
  //     scenes,
  //     icons,
  //     fontFamilies,
  //     submitText: game.i18n.localize('itemPlaceables.ui.config.submit')
  //   }
  // }
  // /* -------------------------------------------- */
  // /** @override */
  // activateListeners (html) {
  //   super.activateListeners(html)
  //   this.iconInput = html.find('input[name="icon"]')[0]
  //   html.find('img.select-icon').click(this._onSelectIcon.bind(this))
  //   html.find('button[name="resetDefault"]').click(this._onResetDefaults.bind(this))
  // }
  // /* -------------------------------------------- */
  // _onSelectIcon (event) {
  //   const icon = event.currentTarget.attributes.src.value
  //   this.iconInput.value = icon
  //   this.iconInput.dispatchEvent(new Event('change', { bubbles: true }))
  // }
  // /* -------------------------------------------- */
  // /**
  //  * Reset the user Drawing configuration settings to their default values
  //  * @param event
  //  * @private
  //  */
  // _onResetDefaults (event) {
  //   event.preventDefault()
  //   for (const key in STAIRWAY_DEFAULTS) {
  //     // don't reset scene
  //     if (key === 'scene') {
  //       continue
  //     }
  //     // set default value
  //     this.object.data[key] = STAIRWAY_DEFAULTS[key]
  //   }
  //   this._refresh()
  // }
  // /* -------------------------------------------- */
  // /** @inheritdoc */
  // async close (options) {
  //   this.document.data.reset()
  //   this._refresh()
  //   return super.close(options)
  // }
  // /* -------------------------------------------- */
  // /** @inheritdoc */
  // async _onChangeInput (event) {
  //   await super._onChangeInput(event)
  //   const previewData = this._getSubmitData()
  //   foundry.utils.mergeObject(this.document.data, previewData, { inplace: true })
  //   this._refresh()
  // }
  // /* -------------------------------------------- */
  // /** @override */
  // _getSubmitData (updateData = {}) {
  //   const formData = super._getSubmitData(updateData)
  //   // replace default values with null
  //   for (const key in STAIRWAY_DEFAULTS) {
  //     if (formData[key] === STAIRWAY_DEFAULTS[key]) {
  //       formData[key] = null
  //     }
  //   }
  //   return formData
  // }
  // /* -------------------------------------------- */
  // /** @override */
  // async _updateObject (event, formData) {
  //   this.object.data.reset()
  //   if (this.object.id) return this.object.update(formData)
  // }
  // /* -------------------------------------------- */
  // /**
  //  * Refresh the display of the ItemPlaceable object
  //  * @private
  //  */
  // _refresh () {
  //   if (!this.document.object) return
  //   this.document.object.draw()
  //   this.document.object.refresh()
  // }
}
