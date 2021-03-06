// @flow
import type { EdgeAccount } from 'edge-core-js'

import { categories } from './subcategories.js'

// Default Core Settings
export const CORE_DEFAULTS = {
  otpMode: false,
  pinMode: false
}

// TODO:  Remove hardcoded currency defaults
// Default Account Settings
export const SYNCED_ACCOUNT_DEFAULTS = {
  autoLogoutTimeInSeconds: 3600,
  defaultFiat: 'USD',
  merchantMode: false,
  BTC: { denomination: '100' },
  BCH: { denomination: '100' },
  DASH: { denomination: '100000000' },
  LTC: { denomination: '100000000' },
  FTC: { denomination: '100000000' },
  XZC: { denomination: '100000000' },
  ETH: { denomination: '1000000000000000000' },
  REP: { denomination: '1000000000000000000' },
  WINGS: { denomination: '1000000000000000000' },
  IND: { denomination: '1000000000000000000' },
  HUR: { denomination: '1000000000000000000' },
  customTokens: []
}

export const LOCAL_ACCOUNT_DEFAULTS = { bluetoothMode: false }

const SYNCHED_SETTINGS_FILENAME = 'Settings.json'
const LOCAL_SETTINGS_FILENAME = 'Settings.json'
const CATEGORIES_FILENAME = 'Categories.json'

//  Settings
// Core Settings

export const setPINModeRequest = (account: EdgeAccount, pinMode: boolean) =>
  pinMode // $FlowFixMe enablePIN not found on EdgeAccount type
    ? account.enablePIN() // $FlowFixMe isablePIN not found on EdgeAccount type
    : account.disablePIN()

export const setPINRequest = (account: EdgeAccount, pin: string) => account.changePIN(pin)

// Account Settings
export const setAutoLogoutTimeInSecondsRequest = (account: EdgeAccount, autoLogoutTimeInSeconds: number) =>
  getSyncedSettings(account).then(settings => {
    const updatedSettings = updateSettings(settings, { autoLogoutTimeInSeconds })
    return setSyncedSettings(account, updatedSettings)
  })

export const setDefaultFiatRequest = (account: EdgeAccount, defaultFiat: string) =>
  getSyncedSettings(account).then(settings => {
    const updatedSettings = updateSettings(settings, { defaultFiat })
    return setSyncedSettings(account, updatedSettings)
  })

export const setMerchantModeRequest = (account: EdgeAccount, merchantMode: boolean) =>
  getSyncedSettings(account).then(settings => {
    const updatedSettings = updateSettings(settings, { merchantMode })
    return setSyncedSettings(account, updatedSettings)
  })

// Local Settings
export const setBluetoothModeRequest = (account: EdgeAccount, bluetoothMode: boolean) =>
  getLocalSettings(account).then(settings => {
    const updatedSettings = updateSettings(settings, { bluetoothMode })
    return setLocalSettings(account, updatedSettings)
  })

// Currency Settings
export const setDenominationKeyRequest = (account: EdgeAccount, currencyCode: string, denomination: string) =>
  getSyncedSettings(account).then(settings => {
    const updatedSettings = updateCurrencySettings(settings, currencyCode, { denomination })
    return setSyncedSettings(account, updatedSettings)
  })

// Helper Functions
export const getSyncedSettings = (account: EdgeAccount) =>
  getSyncedSettingsFile(account)
    .getText()
    .then(text => {
      const settingsFromFile = JSON.parse(text)
      return settingsFromFile
    })
    .catch(e => {
      console.log(e)
      // If Settings.json doesn't exist yet, create it, and return it
      return setSyncedSettings(account, SYNCED_ACCOUNT_DEFAULTS)
    })

export async function getSyncedSettingsAsync (account: EdgeAccount): Promise<any> {
  try {
    const file = getSyncedSettingsFile(account)
    const text = await file.getText()
    const settingsFromFile = JSON.parse(text)
    return settingsFromFile
  } catch (e) {
    console.log(e)
    // If Settings.json doesn't exist yet, create it, and return it
    return setSyncedSettings(account, SYNCED_ACCOUNT_DEFAULTS)
  }
}

export const setSyncedSettings = (account: EdgeAccount, settings: Object) => {
  const text = JSON.stringify(settings)
  const SettingsFile = getSyncedSettingsFile(account)
  SettingsFile.setText(text)
}

export async function setSyncedSettingsAsync (account: EdgeAccount, settings: Object) {
  const text = JSON.stringify(settings)
  const SettingsFile = getSyncedSettingsFile(account)
  await SettingsFile.setText(text)
}

export async function setSubcategoriesRequest (account: EdgeAccount, subcategories: any) {
  // const subcats = await getSyncedSubcategories(account)
  return setSyncedSubcategories(account, subcategories)
}

export async function setSyncedSubcategories (account: EdgeAccount, subcategories: any) {
  let finalText = {}
  if (!subcategories.categories) {
    finalText.categories = subcategories
  } else {
    finalText = subcategories
  }
  const SubcategoriesFile = getSyncedSubcategoriesFile(account)
  const stringifiedSubcategories = JSON.stringify(finalText)
  try {
    await SubcategoriesFile.setText(stringifiedSubcategories)
  } catch (e) {
    console.log(e)
  }
}

export const getSyncedSubcategories = (account: EdgeAccount) =>
  getSyncedSubcategoriesFile(account)
    .getText()
    .then(text => {
      const categoriesText = JSON.parse(text)
      return categoriesText.categories
    })
    .catch(() =>
      // If Categories.json doesn't exist yet, create it, and return it
      setSyncedSubcategories(account, SYNCED_SUBCATEGORIES_DEFAULTS).then(() => SYNCED_SUBCATEGORIES_DEFAULTS)
    )

export const getSyncedSubcategoriesFile = (account: EdgeAccount) =>
  // $FlowFixMe folder not found on EdgeAccount type
  account.folder.file(CATEGORIES_FILENAME)

export const getLocalSettings = (account: EdgeAccount) =>
  getLocalSettingsFile(account)
    .getText()
    .then(JSON.parse)
    .catch(() =>
      // If Settings.json doesn't exist yet, create it, and return it
      setLocalSettings(account, LOCAL_ACCOUNT_DEFAULTS).then(() => LOCAL_ACCOUNT_DEFAULTS)
    )

export const setLocalSettings = (account: EdgeAccount, settings: Object) => {
  const text = JSON.stringify(settings)
  const localSettingsFile = getLocalSettingsFile(account)
  return localSettingsFile.setText(text)
}

export const getCoreSettings = (account: EdgeAccount): Promise<{ otpMode: boolean, pinMode: boolean }> => {
  // eslint-disable-line no-unused-vars
  const coreSettings: { otpMode: boolean, pinMode: boolean } = CORE_DEFAULTS
  // TODO: Get each setting separately,
  // build up settings object,
  // return settings object
  return Promise.resolve(coreSettings)
}

export const getSyncedSettingsFile = (account: EdgeAccount) => {
  // $FlowFixMe folder not found on EdgeAccount type
  const folder = account.folder
  return folder.file(SYNCHED_SETTINGS_FILENAME)
}

export const getLocalSettingsFile = (account: EdgeAccount) =>
  // $FlowFixMe localFolder not found on EdgeAccount type
  account.localFolder.file(LOCAL_SETTINGS_FILENAME)

export const updateCurrencySettings = (currentSettings: Object, currencyCode: string, newSettings: Object) => {
  const currencySettings = currentSettings[currencyCode]
  // update with new settings
  const updatedSettings = {
    ...currentSettings,
    [currencyCode]: {
      ...currencySettings,
      ...newSettings
    }
  }
  return updatedSettings
}

export const updateSettings = (currentSettings: Object, newSettings: Object) => {
  // update with new settings
  const updatedSettings = {
    ...currentSettings,
    ...newSettings
  }
  return updatedSettings
}

export const SYNCED_SUBCATEGORIES_DEFAULTS = {
  categories: categories
}
