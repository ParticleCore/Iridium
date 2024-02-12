/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Generated on Sat Feb 10 2024 22:27:39 GMT+0000 (Coordinated Universal Time)
// Built at bed6501a3f04072f9522d4f56e76404b6260216b

// Includes MV3+ APIs only.

// Extensions APIs incorrectly reference `usb.Device`, which is a Platform Apps only API.
// WebUSB is available in Chrome 61+.
declare namespace usb {
  interface Device {

    /**
     * An opaque ID for the USB device. It remains unchanged until the device is unplugged.
     */
    device: number;

    /**
     * The device vendor ID.
     */
    vendorId: number;

    /**
     * The product ID.
     */
    productId: number;

    /**
     * The device version (bcdDevice field).
     */
    version: number;

    /**
     * The iProduct string read from the device, if available.
     */
    productName: string;

    /**
     * The iManufacturer string read from the device, if available.
     */
    manufacturerName: string;

    /**
     * The iSerialNumber string read from the device, if available.
     */
    serialNumber: string;
  }
}

// The MV3 API `action` incorrectly references the MV2-only API `browserAction`.
declare namespace browserAction {

  /**
   * A tuple of RGBA values.
   */
  type ColorArray = [number, number, number, number];

  /**
   * Pixel data for an image. Must be an ImageData object; for example, from a `canvas` element.
   */
  type ImageDataType = ImageData;

}


// These are stubs for DOM APIs not nessecarily available in TS' defaults.
interface Entry {}
interface FileEntry extends Entry {}
interface DirectoryEntry extends Entry {}
interface LocalMediaStream {}
interface DOMFileSystem extends FileSystem {}

// This is used to support addListener() where additional parameters are supported.
// The name is detected inside the developer.chrome.com repository and special actions are taken.
type CustomChromeEvent<H extends (...args: any) => void> =
  Omit<chrome.events.Event<H>, 'addListener'> & {

    // nb. This just copies the description from `chrome.events.Event.addListener`.
    /**
     * Registers an event listener _callback_ to an event.
     */
    readonly addListener: H;

  };


declare namespace chrome {

  /**
   * Use the `chrome.accessibilityFeatures` API to manage Chrome's accessibility features. This API relies on the [ChromeSetting prototype of the type API](https://developer.chrome.com/docs/extensions/reference/types/#ChromeSetting) for getting and setting individual accessibility features. In order to get feature states the extension must request `accessibilityFeatures.read` permission. For modifying feature state, the extension needs `accessibilityFeatures.modify` permission. Note that `accessibilityFeatures.modify` does not imply `accessibilityFeatures.read` permission.
   *
   * @chrome-permission accessibilityFeatures.modify
   * @chrome-permission accessibilityFeatures.read
   */
  export namespace accessibilityFeatures {

    /**
     * **ChromeOS only.**
     *
     * Spoken feedback (text-to-speech). The value indicates whether the feature is enabled or not. `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
     */
    export const spokenFeedback: types.ChromeSetting<boolean>;

    /**
     * **ChromeOS only.**
     *
     * Enlarged cursor. The value indicates whether the feature is enabled or not. `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
     */
    export const largeCursor: types.ChromeSetting<boolean>;

    /**
     * **ChromeOS only.**
     *
     * Sticky modifier keys (like shift or alt). The value indicates whether the feature is enabled or not. `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
     */
    export const stickyKeys: types.ChromeSetting<boolean>;

    /**
     * **ChromeOS only.**
     *
     * High contrast rendering mode. The value indicates whether the feature is enabled or not. `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
     */
    export const highContrast: types.ChromeSetting<boolean>;

    /**
     * **ChromeOS only.**
     *
     * Full screen magnification. The value indicates whether the feature is enabled or not. `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
     */
    export const screenMagnifier: types.ChromeSetting<boolean>;

    /**
     * **ChromeOS only.**
     *
     * Auto mouse click after mouse stops moving. The value indicates whether the feature is enabled or not. `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
     */
    export const autoclick: types.ChromeSetting<boolean>;

    /**
     * **ChromeOS only.**
     *
     * Virtual on-screen keyboard. The value indicates whether the feature is enabled or not. `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
     */
    export const virtualKeyboard: types.ChromeSetting<boolean>;

    /**
     * **ChromeOS only.**
     *
     * Caret highlighting. The value indicates whether the feature is enabled or not. `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
     *
     * @since Chrome 51
     */
    export const caretHighlight: types.ChromeSetting<boolean>;

    /**
     * **ChromeOS only.**
     *
     * Cursor highlighting. The value indicates whether the feature is enabled or not. `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
     *
     * @since Chrome 51
     */
    export const cursorHighlight: types.ChromeSetting<boolean>;

    /**
     * **ChromeOS only.**
     *
     * Cursor color. The value indicates whether the feature is enabled or not, doesn't indicate the color of it. `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
     *
     * @since Chrome 85
     */
    export const cursorColor: types.ChromeSetting<boolean>;

    /**
     * **ChromeOS only.**
     *
     * Docked magnifier. The value indicates whether docked magnifier feature is enabled or not. `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
     *
     * @since Chrome 87
     */
    export const dockedMagnifier: types.ChromeSetting<boolean>;

    /**
     * **ChromeOS only.**
     *
     * Focus highlighting. The value indicates whether the feature is enabled or not. `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
     *
     * @since Chrome 51
     */
    export const focusHighlight: types.ChromeSetting<boolean>;

    /**
     * **ChromeOS only.**
     *
     * Select-to-speak. The value indicates whether the feature is enabled or not. `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
     *
     * @since Chrome 51
     */
    export const selectToSpeak: types.ChromeSetting<boolean>;

    /**
     * **ChromeOS only.**
     *
     * Switch Access. The value indicates whether the feature is enabled or not. `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
     *
     * @since Chrome 51
     */
    export const switchAccess: types.ChromeSetting<boolean>;

    /**
     * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
     */
    export const animationPolicy: types.ChromeSetting<"allowed" | "once" | "none">;

    /**
     * **ChromeOS only.**
     *
     * Dictation. The value indicates whether the feature is enabled or not. `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
     *
     * @since Chrome 90
     */
    export const dictation: types.ChromeSetting<boolean>;
  }

  /**
   * Use the `chrome.action` API to control the extension's icon in the Google Chrome toolbar.
   *
   * @since Chrome 88
   * @chrome-manifest action
   * @chrome-min-manifest MV3
   */
  export namespace action {

    export interface TabDetails {

      /**
       * The ID of the tab to query state for. If no tab is specified, the non-tab-specific state is returned.
       */
      tabId?: number;
    }

    /**
     * The collection of user-specified settings relating to an extension's action.
     *
     * @since Chrome 91
     */
    export interface UserSettings {

      /**
       * Whether the extension's action icon is visible on browser windows' top-level toolbar (i.e., whether the extension has been 'pinned' by the user).
       */
      isOnToolbar: boolean;
    }

    /**
     * @since Chrome 99
     */
    export interface OpenPopupOptions {

      /**
       * The ID of the window to open the action popup in. Defaults to the currently-active window if unspecified.
       */
      windowId?: number;
    }

    /**
     * Fired when an action icon is clicked. This event will not fire if the action has a popup.
     */
    export const onClicked: events.Event<(
      tab: tabs.Tab,
    ) => void>;

    /**
     * Sets the title of the action. This shows up in the tooltip.
     */
    export function setTitle(

      details: {

        /**
         * The string the action should display when moused over.
         */
        title: string,

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,
      },
    ): Promise<void>;

    /**
     * Sets the title of the action. This shows up in the tooltip.
     */
    export function setTitle(

      details: {

        /**
         * The string the action should display when moused over.
         */
        title: string,

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,
      },

      callback?: () => void,
    ): void;

    /**
     * Gets the title of the action.
     */
    export function getTitle(

      details: TabDetails,
    ): Promise<string>;

    /**
     * Gets the title of the action.
     */
    export function getTitle(

      details: TabDetails,

      callback?: (
        result: string,
      ) => void,
    ): void;

    /**
     * Sets the icon for the action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the **path** or the **imageData** property must be specified.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function setIcon(

      details: {

        /**
         * Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` \* n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}'
         */
        imageData?: browserAction.ImageDataType | {[name: string]: any},

        /**
         * Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` \* n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.path = {'16': foo}'
         */
        path?: string | {[name: string]: any},

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,
      },
    ): Promise<void>;

    /**
     * Sets the icon for the action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the **path** or the **imageData** property must be specified.
     */
    export function setIcon(

      details: {

        /**
         * Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` \* n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}'
         */
        imageData?: browserAction.ImageDataType | {[name: string]: any},

        /**
         * Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` \* n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.path = {'16': foo}'
         */
        path?: string | {[name: string]: any},

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,
      },

      callback?: () => void,
    ): void;

    /**
     * Sets the HTML document to be opened as a popup when the user clicks on the action's icon.
     */
    export function setPopup(

      details: {

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,

        /**
         * The relative path to the HTML file to show in a popup. If set to the empty string (`''`), no popup is shown.
         */
        popup: string,
      },
    ): Promise<void>;

    /**
     * Sets the HTML document to be opened as a popup when the user clicks on the action's icon.
     */
    export function setPopup(

      details: {

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,

        /**
         * The relative path to the HTML file to show in a popup. If set to the empty string (`''`), no popup is shown.
         */
        popup: string,
      },

      callback?: () => void,
    ): void;

    /**
     * Gets the html document set as the popup for this action.
     */
    export function getPopup(

      details: TabDetails,
    ): Promise<string>;

    /**
     * Gets the html document set as the popup for this action.
     */
    export function getPopup(

      details: TabDetails,

      callback?: (
        result: string,
      ) => void,
    ): void;

    /**
     * Sets the badge text for the action. The badge is displayed on top of the icon.
     */
    export function setBadgeText(

      details: {

        /**
         * Any number of characters can be passed, but only about four can fit in the space. If an empty string (`''`) is passed, the badge text is cleared. If `tabId` is specified and `text` is null, the text for the specified tab is cleared and defaults to the global badge text.
         */
        text?: string,

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,
      },
    ): Promise<void>;

    /**
     * Sets the badge text for the action. The badge is displayed on top of the icon.
     */
    export function setBadgeText(

      details: {

        /**
         * Any number of characters can be passed, but only about four can fit in the space. If an empty string (`''`) is passed, the badge text is cleared. If `tabId` is specified and `text` is null, the text for the specified tab is cleared and defaults to the global badge text.
         */
        text?: string,

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,
      },

      callback?: () => void,
    ): void;

    /**
     * Gets the badge text of the action. If no tab is specified, the non-tab-specific badge text is returned. If [displayActionCountAsBadgeText](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#setExtensionActionOptions) is enabled, a placeholder text will be returned unless the [declarativeNetRequestFeedback](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions#declarativeNetRequestFeedback) permission is present or tab-specific badge text was provided.
     */
    export function getBadgeText(

      details: TabDetails,
    ): Promise<string>;

    /**
     * Gets the badge text of the action. If no tab is specified, the non-tab-specific badge text is returned. If [displayActionCountAsBadgeText](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#setExtensionActionOptions) is enabled, a placeholder text will be returned unless the [declarativeNetRequestFeedback](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions#declarativeNetRequestFeedback) permission is present or tab-specific badge text was provided.
     */
    export function getBadgeText(

      details: TabDetails,

      callback?: (
        result: string,
      ) => void,
    ): void;

    /**
     * Sets the background color for the badge.
     */
    export function setBadgeBackgroundColor(

      details: {

        /**
         * An array of four integers in the range \[0,255\] that make up the RGBA color of the badge. For example, opaque red is `[255, 0, 0, 255]`. Can also be a string with a CSS value, with opaque red being `#FF0000` or `#F00`.
         */
        color: string | browserAction.ColorArray,

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,
      },
    ): Promise<void>;

    /**
     * Sets the background color for the badge.
     */
    export function setBadgeBackgroundColor(

      details: {

        /**
         * An array of four integers in the range \[0,255\] that make up the RGBA color of the badge. For example, opaque red is `[255, 0, 0, 255]`. Can also be a string with a CSS value, with opaque red being `#FF0000` or `#F00`.
         */
        color: string | browserAction.ColorArray,

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,
      },

      callback?: () => void,
    ): void;

    /**
     * Gets the background color of the action.
     */
    export function getBadgeBackgroundColor(

      details: TabDetails,
    ): Promise<browserAction.ColorArray>;

    /**
     * Gets the background color of the action.
     */
    export function getBadgeBackgroundColor(

      details: TabDetails,

      callback?: (
        result: browserAction.ColorArray,
      ) => void,
    ): void;

    /**
     * Sets the text color for the badge.
     *
     * @since Chrome 110
     */
    export function setBadgeTextColor(

      details: {

        /**
         * An array of four integers in the range \[0,255\] that make up the RGBA color of the badge. For example, opaque red is `[255, 0, 0, 255]`. Can also be a string with a CSS value, with opaque red being `#FF0000` or `#F00`. Not setting this value will cause a color to be automatically chosen that will contrast with the badge's background color so the text will be visible. Colors with alpha values equivalent to 0 will not be set and will return an error.
         */
        color: string | browserAction.ColorArray,

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,
      },
    ): Promise<void>;

    /**
     * Sets the text color for the badge.
     *
     * @since Chrome 110
     */
    export function setBadgeTextColor(

      details: {

        /**
         * An array of four integers in the range \[0,255\] that make up the RGBA color of the badge. For example, opaque red is `[255, 0, 0, 255]`. Can also be a string with a CSS value, with opaque red being `#FF0000` or `#F00`. Not setting this value will cause a color to be automatically chosen that will contrast with the badge's background color so the text will be visible. Colors with alpha values equivalent to 0 will not be set and will return an error.
         */
        color: string | browserAction.ColorArray,

        /**
         * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
         */
        tabId?: number,
      },

      callback?: () => void,
    ): void;

    /**
     * Gets the text color of the action.
     *
     * @since Chrome 110
     */
    export function getBadgeTextColor(

      details: TabDetails,
    ): Promise<browserAction.ColorArray>;

    /**
     * Gets the text color of the action.
     *
     * @since Chrome 110
     */
    export function getBadgeTextColor(

      details: TabDetails,

      callback?: (
        result: browserAction.ColorArray,
      ) => void,
    ): void;

    /**
     * Enables the action for a tab. By default, actions are enabled.
     *
     * @param tabId The ID of the tab for which you want to modify the action.
     */
    export function enable(

      tabId?: number,
    ): Promise<void>;

    /**
     * Enables the action for a tab. By default, actions are enabled.
     *
     * @param tabId The ID of the tab for which you want to modify the action.
     */
    export function enable(

      tabId?: number,

      callback?: () => void,
    ): void;

    /**
     * Disables the action for a tab.
     *
     * @param tabId The ID of the tab for which you want to modify the action.
     */
    export function disable(

      tabId?: number,
    ): Promise<void>;

    /**
     * Disables the action for a tab.
     *
     * @param tabId The ID of the tab for which you want to modify the action.
     */
    export function disable(

      tabId?: number,

      callback?: () => void,
    ): void;

    /**
     * Indicates whether the extension action is enabled for a tab (or globally if no `tabId` is provided). Actions enabled using only {@link declarativeContent} always return false.
     *
     * @param tabId The ID of the tab for which you want check enabled status.
     * @since Chrome 110
     */
    export function isEnabled(

      tabId?: number,
    ): Promise<boolean>;

    /**
     * Indicates whether the extension action is enabled for a tab (or globally if no `tabId` is provided). Actions enabled using only {@link declarativeContent} always return false.
     *
     * @param tabId The ID of the tab for which you want check enabled status.
     * @since Chrome 110
     */
    export function isEnabled(

      tabId?: number,

      /**
       * @param isEnabled True if the extension action is enabled.
       */
      callback?: (
        isEnabled: boolean,
      ) => void,
    ): void;

    /**
     * Returns the user-specified settings relating to an extension's action.
     *
     * @since Chrome 91
     */
    export function getUserSettings(): Promise<UserSettings>;

    /**
     * Returns the user-specified settings relating to an extension's action.
     *
     * @since Chrome 91
     */
    export function getUserSettings(

      callback?: (
        userSettings: UserSettings,
      ) => void,
    ): void;

    /**
     * Opens the extension's popup.
     *
     * @param options Specifies options for opening the popup.
     * @since Chrome 118
     * @chrome-install-location policy
     */
    export function openPopup(

      options?: OpenPopupOptions,
    ): Promise<void>;

    /**
     * Opens the extension's popup.
     *
     * @param options Specifies options for opening the popup.
     * @since Chrome 118
     * @chrome-install-location policy
     */
    export function openPopup(

      options?: OpenPopupOptions,

      callback?: () => void,
    ): void;
  }

  /**
   * Use the `chrome.alarms` API to schedule code to run periodically or at a specified time in the future.
   *
   * @chrome-permission alarms
   */
  export namespace alarms {

    export interface Alarm {

      /**
       * Name of this alarm.
       */
      name: string;

      /**
       * Time at which this alarm was scheduled to fire, in milliseconds past the epoch (e.g. `Date.now() + n`). For performance reasons, the alarm may have been delayed an arbitrary amount beyond this.
       */
      scheduledTime: number;

      /**
       * If not null, the alarm is a repeating alarm and will fire again in `periodInMinutes` minutes.
       */
      periodInMinutes?: number;
    }

    export interface AlarmCreateInfo {

      /**
       * Time at which the alarm should fire, in milliseconds past the epoch (e.g. `Date.now() + n`).
       */
      when?: number;

      /**
       * Length of time in minutes after which the `onAlarm` event should fire.
       */
      delayInMinutes?: number;

      /**
       * If set, the onAlarm event should fire every `periodInMinutes` minutes after the initial event specified by `when` or `delayInMinutes`. If not set, the alarm will only fire once.
       */
      periodInMinutes?: number;
    }

    /**
     * Fired when an alarm has elapsed. Useful for event pages.
     */
    export const onAlarm: events.Event<(
      alarm: Alarm,
    ) => void>;

    /**
     * Creates an alarm. Near the time(s) specified by `alarmInfo`, the `onAlarm` event is fired. If there is another alarm with the same name (or no name if none is specified), it will be cancelled and replaced by this alarm.
     *
     * In order to reduce the load on the user's machine, Chrome limits alarms to at most once every 30 seconds but may delay them an arbitrary amount more. That is, setting `delayInMinutes` or `periodInMinutes` to less than `0.5` will not be honored and will cause a warning. `when` can be set to less than 30 seconds after "now" without warning but won't actually cause the alarm to fire for at least 30 seconds.
     *
     * To help you debug your app or extension, when you've loaded it unpacked, there's no limit to how often the alarm can fire.
     *
     * @chrome-returns-extra since Chrome 111
     * @param name Optional name to identify this alarm. Defaults to the empty string.
     * @param alarmInfo Describes when the alarm should fire. The initial time must be specified by either `when` or `delayInMinutes` (but not both). If `periodInMinutes` is set, the alarm will repeat every `periodInMinutes` minutes after the initial event. If neither `when` or `delayInMinutes` is set for a repeating alarm, `periodInMinutes` is used as the default for `delayInMinutes`.
     */
    export function create(

      name: string,

      alarmInfo: AlarmCreateInfo,
    ): Promise<void>;

    /**
     * Creates an alarm. Near the time(s) specified by `alarmInfo`, the `onAlarm` event is fired. If there is another alarm with the same name (or no name if none is specified), it will be cancelled and replaced by this alarm.
     *
     * In order to reduce the load on the user's machine, Chrome limits alarms to at most once every 30 seconds but may delay them an arbitrary amount more. That is, setting `delayInMinutes` or `periodInMinutes` to less than `0.5` will not be honored and will cause a warning. `when` can be set to less than 30 seconds after "now" without warning but won't actually cause the alarm to fire for at least 30 seconds.
     *
     * To help you debug your app or extension, when you've loaded it unpacked, there's no limit to how often the alarm can fire.
     *
     * @chrome-returns-extra since Chrome 111
     * @param alarmInfo Describes when the alarm should fire. The initial time must be specified by either `when` or `delayInMinutes` (but not both). If `periodInMinutes` is set, the alarm will repeat every `periodInMinutes` minutes after the initial event. If neither `when` or `delayInMinutes` is set for a repeating alarm, `periodInMinutes` is used as the default for `delayInMinutes`.
     */
    export function create(

      alarmInfo: AlarmCreateInfo,
    ): Promise<void>;

    /**
     * Creates an alarm. Near the time(s) specified by `alarmInfo`, the `onAlarm` event is fired. If there is another alarm with the same name (or no name if none is specified), it will be cancelled and replaced by this alarm.
     *
     * In order to reduce the load on the user's machine, Chrome limits alarms to at most once every 30 seconds but may delay them an arbitrary amount more. That is, setting `delayInMinutes` or `periodInMinutes` to less than `0.5` will not be honored and will cause a warning. `when` can be set to less than 30 seconds after "now" without warning but won't actually cause the alarm to fire for at least 30 seconds.
     *
     * To help you debug your app or extension, when you've loaded it unpacked, there's no limit to how often the alarm can fire.
     *
     * @param name Optional name to identify this alarm. Defaults to the empty string.
     * @param alarmInfo Describes when the alarm should fire. The initial time must be specified by either `when` or `delayInMinutes` (but not both). If `periodInMinutes` is set, the alarm will repeat every `periodInMinutes` minutes after the initial event. If neither `when` or `delayInMinutes` is set for a repeating alarm, `periodInMinutes` is used as the default for `delayInMinutes`.
     * @param callback Invoked when the alarm has been created.
     */
    export function create(

      name: string,

      alarmInfo: AlarmCreateInfo,

      /**
       * @since Chrome 111
       */
      callback?: () => void,
    ): void;

    /**
     * Creates an alarm. Near the time(s) specified by `alarmInfo`, the `onAlarm` event is fired. If there is another alarm with the same name (or no name if none is specified), it will be cancelled and replaced by this alarm.
     *
     * In order to reduce the load on the user's machine, Chrome limits alarms to at most once every 30 seconds but may delay them an arbitrary amount more. That is, setting `delayInMinutes` or `periodInMinutes` to less than `0.5` will not be honored and will cause a warning. `when` can be set to less than 30 seconds after "now" without warning but won't actually cause the alarm to fire for at least 30 seconds.
     *
     * To help you debug your app or extension, when you've loaded it unpacked, there's no limit to how often the alarm can fire.
     *
     * @param alarmInfo Describes when the alarm should fire. The initial time must be specified by either `when` or `delayInMinutes` (but not both). If `periodInMinutes` is set, the alarm will repeat every `periodInMinutes` minutes after the initial event. If neither `when` or `delayInMinutes` is set for a repeating alarm, `periodInMinutes` is used as the default for `delayInMinutes`.
     * @param callback Invoked when the alarm has been created.
     */
    export function create(

      alarmInfo: AlarmCreateInfo,

      /**
       * @since Chrome 111
       */
      callback?: () => void,
    ): void;

    /**
     * Retrieves details about the specified alarm.
     *
     * @chrome-returns-extra since Chrome 91
     * @param name The name of the alarm to get. Defaults to the empty string.
     */
    export function get(

      name?: string,
    ): Promise<Alarm | undefined>;

    /**
     * Retrieves details about the specified alarm.
     *
     * @param name The name of the alarm to get. Defaults to the empty string.
     */
    export function get(

      name?: string,

      callback?: (
        alarm?: Alarm,
      ) => void,
    ): void;

    /**
     * Gets an array of all the alarms.
     *
     * @chrome-returns-extra since Chrome 91
     */
    export function getAll(): Promise<Alarm[]>;

    /**
     * Gets an array of all the alarms.
     */
    export function getAll(

      callback?: (
        alarms: Alarm[],
      ) => void,
    ): void;

    /**
     * Clears the alarm with the given name.
     *
     * @chrome-returns-extra since Chrome 91
     * @param name The name of the alarm to clear. Defaults to the empty string.
     */
    export function clear(

      name?: string,
    ): Promise<boolean>;

    /**
     * Clears the alarm with the given name.
     *
     * @param name The name of the alarm to clear. Defaults to the empty string.
     */
    export function clear(

      name?: string,

      callback?: (
        wasCleared: boolean,
      ) => void,
    ): void;

    /**
     * Clears all alarms.
     *
     * @chrome-returns-extra since Chrome 91
     */
    export function clearAll(): Promise<boolean>;

    /**
     * Clears all alarms.
     */
    export function clearAll(

      callback?: (
        wasCleared: boolean,
      ) => void,
    ): void;
  }

  /**
   * The `chrome.audio` API is provided to allow users to get information about and control the audio devices attached to the system. This API is currently only available in kiosk mode for ChromeOS.
   *
   * @since Chrome 59
   * @chrome-permission audio
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace audio {

    /**
     * Type of stream an audio device provides.
     */
    export type StreamType = "INPUT" | "OUTPUT";

    /**
     * Available audio device types.
     */
    export type DeviceType = "HEADPHONE" | "MIC" | "USB" | "BLUETOOTH" | "HDMI" | "INTERNAL_SPEAKER" | "INTERNAL_MIC" | "FRONT_MIC" | "REAR_MIC" | "KEYBOARD_MIC" | "HOTWORD" | "LINEOUT" | "POST_MIX_LOOPBACK" | "POST_DSP_LOOPBACK" | "ALSA_LOOPBACK" | "OTHER";

    export interface AudioDeviceInfo {

      /**
       * The unique identifier of the audio device.
       */
      id: string;

      /**
       * Stream type associated with this device.
       */
      streamType: StreamType;

      /**
       * Type of the device.
       */
      deviceType: DeviceType;

      /**
       * The user-friendly name (e.g. "USB Microphone").
       */
      displayName: string;

      /**
       * Device name.
       */
      deviceName: string;

      /**
       * True if this is the current active device.
       */
      isActive: boolean;

      /**
       * The sound level of the device, volume for output, gain for input.
       */
      level: number;

      /**
       * The stable/persisted device id string when available.
       */
      stableDeviceId?: string;
    }

    export interface DeviceFilter {

      /**
       * If set, only audio devices whose stream type is included in this list will satisfy the filter.
       */
      streamTypes?: StreamType[];

      /**
       * If set, only audio devices whose active state matches this value will satisfy the filter.
       */
      isActive?: boolean;
    }

    export interface DeviceProperties {

      /**
       * The audio device's desired sound level. Defaults to the device's current sound level.
       *
       * If used with audio input device, represents audio device gain.
       *
       * If used with audio output device, represents audio device volume.
       */
      level?: number;
    }

    export interface DeviceIdLists {

      /**
       * List of input devices specified by their ID.
       *
       * To indicate input devices should be unaffected, leave this property unset.
       */
      input?: string[];

      /**
       * List of output devices specified by their ID.
       *
       * To indicate output devices should be unaffected, leave this property unset.
       */
      output?: string[];
    }

    export interface MuteChangedEvent {

      /**
       * The type of the stream for which the mute value changed. The updated mute value applies to all devices with this stream type.
       */
      streamType: StreamType;

      /**
       * Whether or not the stream is now muted.
       */
      isMuted: boolean;
    }

    export interface LevelChangedEvent {

      /**
       * ID of device whose sound level has changed.
       */
      deviceId: string;

      /**
       * The device's new sound level.
       */
      level: number;
    }

    /**
     * Fired when sound level changes for an active audio device.
     */
    export const onLevelChanged: events.Event<(
      event: LevelChangedEvent,
    ) => void>;

    /**
     * Fired when the mute state of the audio input or output changes. Note that mute state is system-wide and the new value applies to every audio device with specified stream type.
     */
    export const onMuteChanged: events.Event<(
      event: MuteChangedEvent,
    ) => void>;

    /**
     * Fired when audio devices change, either new devices being added, or existing devices being removed.
     */
    export const onDeviceListChanged: events.Event<(
      devices: AudioDeviceInfo[],
    ) => void>;

    /**
     * Gets a list of audio devices filtered based on `filter`.
     *
     * @chrome-returns-extra since Chrome 116
     * @param filter Device properties by which to filter the list of returned audio devices. If the filter is not set or set to `{}`, returned device list will contain all available audio devices.
     */
    export function getDevices(

      filter?: DeviceFilter,
    ): Promise<AudioDeviceInfo[]>;

    /**
     * Gets a list of audio devices filtered based on `filter`.
     *
     * @param filter Device properties by which to filter the list of returned audio devices. If the filter is not set or set to `{}`, returned device list will contain all available audio devices.
     * @param callback Reports the requested list of audio devices.
     */
    export function getDevices(

      filter?: DeviceFilter,

      callback?: (
        devices: AudioDeviceInfo[],
      ) => void,
    ): void;

    /**
     * Sets lists of active input and/or output devices.
     *
     * @chrome-returns-extra since Chrome 116
     * @param ids

    Specifies IDs of devices that should be active. If either the input or output list is not set, devices in that category are unaffected.

    It is an error to pass in a non-existent device ID.
     */
    export function setActiveDevices(

      ids: DeviceIdLists,
    ): Promise<void>;

    /**
     * Sets lists of active input and/or output devices.
     *
     * @param ids

    Specifies IDs of devices that should be active. If either the input or output list is not set, devices in that category are unaffected.

    It is an error to pass in a non-existent device ID.
     */
    export function setActiveDevices(

      ids: DeviceIdLists,

      callback?: () => void,
    ): void;

    /**
     * Sets the properties for the input or output device.
     *
     * @chrome-returns-extra since Chrome 116
     */
    export function setProperties(

      id: string,

      properties: DeviceProperties,
    ): Promise<void>;

    /**
     * Sets the properties for the input or output device.
     */
    export function setProperties(

      id: string,

      properties: DeviceProperties,

      callback?: () => void,
    ): void;

    /**
     * Gets the system-wide mute state for the specified stream type.
     *
     * @chrome-returns-extra since Chrome 116
     * @param streamType Stream type for which mute state should be fetched.
     */
    export function getMute(

      streamType: StreamType,
    ): Promise<boolean>;

    /**
     * Gets the system-wide mute state for the specified stream type.
     *
     * @param streamType Stream type for which mute state should be fetched.
     * @param callback Callback reporting whether mute is set or not for specified stream type.
     */
    export function getMute(

      streamType: StreamType,

      callback?: (
        value: boolean,
      ) => void,
    ): void;

    /**
     * Sets mute state for a stream type. The mute state will apply to all audio devices with the specified audio stream type.
     *
     * @chrome-returns-extra since Chrome 116
     * @param streamType Stream type for which mute state should be set.
     * @param isMuted New mute value.
     */
    export function setMute(

      streamType: StreamType,

      isMuted: boolean,
    ): Promise<void>;

    /**
     * Sets mute state for a stream type. The mute state will apply to all audio devices with the specified audio stream type.
     *
     * @param streamType Stream type for which mute state should be set.
     * @param isMuted New mute value.
     */
    export function setMute(

      streamType: StreamType,

      isMuted: boolean,

      callback?: () => void,
    ): void;
  }

  /**
   * Use the `chrome.bookmarks` API to create, organize, and otherwise manipulate bookmarks. Also see [Override Pages](https://developer.chrome.com/docs/extensions/override), which you can use to create a custom Bookmark Manager page.
   *
   * @chrome-permission bookmarks
   */
  export namespace bookmarks {

    /**
     * Indicates the reason why this node is unmodifiable. The `managed` value indicates that this node was configured by the system administrator. Omitted if the node can be modified by the user and the extension (default).
     *
     * @since Chrome 44
     */
    export type BookmarkTreeNodeUnmodifiable = "managed";

    /**
     * A node (either a bookmark or a folder) in the bookmark tree. Child nodes are ordered within their parent folder.
     */
    export interface BookmarkTreeNode {

      /**
       * The unique identifier for the node. IDs are unique within the current profile, and they remain valid even after the browser is restarted.
       */
      id: string;

      /**
       * The `id` of the parent folder. Omitted for the root node.
       */
      parentId?: string;

      /**
       * The 0-based position of this node within its parent folder.
       */
      index?: number;

      /**
       * The URL navigated to when a user clicks the bookmark. Omitted for folders.
       */
      url?: string;

      /**
       * The text displayed for the node.
       */
      title: string;

      /**
       * When this node was created, in milliseconds since the epoch (`new Date(dateAdded)`).
       */
      dateAdded?: number;

      /**
       * When this node was last opened, in milliseconds since the epoch. Not set for folders.
       *
       * @since Chrome 114
       */
      dateLastUsed?: number;

      /**
       * When the contents of this folder last changed, in milliseconds since the epoch.
       */
      dateGroupModified?: number;

      /**
       * Indicates the reason why this node is unmodifiable. The `managed` value indicates that this node was configured by the system administrator or by the custodian of a supervised user. Omitted if the node can be modified by the user and the extension (default).
       */
      unmodifiable?: BookmarkTreeNodeUnmodifiable;

      /**
       * An ordered list of children of this node.
       */
      children?: BookmarkTreeNode[];
    }

    /**
     * Object passed to the create() function.
     */
    export interface CreateDetails {

      /**
       * Defaults to the Other Bookmarks folder.
       */
      parentId?: string;

      index?: number;

      title?: string;

      url?: string;
    }

    /**
     * @deprecated Bookmark write operations are no longer limited by Chrome.
     */
    export const MAX_WRITE_OPERATIONS_PER_HOUR: 1000000;

    /**
     * @deprecated Bookmark write operations are no longer limited by Chrome.
     */
    export const MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: 1000000;

    /**
     * Fired when a bookmark or folder is created.
     */
    export const onCreated: events.Event<(
      id: string,
      bookmark: BookmarkTreeNode,
    ) => void>;

    /**
     * Fired when a bookmark or folder is removed. When a folder is removed recursively, a single notification is fired for the folder, and none for its contents.
     */
    export const onRemoved: events.Event<(
      id: string,
      removeInfo: {

        parentId: string,

        index: number,

        /**
         * @since Chrome 48
         */
        node: BookmarkTreeNode,
      },
    ) => void>;

    /**
     * Fired when a bookmark or folder changes. **Note:** Currently, only title and url changes trigger this.
     */
    export const onChanged: events.Event<(
      id: string,
      changeInfo: {

        title: string,

        url?: string,
      },
    ) => void>;

    /**
     * Fired when a bookmark or folder is moved to a different parent folder.
     */
    export const onMoved: events.Event<(
      id: string,
      moveInfo: {

        parentId: string,

        index: number,

        oldParentId: string,

        oldIndex: number,
      },
    ) => void>;

    /**
     * Fired when the children of a folder have changed their order due to the order being sorted in the UI. This is not called as a result of a move().
     */
    export const onChildrenReordered: events.Event<(
      id: string,
      reorderInfo: {

        childIds: string[],
      },
    ) => void>;

    /**
     * Fired when a bookmark import session is begun. Expensive observers should ignore onCreated updates until onImportEnded is fired. Observers should still handle other notifications immediately.
     */
    export const onImportBegan: events.Event<() => void>;

    /**
     * Fired when a bookmark import session is ended.
     */
    export const onImportEnded: events.Event<() => void>;

    /**
     * Retrieves the specified BookmarkTreeNode(s).
     *
     * @chrome-returns-extra since Chrome 90
     * @param idOrIdList A single string-valued id, or an array of string-valued ids
     */
    export function get(

      idOrIdList: string | [string, ...string[]],
    ): Promise<BookmarkTreeNode[]>;

    /**
     * Retrieves the specified BookmarkTreeNode(s).
     *
     * @param idOrIdList A single string-valued id, or an array of string-valued ids
     */
    export function get(

      idOrIdList: string | [string, ...string[]],

      callback?: (
        results: BookmarkTreeNode[],
      ) => void,
    ): void;

    /**
     * Retrieves the children of the specified BookmarkTreeNode id.
     *
     * @chrome-returns-extra since Chrome 90
     */
    export function getChildren(

      id: string,
    ): Promise<BookmarkTreeNode[]>;

    /**
     * Retrieves the children of the specified BookmarkTreeNode id.
     */
    export function getChildren(

      id: string,

      callback?: (
        results: BookmarkTreeNode[],
      ) => void,
    ): void;

    /**
     * Retrieves the recently added bookmarks.
     *
     * @chrome-returns-extra since Chrome 90
     * @param numberOfItems The maximum number of items to return.
     */
    export function getRecent(

      numberOfItems: number,
    ): Promise<BookmarkTreeNode[]>;

    /**
     * Retrieves the recently added bookmarks.
     *
     * @param numberOfItems The maximum number of items to return.
     */
    export function getRecent(

      numberOfItems: number,

      callback?: (
        results: BookmarkTreeNode[],
      ) => void,
    ): void;

    /**
     * Retrieves the entire Bookmarks hierarchy.
     *
     * @chrome-returns-extra since Chrome 90
     */
    export function getTree(): Promise<BookmarkTreeNode[]>;

    /**
     * Retrieves the entire Bookmarks hierarchy.
     */
    export function getTree(

      callback?: (
        results: BookmarkTreeNode[],
      ) => void,
    ): void;

    /**
     * Retrieves part of the Bookmarks hierarchy, starting at the specified node.
     *
     * @chrome-returns-extra since Chrome 90
     * @param id The ID of the root of the subtree to retrieve.
     */
    export function getSubTree(

      id: string,
    ): Promise<BookmarkTreeNode[]>;

    /**
     * Retrieves part of the Bookmarks hierarchy, starting at the specified node.
     *
     * @param id The ID of the root of the subtree to retrieve.
     */
    export function getSubTree(

      id: string,

      callback?: (
        results: BookmarkTreeNode[],
      ) => void,
    ): void;

    /**
     * Searches for BookmarkTreeNodes matching the given query. Queries specified with an object produce BookmarkTreeNodes matching all specified properties.
     *
     * @chrome-returns-extra since Chrome 90
     * @param query Either a string of words and quoted phrases that are matched against bookmark URLs and titles, or an object. If an object, the properties `query`, `url`, and `title` may be specified and bookmarks matching all specified properties will be produced.
     */
    export function search(

      query: string | {

        /**
         * A string of words and quoted phrases that are matched against bookmark URLs and titles.
         */
        query?: string,

        /**
         * The URL of the bookmark; matches verbatim. Note that folders have no URL.
         */
        url?: string,

        /**
         * The title of the bookmark; matches verbatim.
         */
        title?: string,
      },
    ): Promise<BookmarkTreeNode[]>;

    /**
     * Searches for BookmarkTreeNodes matching the given query. Queries specified with an object produce BookmarkTreeNodes matching all specified properties.
     *
     * @param query Either a string of words and quoted phrases that are matched against bookmark URLs and titles, or an object. If an object, the properties `query`, `url`, and `title` may be specified and bookmarks matching all specified properties will be produced.
     */
    export function search(

      query: string | {

        /**
         * A string of words and quoted phrases that are matched against bookmark URLs and titles.
         */
        query?: string,

        /**
         * The URL of the bookmark; matches verbatim. Note that folders have no URL.
         */
        url?: string,

        /**
         * The title of the bookmark; matches verbatim.
         */
        title?: string,
      },

      callback?: (
        results: BookmarkTreeNode[],
      ) => void,
    ): void;

    /**
     * Creates a bookmark or folder under the specified parentId. If url is NULL or missing, it will be a folder.
     *
     * @chrome-returns-extra since Chrome 90
     */
    export function create(

      bookmark: CreateDetails,
    ): Promise<BookmarkTreeNode>;

    /**
     * Creates a bookmark or folder under the specified parentId. If url is NULL or missing, it will be a folder.
     */
    export function create(

      bookmark: CreateDetails,

      callback?: (
        result: BookmarkTreeNode,
      ) => void,
    ): void;

    /**
     * Moves the specified BookmarkTreeNode to the provided location.
     *
     * @chrome-returns-extra since Chrome 90
     */
    export function move(

      id: string,

      destination: {

        parentId?: string,

        index?: number,
      },
    ): Promise<BookmarkTreeNode>;

    /**
     * Moves the specified BookmarkTreeNode to the provided location.
     */
    export function move(

      id: string,

      destination: {

        parentId?: string,

        index?: number,
      },

      callback?: (
        result: BookmarkTreeNode,
      ) => void,
    ): void;

    /**
     * Updates the properties of a bookmark or folder. Specify only the properties that you want to change; unspecified properties will be left unchanged. **Note:** Currently, only 'title' and 'url' are supported.
     *
     * @chrome-returns-extra since Chrome 90
     */
    export function update(

      id: string,

      changes: {

        title?: string,

        url?: string,
      },
    ): Promise<BookmarkTreeNode>;

    /**
     * Updates the properties of a bookmark or folder. Specify only the properties that you want to change; unspecified properties will be left unchanged. **Note:** Currently, only 'title' and 'url' are supported.
     */
    export function update(

      id: string,

      changes: {

        title?: string,

        url?: string,
      },

      callback?: (
        result: BookmarkTreeNode,
      ) => void,
    ): void;

    /**
     * Removes a bookmark or an empty bookmark folder.
     *
     * @chrome-returns-extra since Chrome 90
     */
    export function remove(

      id: string,
    ): Promise<void>;

    /**
     * Removes a bookmark or an empty bookmark folder.
     */
    export function remove(

      id: string,

      callback?: () => void,
    ): void;

    /**
     * Recursively removes a bookmark folder.
     *
     * @chrome-returns-extra since Chrome 90
     */
    export function removeTree(

      id: string,
    ): Promise<void>;

    /**
     * Recursively removes a bookmark folder.
     */
    export function removeTree(

      id: string,

      callback?: () => void,
    ): void;
  }

  /**
   * Use the `chrome.browsingData` API to remove browsing data from a user's local profile.
   *
   * @chrome-permission browsingData
   */
  export namespace browsingData {

    /**
     * Options that determine exactly what data will be removed.
     */
    export interface RemovalOptions {

      /**
       * Remove data accumulated on or after this date, represented in milliseconds since the epoch (accessible via the `getTime` method of the JavaScript `Date` object). If absent, defaults to 0 (which would remove all browsing data).
       */
      since?: number;

      /**
       * An object whose properties specify which origin types ought to be cleared. If this object isn't specified, it defaults to clearing only "unprotected" origins. Please ensure that you _really_ want to remove application data before adding 'protectedWeb' or 'extensions'.
       */
      originTypes?: {

        /**
         * Normal websites.
         */
        unprotectedWeb?: boolean,

        /**
         * Websites that have been installed as hosted applications (be careful!).
         */
        protectedWeb?: boolean,

        /**
         * Extensions and packaged applications a user has installed (be \_really\_ careful!).
         */
        extension?: boolean,
      };

      /**
       * When present, only data for origins in this list is deleted. Only supported for cookies, storage and cache. Cookies are cleared for the whole registrable domain.
       *
       * @since Chrome 74
       */
      origins?: string[];

      /**
       * When present, data for origins in this list is excluded from deletion. Can't be used together with `origins`. Only supported for cookies, storage and cache. Cookies are excluded for the whole registrable domain.
       *
       * @since Chrome 74
       */
      excludeOrigins?: string[];
    }

    /**
     * A set of data types. Missing data types are interpreted as `false`.
     */
    export interface DataTypeSet {

      /**
       * Websites' appcaches.
       */
      appcache?: boolean;

      /**
       * The browser's cache.
       */
      cache?: boolean;

      /**
       * Cache storage
       *
       * @since Chrome 72
       */
      cacheStorage?: boolean;

      /**
       * The browser's cookies.
       */
      cookies?: boolean;

      /**
       * The browser's download list.
       */
      downloads?: boolean;

      /**
       * Websites' file systems.
       */
      fileSystems?: boolean;

      /**
       * The browser's stored form data.
       */
      formData?: boolean;

      /**
       * The browser's history.
       */
      history?: boolean;

      /**
       * Websites' IndexedDB data.
       */
      indexedDB?: boolean;

      /**
       * Websites' local storage data.
       */
      localStorage?: boolean;

      /**
       * Server-bound certificates.
       *
       * @deprecated Support for server-bound certificates has been removed. This data type will be ignored.
       * @chrome-deprecated-since Chrome 76
       */
      serverBoundCertificates?: boolean;

      /**
       * Stored passwords.
       */
      passwords?: boolean;

      /**
       * Plugins' data.
       *
       * @deprecated Support for Flash has been removed. This data type will be ignored.
       * @chrome-deprecated-since Chrome 88
       */
      pluginData?: boolean;

      /**
       * Service Workers.
       */
      serviceWorkers?: boolean;

      /**
       * Websites' WebSQL data.
       */
      webSQL?: boolean;
    }

    /**
     * Reports which types of data are currently selected in the 'Clear browsing data' settings UI. Note: some of the data types included in this API are not available in the settings UI, and some UI settings control more than one data type listed here.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function settings(): Promise<{

      options: RemovalOptions,

      /**
       * All of the types will be present in the result, with values of `true` if they are both selected to be removed and permitted to be removed, otherwise `false`.
       */
      dataToRemove: DataTypeSet,

      /**
       * All of the types will be present in the result, with values of `true` if they are permitted to be removed (e.g., by enterprise policy) and `false` if not.
       */
      dataRemovalPermitted: DataTypeSet,
    }>;

    /**
     * Reports which types of data are currently selected in the 'Clear browsing data' settings UI. Note: some of the data types included in this API are not available in the settings UI, and some UI settings control more than one data type listed here.
     */
    export function settings(

      callback?: (
        result: {

          options: RemovalOptions,

          /**
           * All of the types will be present in the result, with values of `true` if they are both selected to be removed and permitted to be removed, otherwise `false`.
           */
          dataToRemove: DataTypeSet,

          /**
           * All of the types will be present in the result, with values of `true` if they are permitted to be removed (e.g., by enterprise policy) and `false` if not.
           */
          dataRemovalPermitted: DataTypeSet,
        },
      ) => void,
    ): void;

    /**
     * Clears various types of browsing data stored in a user's profile.
     *
     * @chrome-returns-extra since Chrome 96
     * @param dataToRemove The set of data types to remove.
     */
    export function remove(

      options: RemovalOptions,

      dataToRemove: DataTypeSet,
    ): Promise<void>;

    /**
     * Clears various types of browsing data stored in a user's profile.
     *
     * @param dataToRemove The set of data types to remove.
     * @param callback Called when deletion has completed.
     */
    export function remove(

      options: RemovalOptions,

      dataToRemove: DataTypeSet,

      callback?: () => void,
    ): void;

    /**
     * Clears websites' appcache data.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function removeAppcache(

      options: RemovalOptions,
    ): Promise<void>;

    /**
     * Clears websites' appcache data.
     *
     * @param callback Called when websites' appcache data has been cleared.
     */
    export function removeAppcache(

      options: RemovalOptions,

      callback?: () => void,
    ): void;

    /**
     * Clears the browser's cache.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function removeCache(

      options: RemovalOptions,
    ): Promise<void>;

    /**
     * Clears the browser's cache.
     *
     * @param callback Called when the browser's cache has been cleared.
     */
    export function removeCache(

      options: RemovalOptions,

      callback?: () => void,
    ): void;

    /**
     * Clears websites' cache storage data.
     *
     * @chrome-returns-extra since Chrome 96
     * @since Chrome 72
     */
    export function removeCacheStorage(

      options: RemovalOptions,
    ): Promise<void>;

    /**
     * Clears websites' cache storage data.
     *
     * @param callback Called when websites' cache storage has been cleared.
     * @since Chrome 72
     */
    export function removeCacheStorage(

      options: RemovalOptions,

      callback?: () => void,
    ): void;

    /**
     * Clears the browser's cookies and server-bound certificates modified within a particular timeframe.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function removeCookies(

      options: RemovalOptions,
    ): Promise<void>;

    /**
     * Clears the browser's cookies and server-bound certificates modified within a particular timeframe.
     *
     * @param callback Called when the browser's cookies and server-bound certificates have been cleared.
     */
    export function removeCookies(

      options: RemovalOptions,

      callback?: () => void,
    ): void;

    /**
     * Clears the browser's list of downloaded files (_not_ the downloaded files themselves).
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function removeDownloads(

      options: RemovalOptions,
    ): Promise<void>;

    /**
     * Clears the browser's list of downloaded files (_not_ the downloaded files themselves).
     *
     * @param callback Called when the browser's list of downloaded files has been cleared.
     */
    export function removeDownloads(

      options: RemovalOptions,

      callback?: () => void,
    ): void;

    /**
     * Clears websites' file system data.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function removeFileSystems(

      options: RemovalOptions,
    ): Promise<void>;

    /**
     * Clears websites' file system data.
     *
     * @param callback Called when websites' file systems have been cleared.
     */
    export function removeFileSystems(

      options: RemovalOptions,

      callback?: () => void,
    ): void;

    /**
     * Clears the browser's stored form data (autofill).
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function removeFormData(

      options: RemovalOptions,
    ): Promise<void>;

    /**
     * Clears the browser's stored form data (autofill).
     *
     * @param callback Called when the browser's form data has been cleared.
     */
    export function removeFormData(

      options: RemovalOptions,

      callback?: () => void,
    ): void;

    /**
     * Clears the browser's history.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function removeHistory(

      options: RemovalOptions,
    ): Promise<void>;

    /**
     * Clears the browser's history.
     *
     * @param callback Called when the browser's history has cleared.
     */
    export function removeHistory(

      options: RemovalOptions,

      callback?: () => void,
    ): void;

    /**
     * Clears websites' IndexedDB data.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function removeIndexedDB(

      options: RemovalOptions,
    ): Promise<void>;

    /**
     * Clears websites' IndexedDB data.
     *
     * @param callback Called when websites' IndexedDB data has been cleared.
     */
    export function removeIndexedDB(

      options: RemovalOptions,

      callback?: () => void,
    ): void;

    /**
     * Clears websites' local storage data.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function removeLocalStorage(

      options: RemovalOptions,
    ): Promise<void>;

    /**
     * Clears websites' local storage data.
     *
     * @param callback Called when websites' local storage has been cleared.
     */
    export function removeLocalStorage(

      options: RemovalOptions,

      callback?: () => void,
    ): void;

    /**
     * Clears plugins' data.
     *
     * @chrome-returns-extra since Chrome 96
     * @deprecated Support for Flash has been removed. This function has no effect.
     * @chrome-deprecated-since Chrome 88
     */
    export function removePluginData(

      options: RemovalOptions,
    ): Promise<void>;

    /**
     * Clears plugins' data.
     *
     * @param callback Called when plugins' data has been cleared.
     * @deprecated Support for Flash has been removed. This function has no effect.
     * @chrome-deprecated-since Chrome 88
     */
    export function removePluginData(

      options: RemovalOptions,

      callback?: () => void,
    ): void;

    /**
     * Clears the browser's stored passwords.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function removePasswords(

      options: RemovalOptions,
    ): Promise<void>;

    /**
     * Clears the browser's stored passwords.
     *
     * @param callback Called when the browser's passwords have been cleared.
     */
    export function removePasswords(

      options: RemovalOptions,

      callback?: () => void,
    ): void;

    /**
     * Clears websites' service workers.
     *
     * @chrome-returns-extra since Chrome 96
     * @since Chrome 72
     */
    export function removeServiceWorkers(

      options: RemovalOptions,
    ): Promise<void>;

    /**
     * Clears websites' service workers.
     *
     * @param callback Called when websites' service workers have been cleared.
     * @since Chrome 72
     */
    export function removeServiceWorkers(

      options: RemovalOptions,

      callback?: () => void,
    ): void;

    /**
     * Clears websites' WebSQL data.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function removeWebSQL(

      options: RemovalOptions,
    ): Promise<void>;

    /**
     * Clears websites' WebSQL data.
     *
     * @param callback Called when websites' WebSQL databases have been cleared.
     */
    export function removeWebSQL(

      options: RemovalOptions,

      callback?: () => void,
    ): void;
  }

  /**
   * Use this API to expose certificates to the platform which can use these certificates for TLS authentications.
   *
   * @since Chrome 46
   * @chrome-permission certificateProvider
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace certificateProvider {

    /**
     * Types of supported cryptographic signature algorithms.
     *
     * @chrome-enum "RSASSA\_PKCS1\_v1\_5\_MD5\_SHA1" Specifies the RSASSA PKCS#1 v1.5 signature algorithm with the MD5-SHA-1 hashing. The extension must not prepend a DigestInfo prefix but only add PKCS#1 padding. This algorithm is deprecated and will never be requested by Chrome as of version 109.
     * @chrome-enum "RSASSA\_PKCS1\_v1\_5\_SHA1" Specifies the RSASSA PKCS#1 v1.5 signature algorithm with the SHA-1 hash function.
     * @chrome-enum "RSASSA\_PKCS1\_v1\_5\_SHA256" Specifies the RSASSA PKCS#1 v1.5 signature algorithm with the SHA-256 hashing function.
     * @chrome-enum "RSASSA\_PKCS1\_v1\_5\_SHA384" Specifies the RSASSA PKCS#1 v1.5 signature algorithm with the SHA-384 hashing function.
     * @chrome-enum "RSASSA\_PKCS1\_v1\_5\_SHA512" Specifies the RSASSA PKCS#1 v1.5 signature algorithm with the SHA-512 hashing function.
     * @chrome-enum "RSASSA\_PSS\_SHA256" Specifies the RSASSA PSS signature algorithm with the SHA-256 hashing function, MGF1 mask generation function and the salt of the same size as the hash.
     * @chrome-enum "RSASSA\_PSS\_SHA384" Specifies the RSASSA PSS signature algorithm with the SHA-384 hashing function, MGF1 mask generation function and the salt of the same size as the hash.
     * @chrome-enum "RSASSA\_PSS\_SHA512" Specifies the RSASSA PSS signature algorithm with the SHA-512 hashing function, MGF1 mask generation function and the salt of the same size as the hash.
     * @since Chrome 86
     */
    export type Algorithm = "RSASSA_PKCS1_v1_5_MD5_SHA1" | "RSASSA_PKCS1_v1_5_SHA1" | "RSASSA_PKCS1_v1_5_SHA256" | "RSASSA_PKCS1_v1_5_SHA384" | "RSASSA_PKCS1_v1_5_SHA512" | "RSASSA_PSS_SHA256" | "RSASSA_PSS_SHA384" | "RSASSA_PSS_SHA512";

    /**
     * Types of errors that the extension can report.
     *
     * @chrome-enum "GENERAL\_ERROR" General error that cannot be represented by other more specific error codes.
     * @since Chrome 86
     */
    export type Error = "GENERAL_ERROR";

    /**
     * @since Chrome 86
     */
    export interface ClientCertificateInfo {

      /**
       * The array must contain the DER encoding of the X.509 client certificate as its first element.
       *
       * This must include exactly one certificate.
       */
      certificateChain: ArrayBuffer[];

      /**
       * All algorithms supported for this certificate. The extension will only be asked for signatures using one of these algorithms.
       */
      supportedAlgorithms: Algorithm[];
    }

    /**
     * @since Chrome 86
     */
    export interface SetCertificatesDetails {

      /**
       * When called in response to {@link onCertificatesUpdateRequested}, should contain the received `certificatesRequestId` value. Otherwise, should be unset.
       */
      certificatesRequestId?: number;

      /**
       * Error that occurred while extracting the certificates, if any. This error will be surfaced to the user when appropriate.
       */
      error?: Error;

      /**
       * List of currently available client certificates.
       */
      clientCertificates: ClientCertificateInfo[];
    }

    /**
     * @since Chrome 86
     */
    export interface CertificatesUpdateRequest {

      /**
       * Request identifier to be passed to {@link setCertificates}.
       */
      certificatesRequestId: number;
    }

    /**
     * @since Chrome 86
     */
    export interface SignatureRequest {

      /**
       * Request identifier to be passed to {@link reportSignature}.
       */
      signRequestId: number;

      /**
       * Data to be signed. Note that the data is not hashed.
       */
      input: ArrayBuffer;

      /**
       * Signature algorithm to be used.
       */
      algorithm: Algorithm;

      /**
       * The DER encoding of a X.509 certificate. The extension must sign `input` using the associated private key.
       */
      certificate: ArrayBuffer;
    }

    /**
     * @since Chrome 86
     */
    export interface ReportSignatureDetails {

      /**
       * Request identifier that was received via the {@link onSignatureRequested} event.
       */
      signRequestId: number;

      /**
       * Error that occurred while generating the signature, if any.
       */
      error?: Error;

      /**
       * The signature, if successfully generated.
       */
      signature?: ArrayBuffer;
    }

    /**
     * Deprecated. Replaced by {@link Algorithm}.
     *
     * @chrome-enum "MD5\_SHA1" Specifies the MD5 and SHA1 hashing algorithms.
     * @chrome-enum "SHA1" Specifies the SHA1 hashing algorithm.
     * @chrome-enum "SHA256" Specifies the SHA256 hashing algorithm.
     * @chrome-enum "SHA384" Specifies the SHA384 hashing algorithm.
     * @chrome-enum "SHA512" Specifies the SHA512 hashing algorithm.
     */
    export type Hash = "MD5_SHA1" | "SHA1" | "SHA256" | "SHA384" | "SHA512";

    /**
     * The type of code being requested by the extension with requestPin function.
     *
     * @chrome-enum "PIN" Specifies the requested code is a PIN.
     * @chrome-enum "PUK" Specifies the requested code is a PUK.
     * @since Chrome 57
     */
    export type PinRequestType = "PIN" | "PUK";

    /**
     * The types of errors that can be presented to the user through the requestPin function.
     *
     * @chrome-enum "INVALID\_PIN" Specifies the PIN is invalid.
     * @chrome-enum "INVALID\_PUK" Specifies the PUK is invalid.
     * @chrome-enum "MAX\_ATTEMPTS\_EXCEEDED" Specifies the maximum attempt number has been exceeded.
     * @chrome-enum "UNKNOWN\_ERROR" Specifies that the error cannot be represented by the above types.
     * @since Chrome 57
     */
    export type PinRequestErrorType = "INVALID_PIN" | "INVALID_PUK" | "MAX_ATTEMPTS_EXCEEDED" | "UNKNOWN_ERROR";

    export interface CertificateInfo {

      /**
       * Must be the DER encoding of a X.509 certificate. Currently, only certificates of RSA keys are supported.
       */
      certificate: ArrayBuffer;

      /**
       * Must be set to all hashes supported for this certificate. This extension will only be asked for signatures of digests calculated with one of these hash algorithms. This should be in order of decreasing hash preference.
       */
      supportedHashes: Hash[];
    }

    export interface SignRequest {

      /**
       * The unique ID to be used by the extension should it need to call a method that requires it, e.g. requestPin.
       *
       * @since Chrome 57
       */
      signRequestId: number;

      /**
       * The digest that must be signed.
       */
      digest: ArrayBuffer;

      /**
       * Refers to the hash algorithm that was used to create `digest`.
       */
      hash: Hash;

      /**
       * The DER encoding of a X.509 certificate. The extension must sign `digest` using the associated private key.
       */
      certificate: ArrayBuffer;
    }

    /**
     * @since Chrome 57
     */
    export interface RequestPinDetails {

      /**
       * The ID given by Chrome in SignRequest.
       */
      signRequestId: number;

      /**
       * The type of code requested. Default is PIN.
       */
      requestType?: PinRequestType;

      /**
       * The error template displayed to the user. This should be set if the previous request failed, to notify the user of the failure reason.
       */
      errorType?: PinRequestErrorType;

      /**
       * The number of attempts left. This is provided so that any UI can present this information to the user. Chrome is not expected to enforce this, instead stopPinRequest should be called by the extension with errorType = MAX\_ATTEMPTS\_EXCEEDED when the number of pin requests is exceeded.
       */
      attemptsLeft?: number;
    }

    /**
     * @since Chrome 57
     */
    export interface StopPinRequestDetails {

      /**
       * The ID given by Chrome in SignRequest.
       */
      signRequestId: number;

      /**
       * The error template. If present it is displayed to user. Intended to contain the reason for stopping the flow if it was caused by an error, e.g. MAX\_ATTEMPTS\_EXCEEDED.
       */
      errorType?: PinRequestErrorType;
    }

    /**
     * @since Chrome 57
     */
    export interface PinResponseDetails {

      /**
       * The code provided by the user. Empty if user closed the dialog or some other error occurred.
       */
      userInput?: string;
    }

    /**
     * This event fires if the certificates set via {@link setCertificates} are insufficient or the browser requests updated information. The extension must call {@link setCertificates} with the updated list of certificates and the received `certificatesRequestId`.
     *
     * @since Chrome 86
     */
    export const onCertificatesUpdateRequested: events.Event<(
      request: CertificatesUpdateRequest,
    ) => void>;

    /**
     * This event fires every time the browser needs to sign a message using a certificate provided by this extension via {@link setCertificates}.
     *
     * The extension must sign the input data from `request` using the appropriate algorithm and private key and return it by calling {@link reportSignature} with the received `signRequestId`.
     *
     * @since Chrome 86
     */
    export const onSignatureRequested: events.Event<(
      request: SignatureRequest,
    ) => void>;

    /**
     * Requests the PIN from the user. Only one ongoing request at a time is allowed. The requests issued while another flow is ongoing are rejected. It's the extension's responsibility to try again later if another flow is in progress.
     *
     * @chrome-returns-extra since Chrome 96
     * @param details Contains the details about the requested dialog.
     * @since Chrome 57
     */
    export function requestPin(

      details: RequestPinDetails,
    ): Promise<PinResponseDetails | undefined>;

    /**
     * Requests the PIN from the user. Only one ongoing request at a time is allowed. The requests issued while another flow is ongoing are rejected. It's the extension's responsibility to try again later if another flow is in progress.
     *
     * @param details Contains the details about the requested dialog.
     * @param callback Is called when the dialog is resolved with the user input, or when the dialog request finishes unsuccessfully (e.g. the dialog was canceled by the user or was not allowed to be shown).
     * @since Chrome 57
     */
    export function requestPin(

      details: RequestPinDetails,

      callback?: (
        details?: PinResponseDetails,
      ) => void,
    ): void;

    /**
     * Stops the pin request started by the {@link requestPin} function.
     *
     * @chrome-returns-extra since Chrome 96
     * @param details Contains the details about the reason for stopping the request flow.
     * @since Chrome 57
     */
    export function stopPinRequest(

      details: StopPinRequestDetails,
    ): Promise<void>;

    /**
     * Stops the pin request started by the {@link requestPin} function.
     *
     * @param details Contains the details about the reason for stopping the request flow.
     * @param callback To be used by Chrome to send to the extension the status from their request to close PIN dialog for user.
     * @since Chrome 57
     */
    export function stopPinRequest(

      details: StopPinRequestDetails,

      callback?: () => void,
    ): void;

    /**
     * Sets a list of certificates to use in the browser.
     *
     * The extension should call this function after initialization and on every change in the set of currently available certificates. The extension should also call this function in response to {@link onCertificatesUpdateRequested} every time this event is received.
     *
     * @chrome-returns-extra since Chrome 96
     * @param details The certificates to set. Invalid certificates will be ignored.
     * @since Chrome 86
     */
    export function setCertificates(

      details: SetCertificatesDetails,
    ): Promise<void>;

    /**
     * Sets a list of certificates to use in the browser.
     *
     * The extension should call this function after initialization and on every change in the set of currently available certificates. The extension should also call this function in response to {@link onCertificatesUpdateRequested} every time this event is received.
     *
     * @param details The certificates to set. Invalid certificates will be ignored.
     * @param callback Called upon completion.
     * @since Chrome 86
     */
    export function setCertificates(

      details: SetCertificatesDetails,

      callback?: () => void,
    ): void;

    /**
     * Should be called as a response to {@link onSignatureRequested}.
     *
     * The extension must eventually call this function for every {@link onSignatureRequested} event; the API implementation will stop waiting for this call after some time and respond with a timeout error when this function is called.
     *
     * @chrome-returns-extra since Chrome 96
     * @since Chrome 86
     */
    export function reportSignature(

      details: ReportSignatureDetails,
    ): Promise<void>;

    /**
     * Should be called as a response to {@link onSignatureRequested}.
     *
     * The extension must eventually call this function for every {@link onSignatureRequested} event; the API implementation will stop waiting for this call after some time and respond with a timeout error when this function is called.
     *
     * @since Chrome 86
     */
    export function reportSignature(

      details: ReportSignatureDetails,

      callback?: () => void,
    ): void;
  }

  /**
   * Stub namespace for the "chrome\_url\_overrides" manifest key.
   *
   * @since Chrome 93
   */
  export namespace chrome_url_overrides {

    export interface UrlOverrideInfo {

      /**
       * Override for the chrome://newtab page.
       */
      newtab?: string;

      /**
       * Override for the chrome://bookmarks page.
       */
      bookmarks?: string;

      /**
       * Override for the chrome://history page.
       */
      history?: string;
    }
  }

  /**
   * Use the commands API to add keyboard shortcuts that trigger actions in your extension, for example, an action to open the browser action or send a command to the extension.
   *
   * @chrome-manifest commands
   */
  export namespace commands {

    export interface Command {

      /**
       * The name of the Extension Command
       */
      name?: string;

      /**
       * The Extension Command description
       */
      description?: string;

      /**
       * The shortcut active for this command, or blank if not active.
       */
      shortcut?: string;
    }

    /**
     * Fired when a registered command is activated using a keyboard shortcut.
     */
    export const onCommand: events.Event<(
      command: string,
      /**
       * @since Chrome 86
       */
      tab?: tabs.Tab,
    ) => void>;

    /**
     * Returns all the registered extension commands for this extension and their shortcut (if active). Before Chrome 110, this command did not return `_execute_action`.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function getAll(): Promise<Command[]>;

    /**
     * Returns all the registered extension commands for this extension and their shortcut (if active). Before Chrome 110, this command did not return `_execute_action`.
     *
     * @param callback Called to return the registered commands.
     */
    export function getAll(

      callback?: (
        commands: Command[],
      ) => void,
    ): void;
  }

  /**
   * Stub namespace for the "content\_scripts" manifest key.
   *
   * @since Chrome 88
   */
  export namespace contentScripts {

    /**
     * The stage in the document lifecycle when the javascript file is injected.
     *
     * @chrome-enum "document\_idle" The browser chooses a time to inject scripts between "document\_end" and immediately after the window.onload event fires. The exact moment of injection depends on how complex the document is and how long it is taking to load, and is optimized for page load speed. Content scripts running at "document\_idle" do not need to listen for the window.onload event; they are guaranteed to run after the DOM is complete. If a script definitely needs to run after window.onload, the extension can check if onload has already fired by using the document.readyState property.
     * @chrome-enum "document\_start" Scripts are injected after any files from css, but before any other DOM is constructed or any other script is run.
     * @chrome-enum "document\_end" Scripts are injected immediately after the DOM is complete, but before subresources like images and frames have loaded.
     */
    export type RunAt = "document_idle" | "document_start" | "document_end";

    export interface ContentScript {

      /**
       * Specifies which pages this content script will be injected into. See [Match Patterns](https://developer.chrome.com/extensions/develop/concepts/match-patterns) for more details on the syntax of these strings.
       */
      matches: string[];

      /**
       * Excludes pages that this content script would otherwise be injected into. See [Match Patterns](https://developer.chrome.com/extensions/develop/concepts/match-patterns) for more details on the syntax of these strings.
       */
      exclude_matches?: string[];

      /**
       * The list of CSS files to be injected into matching pages. These are injected in the order they appear in this array, before any DOM is constructed or displayed for the page.
       */
      css?: string[];

      /**
       * The list of JavaScript files to be injected into matching pages. These are injected in the order they appear in this array.
       */
      js?: string[];

      /**
       * If specified true, it will inject into all frames, even if the frame is not the top-most frame in the tab. Each frame is checked independently for URL requirements; it will not inject into child frames if the URL requirements are not met. Defaults to false, meaning that only the top frame is matched.
       */
      all_frames?: boolean;

      /**
       * Whether the script should inject into any frames where the URL belongs to a scheme that would never match a specified Match Pattern, including about:, data:, blob:, and filesystem: schemes. In these cases, in order to determine if the script should inject, the origin of the URL is checked. If the origin is `null` (as is the case for data: URLs), then the "initiator" or "creator" origin is used (i.e., the origin of the frame that created or navigated this frame). Note that this may not be the parent frame, if the frame was navigated by another frame in the document hierarchy.
       *
       * @since Chrome 99
       */
      match_origin_as_fallback?: boolean;

      /**
       * Whether the script should inject into an about:blank frame where the parent or opener frame matches one of the patterns declared in matches. Defaults to false.
       */
      match_about_blank?: boolean;

      /**
       * Applied after matches to include only those URLs that also match this glob. Intended to emulate the [@include](https://wiki.greasespot.net/Metadata_Block#.40include) Greasemonkey keyword.
       */
      include_globs?: string[];

      /**
       * Applied after matches to exclude URLs that match this glob. Intended to emulate the [@exclude](https://wiki.greasespot.net/Metadata_Block#.40exclude) Greasemonkey keyword.
       */
      exclude_globs?: string[];

      /**
       * Specifies when JavaScript files are injected into the web page. The preferred and default value is `document_idle`.
       */
      run_at?: RunAt;
    }
  }

  /**
   * Use the `chrome.contentSettings` API to change settings that control whether websites can use features such as cookies, JavaScript, and plugins. More generally speaking, content settings allow you to customize Chrome's behavior on a per-site basis instead of globally.
   *
   * @chrome-permission contentSettings
   */
  export namespace contentSettings {

    /**
     * The only content type using resource identifiers is {@link contentSettings.plugins}. For more information, see [Resource Identifiers](https://developer.chrome.com/docs/extensions/reference/contentSettings/#resource-identifiers).
     */
    export interface ResourceIdentifier {

      /**
       * The resource identifier for the given content type.
       */
      id: string;

      /**
       * A human readable description of the resource.
       */
      description?: string;
    }

    /**
     * The scope of the ContentSetting. One of
     * `regular`: setting for regular profile (which is inherited by the incognito profile if not overridden elsewhere),
     * `incognito\_session\_only`: setting for incognito profile that can only be set during an incognito session and is deleted when the incognito session ends (overrides regular settings).
     *
     * @since Chrome 44
     */
    export type Scope = "regular" | "incognito_session_only";

    export interface ContentSetting<T> {

      /**
       * Clear all content setting rules set by this extension.
       *
       * @chrome-returns-extra since Chrome 96
       */
      clear(

        details: {

          /**
           * Where to clear the setting (default: regular).
           */
          scope?: Scope,
        },
      ): Promise<void>;

      /**
       * Clear all content setting rules set by this extension.
       */
      clear(

        details: {

          /**
           * Where to clear the setting (default: regular).
           */
          scope?: Scope,
        },

        callback?: () => void,
      ): void;

      /**
       * Gets the current content setting for a given pair of URLs.
       *
       * @chrome-returns-extra since Chrome 96
       */
      get(

        details: {

          /**
           * The primary URL for which the content setting should be retrieved. Note that the meaning of a primary URL depends on the content type.
           */
          primaryUrl: string,

          /**
           * The secondary URL for which the content setting should be retrieved. Defaults to the primary URL. Note that the meaning of a secondary URL depends on the content type, and not all content types use secondary URLs.
           */
          secondaryUrl?: string,

          /**
           * A more specific identifier of the type of content for which the settings should be retrieved.
           */
          resourceIdentifier?: ResourceIdentifier,

          /**
           * Whether to check the content settings for an incognito session. (default false)
           */
          incognito?: boolean,
        },
      ): Promise<{

        /**
         * The content setting. See the description of the individual ContentSetting objects for the possible values.
         */
        setting: T,
      }>;

      /**
       * Gets the current content setting for a given pair of URLs.
       */
      get(

        details: {

          /**
           * The primary URL for which the content setting should be retrieved. Note that the meaning of a primary URL depends on the content type.
           */
          primaryUrl: string,

          /**
           * The secondary URL for which the content setting should be retrieved. Defaults to the primary URL. Note that the meaning of a secondary URL depends on the content type, and not all content types use secondary URLs.
           */
          secondaryUrl?: string,

          /**
           * A more specific identifier of the type of content for which the settings should be retrieved.
           */
          resourceIdentifier?: ResourceIdentifier,

          /**
           * Whether to check the content settings for an incognito session. (default false)
           */
          incognito?: boolean,
        },

        callback?: (
          details: {

            /**
             * The content setting. See the description of the individual ContentSetting objects for the possible values.
             */
            setting: T,
          },
        ) => void,
      ): void;

      /**
       * Applies a new content setting rule.
       *
       * @chrome-returns-extra since Chrome 96
       */
      set(

        details: {

          /**
           * The pattern for the primary URL. For details on the format of a pattern, see [Content Setting Patterns](https://developer.chrome.com/docs/extensions/reference/contentSettings/#patterns).
           */
          primaryPattern: string,

          /**
           * The pattern for the secondary URL. Defaults to matching all URLs. For details on the format of a pattern, see [Content Setting Patterns](https://developer.chrome.com/docs/extensions/reference/contentSettings/#patterns).
           */
          secondaryPattern?: string,

          /**
           * The resource identifier for the content type.
           */
          resourceIdentifier?: ResourceIdentifier,

          /**
           * The setting applied by this rule. See the description of the individual ContentSetting objects for the possible values.
           */
          setting: any,

          /**
           * Where to set the setting (default: regular).
           */
          scope?: Scope,
        },
      ): Promise<void>;

      /**
       * Applies a new content setting rule.
       */
      set(

        details: {

          /**
           * The pattern for the primary URL. For details on the format of a pattern, see [Content Setting Patterns](https://developer.chrome.com/docs/extensions/reference/contentSettings/#patterns).
           */
          primaryPattern: string,

          /**
           * The pattern for the secondary URL. Defaults to matching all URLs. For details on the format of a pattern, see [Content Setting Patterns](https://developer.chrome.com/docs/extensions/reference/contentSettings/#patterns).
           */
          secondaryPattern?: string,

          /**
           * The resource identifier for the content type.
           */
          resourceIdentifier?: ResourceIdentifier,

          /**
           * The setting applied by this rule. See the description of the individual ContentSetting objects for the possible values.
           */
          setting: any,

          /**
           * Where to set the setting (default: regular).
           */
          scope?: Scope,
        },

        callback?: () => void,
      ): void;

      /**
       * @chrome-returns-extra since Chrome 96
       */
      getResourceIdentifiers(): Promise<ResourceIdentifier[] | undefined>;

      getResourceIdentifiers(

        /**
         * @param resourceIdentifiers A list of resource identifiers for this content type, or `undefined` if this content type does not use resource identifiers.
         */
        callback?: (
          resourceIdentifiers?: ResourceIdentifier[],
        ) => void,
      ): void;
    }

    /**
     * @since Chrome 113
     */
    export type AutoVerifyContentSetting = "allow" | "block";

    /**
     * @since Chrome 121
     */
    export type ClipboardContentSetting = "allow" | "block" | "ask";

    /**
     * @since Chrome 44
     */
    export type CookiesContentSetting = "allow" | "block" | "session_only";

    /**
     * @since Chrome 44
     */
    export type ImagesContentSetting = "allow" | "block";

    /**
     * @since Chrome 44
     */
    export type JavascriptContentSetting = "allow" | "block";

    /**
     * @since Chrome 44
     */
    export type LocationContentSetting = "allow" | "block" | "ask";

    /**
     * @since Chrome 44
     */
    export type PluginsContentSetting = "block";

    /**
     * @since Chrome 44
     */
    export type PopupsContentSetting = "allow" | "block";

    /**
     * @since Chrome 44
     */
    export type NotificationsContentSetting = "allow" | "block" | "ask";

    /**
     * @since Chrome 44
     */
    export type FullscreenContentSetting = "allow";

    /**
     * @since Chrome 44
     */
    export type MouselockContentSetting = "allow";

    /**
     * @since Chrome 46
     */
    export type MicrophoneContentSetting = "allow" | "block" | "ask";

    /**
     * @since Chrome 46
     */
    export type CameraContentSetting = "allow" | "block" | "ask";

    /**
     * @since Chrome 44
     */
    export type PpapiBrokerContentSetting = "block";

    /**
     * @since Chrome 44
     */
    export type MultipleAutomaticDownloadsContentSetting = "allow" | "block" | "ask";

    /**
     * Whether to allow sites to use the [Private State Tokens API](https://developer.chrome.com/docs/privacy-sandbox/trust-tokens/). One of
     * `allow`: Allow sites to use the Private State Tokens API,
     * `block`: Block sites from using the Private State Tokens API.
     * Default is `allow`.
     * The primary URL is the URL of the top-level frame. The secondary URL is not used. NOTE: When calling `set()`, the primary pattern must be .
     *
     * @since Chrome 113
     */
    export const autoVerify: ContentSetting<AutoVerifyContentSetting>;

    /**
     * Whether to allow cookies and other local data to be set by websites. One of
     * `allow`: Accept cookies,
     * `block`: Block cookies,
     * `session\_only`: Accept cookies only for the current session.
     * Default is `allow`.
     * The primary URL is the URL representing the cookie origin. The secondary URL is the URL of the top-level frame.
     */
    export const cookies: ContentSetting<CookiesContentSetting>;

    /**
     * Whether to show images. One of
     * `allow`: Show images,
     * `block`: Don't show images.
     * Default is `allow`.
     * The primary URL is the URL of the top-level frame. The secondary URL is the URL of the image.
     */
    export const images: ContentSetting<ImagesContentSetting>;

    /**
     * Whether to run JavaScript. One of
     * `allow`: Run JavaScript,
     * `block`: Don't run JavaScript.
     * Default is `allow`.
     * The primary URL is the URL of the top-level frame. The secondary URL is not used.
     */
    export const javascript: ContentSetting<JavascriptContentSetting>;

    /**
     * Whether to allow Geolocation. One of
     * `allow`: Allow sites to track your physical location,
     * `block`: Don't allow sites to track your physical location,
     * `ask`: Ask before allowing sites to track your physical location.
     * Default is `ask`.
     * The primary URL is the URL of the document which requested location data. The secondary URL is the URL of the top-level frame (which may or may not differ from the requesting URL).
     */
    export const location: ContentSetting<LocationContentSetting>;

    /**
     * _Deprecated._ With Flash support removed in Chrome 88, this permission no longer has any effect. Value is always `block`. Calls to `set()` and `clear()` will be ignored.
     */
    export const plugins: ContentSetting<PluginsContentSetting>;

    /**
     * Whether to allow sites to show pop-ups. One of
     * `allow`: Allow sites to show pop-ups,
     * `block`: Don't allow sites to show pop-ups.
     * Default is `block`.
     * The primary URL is the URL of the top-level frame. The secondary URL is not used.
     */
    export const popups: ContentSetting<PopupsContentSetting>;

    /**
     * Whether to allow sites to show desktop notifications. One of
     * `allow`: Allow sites to show desktop notifications,
     * `block`: Don't allow sites to show desktop notifications,
     * `ask`: Ask when a site wants to show desktop notifications.
     * Default is `ask`.
     * The primary URL is the URL of the document which wants to show the notification. The secondary URL is not used.
     */
    export const notifications: ContentSetting<NotificationsContentSetting>;

    /**
     * _Deprecated._ No longer has any effect. Fullscreen permission is now automatically granted for all sites. Value is always `allow`.
     */
    export const fullscreen: ContentSetting<FullscreenContentSetting>;

    /**
     * _Deprecated._ No longer has any effect. Mouse lock permission is now automatically granted for all sites. Value is always `allow`.
     */
    export const mouselock: ContentSetting<MouselockContentSetting>;

    /**
     * Whether to allow sites to access the microphone. One of
     * `allow`: Allow sites to access the microphone,
     * `block`: Don't allow sites to access the microphone,
     * `ask`: Ask when a site wants to access the microphone.
     * Default is `ask`.
     * The primary URL is the URL of the document which requested microphone access. The secondary URL is not used.
     * NOTE: The 'allow' setting is not valid if both patterns are ''.
     *
     * @since Chrome 46
     */
    export const microphone: ContentSetting<MicrophoneContentSetting>;

    /**
     * Whether to allow sites to access the clipboard via advanced capabilities of the Async Clipboard API. "Advanced" capabilities include anything besides writing built-in formats after a user gesture, i.e. the ability to read, the ability to write custom formats, and the ability to write without a user gesture. One of
     * `allow`: Allow sites to use advanced clipboard capabilities,
     * `block`: Don't allow sites to use advanced clipboard capabilties,
     * `ask`: Ask when a site wants to use advanced clipboard capabilities.
     * Default is `ask`.
     * The primary URL is the URL of the document which requested clipboard access. The secondary URL is not used.
     *
     * @since Chrome 121
     */
    export const clipboard: ContentSetting<ClipboardContentSetting>;

    /**
     * Whether to allow sites to access the camera. One of
     * `allow`: Allow sites to access the camera,
     * `block`: Don't allow sites to access the camera,
     * `ask`: Ask when a site wants to access the camera.
     * Default is `ask`.
     * The primary URL is the URL of the document which requested camera access. The secondary URL is not used.
     * NOTE: The 'allow' setting is not valid if both patterns are ''.
     *
     * @since Chrome 46
     */
    export const camera: ContentSetting<CameraContentSetting>;

    /**
     * _Deprecated._ Previously, controlled whether to allow sites to run plugins unsandboxed, however, with the Flash broker process removed in Chrome 88, this permission no longer has any effect. Value is always `block`. Calls to `set()` and `clear()` will be ignored.
     */
    export const unsandboxedPlugins: ContentSetting<PpapiBrokerContentSetting>;

    /**
     * Whether to allow sites to download multiple files automatically. One of
     * `allow`: Allow sites to download multiple files automatically,
     * `block`: Don't allow sites to download multiple files automatically,
     * `ask`: Ask when a site wants to download files automatically after the first file.
     * Default is `ask`.
     * The primary URL is the URL of the top-level frame. The secondary URL is not used.
     */
    export const automaticDownloads: ContentSetting<MultipleAutomaticDownloadsContentSetting>;
  }

  /**
   * Use the `chrome.contextMenus` API to add items to Google Chrome's context menu. You can choose what types of objects your context menu additions apply to, such as images, hyperlinks, and pages.
   *
   * @chrome-permission contextMenus
   */
  export namespace contextMenus {

    /**
     * The different contexts a menu can appear in. Specifying 'all' is equivalent to the combination of all other contexts except for 'launcher'. The 'launcher' context is only supported by apps and is used to add menu items to the context menu that appears when clicking the app icon in the launcher/taskbar/dock/etc. Different platforms might put limitations on what is actually supported in a launcher context menu.
     *
     * @since Chrome 44
     */
    export type ContextType = "all" | "page" | "frame" | "selection" | "link" | "editable" | "image" | "video" | "audio" | "launcher" | "browser_action" | "page_action" | "action";

    /**
     * The type of menu item.
     *
     * @since Chrome 44
     */
    export type ItemType = "normal" | "checkbox" | "radio" | "separator";

    /**
     * Information sent when a context menu item is clicked.
     */
    export interface OnClickData {

      /**
       * The ID of the menu item that was clicked.
       */
      menuItemId: number | string;

      /**
       * The parent ID, if any, for the item clicked.
       */
      parentMenuItemId?: number | string;

      /**
       * One of 'image', 'video', or 'audio' if the context menu was activated on one of these types of elements.
       */
      mediaType?: string;

      /**
       * If the element is a link, the URL it points to.
       */
      linkUrl?: string;

      /**
       * Will be present for elements with a 'src' URL.
       */
      srcUrl?: string;

      /**
       * The URL of the page where the menu item was clicked. This property is not set if the click occured in a context where there is no current page, such as in a launcher context menu.
       */
      pageUrl?: string;

      /**
       * The URL of the frame of the element where the context menu was clicked, if it was in a frame.
       */
      frameUrl?: string;

      /**
       * The [ID of the frame](https://developer.chrome.com/docs/extensions/reference/webNavigation/#frame_ids) of the element where the context menu was clicked, if it was in a frame.
       *
       * @since Chrome 51
       */
      frameId?: number;

      /**
       * The text for the context selection, if any.
       */
      selectionText?: string;

      /**
       * A flag indicating whether the element is editable (text input, textarea, etc.).
       */
      editable: boolean;

      /**
       * A flag indicating the state of a checkbox or radio item before it was clicked.
       */
      wasChecked?: boolean;

      /**
       * A flag indicating the state of a checkbox or radio item after it is clicked.
       */
      checked?: boolean;
    }

    /**
     * Properties of the new context menu item.
     *
     * @since Pending
     */
    export interface CreateProperties {

      /**
       * The type of menu item. Defaults to `normal`.
       */
      type?: ItemType;

      /**
       * The unique ID to assign to this item. Mandatory for event pages. Cannot be the same as another ID for this extension.
       */
      id?: string;

      /**
       * The text to display in the item; this is _required_ unless `type` is `separator`. When the context is `selection`, use `%s` within the string to show the selected text. For example, if this parameter's value is "Translate '%s' to Pig Latin" and the user selects the word "cool", the context menu item for the selection is "Translate 'cool' to Pig Latin".
       */
      title?: string;

      /**
       * The initial state of a checkbox or radio button: `true` for selected, `false` for unselected. Only one radio button can be selected at a time in a given group.
       */
      checked?: boolean;

      /**
       * List of contexts this menu item will appear in. Defaults to `['page']`.
       */
      contexts?: [ContextType, ...ContextType[]];

      /**
       * Whether the item is visible in the menu.
       */
      visible?: boolean;

      /**
       * A function that is called back when the menu item is clicked. This is not available inside of a service worker; instead, they should register a listener for {@link contextMenus.onClicked}.
       *
       * @param info Information about the item clicked and the context where the click happened.
       * @param tab The details of the tab where the click took place. This parameter is not present for platform apps.
       */
      onclick?: (
        info: OnClickData,
        tab: tabs.Tab,
      ) => void;

      /**
       * The ID of a parent menu item; this makes the item a child of a previously added item.
       */
      parentId?: number | string;

      /**
       * Restricts the item to apply only to documents or frames whose URL matches one of the given patterns. For details on pattern formats, see [Match Patterns](https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns).
       */
      documentUrlPatterns?: string[];

      /**
       * Similar to `documentUrlPatterns`, filters based on the `src` attribute of `img`, `audio`, and `video` tags and the `href` attribute of `a` tags.
       */
      targetUrlPatterns?: string[];

      /**
       * Whether this context menu item is enabled or disabled. Defaults to `true`.
       */
      enabled?: boolean;
    }

    /**
     * The maximum number of top level extension items that can be added to an extension action context menu. Any items beyond this limit will be ignored.
     */
    export const ACTION_MENU_TOP_LEVEL_LIMIT: 6;

    /**
     * Fired when a context menu item is clicked.
     */
    export const onClicked: events.Event<(
      info: OnClickData,
      tab?: tabs.Tab,
    ) => void>;

    /**
     * Creates a new context menu item. If an error occurs during creation, it may not be detected until the creation callback fires; details will be in {@link runtime.lastError}.
     *
     * @param callback Called when the item has been created in the browser. If an error occurs during creation, details will be available in {@link runtime.lastError}.
     * @returns The ID of the newly created item.
     */
    export function create(

      createProperties: CreateProperties,

      callback?: () => void,
    ): number | string;

    /**
     * Updates a previously created context menu item.
     *
     * @chrome-returns-extra since Pending
     * @param id The ID of the item to update.
     * @param updateProperties The properties to update. Accepts the same values as the {@link contextMenus.create} function.
     */
    export function update(

      id: number | string,

      updateProperties: {

        type?: ItemType,

        title?: string,

        checked?: boolean,

        contexts?: [ContextType, ...ContextType[]],

        /**
         * Whether the item is visible in the menu.
         *
         * @since Chrome 62
         */
        visible?: boolean,

        /**
         * @param tab The details of the tab where the click took place. This parameter is not present for platform apps.
         */
        onclick?: (
          /**
           * @since Chrome 44
           */
          info: OnClickData,
          /**
           * @since Chrome 44
           */
          tab: tabs.Tab,
        ) => void,

        /**
         * The ID of the item to be made this item's parent. Note: You cannot set an item to become a child of its own descendant.
         */
        parentId?: number | string,

        documentUrlPatterns?: string[],

        targetUrlPatterns?: string[],

        enabled?: boolean,
      },
    ): Promise<void>;

    /**
     * Updates a previously created context menu item.
     *
     * @param id The ID of the item to update.
     * @param updateProperties The properties to update. Accepts the same values as the {@link contextMenus.create} function.
     * @param callback Called when the context menu has been updated.
     */
    export function update(

      id: number | string,

      updateProperties: {

        type?: ItemType,

        title?: string,

        checked?: boolean,

        contexts?: [ContextType, ...ContextType[]],

        /**
         * Whether the item is visible in the menu.
         *
         * @since Chrome 62
         */
        visible?: boolean,

        /**
         * @param tab The details of the tab where the click took place. This parameter is not present for platform apps.
         */
        onclick?: (
          /**
           * @since Chrome 44
           */
          info: OnClickData,
          /**
           * @since Chrome 44
           */
          tab: tabs.Tab,
        ) => void,

        /**
         * The ID of the item to be made this item's parent. Note: You cannot set an item to become a child of its own descendant.
         */
        parentId?: number | string,

        documentUrlPatterns?: string[],

        targetUrlPatterns?: string[],

        enabled?: boolean,
      },

      callback?: () => void,
    ): void;

    /**
     * Removes a context menu item.
     *
     * @chrome-returns-extra since Pending
     * @param menuItemId The ID of the context menu item to remove.
     */
    export function remove(

      menuItemId: number | string,
    ): Promise<void>;

    /**
     * Removes a context menu item.
     *
     * @param menuItemId The ID of the context menu item to remove.
     * @param callback Called when the context menu has been removed.
     */
    export function remove(

      menuItemId: number | string,

      callback?: () => void,
    ): void;

    /**
     * Removes all context menu items added by this extension.
     *
     * @chrome-returns-extra since Pending
     */
    export function removeAll(): Promise<void>;

    /**
     * Removes all context menu items added by this extension.
     *
     * @param callback Called when removal is complete.
     */
    export function removeAll(

      callback?: () => void,
    ): void;
  }

  /**
   * Use the `chrome.cookies` API to query and modify cookies, and to be notified when they change.
   *
   * @chrome-permission cookies
   */
  export namespace cookies {

    /**
     * A cookie's 'SameSite' state (https://tools.ietf.org/html/draft-west-first-party-cookies). 'no\_restriction' corresponds to a cookie set with 'SameSite=None', 'lax' to 'SameSite=Lax', and 'strict' to 'SameSite=Strict'. 'unspecified' corresponds to a cookie set without the SameSite attribute.
     *
     * @since Chrome 51
     */
    export type SameSiteStatus = "no_restriction" | "lax" | "strict" | "unspecified";

    /**
     * Represents a partitioned cookie's partition key.
     *
     * @since Chrome 119
     */
    export interface CookiePartitionKey {

      /**
       * The top-level site the partitioned cookie is available in.
       */
      topLevelSite?: string;
    }

    /**
     * Represents information about an HTTP cookie.
     */
    export interface Cookie {

      /**
       * The name of the cookie.
       */
      name: string;

      /**
       * The value of the cookie.
       */
      value: string;

      /**
       * The domain of the cookie (e.g. "www.google.com", "example.com").
       */
      domain: string;

      /**
       * True if the cookie is a host-only cookie (i.e. a request's host must exactly match the domain of the cookie).
       */
      hostOnly: boolean;

      /**
       * The path of the cookie.
       */
      path: string;

      /**
       * True if the cookie is marked as Secure (i.e. its scope is limited to secure channels, typically HTTPS).
       */
      secure: boolean;

      /**
       * True if the cookie is marked as HttpOnly (i.e. the cookie is inaccessible to client-side scripts).
       */
      httpOnly: boolean;

      /**
       * The cookie's same-site status (i.e. whether the cookie is sent with cross-site requests).
       *
       * @since Chrome 51
       */
      sameSite: SameSiteStatus;

      /**
       * True if the cookie is a session cookie, as opposed to a persistent cookie with an expiration date.
       */
      session: boolean;

      /**
       * The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.
       */
      expirationDate?: number;

      /**
       * The ID of the cookie store containing this cookie, as provided in getAllCookieStores().
       */
      storeId: string;

      /**
       * The partition key for reading or modifying cookies with the Partitioned attribute.
       *
       * @since Chrome 119
       */
      partitionKey?: CookiePartitionKey;
    }

    /**
     * Represents a cookie store in the browser. An incognito mode window, for instance, uses a separate cookie store from a non-incognito window.
     */
    export interface CookieStore {

      /**
       * The unique identifier for the cookie store.
       */
      id: string;

      /**
       * Identifiers of all the browser tabs that share this cookie store.
       */
      tabIds: number[];
    }

    /**
     * The underlying reason behind the cookie's change. If a cookie was inserted, or removed via an explicit call to "chrome.cookies.remove", "cause" will be "explicit". If a cookie was automatically removed due to expiry, "cause" will be "expired". If a cookie was removed due to being overwritten with an already-expired expiration date, "cause" will be set to "expired\_overwrite". If a cookie was automatically removed due to garbage collection, "cause" will be "evicted". If a cookie was automatically removed due to a "set" call that overwrote it, "cause" will be "overwrite". Plan your response accordingly.
     *
     * @since Chrome 44
     */
    export type OnChangedCause = "evicted" | "expired" | "explicit" | "expired_overwrite" | "overwrite";

    /**
     * Details to identify the cookie.
     *
     * @since Chrome 88
     */
    export interface CookieDetails {

      /**
       * The URL with which the cookie to access is associated. This argument may be a full URL, in which case any data following the URL path (e.g. the query string) is simply ignored. If host permissions for this URL are not specified in the manifest file, the API call will fail.
       */
      url: string;

      /**
       * The name of the cookie to access.
       */
      name: string;

      /**
       * The ID of the cookie store in which to look for the cookie. By default, the current execution context's cookie store will be used.
       */
      storeId?: string;

      /**
       * The partition key for reading or modifying cookies with the Partitioned attribute.
       *
       * @since Chrome 119
       */
      partitionKey?: CookiePartitionKey;
    }

    /**
     * Fired when a cookie is set or removed. As a special case, note that updating a cookie's properties is implemented as a two step process: the cookie to be updated is first removed entirely, generating a notification with "cause" of "overwrite" . Afterwards, a new cookie is written with the updated values, generating a second notification with "cause" "explicit".
     */
    export const onChanged: events.Event<(
      changeInfo: {

        /**
         * True if a cookie was removed.
         */
        removed: boolean,

        /**
         * Information about the cookie that was set or removed.
         */
        cookie: Cookie,

        /**
         * The underlying reason behind the cookie's change.
         */
        cause: OnChangedCause,
      },
    ) => void>;

    /**
     * Retrieves information about a single cookie. If more than one cookie of the same name exists for the given URL, the one with the longest path will be returned. For cookies with the same path length, the cookie with the earliest creation time will be returned.
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function get(

      details: CookieDetails,
    ): Promise<Cookie | undefined>;

    /**
     * Retrieves information about a single cookie. If more than one cookie of the same name exists for the given URL, the one with the longest path will be returned. For cookies with the same path length, the cookie with the earliest creation time will be returned.
     */
    export function get(

      details: CookieDetails,

      /**
       * @param cookie Contains details about the cookie. This parameter is null if no such cookie was found.
       */
      callback?: (
        cookie?: Cookie,
      ) => void,
    ): void;

    /**
     * Retrieves all cookies from a single cookie store that match the given information. The cookies returned will be sorted, with those with the longest path first. If multiple cookies have the same path length, those with the earliest creation time will be first. This method only retrieves cookies for domains that the extension has host permissions to.
     *
     * @chrome-returns-extra since Chrome 88
     * @param details Information to filter the cookies being retrieved.
     */
    export function getAll(

      details: {

        /**
         * Restricts the retrieved cookies to those that would match the given URL.
         */
        url?: string,

        /**
         * Filters the cookies by name.
         */
        name?: string,

        /**
         * Restricts the retrieved cookies to those whose domains match or are subdomains of this one.
         */
        domain?: string,

        /**
         * Restricts the retrieved cookies to those whose path exactly matches this string.
         */
        path?: string,

        /**
         * Filters the cookies by their Secure property.
         */
        secure?: boolean,

        /**
         * Filters out session vs. persistent cookies.
         */
        session?: boolean,

        /**
         * The cookie store to retrieve cookies from. If omitted, the current execution context's cookie store will be used.
         */
        storeId?: string,

        /**
         * The partition key for reading or modifying cookies with the Partitioned attribute.
         *
         * @since Chrome 119
         */
        partitionKey?: CookiePartitionKey,
      },
    ): Promise<Cookie[]>;

    /**
     * Retrieves all cookies from a single cookie store that match the given information. The cookies returned will be sorted, with those with the longest path first. If multiple cookies have the same path length, those with the earliest creation time will be first. This method only retrieves cookies for domains that the extension has host permissions to.
     *
     * @param details Information to filter the cookies being retrieved.
     */
    export function getAll(

      details: {

        /**
         * Restricts the retrieved cookies to those that would match the given URL.
         */
        url?: string,

        /**
         * Filters the cookies by name.
         */
        name?: string,

        /**
         * Restricts the retrieved cookies to those whose domains match or are subdomains of this one.
         */
        domain?: string,

        /**
         * Restricts the retrieved cookies to those whose path exactly matches this string.
         */
        path?: string,

        /**
         * Filters the cookies by their Secure property.
         */
        secure?: boolean,

        /**
         * Filters out session vs. persistent cookies.
         */
        session?: boolean,

        /**
         * The cookie store to retrieve cookies from. If omitted, the current execution context's cookie store will be used.
         */
        storeId?: string,

        /**
         * The partition key for reading or modifying cookies with the Partitioned attribute.
         *
         * @since Chrome 119
         */
        partitionKey?: CookiePartitionKey,
      },

      /**
       * @param cookies All the existing, unexpired cookies that match the given cookie info.
       */
      callback?: (
        cookies: Cookie[],
      ) => void,
    ): void;

    /**
     * Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist.
     *
     * @chrome-returns-extra since Chrome 88
     * @param details Details about the cookie being set.
     */
    export function set(

      details: {

        /**
         * The request-URI to associate with the setting of the cookie. This value can affect the default domain and path values of the created cookie. If host permissions for this URL are not specified in the manifest file, the API call will fail.
         */
        url: string,

        /**
         * The name of the cookie. Empty by default if omitted.
         */
        name?: string,

        /**
         * The value of the cookie. Empty by default if omitted.
         */
        value?: string,

        /**
         * The domain of the cookie. If omitted, the cookie becomes a host-only cookie.
         */
        domain?: string,

        /**
         * The path of the cookie. Defaults to the path portion of the url parameter.
         */
        path?: string,

        /**
         * Whether the cookie should be marked as Secure. Defaults to false.
         */
        secure?: boolean,

        /**
         * Whether the cookie should be marked as HttpOnly. Defaults to false.
         */
        httpOnly?: boolean,

        /**
         * The cookie's same-site status. Defaults to "unspecified", i.e., if omitted, the cookie is set without specifying a SameSite attribute.
         *
         * @since Chrome 51
         */
        sameSite?: SameSiteStatus,

        /**
         * The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted, the cookie becomes a session cookie.
         */
        expirationDate?: number,

        /**
         * The ID of the cookie store in which to set the cookie. By default, the cookie is set in the current execution context's cookie store.
         */
        storeId?: string,

        /**
         * The partition key for reading or modifying cookies with the Partitioned attribute.
         *
         * @since Chrome 119
         */
        partitionKey?: CookiePartitionKey,
      },
    ): Promise<Cookie | undefined>;

    /**
     * Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist.
     *
     * @param details Details about the cookie being set.
     */
    export function set(

      details: {

        /**
         * The request-URI to associate with the setting of the cookie. This value can affect the default domain and path values of the created cookie. If host permissions for this URL are not specified in the manifest file, the API call will fail.
         */
        url: string,

        /**
         * The name of the cookie. Empty by default if omitted.
         */
        name?: string,

        /**
         * The value of the cookie. Empty by default if omitted.
         */
        value?: string,

        /**
         * The domain of the cookie. If omitted, the cookie becomes a host-only cookie.
         */
        domain?: string,

        /**
         * The path of the cookie. Defaults to the path portion of the url parameter.
         */
        path?: string,

        /**
         * Whether the cookie should be marked as Secure. Defaults to false.
         */
        secure?: boolean,

        /**
         * Whether the cookie should be marked as HttpOnly. Defaults to false.
         */
        httpOnly?: boolean,

        /**
         * The cookie's same-site status. Defaults to "unspecified", i.e., if omitted, the cookie is set without specifying a SameSite attribute.
         *
         * @since Chrome 51
         */
        sameSite?: SameSiteStatus,

        /**
         * The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted, the cookie becomes a session cookie.
         */
        expirationDate?: number,

        /**
         * The ID of the cookie store in which to set the cookie. By default, the cookie is set in the current execution context's cookie store.
         */
        storeId?: string,

        /**
         * The partition key for reading or modifying cookies with the Partitioned attribute.
         *
         * @since Chrome 119
         */
        partitionKey?: CookiePartitionKey,
      },

      /**
       * @param cookie Contains details about the cookie that's been set. If setting failed for any reason, this will be "null", and {@link runtime.lastError} will be set.
       */
      callback?: (
        cookie?: Cookie,
      ) => void,
    ): void;

    /**
     * Deletes a cookie by name.
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function remove(

      details: CookieDetails,
    ): Promise<{

      /**
       * The URL associated with the cookie that's been removed.
       */
      url: string,

      /**
       * The name of the cookie that's been removed.
       */
      name: string,

      /**
       * The ID of the cookie store from which the cookie was removed.
       */
      storeId: string,

      /**
       * The partition key for reading or modifying cookies with the Partitioned attribute.
       *
       * @since Chrome 119
       */
      partitionKey?: CookiePartitionKey,
    } | undefined>;

    /**
     * Deletes a cookie by name.
     */
    export function remove(

      details: CookieDetails,

      /**
       * @param details Contains details about the cookie that's been removed. If removal failed for any reason, this will be "null", and {@link runtime.lastError} will be set.
       */
      callback?: (
        details?: {

          /**
           * The URL associated with the cookie that's been removed.
           */
          url: string,

          /**
           * The name of the cookie that's been removed.
           */
          name: string,

          /**
           * The ID of the cookie store from which the cookie was removed.
           */
          storeId: string,

          /**
           * The partition key for reading or modifying cookies with the Partitioned attribute.
           *
           * @since Chrome 119
           */
          partitionKey?: CookiePartitionKey,
        },
      ) => void,
    ): void;

    /**
     * Lists all existing cookie stores.
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function getAllCookieStores(): Promise<CookieStore[]>;

    /**
     * Lists all existing cookie stores.
     */
    export function getAllCookieStores(

      /**
       * @param cookieStores All the existing cookie stores.
       */
      callback?: (
        cookieStores: CookieStore[],
      ) => void,
    ): void;
  }

  /**
   * Stub namespace for manifest keys relating to the cross origin isolation response headers.
   *
   * @since Chrome 93
   */
  export namespace crossOriginIsolation {

    export interface ResponseHeader {

      value?: string;
    }
  }

  /**
   * The `chrome.debugger` API serves as an alternate transport for Chrome's [remote debugging protocol](https://developer.chrome.com/devtools/docs/debugger-protocol). Use `chrome.debugger` to attach to one or more tabs to instrument network interaction, debug JavaScript, mutate the DOM and CSS, etc. Use the Debuggee `tabId` to target tabs with sendCommand and route events by `tabId` from onEvent callbacks.
   *
   * @chrome-permission debugger
   */
  namespace _debugger {

    /**
     * Debuggee identifier. Either tabId or extensionId must be specified
     */
    export interface Debuggee {

      /**
       * The id of the tab which you intend to debug.
       */
      tabId?: number;

      /**
       * The id of the extension which you intend to debug. Attaching to an extension background page is only possible when the `--silent-debugger-extension-api` command-line switch is used.
       */
      extensionId?: string;

      /**
       * The opaque id of the debug target.
       */
      targetId?: string;
    }

    /**
     * Target type.
     *
     * @since Chrome 44
     */
    export type TargetInfoType = "page" | "background_page" | "worker" | "other";

    /**
     * Connection termination reason.
     *
     * @since Chrome 44
     */
    export type DetachReason = "target_closed" | "canceled_by_user";

    /**
     * Debug target information
     */
    export interface TargetInfo {

      /**
       * Target type.
       */
      type: TargetInfoType;

      /**
       * Target id.
       */
      id: string;

      /**
       * The tab id, defined if type == 'page'.
       */
      tabId?: number;

      /**
       * The extension id, defined if type = 'background\_page'.
       */
      extensionId?: string;

      /**
       * True if debugger is already attached.
       */
      attached: boolean;

      /**
       * Target page title.
       */
      title: string;

      /**
       * Target URL.
       */
      url: string;

      /**
       * Target favicon URL.
       */
      faviconUrl?: string;
    }

    /**
     * Fired whenever debugging target issues instrumentation event.
     */
    export const onEvent: events.Event<(
      source: Debuggee,
      method: string,
      params?: {[name: string]: any},
    ) => void>;

    /**
     * Fired when browser terminates debugging session for the tab. This happens when either the tab is being closed or Chrome DevTools is being invoked for the attached tab.
     */
    export const onDetach: events.Event<(
      source: Debuggee,
      reason: DetachReason,
    ) => void>;

    /**
     * Attaches debugger to the given target.
     *
     * @chrome-returns-extra since Chrome 96
     * @param target Debugging target to which you want to attach.
     * @param requiredVersion Required debugging protocol version ("0.1"). One can only attach to the debuggee with matching major version and greater or equal minor version. List of the protocol versions can be obtained [here](https://developer.chrome.com/devtools/docs/debugger-protocol).
     */
    export function attach(

      target: Debuggee,

      requiredVersion: string,
    ): Promise<void>;

    /**
     * Attaches debugger to the given target.
     *
     * @param target Debugging target to which you want to attach.
     * @param requiredVersion Required debugging protocol version ("0.1"). One can only attach to the debuggee with matching major version and greater or equal minor version. List of the protocol versions can be obtained [here](https://developer.chrome.com/devtools/docs/debugger-protocol).
     * @param callback Called once the attach operation succeeds or fails. Callback receives no arguments. If the attach fails, {@link runtime.lastError} will be set to the error message.
     */
    export function attach(

      target: Debuggee,

      requiredVersion: string,

      callback?: () => void,
    ): void;

    /**
     * Detaches debugger from the given target.
     *
     * @chrome-returns-extra since Chrome 96
     * @param target Debugging target from which you want to detach.
     */
    export function detach(

      target: Debuggee,
    ): Promise<void>;

    /**
     * Detaches debugger from the given target.
     *
     * @param target Debugging target from which you want to detach.
     * @param callback Called once the detach operation succeeds or fails. Callback receives no arguments. If the detach fails, {@link runtime.lastError} will be set to the error message.
     */
    export function detach(

      target: Debuggee,

      callback?: () => void,
    ): void;

    /**
     * Sends given command to the debugging target.
     *
     * @chrome-returns-extra since Chrome 96
     * @param target Debugging target to which you want to send the command.
     * @param method Method name. Should be one of the methods defined by the [remote debugging protocol](https://developer.chrome.com/devtools/docs/debugger-protocol).
     * @param commandParams JSON object with request parameters. This object must conform to the remote debugging params scheme for given method.
     */
    export function sendCommand(

      target: Debuggee,

      method: string,

      commandParams?: {[name: string]: any},
    ): Promise<{[name: string]: any} | undefined>;

    /**
     * Sends given command to the debugging target.
     *
     * @param target Debugging target to which you want to send the command.
     * @param method Method name. Should be one of the methods defined by the [remote debugging protocol](https://developer.chrome.com/devtools/docs/debugger-protocol).
     * @param commandParams JSON object with request parameters. This object must conform to the remote debugging params scheme for given method.
     * @param callback Response body. If an error occurs while posting the message, the callback will be called with no arguments and {@link runtime.lastError} will be set to the error message.
     */
    export function sendCommand(

      target: Debuggee,

      method: string,

      commandParams?: {[name: string]: any},

      /**
       * @param result JSON object with the response. Structure of the response varies depending on the method name and is defined by the 'returns' attribute of the command description in the remote debugging protocol.
       */
      callback?: (
        result?: {[name: string]: any},
      ) => void,
    ): void;

    /**
     * Returns the list of available debug targets.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function getTargets(): Promise<TargetInfo[]>;

    /**
     * Returns the list of available debug targets.
     */
    export function getTargets(

      /**
       * @param result Array of TargetInfo objects corresponding to the available debug targets.
       */
      callback?: (
        result: TargetInfo[],
      ) => void,
    ): void;
  }
  export {_debugger as debugger};

  /**
   * Use the `chrome.declarativeContent` API to take actions depending on the content of a page, without requiring permission to read the page's content.
   *
   * @chrome-permission declarativeContent
   */
  export namespace declarativeContent {

    /**
     * See [https://developer.mozilla.org/en-US/docs/Web/API/ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData).
     */
    export type ImageDataType = ImageData;

    /**
     * Matches the state of a web page based on various criteria.
     */
    export class PageStateMatcher {
      constructor(arg: PageStateMatcher);

      /**
       * Matches if the conditions of the `UrlFilter` are fulfilled for the top-level URL of the page.
       */
      pageUrl?: events.UrlFilter;

      /**
       * Matches if all of the CSS selectors in the array match displayed elements in a frame with the same origin as the page's main frame. All selectors in this array must be [compound selectors](https://www.w3.org/TR/selectors4/#compound) to speed up matching. Note: Listing hundreds of CSS selectors or listing CSS selectors that match hundreds of times per page can slow down web sites.
       */
      css?: string[];

      /**
       * Matches if the bookmarked state of the page is equal to the specified value. Requres the [bookmarks permission](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions).
       *
       * @since Chrome 45
       */
      isBookmarked?: boolean;
    }

    /**
     * A declarative event action that sets the extension's {@link pageAction page action} to an enabled state while the corresponding conditions are met. This action can be used without [host permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions#host-permissions), but the extension must have a page action. If the extension has the [activeTab](https://developer.chrome.com/docs/extensions/develop/concepts/activeTab) permission, clicking the page action grants access to the active tab.
     *
     * On pages where the conditions are not met the extension's toolbar action will be grey-scale, and clicking it will open the context menu, instead of triggering the action.
     *
     * @deprecated Please use {@link declarativeContent.ShowAction}.
     * @chrome-deprecated-since Chrome 97
     */
    export class ShowPageAction {
      constructor(arg: ShowPageAction);
    }

    /**
     * A declarative event action that sets the extension's toolbar {@link action action} to an enabled state while the corresponding conditions are met. This action can be used without [host permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions#host-permissions). If the extension has the [activeTab](https://developer.chrome.com/docs/extensions/develop/concepts/activeTab) permission, clicking the page action grants access to the active tab.
     *
     * On pages where the conditions are not met the extension's toolbar action will be grey-scale, and clicking it will open the context menu, instead of triggering the action.
     *
     * @since Chrome 97
     */
    export class ShowAction {
      constructor(arg: ShowAction);
    }

    /**
     * Declarative event action that sets the n-dip square icon for the extension's {@link pageAction page action} or {@link browserAction browser action} while the corresponding conditions are met. This action can be used without [host permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions#host-permissions), but the extension must have a page or browser action.
     *
     * Exactly one of `imageData` or `path` must be specified. Both are dictionaries mapping a number of pixels to an image representation. The image representation in `imageData` is an [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object; for example, from a `canvas` element, while the image representation in `path` is the path to an image file relative to the extension's manifest. If `scale` screen pixels fit into a device-independent pixel, the `scale * n` icon is used. If that scale is missing, another image is resized to the required size.
     */
    export class SetIcon {
      constructor(arg: SetIcon);

      /**
       * Either an `ImageData` object or a dictionary {size -> ImageData} representing an icon to be set. If the icon is specified as a dictionary, the image used is chosen depending on the screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then an image with size `scale * n` is selected, where _n_ is the size of the icon in the UI. At least one image must be specified. Note that `details.imageData = foo` is equivalent to `details.imageData = {'16': foo}`.
       */
      imageData?: ImageDataType | {[name: string]: any};
    }

    /**
     * Declarative event action that injects a content script.
     *
     * **WARNING:** This action is still experimental and is not supported on stable builds of Chrome.
     */
    export class RequestContentScript {
      constructor(arg: RequestContentScript);

      /**
       * Names of CSS files to be injected as a part of the content script.
       */
      css?: string[];

      /**
       * Names of JavaScript files to be injected as a part of the content script.
       */
      js?: string[];

      /**
       * Whether the content script runs in all frames of the matching page, or in only the top frame. Default is `false`.
       */
      allFrames?: boolean;

      /**
       * Whether to insert the content script on `about:blank` and `about:srcdoc`. Default is `false`.
       */
      matchAboutBlank?: boolean;
    }

    export const onPageChanged: events.Event<never, PageStateMatcher, RequestContentScript | SetIcon | ShowPageAction | ShowAction>;
  }

  /**
   * The `chrome.declarativeNetRequest` API is used to block or modify network requests by specifying declarative rules. This lets extensions modify network requests without intercepting them and viewing their content, thus providing more privacy.
   *
   * @since Chrome 84
   * @chrome-permission declarativeNetRequest
   * @chrome-permission declarativeNetRequestWithHostAccess
   */
  export namespace declarativeNetRequest {

    /**
     * This describes the resource type of the network request.
     */
    export type ResourceType = "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "font" | "object" | "xmlhttprequest" | "ping" | "csp_report" | "media" | "websocket" | "webtransport" | "webbundle" | "other";

    /**
     * This describes the HTTP request method of a network request.
     *
     * @since Chrome 91
     */
    export type RequestMethod = "connect" | "delete" | "get" | "head" | "options" | "patch" | "post" | "put" | "other";

    /**
     * This describes whether the request is first or third party to the frame in which it originated. A request is said to be first party if it has the same domain (eTLD+1) as the frame in which the request originated.
     *
     * @chrome-enum "firstParty" The network request is first party to the frame in which it originated.
     * @chrome-enum "thirdParty" The network request is third party to the frame in which it originated.
     */
    export type DomainType = "firstParty" | "thirdParty";

    /**
     * This describes the possible operations for a "modifyHeaders" rule.
     *
     * @chrome-enum "append" Adds a new entry for the specified header. This operation is not supported for request headers.
     * @chrome-enum "set" Sets a new value for the specified header, removing any existing headers with the same name.
     * @chrome-enum "remove" Removes all entries for the specified header.
     * @since Chrome 86
     */
    export type HeaderOperation = "append" | "set" | "remove";

    /**
     * Describes the kind of action to take if a given RuleCondition matches.
     *
     * @chrome-enum "block" Block the network request.
     * @chrome-enum "redirect" Redirect the network request.
     * @chrome-enum "allow" Allow the network request. The request won't be intercepted if there is an allow rule which matches it.
     * @chrome-enum "upgradeScheme" Upgrade the network request url's scheme to https if the request is http or ftp.
     * @chrome-enum "modifyHeaders" Modify request/response headers from the network request.
     * @chrome-enum "allowAllRequests" Allow all requests within a frame hierarchy, including the frame request itself.
     */
    export type RuleActionType = "block" | "redirect" | "allow" | "upgradeScheme" | "modifyHeaders" | "allowAllRequests";

    /**
     * Describes the reason why a given regular expression isn't supported.
     *
     * @chrome-enum "syntaxError" The regular expression is syntactically incorrect, or uses features not available in the [RE2 syntax](https://github.com/google/re2/wiki/Syntax).
     * @chrome-enum "memoryLimitExceeded" The regular expression exceeds the memory limit.
     * @since Chrome 87
     */
    export type UnsupportedRegexReason = "syntaxError" | "memoryLimitExceeded";

    export interface Ruleset {

      /**
       * A non-empty string uniquely identifying the ruleset. IDs beginning with '\_' are reserved for internal use.
       */
      id: string;

      /**
       * The path of the JSON ruleset relative to the extension directory.
       */
      path: string;

      /**
       * Whether the ruleset is enabled by default.
       */
      enabled: boolean;
    }

    export interface QueryKeyValue {

      key: string;

      value: string;

      /**
       * If true, the query key is replaced only if it's already present. Otherwise, the key is also added if it's missing. Defaults to false.
       *
       * @since Chrome 94
       */
      replaceOnly?: boolean;
    }

    export interface QueryTransform {

      /**
       * The list of query keys to be removed.
       */
      removeParams?: string[];

      /**
       * The list of query key-value pairs to be added or replaced.
       */
      addOrReplaceParams?: QueryKeyValue[];
    }

    export interface URLTransform {

      /**
       * The new scheme for the request. Allowed values are "http", "https", "ftp" and "chrome-extension".
       */
      scheme?: string;

      /**
       * The new host for the request.
       */
      host?: string;

      /**
       * The new port for the request. If empty, the existing port is cleared.
       */
      port?: string;

      /**
       * The new path for the request. If empty, the existing path is cleared.
       */
      path?: string;

      /**
       * The new query for the request. Should be either empty, in which case the existing query is cleared; or should begin with '?'.
       */
      query?: string;

      /**
       * Add, remove or replace query key-value pairs.
       */
      queryTransform?: QueryTransform;

      /**
       * The new fragment for the request. Should be either empty, in which case the existing fragment is cleared; or should begin with '#'.
       */
      fragment?: string;

      /**
       * The new username for the request.
       */
      username?: string;

      /**
       * The new password for the request.
       */
      password?: string;
    }

    export interface Redirect {

      /**
       * Path relative to the extension directory. Should start with '/'.
       */
      extensionPath?: string;

      /**
       * Url transformations to perform.
       */
      transform?: URLTransform;

      /**
       * The redirect url. Redirects to JavaScript urls are not allowed.
       */
      url?: string;

      /**
       * Substitution pattern for rules which specify a `regexFilter`. The first match of `regexFilter` within the url will be replaced with this pattern. Within `regexSubstitution`, backslash-escaped digits (\\1 to \\9) can be used to insert the corresponding capture groups. \\0 refers to the entire matching text.
       */
      regexSubstitution?: string;
    }

    export interface RuleCondition {

      /**
       * The pattern which is matched against the network request url. Supported constructs:
       *
       * **'\*'** : Wildcard: Matches any number of characters.
       *
       * **'|'** : Left/right anchor: If used at either end of the pattern, specifies the beginning/end of the url respectively.
       *
       * **'||'** : Domain name anchor: If used at the beginning of the pattern, specifies the start of a (sub-)domain of the URL.
       *
       * **'^'** : Separator character: This matches anything except a letter, a digit or one of the following: \_ - . %. This can also match the end of the URL.
       *
       * Therefore `urlFilter` is composed of the following parts: (optional Left/Domain name anchor) + pattern + (optional Right anchor).
       *
       * If omitted, all urls are matched. An empty string is not allowed.
       *
       * A pattern beginning with `||*` is not allowed. Use `*` instead.
       *
       * Note: Only one of `urlFilter` or `regexFilter` can be specified.
       *
       * Note: The `urlFilter` must be composed of only ASCII characters. This is matched against a url where the host is encoded in the punycode format (in case of internationalized domains) and any other non-ascii characters are url encoded in utf-8. For example, when the request url is http://abc.рф?q=ф, the `urlFilter` will be matched against the url http://abc.xn--p1ai/?q=%D1%84.
       */
      urlFilter?: string;

      /**
       * Regular expression to match against the network request url. This follows the [RE2 syntax](https://github.com/google/re2/wiki/Syntax).
       *
       * Note: Only one of `urlFilter` or `regexFilter` can be specified.
       *
       * Note: The `regexFilter` must be composed of only ASCII characters. This is matched against a url where the host is encoded in the punycode format (in case of internationalized domains) and any other non-ascii characters are url encoded in utf-8.
       */
      regexFilter?: string;

      /**
       * Whether the `urlFilter` or `regexFilter` (whichever is specified) is case sensitive. Default is false.
       */
      isUrlFilterCaseSensitive?: boolean;

      /**
       * The rule will only match network requests originating from the list of `initiatorDomains`. If the list is omitted, the rule is applied to requests from all domains. An empty list is not allowed.
       *
       * Notes:
       *
       * *   Sub-domains like "a.example.com" are also allowed.
       * *   The entries must consist of only ascii characters.
       * *   Use punycode encoding for internationalized domains.
       * *   This matches against the request initiator and not the request url.
       * *   Sub-domains of the listed domains are also matched.
       *
       * @since Chrome 101
       */
      initiatorDomains?: string[];

      /**
       * The rule will not match network requests originating from the list of `excludedInitiatorDomains`. If the list is empty or omitted, no domains are excluded. This takes precedence over `initiatorDomains`.
       *
       * Notes:
       *
       * *   Sub-domains like "a.example.com" are also allowed.
       * *   The entries must consist of only ascii characters.
       * *   Use punycode encoding for internationalized domains.
       * *   This matches against the request initiator and not the request url.
       * *   Sub-domains of the listed domains are also excluded.
       *
       * @since Chrome 101
       */
      excludedInitiatorDomains?: string[];

      /**
       * The rule will only match network requests when the domain matches one from the list of `requestDomains`. If the list is omitted, the rule is applied to requests from all domains. An empty list is not allowed.
       *
       * Notes:
       *
       * *   Sub-domains like "a.example.com" are also allowed.
       * *   The entries must consist of only ascii characters.
       * *   Use punycode encoding for internationalized domains.
       * *   Sub-domains of the listed domains are also matched.
       *
       * @since Chrome 101
       */
      requestDomains?: string[];

      /**
       * The rule will not match network requests when the domains matches one from the list of `excludedRequestDomains`. If the list is empty or omitted, no domains are excluded. This takes precedence over `requestDomains`.
       *
       * Notes:
       *
       * *   Sub-domains like "a.example.com" are also allowed.
       * *   The entries must consist of only ascii characters.
       * *   Use punycode encoding for internationalized domains.
       * *   Sub-domains of the listed domains are also excluded.
       *
       * @since Chrome 101
       */
      excludedRequestDomains?: string[];

      /**
       * The rule will only match network requests originating from the list of `domains`.
       *
       * @deprecated Use {@link initiatorDomains} instead
       * @chrome-deprecated-since Chrome 101
       */
      domains?: string[];

      /**
       * The rule will not match network requests originating from the list of `excludedDomains`.
       *
       * @deprecated Use {@link excludedInitiatorDomains} instead
       * @chrome-deprecated-since Chrome 101
       */
      excludedDomains?: string[];

      /**
       * List of resource types which the rule can match. An empty list is not allowed.
       *
       * Note: this must be specified for `allowAllRequests` rules and may only include the `sub_frame` and `main_frame` resource types.
       */
      resourceTypes?: ResourceType[];

      /**
       * List of resource types which the rule won't match. Only one of `resourceTypes` and `excludedResourceTypes` should be specified. If neither of them is specified, all resource types except "main\_frame" are blocked.
       */
      excludedResourceTypes?: ResourceType[];

      /**
       * List of HTTP request methods which the rule can match. An empty list is not allowed.
       *
       * Note: Specifying a `requestMethods` rule condition will also exclude non-HTTP(s) requests, whereas specifying `excludedRequestMethods` will not.
       *
       * @since Chrome 91
       */
      requestMethods?: RequestMethod[];

      /**
       * List of request methods which the rule won't match. Only one of `requestMethods` and `excludedRequestMethods` should be specified. If neither of them is specified, all request methods are matched.
       *
       * @since Chrome 91
       */
      excludedRequestMethods?: RequestMethod[];

      /**
       * Specifies whether the network request is first-party or third-party to the domain from which it originated. If omitted, all requests are accepted.
       */
      domainType?: DomainType;

      /**
       * List of {@link tabs.Tab.id} which the rule should match. An ID of {@link tabs.TAB_ID_NONE} matches requests which don't originate from a tab. An empty list is not allowed. Only supported for session-scoped rules.
       *
       * @since Chrome 92
       */
      tabIds?: number[];

      /**
       * List of {@link tabs.Tab.id} which the rule should not match. An ID of {@link tabs.TAB_ID_NONE} excludes requests which don't originate from a tab. Only supported for session-scoped rules.
       *
       * @since Chrome 92
       */
      excludedTabIds?: number[];
    }

    /**
     * @since Chrome 86
     */
    export interface ModifyHeaderInfo {

      /**
       * The name of the header to be modified.
       */
      header: string;

      /**
       * The operation to be performed on a header.
       */
      operation: HeaderOperation;

      /**
       * The new value for the header. Must be specified for `append` and `set` operations.
       */
      value?: string;
    }

    export interface RuleAction {

      /**
       * The type of action to perform.
       */
      type: RuleActionType;

      /**
       * Describes how the redirect should be performed. Only valid for redirect rules.
       */
      redirect?: Redirect;

      /**
       * The request headers to modify for the request. Only valid if RuleActionType is "modifyHeaders".
       *
       * @since Chrome 86
       */
      requestHeaders?: ModifyHeaderInfo[];

      /**
       * The response headers to modify for the request. Only valid if RuleActionType is "modifyHeaders".
       *
       * @since Chrome 86
       */
      responseHeaders?: ModifyHeaderInfo[];
    }

    export interface Rule {

      /**
       * An id which uniquely identifies a rule. Mandatory and should be >= 1.
       */
      id: number;

      /**
       * Rule priority. Defaults to 1. When specified, should be >= 1.
       */
      priority?: number;

      /**
       * The condition under which this rule is triggered.
       */
      condition: RuleCondition;

      /**
       * The action to take if this rule is matched.
       */
      action: RuleAction;
    }

    export interface MatchedRule {

      /**
       * A matching rule's ID.
       */
      ruleId: number;

      /**
       * ID of the {@link Ruleset} this rule belongs to. For a rule originating from the set of dynamic rules, this will be equal to {@link DYNAMIC_RULESET_ID}.
       */
      rulesetId: string;
    }

    /**
     * @since Chrome 111
     */
    export interface GetRulesFilter {

      /**
       * If specified, only rules with matching IDs are included.
       */
      ruleIds?: number[];
    }

    export interface MatchedRuleInfo {

      rule: MatchedRule;

      /**
       * The time the rule was matched. Timestamps will correspond to the Javascript convention for times, i.e. number of milliseconds since the epoch.
       */
      timeStamp: number;

      /**
       * The tabId of the tab from which the request originated if the tab is still active. Else -1.
       */
      tabId: number;
    }

    export interface MatchedRulesFilter {

      /**
       * If specified, only matches rules for the given tab. Matches rules not associated with any active tab if set to -1.
       */
      tabId?: number;

      /**
       * If specified, only matches rules after the given timestamp.
       */
      minTimeStamp?: number;
    }

    export interface RulesMatchedDetails {

      /**
       * Rules matching the given filter.
       */
      rulesMatchedInfo: MatchedRuleInfo[];
    }

    export interface RequestDetails {

      /**
       * The ID of the request. Request IDs are unique within a browser session.
       */
      requestId: string;

      /**
       * The URL of the request.
       */
      url: string;

      /**
       * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
       */
      initiator?: string;

      /**
       * Standard HTTP method.
       */
      method: string;

      /**
       * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
       */
      frameId: number;

      /**
       * The unique identifier for the frame's document, if this request is for a frame.
       *
       * @since Chrome 106
       */
      documentId?: string;

      /**
       * The type of the frame, if this request is for a frame.
       *
       * @since Chrome 106
       */
      frameType?: extensionTypes.FrameType;

      /**
       * The lifecycle of the frame's document, if this request is for a frame.
       *
       * @since Chrome 106
       */
      documentLifecycle?: extensionTypes.DocumentLifecycle;

      /**
       * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
       */
      parentFrameId: number;

      /**
       * The unique identifier for the frame's parent document, if this request is for a frame and has a parent.
       *
       * @since Chrome 106
       */
      parentDocumentId?: string;

      /**
       * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
       */
      tabId: number;

      /**
       * The resource type of the request.
       */
      type: ResourceType;
    }

    /**
     * @since Chrome 103
     */
    export interface TestMatchRequestDetails {

      /**
       * The URL of the hypothetical request.
       */
      url: string;

      /**
       * The initiator URL (if any) for the hypothetical request.
       */
      initiator?: string;

      /**
       * Standard HTTP method of the hypothetical request. Defaults to "get" for HTTP requests and is ignored for non-HTTP requests.
       */
      method?: RequestMethod;

      /**
       * The resource type of the hypothetical request.
       */
      type: ResourceType;

      /**
       * The ID of the tab in which the hypothetical request takes place. Does not need to correspond to a real tab ID. Default is -1, meaning that the request isn't related to a tab.
       */
      tabId?: number;
    }

    export interface MatchedRuleInfoDebug {

      rule: MatchedRule;

      /**
       * Details about the request for which the rule was matched.
       */
      request: RequestDetails;
    }

    /**
     * @since Chrome 87
     */
    export interface RegexOptions {

      /**
       * The regular expresson to check.
       */
      regex: string;

      /**
       * Whether the `regex` specified is case sensitive. Default is true.
       */
      isCaseSensitive?: boolean;

      /**
       * Whether the `regex` specified requires capturing. Capturing is only required for redirect rules which specify a `regexSubstition` action. The default is false.
       */
      requireCapturing?: boolean;
    }

    /**
     * @since Chrome 87
     */
    export interface IsRegexSupportedResult {

      isSupported: boolean;

      /**
       * Specifies the reason why the regular expression is not supported. Only provided if `isSupported` is false.
       */
      reason?: UnsupportedRegexReason;
    }

    /**
     * @since Chrome 103
     */
    export interface TestMatchOutcomeResult {

      /**
       * The rules (if any) that match the hypothetical request.
       */
      matchedRules: MatchedRule[];
    }

    /**
     * @since Chrome 87
     */
    export interface UpdateRuleOptions {

      /**
       * IDs of the rules to remove. Any invalid IDs will be ignored.
       */
      removeRuleIds?: number[];

      /**
       * Rules to add.
       */
      addRules?: Rule[];
    }

    /**
     * @since Chrome 87
     */
    export interface UpdateRulesetOptions {

      /**
       * The set of ids corresponding to a static {@link Ruleset} that should be disabled.
       */
      disableRulesetIds?: string[];

      /**
       * The set of ids corresponding to a static {@link Ruleset} that should be enabled.
       */
      enableRulesetIds?: string[];
    }

    /**
     * @since Chrome 111
     */
    export interface UpdateStaticRulesOptions {

      /**
       * The id corresponding to a static {@link Ruleset}.
       */
      rulesetId: string;

      /**
       * Set of ids corresponding to rules in the {@link Ruleset} to disable.
       */
      disableRuleIds?: number[];

      /**
       * Set of ids corresponding to rules in the {@link Ruleset} to enable.
       */
      enableRuleIds?: number[];
    }

    /**
     * @since Chrome 111
     */
    export interface GetDisabledRuleIdsOptions {

      /**
       * The id corresponding to a static {@link Ruleset}.
       */
      rulesetId: string;
    }

    /**
     * @since Chrome 89
     */
    export interface TabActionCountUpdate {

      /**
       * The tab for which to update the action count.
       */
      tabId: number;

      /**
       * The amount to increment the tab's action count by. Negative values will decrement the count.
       */
      increment: number;
    }

    /**
     * @since Chrome 88
     */
    export interface ExtensionActionOptions {

      /**
       * Whether to automatically display the action count for a page as the extension's badge text. This preference is persisted across sessions.
       */
      displayActionCountAsBadgeText?: boolean;

      /**
       * Details of how the tab's action count should be adjusted.
       *
       * @since Chrome 89
       */
      tabUpdate?: TabActionCountUpdate;
    }

    /**
     * The minimum number of static rules guaranteed to an extension across its enabled static rulesets. Any rules above this limit will count towards the [global static rule limit](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#global-static-rule-limit).
     *
     * @since Chrome 89
     */
    export const GUARANTEED_MINIMUM_STATIC_RULES: 30000;

    /**
     * The maximum number of dynamic rules that an extension can add.
     */
    export const MAX_NUMBER_OF_DYNAMIC_RULES: 30000;

    /**
     * The maximum number of "unsafe" dynamic rules that an extension can add.
     *
     * @since Chrome 120
     */
    export const MAX_NUMBER_OF_UNSAFE_DYNAMIC_RULES: 5000;

    /**
     * The maximum number of session scoped rules that an extension can add.
     *
     * @since Chrome 120
     */
    export const MAX_NUMBER_OF_SESSION_RULES: 5000;

    /**
     * The maximum number of "unsafe" session scoped rules that an extension can add.
     *
     * @since Chrome 120
     */
    export const MAX_NUMBER_OF_UNSAFE_SESSION_RULES: 5000;

    /**
     * Time interval within which `MAX_GETMATCHEDRULES_CALLS_PER_INTERVAL getMatchedRules` calls can be made, specified in minutes. Additional calls will fail immediately and set {@link runtime.lastError}. Note: `getMatchedRules` calls associated with a user gesture are exempt from the quota.
     */
    export const GETMATCHEDRULES_QUOTA_INTERVAL: 10;

    /**
     * The number of times `getMatchedRules` can be called within a period of `GETMATCHEDRULES_QUOTA_INTERVAL`.
     */
    export const MAX_GETMATCHEDRULES_CALLS_PER_INTERVAL: 20;

    /**
     * The maximum number of regular expression rules that an extension can add. This limit is evaluated separately for the set of dynamic rules and those specified in the rule resources file.
     */
    export const MAX_NUMBER_OF_REGEX_RULES: 1000;

    /**
     * The maximum number of static `Rulesets` an extension can specify as part of the `"rule_resources"` manifest key.
     */
    export const MAX_NUMBER_OF_STATIC_RULESETS: 100;

    /**
     * The maximum number of static `Rulesets` an extension can enable at any one time.
     *
     * @since Chrome 94
     */
    export const MAX_NUMBER_OF_ENABLED_STATIC_RULESETS: 50;

    /**
     * Ruleset ID for the dynamic rules added by the extension.
     */
    export const DYNAMIC_RULESET_ID: "_dynamic";

    /**
     * Ruleset ID for the session-scoped rules added by the extension.
     *
     * @since Chrome 90
     */
    export const SESSION_RULESET_ID: "_session";

    /**
     * Fired when a rule is matched with a request. Only available for unpacked extensions with the `"declarativeNetRequestFeedback"` permission as this is intended to be used for debugging purposes only.
     *
     * @chrome-permission declarativeNetRequestFeedback
     */
    export const onRuleMatchedDebug: events.Event<(
      /**
       * @since Chrome 85
       */
      info: MatchedRuleInfoDebug,
    ) => void>;

    /**
     * Modifies the current set of dynamic rules for the extension. The rules with IDs listed in `options.removeRuleIds` are first removed, and then the rules given in `options.addRules` are added. Notes:
     *
     * *   This update happens as a single atomic operation: either all specified rules are added and removed, or an error is returned.
     * *   These rules are persisted across browser sessions and across extension updates.
     * *   Static rules specified as part of the extension package can not be removed using this function.
     * *   {@link MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES} is the maximum number of combined dynamic and session rules an extension can add.
     *
     * @chrome-returns-extra since Chrome 91
     */
    export function updateDynamicRules(

      /**
       * @since Chrome 87
       */
      options: UpdateRuleOptions,
    ): Promise<void>;

    /**
     * Modifies the current set of dynamic rules for the extension. The rules with IDs listed in `options.removeRuleIds` are first removed, and then the rules given in `options.addRules` are added. Notes:
     *
     * *   This update happens as a single atomic operation: either all specified rules are added and removed, or an error is returned.
     * *   These rules are persisted across browser sessions and across extension updates.
     * *   Static rules specified as part of the extension package can not be removed using this function.
     * *   {@link MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES} is the maximum number of combined dynamic and session rules an extension can add.
     *
     * @param callback Called once the update is complete or has failed. In case of an error, {@link runtime.lastError} will be set and no change will be made to the rule set. This can happen for multiple reasons, such as invalid rule format, duplicate rule ID, rule count limit exceeded, internal errors, and others.
     */
    export function updateDynamicRules(

      /**
       * @since Chrome 87
       */
      options: UpdateRuleOptions,

      callback?: () => void,
    ): void;

    /**
     * Returns the current set of dynamic rules for the extension. Callers can optionally filter the list of fetched rules by specifying a `filter`.
     *
     * @chrome-returns-extra since Chrome 91
     * @param filter An object to filter the list of fetched rules.
     */
    export function getDynamicRules(

      /**
       * @since Chrome 111
       */
      filter?: GetRulesFilter,
    ): Promise<Rule[]>;

    /**
     * Returns the current set of dynamic rules for the extension. Callers can optionally filter the list of fetched rules by specifying a `filter`.
     *
     * @param filter An object to filter the list of fetched rules.
     * @param callback Called with the set of dynamic rules. An error might be raised in case of transient internal errors.
     */
    export function getDynamicRules(

      /**
       * @since Chrome 111
       */
      filter?: GetRulesFilter,

      callback?: (
        rules: Rule[],
      ) => void,
    ): void;

    /**
     * Modifies the current set of session scoped rules for the extension. The rules with IDs listed in `options.removeRuleIds` are first removed, and then the rules given in `options.addRules` are added. Notes:
     *
     * *   This update happens as a single atomic operation: either all specified rules are added and removed, or an error is returned.
     * *   These rules are not persisted across sessions and are backed in memory.
     * *   {@link MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES} is the maximum number of combined dynamic and session rules an extension can add.
     *
     * @chrome-returns-extra since Chrome 91
     * @since Chrome 90
     */
    export function updateSessionRules(

      options: UpdateRuleOptions,
    ): Promise<void>;

    /**
     * Modifies the current set of session scoped rules for the extension. The rules with IDs listed in `options.removeRuleIds` are first removed, and then the rules given in `options.addRules` are added. Notes:
     *
     * *   This update happens as a single atomic operation: either all specified rules are added and removed, or an error is returned.
     * *   These rules are not persisted across sessions and are backed in memory.
     * *   {@link MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES} is the maximum number of combined dynamic and session rules an extension can add.
     *
     * @param callback Called once the update is complete or has failed. In case of an error, {@link runtime.lastError} will be set and no change will be made to the rule set. This can happen for multiple reasons, such as invalid rule format, duplicate rule ID, rule count limit exceeded, and others.
     * @since Chrome 90
     */
    export function updateSessionRules(

      options: UpdateRuleOptions,

      callback?: () => void,
    ): void;

    /**
     * Returns the current set of session scoped rules for the extension. Callers can optionally filter the list of fetched rules by specifying a `filter`.
     *
     * @chrome-returns-extra since Chrome 91
     * @param filter An object to filter the list of fetched rules.
     * @since Chrome 90
     */
    export function getSessionRules(

      /**
       * @since Chrome 111
       */
      filter?: GetRulesFilter,
    ): Promise<Rule[]>;

    /**
     * Returns the current set of session scoped rules for the extension. Callers can optionally filter the list of fetched rules by specifying a `filter`.
     *
     * @param filter An object to filter the list of fetched rules.
     * @param callback Called with the set of session scoped rules.
     * @since Chrome 90
     */
    export function getSessionRules(

      /**
       * @since Chrome 111
       */
      filter?: GetRulesFilter,

      callback?: (
        rules: Rule[],
      ) => void,
    ): void;

    /**
     * Updates the set of enabled static rulesets for the extension. The rulesets with IDs listed in `options.disableRulesetIds` are first removed, and then the rulesets listed in `options.enableRulesetIds` are added.
     * Note that the set of enabled static rulesets is persisted across sessions but not across extension updates, i.e. the `rule_resources` manifest key will determine the set of enabled static rulesets on each extension update.
     *
     * @chrome-returns-extra since Chrome 91
     */
    export function updateEnabledRulesets(

      /**
       * @since Chrome 87
       */
      options: UpdateRulesetOptions,
    ): Promise<void>;

    /**
     * Updates the set of enabled static rulesets for the extension. The rulesets with IDs listed in `options.disableRulesetIds` are first removed, and then the rulesets listed in `options.enableRulesetIds` are added.
     * Note that the set of enabled static rulesets is persisted across sessions but not across extension updates, i.e. the `rule_resources` manifest key will determine the set of enabled static rulesets on each extension update.
     *
     * @param callback Called once the update is complete. In case of an error, {@link runtime.lastError} will be set and no change will be made to set of enabled rulesets. This can happen for multiple reasons, such as invalid ruleset IDs, rule count limit exceeded, or internal errors.
     */
    export function updateEnabledRulesets(

      /**
       * @since Chrome 87
       */
      options: UpdateRulesetOptions,

      callback?: () => void,
    ): void;

    /**
     * Returns the ids for the current set of enabled static rulesets.
     *
     * @chrome-returns-extra since Chrome 91
     */
    export function getEnabledRulesets(): Promise<string[]>;

    /**
     * Returns the ids for the current set of enabled static rulesets.
     *
     * @param callback Called with a list of ids, where each id corresponds to an enabled static {@link Ruleset}.
     */
    export function getEnabledRulesets(

      callback?: (
        rulesetIds: string[],
      ) => void,
    ): void;

    /**
     * Disables and enables individual static rules in a {@link Ruleset}. Changes to rules belonging to a disabled {@link Ruleset} will take effect the next time that it becomes enabled.
     *
     * @since Chrome 111
     */
    export function updateStaticRules(

      options: UpdateStaticRulesOptions,
    ): Promise<void>;

    /**
     * Disables and enables individual static rules in a {@link Ruleset}. Changes to rules belonging to a disabled {@link Ruleset} will take effect the next time that it becomes enabled.
     *
     * @param callback Called once the update is complete. In case of an error, {@link runtime.lastError} will be set and no change will be made to the enabled static rules.
     * @since Chrome 111
     */
    export function updateStaticRules(

      options: UpdateStaticRulesOptions,

      callback?: () => void,
    ): void;

    /**
     * Returns the list of static rules in the given {@link Ruleset} that are currently disabled.
     *
     * @param options Specifies the ruleset to query.
     * @since Chrome 111
     */
    export function getDisabledRuleIds(

      options: GetDisabledRuleIdsOptions,
    ): Promise<number[]>;

    /**
     * Returns the list of static rules in the given {@link Ruleset} that are currently disabled.
     *
     * @param options Specifies the ruleset to query.
     * @param callback Called with a list of ids that correspond to the disabled rules in that ruleset.
     * @since Chrome 111
     */
    export function getDisabledRuleIds(

      options: GetDisabledRuleIdsOptions,

      callback?: (
        disabledRuleIds: number[],
      ) => void,
    ): void;

    /**
     * Returns all rules matched for the extension. Callers can optionally filter the list of matched rules by specifying a `filter`. This method is only available to extensions with the `"declarativeNetRequestFeedback"` permission or having the `"activeTab"` permission granted for the `tabId` specified in `filter`. Note: Rules not associated with an active document that were matched more than five minutes ago will not be returned.
     *
     * @chrome-returns-extra since Chrome 91
     * @param filter An object to filter the list of matched rules.
     */
    export function getMatchedRules(

      filter?: MatchedRulesFilter,
    ): Promise<RulesMatchedDetails>;

    /**
     * Returns all rules matched for the extension. Callers can optionally filter the list of matched rules by specifying a `filter`. This method is only available to extensions with the `"declarativeNetRequestFeedback"` permission or having the `"activeTab"` permission granted for the `tabId` specified in `filter`. Note: Rules not associated with an active document that were matched more than five minutes ago will not be returned.
     *
     * @param filter An object to filter the list of matched rules.
     * @param callback Called once the list of matched rules has been fetched. In case of an error, {@link runtime.lastError} will be set and no rules will be returned. This can happen for multiple reasons, such as insufficient permissions, or exceeding the quota.
     */
    export function getMatchedRules(

      filter?: MatchedRulesFilter,

      callback?: (
        details: RulesMatchedDetails,
      ) => void,
    ): void;

    /**
     * Configures if the action count for tabs should be displayed as the extension action's badge text and provides a way for that action count to be incremented.
     *
     * @chrome-returns-extra since Chrome 91
     * @since Chrome 88
     */
    export function setExtensionActionOptions(

      options: ExtensionActionOptions,
    ): Promise<void>;

    /**
     * Configures if the action count for tabs should be displayed as the extension action's badge text and provides a way for that action count to be incremented.
     *
     * @since Chrome 88
     */
    export function setExtensionActionOptions(

      options: ExtensionActionOptions,

      /**
       * @since Chrome 89
       */
      callback?: () => void,
    ): void;

    /**
     * Checks if the given regular expression will be supported as a `regexFilter` rule condition.
     *
     * @chrome-returns-extra since Chrome 91
     * @param regexOptions The regular expression to check.
     * @since Chrome 87
     */
    export function isRegexSupported(

      regexOptions: RegexOptions,
    ): Promise<IsRegexSupportedResult>;

    /**
     * Checks if the given regular expression will be supported as a `regexFilter` rule condition.
     *
     * @param regexOptions The regular expression to check.
     * @param callback Called with details consisting of whether the regular expression is supported and the reason if not.
     * @since Chrome 87
     */
    export function isRegexSupported(

      regexOptions: RegexOptions,

      callback?: (
        result: IsRegexSupportedResult,
      ) => void,
    ): void;

    /**
     * Returns the number of static rules an extension can enable before the [global static rule limit](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#global-static-rule-limit) is reached.
     *
     * @chrome-returns-extra since Chrome 91
     * @since Chrome 89
     */
    export function getAvailableStaticRuleCount(): Promise<number>;

    /**
     * Returns the number of static rules an extension can enable before the [global static rule limit](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#global-static-rule-limit) is reached.
     *
     * @since Chrome 89
     */
    export function getAvailableStaticRuleCount(

      callback?: (
        count: number,
      ) => void,
    ): void;

    /**
     * Checks if any of the extension's declarativeNetRequest rules would match a hypothetical request. Note: Only available for unpacked extensions as this is only intended to be used during extension development.
     *
     * @since Chrome 103
     */
    export function testMatchOutcome(

      request: TestMatchRequestDetails,
    ): Promise<TestMatchOutcomeResult>;

    /**
     * Checks if any of the extension's declarativeNetRequest rules would match a hypothetical request. Note: Only available for unpacked extensions as this is only intended to be used during extension development.
     *
     * @param callback Called with the details of matched rules.
     * @since Chrome 103
     */
    export function testMatchOutcome(

      request: TestMatchRequestDetails,

      callback?: (
        result: TestMatchOutcomeResult,
      ) => void,
    ): void;
  }

  /**
   * The Desktop Capture API captures the content of the screen, individual windows, or individual tabs.
   *
   * @chrome-permission desktopCapture
   */
  export namespace desktopCapture {

    /**
     * Enum used to define set of desktop media sources used in chooseDesktopMedia().
     */
    export type DesktopCaptureSourceType = "screen" | "window" | "tab" | "audio";

    /**
     * Mirrors [SystemAudioPreferenceEnum](https://w3c.github.io/mediacapture-screen-share/#dom-systemaudiopreferenceenum).
     *
     * @since Chrome 105
     */
    export type SystemAudioPreferenceEnum = "include" | "exclude";

    /**
     * Mirrors [SelfCapturePreferenceEnum](https://w3c.github.io/mediacapture-screen-share/#dom-selfcapturepreferenceenum).
     *
     * @since Chrome 107
     */
    export type SelfCapturePreferenceEnum = "include" | "exclude";

    /**
     * Shows desktop media picker UI with the specified set of sources.
     *
     * @param sources Set of sources that should be shown to the user. The sources order in the set decides the tab order in the picker.
     * @param targetTab Optional tab for which the stream is created. If not specified then the resulting stream can be used only by the calling extension. The stream can only be used by frames in the given tab whose security origin matches `tab.url`. The tab's origin must be a secure origin, e.g. HTTPS.
     * @returns An id that can be passed to cancelChooseDesktopMedia() in case the prompt need to be canceled.
     */
    export function chooseDesktopMedia(

      sources: DesktopCaptureSourceType[],

      targetTab: tabs.Tab,

      /**
       * @param streamId An opaque string that can be passed to `getUserMedia()` API to generate media stream that corresponds to the source selected by the user. If user didn't select any source (i.e. canceled the prompt) then the callback is called with an empty `streamId`. The created `streamId` can be used only once and expires after a few seconds when it is not used.
       * @param options Contains properties that describe the stream.
       */
      callback: (
        streamId: string,
        /**
         * @since Chrome 57
         */
        options: {

          /**
           * True if "audio" is included in parameter sources, and the end user does not uncheck the "Share audio" checkbox. Otherwise false, and in this case, one should not ask for audio stream through getUserMedia call.
           */
          canRequestAudioTrack: boolean,
        },
      ) => void,
    ): number;

    /**
     * Shows desktop media picker UI with the specified set of sources.
     *
     * @param sources Set of sources that should be shown to the user. The sources order in the set decides the tab order in the picker.
     * @returns An id that can be passed to cancelChooseDesktopMedia() in case the prompt need to be canceled.
     */
    export function chooseDesktopMedia(

      sources: DesktopCaptureSourceType[],

      /**
       * @param streamId An opaque string that can be passed to `getUserMedia()` API to generate media stream that corresponds to the source selected by the user. If user didn't select any source (i.e. canceled the prompt) then the callback is called with an empty `streamId`. The created `streamId` can be used only once and expires after a few seconds when it is not used.
       * @param options Contains properties that describe the stream.
       */
      callback: (
        streamId: string,
        /**
         * @since Chrome 57
         */
        options: {

          /**
           * True if "audio" is included in parameter sources, and the end user does not uncheck the "Share audio" checkbox. Otherwise false, and in this case, one should not ask for audio stream through getUserMedia call.
           */
          canRequestAudioTrack: boolean,
        },
      ) => void,
    ): number;

    /**
     * Hides desktop media picker dialog shown by chooseDesktopMedia().
     *
     * @param desktopMediaRequestId Id returned by chooseDesktopMedia()
     */
    export function cancelChooseDesktopMedia(

      desktopMediaRequestId: number,
    ): void;
  }

  /**
   * Use the `chrome.devtools.inspectedWindow` API to interact with the inspected window: obtain the tab ID for the inspected page, evaluate the code in the context of the inspected window, reload the page, or obtain the list of resources within the page.
   *
   * @chrome-manifest devtools_page
   */
  export namespace devtools.inspectedWindow {

    /**
     * A resource within the inspected page, such as a document, a script, or an image.
     */
    export interface Resource {

      /**
       * The URL of the resource.
       */
      url: string;

      /**
       * Gets the content of the resource.
       *
       * @param callback A function that receives resource content when the request completes.
       */
      getContent(

        /**
         * @param content Content of the resource (potentially encoded).
         * @param encoding Empty if the content is not encoded, encoding name otherwise. Currently, only base64 is supported.
         */
        callback: (
          content: string,
          encoding: string,
        ) => void,
      ): void;

      /**
       * Sets the content of the resource.
       *
       * @param content New content of the resource. Only resources with the text type are currently supported.
       * @param commit True if the user has finished editing the resource, and the new content of the resource should be persisted; false if this is a minor change sent in progress of the user editing the resource.
       * @param callback A function called upon request completion.
       */
      setContent(

        content: string,

        commit: boolean,

        /**
         * @param error Set to undefined if the resource content was set successfully; describes error otherwise.
         */
        callback?: (
          error?: {[name: string]: any},
        ) => void,
      ): void;
    }

    /**
     * The ID of the tab being inspected. This ID may be used with chrome.tabs.\* API.
     */
    export const tabId: number;

    /**
     * Fired when a new resource is added to the inspected page.
     */
    export const onResourceAdded: events.Event<(
      resource: Resource,
    ) => void>;

    /**
     * Fired when a new revision of the resource is committed (e.g. user saves an edited version of the resource in the Developer Tools).
     */
    export const onResourceContentCommitted: events.Event<(
      resource: Resource,
      content: string,
    ) => void>;

    export {_eval as eval};

    /**
     * Evaluates a JavaScript expression in the context of the main frame of the inspected page. The expression must evaluate to a JSON-compliant object, otherwise an exception is thrown. The eval function can report either a DevTools-side error or a JavaScript exception that occurs during evaluation. In either case, the `result` parameter of the callback is `undefined`. In the case of a DevTools-side error, the `isException` parameter is non-null and has `isError` set to true and `code` set to an error code. In the case of a JavaScript error, `isException` is set to true and `value` is set to the string value of thrown object.
     *
     * @param expression An expression to evaluate.
     * @param options The options parameter can contain one or more options.
     * @param callback A function called when evaluation completes.
     */
    function _eval(

      expression: string,

      options?: {

        /**
         * If specified, the expression is evaluated on the iframe whose URL matches the one specified. By default, the expression is evaluated in the top frame of the inspected page.
         */
        frameURL?: string,

        /**
         * Evaluate the expression in the context of the content script of the calling extension, provided that the content script is already injected into the inspected page. If not, the expression is not evaluated and the callback is invoked with the exception parameter set to an object that has the `isError` field set to true and the `code` field set to `E_NOTFOUND`.
         */
        useContentScriptContext?: boolean,

        /**
         * Evaluate the expression in the context of a content script of an extension that matches the specified origin. If given, scriptExecutionContext overrides the 'true' setting on useContentScriptContext.
         *
         * @since Chrome 107
         */
        scriptExecutionContext?: string,
      },

      /**
       * @param result The result of evaluation.
       * @param exceptionInfo An object providing details if an exception occurred while evaluating the expression.
       */
      callback?: (
        result: {[name: string]: any},
        exceptionInfo: {

          /**
           * Set if the error occurred on the DevTools side before the expression is evaluated.
           */
          isError: boolean,

          /**
           * Set if the error occurred on the DevTools side before the expression is evaluated.
           */
          code: string,

          /**
           * Set if the error occurred on the DevTools side before the expression is evaluated.
           */
          description: string,

          /**
           * Set if the error occurred on the DevTools side before the expression is evaluated, contains the array of the values that may be substituted into the description string to provide more information about the cause of the error.
           */
          details: any[],

          /**
           * Set if the evaluated code produces an unhandled exception.
           */
          isException: boolean,

          /**
           * Set if the evaluated code produces an unhandled exception.
           */
          value: string,
        },
      ) => void,
    ): void;

    /**
     * Reloads the inspected page.
     */
    export function reload(

      reloadOptions?: {

        /**
         * When true, the loader will bypass the cache for all inspected page resources loaded before the `load` event is fired. The effect is similar to pressing Ctrl+Shift+R in the inspected window or within the Developer Tools window.
         */
        ignoreCache?: boolean,

        /**
         * If specified, the string will override the value of the `User-Agent` HTTP header that's sent while loading the resources of the inspected page. The string will also override the value of the `navigator.userAgent` property that's returned to any scripts that are running within the inspected page.
         */
        userAgent?: string,

        /**
         * If specified, the script will be injected into every frame of the inspected page immediately upon load, before any of the frame's scripts. The script will not be injected after subsequent reloads—for example, if the user presses Ctrl+R.
         */
        injectedScript?: string,
      },
    ): void;

    /**
     * Retrieves the list of resources from the inspected page.
     *
     * @param callback A function that receives the list of resources when the request completes.
     */
    export function getResources(

      /**
       * @param resources The resources within the page.
       */
      callback: (
        resources: Resource[],
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.devtools.network` API to retrieve the information about network requests displayed by the Developer Tools in the Network panel.
   *
   * @chrome-manifest devtools_page
   */
  export namespace devtools.network {

    /**
     * Represents a network request for a document resource (script, image and so on). See HAR Specification for reference.
     */
    export interface Request {

      /**
       * Returns content of the response body.
       *
       * @param callback A function that receives the response body when the request completes.
       */
      getContent(

        /**
         * @param content Content of the response body (potentially encoded).
         * @param encoding Empty if content is not encoded, encoding name otherwise. Currently, only base64 is supported.
         */
        callback: (
          content: string,
          encoding: string,
        ) => void,
      ): void;
    }

    /**
     * Fired when a network request is finished and all request data are available.
     */
    export const onRequestFinished: events.Event<(
      request: Request,
    ) => void>;

    /**
     * Fired when the inspected window navigates to a new page.
     */
    export const onNavigated: events.Event<(
      url: string,
    ) => void>;

    /**
     * Returns HAR log that contains all known network requests.
     *
     * @param callback A function that receives the HAR log when the request completes.
     */
    export function getHAR(

      /**
       * @param harLog A HAR log. See HAR specification for details.
       */
      callback: (
        harLog: {[name: string]: any},
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.devtools.panels` API to integrate your extension into Developer Tools window UI: create your own panels, access existing panels, and add sidebars.
   *
   * @chrome-manifest devtools_page
   */
  export namespace devtools.panels {

    /**
     * Represents the Elements panel.
     */
    export interface ElementsPanel {

      /**
       * Fired when an object is selected in the panel.
       */
      onSelectionChanged: events.Event<() => void>;

      /**
       * Creates a pane within panel's sidebar.
       *
       * @param title Text that is displayed in sidebar caption.
       * @param callback A callback invoked when the sidebar is created.
       */
      createSidebarPane(

        title: string,

        /**
         * @param result An ExtensionSidebarPane object for created sidebar pane.
         */
        callback?: (
          result: ExtensionSidebarPane,
        ) => void,
      ): void;
    }

    /**
     * Represents the Sources panel.
     */
    export interface SourcesPanel {

      /**
       * Fired when an object is selected in the panel.
       */
      onSelectionChanged: events.Event<() => void>;

      /**
       * Creates a pane within panel's sidebar.
       *
       * @param title Text that is displayed in sidebar caption.
       * @param callback A callback invoked when the sidebar is created.
       */
      createSidebarPane(

        title: string,

        /**
         * @param result An ExtensionSidebarPane object for created sidebar pane.
         */
        callback?: (
          result: ExtensionSidebarPane,
        ) => void,
      ): void;
    }

    /**
     * Represents a panel created by extension.
     */
    export interface ExtensionPanel {

      /**
       * Fired upon a search action (start of a new search, search result navigation, or search being canceled).
       */
      onSearch: events.Event<(
        action: string,
        queryString?: string,
      ) => void>;

      /**
       * Fired when the user switches to the panel.
       */
      onShown: events.Event<(
        window: Window,
      ) => void>;

      /**
       * Fired when the user switches away from the panel.
       */
      onHidden: events.Event<() => void>;

      /**
       * Appends a button to the status bar of the panel.
       *
       * @param iconPath Path to the icon of the button. The file should contain a 64x24-pixel image composed of two 32x24 icons. The left icon is used when the button is inactive; the right icon is displayed when the button is pressed.
       * @param tooltipText Text shown as a tooltip when user hovers the mouse over the button.
       * @param disabled Whether the button is disabled.
       */
      createStatusBarButton(

        iconPath: string,

        tooltipText: string,

        disabled: boolean,
      ): Button;
    }

    /**
     * A sidebar created by the extension.
     */
    export interface ExtensionSidebarPane {

      /**
       * Fired when the sidebar pane becomes visible as a result of user switching to the panel that hosts it.
       */
      onShown: events.Event<(
        window: Window,
      ) => void>;

      /**
       * Fired when the sidebar pane becomes hidden as a result of the user switching away from the panel that hosts the sidebar pane.
       */
      onHidden: events.Event<() => void>;

      /**
       * Sets the height of the sidebar.
       *
       * @param height A CSS-like size specification, such as `'100px'` or `'12ex'`.
       */
      setHeight(

        height: string,
      ): void;

      /**
       * Sets an expression that is evaluated within the inspected page. The result is displayed in the sidebar pane.
       *
       * @param expression An expression to be evaluated in context of the inspected page. JavaScript objects and DOM nodes are displayed in an expandable tree similar to the console/watch.
       * @param rootTitle An optional title for the root of the expression tree.
       * @param callback A callback invoked after the sidebar pane is updated with the expression evaluation results.
       */
      setExpression(

        expression: string,

        rootTitle?: string,

        callback?: () => void,
      ): void;

      /**
       * Sets a JSON-compliant object to be displayed in the sidebar pane.
       *
       * @param jsonObject An object to be displayed in context of the inspected page. Evaluated in the context of the caller (API client).
       * @param rootTitle An optional title for the root of the expression tree.
       * @param callback A callback invoked after the sidebar is updated with the object.
       */
      setObject(

        jsonObject: string,

        rootTitle?: string,

        callback?: () => void,
      ): void;

      /**
       * Sets an HTML page to be displayed in the sidebar pane.
       *
       * @param path Relative path of an extension page to display within the sidebar.
       */
      setPage(

        path: string,
      ): void;
    }

    /**
     * A button created by the extension.
     */
    export interface Button {

      /**
       * Fired when the button is clicked.
       */
      onClicked: events.Event<() => void>;

      /**
       * Updates the attributes of the button. If some of the arguments are omitted or `null`, the corresponding attributes are not updated.
       *
       * @param iconPath Path to the new icon of the button.
       * @param tooltipText Text shown as a tooltip when user hovers the mouse over the button.
       * @param disabled Whether the button is disabled.
       */
      update(

        iconPath?: string,

        tooltipText?: string,

        disabled?: boolean,
      ): void;
    }

    /**
     * Elements panel.
     */
    export const elements: ElementsPanel;

    /**
     * Sources panel.
     */
    export const sources: SourcesPanel;

    /**
     * The name of the color theme set in user's DevTools settings. Possible values: `default` (the default) and `dark`.
     *
     * @since Chrome 59
     */
    export const themeName: string;

    /**
     * Creates an extension panel.
     *
     * @param title Title that is displayed next to the extension icon in the Developer Tools toolbar.
     * @param iconPath Path of the panel's icon relative to the extension directory.
     * @param pagePath Path of the panel's HTML page relative to the extension directory.
     * @param callback A function that is called when the panel is created.
     */
    export function create(

      title: string,

      iconPath: string,

      pagePath: string,

      /**
       * @param panel An ExtensionPanel object representing the created panel.
       */
      callback?: (
        panel: ExtensionPanel,
      ) => void,
    ): void;

    /**
     * Specifies the function to be called when the user clicks a resource link in the Developer Tools window. To unset the handler, either call the method with no parameters or pass null as the parameter.
     *
     * @param callback A function that is called when the user clicks on a valid resource link in Developer Tools window. Note that if the user clicks an invalid URL or an XHR, this function is not called.
     */
    export function setOpenResourceHandler(

      /**
       * @param resource A {@link devtools.inspectedWindow.Resource} object for the resource that was clicked.
       */
      callback?: (
        resource: devtools.inspectedWindow.Resource,
      ) => void,
    ): void;

    /**
     * Requests DevTools to open a URL in a Developer Tools panel.
     *
     * @param url The URL of the resource to open.
     * @param lineNumber Specifies the line number to scroll to when the resource is loaded.
     * @param columnNumber Specifies the column number to scroll to when the resource is loaded.
     * @param callback A function that is called when the resource has been successfully loaded.
     */
    export function openResource(

      url: string,

      lineNumber: number,

      /**
       * @since Chrome 114
       */
      columnNumber?: number,

      callback?: () => void,
    ): void;
  }

  /**
   * Use the `chrome.devtools.recorder` API to customize the Recorder panel in DevTools.
   *
   * @since Chrome 105
   */
  export namespace devtools.recorder {

    /**
     * A plugin interface that the Recorder panel invokes to customize the Recorder panel.
     */
    export interface RecorderExtensionPlugin {

      /**
       * Converts a recording from the Recorder panel format into a string.
       *
       * @param recording A recording of the user interaction with the page. This should match [Puppeteer's recording schema](https://github.com/puppeteer/replay/blob/main/docs/api/interfaces/Schema.UserFlow.md).
       */
      stringify(

        recording: {},
      ): void;

      /**
       * Converts a step of the recording from the Recorder panel format into a string.
       *
       * @param step A step of the recording of a user interaction with the page. This should match [Puppeteer's step schema](https://github.com/puppeteer/replay/blob/main/docs/api/modules/Schema.md#step).
       */
      stringifyStep(

        step: {},
      ): void;

      /**
       * Allows the extension to implement custom replay functionality.
       *
       * @param recording A recording of the user interaction with the page. This should match [Puppeteer's recording schema](https://github.com/puppeteer/replay/blob/main/docs/api/interfaces/Schema.UserFlow.md).
       * @since Chrome 112
       */
      replay(

        recording: {},
      ): void;
    }

    /**
     * Represents a view created by extension to be embedded inside the Recorder panel.
     *
     * @since Chrome 112
     */
    export interface RecorderView {

      /**
       * Fired when the view is shown.
       */
      onShown: events.Event<() => void>;

      /**
       * Fired when the view is hidden.
       */
      onHidden: events.Event<() => void>;

      /**
       * Indicates that the extension wants to show this view in the Recorder panel.
       */
      show(): void;
    }

    /**
     * Registers a Recorder extension plugin.
     *
     * @param plugin An instance implementing the RecorderExtensionPlugin interface.
     * @param name The name of the plugin.
     * @param mediaType The media type of the string content that the plugin produces.
     */
    export function registerRecorderExtensionPlugin(

      plugin: RecorderExtensionPlugin,

      name: string,

      mediaType: string,
    ): void;

    /**
     * Creates a view that can handle the replay. This view will be embedded inside the Recorder panel.
     *
     * @param title Title that is displayed next to the extension icon in the Developer Tools toolbar.
     * @param pagePath Path of the panel's HTML page relative to the extension directory.
     * @since Chrome 112
     */
    export function createView(

      title: string,

      pagePath: string,
    ): RecorderView;
  }

  /**
   * Use the `chrome.dns` API for dns resolution.
   *
   * @alpha
   * @chrome-permission dns
   * @chrome-channel dev
   */
  export namespace dns {

    export interface ResolveCallbackResolveInfo {

      /**
       * The result code. Zero indicates success.
       */
      resultCode: number;

      /**
       * A string representing the IP address literal. Supplied only if resultCode indicates success.
       */
      address?: string;
    }

    /**
     * Resolves the given hostname or IP address literal.
     *
     * @param hostname The hostname to resolve.
     */
    export function resolve(

      hostname: string,
    ): Promise<ResolveCallbackResolveInfo>;

    /**
     * Resolves the given hostname or IP address literal.
     *
     * @param hostname The hostname to resolve.
     * @param callback Called when the resolution operation completes.
     */
    export function resolve(

      hostname: string,

      callback?: (
        resolveInfo: ResolveCallbackResolveInfo,
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.documentScan` API to discover and retrieve images from attached paper document scanners.
   *
   * @since Chrome 44
   * @chrome-permission documentScan
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace documentScan {

    export interface ScanOptions {

      /**
       * The MIME types that are accepted by the caller.
       */
      mimeTypes?: string[];

      /**
       * The number of scanned images allowed (defaults to 1).
       */
      maxImages?: number;
    }

    export interface ScanResults {

      /**
       * The data image URLs in a form that can be passed as the "src" value to an image tag.
       */
      dataUrls: string[];

      /**
       * The MIME type of `dataUrls`.
       */
      mimeType: string;
    }

    /**
     * Performs a document scan. On success, the PNG data will be sent to the callback.
     *
     * @chrome-returns-extra since Chrome 96
     * @param options Object containing scan parameters.
     */
    export function scan(

      options: ScanOptions,
    ): Promise<ScanResults>;

    /**
     * Performs a document scan. On success, the PNG data will be sent to the callback.
     *
     * @param options Object containing scan parameters.
     * @param callback Called with the result and data from the scan.
     */
    export function scan(

      options: ScanOptions,

      callback?: (
        result: ScanResults,
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.dom` API to access special DOM APIs for Extensions
   *
   * @since Chrome 88
   */
  export namespace dom {

    /**
     * Gets the open shadow root or the closed shadow root hosted by the specified element. If the element doesn't attach the shadow root, it will return null.
     *
     * @returns See [https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot)
     */
    export function openOrClosedShadowRoot(

      element: HTMLElement,
    ): {[name: string]: any};
  }

  /**
   * Use the `chrome.downloads` API to programmatically initiate, monitor, manipulate, and search for downloads.
   *
   * @chrome-permission downloads
   */
  export namespace downloads {

    export interface HeaderNameValuePair {

      /**
       * Name of the HTTP header.
       */
      name: string;

      /**
       * Value of the HTTP header.
       */
      value: string;
    }

    /**
     * uniquify
     *
     * To avoid duplication, the `filename` is changed to include a counter before the filename extension.
     *
     * overwrite
     *
     * The existing file will be overwritten with the new file.
     *
     * prompt
     *
     * The user will be prompted with a file chooser dialog.
     */
    export type FilenameConflictAction = "uniquify" | "overwrite" | "prompt";

    export interface FilenameSuggestion {

      /**
       * The {@link DownloadItem}'s new target {@link DownloadItem.filename}, as a path relative to the user's default Downloads directory, possibly containing subdirectories. Absolute paths, empty paths, and paths containing back-references ".." will be ignored. `filename` is ignored if there are any {@link onDeterminingFilename} listeners registered by any extensions.
       */
      filename: string;

      /**
       * The action to take if `filename` already exists.
       */
      conflictAction?: FilenameConflictAction;
    }

    export type HttpMethod = "GET" | "POST";

    export type InterruptReason = "FILE_FAILED" | "FILE_ACCESS_DENIED" | "FILE_NO_SPACE" | "FILE_NAME_TOO_LONG" | "FILE_TOO_LARGE" | "FILE_VIRUS_INFECTED" | "FILE_TRANSIENT_ERROR" | "FILE_BLOCKED" | "FILE_SECURITY_CHECK_FAILED" | "FILE_TOO_SHORT" | "FILE_HASH_MISMATCH" | "FILE_SAME_AS_SOURCE" | "NETWORK_FAILED" | "NETWORK_TIMEOUT" | "NETWORK_DISCONNECTED" | "NETWORK_SERVER_DOWN" | "NETWORK_INVALID_REQUEST" | "SERVER_FAILED" | "SERVER_NO_RANGE" | "SERVER_BAD_CONTENT" | "SERVER_UNAUTHORIZED" | "SERVER_CERT_PROBLEM" | "SERVER_FORBIDDEN" | "SERVER_UNREACHABLE" | "SERVER_CONTENT_LENGTH_MISMATCH" | "SERVER_CROSS_ORIGIN_REDIRECT" | "USER_CANCELED" | "USER_SHUTDOWN" | "CRASH";

    export interface DownloadOptions {

      /**
       * The URL to download.
       */
      url: string;

      /**
       * A file path relative to the Downloads directory to contain the downloaded file, possibly containing subdirectories. Absolute paths, empty paths, and paths containing back-references ".." will cause an error. {@link onDeterminingFilename} allows suggesting a filename after the file's MIME type and a tentative filename have been determined.
       */
      filename?: string;

      /**
       * The action to take if `filename` already exists.
       */
      conflictAction?: FilenameConflictAction;

      /**
       * Use a file-chooser to allow the user to select a filename regardless of whether `filename` is set or already exists.
       */
      saveAs?: boolean;

      /**
       * The HTTP method to use if the URL uses the HTTP\[S\] protocol.
       */
      method?: HttpMethod;

      /**
       * Extra HTTP headers to send with the request if the URL uses the HTTP\[s\] protocol. Each header is represented as a dictionary containing the keys `name` and either `value` or `binaryValue`, restricted to those allowed by XMLHttpRequest.
       */
      headers?: HeaderNameValuePair[];

      /**
       * Post body.
       */
      body?: string;
    }

    /**
     * file
     *
     * The download's filename is suspicious.
     *
     * url
     *
     * The download's URL is known to be malicious.
     *
     * content
     *
     * The downloaded file is known to be malicious.
     *
     * uncommon
     *
     * The download's URL is not commonly downloaded and could be dangerous.
     *
     * host
     *
     * The download came from a host known to distribute malicious binaries and is likely dangerous.
     *
     * unwanted
     *
     * The download is potentially unwanted or unsafe. E.g. it could make changes to browser or computer settings.
     *
     * safe
     *
     * The download presents no known danger to the user's computer.
     *
     * accepted
     *
     * The user has accepted the dangerous download.
     */
    export type DangerType = "file" | "url" | "content" | "uncommon" | "host" | "unwanted" | "safe" | "accepted" | "allowlistedByPolicy" | "asyncScanning" | "asyncLocalPasswordScanning" | "passwordProtected" | "blockedTooLarge" | "sensitiveContentWarning" | "sensitiveContentBlock" | "unsupportedFileType" | "deepScannedFailed" | "deepScannedSafe" | "deepScannedOpenedDangerous" | "promptForScanning" | "promptForLocalPasswordScanning" | "accountCompromise";

    /**
     * in\_progress
     *
     * The download is currently receiving data from the server.
     *
     * interrupted
     *
     * An error broke the connection with the file host.
     *
     * complete
     *
     * The download completed successfully.
     */
    export type State = "in_progress" | "interrupted" | "complete";

    export interface DownloadItem {

      /**
       * An identifier that is persistent across browser sessions.
       */
      id: number;

      /**
       * The absolute URL that this download initiated from, before any redirects.
       */
      url: string;

      /**
       * The absolute URL that this download is being made from, after all redirects.
       *
       * @since Chrome 54
       */
      finalUrl: string;

      /**
       * Absolute URL.
       */
      referrer: string;

      /**
       * Absolute local path.
       */
      filename: string;

      /**
       * False if this download is recorded in the history, true if it is not recorded.
       */
      incognito: boolean;

      /**
       * Indication of whether this download is thought to be safe or known to be suspicious.
       */
      danger: DangerType;

      /**
       * The file's MIME type.
       */
      mime: string;

      /**
       * The time when the download began in ISO 8601 format. May be passed directly to the Date constructor: `chrome.downloads.search({}, function(items){items.forEach(function(item){console.log(new Date(item.startTime))})})`
       */
      startTime: string;

      /**
       * The time when the download ended in ISO 8601 format. May be passed directly to the Date constructor: `chrome.downloads.search({}, function(items){items.forEach(function(item){if (item.endTime) console.log(new Date(item.endTime))})})`
       */
      endTime?: string;

      /**
       * Estimated time when the download will complete in ISO 8601 format. May be passed directly to the Date constructor: `chrome.downloads.search({}, function(items){items.forEach(function(item){if (item.estimatedEndTime) console.log(new Date(item.estimatedEndTime))})})`
       */
      estimatedEndTime?: string;

      /**
       * Indicates whether the download is progressing, interrupted, or complete.
       */
      state: State;

      /**
       * True if the download has stopped reading data from the host, but kept the connection open.
       */
      paused: boolean;

      /**
       * True if the download is in progress and paused, or else if it is interrupted and can be resumed starting from where it was interrupted.
       */
      canResume: boolean;

      /**
       * Why the download was interrupted. Several kinds of HTTP errors may be grouped under one of the errors beginning with `SERVER_`. Errors relating to the network begin with `NETWORK_`, errors relating to the process of writing the file to the file system begin with `FILE_`, and interruptions initiated by the user begin with `USER_`.
       */
      error?: InterruptReason;

      /**
       * Number of bytes received so far from the host, without considering file compression.
       */
      bytesReceived: number;

      /**
       * Number of bytes in the whole file, without considering file compression, or -1 if unknown.
       */
      totalBytes: number;

      /**
       * Number of bytes in the whole file post-decompression, or -1 if unknown.
       */
      fileSize: number;

      /**
       * Whether the downloaded file still exists. This information may be out of date because Chrome does not automatically watch for file removal. Call {@link search}() in order to trigger the check for file existence. When the existence check completes, if the file has been deleted, then an {@link onChanged} event will fire. Note that {@link search}() does not wait for the existence check to finish before returning, so results from {@link search}() may not accurately reflect the file system. Also, {@link search}() may be called as often as necessary, but will not check for file existence any more frequently than once every 10 seconds.
       */
      exists: boolean;

      /**
       * The identifier for the extension that initiated this download if this download was initiated by an extension. Does not change once it is set.
       */
      byExtensionId?: string;

      /**
       * The localized name of the extension that initiated this download if this download was initiated by an extension. May change if the extension changes its name or if the user changes their locale.
       */
      byExtensionName?: string;
    }

    export interface DownloadQuery {

      /**
       * This array of search terms limits results to {@link DownloadItem} whose `filename` or `url` or `finalUrl` contain all of the search terms that do not begin with a dash '-' and none of the search terms that do begin with a dash.
       */
      query?: string[];

      /**
       * Limits results to {@link DownloadItem} that started before the given ms since the epoch.
       */
      startedBefore?: string;

      /**
       * Limits results to {@link DownloadItem} that started after the given ms since the epoch.
       */
      startedAfter?: string;

      /**
       * Limits results to {@link DownloadItem} that ended before the given ms since the epoch.
       */
      endedBefore?: string;

      /**
       * Limits results to {@link DownloadItem} that ended after the given ms since the epoch.
       */
      endedAfter?: string;

      /**
       * Limits results to {@link DownloadItem} whose `totalBytes` is greater than the given integer.
       */
      totalBytesGreater?: number;

      /**
       * Limits results to {@link DownloadItem} whose `totalBytes` is less than the given integer.
       */
      totalBytesLess?: number;

      /**
       * Limits results to {@link DownloadItem} whose `filename` matches the given regular expression.
       */
      filenameRegex?: string;

      /**
       * Limits results to {@link DownloadItem} whose `url` matches the given regular expression.
       */
      urlRegex?: string;

      /**
       * Limits results to {@link DownloadItem} whose `finalUrl` matches the given regular expression.
       *
       * @since Chrome 54
       */
      finalUrlRegex?: string;

      /**
       * The maximum number of matching {@link DownloadItem} returned. Defaults to 1000. Set to 0 in order to return all matching {@link DownloadItem}. See {@link search} for how to page through results.
       */
      limit?: number;

      /**
       * Set elements of this array to {@link DownloadItem} properties in order to sort search results. For example, setting `orderBy=['startTime']` sorts the {@link DownloadItem} by their start time in ascending order. To specify descending order, prefix with a hyphen: '-startTime'.
       */
      orderBy?: string[];

      /**
       * The `id` of the {@link DownloadItem} to query.
       */
      id?: number;

      /**
       * The absolute URL that this download initiated from, before any redirects.
       */
      url?: string;

      /**
       * The absolute URL that this download is being made from, after all redirects.
       *
       * @since Chrome 54
       */
      finalUrl?: string;

      /**
       * Absolute local path.
       */
      filename?: string;

      /**
       * Indication of whether this download is thought to be safe or known to be suspicious.
       */
      danger?: DangerType;

      /**
       * The file's MIME type.
       */
      mime?: string;

      /**
       * The time when the download began in ISO 8601 format.
       */
      startTime?: string;

      /**
       * The time when the download ended in ISO 8601 format.
       */
      endTime?: string;

      /**
       * Indicates whether the download is progressing, interrupted, or complete.
       */
      state?: State;

      /**
       * True if the download has stopped reading data from the host, but kept the connection open.
       */
      paused?: boolean;

      /**
       * Why a download was interrupted.
       */
      error?: InterruptReason;

      /**
       * Number of bytes received so far from the host, without considering file compression.
       */
      bytesReceived?: number;

      /**
       * Number of bytes in the whole file, without considering file compression, or -1 if unknown.
       */
      totalBytes?: number;

      /**
       * Number of bytes in the whole file post-decompression, or -1 if unknown.
       */
      fileSize?: number;

      /**
       * Whether the downloaded file exists;
       */
      exists?: boolean;
    }

    export interface StringDelta {

      previous?: string;

      current?: string;
    }

    export interface DoubleDelta {

      previous?: number;

      current?: number;
    }

    export interface BooleanDelta {

      previous?: boolean;

      current?: boolean;
    }

    export interface DownloadDelta {

      /**
       * The `id` of the {@link DownloadItem} that changed.
       */
      id: number;

      /**
       * The change in `url`, if any.
       */
      url?: StringDelta;

      /**
       * The change in `finalUrl`, if any.
       *
       * @since Chrome 54
       */
      finalUrl?: StringDelta;

      /**
       * The change in `filename`, if any.
       */
      filename?: StringDelta;

      /**
       * The change in `danger`, if any.
       */
      danger?: StringDelta;

      /**
       * The change in `mime`, if any.
       */
      mime?: StringDelta;

      /**
       * The change in `startTime`, if any.
       */
      startTime?: StringDelta;

      /**
       * The change in `endTime`, if any.
       */
      endTime?: StringDelta;

      /**
       * The change in `state`, if any.
       */
      state?: StringDelta;

      /**
       * The change in `canResume`, if any.
       */
      canResume?: BooleanDelta;

      /**
       * The change in `paused`, if any.
       */
      paused?: BooleanDelta;

      /**
       * The change in `error`, if any.
       */
      error?: StringDelta;

      /**
       * The change in `totalBytes`, if any.
       */
      totalBytes?: DoubleDelta;

      /**
       * The change in `fileSize`, if any.
       */
      fileSize?: DoubleDelta;

      /**
       * The change in `exists`, if any.
       */
      exists?: BooleanDelta;
    }

    export interface GetFileIconOptions {

      /**
       * The size of the returned icon. The icon will be square with dimensions size \* size pixels. The default and largest size for the icon is 32x32 pixels. The only supported sizes are 16 and 32. It is an error to specify any other size.
       */
      size?: 16 | 32;
    }

    /**
     * @since Chrome 105
     */
    export interface UiOptions {

      /**
       * Enable or disable the download UI.
       */
      enabled: boolean;
    }

    /**
     * This event fires with the {@link DownloadItem} object when a download begins.
     */
    export const onCreated: events.Event<(
      downloadItem: DownloadItem,
    ) => void>;

    /**
     * Fires with the `downloadId` when a download is erased from history.
     */
    export const onErased: events.Event<(
      downloadId: number,
    ) => void>;

    /**
     * When any of a {@link DownloadItem}'s properties except `bytesReceived` and `estimatedEndTime` changes, this event fires with the `downloadId` and an object containing the properties that changed.
     */
    export const onChanged: events.Event<(
      downloadDelta: DownloadDelta,
    ) => void>;

    /**
     * During the filename determination process, extensions will be given the opportunity to override the target {@link DownloadItem.filename}. Each extension may not register more than one listener for this event. Each listener must call `suggest` exactly once, either synchronously or asynchronously. If the listener calls `suggest` asynchronously, then it must return `true`. If the listener neither calls `suggest` synchronously nor returns `true`, then `suggest` will be called automatically. The {@link DownloadItem} will not complete until all listeners have called `suggest`. Listeners may call `suggest` without any arguments in order to allow the download to use `downloadItem.filename` for its filename, or pass a `suggestion` object to `suggest` in order to override the target filename. If more than one extension overrides the filename, then the last extension installed whose listener passes a `suggestion` object to `suggest` wins. In order to avoid confusion regarding which extension will win, users should not install extensions that may conflict. If the download is initiated by {@link download} and the target filename is known before the MIME type and tentative filename have been determined, pass `filename` to {@link download} instead.
     */
    export const onDeterminingFilename: events.Event<(
      downloadItem: DownloadItem,
      suggest: (
        suggestion?: FilenameSuggestion,
      ) => void,
    ) => void>;

    /**
     * Download a URL. If the URL uses the HTTP\[S\] protocol, then the request will include all cookies currently set for its hostname. If both `filename` and `saveAs` are specified, then the Save As dialog will be displayed, pre-populated with the specified `filename`. If the download started successfully, `callback` will be called with the new {@link DownloadItem}'s `downloadId`. If there was an error starting the download, then `callback` will be called with `downloadId=undefined` and {@link runtime.lastError} will contain a descriptive string. The error strings are not guaranteed to remain backwards compatible between releases. Extensions must not parse it.
     *
     * @chrome-returns-extra since Chrome 96
     * @param options What to download and how.
     */
    export function download(

      options: DownloadOptions,
    ): Promise<number>;

    /**
     * Download a URL. If the URL uses the HTTP\[S\] protocol, then the request will include all cookies currently set for its hostname. If both `filename` and `saveAs` are specified, then the Save As dialog will be displayed, pre-populated with the specified `filename`. If the download started successfully, `callback` will be called with the new {@link DownloadItem}'s `downloadId`. If there was an error starting the download, then `callback` will be called with `downloadId=undefined` and {@link runtime.lastError} will contain a descriptive string. The error strings are not guaranteed to remain backwards compatible between releases. Extensions must not parse it.
     *
     * @param options What to download and how.
     * @param callback Called with the id of the new {@link DownloadItem}.
     */
    export function download(

      options: DownloadOptions,

      callback?: (
        downloadId: number,
      ) => void,
    ): void;

    /**
     * Find {@link DownloadItem}. Set `query` to the empty object to get all {@link DownloadItem}. To get a specific {@link DownloadItem}, set only the `id` field. To page through a large number of items, set `orderBy: ['-startTime']`, set `limit` to the number of items per page, and set `startedAfter` to the `startTime` of the last item from the last page.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function search(

      query: DownloadQuery,
    ): Promise<DownloadItem[]>;

    /**
     * Find {@link DownloadItem}. Set `query` to the empty object to get all {@link DownloadItem}. To get a specific {@link DownloadItem}, set only the `id` field. To page through a large number of items, set `orderBy: ['-startTime']`, set `limit` to the number of items per page, and set `startedAfter` to the `startTime` of the last item from the last page.
     */
    export function search(

      query: DownloadQuery,

      callback?: (
        results: DownloadItem[],
      ) => void,
    ): void;

    /**
     * Pause the download. If the request was successful the download is in a paused state. Otherwise {@link runtime.lastError} contains an error message. The request will fail if the download is not active.
     *
     * @chrome-returns-extra since Chrome 96
     * @param downloadId The id of the download to pause.
     */
    export function pause(

      downloadId: number,
    ): Promise<void>;

    /**
     * Pause the download. If the request was successful the download is in a paused state. Otherwise {@link runtime.lastError} contains an error message. The request will fail if the download is not active.
     *
     * @param downloadId The id of the download to pause.
     * @param callback Called when the pause request is completed.
     */
    export function pause(

      downloadId: number,

      callback?: () => void,
    ): void;

    /**
     * Resume a paused download. If the request was successful the download is in progress and unpaused. Otherwise {@link runtime.lastError} contains an error message. The request will fail if the download is not active.
     *
     * @chrome-returns-extra since Chrome 96
     * @param downloadId The id of the download to resume.
     */
    export function resume(

      downloadId: number,
    ): Promise<void>;

    /**
     * Resume a paused download. If the request was successful the download is in progress and unpaused. Otherwise {@link runtime.lastError} contains an error message. The request will fail if the download is not active.
     *
     * @param downloadId The id of the download to resume.
     * @param callback Called when the resume request is completed.
     */
    export function resume(

      downloadId: number,

      callback?: () => void,
    ): void;

    /**
     * Cancel a download. When `callback` is run, the download is cancelled, completed, interrupted or doesn't exist anymore.
     *
     * @chrome-returns-extra since Chrome 96
     * @param downloadId The id of the download to cancel.
     */
    export function cancel(

      downloadId: number,
    ): Promise<void>;

    /**
     * Cancel a download. When `callback` is run, the download is cancelled, completed, interrupted or doesn't exist anymore.
     *
     * @param downloadId The id of the download to cancel.
     * @param callback Called when the cancel request is completed.
     */
    export function cancel(

      downloadId: number,

      callback?: () => void,
    ): void;

    /**
     * Retrieve an icon for the specified download. For new downloads, file icons are available after the {@link onCreated} event has been received. The image returned by this function while a download is in progress may be different from the image returned after the download is complete. Icon retrieval is done by querying the underlying operating system or toolkit depending on the platform. The icon that is returned will therefore depend on a number of factors including state of the download, platform, registered file types and visual theme. If a file icon cannot be determined, {@link runtime.lastError} will contain an error message.
     *
     * @chrome-returns-extra since Chrome 96
     * @param downloadId The identifier for the download.
     */
    export function getFileIcon(

      downloadId: number,

      options?: GetFileIconOptions,
    ): Promise<string | undefined>;

    /**
     * Retrieve an icon for the specified download. For new downloads, file icons are available after the {@link onCreated} event has been received. The image returned by this function while a download is in progress may be different from the image returned after the download is complete. Icon retrieval is done by querying the underlying operating system or toolkit depending on the platform. The icon that is returned will therefore depend on a number of factors including state of the download, platform, registered file types and visual theme. If a file icon cannot be determined, {@link runtime.lastError} will contain an error message.
     *
     * @param downloadId The identifier for the download.
     * @param callback A URL to an image that represents the download.
     */
    export function getFileIcon(

      downloadId: number,

      options?: GetFileIconOptions,

      callback?: (
        iconURL?: string,
      ) => void,
    ): void;

    /**
     * Opens the downloaded file now if the {@link DownloadItem} is complete; otherwise returns an error through {@link runtime.lastError}. This method requires the `"downloads.open"` permission in addition to the `"downloads"` permission. An {@link onChanged} event fires when the item is opened for the first time. This method can only be called in response to a user gesture.
     *
     * @param downloadId The identifier for the downloaded file.
     */
    export function open(

      downloadId: number,
    ): void;

    /**
     * Show the downloaded file in its folder in a file manager.
     *
     * @param downloadId The identifier for the downloaded file.
     */
    export function show(

      downloadId: number,
    ): void;

    /**
     * Show the default Downloads folder in a file manager.
     */
    export function showDefaultFolder(): void;

    /**
     * Erase matching {@link DownloadItem} from history without deleting the downloaded file. An {@link onErased} event will fire for each {@link DownloadItem} that matches `query`, then `callback` will be called.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function erase(

      query: DownloadQuery,
    ): Promise<number[]>;

    /**
     * Erase matching {@link DownloadItem} from history without deleting the downloaded file. An {@link onErased} event will fire for each {@link DownloadItem} that matches `query`, then `callback` will be called.
     */
    export function erase(

      query: DownloadQuery,

      callback?: (
        erasedIds: number[],
      ) => void,
    ): void;

    /**
     * Remove the downloaded file if it exists and the {@link DownloadItem} is complete; otherwise return an error through {@link runtime.lastError}.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function removeFile(

      downloadId: number,
    ): Promise<void>;

    /**
     * Remove the downloaded file if it exists and the {@link DownloadItem} is complete; otherwise return an error through {@link runtime.lastError}.
     */
    export function removeFile(

      downloadId: number,

      callback?: () => void,
    ): void;

    /**
     * Prompt the user to accept a dangerous download. Can only be called from a visible context (tab, window, or page/browser action popup). Does not automatically accept dangerous downloads. If the download is accepted, then an {@link onChanged} event will fire, otherwise nothing will happen. When all the data is fetched into a temporary file and either the download is not dangerous or the danger has been accepted, then the temporary file is renamed to the target filename, the `state` changes to 'complete', and {@link onChanged} fires.
     *
     * @chrome-returns-extra since Chrome 96
     * @param downloadId The identifier for the {@link DownloadItem}.
     */
    export function acceptDanger(

      downloadId: number,
    ): Promise<void>;

    /**
     * Prompt the user to accept a dangerous download. Can only be called from a visible context (tab, window, or page/browser action popup). Does not automatically accept dangerous downloads. If the download is accepted, then an {@link onChanged} event will fire, otherwise nothing will happen. When all the data is fetched into a temporary file and either the download is not dangerous or the danger has been accepted, then the temporary file is renamed to the target filename, the `state` changes to 'complete', and {@link onChanged} fires.
     *
     * @param downloadId The identifier for the {@link DownloadItem}.
     * @param callback Called when the danger prompt dialog closes.
     */
    export function acceptDanger(

      downloadId: number,

      callback?: () => void,
    ): void;

    /**
     * Enable or disable the gray shelf at the bottom of every window associated with the current browser profile. The shelf will be disabled as long as at least one extension has disabled it. Enabling the shelf while at least one other extension has disabled it will return an error through {@link runtime.lastError}. Requires the `"downloads.shelf"` permission in addition to the `"downloads"` permission.
     *
     * @deprecated Use {@link setUiOptions} instead.
     * @chrome-deprecated-since Chrome 117
     */
    export function setShelfEnabled(

      enabled: boolean,
    ): void;

    /**
     * Change the download UI of every window associated with the current browser profile. As long as at least one extension has set {@link UiOptions.enabled} to false, the download UI will be hidden. Setting {@link UiOptions.enabled} to true while at least one other extension has disabled it will return an error through {@link runtime.lastError}. Requires the `"downloads.ui"` permission in addition to the `"downloads"` permission.
     *
     * @param options Encapsulate a change to the download UI.
     * @since Chrome 105
     */
    export function setUiOptions(

      options: UiOptions,
    ): Promise<void>;

    /**
     * Change the download UI of every window associated with the current browser profile. As long as at least one extension has set {@link UiOptions.enabled} to false, the download UI will be hidden. Setting {@link UiOptions.enabled} to true while at least one other extension has disabled it will return an error through {@link runtime.lastError}. Requires the `"downloads.ui"` permission in addition to the `"downloads"` permission.
     *
     * @param options Encapsulate a change to the download UI.
     * @param callback Called when the UI update is completed.
     * @since Chrome 105
     */
    export function setUiOptions(

      options: UiOptions,

      callback?: () => void,
    ): void;
  }

  /**
   * Use the `chrome.enterprise.deviceAttributes` API to read device attributes. Note: This API is only available to extensions force-installed by enterprise policy.
   *
   * @since Chrome 46
   * @chrome-permission enterprise.deviceAttributes
   * @chrome-install-location policy
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace enterprise.deviceAttributes {

    /**
     * Fetches the value of [the device identifier of the directory API](https://developers.google.com/admin-sdk/directory/v1/guides/manage-chrome-devices), that is generated by the server and identifies the cloud record of the device for querying in the cloud directory API. If the current user is not affiliated, returns an empty string.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function getDirectoryDeviceId(): Promise<string>;

    /**
     * Fetches the value of [the device identifier of the directory API](https://developers.google.com/admin-sdk/directory/v1/guides/manage-chrome-devices), that is generated by the server and identifies the cloud record of the device for querying in the cloud directory API. If the current user is not affiliated, returns an empty string.
     *
     * @param callback Called with the device identifier of the directory API when received.
     */
    export function getDirectoryDeviceId(

      callback?: (
        deviceId: string,
      ) => void,
    ): void;

    /**
     * Fetches the device's serial number. Please note the purpose of this API is to administrate the device (e.g. generating Certificate Sign Requests for device-wide certificates). This API may not be used for tracking devices without the consent of the device's administrator. If the current user is not affiliated, returns an empty string.
     *
     * @chrome-returns-extra since Chrome 96
     * @since Chrome 66
     */
    export function getDeviceSerialNumber(): Promise<string>;

    /**
     * Fetches the device's serial number. Please note the purpose of this API is to administrate the device (e.g. generating Certificate Sign Requests for device-wide certificates). This API may not be used for tracking devices without the consent of the device's administrator. If the current user is not affiliated, returns an empty string.
     *
     * @param callback Called with the serial number of the device.
     * @since Chrome 66
     */
    export function getDeviceSerialNumber(

      callback?: (
        serialNumber: string,
      ) => void,
    ): void;

    /**
     * Fetches the administrator-annotated Asset Id. If the current user is not affiliated or no Asset Id has been set by the administrator, returns an empty string.
     *
     * @chrome-returns-extra since Chrome 96
     * @since Chrome 66
     */
    export function getDeviceAssetId(): Promise<string>;

    /**
     * Fetches the administrator-annotated Asset Id. If the current user is not affiliated or no Asset Id has been set by the administrator, returns an empty string.
     *
     * @param callback Called with the Asset ID of the device.
     * @since Chrome 66
     */
    export function getDeviceAssetId(

      callback?: (
        assetId: string,
      ) => void,
    ): void;

    /**
     * Fetches the administrator-annotated Location. If the current user is not affiliated or no Annotated Location has been set by the administrator, returns an empty string.
     *
     * @chrome-returns-extra since Chrome 96
     * @since Chrome 66
     */
    export function getDeviceAnnotatedLocation(): Promise<string>;

    /**
     * Fetches the administrator-annotated Location. If the current user is not affiliated or no Annotated Location has been set by the administrator, returns an empty string.
     *
     * @param callback Called with the Annotated Location of the device.
     * @since Chrome 66
     */
    export function getDeviceAnnotatedLocation(

      callback?: (
        annotatedLocation: string,
      ) => void,
    ): void;

    /**
     * Fetches the device's hostname as set by DeviceHostnameTemplate policy. If the current user is not affiliated or no hostname has been set by the enterprise policy, returns an empty string.
     *
     * @chrome-returns-extra since Chrome 96
     * @since Chrome 82
     */
    export function getDeviceHostname(): Promise<string>;

    /**
     * Fetches the device's hostname as set by DeviceHostnameTemplate policy. If the current user is not affiliated or no hostname has been set by the enterprise policy, returns an empty string.
     *
     * @param callback Called with hostname of the device.
     * @since Chrome 82
     */
    export function getDeviceHostname(

      callback?: (
        hostname: string,
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.enterprise.hardwarePlatform` API to get the manufacturer and model of the hardware platform where the browser runs. Note: This API is only available to extensions installed by enterprise policy.
   *
   * @since Chrome 71
   * @chrome-permission enterprise.hardwarePlatform
   * @chrome-install-location policy
   */
  export namespace enterprise.hardwarePlatform {

    export interface HardwarePlatformInfo {

      model: string;

      manufacturer: string;
    }

    /**
     * Obtains the manufacturer and model for the hardware platform and, if the extension is authorized, returns it via `callback`.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function getHardwarePlatformInfo(): Promise<HardwarePlatformInfo>;

    /**
     * Obtains the manufacturer and model for the hardware platform and, if the extension is authorized, returns it via `callback`.
     *
     * @param callback Called with the hardware platform info.
     */
    export function getHardwarePlatformInfo(

      callback?: (
        info: HardwarePlatformInfo,
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.enterprise.networkingAttributes` API to read information about your current network. Note: This API is only available to extensions force-installed by enterprise policy.
   *
   * @since Chrome 85
   * @chrome-permission enterprise.networkingAttributes
   * @chrome-install-location policy
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace enterprise.networkingAttributes {

    export interface NetworkDetails {

      /**
       * The device's MAC address.
       */
      macAddress: string;

      /**
       * The device's local IPv4 address (undefined if not configured).
       */
      ipv4?: string;

      /**
       * The device's local IPv6 address (undefined if not configured).
       */
      ipv6?: string;
    }

    /**
     * Retrieves the network details of the device's default network. If the user is not affiliated or the device is not connected to a network, {@link runtime.lastError} will be set with a failure reason.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function getNetworkDetails(): Promise<NetworkDetails>;

    /**
     * Retrieves the network details of the device's default network. If the user is not affiliated or the device is not connected to a network, {@link runtime.lastError} will be set with a failure reason.
     *
     * @param callback Called with the device's default network's {@link NetworkDetails}.
     */
    export function getNetworkDetails(

      callback?: (
        networkAddresses: NetworkDetails,
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.enterprise.platformKeys` API to generate keys and install certificates for these keys. The certificates will be managed by the platform and can be used for TLS authentication, network access or by other extension through {@link platformKeys chrome.platformKeys}.
   *
   * @chrome-permission enterprise.platformKeys
   * @chrome-install-location policy
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace enterprise.platformKeys {

    export interface Token {

      /**
       * Uniquely identifies this `Token`.
       *
       * Static IDs are `"user"` and `"system"`, referring to the platform's user-specific and the system-wide hardware token, respectively. Any other tokens (with other identifiers) might be returned by {@link enterprise.platformKeys.getTokens}.
       */
      id: string;

      /**
       * Implements the WebCrypto's [SubtleCrypto](https://www.w3.org/TR/WebCryptoAPI/#subtlecrypto-interface) interface. The cryptographic operations, including key generation, are hardware-backed.
       *
       * Only non-extractable RSASSA-PKCS1-V1\_5 keys with `modulusLength` up to 2048 and ECDSA with `namedCurve` P-256 can be generated. Each key can be used for signing data at most once.
       *
       * Keys generated on a specific `Token` cannot be used with any other Tokens, nor can they be used with `window.crypto.subtle`. Equally, `Key` objects created with `window.crypto.subtle` cannot be used with this interface.
       */
      subtleCrypto: SubtleCrypto;

      /**
       * Implements the WebCrypto's [SubtleCrypto](https://www.w3.org/TR/WebCryptoAPI/#subtlecrypto-interface) interface. The cryptographic operations, including key generation, are software-backed. Protection of the keys, and thus implementation of the non-extractable property, is done in software, so the keys are less protected than hardware-backed keys.
       *
       * Only non-extractable RSASSA-PKCS1-V1\_5 keys with `modulusLength` up to 2048 can be generated. Each key can be used for signing data at most once.
       *
       * Keys generated on a specific `Token` cannot be used with any other Tokens, nor can they be used with `window.crypto.subtle`. Equally, `Key` objects created with `window.crypto.subtle` cannot be used with this interface.
       *
       * @since Chrome 97
       */
      softwareBackedSubtleCrypto: SubtleCrypto;
    }

    /**
     * Whether to use the Enterprise User Key or the Enterprise Machine Key.
     *
     * @since Chrome 110
     */
    export type Scope = "USER" | "MACHINE";

    /**
     * Type of key to generate.
     *
     * @since Chrome 110
     */
    export type Algorithm = "RSA" | "ECDSA";

    /**
     * @since Chrome 110
     */
    export interface RegisterKeyOptions {

      /**
       * Which algorithm the registered key should use.
       */
      algorithm: Algorithm;
    }

    /**
     * @since Chrome 110
     */
    export interface ChallengeKeyOptions {

      /**
       * A challenge as emitted by the Verified Access Web API.
       */
      challenge: ArrayBuffer;

      /**
       * If present, registers the challenged key with the specified `scope`'s token. The key can then be associated with a certificate and used like any other signing key. Subsequent calls to this function will then generate a new Enterprise Key in the specified `scope`.
       */
      registerKey?: RegisterKeyOptions;

      /**
       * Which Enterprise Key to challenge.
       */
      scope: Scope;
    }

    /**
     * Returns the available Tokens. In a regular user's session the list will always contain the user's token with `id` `"user"`. If a system-wide TPM token is available, the returned list will also contain the system-wide token with `id` `"system"`. The system-wide token will be the same for all sessions on this device (device in the sense of e.g. a Chromebook).
     *
     * @param callback Invoked by `getTokens` with the list of available Tokens.
     */
    export function getTokens(

      /**
       * @param tokens The list of available tokens.
       */
      callback: (
        tokens: Token[],
      ) => void,
    ): void;

    /**
     * Returns the list of all client certificates available from the given token. Can be used to check for the existence and expiration of client certificates that are usable for a certain authentication.
     *
     * @param tokenId The id of a Token returned by `getTokens`.
     * @param callback Called back with the list of the available certificates.
     */
    export function getCertificates(

      tokenId: string,

      /**
       * @param certificates The list of certificates, each in DER encoding of a X.509 certificate.
       */
      callback: (
        certificates: ArrayBuffer[],
      ) => void,
    ): void;

    /**
     * Imports `certificate` to the given token if the certified key is already stored in this token. After a successful certification request, this function should be used to store the obtained certificate and to make it available to the operating system and browser for authentication.
     *
     * @param tokenId The id of a Token returned by `getTokens`.
     * @param certificate The DER encoding of a X.509 certificate.
     * @param callback Called back when this operation is finished.
     */
    export function importCertificate(

      tokenId: string,

      certificate: ArrayBuffer,

      callback?: () => void,
    ): void;

    /**
     * Removes `certificate` from the given token if present. Should be used to remove obsolete certificates so that they are not considered during authentication and do not clutter the certificate choice. Should be used to free storage in the certificate store.
     *
     * @param tokenId The id of a Token returned by `getTokens`.
     * @param certificate The DER encoding of a X.509 certificate.
     * @param callback Called back when this operation is finished.
     */
    export function removeCertificate(

      tokenId: string,

      certificate: ArrayBuffer,

      callback?: () => void,
    ): void;

    /**
     * Similar to `challengeMachineKey` and `challengeUserKey`, but allows specifying the algorithm of a registered key. Challenges a hardware-backed Enterprise Machine Key and emits the response as part of a remote attestation protocol. Only useful on Chrome OS and in conjunction with the Verified Access Web API which both issues challenges and verifies responses.
     *
     * A successful verification by the Verified Access Web API is a strong signal that the current device is a legitimate Chrome OS device, the current device is managed by the domain specified during verification, the current signed-in user is managed by the domain specified during verification, and the current device state complies with enterprise device policy. For example, a policy may specify that the device must not be in developer mode. Any device identity emitted by the verification is tightly bound to the hardware of the current device. If `"user"` Scope is specified, the identity is also tighly bound to the current signed-in user.
     *
     * This function is highly restricted and will fail if the current device is not managed, the current user is not managed, or if this operation has not explicitly been enabled for the caller by enterprise device policy. The challenged key does not reside in the `"system"` or `"user"` token and is not accessible by any other API.
     *
     * @param options Object containing the fields defined in {@link ChallengeKeyOptions}.
     * @param callback Called back with the challenge response.
     * @since Chrome 110
     */
    export function challengeKey(

      options: ChallengeKeyOptions,

      /**
       * @param response The challenge response.
       */
      callback: (
        response: ArrayBuffer,
      ) => void,
    ): void;

    /**
     * Challenges a hardware-backed Enterprise Machine Key and emits the response as part of a remote attestation protocol. Only useful on Chrome OS and in conjunction with the Verified Access Web API which both issues challenges and verifies responses. A successful verification by the Verified Access Web API is a strong signal of all of the following: \* The current device is a legitimate Chrome OS device. \* The current device is managed by the domain specified during verification. \* The current signed-in user is managed by the domain specified during verification. \* The current device state complies with enterprise device policy. For example, a policy may specify that the device must not be in developer mode. \* Any device identity emitted by the verification is tightly bound to the hardware of the current device. This function is highly restricted and will fail if the current device is not managed, the current user is not managed, or if this operation has not explicitly been enabled for the caller by enterprise device policy. The Enterprise Machine Key does not reside in the `"system"` token and is not accessible by any other API.
     *
     * @param challenge A challenge as emitted by the Verified Access Web API.
     * @param registerKey If set, the current Enterprise Machine Key is registered with the `"system"` token and relinquishes the Enterprise Machine Key role. The key can then be associated with a certificate and used like any other signing key. This key is 2048-bit RSA. Subsequent calls to this function will then generate a new Enterprise Machine Key.
     * @param callback Called back with the challenge response.
     * @deprecated Use {@link challengeKey} instead.
     * @since Chrome 50
     * @chrome-deprecated-since Chrome 110
     */
    export function challengeMachineKey(

      challenge: ArrayBuffer,

      /**
       * @since Chrome 59
       */
      registerKey: boolean,

      /**
       * @param response The challenge response.
       */
      callback: (
        response: ArrayBuffer,
      ) => void,
    ): void;

    /**
     * Challenges a hardware-backed Enterprise Machine Key and emits the response as part of a remote attestation protocol. Only useful on Chrome OS and in conjunction with the Verified Access Web API which both issues challenges and verifies responses. A successful verification by the Verified Access Web API is a strong signal of all of the following: \* The current device is a legitimate Chrome OS device. \* The current device is managed by the domain specified during verification. \* The current signed-in user is managed by the domain specified during verification. \* The current device state complies with enterprise device policy. For example, a policy may specify that the device must not be in developer mode. \* Any device identity emitted by the verification is tightly bound to the hardware of the current device. This function is highly restricted and will fail if the current device is not managed, the current user is not managed, or if this operation has not explicitly been enabled for the caller by enterprise device policy. The Enterprise Machine Key does not reside in the `"system"` token and is not accessible by any other API.
     *
     * @param challenge A challenge as emitted by the Verified Access Web API.
     * @param callback Called back with the challenge response.
     * @deprecated Use {@link challengeKey} instead.
     * @since Chrome 50
     * @chrome-deprecated-since Chrome 110
     */
    export function challengeMachineKey(

      challenge: ArrayBuffer,

      /**
       * @param response The challenge response.
       */
      callback: (
        response: ArrayBuffer,
      ) => void,
    ): void;

    /**
     * Challenges a hardware-backed Enterprise User Key and emits the response as part of a remote attestation protocol. Only useful on Chrome OS and in conjunction with the Verified Access Web API which both issues challenges and verifies responses. A successful verification by the Verified Access Web API is a strong signal of all of the following: \* The current device is a legitimate Chrome OS device. \* The current device is managed by the domain specified during verification. \* The current signed-in user is managed by the domain specified during verification. \* The current device state complies with enterprise user policy. For example, a policy may specify that the device must not be in developer mode. \* The public key emitted by the verification is tightly bound to the hardware of the current device and to the current signed-in user. This function is highly restricted and will fail if the current device is not managed, the current user is not managed, or if this operation has not explicitly been enabled for the caller by enterprise user policy. The Enterprise User Key does not reside in the `"user"` token and is not accessible by any other API.
     *
     * @param challenge A challenge as emitted by the Verified Access Web API.
     * @param registerKey If set, the current Enterprise User Key is registered with the `"user"` token and relinquishes the Enterprise User Key role. The key can then be associated with a certificate and used like any other signing key. This key is 2048-bit RSA. Subsequent calls to this function will then generate a new Enterprise User Key.
     * @param callback Called back with the challenge response.
     * @deprecated Use {@link challengeKey} instead.
     * @since Chrome 50
     * @chrome-deprecated-since Chrome 110
     */
    export function challengeUserKey(

      challenge: ArrayBuffer,

      registerKey: boolean,

      /**
       * @param response The challenge response.
       */
      callback: (
        response: ArrayBuffer,
      ) => void,
    ): void;
  }

  /**
   * The `chrome.events` namespace contains common types used by APIs dispatching events to notify you when something interesting happens.
   */
  export namespace events {

    /**
     * Description of a declarative rule for handling events.
     */
    export interface Rule<C = any, A = any> {

      /**
       * Optional identifier that allows referencing this rule.
       */
      id?: string;

      /**
       * Tags can be used to annotate rules and perform operations on sets of rules.
       */
      tags?: string[];

      /**
       * List of conditions that can trigger the actions.
       */
      conditions: any[];

      /**
       * List of actions that are triggered if one of the conditions is fulfilled.
       */
      actions: any[];

      /**
       * Optional priority of this rule. Defaults to 100.
       */
      priority?: number;
    }

    /**
     * An object which allows the addition and removal of listeners for a Chrome event.
     */
    export interface Event<H extends (...args: any) => void, C = void, A = void> {

      /**
       * Registers an event listener _callback_ to an event.
       *
       * @param callback Called when an event occurs. The parameters of this function depend on the type of event.
       */
      addListener(

        callback: H,
      ): void;

      /**
       * Deregisters an event listener _callback_ from an event.
       *
       * @param callback Listener that shall be unregistered.
       */
      removeListener(

        callback: H,
      ): void;

      /**
       * @param callback Listener whose registration status shall be tested.
       * @returns True if _callback_ is registered to the event.
       */
      hasListener(

        callback: H,
      ): boolean;

      /**
       * @returns True if any event listeners are registered to the event.
       */
      hasListeners(): boolean;

      /**
       * Registers rules to handle events.
       *
       * @param rules Rules to be registered. These do not replace previously registered rules.
       * @param callback Called with registered rules.
       */
      addRules(

        rules: Rule[],

        /**
         * @param rules Rules that were registered, the optional parameters are filled with values.
         */
        callback?: (
          rules: Rule[],
        ) => void,
      ): void;

      /**
       * Returns currently registered rules.
       *
       * @param ruleIdentifiers If an array is passed, only rules with identifiers contained in this array are returned.
       * @param callback Called with registered rules.
       */
      getRules(

        ruleIdentifiers: string[],

        /**
         * @param rules Rules that were registered, the optional parameters are filled with values.
         */
        callback: (
          rules: Rule[],
        ) => void,
      ): void;

      /**
       * Returns currently registered rules.
       *
       * @param callback Called with registered rules.
       */
      getRules(

        /**
         * @param rules Rules that were registered, the optional parameters are filled with values.
         */
        callback: (
          rules: Rule[],
        ) => void,
      ): void;

      /**
       * Unregisters currently registered rules.
       *
       * @param ruleIdentifiers If an array is passed, only rules with identifiers contained in this array are unregistered.
       * @param callback Called when rules were unregistered.
       */
      removeRules(

        ruleIdentifiers?: string[],

        callback?: () => void,
      ): void;
    }

    /**
     * Filters URLs for various criteria. See [event filtering](https://developer.chrome.com/docs/extensions/reference/events/#filtered). All criteria are case sensitive.
     */
    export interface UrlFilter {

      /**
       * Matches if the host name of the URL contains a specified string. To test whether a host name component has a prefix 'foo', use hostContains: '.foo'. This matches 'www.foobar.com' and 'foo.com', because an implicit dot is added at the beginning of the host name. Similarly, hostContains can be used to match against component suffix ('foo.') and to exactly match against components ('.foo.'). Suffix- and exact-matching for the last components need to be done separately using hostSuffix, because no implicit dot is added at the end of the host name.
       */
      hostContains?: string;

      /**
       * Matches if the host name of the URL is equal to a specified string.
       */
      hostEquals?: string;

      /**
       * Matches if the host name of the URL starts with a specified string.
       */
      hostPrefix?: string;

      /**
       * Matches if the host name of the URL ends with a specified string.
       */
      hostSuffix?: string;

      /**
       * Matches if the path segment of the URL contains a specified string.
       */
      pathContains?: string;

      /**
       * Matches if the path segment of the URL is equal to a specified string.
       */
      pathEquals?: string;

      /**
       * Matches if the path segment of the URL starts with a specified string.
       */
      pathPrefix?: string;

      /**
       * Matches if the path segment of the URL ends with a specified string.
       */
      pathSuffix?: string;

      /**
       * Matches if the query segment of the URL contains a specified string.
       */
      queryContains?: string;

      /**
       * Matches if the query segment of the URL is equal to a specified string.
       */
      queryEquals?: string;

      /**
       * Matches if the query segment of the URL starts with a specified string.
       */
      queryPrefix?: string;

      /**
       * Matches if the query segment of the URL ends with a specified string.
       */
      querySuffix?: string;

      /**
       * Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number.
       */
      urlContains?: string;

      /**
       * Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number.
       */
      urlEquals?: string;

      /**
       * Matches if the URL (without fragment identifier) matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the [RE2 syntax](https://github.com/google/re2/blob/master/doc/syntax.txt).
       */
      urlMatches?: string;

      /**
       * Matches if the URL without query segment and fragment identifier matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the [RE2 syntax](https://github.com/google/re2/blob/master/doc/syntax.txt).
       */
      originAndPathMatches?: string;

      /**
       * Matches if the URL (without fragment identifier) starts with a specified string. Port numbers are stripped from the URL if they match the default port number.
       */
      urlPrefix?: string;

      /**
       * Matches if the URL (without fragment identifier) ends with a specified string. Port numbers are stripped from the URL if they match the default port number.
       */
      urlSuffix?: string;

      /**
       * Matches if the scheme of the URL is equal to any of the schemes specified in the array.
       */
      schemes?: string[];

      /**
       * Matches if the port of the URL is contained in any of the specified port lists. For example `[80, 443, [1000, 1200]]` matches all requests on port 80, 443 and in the range 1000-1200.
       */
      ports?: (number | number[])[];

      /**
       * Matches if the host part of the URL is an IP address and is contained in any of the CIDR blocks specified in the array.
       *
       * @since Pending
       */
      cidrBlocks?: string[];
    }
  }

  /**
   * The `chrome.extension` API has utilities that can be used by any extension page. It includes support for exchanging messages between an extension and its content scripts or between extensions, as described in detail in [Message Passing](https://developer.chrome.com/docs/extensions/messaging).
   */
  export namespace extension {

    /**
     * The type of extension view.
     *
     * @since Chrome 44
     */
    export type ViewType = "tab" | "popup";

    /**
     * True for content scripts running inside incognito tabs, and for extension pages running inside an incognito process. The latter only applies to extensions with 'split' incognito\_behavior.
     */
    export let inIncognitoContext: boolean;

    /**
     * Returns an array of the JavaScript 'window' objects for each of the pages running inside the current extension.
     *
     * @returns Array of global objects
     * @chrome-disallow-service-workers
     */
    export function getViews(

      fetchProperties?: {

        /**
         * The type of view to get. If omitted, returns all views (including background pages and tabs).
         */
        type?: ViewType,

        /**
         * The window to restrict the search to. If omitted, returns all views.
         */
        windowId?: number,

        /**
         * Find a view according to a tab id. If this field is omitted, returns all views.
         *
         * @since Chrome 54
         */
        tabId?: number,
      },
    ): Window[];

    /**
     * Returns the JavaScript 'window' object for the background page running inside the current extension. Returns null if the extension has no background page.
     *
     * @chrome-disallow-service-workers
     */
    export function getBackgroundPage(): Window | undefined;

    /**
     * Retrieves the state of the extension's access to Incognito-mode. This corresponds to the user-controlled per-extension 'Allowed in Incognito' setting accessible via the chrome://extensions page.
     *
     * @chrome-returns-extra since Chrome 99
     */
    export function isAllowedIncognitoAccess(): Promise<boolean>;

    /**
     * Retrieves the state of the extension's access to Incognito-mode. This corresponds to the user-controlled per-extension 'Allowed in Incognito' setting accessible via the chrome://extensions page.
     */
    export function isAllowedIncognitoAccess(

      /**
       * @param isAllowedAccess True if the extension has access to Incognito mode, false otherwise.
       */
      callback?: (
        isAllowedAccess: boolean,
      ) => void,
    ): void;

    /**
     * Retrieves the state of the extension's access to the 'file://' scheme. This corresponds to the user-controlled per-extension 'Allow access to File URLs' setting accessible via the chrome://extensions page.
     *
     * @chrome-returns-extra since Chrome 99
     */
    export function isAllowedFileSchemeAccess(): Promise<boolean>;

    /**
     * Retrieves the state of the extension's access to the 'file://' scheme. This corresponds to the user-controlled per-extension 'Allow access to File URLs' setting accessible via the chrome://extensions page.
     */
    export function isAllowedFileSchemeAccess(

      /**
       * @param isAllowedAccess True if the extension can access the 'file://' scheme, false otherwise.
       */
      callback?: (
        isAllowedAccess: boolean,
      ) => void,
    ): void;

    /**
     * Sets the value of the ap CGI parameter used in the extension's update URL. This value is ignored for extensions that are hosted in the Chrome Extension Gallery.
     */
    export function setUpdateUrlData(

      data: string,
    ): void;
  }

  /**
   * Schemas for structured manifest entries
   */
  export namespace extensionsManifestTypes {

    /**
     * This API provides programmatic access to the user interface elements of Chrome. This includes everything in the web view, and optionally Chrome's full user interface.
     *
     * @since Chrome 67
     */
    export type automation = boolean | {

      /**
       * Whether to request permission to the whole ChromeOS desktop. If granted, this gives the extension access to every aspect of the desktop, and every site and app. If this permission is requested, all other permissions are implicitly included and do not need to be requested separately.
       */
      desktop?: boolean,
    };

    /**
     * The `content_capabilities` manifest entry allows an extension to grant certain additional capabilities to web contents whose locations match a given set of URL patterns.
     */
    export interface ContentCapabilities {

      /**
       * The set of URL patterns to match against. If any of the given patterns match a URL, its contents will be granted the specified capabilities.
       */
      matches: string[];

      /**
       * The set of capabilities to grant matched contents. This is currently limited to `clipboardRead`, `clipboardWrite`, and `unlimitedStorage`.
       */
      permissions: string[];
    }

    export interface ExternallyConnectable {

      /**
       * The IDs of extensions or apps that are allowed to connect. If left empty or unspecified, no extensions or apps can connect.
       *
       * The wildcard `"*"` will allow all extensions and apps to connect.
       */
      ids?: string[];

      /**
       * The URL patterns for _web pages_ that are allowed to connect. _This does not affect content scripts._ If left empty or unspecified, no web pages can connect.
       *
       * Patterns cannot include wildcard domains nor subdomains of [(effective) top level domains](https://publicsuffix.org/list/); `*://google.com/*` and `http://*.chromium.org/*` are valid, while `<all_urls>`, `http://*\/*`, `*://*.com/*`, and even `http://*.appspot.com/*` are not.
       */
      matches?: string[];

      /**
       * If `true`, messages sent via {@link runtime.connect} or {@link runtime.sendMessage} will set {@link runtime.MessageSender.tlsChannelId} if those methods request it to be. If `false`, {@link runtime.MessageSender.tlsChannelId} will never be set under any circumstance.
       */
      accepts_tls_channel_id?: boolean;
    }

    /**
     * The `options_ui` manifest property declares how the options page should be displayed.
     */
    export interface OptionsUI {

      /**
       * The path to your options page, relative to your extension's root.
       */
      page: string;

      /**
       * If `true`, a Chrome user agent stylesheet will be applied to your options page. The default value is `false`. We do not recommend you enable it as it no longer results in a consistent UI with Chrome. This option will be removed in Manifest V3.
       */
      chrome_style?: boolean;

      /**
       * If `true`, your extension's options page will be opened in a new tab rather than embedded in _chrome://extensions_. The default is `false`, and we recommend that you don't change it.
       *
       * **This is only useful to delay the inevitable deprecation of the old options UI!** It will be removed soon, so try not to use it. It will break.
       */
      open_in_tab?: boolean;
    }

    /**
     * A single string or a list of strings representing host:port patterns.
     */
    export type SocketHostPatterns = string | string[];

    /**
     * The `sockets` manifest property declares which sockets operations an app can issue.
     */
    export interface sockets {

      /**
       * The `udp` manifest property declares which sockets.udp operations an app can issue.
       */
      udp?: {

        /**
         * The host:port pattern for `bind` operations.
         */
        bind?: SocketHostPatterns,

        /**
         * The host:port pattern for `send` operations.
         */
        send?: SocketHostPatterns,

        /**
         * The host:port pattern for `joinGroup` operations.
         */
        multicastMembership?: SocketHostPatterns,
      };

      /**
       * The `tcp` manifest property declares which sockets.tcp operations an app can issue.
       */
      tcp?: {

        /**
         * The host:port pattern for `connect` operations.
         */
        connect?: SocketHostPatterns,
      };

      /**
       * The `tcpServer` manifest property declares which sockets.tcpServer operations an app can issue.
       */
      tcpServer?: {

        /**
         * The host:port pattern for `listen` operations.
         */
        listen?: SocketHostPatterns,
      };
    }

    /**
     * The `bluetooth` manifest property give permission to an app to use the {@link bluetooth} API. A list of UUIDs can be optionally specified to enable communication with devices.
     */
    export interface bluetooth {

      /**
       * The `uuids` manifest property declares the list of protocols, profiles and services that an app can communicate using.
       */
      uuids?: string[];

      /**
       * If `true`, gives permission to an app to use the {@link bluetoothSocket} API
       */
      socket?: boolean;

      /**
       * If `true`, gives permission to an app to use the {@link bluetoothLowEnergy} API
       */
      low_energy?: boolean;

      /**
       * If `true`, gives permission to an app to use the advertisement functions in the {@link bluetoothLowEnergy} API
       *
       * @since Chrome 44
       */
      peripheral?: boolean;
    }

    /**
     * The `usb_printers` manifest property lists the USB printers supported by an app implementing the {@link printerProvider} API.
     *
     * @since Chrome 44
     */
    export interface UsbPrinters {

      /**
       * A list of {@link usb.DeviceFilter USB device filters} matching supported devices. A device only needs to match one of the provided filters. A `vendorId` is required and only one of `productId` or `interfaceClass` may be provided.
       */
      filters: {

        /**
         * USB vendor ID of matching devices
         */
        vendorId: number,

        /**
         * USB product ID of matching devices
         */
        productId?: number,

        /**
         * USB interface class implemented by any interface of a matching device.
         */
        interfaceClass?: number,

        /**
         * USB interface sub-class implemented by the interface matching {@link interfaceClass}.
         */
        interfaceSubclass?: number,

        /**
         * USB interface protocol implemented by the interface matching {@link interfaceClass} and {@link interfaceSubclass}.
         */
        interfaceProtocol?: number,
      }[];
    }

    /**
     * The `kiosk_secondary_apps` manifest property lists the secondary kiosk apps to be deployed by the primary kiosk app.
     *
     * @since Chrome 47
     */
    export type KioskSecondaryApps = {

      /**
       * ID of secondary kiosk app
       */
      id: string,

      /**
       * Whether the secondary app should be enabled when kiosk app is launched. If true, the app will be enabled before the kiosk app launch; if false the app will be disabled before the kiosk app launch; if not set, the app's enabled state will not be changed during the kiosk app launch. The ${ref:management} API can be used to later change the secondary app state.
       *
       * @since Chrome 66
       */
      enabled_on_launch?: boolean,
    }[];
  }

  /**
   * The `chrome.extensionTypes` API contains type declarations for Chrome extensions.
   */
  export namespace extensionTypes {

    /**
     * The format of an image.
     *
     * @since Chrome 44
     */
    export type ImageFormat = "jpeg" | "png";

    /**
     * Details about the format and quality of an image.
     */
    export interface ImageDetails {

      /**
       * The format of the resulting image. Default is `"jpeg"`.
       */
      format?: ImageFormat;

      /**
       * When format is `"jpeg"`, controls the quality of the resulting image. This value is ignored for PNG images. As quality is decreased, the resulting image will have more visual artifacts, and the number of bytes needed to store it will decrease.
       */
      quality?: number;
    }

    /**
     * The soonest that the JavaScript or CSS will be injected into the tab.
     *
     * @since Chrome 44
     */
    export type RunAt = "document_start" | "document_end" | "document_idle";

    /**
     * The [origin](https://www.w3.org/TR/css3-cascade/#cascading-origins) of injected CSS.
     *
     * @since Chrome 66
     */
    export type CSSOrigin = "author" | "user";

    /**
     * Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
     */
    export interface InjectDetails {

      /**
       * JavaScript or CSS code to inject.
       *
       *
       * **Warning:** Be careful using the `code` parameter. Incorrect use of it may open your extension to [cross site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks
       */
      code?: string;

      /**
       * JavaScript or CSS file to inject.
       */
      file?: string;

      /**
       * If allFrames is `true`, implies that the JavaScript or CSS should be injected into all frames of current page. By default, it's `false` and is only injected into the top frame. If `true` and `frameId` is set, then the code is inserted in the selected frame and all of its child frames.
       */
      allFrames?: boolean;

      /**
       * The [frame](https://developer.chrome.com/docs/extensions/reference/webNavigation/#frame_ids) where the script or CSS should be injected. Defaults to 0 (the top-level frame).
       *
       * @since Chrome 50
       */
      frameId?: number;

      /**
       * If matchAboutBlank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Code cannot be inserted in top-level about:-frames. By default it is `false`.
       */
      matchAboutBlank?: boolean;

      /**
       * The soonest that the JavaScript or CSS will be injected into the tab. Defaults to "document\_idle".
       */
      runAt?: RunAt;

      /**
       * The [origin](https://www.w3.org/TR/css3-cascade/#cascading-origins) of the CSS to inject. This may only be specified for CSS, not JavaScript. Defaults to `"author"`.
       *
       * @since Chrome 66
       */
      cssOrigin?: CSSOrigin;
    }

    /**
     * Details of the CSS to remove. Either the code or the file property must be set, but both may not be set at the same time.
     *
     * @since Chrome 87
     */
    export interface DeleteInjectionDetails {

      /**
       * CSS code to remove.
       */
      code?: string;

      /**
       * CSS file to remove.
       */
      file?: string;

      /**
       * If allFrames is `true`, implies that the CSS should be removed from all frames of current page. By default, it's `false` and is only removed from the top frame. If `true` and `frameId` is set, then the code is removed from the selected frame and all of its child frames.
       */
      allFrames?: boolean;

      /**
       * The [frame](https://developer.chrome.com/docs/extensions/reference/webNavigation/#frame_ids) from where the CSS should be removed. Defaults to 0 (the top-level frame).
       */
      frameId?: number;

      /**
       * If matchAboutBlank is true, then the code is also removed from about:blank and about:srcdoc frames if your extension has access to its parent document. By default it is `false`.
       */
      matchAboutBlank?: boolean;

      /**
       * The [origin](https://www.w3.org/TR/css3-cascade/#cascading-origins) of the CSS to remove. Defaults to `"author"`.
       */
      cssOrigin?: CSSOrigin;
    }

    /**
     * The type of frame.
     *
     * @since Chrome 106
     */
    export type FrameType = "outermost_frame" | "fenced_frame" | "sub_frame";

    /**
     * The document lifecycle of the frame.
     *
     * @since Chrome 106
     */
    export type DocumentLifecycle = "prerender" | "active" | "cached" | "pending_deletion";
  }

  /**
   * Use the `chrome.fileBrowserHandler` API to extend the Chrome OS file browser. For example, you can use this API to enable users to upload files to your website.
   *
   * @chrome-permission fileBrowserHandler
   * @chrome-disallow-service-workers
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace fileBrowserHandler {

    /**
     * Event details payload for fileBrowserHandler.onExecute event.
     */
    export interface FileHandlerExecuteEventDetails {

      /**
       * Array of Entry instances representing files that are targets of this action (selected in ChromeOS file browser).
       */
      entries: any[];

      /**
       * The ID of the tab that raised this event. Tab IDs are unique within a browser session.
       */
      tab_id?: number;
    }

    /**
     * Fired when file system action is executed from ChromeOS file browser.
     */
    export const onExecute: events.Event<(
      id: string,
      details: FileHandlerExecuteEventDetails,
    ) => void>;
  }

  /**
   * `file_handlers` manifest key defintion. File Handlers allow developers to let extensions interact with files on the operating system. This manifest key can be used by developers to register an extension to a given file type.
   *
   * @since Chrome 109
   */
  export namespace fileHandlers {

    export interface Icon {

      /**
       * URL from which a user agent can fetch image data.
       */
      src: string;

      /**
       * Multiple space-separated size values to also accommodate image formats that can act as containers for multiple images of varying dimensions: e.g. "16x16", "16x16 32x32".
       */
      sizes?: string;

      /**
       * MIME type is purely advisory with no default value.
       */
      type?: string;
    }

    export interface FileHandler {

      /**
       * A mapping of one or more MIME types to one or more file extensions. e.g. "accept": {"text/csv": ".csv"} or {"text/csv": \[".csv", ".txt"\]}.
       *
       * @since Chrome 110
       */
      accept: {[name: string]: any};

      /**
       * Specifies the url after the origin that is the navigation destination for file handling launches.
       */
      action: string;

      /**
       * Description of the file type.
       */
      name: string;

      /**
       * Array of ImageResources. Only icons declared at the manifest level are currently supported. The icon for the extension will appear in the "Open" menu.
       */
      icons?: Icon[];

      /**
       * Whether multiple files should be opened in a single client or multiple. Defaults to \`single-client\`, which makes all files available in only one tab. \`multiple-client\` opens a new tab for each file.
       */
      launch_type?: string;
    }
  }

  /**
   * Use the `chrome.fileSystemProvider` API to create file systems, that can be accessible from the file manager on Chrome OS.
   *
   * @chrome-permission fileSystemProvider
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace fileSystemProvider {

    /**
     * Error codes used by providing extensions in response to requests as well as in case of errors when calling methods of the API. For success, `"OK"` must be used.
     */
    export type ProviderError = "OK" | "FAILED" | "IN_USE" | "EXISTS" | "NOT_FOUND" | "ACCESS_DENIED" | "TOO_MANY_OPENED" | "NO_MEMORY" | "NO_SPACE" | "NOT_A_DIRECTORY" | "INVALID_OPERATION" | "SECURITY" | "ABORT" | "NOT_A_FILE" | "NOT_EMPTY" | "INVALID_URL" | "IO";

    /**
     * Mode of opening a file. Used by {@link onOpenFileRequested}.
     */
    export type OpenFileMode = "READ" | "WRITE";

    /**
     * Type of a change detected on the observed directory.
     */
    export type ChangeType = "CHANGED" | "DELETED";

    /**
     * List of common actions. `"SHARE"` is for sharing files with others. `"SAVE_FOR_OFFLINE"` for pinning (saving for offline access). `"OFFLINE_NOT_NECESSARY"` for notifying that the file doesn't need to be stored for offline access anymore. Used by {@link onGetActionsRequested} and {@link onExecuteActionRequested}.
     *
     * @since Chrome 45
     */
    export type CommonActionId = "SAVE_FOR_OFFLINE" | "OFFLINE_NOT_NECESSARY" | "SHARE";

    /**
     * @since Chrome 117
     */
    export interface CloudIdentifier {

      /**
       * Identifier for the cloud storage provider (e.g. 'drive.google.com').
       */
      providerName: string;

      /**
       * The provider's identifier for the given file/directory.
       */
      id: string;
    }

    export interface EntryMetadata {

      /**
       * True if it is a directory. Must be provided if requested in `options`.
       */
      isDirectory?: boolean;

      /**
       * Name of this entry (not full path name). Must not contain '/'. For root it must be empty. Must be provided if requested in `options`.
       */
      name?: string;

      /**
       * File size in bytes. Must be provided if requested in `options`.
       */
      size?: number;

      /**
       * The last modified time of this entry. Must be provided if requested in `options`.
       */
      modificationTime?: Date;

      /**
       * Mime type for the entry. Always optional, but should be provided if requested in `options`.
       */
      mimeType?: string;

      /**
       * Thumbnail image as a data URI in either PNG, JPEG or WEBP format, at most 32 KB in size. Optional, but can be provided only when explicitly requested by the {@link onGetMetadataRequested} event.
       */
      thumbnail?: string;

      /**
       * Cloud storage representation of this entry. Must be provided if requested in `options` and the file is backed by cloud storage. For local files not backed by cloud storage, it should be undefined when requested.
       *
       * @since Chrome 117
       */
      cloudIdentifier?: CloudIdentifier;
    }

    export interface Watcher {

      /**
       * The path of the entry being observed.
       */
      entryPath: string;

      /**
       * Whether watching should include all child entries recursively. It can be true for directories only.
       */
      recursive: boolean;

      /**
       * Tag used by the last notification for the watcher.
       */
      lastTag?: string;
    }

    export interface OpenedFile {

      /**
       * A request ID to be be used by consecutive read/write and close requests.
       */
      openRequestId: number;

      /**
       * The path of the opened file.
       */
      filePath: string;

      /**
       * Whether the file was opened for reading or writing.
       */
      mode: OpenFileMode;
    }

    export interface FileSystemInfo {

      /**
       * The identifier of the file system.
       */
      fileSystemId: string;

      /**
       * A human-readable name for the file system.
       */
      displayName: string;

      /**
       * Whether the file system supports operations which may change contents of the file system (such as creating, deleting or writing to files).
       */
      writable: boolean;

      /**
       * The maximum number of files that can be opened at once. If 0, then not limited.
       */
      openedFilesLimit: number;

      /**
       * List of currently opened files.
       */
      openedFiles: OpenedFile[];

      /**
       * Whether the file system supports the `tag` field for observing directories.
       *
       * @since Chrome 45
       */
      supportsNotifyTag?: boolean;

      /**
       * List of watchers.
       *
       * @since Chrome 45
       */
      watchers: Watcher[];
    }

    export interface MountOptions {

      /**
       * The string indentifier of the file system. Must be unique per each extension.
       */
      fileSystemId: string;

      /**
       * A human-readable name for the file system.
       */
      displayName: string;

      /**
       * Whether the file system supports operations which may change contents of the file system (such as creating, deleting or writing to files).
       */
      writable?: boolean;

      /**
       * The maximum number of files that can be opened at once. If not specified, or 0, then not limited.
       */
      openedFilesLimit?: number;

      /**
       * Whether the file system supports the `tag` field for observed directories.
       *
       * @since Chrome 45
       */
      supportsNotifyTag?: boolean;

      /**
       * Whether the framework should resume the file system at the next sign-in session. True by default.
       *
       * @since Chrome 64
       */
      persistent?: boolean;
    }

    export interface UnmountOptions {

      /**
       * The identifier of the file system to be unmounted.
       */
      fileSystemId: string;
    }

    export interface UnmountRequestedOptions {

      /**
       * The identifier of the file system to be unmounted.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;
    }

    export interface GetMetadataRequestedOptions {

      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The path of the entry to fetch metadata about.
       */
      entryPath: string;

      /**
       * Set to `true` if `is_directory` value is requested.
       *
       * @since Chrome 49
       */
      isDirectory: boolean;

      /**
       * Set to `true` if `name` value is requested.
       *
       * @since Chrome 49
       */
      name: boolean;

      /**
       * Set to `true` if `size` value is requested.
       *
       * @since Chrome 49
       */
      size: boolean;

      /**
       * Set to `true` if `modificationTime` value is requested.
       *
       * @since Chrome 49
       */
      modificationTime: boolean;

      /**
       * Set to `true` if `mimeType` value is requested.
       *
       * @since Chrome 49
       */
      mimeType: boolean;

      /**
       * Set to `true` if `thumbnail` value is requested.
       */
      thumbnail: boolean;

      /**
       * Set to `true` if `cloudIdentifier` value is requested.
       *
       * @since Chrome 117
       */
      cloudIdentifier: boolean;
    }

    /**
     * @since Chrome 45
     */
    export interface GetActionsRequestedOptions {

      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * List of paths of entries for the list of actions.
       *
       * @since Chrome 47
       */
      entryPaths: string[];
    }

    export interface ReadDirectoryRequestedOptions {

      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The path of the directory which contents are requested.
       */
      directoryPath: string;

      /**
       * Set to `true` if `is_directory` value is requested.
       *
       * @since Chrome 49
       */
      isDirectory: boolean;

      /**
       * Set to `true` if `name` value is requested.
       *
       * @since Chrome 49
       */
      name: boolean;

      /**
       * Set to `true` if `size` value is requested.
       *
       * @since Chrome 49
       */
      size: boolean;

      /**
       * Set to `true` if `modificationTime` value is requested.
       *
       * @since Chrome 49
       */
      modificationTime: boolean;

      /**
       * Set to `true` if `mimeType` value is requested.
       *
       * @since Chrome 49
       */
      mimeType: boolean;

      /**
       * Set to `true` if `thumbnail` value is requested.
       *
       * @since Chrome 49
       */
      thumbnail: boolean;
    }

    export interface OpenFileRequestedOptions {

      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * A request ID which will be used by consecutive read/write and close requests.
       */
      requestId: number;

      /**
       * The path of the file to be opened.
       */
      filePath: string;

      /**
       * Whether the file will be used for reading or writing.
       */
      mode: OpenFileMode;
    }

    export interface CloseFileRequestedOptions {

      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * A request ID used to open the file.
       */
      openRequestId: number;
    }

    export interface ReadFileRequestedOptions {

      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * A request ID used to open the file.
       */
      openRequestId: number;

      /**
       * Position in the file (in bytes) to start reading from.
       */
      offset: number;

      /**
       * Number of bytes to be returned.
       */
      length: number;
    }

    export interface CreateDirectoryRequestedOptions {

      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The path of the directory to be created.
       */
      directoryPath: string;

      /**
       * Whether the operation is recursive (for directories only).
       */
      recursive: boolean;
    }

    export interface DeleteEntryRequestedOptions {

      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The path of the entry to be deleted.
       */
      entryPath: string;

      /**
       * Whether the operation is recursive (for directories only).
       */
      recursive: boolean;
    }

    export interface CreateFileRequestedOptions {

      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The path of the file to be created.
       */
      filePath: string;
    }

    export interface CopyEntryRequestedOptions {

      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The source path of the entry to be copied.
       */
      sourcePath: string;

      /**
       * The destination path for the copy operation.
       */
      targetPath: string;
    }

    export interface MoveEntryRequestedOptions {

      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The source path of the entry to be moved into a new place.
       */
      sourcePath: string;

      /**
       * The destination path for the copy operation.
       */
      targetPath: string;
    }

    export interface TruncateRequestedOptions {

      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The path of the file to be truncated.
       */
      filePath: string;

      /**
       * Number of bytes to be retained after the operation completes.
       */
      length: number;
    }

    export interface WriteFileRequestedOptions {

      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * A request ID used to open the file.
       */
      openRequestId: number;

      /**
       * Position in the file (in bytes) to start writing the bytes from.
       */
      offset: number;

      /**
       * Buffer of bytes to be written to the file.
       */
      data: ArrayBuffer;
    }

    export interface AbortRequestedOptions {

      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * An ID of the request to be aborted.
       */
      operationRequestId: number;
    }

    export interface AddWatcherRequestedOptions {

      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The path of the entry to be observed.
       */
      entryPath: string;

      /**
       * Whether observing should include all child entries recursively. It can be true for directories only.
       */
      recursive: boolean;
    }

    export interface RemoveWatcherRequestedOptions {

      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The path of the watched entry.
       */
      entryPath: string;

      /**
       * Mode of the watcher.
       */
      recursive: boolean;
    }

    /**
     * @since Chrome 45
     */
    export interface Action {

      /**
       * The identifier of the action. Any string or {@link CommonActionId} for common actions.
       */
      id: string;

      /**
       * The title of the action. It may be ignored for common actions.
       */
      title?: string;
    }

    /**
     * @since Chrome 45
     */
    export interface ExecuteActionRequestedOptions {

      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The set of paths of the entries to be used for the action.
       *
       * @since Chrome 47
       */
      entryPaths: string[];

      /**
       * The identifier of the action to be executed.
       */
      actionId: string;
    }

    export interface Change {

      /**
       * The path of the changed entry.
       */
      entryPath: string;

      /**
       * The type of the change which happened to the entry.
       */
      changeType: ChangeType;
    }

    export interface NotifyOptions {

      /**
       * The identifier of the file system related to this change.
       */
      fileSystemId: string;

      /**
       * The path of the observed entry.
       */
      observedPath: string;

      /**
       * Mode of the observed entry.
       */
      recursive: boolean;

      /**
       * The type of the change which happened to the observed entry. If it is DELETED, then the observed entry will be automatically removed from the list of observed entries.
       */
      changeType: ChangeType;

      /**
       * List of changes to entries within the observed directory (including the entry itself)
       */
      changes?: Change[];

      /**
       * Tag for the notification. Required if the file system was mounted with the `supportsNotifyTag` option. Note, that this flag is necessary to provide notifications about changes which changed even when the system was shutdown.
       */
      tag?: string;
    }

    /**
     * @since Chrome 44
     */
    export interface ConfigureRequestedOptions {

      /**
       * The identifier of the file system to be configured.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;
    }

    /**
     * Raised when unmounting for the file system with the `fileSystemId` identifier is requested. In the response, the {@link unmount} API method must be called together with `successCallback`. If unmounting is not possible (eg. due to a pending operation), then `errorCallback` must be called.
     */
    export const onUnmountRequested: events.Event<(
      options: UnmountRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when metadata of a file or a directory at `entryPath` is requested. The metadata must be returned with the `successCallback` call. In case of an error, `errorCallback` must be called.
     */
    export const onGetMetadataRequested: events.Event<(
      options: GetMetadataRequestedOptions,
      successCallback: (
        metadata: EntryMetadata,
      ) => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when a list of actions for a set of files or directories at `entryPaths` is requested. All of the returned actions must be applicable to each entry. If there are no such actions, an empty array should be returned. The actions must be returned with the `successCallback` call. In case of an error, `errorCallback` must be called.
     *
     * @since Chrome 48
     */
    export const onGetActionsRequested: events.Event<(
      options: GetActionsRequestedOptions,
      successCallback: (
        actions: Action[],
      ) => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when contents of a directory at `directoryPath` are requested. The results must be returned in chunks by calling the `successCallback` several times. In case of an error, `errorCallback` must be called.
     */
    export const onReadDirectoryRequested: events.Event<(
      options: ReadDirectoryRequestedOptions,
      successCallback: (
        entries: EntryMetadata[],
        hasMore: boolean,
      ) => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when opening a file at `filePath` is requested. If the file does not exist, then the operation must fail. Maximum number of files opened at once can be specified with `MountOptions`.
     */
    export const onOpenFileRequested: events.Event<(
      options: OpenFileRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when opening a file previously opened with `openRequestId` is requested to be closed.
     */
    export const onCloseFileRequested: events.Event<(
      options: CloseFileRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when reading contents of a file opened previously with `openRequestId` is requested. The results must be returned in chunks by calling `successCallback` several times. In case of an error, `errorCallback` must be called.
     */
    export const onReadFileRequested: events.Event<(
      options: ReadFileRequestedOptions,
      successCallback: (
        data: ArrayBuffer,
        hasMore: boolean,
      ) => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when creating a directory is requested. The operation must fail with the EXISTS error if the target directory already exists. If `recursive` is true, then all of the missing directories on the directory path must be created.
     */
    export const onCreateDirectoryRequested: events.Event<(
      options: CreateDirectoryRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when deleting an entry is requested. If `recursive` is true, and the entry is a directory, then all of the entries inside must be recursively deleted as well.
     */
    export const onDeleteEntryRequested: events.Event<(
      options: DeleteEntryRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when creating a file is requested. If the file already exists, then `errorCallback` must be called with the `"EXISTS"` error code.
     */
    export const onCreateFileRequested: events.Event<(
      options: CreateFileRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when copying an entry (recursively if a directory) is requested. If an error occurs, then `errorCallback` must be called.
     */
    export const onCopyEntryRequested: events.Event<(
      options: CopyEntryRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when moving an entry (recursively if a directory) is requested. If an error occurs, then `errorCallback` must be called.
     */
    export const onMoveEntryRequested: events.Event<(
      options: MoveEntryRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when truncating a file to a desired length is requested. If an error occurs, then `errorCallback` must be called.
     */
    export const onTruncateRequested: events.Event<(
      options: TruncateRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when writing contents to a file opened previously with `openRequestId` is requested.
     */
    export const onWriteFileRequested: events.Event<(
      options: WriteFileRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when aborting an operation with `operationRequestId` is requested. The operation executed with `operationRequestId` must be immediately stopped and `successCallback` of this abort request executed. If aborting fails, then `errorCallback` must be called. Note, that callbacks of the aborted operation must not be called, as they will be ignored. Despite calling `errorCallback`, the request may be forcibly aborted.
     */
    export const onAbortRequested: events.Event<(
      options: AbortRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when showing a configuration dialog for `fileSystemId` is requested. If it's handled, the `file_system_provider.configurable` manfiest option must be set to true.
     *
     * @since Chrome 44
     */
    export const onConfigureRequested: events.Event<(
      options: ConfigureRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when showing a dialog for mounting a new file system is requested. If the extension/app is a file handler, then this event shouldn't be handled. Instead `app.runtime.onLaunched` should be handled in order to mount new file systems when a file is opened. For multiple mounts, the `file_system_provider.multiple_mounts` manifest option must be set to true.
     *
     * @since Chrome 44
     */
    export const onMountRequested: events.Event<(
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when setting a new directory watcher is requested. If an error occurs, then `errorCallback` must be called.
     *
     * @since Chrome 45
     */
    export const onAddWatcherRequested: events.Event<(
      options: AddWatcherRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when the watcher should be removed. If an error occurs, then `errorCallback` must be called.
     *
     * @since Chrome 45
     */
    export const onRemoveWatcherRequested: events.Event<(
      options: RemoveWatcherRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Raised when executing an action for a set of files or directories is\\ requested. After the action is completed, `successCallback` must be called. On error, `errorCallback` must be called.
     *
     * @since Chrome 48
     */
    export const onExecuteActionRequested: events.Event<(
      options: ExecuteActionRequestedOptions,
      successCallback: () => void,
      errorCallback: (
        error: ProviderError,
      ) => void,
    ) => void>;

    /**
     * Mounts a file system with the given `fileSystemId` and `displayName`. `displayName` will be shown in the left panel of the Files app. `displayName` can contain any characters including '/', but cannot be an empty string. `displayName` must be descriptive but doesn't have to be unique. The `fileSystemId` must not be an empty string.
     *
     * Depending on the type of the file system being mounted, the `source` option must be set appropriately.
     *
     * In case of an error, {@link runtime.lastError} will be set with a corresponding error code.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function mount(

      options: MountOptions,
    ): Promise<void>;

    /**
     * Mounts a file system with the given `fileSystemId` and `displayName`. `displayName` will be shown in the left panel of the Files app. `displayName` can contain any characters including '/', but cannot be an empty string. `displayName` must be descriptive but doesn't have to be unique. The `fileSystemId` must not be an empty string.
     *
     * Depending on the type of the file system being mounted, the `source` option must be set appropriately.
     *
     * In case of an error, {@link runtime.lastError} will be set with a corresponding error code.
     *
     * @param callback A generic result callback to indicate success or failure.
     */
    export function mount(

      options: MountOptions,

      callback?: () => void,
    ): void;

    /**
     * Unmounts a file system with the given `fileSystemId`. It must be called after {@link onUnmountRequested} is invoked. Also, the providing extension can decide to perform unmounting if not requested (eg. in case of lost connection, or a file error).
     *
     * In case of an error, {@link runtime.lastError} will be set with a corresponding error code.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function unmount(

      options: UnmountOptions,
    ): Promise<void>;

    /**
     * Unmounts a file system with the given `fileSystemId`. It must be called after {@link onUnmountRequested} is invoked. Also, the providing extension can decide to perform unmounting if not requested (eg. in case of lost connection, or a file error).
     *
     * In case of an error, {@link runtime.lastError} will be set with a corresponding error code.
     *
     * @param callback A generic result callback to indicate success or failure.
     */
    export function unmount(

      options: UnmountOptions,

      callback?: () => void,
    ): void;

    /**
     * Returns all file systems mounted by the extension.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function getAll(): Promise<FileSystemInfo[]>;

    /**
     * Returns all file systems mounted by the extension.
     *
     * @param callback Callback to receive the result of {@link getAll} function.
     */
    export function getAll(

      callback?: (
        fileSystems: FileSystemInfo[],
      ) => void,
    ): void;

    /**
     * Returns information about a file system with the passed `fileSystemId`.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function get(

      fileSystemId: string,
    ): Promise<FileSystemInfo>;

    /**
     * Returns information about a file system with the passed `fileSystemId`.
     *
     * @param callback Callback to receive the result of {@link get} function.
     */
    export function get(

      fileSystemId: string,

      callback?: (
        fileSystem: FileSystemInfo,
      ) => void,
    ): void;

    /**
     * Notifies about changes in the watched directory at `observedPath` in `recursive` mode. If the file system is mounted with `supportsNotifyTag`, then `tag` must be provided, and all changes since the last notification always reported, even if the system was shutdown. The last tag can be obtained with {@link getAll}.
     *
     * To use, the `file_system_provider.notify` manifest option must be set to true.
     *
     * Value of `tag` can be any string which is unique per call, so it's possible to identify the last registered notification. Eg. if the providing extension starts after a reboot, and the last registered notification's tag is equal to "123", then it should call {@link notify} for all changes which happened since the change tagged as "123". It cannot be an empty string.
     *
     * Not all providers are able to provide a tag, but if the file system has a changelog, then the tag can be eg. a change number, or a revision number.
     *
     * Note that if a parent directory is removed, then all descendant entries are also removed, and if they are watched, then the API must be notified about the fact. Also, if a directory is renamed, then all descendant entries are in fact removed, as there is no entry under their original paths anymore.
     *
     * In case of an error, {@link runtime.lastError} will be set will a corresponding error code.
     *
     * @chrome-returns-extra since Chrome 96
     * @since Chrome 45
     */
    export function notify(

      options: NotifyOptions,
    ): Promise<void>;

    /**
     * Notifies about changes in the watched directory at `observedPath` in `recursive` mode. If the file system is mounted with `supportsNotifyTag`, then `tag` must be provided, and all changes since the last notification always reported, even if the system was shutdown. The last tag can be obtained with {@link getAll}.
     *
     * To use, the `file_system_provider.notify` manifest option must be set to true.
     *
     * Value of `tag` can be any string which is unique per call, so it's possible to identify the last registered notification. Eg. if the providing extension starts after a reboot, and the last registered notification's tag is equal to "123", then it should call {@link notify} for all changes which happened since the change tagged as "123". It cannot be an empty string.
     *
     * Not all providers are able to provide a tag, but if the file system has a changelog, then the tag can be eg. a change number, or a revision number.
     *
     * Note that if a parent directory is removed, then all descendant entries are also removed, and if they are watched, then the API must be notified about the fact. Also, if a directory is renamed, then all descendant entries are in fact removed, as there is no entry under their original paths anymore.
     *
     * In case of an error, {@link runtime.lastError} will be set will a corresponding error code.
     *
     * @param callback A generic result callback to indicate success or failure.
     * @since Chrome 45
     */
    export function notify(

      options: NotifyOptions,

      callback?: () => void,
    ): void;
  }

  /**
   * Use the `chrome.fontSettings` API to manage Chrome's font settings.
   *
   * @chrome-permission fontSettings
   */
  export namespace fontSettings {

    /**
     * Represents a font name.
     */
    export interface FontName {

      /**
       * The font ID.
       */
      fontId: string;

      /**
       * The display name of the font.
       */
      displayName: string;
    }

    /**
     * An ISO 15924 script code. The default, or global, script is represented by script code "Zyyy".
     */
    export type ScriptCode = "Afak" | "Arab" | "Armi" | "Armn" | "Avst" | "Bali" | "Bamu" | "Bass" | "Batk" | "Beng" | "Blis" | "Bopo" | "Brah" | "Brai" | "Bugi" | "Buhd" | "Cakm" | "Cans" | "Cari" | "Cham" | "Cher" | "Cirt" | "Copt" | "Cprt" | "Cyrl" | "Cyrs" | "Deva" | "Dsrt" | "Dupl" | "Egyd" | "Egyh" | "Egyp" | "Elba" | "Ethi" | "Geor" | "Geok" | "Glag" | "Goth" | "Gran" | "Grek" | "Gujr" | "Guru" | "Hang" | "Hani" | "Hano" | "Hans" | "Hant" | "Hebr" | "Hluw" | "Hmng" | "Hung" | "Inds" | "Ital" | "Java" | "Jpan" | "Jurc" | "Kali" | "Khar" | "Khmr" | "Khoj" | "Knda" | "Kpel" | "Kthi" | "Lana" | "Laoo" | "Latf" | "Latg" | "Latn" | "Lepc" | "Limb" | "Lina" | "Linb" | "Lisu" | "Loma" | "Lyci" | "Lydi" | "Mand" | "Mani" | "Maya" | "Mend" | "Merc" | "Mero" | "Mlym" | "Moon" | "Mong" | "Mroo" | "Mtei" | "Mymr" | "Narb" | "Nbat" | "Nkgb" | "Nkoo" | "Nshu" | "Ogam" | "Olck" | "Orkh" | "Orya" | "Osma" | "Palm" | "Perm" | "Phag" | "Phli" | "Phlp" | "Phlv" | "Phnx" | "Plrd" | "Prti" | "Rjng" | "Roro" | "Runr" | "Samr" | "Sara" | "Sarb" | "Saur" | "Sgnw" | "Shaw" | "Shrd" | "Sind" | "Sinh" | "Sora" | "Sund" | "Sylo" | "Syrc" | "Syre" | "Syrj" | "Syrn" | "Tagb" | "Takr" | "Tale" | "Talu" | "Taml" | "Tang" | "Tavt" | "Telu" | "Teng" | "Tfng" | "Tglg" | "Thaa" | "Thai" | "Tibt" | "Tirh" | "Ugar" | "Vaii" | "Visp" | "Wara" | "Wole" | "Xpeo" | "Xsux" | "Yiii" | "Zmth" | "Zsym" | "Zyyy";

    /**
     * A CSS generic font family.
     */
    export type GenericFamily = "standard" | "sansserif" | "serif" | "fixed" | "cursive" | "fantasy" | "math";

    /**
     * One of
     * `not\_controllable`: cannot be controlled by any extension
     * `controlled\_by\_other\_extensions`: controlled by extensions with higher precedence
     * `controllable\_by\_this\_extension`: can be controlled by this extension
     * `controlled\_by\_this\_extension`: controlled by this extension
     */
    export type LevelOfControl = "not_controllable" | "controlled_by_other_extensions" | "controllable_by_this_extension" | "controlled_by_this_extension";

    /**
     * Fired when a font setting changes.
     */
    export const onFontChanged: events.Event<(
      details: {

        /**
         * The font ID. See the description in `getFont`.
         */
        fontId: string,

        /**
         * The script code for which the font setting has changed.
         */
        script?: ScriptCode,

        /**
         * The generic font family for which the font setting has changed.
         */
        genericFamily: GenericFamily,

        /**
         * The level of control this extension has over the setting.
         */
        levelOfControl: LevelOfControl,
      },
    ) => void>;

    /**
     * Fired when the default font size setting changes.
     */
    export const onDefaultFontSizeChanged: events.Event<(
      details: {

        /**
         * The font size in pixels.
         */
        pixelSize: number,

        /**
         * The level of control this extension has over the setting.
         */
        levelOfControl: LevelOfControl,
      },
    ) => void>;

    /**
     * Fired when the default fixed font size setting changes.
     */
    export const onDefaultFixedFontSizeChanged: events.Event<(
      details: {

        /**
         * The font size in pixels.
         */
        pixelSize: number,

        /**
         * The level of control this extension has over the setting.
         */
        levelOfControl: LevelOfControl,
      },
    ) => void>;

    /**
     * Fired when the minimum font size setting changes.
     */
    export const onMinimumFontSizeChanged: events.Event<(
      details: {

        /**
         * The font size in pixels.
         */
        pixelSize: number,

        /**
         * The level of control this extension has over the setting.
         */
        levelOfControl: LevelOfControl,
      },
    ) => void>;

    /**
     * Clears the font set by this extension, if any.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function clearFont(

      details: {

        /**
         * The script for which the font should be cleared. If omitted, the global script font setting is cleared.
         */
        script?: ScriptCode,

        /**
         * The generic font family for which the font should be cleared.
         */
        genericFamily: GenericFamily,
      },
    ): Promise<void>;

    /**
     * Clears the font set by this extension, if any.
     */
    export function clearFont(

      details: {

        /**
         * The script for which the font should be cleared. If omitted, the global script font setting is cleared.
         */
        script?: ScriptCode,

        /**
         * The generic font family for which the font should be cleared.
         */
        genericFamily: GenericFamily,
      },

      callback?: () => void,
    ): void;

    /**
     * Gets the font for a given script and generic font family.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function getFont(

      details: {

        /**
         * The script for which the font should be retrieved. If omitted, the font setting for the global script (script code "Zyyy") is retrieved.
         */
        script?: ScriptCode,

        /**
         * The generic font family for which the font should be retrieved.
         */
        genericFamily: GenericFamily,
      },
    ): Promise<{

      /**
       * The font ID. Rather than the literal font ID preference value, this may be the ID of the font that the system resolves the preference value to. So, `fontId` can differ from the font passed to `setFont`, if, for example, the font is not available on the system. The empty string signifies fallback to the global script font setting.
       */
      fontId: string,

      /**
       * The level of control this extension has over the setting.
       */
      levelOfControl: LevelOfControl,
    }>;

    /**
     * Gets the font for a given script and generic font family.
     */
    export function getFont(

      details: {

        /**
         * The script for which the font should be retrieved. If omitted, the font setting for the global script (script code "Zyyy") is retrieved.
         */
        script?: ScriptCode,

        /**
         * The generic font family for which the font should be retrieved.
         */
        genericFamily: GenericFamily,
      },

      callback?: (
        details: {

          /**
           * The font ID. Rather than the literal font ID preference value, this may be the ID of the font that the system resolves the preference value to. So, `fontId` can differ from the font passed to `setFont`, if, for example, the font is not available on the system. The empty string signifies fallback to the global script font setting.
           */
          fontId: string,

          /**
           * The level of control this extension has over the setting.
           */
          levelOfControl: LevelOfControl,
        },
      ) => void,
    ): void;

    /**
     * Sets the font for a given script and generic font family.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function setFont(

      details: {

        /**
         * The script code which the font should be set. If omitted, the font setting for the global script (script code "Zyyy") is set.
         */
        script?: ScriptCode,

        /**
         * The generic font family for which the font should be set.
         */
        genericFamily: GenericFamily,

        /**
         * The font ID. The empty string means to fallback to the global script font setting.
         */
        fontId: string,
      },
    ): Promise<void>;

    /**
     * Sets the font for a given script and generic font family.
     */
    export function setFont(

      details: {

        /**
         * The script code which the font should be set. If omitted, the font setting for the global script (script code "Zyyy") is set.
         */
        script?: ScriptCode,

        /**
         * The generic font family for which the font should be set.
         */
        genericFamily: GenericFamily,

        /**
         * The font ID. The empty string means to fallback to the global script font setting.
         */
        fontId: string,
      },

      callback?: () => void,
    ): void;

    /**
     * Gets a list of fonts on the system.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function getFontList(): Promise<FontName[]>;

    /**
     * Gets a list of fonts on the system.
     */
    export function getFontList(

      callback?: (
        results: FontName[],
      ) => void,
    ): void;

    /**
     * Clears the default font size set by this extension, if any.
     *
     * @chrome-returns-extra since Chrome 96
     * @param details This parameter is currently unused.
     */
    export function clearDefaultFontSize(

      details?: {},
    ): Promise<void>;

    /**
     * Clears the default font size set by this extension, if any.
     *
     * @param details This parameter is currently unused.
     */
    export function clearDefaultFontSize(

      details?: {},

      callback?: () => void,
    ): void;

    /**
     * Gets the default font size.
     *
     * @chrome-returns-extra since Chrome 96
     * @param details This parameter is currently unused.
     */
    export function getDefaultFontSize(

      details?: {},
    ): Promise<{

      /**
       * The font size in pixels.
       */
      pixelSize: number,

      /**
       * The level of control this extension has over the setting.
       */
      levelOfControl: LevelOfControl,
    }>;

    /**
     * Gets the default font size.
     *
     * @param details This parameter is currently unused.
     */
    export function getDefaultFontSize(

      details?: {},

      callback?: (
        details: {

          /**
           * The font size in pixels.
           */
          pixelSize: number,

          /**
           * The level of control this extension has over the setting.
           */
          levelOfControl: LevelOfControl,
        },
      ) => void,
    ): void;

    /**
     * Sets the default font size.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function setDefaultFontSize(

      details: {

        /**
         * The font size in pixels.
         */
        pixelSize: number,
      },
    ): Promise<void>;

    /**
     * Sets the default font size.
     */
    export function setDefaultFontSize(

      details: {

        /**
         * The font size in pixels.
         */
        pixelSize: number,
      },

      callback?: () => void,
    ): void;

    /**
     * Clears the default fixed font size set by this extension, if any.
     *
     * @chrome-returns-extra since Chrome 96
     * @param details This parameter is currently unused.
     */
    export function clearDefaultFixedFontSize(

      details?: {},
    ): Promise<void>;

    /**
     * Clears the default fixed font size set by this extension, if any.
     *
     * @param details This parameter is currently unused.
     */
    export function clearDefaultFixedFontSize(

      details?: {},

      callback?: () => void,
    ): void;

    /**
     * Gets the default size for fixed width fonts.
     *
     * @chrome-returns-extra since Chrome 96
     * @param details This parameter is currently unused.
     */
    export function getDefaultFixedFontSize(

      details?: {},
    ): Promise<{

      /**
       * The font size in pixels.
       */
      pixelSize: number,

      /**
       * The level of control this extension has over the setting.
       */
      levelOfControl: LevelOfControl,
    }>;

    /**
     * Gets the default size for fixed width fonts.
     *
     * @param details This parameter is currently unused.
     */
    export function getDefaultFixedFontSize(

      details?: {},

      callback?: (
        details: {

          /**
           * The font size in pixels.
           */
          pixelSize: number,

          /**
           * The level of control this extension has over the setting.
           */
          levelOfControl: LevelOfControl,
        },
      ) => void,
    ): void;

    /**
     * Sets the default size for fixed width fonts.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function setDefaultFixedFontSize(

      details: {

        /**
         * The font size in pixels.
         */
        pixelSize: number,
      },
    ): Promise<void>;

    /**
     * Sets the default size for fixed width fonts.
     */
    export function setDefaultFixedFontSize(

      details: {

        /**
         * The font size in pixels.
         */
        pixelSize: number,
      },

      callback?: () => void,
    ): void;

    /**
     * Clears the minimum font size set by this extension, if any.
     *
     * @chrome-returns-extra since Chrome 96
     * @param details This parameter is currently unused.
     */
    export function clearMinimumFontSize(

      details?: {},
    ): Promise<void>;

    /**
     * Clears the minimum font size set by this extension, if any.
     *
     * @param details This parameter is currently unused.
     */
    export function clearMinimumFontSize(

      details?: {},

      callback?: () => void,
    ): void;

    /**
     * Gets the minimum font size.
     *
     * @chrome-returns-extra since Chrome 96
     * @param details This parameter is currently unused.
     */
    export function getMinimumFontSize(

      details?: {},
    ): Promise<{

      /**
       * The font size in pixels.
       */
      pixelSize: number,

      /**
       * The level of control this extension has over the setting.
       */
      levelOfControl: LevelOfControl,
    }>;

    /**
     * Gets the minimum font size.
     *
     * @param details This parameter is currently unused.
     */
    export function getMinimumFontSize(

      details?: {},

      callback?: (
        details: {

          /**
           * The font size in pixels.
           */
          pixelSize: number,

          /**
           * The level of control this extension has over the setting.
           */
          levelOfControl: LevelOfControl,
        },
      ) => void,
    ): void;

    /**
     * Sets the minimum font size.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function setMinimumFontSize(

      details: {

        /**
         * The font size in pixels.
         */
        pixelSize: number,
      },
    ): Promise<void>;

    /**
     * Sets the minimum font size.
     */
    export function setMinimumFontSize(

      details: {

        /**
         * The font size in pixels.
         */
        pixelSize: number,
      },

      callback?: () => void,
    ): void;
  }

  /**
   * Use `chrome.gcm` to enable apps and extensions to send and receive messages through [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/) (FCM).
   *
   * @chrome-permission gcm
   */
  export namespace gcm {

    /**
     * The maximum size (in bytes) of all key/value pairs in a message.
     */
    export const MAX_MESSAGE_SIZE: 4096;

    /**
     * Fired when a message is received through FCM.
     */
    export const onMessage: events.Event<(
      message: {

        /**
         * The message data.
         */
        data: {[name: string]: string},

        /**
         * The sender who issued the message.
         */
        from?: string,

        /**
         * The collapse key of a message. See the [Non-collapsible and collapsible messages](https://firebase.google.com/docs/cloud-messaging/concept-options#collapsible_and_non-collapsible_messages) for details.
         */
        collapseKey?: string,
      },
    ) => void>;

    /**
     * Fired when a FCM server had to delete messages sent by an app server to the application. See [Lifetime of a message](https://firebase.google.com/docs/cloud-messaging/concept-options#lifetime) for details on handling this event.
     */
    export const onMessagesDeleted: events.Event<() => void>;

    /**
     * Fired when it was not possible to send a message to the FCM server.
     */
    export const onSendError: events.Event<(
      error: {

        /**
         * The error message describing the problem.
         */
        errorMessage: string,

        /**
         * The ID of the message with this error, if error is related to a specific message.
         */
        messageId?: string,

        /**
         * Additional details related to the error, when available.
         */
        details: {[name: string]: string},
      },
    ) => void>;

    /**
     * Registers the application with FCM. The registration ID will be returned by the `callback`. If `register` is called again with the same list of `senderIds`, the same registration ID will be returned.
     *
     * @chrome-returns-extra since Chrome 116
     * @param senderIds A list of server IDs that are allowed to send messages to the application. It should contain at least one and no more than 100 sender IDs.
     */
    export function register(

      senderIds: string[],
    ): Promise<string>;

    /**
     * Registers the application with FCM. The registration ID will be returned by the `callback`. If `register` is called again with the same list of `senderIds`, the same registration ID will be returned.
     *
     * @param senderIds A list of server IDs that are allowed to send messages to the application. It should contain at least one and no more than 100 sender IDs.
     * @param callback Function called when registration completes. It should check {@link runtime.lastError} for error when `registrationId` is empty.
     */
    export function register(

      senderIds: string[],

      /**
       * @param registrationId A registration ID assigned to the application by the FCM.
       */
      callback?: (
        registrationId: string,
      ) => void,
    ): void;

    /**
     * Unregisters the application from FCM.
     *
     * @chrome-returns-extra since Chrome 116
     */
    export function unregister(): Promise<void>;

    /**
     * Unregisters the application from FCM.
     *
     * @param callback A function called after the unregistration completes. Unregistration was successful if {@link runtime.lastError} is not set.
     */
    export function unregister(

      callback?: () => void,
    ): void;

    /**
     * Sends a message according to its contents.
     *
     * @chrome-returns-extra since Chrome 116
     * @param message A message to send to the other party via FCM.
     */
    export function send(

      message: {

        /**
         * The ID of the server to send the message to as assigned by [Google API Console](https://console.cloud.google.com/apis/dashboard).
         */
        destinationId: string,

        /**
         * The ID of the message. It must be unique for each message in scope of the applications. See the [Cloud Messaging documentation](https://firebase.google.com/docs/cloud-messaging/js/client) for advice for picking and handling an ID.
         */
        messageId: string,

        /**
         * Time-to-live of the message in seconds. If it is not possible to send the message within that time, an onSendError event will be raised. A time-to-live of 0 indicates that the message should be sent immediately or fail if it's not possible. The default value of time-to-live is 86,400 seconds (1 day) and the maximum value is 2,419,200 seconds (28 days).
         */
        timeToLive?: number,

        /**
         * Message data to send to the server. Case-insensitive `goog.` and `google`, as well as case-sensitive `collapse_key` are disallowed as key prefixes. Sum of all key/value pairs should not exceed {@link gcm.MAX_MESSAGE_SIZE}.
         */
        data: {[name: string]: string},
      },
    ): Promise<string>;

    /**
     * Sends a message according to its contents.
     *
     * @param message A message to send to the other party via FCM.
     * @param callback A function called after the message is successfully queued for sending. {@link runtime.lastError} should be checked, to ensure a message was sent without problems.
     */
    export function send(

      message: {

        /**
         * The ID of the server to send the message to as assigned by [Google API Console](https://console.cloud.google.com/apis/dashboard).
         */
        destinationId: string,

        /**
         * The ID of the message. It must be unique for each message in scope of the applications. See the [Cloud Messaging documentation](https://firebase.google.com/docs/cloud-messaging/js/client) for advice for picking and handling an ID.
         */
        messageId: string,

        /**
         * Time-to-live of the message in seconds. If it is not possible to send the message within that time, an onSendError event will be raised. A time-to-live of 0 indicates that the message should be sent immediately or fail if it's not possible. The default value of time-to-live is 86,400 seconds (1 day) and the maximum value is 2,419,200 seconds (28 days).
         */
        timeToLive?: number,

        /**
         * Message data to send to the server. Case-insensitive `goog.` and `google`, as well as case-sensitive `collapse_key` are disallowed as key prefixes. Sum of all key/value pairs should not exceed {@link gcm.MAX_MESSAGE_SIZE}.
         */
        data: {[name: string]: string},
      },

      /**
       * @param messageId The ID of the message that the callback was issued for.
       */
      callback?: (
        messageId: string,
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.history` API to interact with the browser's record of visited pages. You can add, remove, and query for URLs in the browser's history. To override the history page with your own version, see [Override Pages](https://developer.chrome.com/extensions/develop/ui/override-chrome-pages).
   *
   * @chrome-permission history
   */
  export namespace history {

    /**
     * The [transition type](https://developer.chrome.com/docs/extensions/reference/history/#transition_types) for this visit from its referrer.
     *
     * @since Chrome 44
     */
    export type TransitionType = "link" | "typed" | "auto_bookmark" | "auto_subframe" | "manual_subframe" | "generated" | "auto_toplevel" | "form_submit" | "reload" | "keyword" | "keyword_generated";

    /**
     * An object encapsulating one result of a history query.
     */
    export interface HistoryItem {

      /**
       * The unique identifier for the item.
       */
      id: string;

      /**
       * The URL navigated to by a user.
       */
      url?: string;

      /**
       * The title of the page when it was last loaded.
       */
      title?: string;

      /**
       * When this page was last loaded, represented in milliseconds since the epoch.
       */
      lastVisitTime?: number;

      /**
       * The number of times the user has navigated to this page.
       */
      visitCount?: number;

      /**
       * The number of times the user has navigated to this page by typing in the address.
       */
      typedCount?: number;
    }

    /**
     * An object encapsulating one visit to a URL.
     */
    export interface VisitItem {

      /**
       * The unique identifier for the corresponding {@link history.HistoryItem}.
       */
      id: string;

      /**
       * The unique identifier for this visit.
       */
      visitId: string;

      /**
       * When this visit occurred, represented in milliseconds since the epoch.
       */
      visitTime?: number;

      /**
       * The visit ID of the referrer.
       */
      referringVisitId: string;

      /**
       * The [transition type](https://developer.chrome.com/docs/extensions/reference/history/#transition_types) for this visit from its referrer.
       */
      transition: TransitionType;

      /**
       * True if the visit originated on this device. False if it was synced from a different device.
       *
       * @since Chrome 115
       */
      isLocal: boolean;
    }

    /**
     * @since Chrome 88
     */
    export interface UrlDetails {

      /**
       * The URL for the operation. It must be in the format as returned from a call to history.search.
       */
      url: string;
    }

    /**
     * Fired when a URL is visited, providing the HistoryItem data for that URL. This event fires before the page has loaded.
     */
    export const onVisited: events.Event<(
      result: HistoryItem,
    ) => void>;

    /**
     * Fired when one or more URLs are removed from the history service. When all visits have been removed the URL is purged from history.
     */
    export const onVisitRemoved: events.Event<(
      removed: {

        /**
         * True if all history was removed. If true, then urls will be empty.
         */
        allHistory: boolean,

        urls?: string[],
      },
    ) => void>;

    /**
     * Searches the history for the last visit time of each page matching the query.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function search(

      query: {

        /**
         * A free-text query to the history service. Leave empty to retrieve all pages.
         */
        text: string,

        /**
         * Limit results to those visited after this date, represented in milliseconds since the epoch. If not specified, this defaults to 24 hours in the past.
         */
        startTime?: number,

        /**
         * Limit results to those visited before this date, represented in milliseconds since the epoch.
         */
        endTime?: number,

        /**
         * The maximum number of results to retrieve. Defaults to 100.
         */
        maxResults?: number,
      },
    ): Promise<HistoryItem[]>;

    /**
     * Searches the history for the last visit time of each page matching the query.
     */
    export function search(

      query: {

        /**
         * A free-text query to the history service. Leave empty to retrieve all pages.
         */
        text: string,

        /**
         * Limit results to those visited after this date, represented in milliseconds since the epoch. If not specified, this defaults to 24 hours in the past.
         */
        startTime?: number,

        /**
         * Limit results to those visited before this date, represented in milliseconds since the epoch.
         */
        endTime?: number,

        /**
         * The maximum number of results to retrieve. Defaults to 100.
         */
        maxResults?: number,
      },

      callback?: (
        results: HistoryItem[],
      ) => void,
    ): void;

    /**
     * Retrieves information about visits to a URL.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function getVisits(

      details: UrlDetails,
    ): Promise<VisitItem[]>;

    /**
     * Retrieves information about visits to a URL.
     */
    export function getVisits(

      details: UrlDetails,

      callback?: (
        results: VisitItem[],
      ) => void,
    ): void;

    /**
     * Adds a URL to the history at the current time with a [transition type](https://developer.chrome.com/docs/extensions/reference/history/#transition_types) of "link".
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function addUrl(

      details: UrlDetails,
    ): Promise<void>;

    /**
     * Adds a URL to the history at the current time with a [transition type](https://developer.chrome.com/docs/extensions/reference/history/#transition_types) of "link".
     */
    export function addUrl(

      details: UrlDetails,

      callback?: () => void,
    ): void;

    /**
     * Removes all occurrences of the given URL from the history.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function deleteUrl(

      details: UrlDetails,
    ): Promise<void>;

    /**
     * Removes all occurrences of the given URL from the history.
     */
    export function deleteUrl(

      details: UrlDetails,

      callback?: () => void,
    ): void;

    /**
     * Removes all items within the specified date range from the history. Pages will not be removed from the history unless all visits fall within the range.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function deleteRange(

      range: {

        /**
         * Items added to history after this date, represented in milliseconds since the epoch.
         */
        startTime: number,

        /**
         * Items added to history before this date, represented in milliseconds since the epoch.
         */
        endTime: number,
      },
    ): Promise<void>;

    /**
     * Removes all items within the specified date range from the history. Pages will not be removed from the history unless all visits fall within the range.
     */
    export function deleteRange(

      range: {

        /**
         * Items added to history after this date, represented in milliseconds since the epoch.
         */
        startTime: number,

        /**
         * Items added to history before this date, represented in milliseconds since the epoch.
         */
        endTime: number,
      },

      callback?: () => void,
    ): void;

    /**
     * Deletes all items from the history.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function deleteAll(): Promise<void>;

    /**
     * Deletes all items from the history.
     */
    export function deleteAll(

      callback?: () => void,
    ): void;
  }

  /**
   * Use the `chrome.i18n` infrastructure to implement internationalization across your whole app or extension.
   */
  export namespace i18n {

    /**
     * An ISO language code such as `en` or `fr`. For a complete list of languages supported by this method, see [kLanguageInfoTable](https://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc). For an unknown language, `und` will be returned, which means that \[percentage\] of the text is unknown to CLD
     *
     * @since Chrome 47
     */
    export type LanguageCode = string;

    /**
     * Gets the accept-languages of the browser. This is different from the locale used by the browser; to get the locale, use {@link i18n.getUILanguage}.
     *
     * @chrome-returns-extra since Chrome 99
     */
    export function getAcceptLanguages(): Promise<LanguageCode[]>;

    /**
     * Gets the accept-languages of the browser. This is different from the locale used by the browser; to get the locale, use {@link i18n.getUILanguage}.
     */
    export function getAcceptLanguages(

      /**
       * @param languages Array of LanguageCode
       */
      callback?: (
        languages: LanguageCode[],
      ) => void,
    ): void;

    /**
     * Gets the localized string for the specified message. If the message is missing, this method returns an empty string (''). If the format of the `getMessage()` call is wrong — for example, _messageName_ is not a string or the _substitutions_ array has more than 9 elements — this method returns `undefined`.
     *
     * @param messageName The name of the message, as specified in the [`messages.json`](https://developer.chrome.com/extensions/how-to/ui/localization-message-formats) file.
     * @param substitutions Up to 9 substitution strings, if the message requires any.
     * @returns Message localized for current locale.
     */
    export function getMessage(

      messageName: string,

      substitutions?: any,

      /**
       * @since Chrome 79
       */
      options?: {

        /**
         * Escape `<` in translation to `&lt;`. This applies only to the message itself, not to the placeholders. Developers might want to use this if the translation is used in an HTML context. Closure Templates used with Closure Compiler generate this automatically.
         */
        escapeLt?: boolean,
      },
    ): string;

    /**
     * Gets the browser UI language of the browser. This is different from {@link i18n.getAcceptLanguages} which returns the preferred user languages.
     *
     * @returns The browser UI language code such as en-US or fr-FR.
     */
    export function getUILanguage(): string;

    /**
     * Detects the language of the provided text using CLD.
     *
     * @chrome-returns-extra since Chrome 99
     * @param text User input string to be translated.
     * @since Chrome 47
     */
    export function detectLanguage(

      text: string,
    ): Promise<{

      /**
       * CLD detected language reliability
       */
      isReliable: boolean,

      /**
       * array of detectedLanguage
       */
      languages: {

        language: LanguageCode,

        /**
         * The percentage of the detected language
         */
        percentage: number,
      }[],
    }>;

    /**
     * Detects the language of the provided text using CLD.
     *
     * @param text User input string to be translated.
     * @since Chrome 47
     */
    export function detectLanguage(

      text: string,

      /**
       * @param result LanguageDetectionResult object that holds detected langugae reliability and array of DetectedLanguage
       */
      callback?: (
        result: {

          /**
           * CLD detected language reliability
           */
          isReliable: boolean,

          /**
           * array of detectedLanguage
           */
          languages: {

            language: LanguageCode,

            /**
             * The percentage of the detected language
             */
            percentage: number,
          }[],
        },
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.identity` API to get OAuth2 access tokens.
   *
   * @chrome-permission identity
   */
  export namespace identity {

    export interface AccountInfo {

      /**
       * A unique identifier for the account. This ID will not change for the lifetime of the account.
       */
      id: string;
    }

    /**
     * @chrome-enum "SYNC" Specifies that Sync is enabled for the primary account.
     * @chrome-enum "ANY" Specifies the existence of a primary account, if any.
     * @since Chrome 84
     */
    export type AccountStatus = "SYNC" | "ANY";

    /**
     * @since Chrome 84
     */
    export interface ProfileDetails {

      /**
       * A status of the primary account signed into a profile whose `ProfileUserInfo` should be returned. Defaults to `SYNC` account status.
       */
      accountStatus?: AccountStatus;
    }

    export interface ProfileUserInfo {

      /**
       * An email address for the user account signed into the current profile. Empty if the user is not signed in or the `identity.email` manifest permission is not specified.
       */
      email: string;

      /**
       * A unique identifier for the account. This ID will not change for the lifetime of the account. Empty if the user is not signed in or (in M41+) the `identity.email` manifest permission is not specified.
       */
      id: string;
    }

    export interface TokenDetails {

      /**
       * Fetching a token may require the user to sign-in to Chrome, or approve the application's requested scopes. If the interactive flag is `true`, `getAuthToken` will prompt the user as necessary. When the flag is `false` or omitted, `getAuthToken` will return failure any time a prompt would be required.
       */
      interactive?: boolean;

      /**
       * The account ID whose token should be returned. If not specified, the function will use an account from the Chrome profile: the Sync account if there is one, or otherwise the first Google web account.
       */
      account?: AccountInfo;

      /**
       * A list of OAuth2 scopes to request.
       *
       * When the `scopes` field is present, it overrides the list of scopes specified in manifest.json.
       */
      scopes?: string[];

      /**
       * The `enableGranularPermissions` flag allows extensions to opt-in early to the granular permissions consent screen, in which requested permissions are granted or denied individually.
       *
       * @since Chrome 87
       */
      enableGranularPermissions?: boolean;
    }

    export interface InvalidTokenDetails {

      /**
       * The specific token that should be removed from the cache.
       */
      token: string;
    }

    export interface WebAuthFlowDetails {

      /**
       * The URL that initiates the auth flow.
       */
      url: string;

      /**
       * Whether to launch auth flow in interactive mode.
       *
       * Since some auth flows may immediately redirect to a result URL, `launchWebAuthFlow` hides its web view until the first navigation either redirects to the final URL, or finishes loading a page meant to be displayed.
       *
       * If the `interactive` flag is `true`, the window will be displayed when a page load completes. If the flag is `false` or omitted, `launchWebAuthFlow` will return with an error if the initial navigation does not complete the flow.
       *
       * For flows that use JavaScript for redirection, `abortOnLoadForNonInteractive` can be set to `false` in combination with setting `timeoutMsForNonInteractive` to give the page a chance to perform any redirects.
       */
      interactive?: boolean;

      /**
       * Whether to terminate `launchWebAuthFlow` for non-interactive requests after the page loads. This parameter does not affect interactive flows.
       *
       * When set to `true` (default) the flow will terminate immediately after the page loads. When set to `false`, the flow will only terminate after the `timeoutMsForNonInteractive` passes. This is useful for identity providers that use JavaScript to perform redirections after the page loads.
       *
       * @since Chrome 113
       */
      abortOnLoadForNonInteractive?: boolean;

      /**
       * The maximum amount of time, in miliseconds, `launchWebAuthFlow` is allowed to run in non-interactive mode in total. Only has an effect if `interactive` is `false`.
       *
       * @since Chrome 113
       */
      timeoutMsForNonInteractive?: number;
    }

    /**
     * @since Chrome 105
     */
    export interface GetAuthTokenResult {

      /**
       * The specific token associated with the request.
       */
      token?: string;

      /**
       * A list of OAuth2 scopes granted to the extension.
       */
      grantedScopes?: string[];
    }

    /**
     * Fired when signin state changes for an account on the user's profile.
     */
    export const onSignInChanged: events.Event<(
      account: AccountInfo,
      signedIn: boolean,
    ) => void>;

    /**
     * Retrieves a list of AccountInfo objects describing the accounts present on the profile.
     *
     * `getAccounts` is only supported on dev channel.
     *
     * @alpha
     * @chrome-channel dev
     */
    export function getAccounts(): Promise<AccountInfo[]>;

    /**
     * Retrieves a list of AccountInfo objects describing the accounts present on the profile.
     *
     * `getAccounts` is only supported on dev channel.
     *
     * @alpha
     * @chrome-channel dev
     */
    export function getAccounts(

      callback?: (
        accounts: AccountInfo[],
      ) => void,
    ): void;

    /**
     * Gets an OAuth2 access token using the client ID and scopes specified in the [`oauth2` section of manifest.json](https://developer.chrome.com/docs/apps/app_identity#update_manifest).
     *
     * The Identity API caches access tokens in memory, so it's ok to call `getAuthToken` non-interactively any time a token is required. The token cache automatically handles expiration.
     *
     * For a good user experience it is important interactive token requests are initiated by UI in your app explaining what the authorization is for. Failing to do this will cause your users to get authorization requests, or Chrome sign in screens if they are not signed in, with with no context. In particular, do not use `getAuthToken` interactively when your app is first launched.
     *
     * Note: When called with a callback, instead of returning an object this function will return the two properties as separate arguments passed to the callback.
     *
     * @chrome-returns-extra since Chrome 105
     * @param details Token options.
     */
    export function getAuthToken(

      details?: TokenDetails,
    ): Promise<GetAuthTokenResult>;

    /**
     * Gets an OAuth2 access token using the client ID and scopes specified in the [`oauth2` section of manifest.json](https://developer.chrome.com/docs/apps/app_identity#update_manifest).
     *
     * The Identity API caches access tokens in memory, so it's ok to call `getAuthToken` non-interactively any time a token is required. The token cache automatically handles expiration.
     *
     * For a good user experience it is important interactive token requests are initiated by UI in your app explaining what the authorization is for. Failing to do this will cause your users to get authorization requests, or Chrome sign in screens if they are not signed in, with with no context. In particular, do not use `getAuthToken` interactively when your app is first launched.
     *
     * Note: When called with a callback, instead of returning an object this function will return the two properties as separate arguments passed to the callback.
     *
     * @param details Token options.
     * @param callback Called with an OAuth2 access token as specified by the manifest, or undefined if there was an error. The `grantedScopes` parameter is populated since Chrome 87. When available, this parameter contains the list of granted scopes corresponding with the returned token.
     */
    export function getAuthToken(

      details?: TokenDetails,

      callback?: (
        /**
         * @since Chrome 105
         */
        result: GetAuthTokenResult,
      ) => void,
    ): void;

    /**
     * Retrieves email address and obfuscated gaia id of the user signed into a profile.
     *
     * Requires the `identity.email` manifest permission. Otherwise, returns an empty result.
     *
     * This API is different from identity.getAccounts in two ways. The information returned is available offline, and it only applies to the primary account for the profile.
     *
     * @chrome-returns-extra since Chrome 106
     * @param details Profile options.
     */
    export function getProfileUserInfo(

      /**
       * @since Chrome 84
       */
      details?: ProfileDetails,
    ): Promise<ProfileUserInfo>;

    /**
     * Retrieves email address and obfuscated gaia id of the user signed into a profile.
     *
     * Requires the `identity.email` manifest permission. Otherwise, returns an empty result.
     *
     * This API is different from identity.getAccounts in two ways. The information returned is available offline, and it only applies to the primary account for the profile.
     *
     * @param details Profile options.
     * @param callback Called with the `ProfileUserInfo` of the primary Chrome account, of an empty `ProfileUserInfo` if the account with given `details` doesn't exist.
     */
    export function getProfileUserInfo(

      /**
       * @since Chrome 84
       */
      details?: ProfileDetails,

      callback?: (
        userInfo: ProfileUserInfo,
      ) => void,
    ): void;

    /**
     * Removes an OAuth2 access token from the Identity API's token cache.
     *
     * If an access token is discovered to be invalid, it should be passed to removeCachedAuthToken to remove it from the cache. The app may then retrieve a fresh token with `getAuthToken`.
     *
     * @chrome-returns-extra since Chrome 106
     * @param details Token information.
     */
    export function removeCachedAuthToken(

      details: InvalidTokenDetails,
    ): Promise<void>;

    /**
     * Removes an OAuth2 access token from the Identity API's token cache.
     *
     * If an access token is discovered to be invalid, it should be passed to removeCachedAuthToken to remove it from the cache. The app may then retrieve a fresh token with `getAuthToken`.
     *
     * @param details Token information.
     * @param callback Called when the token has been removed from the cache.
     */
    export function removeCachedAuthToken(

      details: InvalidTokenDetails,

      callback?: () => void,
    ): void;

    /**
     * Resets the state of the Identity API:
     *
     * *   Removes all OAuth2 access tokens from the token cache
     * *   Removes user's account preferences
     * *   De-authorizes the user from all auth flows
     *
     * @chrome-returns-extra since Chrome 106
     * @since Chrome 87
     */
    export function clearAllCachedAuthTokens(): Promise<void>;

    /**
     * Resets the state of the Identity API:
     *
     * *   Removes all OAuth2 access tokens from the token cache
     * *   Removes user's account preferences
     * *   De-authorizes the user from all auth flows
     *
     * @param callback Called when the state has been cleared.
     * @since Chrome 87
     */
    export function clearAllCachedAuthTokens(

      callback?: () => void,
    ): void;

    /**
     * Starts an auth flow at the specified URL.
     *
     * This method enables auth flows with non-Google identity providers by launching a web view and navigating it to the first URL in the provider's auth flow. When the provider redirects to a URL matching the pattern `https://<app-id>.chromiumapp.org/*`, the window will close, and the final redirect URL will be passed to the `callback` function.
     *
     * For a good user experience it is important interactive auth flows are initiated by UI in your app explaining what the authorization is for. Failing to do this will cause your users to get authorization requests with no context. In particular, do not launch an interactive auth flow when your app is first launched.
     *
     * @chrome-returns-extra since Chrome 106
     * @param details WebAuth flow options.
     */
    export function launchWebAuthFlow(

      details: WebAuthFlowDetails,
    ): Promise<string | undefined>;

    /**
     * Starts an auth flow at the specified URL.
     *
     * This method enables auth flows with non-Google identity providers by launching a web view and navigating it to the first URL in the provider's auth flow. When the provider redirects to a URL matching the pattern `https://<app-id>.chromiumapp.org/*`, the window will close, and the final redirect URL will be passed to the `callback` function.
     *
     * For a good user experience it is important interactive auth flows are initiated by UI in your app explaining what the authorization is for. Failing to do this will cause your users to get authorization requests with no context. In particular, do not launch an interactive auth flow when your app is first launched.
     *
     * @param details WebAuth flow options.
     * @param callback Called with the URL redirected back to your application.
     */
    export function launchWebAuthFlow(

      details: WebAuthFlowDetails,

      callback?: (
        responseUrl?: string,
      ) => void,
    ): void;

    /**
     * Generates a redirect URL to be used in `launchWebAuthFlow`.
     *
     * The generated URLs match the pattern `https://<app-id>.chromiumapp.org/*`.
     *
     * @param path The path appended to the end of the generated URL.
     */
    export function getRedirectURL(

      path?: string,
    ): string;
  }

  /**
   * Use the `chrome.idle` API to detect when the machine's idle state changes.
   *
   * @chrome-permission idle
   */
  export namespace idle {

    /**
     * @since Chrome 44
     */
    export type IdleState = "active" | "idle" | "locked";

    /**
     * Fired when the system changes to an active, idle or locked state. The event fires with "locked" if the screen is locked or the screensaver activates, "idle" if the system is unlocked and the user has not generated any input for a specified number of seconds, and "active" when the user generates input on an idle system.
     */
    export const onStateChanged: events.Event<(
      newState: IdleState,
    ) => void>;

    /**
     * Returns "locked" if the system is locked, "idle" if the user has not generated any input for a specified number of seconds, or "active" otherwise.
     *
     * @chrome-returns-extra since Chrome 116
     * @param detectionIntervalInSeconds The system is considered idle if detectionIntervalInSeconds seconds have elapsed since the last user input detected.
     */
    export function queryState(

      detectionIntervalInSeconds: number,
    ): Promise<IdleState>;

    /**
     * Returns "locked" if the system is locked, "idle" if the user has not generated any input for a specified number of seconds, or "active" otherwise.
     *
     * @param detectionIntervalInSeconds The system is considered idle if detectionIntervalInSeconds seconds have elapsed since the last user input detected.
     */
    export function queryState(

      detectionIntervalInSeconds: number,

      callback?: (
        newState: IdleState,
      ) => void,
    ): void;

    /**
     * Sets the interval, in seconds, used to determine when the system is in an idle state for onStateChanged events. The default interval is 60 seconds.
     *
     * @param intervalInSeconds Threshold, in seconds, used to determine when the system is in an idle state.
     */
    export function setDetectionInterval(

      intervalInSeconds: number,
    ): void;

    /**
     * Gets the time, in seconds, it takes until the screen is locked automatically while idle. Returns a zero duration if the screen is never locked automatically. Currently supported on Chrome OS only.
     *
     * @chrome-returns-extra since Chrome 116
     * @since Chrome 73
     * @chrome-platform chromeos
     * @chrome-platform lacros
     */
    export function getAutoLockDelay(): Promise<number>;

    /**
     * Gets the time, in seconds, it takes until the screen is locked automatically while idle. Returns a zero duration if the screen is never locked automatically. Currently supported on Chrome OS only.
     *
     * @since Chrome 73
     * @chrome-platform chromeos
     * @chrome-platform lacros
     */
    export function getAutoLockDelay(

      /**
       * @param delay Time, in seconds, until the screen is locked automatically while idle. This is zero if the screen never locks automatically.
       */
      callback?: (
        delay: number,
      ) => void,
    ): void;
  }

  /**
   * Dummy namespace for the incognito manifest key.
   *
   * @since Chrome 87
   */
  export namespace incognito {

    export type IncognitoMode = "split" | "spanning" | "not_allowed";
  }

  /**
   * Use the `chrome.input.ime` API to implement a custom IME for Chrome OS. This allows your extension to handle keystrokes, set the composition, and manage the candidate window.
   *
   * @chrome-permission input
   * @chrome-platform chromeos
   * @chrome-platform win
   * @chrome-platform linux
   */
  export namespace input.ime {

    /**
     * @since Chrome 44
     */
    export type KeyboardEventType = "keyup" | "keydown";

    /**
     * See http://www.w3.org/TR/DOM-Level-3-Events/#events-KeyboardEvent
     */
    export interface KeyboardEvent {

      /**
       * One of keyup or keydown.
       */
      type: KeyboardEventType;

      /**
       * (Deprecated) The ID of the request. Use the `requestId` param from the `onKeyEvent` event instead.
       */
      requestId?: string;

      /**
       * The extension ID of the sender of this keyevent.
       */
      extensionId?: string;

      /**
       * Value of the key being pressed
       */
      key: string;

      /**
       * Value of the physical key being pressed. The value is not affected by current keyboard layout or modifier state.
       */
      code: string;

      /**
       * The deprecated HTML keyCode, which is system- and implementation-dependent numerical code signifying the unmodified identifier associated with the key pressed.
       */
      keyCode?: number;

      /**
       * Whether or not the ALT key is pressed.
       */
      altKey?: boolean;

      /**
       * Whether or not the ALTGR key is pressed.
       *
       * @since Chrome 79
       */
      altgrKey?: boolean;

      /**
       * Whether or not the CTRL key is pressed.
       */
      ctrlKey?: boolean;

      /**
       * Whether or not the SHIFT key is pressed.
       */
      shiftKey?: boolean;

      /**
       * Whether or not the CAPS\_LOCK is enabled.
       */
      capsLock?: boolean;
    }

    /**
     * Type of value this text field edits, (Text, Number, URL, etc)
     *
     * @since Chrome 44
     */
    export type InputContextType = "text" | "search" | "tel" | "url" | "email" | "number" | "password" | "null";

    /**
     * The auto-capitalize type of the text field.
     *
     * @since Chrome 69
     */
    export type AutoCapitalizeType = "characters" | "words" | "sentences";

    /**
     * Describes an input Context
     */
    export interface InputContext {

      /**
       * This is used to specify targets of text field operations. This ID becomes invalid as soon as onBlur is called.
       */
      contextID: number;

      /**
       * Type of value this text field edits, (Text, Number, URL, etc)
       */
      type: InputContextType;

      /**
       * Whether the text field wants auto-correct.
       */
      autoCorrect: boolean;

      /**
       * Whether the text field wants auto-complete.
       */
      autoComplete: boolean;

      /**
       * The auto-capitalize type of the text field.
       *
       * @since Chrome 69
       */
      autoCapitalize: AutoCapitalizeType;

      /**
       * Whether the text field wants spell-check.
       */
      spellCheck: boolean;

      /**
       * Whether text entered into the text field should be used to improve typing suggestions for the user.
       *
       * @since Chrome 68
       */
      shouldDoLearning: boolean;
    }

    /**
     * The type of menu item. Radio buttons between separators are considered grouped.
     *
     * @since Chrome 44
     */
    export type MenuItemStyle = "check" | "radio" | "separator";

    /**
     * A menu item used by an input method to interact with the user from the language menu.
     */
    export interface MenuItem {

      /**
       * String that will be passed to callbacks referencing this MenuItem.
       */
      id: string;

      /**
       * Text displayed in the menu for this item.
       */
      label?: string;

      /**
       * The type of menu item.
       */
      style?: MenuItemStyle;

      /**
       * Indicates this item is visible.
       */
      visible?: boolean;

      /**
       * Indicates this item should be drawn with a check.
       */
      checked?: boolean;

      /**
       * Indicates this item is enabled.
       */
      enabled?: boolean;
    }

    /**
     * The type of the underline to modify this segment.
     *
     * @since Chrome 44
     */
    export type UnderlineStyle = "underline" | "doubleUnderline" | "noUnderline";

    /**
     * Where to display the candidate window. If set to 'cursor', the window follows the cursor. If set to 'composition', the window is locked to the beginning of the composition.
     *
     * @since Chrome 44
     */
    export type WindowPosition = "cursor" | "composition";

    /**
     * The screen type under which the IME is activated.
     *
     * @since Chrome 44
     */
    export type ScreenType = "normal" | "login" | "lock" | "secondary-login";

    /**
     * Which mouse buttons was clicked.
     *
     * @since Chrome 44
     */
    export type MouseButton = "left" | "middle" | "right";

    /**
     * Type of assistive window.
     *
     * @since Chrome 85
     */
    export type AssistiveWindowType = "undo";

    /**
     * Properties of the assistive window.
     *
     * @since Chrome 85
     */
    export interface AssistiveWindowProperties {

      type: AssistiveWindowType;

      /**
       * Sets true to show AssistiveWindow, sets false to hide.
       */
      visible: boolean;

      /**
       * Strings for ChromeVox to announce.
       */
      announceString?: string;
    }

    /**
     * ID of buttons in assistive window.
     *
     * @since Chrome 85
     */
    export type AssistiveWindowButton = "undo" | "addToDictionary";

    /**
     * @since Chrome 88
     */
    export interface MenuParameters {

      /**
       * ID of the engine to use.
       */
      engineID: string;

      /**
       * MenuItems to add or update. They will be added in the order they exist in the array.
       */
      items: MenuItem[];
    }

    /**
     * This event is sent when an IME is activated. It signals that the IME will be receiving onKeyPress events.
     */
    export const onActivate: events.Event<(
      engineID: string,
      screen: ScreenType,
    ) => void>;

    /**
     * This event is sent when an IME is deactivated. It signals that the IME will no longer be receiving onKeyPress events.
     */
    export const onDeactivated: events.Event<(
      engineID: string,
    ) => void>;

    /**
     * This event is sent when focus enters a text box. It is sent to all extensions that are listening to this event, and enabled by the user.
     */
    export const onFocus: events.Event<(
      context: InputContext,
    ) => void>;

    /**
     * This event is sent when focus leaves a text box. It is sent to all extensions that are listening to this event, and enabled by the user.
     */
    export const onBlur: events.Event<(
      contextID: number,
    ) => void>;

    /**
     * This event is sent when the properties of the current InputContext change, such as the the type. It is sent to all extensions that are listening to this event, and enabled by the user.
     */
    export const onInputContextUpdate: events.Event<(
      context: InputContext,
    ) => void>;

    /**
     * Fired when a key event is sent from the operating system. The event will be sent to the extension if this extension owns the active IME. The listener function should return true if the event was handled false if it was not. If the event will be evaluated asynchronously, this function must return undefined and the IME must later call keyEventHandled() with the result.
     */
    export const onKeyEvent: events.Event<(
      /**
       * @since Chrome 70
       */
      engineID: string,
      /**
       * @since Chrome 70
       */
      keyData: KeyboardEvent,
      /**
       * @since Chrome 79
       */
      requestId: string,
    ) => boolean | undefined>;

    /**
     * This event is sent if this extension owns the active IME.
     */
    export const onCandidateClicked: events.Event<(
      engineID: string,
      candidateID: number,
      button: MouseButton,
    ) => void>;

    /**
     * Called when the user selects a menu item
     */
    export const onMenuItemActivated: events.Event<(
      engineID: string,
      name: string,
    ) => void>;

    /**
     * Called when the editable string around caret is changed or when the caret position is moved. The text length is limited to 100 characters for each back and forth direction.
     */
    export const onSurroundingTextChanged: events.Event<(
      engineID: string,
      surroundingInfo: {

        /**
         * The text around the cursor. This is only a subset of all text in the input field.
         */
        text: string,

        /**
         * The ending position of the selection. This value indicates caret position if there is no selection.
         */
        focus: number,

        /**
         * The beginning position of the selection. This value indicates caret position if there is no selection.
         */
        anchor: number,

        /**
         * The offset position of `text`. Since `text` only includes a subset of text around the cursor, offset indicates the absolute position of the first character of `text`.
         *
         * @since Chrome 46
         */
        offset: number,
      },
    ) => void>;

    /**
     * This event is sent when chrome terminates ongoing text input session.
     */
    export const onReset: events.Event<(
      engineID: string,
    ) => void>;

    /**
     * This event is sent when a button in an assistive window is clicked.
     *
     * @since Chrome 85
     */
    export const onAssistiveWindowButtonClicked: events.Event<(
      details: {

        /**
         * The ID of the button clicked.
         */
        buttonID: AssistiveWindowButton,

        /**
         * The type of the assistive window.
         */
        windowType: AssistiveWindowType,
      },
    ) => void>;

    /**
     * Set the current composition. If this extension does not own the active IME, this fails.
     *
     * @chrome-returns-extra since Chrome 111
     */
    export function setComposition(

      parameters: {

        /**
         * ID of the context where the composition text will be set
         */
        contextID: number,

        /**
         * Text to set
         */
        text: string,

        /**
         * Position in the text that the selection starts at.
         */
        selectionStart?: number,

        /**
         * Position in the text that the selection ends at.
         */
        selectionEnd?: number,

        /**
         * Position in the text of the cursor.
         */
        cursor: number,

        /**
         * List of segments and their associated types.
         */
        segments?: {

          /**
           * Index of the character to start this segment at
           */
          start: number,

          /**
           * Index of the character to end this segment after.
           */
          end: number,

          /**
           * The type of the underline to modify this segment.
           */
          style: UnderlineStyle,
        }[],
      },
    ): Promise<boolean>;

    /**
     * Set the current composition. If this extension does not own the active IME, this fails.
     *
     * @param callback Called when the operation completes with a boolean indicating if the text was accepted or not. On failure, {@link runtime.lastError} is set.
     */
    export function setComposition(

      parameters: {

        /**
         * ID of the context where the composition text will be set
         */
        contextID: number,

        /**
         * Text to set
         */
        text: string,

        /**
         * Position in the text that the selection starts at.
         */
        selectionStart?: number,

        /**
         * Position in the text that the selection ends at.
         */
        selectionEnd?: number,

        /**
         * Position in the text of the cursor.
         */
        cursor: number,

        /**
         * List of segments and their associated types.
         */
        segments?: {

          /**
           * Index of the character to start this segment at
           */
          start: number,

          /**
           * Index of the character to end this segment after.
           */
          end: number,

          /**
           * The type of the underline to modify this segment.
           */
          style: UnderlineStyle,
        }[],
      },

      callback?: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Clear the current composition. If this extension does not own the active IME, this fails.
     *
     * @chrome-returns-extra since Chrome 111
     */
    export function clearComposition(

      parameters: {

        /**
         * ID of the context where the composition will be cleared
         */
        contextID: number,
      },
    ): Promise<boolean>;

    /**
     * Clear the current composition. If this extension does not own the active IME, this fails.
     *
     * @param callback Called when the operation completes with a boolean indicating if the text was accepted or not. On failure, {@link runtime.lastError} is set.
     */
    export function clearComposition(

      parameters: {

        /**
         * ID of the context where the composition will be cleared
         */
        contextID: number,
      },

      callback?: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Commits the provided text to the current input.
     *
     * @chrome-returns-extra since Chrome 111
     */
    export function commitText(

      parameters: {

        /**
         * ID of the context where the text will be committed
         */
        contextID: number,

        /**
         * The text to commit
         */
        text: string,
      },
    ): Promise<boolean>;

    /**
     * Commits the provided text to the current input.
     *
     * @param callback Called when the operation completes with a boolean indicating if the text was accepted or not. On failure, {@link runtime.lastError} is set.
     */
    export function commitText(

      parameters: {

        /**
         * ID of the context where the text will be committed
         */
        contextID: number,

        /**
         * The text to commit
         */
        text: string,
      },

      callback?: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Sends the key events. This function is expected to be used by virtual keyboards. When key(s) on a virtual keyboard is pressed by a user, this function is used to propagate that event to the system.
     *
     * @chrome-returns-extra since Chrome 111
     */
    export function sendKeyEvents(

      parameters: {

        /**
         * ID of the context where the key events will be sent, or zero to send key events to non-input field.
         */
        contextID: number,

        /**
         * Data on the key event.
         */
        keyData: KeyboardEvent[],
      },
    ): Promise<void>;

    /**
     * Sends the key events. This function is expected to be used by virtual keyboards. When key(s) on a virtual keyboard is pressed by a user, this function is used to propagate that event to the system.
     *
     * @param callback Called when the operation completes.
     */
    export function sendKeyEvents(

      parameters: {

        /**
         * ID of the context where the key events will be sent, or zero to send key events to non-input field.
         */
        contextID: number,

        /**
         * Data on the key event.
         */
        keyData: KeyboardEvent[],
      },

      callback?: () => void,
    ): void;

    /**
     * Hides the input view window, which is popped up automatically by system. If the input view window is already hidden, this function will do nothing.
     */
    export function hideInputView(): void;

    /**
     * Sets the properties of the candidate window. This fails if the extension doesn't own the active IME
     *
     * @chrome-returns-extra since Chrome 111
     */
    export function setCandidateWindowProperties(

      parameters: {

        /**
         * ID of the engine to set properties on.
         */
        engineID: string,

        properties: {

          /**
           * True to show the Candidate window, false to hide it.
           */
          visible?: boolean,

          /**
           * True to show the cursor, false to hide it.
           */
          cursorVisible?: boolean,

          /**
           * True if the candidate window should be rendered vertical, false to make it horizontal.
           */
          vertical?: boolean,

          /**
           * The number of candidates to display per page.
           */
          pageSize?: number,

          /**
           * Text that is shown at the bottom of the candidate window.
           */
          auxiliaryText?: string,

          /**
           * True to display the auxiliary text, false to hide it.
           */
          auxiliaryTextVisible?: boolean,

          /**
           * The total number of candidates for the candidate window.
           *
           * @since Chrome 84
           */
          totalCandidates?: number,

          /**
           * The index of the current chosen candidate out of total candidates.
           *
           * @since Chrome 84
           */
          currentCandidateIndex?: number,

          /**
           * Where to display the candidate window.
           */
          windowPosition?: WindowPosition,
        },
      },
    ): Promise<boolean>;

    /**
     * Sets the properties of the candidate window. This fails if the extension doesn't own the active IME
     *
     * @param callback Called when the operation completes.
     */
    export function setCandidateWindowProperties(

      parameters: {

        /**
         * ID of the engine to set properties on.
         */
        engineID: string,

        properties: {

          /**
           * True to show the Candidate window, false to hide it.
           */
          visible?: boolean,

          /**
           * True to show the cursor, false to hide it.
           */
          cursorVisible?: boolean,

          /**
           * True if the candidate window should be rendered vertical, false to make it horizontal.
           */
          vertical?: boolean,

          /**
           * The number of candidates to display per page.
           */
          pageSize?: number,

          /**
           * Text that is shown at the bottom of the candidate window.
           */
          auxiliaryText?: string,

          /**
           * True to display the auxiliary text, false to hide it.
           */
          auxiliaryTextVisible?: boolean,

          /**
           * The total number of candidates for the candidate window.
           *
           * @since Chrome 84
           */
          totalCandidates?: number,

          /**
           * The index of the current chosen candidate out of total candidates.
           *
           * @since Chrome 84
           */
          currentCandidateIndex?: number,

          /**
           * Where to display the candidate window.
           */
          windowPosition?: WindowPosition,
        },
      },

      callback?: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Sets the current candidate list. This fails if this extension doesn't own the active IME
     *
     * @chrome-returns-extra since Chrome 111
     */
    export function setCandidates(

      parameters: {

        /**
         * ID of the context that owns the candidate window.
         */
        contextID: number,

        /**
         * List of candidates to show in the candidate window
         */
        candidates: {

          /**
           * The candidate
           */
          candidate: string,

          /**
           * The candidate's id
           */
          id: number,

          /**
           * The id to add these candidates under
           */
          parentId?: number,

          /**
           * Short string displayed to next to the candidate, often the shortcut key or index
           */
          label?: string,

          /**
           * Additional text describing the candidate
           */
          annotation?: string,

          /**
           * The usage or detail description of word.
           */
          usage?: {

            /**
             * The title string of details description.
             */
            title: string,

            /**
             * The body string of detail description.
             */
            body: string,
          },
        }[],
      },
    ): Promise<boolean>;

    /**
     * Sets the current candidate list. This fails if this extension doesn't own the active IME
     *
     * @param callback Called when the operation completes.
     */
    export function setCandidates(

      parameters: {

        /**
         * ID of the context that owns the candidate window.
         */
        contextID: number,

        /**
         * List of candidates to show in the candidate window
         */
        candidates: {

          /**
           * The candidate
           */
          candidate: string,

          /**
           * The candidate's id
           */
          id: number,

          /**
           * The id to add these candidates under
           */
          parentId?: number,

          /**
           * Short string displayed to next to the candidate, often the shortcut key or index
           */
          label?: string,

          /**
           * Additional text describing the candidate
           */
          annotation?: string,

          /**
           * The usage or detail description of word.
           */
          usage?: {

            /**
             * The title string of details description.
             */
            title: string,

            /**
             * The body string of detail description.
             */
            body: string,
          },
        }[],
      },

      callback?: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Set the position of the cursor in the candidate window. This is a no-op if this extension does not own the active IME.
     *
     * @chrome-returns-extra since Chrome 111
     */
    export function setCursorPosition(

      parameters: {

        /**
         * ID of the context that owns the candidate window.
         */
        contextID: number,

        /**
         * ID of the candidate to select.
         */
        candidateID: number,
      },
    ): Promise<boolean>;

    /**
     * Set the position of the cursor in the candidate window. This is a no-op if this extension does not own the active IME.
     *
     * @param callback Called when the operation completes
     */
    export function setCursorPosition(

      parameters: {

        /**
         * ID of the context that owns the candidate window.
         */
        contextID: number,

        /**
         * ID of the candidate to select.
         */
        candidateID: number,
      },

      callback?: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Shows/Hides an assistive window with the given properties.
     *
     * @chrome-returns-extra since Chrome 111
     * @since Chrome 85
     */
    export function setAssistiveWindowProperties(

      parameters: {

        /**
         * ID of the context owning the assistive window.
         */
        contextID: number,

        /**
         * Properties of the assistive window.
         */
        properties: AssistiveWindowProperties,
      },
    ): Promise<boolean>;

    /**
     * Shows/Hides an assistive window with the given properties.
     *
     * @param callback Called when the operation completes.
     * @since Chrome 85
     */
    export function setAssistiveWindowProperties(

      parameters: {

        /**
         * ID of the context owning the assistive window.
         */
        contextID: number,

        /**
         * Properties of the assistive window.
         */
        properties: AssistiveWindowProperties,
      },

      callback?: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Highlights/Unhighlights a button in an assistive window.
     *
     * @chrome-returns-extra since Chrome 111
     * @since Chrome 86
     */
    export function setAssistiveWindowButtonHighlighted(

      parameters: {

        /**
         * ID of the context owning the assistive window.
         */
        contextID: number,

        /**
         * The ID of the button
         */
        buttonID: AssistiveWindowButton,

        /**
         * The window type the button belongs to.
         */
        windowType: AssistiveWindowType,

        /**
         * The text for the screenreader to announce.
         */
        announceString?: string,

        /**
         * Whether the button should be highlighted.
         */
        highlighted: boolean,
      },
    ): Promise<void>;

    /**
     * Highlights/Unhighlights a button in an assistive window.
     *
     * @param callback Called when the operation completes. On failure, {@link runtime.lastError} is set.
     * @since Chrome 86
     */
    export function setAssistiveWindowButtonHighlighted(

      parameters: {

        /**
         * ID of the context owning the assistive window.
         */
        contextID: number,

        /**
         * The ID of the button
         */
        buttonID: AssistiveWindowButton,

        /**
         * The window type the button belongs to.
         */
        windowType: AssistiveWindowType,

        /**
         * The text for the screenreader to announce.
         */
        announceString?: string,

        /**
         * Whether the button should be highlighted.
         */
        highlighted: boolean,
      },

      callback?: () => void,
    ): void;

    /**
     * Adds the provided menu items to the language menu when this IME is active.
     *
     * @chrome-returns-extra since Chrome 111
     */
    export function setMenuItems(

      parameters: MenuParameters,
    ): Promise<void>;

    /**
     * Adds the provided menu items to the language menu when this IME is active.
     */
    export function setMenuItems(

      parameters: MenuParameters,

      callback?: () => void,
    ): void;

    /**
     * Updates the state of the MenuItems specified
     *
     * @chrome-returns-extra since Chrome 111
     */
    export function updateMenuItems(

      parameters: MenuParameters,
    ): Promise<void>;

    /**
     * Updates the state of the MenuItems specified
     *
     * @param callback Called when the operation completes
     */
    export function updateMenuItems(

      parameters: MenuParameters,

      callback?: () => void,
    ): void;

    /**
     * Deletes the text around the caret.
     *
     * @chrome-returns-extra since Chrome 111
     */
    export function deleteSurroundingText(

      parameters: {

        /**
         * ID of the engine receiving the event.
         */
        engineID: string,

        /**
         * ID of the context where the surrounding text will be deleted.
         */
        contextID: number,

        /**
         * The offset from the caret position where deletion will start. This value can be negative.
         */
        offset: number,

        /**
         * The number of characters to be deleted
         */
        length: number,
      },
    ): Promise<void>;

    /**
     * Deletes the text around the caret.
     *
     * @param callback Called when the operation completes.
     */
    export function deleteSurroundingText(

      parameters: {

        /**
         * ID of the engine receiving the event.
         */
        engineID: string,

        /**
         * ID of the context where the surrounding text will be deleted.
         */
        contextID: number,

        /**
         * The offset from the caret position where deletion will start. This value can be negative.
         */
        offset: number,

        /**
         * The number of characters to be deleted
         */
        length: number,
      },

      callback?: () => void,
    ): void;

    /**
     * Indicates that the key event received by onKeyEvent is handled. This should only be called if the onKeyEvent listener is asynchronous.
     *
     * @param requestId Request id of the event that was handled. This should come from keyEvent.requestId
     * @param response True if the keystroke was handled, false if not
     */
    export function keyEventHandled(

      requestId: string,

      response: boolean,
    ): void;
  }

  /**
   * Use `chrome.instanceID` to access the Instance ID service.
   *
   * @since Chrome 44
   * @chrome-permission gcm
   */
  export namespace instanceID {

    /**
     * Fired when all the granted tokens need to be refreshed.
     */
    export const onTokenRefresh: events.Event<() => void>;

    /**
     * Retrieves an identifier for the app instance. The instance ID will be returned by the `callback`. The same ID will be returned as long as the application identity has not been revoked or expired.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function getID(): Promise<string>;

    /**
     * Retrieves an identifier for the app instance. The instance ID will be returned by the `callback`. The same ID will be returned as long as the application identity has not been revoked or expired.
     *
     * @param callback Function called when the retrieval completes. It should check {@link runtime.lastError} for error when instanceID is empty.
     */
    export function getID(

      /**
       * @param instanceID An Instance ID assigned to the app instance.
       */
      callback?: (
        instanceID: string,
      ) => void,
    ): void;

    /**
     * Retrieves the time when the InstanceID has been generated. The creation time will be returned by the `callback`.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function getCreationTime(): Promise<number>;

    /**
     * Retrieves the time when the InstanceID has been generated. The creation time will be returned by the `callback`.
     *
     * @param callback Function called when the retrieval completes. It should check {@link runtime.lastError} for error when creationTime is zero.
     */
    export function getCreationTime(

      /**
       * @param creationTime The time when the Instance ID has been generated, represented in milliseconds since the epoch.
       */
      callback?: (
        creationTime: number,
      ) => void,
    ): void;

    /**
     * Return a token that allows the authorized entity to access the service defined by scope.
     *
     * @chrome-returns-extra since Chrome 96
     * @param getTokenParams Parameters for getToken.
     */
    export function getToken(

      getTokenParams: {

        /**
         * Identifies the entity that is authorized to access resources associated with this Instance ID. It can be a project ID from [Google developer console](https://code.google.com/apis/console).
         *
         * @since Chrome 46
         */
        authorizedEntity: string,

        /**
         * Identifies authorized actions that the authorized entity can take. E.g. for sending GCM messages, `GCM` scope should be used.
         *
         * @since Chrome 46
         */
        scope: string,

        /**
         * Allows including a small number of string key/value pairs that will be associated with the token and may be used in processing the request.
         *
         * @deprecated options are deprecated and will be ignored.
         * @since Chrome 46
         * @chrome-deprecated-since Chrome 89
         */
        options?: {[name: string]: string},
      },
    ): Promise<string>;

    /**
     * Return a token that allows the authorized entity to access the service defined by scope.
     *
     * @param getTokenParams Parameters for getToken.
     * @param callback Function called when the retrieval completes. It should check {@link runtime.lastError} for error when token is empty.
     */
    export function getToken(

      getTokenParams: {

        /**
         * Identifies the entity that is authorized to access resources associated with this Instance ID. It can be a project ID from [Google developer console](https://code.google.com/apis/console).
         *
         * @since Chrome 46
         */
        authorizedEntity: string,

        /**
         * Identifies authorized actions that the authorized entity can take. E.g. for sending GCM messages, `GCM` scope should be used.
         *
         * @since Chrome 46
         */
        scope: string,

        /**
         * Allows including a small number of string key/value pairs that will be associated with the token and may be used in processing the request.
         *
         * @deprecated options are deprecated and will be ignored.
         * @since Chrome 46
         * @chrome-deprecated-since Chrome 89
         */
        options?: {[name: string]: string},
      },

      /**
       * @param token A token assigned by the requested service.
       */
      callback?: (
        token: string,
      ) => void,
    ): void;

    /**
     * Revokes a granted token.
     *
     * @chrome-returns-extra since Chrome 96
     * @param deleteTokenParams Parameters for deleteToken.
     */
    export function deleteToken(

      deleteTokenParams: {

        /**
         * The authorized entity that is used to obtain the token.
         *
         * @since Chrome 46
         */
        authorizedEntity: string,

        /**
         * The scope that is used to obtain the token.
         *
         * @since Chrome 46
         */
        scope: string,
      },
    ): Promise<void>;

    /**
     * Revokes a granted token.
     *
     * @param deleteTokenParams Parameters for deleteToken.
     * @param callback Function called when the token deletion completes. The token was revoked successfully if {@link runtime.lastError} is not set.
     */
    export function deleteToken(

      deleteTokenParams: {

        /**
         * The authorized entity that is used to obtain the token.
         *
         * @since Chrome 46
         */
        authorizedEntity: string,

        /**
         * The scope that is used to obtain the token.
         *
         * @since Chrome 46
         */
        scope: string,
      },

      callback?: () => void,
    ): void;

    /**
     * Resets the app instance identifier and revokes all tokens associated with it.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function deleteID(): Promise<void>;

    /**
     * Resets the app instance identifier and revokes all tokens associated with it.
     *
     * @param callback Function called when the deletion completes. The instance identifier was revoked successfully if {@link runtime.lastError} is not set.
     */
    export function deleteID(

      callback?: () => void,
    ): void;
  }

  /**
   * Use the `chrome.loginState` API to read and monitor the login state.
   *
   * @since Chrome 78
   * @chrome-permission loginState
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace loginState {

    /**
     * @chrome-enum "SIGNIN\_PROFILE" Specifies that the extension is in the signin profile.
     * @chrome-enum "USER\_PROFILE" Specifies that the extension is in the user profile.
     */
    export type ProfileType = "SIGNIN_PROFILE" | "USER_PROFILE";

    /**
     * @chrome-enum "UNKNOWN" Specifies that the session state is unknown.
     * @chrome-enum "IN\_OOBE\_SCREEN" Specifies that the user is in the out-of-box-experience screen.
     * @chrome-enum "IN\_LOGIN\_SCREEN" Specifies that the user is in the login screen.
     * @chrome-enum "IN\_SESSION" Specifies that the user is in the session.
     * @chrome-enum "IN\_LOCK\_SCREEN" Specifies that the user is in the lock screen.
     * @chrome-enum "IN\_RMA\_SCREEN" Specifies that the device is in RMA mode, finalizing repairs.
     */
    export type SessionState = "UNKNOWN" | "IN_OOBE_SCREEN" | "IN_LOGIN_SCREEN" | "IN_SESSION" | "IN_LOCK_SCREEN" | "IN_RMA_SCREEN";

    /**
     * Dispatched when the session state changes. `sessionState` is the new session state.
     */
    export const onSessionStateChanged: events.Event<(
      sessionState: SessionState,
    ) => void>;

    /**
     * Gets the type of the profile the extension is in.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function getProfileType(): Promise<ProfileType>;

    /**
     * Gets the type of the profile the extension is in.
     */
    export function getProfileType(

      callback?: (
        result: ProfileType,
      ) => void,
    ): void;

    /**
     * Gets the current session state.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function getSessionState(): Promise<SessionState>;

    /**
     * Gets the current session state.
     */
    export function getSessionState(

      callback?: (
        result: SessionState,
      ) => void,
    ): void;
  }

  /**
   * The `chrome.management` API provides ways to manage the list of extensions/apps that are installed and running. It is particularly useful for extensions that [override](https://developer.chrome.com/extensions/develop/ui/override-chrome-pages) the built-in New Tab page.
   *
   * @chrome-permission management
   */
  export namespace management {

    /**
     * Information about an icon belonging to an extension, app, or theme.
     */
    export interface IconInfo {

      /**
       * A number representing the width and height of the icon. Likely values include (but are not limited to) 128, 48, 24, and 16.
       */
      size: number;

      /**
       * The URL for this icon image. To display a grayscale version of the icon (to indicate that an extension is disabled, for example), append `?grayscale=true` to the URL.
       */
      url: string;
    }

    /**
     * These are all possible app launch types.
     */
    export type LaunchType = "OPEN_AS_REGULAR_TAB" | "OPEN_AS_PINNED_TAB" | "OPEN_AS_WINDOW" | "OPEN_FULL_SCREEN";

    /**
     * A reason the item is disabled.
     *
     * @since Chrome 44
     */
    export type ExtensionDisabledReason = "unknown" | "permissions_increase";

    /**
     * The type of this extension, app, or theme.
     *
     * @since Chrome 44
     */
    export type ExtensionType = "extension" | "hosted_app" | "packaged_app" | "legacy_packaged_app" | "theme" | "login_screen_extension";

    /**
     * How the extension was installed. One of
     * `admin`: The extension was installed because of an administrative policy,
     * `development`: The extension was loaded unpacked in developer mode,
     * `normal`: The extension was installed normally via a .crx file,
     * `sideload`: The extension was installed by other software on the machine,
     * `other`: The extension was installed by other means.
     *
     * @since Chrome 44
     */
    export type ExtensionInstallType = "admin" | "development" | "normal" | "sideload" | "other";

    /**
     * Information about an installed extension, app, or theme.
     */
    export interface ExtensionInfo {

      /**
       * The extension's unique identifier.
       */
      id: string;

      /**
       * The name of this extension, app, or theme.
       */
      name: string;

      /**
       * A short version of the name of this extension, app, or theme.
       */
      shortName: string;

      /**
       * The description of this extension, app, or theme.
       */
      description: string;

      /**
       * The [version](https://developer.chrome.com/docs/extensions/reference/manifest/version) of this extension, app, or theme.
       */
      version: string;

      /**
       * The [version name](https://developer.chrome.com/docs/extensions/reference/manifest/version#version_name) of this extension, app, or theme if the manifest specified one.
       *
       * @since Chrome 50
       */
      versionName?: string;

      /**
       * Whether this extension can be disabled or uninstalled by the user.
       */
      mayDisable: boolean;

      /**
       * Whether this extension can be enabled by the user. This is only returned for extensions which are not enabled.
       *
       * @since Chrome 62
       */
      mayEnable?: boolean;

      /**
       * Whether it is currently enabled or disabled.
       */
      enabled: boolean;

      /**
       * A reason the item is disabled.
       */
      disabledReason?: ExtensionDisabledReason;

      /**
       * True if this is an app.
       *
       * @deprecated Please use {@link management.ExtensionInfo.type}.
       */
      isApp: boolean;

      /**
       * The type of this extension, app, or theme.
       */
      type: ExtensionType;

      /**
       * The launch url (only present for apps).
       */
      appLaunchUrl?: string;

      /**
       * The URL of the homepage of this extension, app, or theme.
       */
      homepageUrl?: string;

      /**
       * The update URL of this extension, app, or theme.
       */
      updateUrl?: string;

      /**
       * Whether the extension, app, or theme declares that it supports offline.
       */
      offlineEnabled: boolean;

      /**
       * The url for the item's options page, if it has one.
       */
      optionsUrl: string;

      /**
       * A list of icon information. Note that this just reflects what was declared in the manifest, and the actual image at that url may be larger or smaller than what was declared, so you might consider using explicit width and height attributes on img tags referencing these images. See the [manifest documentation on icons](https://developer.chrome.com/docs/extensions/reference/manifest/icons) for more details.
       */
      icons?: IconInfo[];

      /**
       * Returns a list of API based permissions.
       */
      permissions: string[];

      /**
       * Returns a list of host based permissions.
       */
      hostPermissions: string[];

      /**
       * How the extension was installed.
       */
      installType: ExtensionInstallType;

      /**
       * The app launch type (only present for apps).
       */
      launchType?: LaunchType;

      /**
       * The currently available launch types (only present for apps).
       */
      availableLaunchTypes?: LaunchType[];
    }

    /**
     * Options for how to handle the extension's uninstallation.
     *
     * @since Chrome 88
     */
    export interface UninstallOptions {

      /**
       * Whether or not a confirm-uninstall dialog should prompt the user. Defaults to false for self uninstalls. If an extension uninstalls another extension, this parameter is ignored and the dialog is always shown.
       */
      showConfirmDialog?: boolean;
    }

    /**
     * Fired when an app or extension has been installed.
     */
    export const onInstalled: events.Event<(
      info: ExtensionInfo,
    ) => void>;

    /**
     * Fired when an app or extension has been uninstalled.
     */
    export const onUninstalled: events.Event<(
      id: string,
    ) => void>;

    /**
     * Fired when an app or extension has been enabled.
     */
    export const onEnabled: events.Event<(
      info: ExtensionInfo,
    ) => void>;

    /**
     * Fired when an app or extension has been disabled.
     */
    export const onDisabled: events.Event<(
      info: ExtensionInfo,
    ) => void>;

    /**
     * Returns a list of information about installed extensions and apps.
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function getAll(): Promise<ExtensionInfo[]>;

    /**
     * Returns a list of information about installed extensions and apps.
     */
    export function getAll(

      callback?: (
        result: ExtensionInfo[],
      ) => void,
    ): void;

    /**
     * Returns information about the installed extension, app, or theme that has the given ID.
     *
     * @chrome-returns-extra since Chrome 88
     * @param id The ID from an item of {@link management.ExtensionInfo}.
     */
    export function get(

      id: string,
    ): Promise<ExtensionInfo>;

    /**
     * Returns information about the installed extension, app, or theme that has the given ID.
     *
     * @param id The ID from an item of {@link management.ExtensionInfo}.
     */
    export function get(

      id: string,

      callback?: (
        result: ExtensionInfo,
      ) => void,
    ): void;

    /**
     * Returns information about the calling extension, app, or theme. Note: This function can be used without requesting the 'management' permission in the manifest.
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function getSelf(): Promise<ExtensionInfo>;

    /**
     * Returns information about the calling extension, app, or theme. Note: This function can be used without requesting the 'management' permission in the manifest.
     */
    export function getSelf(

      callback?: (
        result: ExtensionInfo,
      ) => void,
    ): void;

    /**
     * Returns a list of [permission warnings](https://developer.chrome.com/extensions/develop/concepts/permission-warnings) for the given extension id.
     *
     * @chrome-returns-extra since Chrome 88
     * @param id The ID of an already installed extension.
     */
    export function getPermissionWarningsById(

      id: string,
    ): Promise<string[]>;

    /**
     * Returns a list of [permission warnings](https://developer.chrome.com/extensions/develop/concepts/permission-warnings) for the given extension id.
     *
     * @param id The ID of an already installed extension.
     */
    export function getPermissionWarningsById(

      id: string,

      callback?: (
        permissionWarnings: string[],
      ) => void,
    ): void;

    /**
     * Returns a list of [permission warnings](https://developer.chrome.com/extensions/develop/concepts/permission-warnings) for the given extension manifest string. Note: This function can be used without requesting the 'management' permission in the manifest.
     *
     * @chrome-returns-extra since Chrome 88
     * @param manifestStr Extension manifest JSON string.
     */
    export function getPermissionWarningsByManifest(

      manifestStr: string,
    ): Promise<string[]>;

    /**
     * Returns a list of [permission warnings](https://developer.chrome.com/extensions/develop/concepts/permission-warnings) for the given extension manifest string. Note: This function can be used without requesting the 'management' permission in the manifest.
     *
     * @param manifestStr Extension manifest JSON string.
     */
    export function getPermissionWarningsByManifest(

      manifestStr: string,

      callback?: (
        permissionWarnings: string[],
      ) => void,
    ): void;

    /**
     * Enables or disables an app or extension. In most cases this function must be called in the context of a user gesture (e.g. an onclick handler for a button), and may present the user with a native confirmation UI as a way of preventing abuse.
     *
     * @chrome-returns-extra since Chrome 88
     * @param id This should be the id from an item of {@link management.ExtensionInfo}.
     * @param enabled Whether this item should be enabled or disabled.
     */
    export function setEnabled(

      id: string,

      enabled: boolean,
    ): Promise<void>;

    /**
     * Enables or disables an app or extension. In most cases this function must be called in the context of a user gesture (e.g. an onclick handler for a button), and may present the user with a native confirmation UI as a way of preventing abuse.
     *
     * @param id This should be the id from an item of {@link management.ExtensionInfo}.
     * @param enabled Whether this item should be enabled or disabled.
     */
    export function setEnabled(

      id: string,

      enabled: boolean,

      callback?: () => void,
    ): void;

    /**
     * Uninstalls a currently installed app or extension. Note: This function does not work in managed environments when the user is not allowed to uninstall the specified extension/app. If the uninstall fails (e.g. the user cancels the dialog) the promise will be rejected or the callback will be called with {@link runtime.lastError} set.
     *
     * @chrome-returns-extra since Chrome 88
     * @param id This should be the id from an item of {@link management.ExtensionInfo}.
     */
    export function uninstall(

      id: string,

      options?: UninstallOptions,
    ): Promise<void>;

    /**
     * Uninstalls a currently installed app or extension. Note: This function does not work in managed environments when the user is not allowed to uninstall the specified extension/app. If the uninstall fails (e.g. the user cancels the dialog) the promise will be rejected or the callback will be called with {@link runtime.lastError} set.
     *
     * @param id This should be the id from an item of {@link management.ExtensionInfo}.
     */
    export function uninstall(

      id: string,

      options?: UninstallOptions,

      callback?: () => void,
    ): void;

    /**
     * Uninstalls the calling extension. Note: This function can be used without requesting the 'management' permission in the manifest. This function does not work in managed environments when the user is not allowed to uninstall the specified extension/app.
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function uninstallSelf(

      options?: UninstallOptions,
    ): Promise<void>;

    /**
     * Uninstalls the calling extension. Note: This function can be used without requesting the 'management' permission in the manifest. This function does not work in managed environments when the user is not allowed to uninstall the specified extension/app.
     */
    export function uninstallSelf(

      options?: UninstallOptions,

      callback?: () => void,
    ): void;

    /**
     * Launches an application.
     *
     * @chrome-returns-extra since Chrome 88
     * @param id The extension id of the application.
     */
    export function launchApp(

      id: string,
    ): Promise<void>;

    /**
     * Launches an application.
     *
     * @param id The extension id of the application.
     */
    export function launchApp(

      id: string,

      callback?: () => void,
    ): void;

    /**
     * Display options to create shortcuts for an app. On Mac, only packaged app shortcuts can be created.
     *
     * @chrome-returns-extra since Chrome 88
     * @param id This should be the id from an app item of {@link management.ExtensionInfo}.
     */
    export function createAppShortcut(

      id: string,
    ): Promise<void>;

    /**
     * Display options to create shortcuts for an app. On Mac, only packaged app shortcuts can be created.
     *
     * @param id This should be the id from an app item of {@link management.ExtensionInfo}.
     */
    export function createAppShortcut(

      id: string,

      callback?: () => void,
    ): void;

    /**
     * Set the launch type of an app.
     *
     * @chrome-returns-extra since Chrome 88
     * @param id This should be the id from an app item of {@link management.ExtensionInfo}.
     * @param launchType The target launch type. Always check and make sure this launch type is in {@link ExtensionInfo.availableLaunchTypes}, because the available launch types vary on different platforms and configurations.
     */
    export function setLaunchType(

      id: string,

      launchType: LaunchType,
    ): Promise<void>;

    /**
     * Set the launch type of an app.
     *
     * @param id This should be the id from an app item of {@link management.ExtensionInfo}.
     * @param launchType The target launch type. Always check and make sure this launch type is in {@link ExtensionInfo.availableLaunchTypes}, because the available launch types vary on different platforms and configurations.
     */
    export function setLaunchType(

      id: string,

      launchType: LaunchType,

      callback?: () => void,
    ): void;

    /**
     * Generate an app for a URL. Returns the generated bookmark app.
     *
     * @chrome-returns-extra since Chrome 88
     * @param url The URL of a web page. The scheme of the URL can only be "http" or "https".
     * @param title The title of the generated app.
     */
    export function generateAppForLink(

      url: string,

      title: string,
    ): Promise<ExtensionInfo>;

    /**
     * Generate an app for a URL. Returns the generated bookmark app.
     *
     * @param url The URL of a web page. The scheme of the URL can only be "http" or "https".
     * @param title The title of the generated app.
     */
    export function generateAppForLink(

      url: string,

      title: string,

      callback?: (
        result: ExtensionInfo,
      ) => void,
    ): void;

    /**
     * Launches the replacement\_web\_app specified in the manifest. Prompts the user to install if not already installed.
     *
     * @chrome-returns-extra since Chrome 88
     * @since Chrome 77
     * @chrome-manifest replacement_web_app
     */
    export function installReplacementWebApp(): Promise<void>;

    /**
     * Launches the replacement\_web\_app specified in the manifest. Prompts the user to install if not already installed.
     *
     * @since Chrome 77
     * @chrome-manifest replacement_web_app
     */
    export function installReplacementWebApp(

      callback?: () => void,
    ): void;
  }

  /**
   * Schemas for structured manifest entries
   */
  export namespace manifestTypes {

    /**
     * Chrome settings which can be overriden by an extension.
     */
    export interface ChromeSettingsOverrides {

      /**
       * New value for the homepage.
       */
      homepage?: string;

      /**
       * A search engine
       */
      search_provider?: {

        /**
         * Name of the search engine displayed to user. This may only be omitted if _prepopulated\_id_ is set.
         */
        name?: string,

        /**
         * Omnibox keyword for the search engine. This may only be omitted if _prepopulated\_id_ is set.
         */
        keyword?: string,

        /**
         * An icon URL for the search engine. This may only be omitted if _prepopulated\_id_ is set.
         */
        favicon_url?: string,

        /**
         * An search URL used by the search engine.
         */
        search_url: string,

        /**
         * Encoding of the search term. This may only be omitted if _prepopulated\_id_ is set.
         */
        encoding?: string,

        /**
         * If omitted, this engine does not support suggestions.
         */
        suggest_url?: string,

        /**
         * If omitted, this engine does not support image search.
         */
        image_url?: string,

        /**
         * The string of post parameters to search\_url
         */
        search_url_post_params?: string,

        /**
         * The string of post parameters to suggest\_url
         */
        suggest_url_post_params?: string,

        /**
         * The string of post parameters to image\_url
         */
        image_url_post_params?: string,

        /**
         * A list of URL patterns that can be used, in addition to `search_url`.
         */
        alternate_urls?: string[],

        /**
         * An ID of the built-in search engine in Chrome.
         */
        prepopulated_id?: number,

        /**
         * Specifies if the search provider should be default.
         */
        is_default: boolean,
      };

      /**
       * An array of length one containing a URL to be used as the startup page.
       */
      startup_pages?: string[];
    }

    /**
     * For `"file"` the source is a file passed via `onLaunched` event. For `"device"` contents are fetched from an external device (eg. plugged via USB), without using `file_handlers`. Finally, for `"network"` source, contents should be fetched via network.
     *
     * @since Chrome 44
     */
    export type FileSystemProviderSource = "file" | "device" | "network";

    /**
     * Represents capabilities of a providing extension.
     *
     * @since Chrome 44
     */
    export interface FileSystemProviderCapabilities {

      /**
       * Whether configuring via `onConfigureRequested` is supported. By default: `false`.
       */
      configurable?: boolean;

      /**
       * Whether multiple (more than one) mounted file systems are supported. By default: `false`.
       */
      multiple_mounts?: boolean;

      /**
       * Whether setting watchers and notifying about changes is supported. By default: `false`.
       *
       * @since Chrome 45
       */
      watchable?: boolean;

      /**
       * Source of data for mounted file systems.
       */
      source: FileSystemProviderSource;
    }
  }

  /**
   * Use the `chrome.mdns` API to discover services over mDNS. This comprises a subset of the features of the NSD spec: http://www.w3.org/TR/discovery-api/
   *
   * @alpha
   * @chrome-permission mdns
   * @chrome-channel dev
   */
  export namespace mdns {

    export interface MDnsService {

      /**
       * The service name of an mDNS advertised service, ..
       */
      serviceName: string;

      /**
       * The host:port pair of an mDNS advertised service.
       */
      serviceHostPort: string;

      /**
       * The IP address of an mDNS advertised service.
       */
      ipAddress: string;

      /**
       * Metadata for an mDNS advertised service.
       */
      serviceData: string[];
    }

    /**
     * The maximum number of service instances that will be included in onServiceList events. If more instances are available, they may be truncated from the onServiceList event.
     */
    export const MAX_SERVICE_INSTANCES_PER_EVENT: 2048;

    /**
     * Event fired to inform clients of the current complete set of known available services. Clients should only need to store the list from the most recent event. The service type that the extension is interested in discovering should be specified as the event filter with the 'serviceType' key. Not specifying an event filter will not start any discovery listeners.
     */
    export const onServiceList: events.Event<(
      services: MDnsService[],
    ) => void>;

    /**
     * Immediately issues a multicast DNS query for all service types. `callback` is invoked immediately. At a later time, queries will be sent, and any service events will be fired.
     */
    export function forceDiscovery(): Promise<void>;

    /**
     * Immediately issues a multicast DNS query for all service types. `callback` is invoked immediately. At a later time, queries will be sent, and any service events will be fired.
     *
     * @param callback Callback invoked after ForceDiscovery() has started.
     */
    export function forceDiscovery(

      callback?: () => void,
    ): void;
  }

  /**
   * The `chrome.networking.onc` API is used for configuring network connections (Cellular, Ethernet, VPN or WiFi). This API is available in auto-launched Chrome OS kiosk sessions.
   *
   * Network connection configurations are specified following [Open Network Configuration (ONC)](https://chromium.googlesource.com/chromium/src/+/main/components/onc/docs/onc_spec.md) specification.
   *
   * **NOTE**: Most dictionary properties and enum values use UpperCamelCase to match the ONC specification instead of the JavaScript lowerCamelCase convention.
   *
   * @alpha
   * @chrome-permission networking.onc
   * @chrome-channel dev
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace networking.onc {

    export type ActivationStateType = "Activated" | "Activating" | "NotActivated" | "PartiallyActivated";

    export type CaptivePortalStatus = "Unknown" | "Offline" | "Online" | "Portal" | "ProxyAuthRequired";

    export type ClientCertificateType = "Ref" | "Pattern";

    export type ConnectionStateType = "Connected" | "Connecting" | "NotConnected";

    /**
     * @chrome-enum "Uninitialized" Device is available but not initialized.
     * @chrome-enum "Disabled" Device is initialized but not enabled.
     * @chrome-enum "Enabling" Enabled state has been requested but has not completed.
     * @chrome-enum "Enabled" Device is enabled.
     * @chrome-enum "Prohibited" Device is prohibited.
     */
    export type DeviceStateType = "Uninitialized" | "Disabled" | "Enabling" | "Enabled" | "Prohibited";

    export type IPConfigType = "DHCP" | "Static";

    export type NetworkType = "All" | "Cellular" | "Ethernet" | "Tether" | "VPN" | "Wireless" | "WiFi";

    export type ProxySettingsType = "Direct" | "Manual" | "PAC" | "WPAD";

    export interface ManagedBoolean {

      /**
       * The active value currently used by the network configuration manager (e.g. Shill).
       */
      Active?: boolean;

      /**
       * The source from which the effective property value was determined.
       */
      Effective?: string;

      /**
       * The property value provided by the user policy.
       */
      UserPolicy?: boolean;

      /**
       * The property value provided by the device policy.
       */
      DevicePolicy?: boolean;

      /**
       * The property value set by the logged in user. Only provided if `UserEditable` is `true`.
       */
      UserSetting?: boolean;

      /**
       * The value set for all users of the device. Only provided if `DeviceEditiable` is `true`.
       */
      SharedSetting?: boolean;

      /**
       * Whether a UserPolicy for the property exists and allows the property to be edited (i.e. the policy set recommended property value). Defaults to `false`.
       */
      UserEditable?: boolean;

      /**
       * Whether a DevicePolicy for the property exists and allows the property to be edited (i.e. the policy set recommended property value). Defaults to `false`.
       */
      DeviceEditable?: boolean;
    }

    export interface ManagedLong {

      /**
       * The active value currently used by the network configuration manager (e.g. Shill).
       */
      Active?: number;

      /**
       * The source from which the effective property value was determined.
       */
      Effective?: string;

      /**
       * The property value provided by the user policy.
       */
      UserPolicy?: number;

      /**
       * The property value provided by the device policy.
       */
      DevicePolicy?: number;

      /**
       * The property value set by the logged in user. Only provided if `UserEditable` is `true`.
       */
      UserSetting?: number;

      /**
       * The value set for all users of the device. Only provided if `DeviceEditiable` is `true`.
       */
      SharedSetting?: number;

      /**
       * Whether a UserPolicy for the property exists and allows the property to be edited (i.e. the policy set recommended property value). Defaults to `false`.
       */
      UserEditable?: boolean;

      /**
       * Whether a DevicePolicy for the property exists and allows the property to be edited (i.e. the policy set recommended property value). Defaults to `false`.
       */
      DeviceEditable?: boolean;
    }

    export interface ManagedDOMString {

      /**
       * The active value currently used by the network configuration manager (e.g. Shill).
       */
      Active?: string;

      /**
       * The source from which the effective property value was determined.
       */
      Effective?: string;

      /**
       * The property value provided by the user policy.
       */
      UserPolicy?: string;

      /**
       * The property value provided by the device policy.
       */
      DevicePolicy?: string;

      /**
       * The property value set by the logged in user. Only provided if `UserEditable` is `true`.
       */
      UserSetting?: string;

      /**
       * The value set for all users of the device. Only provided if `DeviceEditiable` is `true`.
       */
      SharedSetting?: string;

      /**
       * Whether a UserPolicy for the property exists and allows the property to be edited (i.e. the policy set recommended property value). Defaults to `false`.
       */
      UserEditable?: boolean;

      /**
       * Whether a DevicePolicy for the property exists and allows the property to be edited (i.e. the policy set recommended property value). Defaults to `false`.
       */
      DeviceEditable?: boolean;
    }

    export interface ManagedDOMStringList {

      /**
       * The active value currently used by the network configuration manager (e.g. Shill).
       */
      Active?: string[];

      /**
       * The source from which the effective property value was determined.
       */
      Effective?: string;

      /**
       * The property value provided by the user policy.
       */
      UserPolicy?: string[];

      /**
       * The property value provided by the device policy.
       */
      DevicePolicy?: string[];

      /**
       * The property value set by the logged in user. Only provided if `UserEditable` is `true`.
       */
      UserSetting?: string[];

      /**
       * The value set for all users of the device. Only provided if `DeviceEditiable` is `true`.
       */
      SharedSetting?: string[];

      /**
       * Whether a UserPolicy for the property exists and allows the property to be edited (i.e. the policy set recommended property value). Defaults to `false`.
       */
      UserEditable?: boolean;

      /**
       * Whether a DevicePolicy for the property exists and allows the property to be edited (i.e. the policy set recommended property value). Defaults to `false`.
       */
      DeviceEditable?: boolean;
    }

    export interface ManagedIPConfigType {

      /**
       * The active value currently used by the network configuration manager (e.g. Shill).
       */
      Active?: IPConfigType;

      /**
       * The source from which the effective property value was determined.
       */
      Effective?: string;

      /**
       * The property value provided by the user policy.
       */
      UserPolicy?: IPConfigType;

      /**
       * The property value provided by the device policy.
       */
      DevicePolicy?: IPConfigType;

      /**
       * The property value set by the logged in user. Only provided if `UserEditable` is `true`.
       */
      UserSetting?: IPConfigType;

      /**
       * The value set for all users of the device. Only provided if `DeviceEditiable` is `true`.
       */
      SharedSetting?: IPConfigType;

      /**
       * Whether a UserPolicy for the property exists and allows the property to be edited (i.e. the policy set recommended property value). Defaults to `false`.
       */
      UserEditable?: boolean;

      /**
       * Whether a DevicePolicy for the property exists and allows the property to be edited (i.e. the policy set recommended property value). Defaults to `false`.
       */
      DeviceEditable?: boolean;
    }

    export interface ManagedProxySettingsType {

      /**
       * The active value currently used by the network configuration manager (e.g. Shill).
       */
      Active?: ProxySettingsType;

      /**
       * The source from which the effective property value was determined.
       */
      Effective?: string;

      /**
       * The property value provided by the user policy.
       */
      UserPolicy?: ProxySettingsType;

      /**
       * The property value provided by the device policy.
       */
      DevicePolicy?: ProxySettingsType;

      /**
       * The property value set by the logged in user. Only provided if `UserEditable` is `true`.
       */
      UserSetting?: ProxySettingsType;

      /**
       * The value set for all users of the device. Only provided if `DeviceEditiable` is `true`.
       */
      SharedSetting?: ProxySettingsType;

      /**
       * Whether a UserPolicy for the property exists and allows the property to be edited (i.e. the policy set recommended property value). Defaults to `false`.
       */
      UserEditable?: boolean;

      /**
       * Whether a DevicePolicy for the property exists and allows the property to be edited (i.e. the policy set recommended property value). Defaults to `false`.
       */
      DeviceEditable?: boolean;
    }

    export interface CellularProviderProperties {

      /**
       * The operator name.
       */
      Name: string;

      /**
       * Cellular network ID as a simple concatenation of the network's MCC (Mobile Country Code) and MNC (Mobile Network Code).
       */
      Code: string;

      /**
       * The two-letter country code.
       */
      Country?: string;
    }

    export interface IssuerSubjectPattern {

      /**
       * If set, the value against which to match the certificate subject's common name.
       */
      CommonName?: string;

      /**
       * If set, the value against which to match the certificate subject's common location.
       */
      Locality?: string;

      /**
       * If set, the value against which to match the certificate subject's organizations. At least one organization should match the value.
       */
      Organization?: string;

      /**
       * If set, the value against which to match the certificate subject's organizational units. At least one organizational unit should match the value.
       */
      OrganizationalUnit?: string;
    }

    export interface CertificatePattern {

      /**
       * List of URIs to which the user can be directed in case no certificates that match this pattern are found.
       */
      EnrollmentURI?: string[];

      /**
       * If set, pattern against which X.509 issuer settings should be matched.
       */
      Issuer?: IssuerSubjectPattern;

      /**
       * List of certificate issuer CA certificates. A certificate must be signed by one of them in order to match this pattern.
       */
      IssuerCARef?: string[];

      /**
       * If set, pattern against which X.509 subject settings should be matched.
       */
      Subject?: IssuerSubjectPattern;
    }

    export interface EAPProperties {

      AnonymousIdentity?: string;

      ClientCertPattern?: CertificatePattern;

      ClientCertPKCS11Id?: string;

      ClientCertProvisioningProfileId?: string;

      ClientCertRef?: string;

      ClientCertType: ClientCertificateType;

      Identity?: string;

      Inner?: string;

      /**
       * The outer EAP type. Required by ONC, but may not be provided when translating from Shill.
       */
      Outer?: string;

      Password?: string;

      SaveCredentials?: boolean;

      ServerCAPEMs?: string[];

      ServerCARefs?: string[];

      SubjectMatch?: ManagedDOMString;

      UseProactiveKeyCaching?: boolean;

      UseSystemCAs?: boolean;
    }

    export interface FoundNetworkProperties {

      /**
       * Network availability.
       */
      Status: string;

      /**
       * Network ID.
       */
      NetworkId: string;

      /**
       * Access technology used by the network.
       */
      Technology: string;

      /**
       * The network operator's short-format name.
       */
      ShortName?: string;

      /**
       * The network operator's long-format name.
       */
      LongName?: string;
    }

    export interface IPConfigProperties {

      /**
       * Gateway address used for the IP configuration.
       */
      Gateway?: string;

      /**
       * The IP address for a connection. Can be IPv4 or IPv6 address, depending on value of `Type`.
       */
      IPAddress?: string;

      /**
       * Array of IP blocks in CIDR notation, see onc\_spec.md for details.
       */
      ExcludedRoutes?: string[];

      /**
       * Array of IP blocks in CIDR notation, see onc\_spec.md for details.
       */
      IncludedRoutes?: string[];

      /**
       * Array of addresses used for name servers.
       */
      NameServers?: string[];

      /**
       * Array of strings for name resolution, see onc\_spec.md for details.
       */
      SearchDomains?: string[];

      /**
       * The routing prefix.
       */
      RoutingPrefix?: number;

      /**
       * The IP configuration type. Can be `IPv4` or `IPv6`.
       */
      Type?: string;

      /**
       * The URL for WEb Proxy Auto-Discovery, as reported over DHCP.
       */
      WebProxyAutoDiscoveryUrl?: string;
    }

    export interface ManagedIPConfigProperties {

      /**
       * See {@link IPConfigProperties.Gateway}.
       */
      Gateway?: ManagedDOMString;

      /**
       * See {@link IPConfigProperties.IPAddress}.
       */
      IPAddress?: ManagedDOMString;

      /**
       * See {@link IPConfigProperties.NameServers}.
       */
      NameServers?: ManagedDOMStringList;

      /**
       * See {@link IPConfigProperties.RoutingPrefix}.
       */
      RoutingPrefix?: ManagedLong;

      /**
       * See {@link IPConfigProperties.Type}.
       */
      Type?: ManagedDOMString;

      /**
       * See {@link IPConfigProperties.WebProxyAutoDiscoveryUrl}.
       */
      WebProxyAutoDiscoveryUrl?: ManagedDOMString;
    }

    export interface PaymentPortal {

      /**
       * The HTTP method to use for the payment portal.
       */
      Method: string;

      /**
       * The post data to send to the payment portal. Ignored unless `Method` is `POST`.
       */
      PostData?: string;

      /**
       * The payment portal URL.
       */
      Url?: string;
    }

    export interface ProxyLocation {

      /**
       * The proxy IP address host.
       */
      Host: string;

      /**
       * The port to use for the proxy.
       */
      Port: number;
    }

    export interface ManagedProxyLocation {

      /**
       * See {@link ProxyLocation.Host}.
       */
      Host: ManagedDOMString;

      /**
       * See {@link ProxyLocation.Port}.
       */
      Port: ManagedLong;
    }

    export interface ManualProxySettings {

      /**
       * Settings for HTTP proxy.
       */
      HTTPProxy?: ProxyLocation;

      /**
       * Settings for secure HTTP proxy.
       */
      SecureHTTPProxy?: ProxyLocation;

      /**
       * Settings for FTP proxy.
       */
      FTPProxy?: ProxyLocation;

      /**
       * Settings for SOCKS proxy.
       */
      SOCKS?: ProxyLocation;
    }

    export interface ManagedManualProxySettings {

      /**
       * See {@link ManualProxySettings.HTTPProxy}.
       */
      HTTPProxy?: ManagedProxyLocation;

      /**
       * See {@link ManualProxySettings.SecureHTTPProxy}.
       */
      SecureHTTPProxy?: ManagedProxyLocation;

      /**
       * See {@link ManualProxySettings.FTPProxy}.
       */
      FTPProxy?: ManagedProxyLocation;

      /**
       * See {@link ManualProxySettings.SOCKS}.
       */
      SOCKS?: ManagedProxyLocation;
    }

    export interface ProxySettings {

      /**
       * The type of proxy settings.
       */
      Type: ProxySettingsType;

      /**
       * Manual proxy settings - used only for `Manual` proxy settings.
       */
      Manual?: ManualProxySettings;

      /**
       * Domains and hosts for which manual proxy settings are excluded.
       */
      ExcludeDomains?: string[];

      /**
       * URL for proxy auto-configuration file.
       */
      PAC?: string;
    }

    export interface ManagedProxySettings {

      /**
       * See {@link ProxySettings.Type}.
       */
      Type: ManagedProxySettingsType;

      /**
       * See {@link ProxySettings.Manual}.
       */
      Manual?: ManagedManualProxySettings;

      /**
       * See {@link ProxySettings.ExcludeDomains}.
       */
      ExcludeDomains?: ManagedDOMStringList;

      /**
       * See {@link ProxySettings.PAC}.
       */
      PAC?: ManagedDOMString;
    }

    export interface SIMLockStatus {

      /**
       * The status of SIM lock - possible values are `'sim-pin'`, `'sim-puk'` and `''`.
       */
      LockType: string;

      /**
       * Whether SIM lock is enabled.
       */
      LockEnabled: boolean;

      /**
       * Number of PIN lock tries allowed before PUK is required to unlock the SIM.
       */
      RetriesLeft?: number;
    }

    export interface ThirdPartyVPNProperties {

      /**
       * ID of the third-party VPN provider extension.
       */
      ExtensionID: string;

      /**
       * The VPN provider name.
       */
      ProviderName?: string;
    }

    export interface ManagedThirdPartyVPNProperties {

      /**
       * See {@link ThirdPartyVPNProperties.ExtensionID}.
       */
      ExtensionID: ManagedDOMString;

      /**
       * See {@link ThirdPartyVPNProperties.ProviderName}.
       */
      ProviderName?: string;
    }

    export interface CellularProperties {

      /**
       * Whether the cellular network should be connected automatically (when in range).
       */
      AutoConnect?: boolean;

      /**
       * The cellular network activation type.
       */
      ActivationType?: string;

      /**
       * Carrier account activation state.
       */
      ActivationState?: ActivationStateType;

      /**
       * Whether roaming is allowed for the network.
       */
      AllowRoaming?: boolean;

      /**
       * Cellular device technology family - `CDMA` or `GSM`.
       */
      Family?: string;

      /**
       * The firmware revision loaded in the cellular modem.
       */
      FirmwareRevision?: string;

      /**
       * The list of networks found during the most recent network scan.
       */
      FoundNetworks?: FoundNetworkProperties[];

      /**
       * The cellular modem hardware revision.
       */
      HardwareRevision?: string;

      /**
       * Information about the operator that issued the SIM card currently installed in the modem.
       */
      HomeProvider?: CellularProviderProperties;

      /**
       * The cellular modem manufacturer.
       */
      Manufacturer?: string;

      /**
       * The cellular modem model ID.
       */
      ModelID?: string;

      /**
       * If the modem is registered on a network, the network technology currently in use.
       */
      NetworkTechnology?: string;

      /**
       * Online payment portal a user can use to sign-up for or modify a mobile data plan.
       */
      PaymentPortal?: PaymentPortal;

      /**
       * The roaming state of the cellular modem on the current network.
       */
      RoamingState?: string;

      /**
       * True when a cellular network scan is in progress.
       */
      Scanning?: boolean;

      /**
       * Information about the operator on whose network the modem is currently registered.
       */
      ServingOperator?: CellularProviderProperties;

      /**
       * The state of SIM lock for GSM family networks.
       */
      SIMLockStatus?: SIMLockStatus;

      /**
       * Whether a SIM card is present.
       */
      SIMPresent?: boolean;

      /**
       * The current network signal strength.
       */
      SignalStrength?: number;

      /**
       * Whether the cellular network supports scanning.
       */
      SupportNetworkScan?: boolean;
    }

    export interface ManagedCellularProperties {

      /**
       * See {@link CellularProperties.AutoConnect}.
       */
      AutoConnect?: ManagedBoolean;

      /**
       * See {@link CellularProperties.ActivationType}.
       */
      ActivationType?: string;

      /**
       * See {@link CellularProperties.ActivationState}.
       */
      ActivationState?: ActivationStateType;

      /**
       * See {@link CellularProperties.AllowRoaming}.
       */
      AllowRoaming?: boolean;

      /**
       * See {@link CellularProperties.Family}.
       */
      Family?: string;

      /**
       * See {@link CellularProperties.FirmwareRevision}.
       */
      FirmwareRevision?: string;

      /**
       * See {@link CellularProperties.FoundNetworks}.
       */
      FoundNetworks?: FoundNetworkProperties[];

      /**
       * See {@link CellularProperties.HardwareRevision}.
       */
      HardwareRevision?: string;

      /**
       * See {@link CellularProperties.HomeProvider}.
       */
      HomeProvider?: CellularProviderProperties[];

      /**
       * See {@link CellularProperties.Manufacturer}.
       */
      Manufacturer?: string;

      /**
       * See {@link CellularProperties.ModelID}.
       */
      ModelID?: string;

      /**
       * See {@link CellularProperties.NetworkTechnology}.
       */
      NetworkTechnology?: string;

      /**
       * See {@link CellularProperties.PaymentPortal}.
       */
      PaymentPortal?: PaymentPortal;

      /**
       * See {@link CellularProperties.RoamingState}.
       */
      RoamingState?: string;

      /**
       * See {@link CellularProperties.Scanning}.
       */
      Scanning?: boolean;

      /**
       * See {@link CellularProperties.ServingOperator}.
       */
      ServingOperator?: CellularProviderProperties;

      /**
       * See {@link CellularProperties.SIMLockStatus}.
       */
      SIMLockStatus?: SIMLockStatus;

      /**
       * See {@link CellularProperties.SIMPresent}.
       */
      SIMPresent?: boolean;

      /**
       * See {@link CellularProperties.SignalStrength}.
       */
      SignalStrength?: number;

      /**
       * See {@link CellularProperties.SupportNetworkScan}.
       */
      SupportNetworkScan?: boolean;
    }

    export interface CellularStateProperties {

      /**
       * See {@link CellularProperties.ActivationState}.
       */
      ActivationState?: ActivationStateType;

      /**
       * See {@link CellularProperties.NetworkTechnology}.
       */
      NetworkTechnology?: string;

      /**
       * See {@link CellularProperties.RoamingState}.
       */
      RoamingState?: string;

      /**
       * See {@link CellularProperties.SIMPresent}.
       */
      SIMPresent?: boolean;

      /**
       * See {@link CellularProperties.SignalStrength}.
       */
      SignalStrength?: number;
    }

    export interface EthernetProperties {

      /**
       * Whether the Ethernet network should be connected automatically.
       */
      AutoConnect?: boolean;

      /**
       * The authentication used by the Ethernet network. Possible values are `None` and `8021X`.
       */
      Authentication?: string;

      /**
       * Network's EAP settings. Required for 8021X authentication.
       */
      EAP?: EAPProperties;
    }

    export interface ManagedEthernetProperties {

      /**
       * See {@link EthernetProperties.AutoConnect}.
       */
      AutoConnect?: ManagedBoolean;

      /**
       * See {@link EthernetProperties.Authentication}.
       */
      Authentication?: ManagedDOMString;
    }

    export interface EthernetStateProperties {

      /**
       * See {@link EthernetProperties.Authentication}.
       */
      Authentication: string;
    }

    export interface VPNProperties {

      /**
       * Whether the VPN network should be connected automatically.
       */
      AutoConnect?: boolean;

      /**
       * The VPN host.
       */
      Host?: string;

      /**
       * The VPN type. This cannot be an enum because of 'L2TP-IPSec'. This is optional for NetworkConfigProperties which is passed to setProperties which may be used to set only specific properties.
       */
      Type?: string;
    }

    export interface ManagedVPNProperties {

      /**
       * See {@link VPNProperties.AutoConnect}.
       */
      AutoConnect?: ManagedBoolean;

      /**
       * See {@link VPNProperties.Host}.
       */
      Host?: ManagedDOMString;

      /**
       * See {@link VPNProperties.Type}.
       */
      Type?: ManagedDOMString;
    }

    export interface VPNStateProperties {

      /**
       * See {@link VPNProperties.Type}.
       */
      Type: string;
    }

    export interface WiFiProperties {

      /**
       * Whether ARP polling of default gateway is allowed. Defaults to true.
       */
      AllowGatewayARPPolling?: boolean;

      /**
       * Whether the WiFi network should be connected automatically when in range.
       */
      AutoConnect?: boolean;

      /**
       * The BSSID of the associated access point..
       */
      BSSID?: string;

      /**
       * The network EAP properties. Required for `WEP-8021X` and `WPA-EAP` networks.
       */
      EAP?: EAPProperties;

      /**
       * The WiFi service operating frequency in MHz. For connected networks, the current frequency on which the network is connected. Otherwise, the frequency of the best available BSS.
       */
      Frequency?: number;

      /**
       * Contains all operating frequency recently seen for the WiFi network.
       */
      FrequencyList?: number[];

      /**
       * HEX-encoded copy of the network SSID.
       */
      HexSSID?: string;

      /**
       * Whether the network SSID will be broadcast.
       */
      HiddenSSID?: boolean;

      /**
       * The passphrase for WEP/WPA/WPA2 connections. This property can only be set - properties returned by {@link getProperties} will not contain this value.
       */
      Passphrase?: string;

      /**
       * Deprecated, ignored.
       */
      RoamThreshold?: number;

      /**
       * The network SSID.
       */
      SSID?: string;

      /**
       * The network security type.
       */
      Security?: string;

      /**
       * The network signal strength.
       */
      SignalStrength?: number;
    }

    export interface ManagedWiFiProperties {

      /**
       * See {@link WiFiProperties.AllowGatewayARPPolling}.
       */
      AllowGatewayARPPolling?: ManagedBoolean;

      /**
       * See {@link WiFiProperties.AutoConnect}.
       */
      AutoConnect?: ManagedBoolean;

      /**
       * See {@link WiFiProperties.BSSID}.
       */
      BSSID?: string;

      /**
       * See {@link WiFiProperties.Frequency}.
       */
      Frequency?: number;

      /**
       * See {@link WiFiProperties.FrequencyList}.
       */
      FrequencyList?: number[];

      /**
       * See {@link WiFiProperties.HexSSID}.
       */
      HexSSID?: ManagedDOMString;

      /**
       * See {@link WiFiProperties.HiddenSSID}.
       */
      HiddenSSID?: ManagedBoolean;

      /**
       * Deprecated, ignored. See {@link WiFiProperties.RoamThreshold}.
       */
      RoamThreshold?: ManagedLong;

      /**
       * See {@link WiFiProperties.SSID}.
       */
      SSID?: ManagedDOMString;

      /**
       * See {@link WiFiProperties.Security}.
       */
      Security: ManagedDOMString;

      /**
       * See {@link WiFiProperties.SignalStrength}.
       */
      SignalStrength?: number;
    }

    export interface WiFiStateProperties {

      /**
       * See {@link WiFiProperties.BSSID}.
       */
      BSSID?: string;

      /**
       * See {@link WiFiProperties.Frequency}.
       */
      Frequency?: number;

      /**
       * See {@link WiFiProperties.HexSSID}.
       */
      HexSSID?: string;

      /**
       * See {@link WiFiProperties.Security}.
       */
      Security: string;

      /**
       * See {@link WiFiProperties.SignalStrength}.
       */
      SignalStrength?: number;

      /**
       * See {@link WiFiProperties.SSID}.
       */
      SSID?: string;
    }

    export interface WiMAXProperties {

      /**
       * Whether the network should be connected automatically.
       */
      AutoConnect?: boolean;

      /**
       * The network EAP properties.
       */
      EAP?: EAPProperties;
    }

    export interface NetworkConfigProperties {

      /**
       * See {@link NetworkProperties.Cellular}.
       */
      Cellular?: CellularProperties;

      /**
       * See {@link NetworkProperties.Ethernet}.
       */
      Ethernet?: EthernetProperties;

      /**
       * See {@link NetworkProperties.GUID}.
       */
      GUID?: string;

      /**
       * See {@link NetworkProperties.IPAddressConfigType}.
       */
      IPAddressConfigType?: IPConfigType;

      /**
       * See {@link NetworkProperties.Name}.
       */
      Name?: string;

      /**
       * See {@link NetworkProperties.NameServersConfigType}.
       */
      NameServersConfigType?: IPConfigType;

      /**
       * See {@link NetworkProperties.Priority}.
       */
      Priority?: number;

      /**
       * See {@link NetworkProperties.Type}.
       */
      Type?: NetworkType;

      /**
       * See {@link NetworkProperties.VPN}.
       */
      VPN?: VPNProperties;

      /**
       * See {@link NetworkProperties.WiFi}.
       */
      WiFi?: WiFiProperties;

      /**
       * Deprecated.
       */
      WiMAX?: WiMAXProperties;
    }

    export interface NetworkProperties {

      /**
       * For cellular networks, cellular network properties.
       */
      Cellular?: CellularProperties;

      /**
       * Whether the network is connectable.
       */
      Connectable?: boolean;

      /**
       * The network's current connection state.
       */
      ConnectionState?: ConnectionStateType;

      /**
       * The last recorded network error state.
       */
      ErrorState?: string;

      /**
       * For Ethernet networks, the Ethernet network properties.
       */
      Ethernet?: EthernetProperties;

      /**
       * The network GUID.
       */
      GUID: string;

      /**
       * The network's IP address configuration type.
       */
      IPAddressConfigType?: IPConfigType;

      /**
       * The network's IP configuration.
       */
      IPConfigs?: IPConfigProperties[];

      /**
       * The network's MAC address.
       */
      MacAddress?: string;

      /**
       * Whether the network is metered.
       */
      Metered?: boolean;

      /**
       * A user friendly network name.
       */
      Name?: string;

      /**
       * The IP configuration type for the name servers used by the network.
       */
      NameServersConfigType?: IPConfigType;

      /**
       * The network priority.
       */
      Priority?: number;

      /**
       * The network's proxy settings.
       */
      ProxySettings?: ProxySettings;

      /**
       * For a connected network, whether the network connectivity to the Internet is limited, e.g. if the network is behind a portal, or a cellular network is not activated.
       */
      RestrictedConnectivity?: boolean;

      /**
       * The network's static IP configuration.
       */
      StaticIPConfig?: IPConfigProperties;

      /**
       * IP configuration that was received from the DHCP server before applying static IP configuration.
       */
      SavedIPConfig?: IPConfigProperties;

      /**
       * Indicates whether and how the network is configured. Possible values are:
       *
       * *   `Device`
       * *   `DevicePolicy`
       * *   `User`
       * *   `UserPolicy`
       * *   `None`
       *
       * 'None' conflicts with extension code generation so we must use a string for 'Source' instead of a SourceType enum.
       */
      Source?: string;

      /**
       * The network type.
       */
      Type: NetworkType;

      /**
       * For VPN networks, the network VPN properties.
       */
      VPN?: VPNProperties;

      /**
       * For WiFi networks, the network WiFi properties.
       */
      WiFi?: WiFiProperties;
    }

    export interface ManagedProperties {

      /**
       * See {@link NetworkProperties.Cellular}.
       */
      Cellular?: ManagedCellularProperties;

      /**
       * See {@link NetworkProperties.Connectable}.
       */
      Connectable?: boolean;

      /**
       * See {@link NetworkProperties.ConnectionState}.
       */
      ConnectionState?: ConnectionStateType;

      /**
       * See {@link NetworkProperties.ErrorState}.
       */
      ErrorState?: string;

      /**
       * See {@link NetworkProperties.Ethernet}.
       */
      Ethernet?: ManagedEthernetProperties;

      /**
       * See {@link NetworkProperties.GUID}.
       */
      GUID: string;

      /**
       * See {@link NetworkProperties.IPAddressConfigType}.
       */
      IPAddressConfigType?: ManagedIPConfigType;

      /**
       * See {@link NetworkProperties.IPConfigs}.
       */
      IPConfigs?: IPConfigProperties[];

      /**
       * See {@link NetworkProperties.MacAddress}.
       */
      MacAddress?: string;

      /**
       * See {@link NetworkProperties.Metered}.
       */
      Metered?: ManagedBoolean;

      /**
       * See {@link NetworkProperties.Name}.
       */
      Name?: ManagedDOMString;

      /**
       * See {@link NetworkProperties.NameServersConfigType}.
       */
      NameServersConfigType?: ManagedIPConfigType;

      /**
       * See {@link NetworkProperties.Priority}.
       */
      Priority?: ManagedLong;

      /**
       * See {@link NetworkProperties.ProxySettings}.
       */
      ProxySettings?: ManagedProxySettings;

      /**
       * See {@link NetworkProperties.RestrictedConnectivity}.
       */
      RestrictedConnectivity?: boolean;

      /**
       * See {@link NetworkProperties.StaticIPConfig}.
       */
      StaticIPConfig?: ManagedIPConfigProperties;

      /**
       * See {@link NetworkProperties.SavedIPConfig}.
       */
      SavedIPConfig?: IPConfigProperties;

      /**
       * See {@link NetworkProperties.Source}.
       */
      Source?: string;

      /**
       * See {@link NetworkProperties.Type}.
       */
      Type: NetworkType;

      /**
       * See {@link NetworkProperties.VPN}.
       */
      VPN?: ManagedVPNProperties;

      /**
       * See {@link NetworkProperties.WiFi}.
       */
      WiFi?: ManagedWiFiProperties;
    }

    export interface NetworkStateProperties {

      /**
       * See {@link NetworkProperties.Cellular}.
       */
      Cellular?: CellularStateProperties;

      /**
       * See {@link NetworkProperties.Connectable}.
       */
      Connectable?: boolean;

      /**
       * See {@link NetworkProperties.ConnectionState}.
       */
      ConnectionState?: ConnectionStateType;

      /**
       * See {@link NetworkProperties.Ethernet}.
       */
      Ethernet?: EthernetStateProperties;

      /**
       * See {@link NetworkProperties.ErrorState}.
       */
      ErrorState?: string;

      /**
       * See {@link NetworkProperties.GUID}.
       */
      GUID: string;

      /**
       * See {@link NetworkProperties.Name}.
       */
      Name?: string;

      /**
       * See {@link NetworkProperties.Priority}.
       */
      Priority?: number;

      /**
       * See {@link NetworkProperties.Source}.
       */
      Source?: string;

      /**
       * See {@link NetworkProperties.Type}.
       */
      Type: NetworkType;

      /**
       * See {@link NetworkProperties.VPN}.
       */
      VPN?: VPNStateProperties;

      /**
       * See {@link NetworkProperties.WiFi}.
       */
      WiFi?: WiFiStateProperties;
    }

    export interface DeviceStateProperties {

      /**
       * Set if the device is enabled. True if the device is currently scanning.
       */
      Scanning?: boolean;

      /**
       * The SIM lock status if Type = Cellular and SIMPresent = True.
       */
      SIMLockStatus?: SIMLockStatus;

      /**
       * Set to the SIM present state if the device type is Cellular.
       */
      SIMPresent?: boolean;

      /**
       * The current state of the device.
       */
      State: DeviceStateType;

      /**
       * The network type associated with the device (Cellular, Ethernet or WiFi).
       */
      Type: NetworkType;
    }

    export interface NetworkFilter {

      /**
       * The type of networks to return.
       */
      networkType: NetworkType;

      /**
       * If true, only include visible (physically connected or in-range) networks. Defaults to 'false'.
       */
      visible?: boolean;

      /**
       * If true, only include configured (saved) networks. Defaults to 'false'.
       */
      configured?: boolean;

      /**
       * Maximum number of networks to return. Defaults to 1000 if unspecified. Use 0 for no limit.
       */
      limit?: number;
    }

    export interface GlobalPolicy {

      /**
       * If true, only policy networks may auto connect. Defaults to false.
       */
      AllowOnlyPolicyNetworksToAutoconnect?: boolean;

      /**
       * If true, only policy networks may be connected to and no new networks may be added or configured. Defaults to false.
       */
      AllowOnlyPolicyNetworksToConnect?: boolean;

      /**
       * If true and a managed network is available in the visible network list, only policy networks may be connected to and no new networks may be added or configured. Defaults to false.
       */
      AllowOnlyPolicyNetworksToConnectIfAvailable?: boolean;

      /**
       * List of blocked networks. Connections to blocked networks are prohibited. Networks can be unblocked again by specifying an explicit network configuration. Defaults to an empty list.
       */
      BlockedHexSSIDs?: string[];
    }

    /**
     * Fired when the properties change on any of the networks. Sends a list of GUIDs for networks whose properties have changed.
     */
    export const onNetworksChanged: events.Event<(
      changes: string[],
    ) => void>;

    /**
     * Fired when the list of networks has changed. Sends a complete list of GUIDs for all the current networks.
     */
    export const onNetworkListChanged: events.Event<(
      changes: string[],
    ) => void>;

    /**
     * Fired when the list of devices has changed or any device state properties have changed.
     */
    export const onDeviceStateListChanged: events.Event<() => void>;

    /**
     * Fired when a portal detection for a network completes. Sends the GUID of the network and the corresponding captive portal status.
     */
    export const onPortalDetectionCompleted: events.Event<(
      networkGuid: string,
      status: CaptivePortalStatus,
    ) => void>;

    /**
     * Gets all the properties of the network with id networkGuid. Includes all properties of the network (read-only and read/write values).
     *
     * @param networkGuid The GUID of the network to get properties for.
     * @param callback Called with the network properties when received.
     */
    export function getProperties(

      networkGuid: string,

      callback: (
        result: NetworkProperties,
      ) => void,
    ): void;

    /**
     * Gets the merged properties of the network with id networkGuid from the sources: User settings, shared settings, user policy, device policy and the currently active settings.
     *
     * @param networkGuid The GUID of the network to get properties for.
     * @param callback Called with the managed network properties when received.
     */
    export function getManagedProperties(

      networkGuid: string,

      callback: (
        result: ManagedProperties,
      ) => void,
    ): void;

    /**
     * Gets the cached read-only properties of the network with id networkGuid. This is meant to be a higher performance function than {@link getProperties}, which requires a round trip to query the networking subsystem. The following properties are returned for all networks: GUID, Type, Name, WiFi.Security. Additional properties are provided for visible networks: ConnectionState, ErrorState, WiFi.SignalStrength, Cellular.NetworkTechnology, Cellular.ActivationState, Cellular.RoamingState.
     *
     * @param networkGuid The GUID of the network to get properties for.
     * @param callback Called immediately with the network state properties.
     */
    export function getState(

      networkGuid: string,

      callback: (
        result: NetworkStateProperties,
      ) => void,
    ): void;

    /**
     * Sets the properties of the network with id `networkGuid`. This is only valid for configured networks (Source != None). Unconfigured visible networks should use {@link createNetwork} instead. **In kiosk sessions, calling this method on a shared network will fail.**
     *
     * @param networkGuid The GUID of the network to set properties for.
     * @param properties The properties to set.
     * @param callback Called when the operation has completed.
     */
    export function setProperties(

      networkGuid: string,

      properties: NetworkConfigProperties,

      callback?: () => void,
    ): void;

    /**
     * Creates a new network configuration from properties. If a matching configured network already exists, this will fail. Otherwise returns the GUID of the new network.
     *
     * @param shared

    If `true`, share this network configuration with other users.

    **This option is exposed only to Chrome's Web UI.** When called by apps, `false` is the only allowed value.
     * @param properties The properties to configure the new network with.
     * @param callback Called with the GUID for the new network configuration once the network has been created.
     */
    export function createNetwork(

      shared: boolean,

      properties: NetworkConfigProperties,

      callback?: (
        result: string,
      ) => void,
    ): void;

    /**
     * Forgets a network configuration by clearing any configured properties for the network with GUID `networkGuid`. This may also include any other networks with matching identifiers (e.g. WiFi SSID and Security). If no such configuration exists, an error will be set and the operation will fail.
     *
     * **In kiosk sessions, this method will not be able to forget shared network configurations.**
     *
     * @param networkGuid The GUID of the network to forget.
     * @param callback Called when the operation has completed.
     */
    export function forgetNetwork(

      networkGuid: string,

      callback?: () => void,
    ): void;

    /**
     * Returns a list of network objects with the same properties provided by {@link getState}. A filter is provided to specify the type of networks returned and to limit the number of networks. Networks are ordered by the system based on their priority, with connected or connecting networks listed first.
     *
     * @param filter Describes which networks to return.
     * @param callback Called with a dictionary of networks and their state properties when received.
     */
    export function getNetworks(

      filter: NetworkFilter,

      callback: (
        result: NetworkStateProperties[],
      ) => void,
    ): void;

    /**
     * Returns states of available networking devices.
     *
     * @param callback Called with a list of devices and their state.
     */
    export function getDeviceStates(

      callback: (
        result: DeviceStateProperties[],
      ) => void,
    ): void;

    /**
     * Enables any devices matching the specified network type. Note, the type might represent multiple network types (e.g. 'Wireless').
     *
     * @param networkType The type of network to enable.
     */
    export function enableNetworkType(

      networkType: NetworkType,
    ): void;

    /**
     * Disables any devices matching the specified network type. See note for {@link enableNetworkType}.
     *
     * @param networkType The type of network to disable.
     */
    export function disableNetworkType(

      networkType: NetworkType,
    ): void;

    /**
     * Requests that the networking subsystem scan for new networks and update the list returned by {@link getVisibleNetworks}. This is only a request: the network subsystem can choose to ignore it. If the list is updated, then the {@link onNetworkListChanged} event will be fired.
     *
     * @param networkType If provided, requests a scan specific to the type. For Cellular a mobile network scan will be requested if supported.
     */
    export function requestNetworkScan(

      networkType?: NetworkType,
    ): void;

    /**
     * Starts a connection to the network with networkGuid.
     *
     * @param networkGuid The GUID of the network to connect to.
     * @param callback Called when the connect request has been sent. Note: the connection may not have completed. Observe {@link onNetworksChanged} to be notified when a network state changes. If the connect request immediately failed (e.g. the network is unconfigured), {@link runtime.lastError} will be set with a failure reason.
     */
    export function startConnect(

      networkGuid: string,

      callback?: () => void,
    ): void;

    /**
     * Starts a disconnect from the network with networkGuid.
     *
     * @param networkGuid The GUID of the network to disconnect from.
     * @param callback Called when the disconnect request has been sent. See note for {@link startConnect}.
     */
    export function startDisconnect(

      networkGuid: string,

      callback?: () => void,
    ): void;

    /**
     * Returns captive portal status for the network matching 'networkGuid'.
     *
     * @param networkGuid The GUID of the network to get captive portal status for.
     * @param callback A callback function that returns the results of the query for network captive portal status.
     */
    export function getCaptivePortalStatus(

      networkGuid: string,

      callback: (
        result: CaptivePortalStatus,
      ) => void,
    ): void;

    /**
     * Gets the global policy properties. These properties are not expected to change during a session.
     */
    export function getGlobalPolicy(

      callback: (
        result: GlobalPolicy,
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.notifications` API to create rich notifications using templates and show these notifications to users in the system tray.
   *
   * @chrome-permission notifications
   */
  export namespace notifications {

    /**
     * @chrome-enum "basic" Contains an icon, title, message, expandedMessage, and up to two buttons.
     * @chrome-enum "image" Contains an icon, title, message, expandedMessage, image, and up to two buttons.
     * @chrome-enum "list" Contains an icon, title, message, items, and up to two buttons. Users on Mac OS X only see the first item.
     * @chrome-enum "progress" Contains an icon, title, message, progress, and up to two buttons.
     */
    export type TemplateType = "basic" | "image" | "list" | "progress";

    /**
     * @chrome-enum "granted" Specifies that the user has elected to show notifications from the app or extension. This is the default at install time.
     * @chrome-enum "denied" Specifies that the user has elected not to show notifications from the app or extension.
     */
    export type PermissionLevel = "granted" | "denied";

    export interface NotificationItem {

      /**
       * Title of one item of a list notification.
       */
      title: string;

      /**
       * Additional details about this item.
       */
      message: string;
    }

    export interface NotificationBitmap {
    }

    export interface NotificationButton {

      title: string;

      /**
       * @deprecated Button icons not visible for Mac OS X users.
       * @chrome-deprecated-since Chrome 59
       */
      iconUrl?: string;
    }

    export interface NotificationOptions {

      /**
       * Which type of notification to display. _Required for {@link notifications.create}_ method.
       */
      type?: TemplateType;

      /**
       * A URL to the sender's avatar, app icon, or a thumbnail for image notifications.
       *
       * URLs can be a data URL, a blob URL, or a URL relative to a resource within this extension's .crx file
       *
       * **Note:**This value is required for the {@link notifications.create}`()` method.
       */
      iconUrl?: string;

      /**
       * A URL to the app icon mask. URLs have the same restrictions as {@link notifications.NotificationOptions.iconUrl iconUrl}.
       *
       * The app icon mask should be in alpha channel, as only the alpha channel of the image will be considered.
       *
       * @deprecated The app icon mask is not visible for Mac OS X users.
       * @chrome-deprecated-since Chrome 59
       */
      appIconMaskUrl?: string;

      /**
       * Title of the notification (e.g. sender name for email).
       *
       * **Note:**This value is required for the {@link notifications.create}`()` method.
       */
      title?: string;

      /**
       * Main notification content.
       *
       * **Note:**This value is required for the {@link notifications.create}`()` method.
       */
      message?: string;

      /**
       * Alternate notification content with a lower-weight font.
       */
      contextMessage?: string;

      /**
       * Priority ranges from -2 to 2. -2 is lowest priority. 2 is highest. Zero is default. On platforms that don't support a notification center (Windows, Linux & Mac), -2 and -1 result in an error as notifications with those priorities will not be shown at all.
       */
      priority?: number;

      /**
       * A timestamp associated with the notification, in milliseconds past the epoch (e.g. `Date.now() + n`).
       */
      eventTime?: number;

      /**
       * Text and icons for up to two notification action buttons.
       */
      buttons?: NotificationButton[];

      /**
       * A URL to the image thumbnail for image-type notifications. URLs have the same restrictions as {@link notifications.NotificationOptions.iconUrl iconUrl}.
       *
       * @deprecated The image is not visible for Mac OS X users.
       * @chrome-deprecated-since Chrome 59
       */
      imageUrl?: string;

      /**
       * Items for multi-item notifications. Users on Mac OS X only see the first item.
       */
      items?: NotificationItem[];

      /**
       * Current progress ranges from 0 to 100.
       */
      progress?: number;

      /**
       * @deprecated This UI hint is ignored as of Chrome 67
       * @chrome-deprecated-since Chrome 67
       */
      isClickable?: boolean;

      /**
       * Indicates that the notification should remain visible on screen until the user activates or dismisses the notification. This defaults to false.
       *
       * @since Chrome 50
       */
      requireInteraction?: boolean;

      /**
       * Indicates that no sounds or vibrations should be made when the notification is being shown. This defaults to false.
       *
       * @since Chrome 70
       */
      silent?: boolean;
    }

    /**
     * The notification closed, either by the system or by user action.
     */
    export const onClosed: events.Event<(
      notificationId: string,
      byUser: boolean,
    ) => void>;

    /**
     * The user clicked in a non-button area of the notification.
     */
    export const onClicked: events.Event<(
      notificationId: string,
    ) => void>;

    /**
     * The user pressed a button in the notification.
     */
    export const onButtonClicked: events.Event<(
      notificationId: string,
      buttonIndex: number,
    ) => void>;

    /**
     * The user changes the permission level. As of Chrome 47, only ChromeOS has UI that dispatches this event.
     */
    export const onPermissionLevelChanged: events.Event<(
      level: PermissionLevel,
    ) => void>;

    /**
     * The user clicked on a link for the app's notification settings. As of Chrome 47, only ChromeOS has UI that dispatches this event. As of Chrome 65, that UI has been removed from ChromeOS, too.
     *
     * @deprecated Custom notification settings button is no longer supported.
     * @chrome-deprecated-since Chrome 65
     */
    export const onShowSettings: events.Event<() => void>;

    /**
     * Creates and displays a notification.
     *
     * @chrome-returns-extra since Chrome 116
     * @param notificationId

    Identifier of the notification. If not set or empty, an ID will automatically be generated. If it matches an existing notification, this method first clears that notification before proceeding with the create operation. The identifier may not be longer than 500 characters.

    The `notificationId` parameter is required before Chrome 42.
     * @param options Contents of the notification.
     */
    export function create(

      notificationId: string,

      options: NotificationOptions,
    ): Promise<string>;

    /**
     * Creates and displays a notification.
     *
     * @chrome-returns-extra since Chrome 116
     * @param options Contents of the notification.
     */
    export function create(

      options: NotificationOptions,
    ): Promise<string>;

    /**
     * Creates and displays a notification.
     *
     * @param notificationId

    Identifier of the notification. If not set or empty, an ID will automatically be generated. If it matches an existing notification, this method first clears that notification before proceeding with the create operation. The identifier may not be longer than 500 characters.

    The `notificationId` parameter is required before Chrome 42.
     * @param options Contents of the notification.
     * @param callback

    Returns the notification id (either supplied or generated) that represents the created notification.

    The callback is required before Chrome 42.
     */
    export function create(

      notificationId: string,

      options: NotificationOptions,

      callback?: (
        notificationId: string,
      ) => void,
    ): void;

    /**
     * Creates and displays a notification.
     *
     * @param options Contents of the notification.
     * @param callback

    Returns the notification id (either supplied or generated) that represents the created notification.

    The callback is required before Chrome 42.
     */
    export function create(

      options: NotificationOptions,

      callback?: (
        notificationId: string,
      ) => void,
    ): void;

    /**
     * Updates an existing notification.
     *
     * @chrome-returns-extra since Chrome 116
     * @param notificationId The id of the notification to be updated. This is returned by {@link notifications.create} method.
     * @param options Contents of the notification to update to.
     */
    export function update(

      notificationId: string,

      options: NotificationOptions,
    ): Promise<boolean>;

    /**
     * Updates an existing notification.
     *
     * @param notificationId The id of the notification to be updated. This is returned by {@link notifications.create} method.
     * @param options Contents of the notification to update to.
     * @param callback

    Called to indicate whether a matching notification existed.

    The callback is required before Chrome 42.
     */
    export function update(

      notificationId: string,

      options: NotificationOptions,

      callback?: (
        wasUpdated: boolean,
      ) => void,
    ): void;

    /**
     * Clears the specified notification.
     *
     * @chrome-returns-extra since Chrome 116
     * @param notificationId The id of the notification to be cleared. This is returned by {@link notifications.create} method.
     */
    export function clear(

      notificationId: string,
    ): Promise<boolean>;

    /**
     * Clears the specified notification.
     *
     * @param notificationId The id of the notification to be cleared. This is returned by {@link notifications.create} method.
     * @param callback

    Called to indicate whether a matching notification existed.

    The callback is required before Chrome 42.
     */
    export function clear(

      notificationId: string,

      callback?: (
        wasCleared: boolean,
      ) => void,
    ): void;

    /**
     * Retrieves all the notifications of this app or extension.
     *
     * @chrome-returns-extra since Chrome 116
     */
    export function getAll(): Promise<{[name: string]: any}>;

    /**
     * Retrieves all the notifications of this app or extension.
     *
     * @param callback Returns the set of notification\_ids currently in the system.
     */
    export function getAll(

      callback?: (
        notifications: {[name: string]: any},
      ) => void,
    ): void;

    /**
     * Retrieves whether the user has enabled notifications from this app or extension.
     *
     * @chrome-returns-extra since Chrome 116
     */
    export function getPermissionLevel(): Promise<PermissionLevel>;

    /**
     * Retrieves whether the user has enabled notifications from this app or extension.
     *
     * @param callback Returns the current permission level.
     */
    export function getPermissionLevel(

      callback?: (
        level: PermissionLevel,
      ) => void,
    ): void;
  }

  /**
   * Stub namespace for the "oauth2" manifest key.
   *
   * @since Chrome 93
   */
  export namespace oauth2 {

    export interface OAuth2Info {

      /**
       * Client ID of the corresponding extension/app.
       */
      client_id?: string;

      /**
       * Scopes the extension/app needs access to.
       */
      scopes: string[];
    }
  }

  /**
   * Use the `offscreen` API to create and manage offscreen documents.
   *
   * @since Chrome 109
   * @chrome-permission offscreen
   * @chrome-min-manifest MV3
   */
  export namespace offscreen {

    /**
     * @chrome-enum "TESTING" A reason used for testing purposes only.
     * @chrome-enum "AUDIO\_PLAYBACK" Specifies that the offscreen document is responsible for playing audio.
     * @chrome-enum "IFRAME\_SCRIPTING" Specifies that the offscreen document needs to embed and script an iframe in order to modify the iframe's content.
     * @chrome-enum "DOM\_SCRAPING" Specifies that the offscreen document needs to embed an iframe and scrape its DOM to extract information.
     * @chrome-enum "BLOBS" Specifies that the offscreen document needs to interact with Blob objects (including `URL.createObjectURL()`).
     * @chrome-enum "DOM\_PARSER" Specifies that the offscreen document needs to use the [DOMParser API](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser).
     * @chrome-enum "USER\_MEDIA" Specifies that the offscreen document needs to interact with media streams from user media (e.g. `getUserMedia()`).
     * @chrome-enum "DISPLAY\_MEDIA" Specifies that the offscreen document needs to interact with media streams from display media (e.g. `getDisplayMedia()`).
     * @chrome-enum "WEB\_RTC" Specifies that the offscreen document needs to use [WebRTC APIs](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API).
     * @chrome-enum "CLIPBOARD" Specifies that the offscreen document needs to interact with the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).
     * @chrome-enum "LOCAL\_STORAGE" Specifies that the offscreen document needs access to [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
     * @chrome-enum "WORKERS" Specifies that the offscreen document needs to spawn workers.
     * @chrome-enum "BATTERY\_STATUS" Specifies that the offscreen document needs to use [navigator.getBattery](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API).
     * @chrome-enum "MATCH\_MEDIA" Specifies that the offscreen document needs to use [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).
     * @chrome-enum "GEOLOCATION" Specifies that the offscreen document needs to use [navigator.geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation).
     */
    export type Reason = "TESTING" | "AUDIO_PLAYBACK" | "IFRAME_SCRIPTING" | "DOM_SCRAPING" | "BLOBS" | "DOM_PARSER" | "USER_MEDIA" | "DISPLAY_MEDIA" | "WEB_RTC" | "CLIPBOARD" | "LOCAL_STORAGE" | "WORKERS" | "BATTERY_STATUS" | "MATCH_MEDIA" | "GEOLOCATION";

    export interface CreateParameters {

      /**
       * The reason(s) the extension is creating the offscreen document.
       */
      reasons: Reason[];

      /**
       * The (relative) URL to load in the document.
       */
      url: string;

      /**
       * A developer-provided string that explains, in more detail, the need for the background context. The user agent \_may\_ use this in display to the user.
       */
      justification: string;
    }

    /**
     * Creates a new offscreen document for the extension.
     *
     * @param parameters The parameters describing the offscreen document to create.
     */
    export function createDocument(

      parameters: CreateParameters,
    ): Promise<void>;

    /**
     * Creates a new offscreen document for the extension.
     *
     * @param parameters The parameters describing the offscreen document to create.
     * @param callback Invoked when the offscreen document is created and has completed its initial page load.
     */
    export function createDocument(

      parameters: CreateParameters,

      callback?: () => void,
    ): void;

    /**
     * Closes the currently-open offscreen document for the extension.
     */
    export function closeDocument(): Promise<void>;

    /**
     * Closes the currently-open offscreen document for the extension.
     *
     * @param callback Invoked when the offscreen document has been closed.
     */
    export function closeDocument(

      callback?: () => void,
    ): void;
  }

  /**
   * The omnibox API allows you to register a keyword with Google Chrome's address bar, which is also known as the omnibox.
   *
   * @chrome-manifest omnibox
   */
  export namespace omnibox {

    /**
     * The style type.
     *
     * @since Chrome 44
     */
    export type DescriptionStyleType = "url" | "match" | "dim";

    /**
     * The window disposition for the omnibox query. This is the recommended context to display results. For example, if the omnibox command is to navigate to a certain URL, a disposition of 'newForegroundTab' means the navigation should take place in a new selected tab.
     *
     * @since Chrome 44
     */
    export type OnInputEnteredDisposition = "currentTab" | "newForegroundTab" | "newBackgroundTab";

    /**
     * A suggest result.
     */
    export interface SuggestResult {

      /**
       * The text that is put into the URL bar, and that is sent to the extension when the user chooses this entry.
       */
      content: string;

      /**
       * The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. dimmed match. You must escape the five predefined entities to display them as text: stackoverflow.com/a/1091953/89484
       */
      description: string;

      /**
       * Whether the suggest result can be deleted by the user.
       *
       * @since Chrome 63
       */
      deletable?: boolean;
    }

    /**
     * A suggest result.
     */
    export interface DefaultSuggestResult {

      /**
       * The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. dimmed match.
       */
      description: string;
    }

    /**
     * User has started a keyword input session by typing the extension's keyword. This is guaranteed to be sent exactly once per input session, and before any onInputChanged events.
     */
    export const onInputStarted: events.Event<() => void>;

    /**
     * User has changed what is typed into the omnibox.
     */
    export const onInputChanged: events.Event<(
      text: string,
      /**
       * @param suggestResults Array of suggest results
       */
      suggest: (
        suggestResults: SuggestResult[],
      ) => void,
    ) => void>;

    /**
     * User has accepted what is typed into the omnibox.
     */
    export const onInputEntered: events.Event<(
      text: string,
      disposition: OnInputEnteredDisposition,
    ) => void>;

    /**
     * User has ended the keyword input session without accepting the input.
     */
    export const onInputCancelled: events.Event<() => void>;

    /**
     * User has deleted a suggested result.
     *
     * @since Chrome 63
     */
    export const onDeleteSuggestion: events.Event<(
      text: string,
    ) => void>;

    /**
     * Sets the description and styling for the default suggestion. The default suggestion is the text that is displayed in the first suggestion row underneath the URL bar.
     *
     * @chrome-returns-extra since Chrome 100
     * @param suggestion A partial SuggestResult object, without the 'content' parameter.
     */
    export function setDefaultSuggestion(

      suggestion: DefaultSuggestResult,
    ): Promise<void>;

    /**
     * Sets the description and styling for the default suggestion. The default suggestion is the text that is displayed in the first suggestion row underneath the URL bar.
     *
     * @param suggestion A partial SuggestResult object, without the 'content' parameter.
     */
    export function setDefaultSuggestion(

      suggestion: DefaultSuggestResult,

      /**
       * @since Chrome 100
       */
      callback?: () => void,
    ): void;
  }

  /**
   * Use the `chrome.pageCapture` API to save a tab as MHTML.
   *
   * @chrome-permission pageCapture
   */
  export namespace pageCapture {

    /**
     * Saves the content of the tab with given id as MHTML.
     *
     * @chrome-returns-extra since Chrome 116
     */
    export function saveAsMHTML(

      details: {

        /**
         * The id of the tab to save as MHTML.
         */
        tabId: number,
      },
    ): Promise<ArrayBuffer | undefined>;

    /**
     * Saves the content of the tab with given id as MHTML.
     *
     * @param callback Called when the MHTML has been generated.
     */
    export function saveAsMHTML(

      details: {

        /**
         * The id of the tab to save as MHTML.
         */
        tabId: number,
      },

      /**
       * @param mhtmlData The MHTML data as a Blob.
       */
      callback?: (
        mhtmlData?: ArrayBuffer,
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.permissions` API to request [declared optional permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions) at run time rather than install time, so users understand why the permissions are needed and grant only those that are necessary.
   */
  export namespace permissions {

    export interface Permissions {

      /**
       * List of named permissions (does not include hosts or origins).
       */
      permissions?: string[];

      /**
       * The list of host permissions, including those specified in the `optional_permissions` or `permissions` keys in the manifest, and those associated with [Content Scripts](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts).
       */
      origins?: string[];
    }

    /**
     * Fired when the extension acquires new permissions.
     */
    export const onAdded: events.Event<(
      permissions: Permissions,
    ) => void>;

    /**
     * Fired when access to permissions has been removed from the extension.
     */
    export const onRemoved: events.Event<(
      permissions: Permissions,
    ) => void>;

    /**
     * Gets the extension's current set of permissions.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function getAll(): Promise<Permissions>;

    /**
     * Gets the extension's current set of permissions.
     */
    export function getAll(

      /**
       * @param permissions The extension's active permissions. Note that the `origins` property will contain granted origins from those specified in the `permissions` and `optional_permissions` keys in the manifest and those associated with [Content Scripts](https://developer.chrome.com/docs/extensions/content_scripts).
       */
      callback?: (
        permissions: Permissions,
      ) => void,
    ): void;

    /**
     * Checks if the extension has the specified permissions.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function contains(

      permissions: Permissions,
    ): Promise<boolean>;

    /**
     * Checks if the extension has the specified permissions.
     */
    export function contains(

      permissions: Permissions,

      /**
       * @param result True if the extension has the specified permissions. If an origin is specified as both an optional permission and a content script match pattern, this will return `false` unless both permissions are granted.
       */
      callback?: (
        result: boolean,
      ) => void,
    ): void;

    /**
     * Requests access to the specified permissions, displaying a prompt to the user if necessary. These permissions must either be defined in the `optional_permissions` field of the manifest or be required permissions that were withheld by the user. Paths on origin patterns will be ignored. You can request subsets of optional origin permissions; for example, if you specify `*://*\/*` in the `optional_permissions` section of the manifest, you can request `http://example.com/`. If there are any problems requesting the permissions, {@link runtime.lastError} will be set.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function request(

      permissions: Permissions,
    ): Promise<boolean>;

    /**
     * Requests access to the specified permissions, displaying a prompt to the user if necessary. These permissions must either be defined in the `optional_permissions` field of the manifest or be required permissions that were withheld by the user. Paths on origin patterns will be ignored. You can request subsets of optional origin permissions; for example, if you specify `*://*\/*` in the `optional_permissions` section of the manifest, you can request `http://example.com/`. If there are any problems requesting the permissions, {@link runtime.lastError} will be set.
     */
    export function request(

      permissions: Permissions,

      /**
       * @param granted True if the user granted the specified permissions.
       */
      callback?: (
        granted: boolean,
      ) => void,
    ): void;

    /**
     * Removes access to the specified permissions. If there are any problems removing the permissions, {@link runtime.lastError} will be set.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function remove(

      permissions: Permissions,
    ): Promise<boolean>;

    /**
     * Removes access to the specified permissions. If there are any problems removing the permissions, {@link runtime.lastError} will be set.
     */
    export function remove(

      permissions: Permissions,

      /**
       * @param removed True if the permissions were removed.
       */
      callback?: (
        removed: boolean,
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.platformKeys` API to access client certificates managed by the platform. If the user or policy grants the permission, an extension can use such a certficate in its custom authentication protocol. E.g. this allows usage of platform managed certificates in third party VPNs (see {@link vpnProvider chrome.vpnProvider}).
   *
   * @since Chrome 45
   * @chrome-permission platformKeys
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace platformKeys {

    export interface Match {

      /**
       * The DER encoding of a X.509 certificate.
       */
      certificate: ArrayBuffer;

      /**
       * The [KeyAlgorithm](https://www.w3.org/TR/WebCryptoAPI/#key-algorithm-dictionary) of the certified key. This contains algorithm parameters that are inherent to the key of the certificate (e.g. the key length). Other parameters like the hash function used by the sign function are not included.
       */
      keyAlgorithm: {[name: string]: any};
    }

    export type ClientCertificateType = "rsaSign" | "ecdsaSign";

    export interface ClientCertificateRequest {

      /**
       * This field is a list of the types of certificates requested, sorted in order of the server's preference. Only certificates of a type contained in this list will be retrieved. If `certificateTypes` is the empty list, however, certificates of any type will be returned.
       */
      certificateTypes: ClientCertificateType[];

      /**
       * List of distinguished names of certificate authorities allowed by the server. Each entry must be a DER-encoded X.509 DistinguishedName.
       */
      certificateAuthorities: ArrayBuffer[];
    }

    export interface SelectDetails {

      /**
       * Only certificates that match this request will be returned.
       */
      request: ClientCertificateRequest;

      /**
       * If given, the `selectClientCertificates` operates on this list. Otherwise, obtains the list of all certificates from the platform's certificate stores that are available to this extensions. Entries that the extension doesn't have permission for or which doesn't match the request, are removed.
       */
      clientCerts?: ArrayBuffer[];

      /**
       * If true, the filtered list is presented to the user to manually select a certificate and thereby granting the extension access to the certificate(s) and key(s). Only the selected certificate(s) will be returned. If is false, the list is reduced to all certificates that the extension has been granted access to (automatically or manually).
       */
      interactive: boolean;
    }

    export interface VerificationDetails {

      /**
       * Each chain entry must be the DER encoding of a X.509 certificate, the first entry must be the server certificate and each entry must certify the entry preceding it.
       */
      serverCertificateChain: ArrayBuffer[];

      /**
       * The hostname of the server to verify the certificate for, e.g. the server that presented the `serverCertificateChain`.
       */
      hostname: string;
    }

    export interface VerificationResult {

      /**
       * The result of the trust verification: true if trust for the given verification details could be established and false if trust is rejected for any reason.
       */
      trusted: boolean;

      /**
       * If the trust verification failed, this array contains the errors reported by the underlying network layer. Otherwise, this array is empty.
       *
       * **Note:** This list is meant for debugging only and may not contain all relevant errors. The errors returned may change in future revisions of this API, and are not guaranteed to be forwards or backwards compatible.
       */
      debug_errors: string[];
    }

    /**
     * This method filters from a list of client certificates the ones that are known to the platform, match `request` and for which the extension has permission to access the certificate and its private key. If `interactive` is true, the user is presented a dialog where they can select from matching certificates and grant the extension access to the certificate. The selected/filtered client certificates will be passed to `callback`.
     *
     * @chrome-returns-extra since Chrome 121
     */
    export function selectClientCertificates(

      details: SelectDetails,
    ): Promise<Match[]>;

    /**
     * This method filters from a list of client certificates the ones that are known to the platform, match `request` and for which the extension has permission to access the certificate and its private key. If `interactive` is true, the user is presented a dialog where they can select from matching certificates and grant the extension access to the certificate. The selected/filtered client certificates will be passed to `callback`.
     */
    export function selectClientCertificates(

      details: SelectDetails,

      /**
       * @param matches The list of certificates that match the request, that the extension has permission for and, if `interactive` is true, that were selected by the user.
       */
      callback?: (
        matches: Match[],
      ) => void,
    ): void;

    /**
     * Passes the key pair of `certificate` for usage with {@link platformKeys.subtleCrypto} to `callback`.
     *
     * @param certificate The certificate of a {@link Match} returned by {@link selectClientCertificates}.
     * @param parameters Determines signature/hash algorithm parameters additionally to the parameters fixed by the key itself. The same parameters are accepted as by WebCrypto's [importKey](https://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-importKey) function, e.g. `RsaHashedImportParams` for a RSASSA-PKCS1-v1\_5 key and `EcKeyImportParams` for EC key. Additionally for RSASSA-PKCS1-v1\_5 keys, hashing algorithm name parameter can be specified with one of the following values: "none", "SHA-1", "SHA-256", "SHA-384", or "SHA-512", e.g. `{"hash": { "name": "none" } }`. The sign function will then apply PKCS#1 v1.5 padding but not hash the given data.

    Currently, this method only supports the "RSASSA-PKCS1-v1\_5" and "ECDSA" algorithms.
     * @param callback The public and private [CryptoKey](https://www.w3.org/TR/WebCryptoAPI/#dfn-CryptoKey) of a certificate which can only be used with {@link platformKeys.subtleCrypto}.
     */
    export function getKeyPair(

      certificate: ArrayBuffer,

      parameters: {[name: string]: any},

      /**
       * @param privateKey Might be `null` if this extension does not have access to it.
       */
      callback: (
        publicKey: {[name: string]: any},
        privateKey?: {[name: string]: any},
      ) => void,
    ): void;

    /**
     * Passes the key pair identified by `publicKeySpkiDer` for usage with {@link platformKeys.subtleCrypto} to `callback`.
     *
     * @param publicKeySpkiDer A DER-encoded X.509 SubjectPublicKeyInfo, obtained e.g. by calling WebCrypto's exportKey function with format="spki".
     * @param parameters Provides signature and hash algorithm parameters, in addition to those fixed by the key itself. The same parameters are accepted as by WebCrypto's [importKey](https://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-importKey) function, e.g. `RsaHashedImportParams` for a RSASSA-PKCS1-v1\_5 key. For RSASSA-PKCS1-v1\_5 keys, we need to also pass a "hash" parameter `{ "hash": { "name": string } }`. The "hash" parameter represents the name of the hashing algorithm to be used in the digest operation before a sign. It is possible to pass "none" as the hash name, in which case the sign function will apply PKCS#1 v1.5 padding and but not hash the given data.

    Currently, this method supports the "ECDSA" algorithm with named-curve P-256 and "RSASSA-PKCS1-v1\_5" algorithm with one of the hashing algorithms "none", "SHA-1", "SHA-256", "SHA-384", and "SHA-512".
     * @param callback The public and private [CryptoKey](https://www.w3.org/TR/WebCryptoAPI/#dfn-CryptoKey) of a certificate which can only be used with {@link platformKeys.subtleCrypto}.
     * @since Chrome 85
     */
    export function getKeyPairBySpki(

      publicKeySpkiDer: ArrayBuffer,

      parameters: {[name: string]: any},

      /**
       * @param privateKey Might be `null` if this extension does not have access to it.
       */
      callback: (
        publicKey: {[name: string]: any},
        privateKey?: {[name: string]: any},
      ) => void,
    ): void;

    /**
     * An implementation of WebCrypto's [SubtleCrypto](https://www.w3.org/TR/WebCryptoAPI/#subtlecrypto-interface) that allows crypto operations on keys of client certificates that are available to this extension.
     */
    export function subtleCrypto(): {[name: string]: any} | undefined;

    /**
     * Checks whether `details.serverCertificateChain` can be trusted for `details.hostname` according to the trust settings of the platform. Note: The actual behavior of the trust verification is not fully specified and might change in the future. The API implementation verifies certificate expiration, validates the certification path and checks trust by a known CA. The implementation is supposed to respect the EKU serverAuth and to support subject alternative names.
     *
     * @chrome-returns-extra since Chrome 121
     */
    export function verifyTLSServerCertificate(

      details: VerificationDetails,
    ): Promise<VerificationResult>;

    /**
     * Checks whether `details.serverCertificateChain` can be trusted for `details.hostname` according to the trust settings of the platform. Note: The actual behavior of the trust verification is not fully specified and might change in the future. The API implementation verifies certificate expiration, validates the certification path and checks trust by a known CA. The implementation is supposed to respect the EKU serverAuth and to support subject alternative names.
     */
    export function verifyTLSServerCertificate(

      details: VerificationDetails,

      callback?: (
        result: VerificationResult,
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.power` API to override the system's power management features.
   *
   * @chrome-permission power
   */
  export namespace power {

    /**
     * @chrome-enum "system" Prevents the system from sleeping in response to user inactivity.
     * @chrome-enum "display" Prevents the display from being turned off or dimmed, or the system from sleeping in response to user inactivity.
     */
    export type Level = "system" | "display";

    /**
     * Requests that power management be temporarily disabled. `level` describes the degree to which power management should be disabled. If a request previously made by the same app is still active, it will be replaced by the new request.
     */
    export function requestKeepAwake(

      level: Level,
    ): void;

    /**
     * Releases a request previously made via requestKeepAwake().
     */
    export function releaseKeepAwake(): void;

    /**
     * Reports a user activity in order to awake the screen from a dimmed or turned off state or from a screensaver. Exits the screensaver if it is currently active.
     *
     * @since Chrome 113
     * @chrome-platform chromeos
     * @chrome-platform lacros
     */
    export function reportActivity(): Promise<void>;

    /**
     * Reports a user activity in order to awake the screen from a dimmed or turned off state or from a screensaver. Exits the screensaver if it is currently active.
     *
     * @since Chrome 113
     * @chrome-platform chromeos
     * @chrome-platform lacros
     */
    export function reportActivity(

      callback?: () => void,
    ): void;
  }

  /**
   * The `chrome.printerProvider` API exposes events used by print manager to query printers controlled by extensions, to query their capabilities and to submit print jobs to these printers.
   *
   * @since Chrome 44
   * @chrome-permission printerProvider
   */
  export namespace printerProvider {

    /**
     * Error codes returned in response to {@link onPrintRequested} event.
     *
     * @chrome-enum "OK" Specifies that the operation was completed successfully.
     * @chrome-enum "FAILED" Specifies that a general failure occured.
     * @chrome-enum "INVALID\_TICKET" Specifies that the print ticket is invalid. For example, the ticket is inconsistent with some capabilities, or the extension is not able to handle all settings from the ticket.
     * @chrome-enum "INVALID\_DATA" Specifies that the document is invalid. For example, data may be corrupted or the format is incompatible with the extension.
     */
    export type PrintError = "OK" | "FAILED" | "INVALID_TICKET" | "INVALID_DATA";

    export interface PrinterInfo {

      /**
       * Unique printer ID.
       */
      id: string;

      /**
       * Printer's human readable name.
       */
      name: string;

      /**
       * Printer's human readable description.
       */
      description?: string;
    }

    export interface PrintJob {

      /**
       * ID of the printer which should handle the job.
       */
      printerId: string;

      /**
       * The print job title.
       */
      title: string;

      /**
       * Print ticket in [CJT format](https://developers.google.com/cloud-print/docs/cdd#cjt).
       *
       * The CJT reference is marked as deprecated. It is deprecated for Google Cloud Print only. is not deprecated for ChromeOS printing.
       */
      ticket: {[name: string]: any};

      /**
       * The document content type. Supported formats are `"application/pdf"` and `"image/pwg-raster"`.
       */
      contentType: string;

      /**
       * Blob containing the document data to print. Format must match `contentType`.
       */
      document: Blob;
    }

    /**
     * Event fired when print manager requests printers provided by extensions.
     */
    export const onGetPrintersRequested: events.Event<(
      resultCallback: (
        printerInfo: PrinterInfo[],
      ) => void,
    ) => void>;

    /**
     * Event fired when print manager requests information about a USB device that may be a printer.
     *
     * _Note:_ An application should not rely on this event being fired more than once per device. If a connected device is supported it should be returned in the {@link onGetPrintersRequested} event.
     *
     * @since Chrome 45
     */
    export const onGetUsbPrinterInfoRequested: events.Event<(
      device: usb.Device,
      resultCallback: (
        printerInfo?: PrinterInfo,
      ) => void,
    ) => void>;

    /**
     * Event fired when print manager requests printer capabilities.
     */
    export const onGetCapabilityRequested: events.Event<(
      printerId: string,
      /**
       * @param capabilities Device capabilities in [CDD format](https://developers.google.com/cloud-print/docs/cdd#cdd).
       */
      resultCallback: (
        capabilities: {[name: string]: any},
      ) => void,
    ) => void>;

    /**
     * Event fired when print manager requests printing.
     */
    export const onPrintRequested: events.Event<(
      printJob: PrintJob,
      resultCallback: (
        result: PrintError,
      ) => void,
    ) => void>;
  }

  /**
   * Use the `chrome.printing` API to send print jobs to printers installed on Chromebook.
   *
   * @since Chrome 81
   * @chrome-permission printing
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace printing {

    export interface SubmitJobRequest {

      /**
       * The print job to be submitted. The only supported content type is "application/pdf", and the [Cloud Job Ticket](https://developers.google.com/cloud-print/docs/cdd#cjt) shouldn't include `FitToPageTicketItem`, `PageRangeTicketItem`, `ReverseOrderTicketItem` and `VendorTicketItem` fields since they are irrelevant for native printing. All other fields must be present.
       */
      job: printerProvider.PrintJob;
    }

    /**
     * The status of {@link submitJob} request.
     *
     * @chrome-enum "OK" Sent print job request is accepted.
     * @chrome-enum "USER\_REJECTED" Sent print job request is rejected by the user.
     */
    export type SubmitJobStatus = "OK" | "USER_REJECTED";

    export interface SubmitJobResponse {

      /**
       * The status of the request.
       */
      status: SubmitJobStatus;

      /**
       * The id of created print job. This is a unique identifier among all print jobs on the device. If status is not OK, jobId will be null.
       */
      jobId?: string;
    }

    /**
     * The source of the printer.
     *
     * @chrome-enum "USER" Printer was added by user.
     * @chrome-enum "POLICY" Printer was added via policy.
     */
    export type PrinterSource = "USER" | "POLICY";

    export interface Printer {

      /**
       * The printer's identifier; guaranteed to be unique among printers on the device.
       */
      id: string;

      /**
       * The name of the printer.
       */
      name: string;

      /**
       * The human-readable description of the printer.
       */
      description: string;

      /**
       * The printer URI. This can be used by extensions to choose the printer for the user.
       */
      uri: string;

      /**
       * The source of the printer (user or policy configured).
       */
      source: PrinterSource;

      /**
       * The flag which shows whether the printer fits [DefaultPrinterSelection](https://chromium.org/administrators/policy-list-3#DefaultPrinterSelection) rules. Note that several printers could be flagged.
       */
      isDefault: boolean;

      /**
       * The value showing how recent the printer was used for printing from Chrome. The lower the value is the more recent the printer was used. The minimum value is 0. Missing value indicates that the printer wasn't used recently. This value is guaranteed to be unique amongst printers.
       */
      recentlyUsedRank?: number;
    }

    /**
     * The status of the printer.
     *
     * @chrome-enum "DOOR\_OPEN" The door of the printer is open. Printer still accepts print jobs.
     * @chrome-enum "TRAY\_MISSING" The tray of the printer is missing. Printer still accepts print jobs.
     * @chrome-enum "OUT\_OF\_INK" The printer is out of ink. Printer still accepts print jobs.
     * @chrome-enum "OUT\_OF\_PAPER" The printer is out of paper. Printer still accepts print jobs.
     * @chrome-enum "OUTPUT\_FULL" The output area of the printer (e.g. tray) is full. Printer still accepts print jobs.
     * @chrome-enum "PAPER\_JAM" The printer has a paper jam. Printer still accepts print jobs.
     * @chrome-enum "GENERIC\_ISSUE" Some generic issue. Printer still accepts print jobs.
     * @chrome-enum "STOPPED" The printer is stopped and doesn't print but still accepts print jobs.
     * @chrome-enum "UNREACHABLE" The printer is unreachable and doesn't accept print jobs.
     * @chrome-enum "EXPIRED\_CERTIFICATE" The SSL certificate is expired. Printer accepts jobs but they fail.
     * @chrome-enum "AVAILABLE" The printer is available.
     */
    export type PrinterStatus = "DOOR_OPEN" | "TRAY_MISSING" | "OUT_OF_INK" | "OUT_OF_PAPER" | "OUTPUT_FULL" | "PAPER_JAM" | "GENERIC_ISSUE" | "STOPPED" | "UNREACHABLE" | "EXPIRED_CERTIFICATE" | "AVAILABLE";

    export interface GetPrinterInfoResponse {

      /**
       * Printer capabilities in [CDD format](https://developers.google.com/cloud-print/docs/cdd#cdd). The property may be missing.
       */
      capabilities?: {[name: string]: any};

      /**
       * The status of the printer.
       */
      status: PrinterStatus;
    }

    /**
     * Status of the print job.
     *
     * @chrome-enum "PENDING" Print job is received on Chrome side but was not processed yet.
     * @chrome-enum "IN\_PROGRESS" Print job is sent for printing.
     * @chrome-enum "FAILED" Print job was interrupted due to some error.
     * @chrome-enum "CANCELED" Print job was canceled by the user or via API.
     * @chrome-enum "PRINTED" Print job was printed without any errors.
     */
    export type JobStatus = "PENDING" | "IN_PROGRESS" | "FAILED" | "CANCELED" | "PRINTED";

    /**
     * The maximum number of times that {@link submitJob} can be called per minute.
     */
    export const MAX_SUBMIT_JOB_CALLS_PER_MINUTE: 40;

    /**
     * The maximum number of times that {@link getPrinterInfo} can be called per minute.
     */
    export const MAX_GET_PRINTER_INFO_CALLS_PER_MINUTE: 20;

    /**
     * Event fired when the status of the job is changed. This is only fired for the jobs created by this extension.
     */
    export const onJobStatusChanged: events.Event<(
      jobId: string,
      status: JobStatus,
    ) => void>;

    /**
     * Submits the job for printing. If the extension is not listed in the [`PrintingAPIExtensionsAllowlist`](https://chromeenterprise.google/policies/#PrintingAPIExtensionsAllowlist) policy, the user is prompted to accept the print job.
     * Before Chrome 120, this function did not return a promise.
     *
     * @chrome-returns-extra since Chrome 100
     */
    export function submitJob(

      request: SubmitJobRequest,
    ): Promise<SubmitJobResponse>;

    /**
     * Submits the job for printing. If the extension is not listed in the [`PrintingAPIExtensionsAllowlist`](https://chromeenterprise.google/policies/#PrintingAPIExtensionsAllowlist) policy, the user is prompted to accept the print job.
     * Before Chrome 120, this function did not return a promise.
     */
    export function submitJob(

      request: SubmitJobRequest,

      callback?: (
        response: SubmitJobResponse,
      ) => void,
    ): void;

    /**
     * Cancels previously submitted job.
     *
     * @chrome-returns-extra since Chrome 100
     * @param jobId The id of the print job to cancel. This should be the same id received in a {@link SubmitJobResponse}.
     */
    export function cancelJob(

      jobId: string,
    ): Promise<void>;

    /**
     * Cancels previously submitted job.
     *
     * @param jobId The id of the print job to cancel. This should be the same id received in a {@link SubmitJobResponse}.
     */
    export function cancelJob(

      jobId: string,

      callback?: () => void,
    ): void;

    /**
     * Returns the list of available printers on the device. This includes manually added, enterprise and discovered printers.
     *
     * @chrome-returns-extra since Chrome 100
     */
    export function getPrinters(): Promise<Printer[]>;

    /**
     * Returns the list of available printers on the device. This includes manually added, enterprise and discovered printers.
     */
    export function getPrinters(

      callback?: (
        printers: Printer[],
      ) => void,
    ): void;

    /**
     * Returns the status and capabilities of the printer in [CDD format](https://developers.google.com/cloud-print/docs/cdd#cdd). This call will fail with a runtime error if no printers with given id are installed.
     *
     * @chrome-returns-extra since Chrome 100
     */
    export function getPrinterInfo(

      printerId: string,
    ): Promise<GetPrinterInfoResponse>;

    /**
     * Returns the status and capabilities of the printer in [CDD format](https://developers.google.com/cloud-print/docs/cdd#cdd). This call will fail with a runtime error if no printers with given id are installed.
     */
    export function getPrinterInfo(

      printerId: string,

      callback?: (
        response: GetPrinterInfoResponse,
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.printingMetrics` API to fetch data about printing usage.
   *
   * @since Chrome 79
   * @chrome-permission printingMetrics
   * @chrome-install-location policy
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace printingMetrics {

    /**
     * The source of the print job.
     *
     * @chrome-enum "PRINT\_PREVIEW" Specifies that the job was created from the Print Preview page initiated by the user.
     * @chrome-enum "ANDROID\_APP" Specifies that the job was created from an Android App.
     * @chrome-enum "EXTENSION" Specifies that the job was created by extension via Chrome API.
     * @chrome-enum "ISOLATED\_WEB\_APP" Specifies that the job was created by an Isolated Web App via API.
     */
    export type PrintJobSource = "PRINT_PREVIEW" | "ANDROID_APP" | "EXTENSION" | "ISOLATED_WEB_APP";

    /**
     * Specifies the final status of the print job.
     *
     * @chrome-enum "FAILED" Specifies that the print job was interrupted due to some error.
     * @chrome-enum "CANCELED" Specifies that the print job was canceled by the user or via API.
     * @chrome-enum "PRINTED" Specifies that the print job was printed without any errors.
     */
    export type PrintJobStatus = "FAILED" | "CANCELED" | "PRINTED";

    /**
     * The source of the printer.
     *
     * @chrome-enum "USER" Specifies that the printer was added by user.
     * @chrome-enum "POLICY" Specifies that the printer was added via policy.
     */
    export type PrinterSource = "USER" | "POLICY";

    /**
     * @chrome-enum "BLACK\_AND\_WHITE" Specifies that black and white mode was used.
     * @chrome-enum "COLOR" Specifies that color mode was used.
     */
    export type ColorMode = "BLACK_AND_WHITE" | "COLOR";

    /**
     * @chrome-enum "ONE\_SIDED" Specifies that one-sided printing was used.
     * @chrome-enum "TWO\_SIDED\_LONG\_EDGE" Specifies that two-sided printing was used, flipping on long edge.
     * @chrome-enum "TWO\_SIDED\_SHORT\_EDGE" Specifies that two-sided printing was used, flipping on short edge.
     */
    export type DuplexMode = "ONE_SIDED" | "TWO_SIDED_LONG_EDGE" | "TWO_SIDED_SHORT_EDGE";

    export interface MediaSize {

      /**
       * Width (in micrometers) of the media used for printing.
       */
      width: number;

      /**
       * Height (in micrometers) of the media used for printing.
       */
      height: number;

      /**
       * Vendor-provided ID, e.g. "iso\_a3\_297x420mm" or "na\_index-3x5\_3x5in". Possible values are values of "media" IPP attribute and can be found on [IANA page](https://www.iana.org/assignments/ipp-registrations/ipp-registrations.xhtml) .
       */
      vendorId: string;
    }

    export interface PrintSettings {

      /**
       * The requested color mode.
       */
      color: ColorMode;

      /**
       * The requested duplex mode.
       */
      duplex: DuplexMode;

      /**
       * The requested media size.
       */
      mediaSize: MediaSize;

      /**
       * The requested number of copies.
       */
      copies: number;
    }

    export interface Printer {

      /**
       * Displayed name of the printer.
       */
      name: string;

      /**
       * The full path for the printer. Contains protocol, hostname, port, and queue.
       */
      uri: string;

      /**
       * The source of the printer.
       */
      source: PrinterSource;
    }

    export interface PrintJobInfo {

      /**
       * The ID of the job.
       */
      id: string;

      /**
       * The title of the document which was printed.
       */
      title: string;

      /**
       * Source showing who initiated the print job.
       */
      source: PrintJobSource;

      /**
       * ID of source. Null if source is PRINT\_PREVIEW or ANDROID\_APP.
       */
      sourceId?: string;

      /**
       * The final status of the job.
       */
      status: PrintJobStatus;

      /**
       * The job creation time (in milliseconds past the Unix epoch).
       */
      creationTime: number;

      /**
       * The job completion time (in milliseconds past the Unix epoch).
       */
      completionTime: number;

      /**
       * The info about the printer which printed the document.
       */
      printer: Printer;

      /**
       * The settings of the print job.
       */
      settings: PrintSettings;

      /**
       * The number of pages in the document.
       */
      numberOfPages: number;

      /**
       * The status of the printer.
       *
       * @since Chrome 85
       */
      printer_status: printing.PrinterStatus;
    }

    /**
     * Event fired when the print job is finished. This includes any of termination statuses: FAILED, CANCELED and PRINTED.
     */
    export const onPrintJobFinished: events.Event<(
      jobInfo: PrintJobInfo,
    ) => void>;

    /**
     * Returns the list of the finished print jobs.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function getPrintJobs(): Promise<PrintJobInfo[]>;

    /**
     * Returns the list of the finished print jobs.
     */
    export function getPrintJobs(

      callback?: (
        jobs: PrintJobInfo[],
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.privacy` API to control usage of the features in Chrome that can affect a user's privacy. This API relies on the [ChromeSetting prototype of the type API](https://developer.chrome.com/docs/extensions/reference/types/#ChromeSetting) for getting and setting Chrome's configuration.
   *
   * @chrome-permission privacy
   */
  export namespace privacy {

    /**
     * The IP handling policy of WebRTC.
     *
     * @since Chrome 48
     */
    export type IPHandlingPolicy = "default" | "default_public_and_private_interfaces" | "default_public_interface_only" | "disable_non_proxied_udp";

    /**
     * Settings that influence Chrome's handling of network connections in general.
     */
    export const network: {

      /**
       * If enabled, Chrome attempts to speed up your web browsing experience by pre-resolving DNS entries and preemptively opening TCP and SSL connections to servers. This preference only affects actions taken by Chrome's internal prediction service. It does not affect webpage-initiated prefectches or preconnects. This preference's value is a boolean, defaulting to `true`.
       */
      networkPredictionEnabled: types.ChromeSetting<boolean>,

      /**
       * Allow users to specify the media performance/privacy tradeoffs which impacts how WebRTC traffic will be routed and how much local address information is exposed. This preference's value is of type IPHandlingPolicy, defaulting to `default`.
       *
       * @since Chrome 48
       */
      webRTCIPHandlingPolicy: types.ChromeSetting<IPHandlingPolicy>,
    };

    /**
     * Settings that enable or disable features that require third-party network services provided by Google and your default search provider.
     */
    export const services: {

      /**
       * If enabled, Chrome uses a web service to help resolve navigation errors. This preference's value is a boolean, defaulting to `true`.
       */
      alternateErrorPagesEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome offers to automatically fill in forms. This preference's value is a boolean, defaulting to `true`.
       *
       * @deprecated Please use privacy.services.autofillAddressEnabled and privacy.services.autofillCreditCardEnabled. This remains for backward compatibility in this release and will be removed in the future.
       * @chrome-deprecated-since Chrome 70
       */
      autofillEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome offers to automatically fill in addresses and other form data. This preference's value is a boolean, defaulting to `true`.
       *
       * @since Chrome 70
       */
      autofillAddressEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome offers to automatically fill in credit card forms. This preference's value is a boolean, defaulting to `true`.
       *
       * @since Chrome 70
       */
      autofillCreditCardEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, the password manager will ask if you want to save passwords. This preference's value is a boolean, defaulting to `true`.
       */
      passwordSavingEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome does its best to protect you from phishing and malware. This preference's value is a boolean, defaulting to `true`.
       */
      safeBrowsingEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome will send additional information to Google when SafeBrowsing blocks a page, such as the content of the blocked page. This preference's value is a boolean, defaulting to `false`.
       */
      safeBrowsingExtendedReportingEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome sends the text you type into the Omnibox to your default search engine, which provides predictions of websites and searches that are likely completions of what you've typed so far. This preference's value is a boolean, defaulting to `true`.
       */
      searchSuggestEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome uses a web service to help correct spelling errors. This preference's value is a boolean, defaulting to `false`.
       */
      spellingServiceEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome offers to translate pages that aren't in a language you read. This preference's value is a boolean, defaulting to `true`.
       */
      translationServiceEnabled: types.ChromeSetting<boolean>,
    };

    /**
     * Settings that determine what information Chrome makes available to websites.
     */
    export const websites: {

      /**
       * If disabled, Chrome blocks third-party sites from setting cookies. The value of this preference is of type boolean, and the default value is `true`.
       */
      thirdPartyCookiesAllowed: types.ChromeSetting<boolean>,

      /**
       * If disabled, the [Topics API](https://developer.chrome.com/en/docs/privacy-sandbox/topics/) is deactivated. The value of this preference is of type boolean, and the default value is `true`. Extensions may only disable this API by setting the value to `false`. If you try setting this API to `true`, it will throw an error.
       *
       * @since Chrome 111
       */
      topicsEnabled: types.ChromeSetting<boolean>,

      /**
       * If disabled, the [Fledge API](https://developer.chrome.com/docs/privacy-sandbox/fledge/) is deactivated. The value of this preference is of type boolean, and the default value is `true`. Extensions may only disable this API by setting the value to `false`. If you try setting this API to `true`, it will throw an error.
       *
       * @since Chrome 111
       */
      fledgeEnabled: types.ChromeSetting<boolean>,

      /**
       * If disabled, the [Attribution Reporting API](https://developer.chrome.com/en/docs/privacy-sandbox/attribution-reporting/) and [Private Aggregation API](https://developer.chrome.com/docs/privacy-sandbox/private-aggregation/) are deactivated. The value of this preference is of type boolean, and the default value is `true`. Extensions may only disable these APIs by setting the value to `false`. If you try setting these APIs to `true`, it will throw an error.
       *
       * @since Chrome 111
       */
      adMeasurementEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome sends auditing pings when requested by a website (`<a ping>`). The value of this preference is of type boolean, and the default value is `true`.
       */
      hyperlinkAuditingEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome sends `referer` headers with your requests. Yes, the name of this preference doesn't match the misspelled header. No, we're not going to change it. The value of this preference is of type boolean, and the default value is `true`.
       */
      referrersEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome sends 'Do Not Track' (`DNT: 1`) header with your requests. The value of this preference is of type boolean, and the default value is `false`.
       *
       * @since Chrome 65
       */
      doNotTrackEnabled: types.ChromeSetting<boolean>,

      /**
       * **Available on Windows and ChromeOS only**: If enabled, Chrome provides a unique ID to plugins in order to run protected content. The value of this preference is of type boolean, and the default value is `true`.
       */
      protectedContentEnabled: types.ChromeSetting<boolean>,

      /**
       * If disabled, [Related Website Sets](https://developer.chrome.com/docs/privacy-sandbox/related-website-sets/) is deactivated. The value of this preference is of type boolean, and the default value is `true`. Extensions may only disable this API by setting the value to `false`. If you try setting this API to `true`, it will throw an error.
       *
       * @since Chrome 121
       */
      relatedWebsiteSetsEnabled: types.ChromeSetting<boolean>,
    };
  }

  /**
   * Use the `chrome.processes` API to interact with the browser's processes.
   *
   * @alpha
   * @chrome-permission processes
   * @chrome-channel dev
   */
  export namespace processes {

    /**
     * The types of the browser processes.
     */
    export type ProcessType = "browser" | "renderer" | "extension" | "notification" | "plugin" | "worker" | "nacl" | "service_worker" | "utility" | "gpu" | "other";

    export interface TaskInfo {

      /**
       * The title of the task.
       */
      title: string;

      /**
       * Optional tab ID, if this task represents a tab running on a renderer process.
       */
      tabId?: number;
    }

    export interface Cache {

      /**
       * The size of the cache, in bytes.
       */
      size: number;

      /**
       * The part of the cache that is utilized, in bytes.
       */
      liveSize: number;
    }

    export interface Process {

      /**
       * Unique ID of the process provided by the browser.
       */
      id: number;

      /**
       * The ID of the process, as provided by the OS.
       */
      osProcessId: number;

      /**
       * The type of process.
       */
      type: ProcessType;

      /**
       * The profile which the process is associated with.
       */
      profile: string;

      /**
       * The debugging port for Native Client processes. Zero for other process types and for NaCl processes that do not have debugging enabled.
       */
      naclDebugPort: number;

      /**
       * Array of TaskInfos representing the tasks running on this process.
       */
      tasks: TaskInfo[];

      /**
       * The most recent measurement of the process's CPU usage, expressed as the percentage of a single CPU core used in total, by all of the process's threads. This gives a value from zero to CpuInfo.numOfProcessors\*100, which can exceed 100% in multi-threaded processes. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.
       */
      cpu?: number;

      /**
       * The most recent measurement of the process network usage, in bytes per second. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.
       */
      network?: number;

      /**
       * The most recent measurement of the process private memory usage, in bytes. Only available when receiving the object as part of a callback from onUpdatedWithMemory or getProcessInfo with the includeMemory flag.
       */
      privateMemory?: number;

      /**
       * The most recent measurement of the process JavaScript allocated memory, in bytes. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.
       */
      jsMemoryAllocated?: number;

      /**
       * The most recent measurement of the process JavaScript memory used, in bytes. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.
       */
      jsMemoryUsed?: number;

      /**
       * The most recent measurement of the process's SQLite memory usage, in bytes. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.
       */
      sqliteMemory?: number;

      /**
       * The most recent information about the image cache for the process. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.
       */
      imageCache?: Cache;

      /**
       * The most recent information about the script cache for the process. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.
       */
      scriptCache?: Cache;

      /**
       * The most recent information about the CSS cache for the process. Only available when receiving the object as part of a callback from onUpdated or onUpdatedWithMemory.
       */
      cssCache?: Cache;
    }

    /**
     * Fired each time the Task Manager updates its process statistics, providing the dictionary of updated Process objects, indexed by process ID.
     */
    export const onUpdated: events.Event<(
      processes: {[name: string]: any},
    ) => void>;

    /**
     * Fired each time the Task Manager updates its process statistics, providing the dictionary of updated Process objects, indexed by process ID. Identical to onUpdate, with the addition of memory usage details included in each Process object. Note, collecting memory usage information incurs extra CPU usage and should only be listened for when needed.
     */
    export const onUpdatedWithMemory: events.Event<(
      processes: {[name: string]: any},
    ) => void>;

    /**
     * Fired each time a process is created, providing the corrseponding Process object.
     */
    export const onCreated: events.Event<(
      process: Process,
    ) => void>;

    /**
     * Fired each time a process becomes unresponsive, providing the corrseponding Process object.
     */
    export const onUnresponsive: events.Event<(
      process: Process,
    ) => void>;

    /**
     * Fired each time a process is terminated, providing the type of exit.
     */
    export const onExited: events.Event<(
      processId: number,
      exitType: number,
      exitCode: number,
    ) => void>;

    /**
     * Returns the ID of the renderer process for the specified tab.
     *
     * @param tabId The ID of the tab for which the renderer process ID is to be returned.
     */
    export function getProcessIdForTab(

      tabId: number,
    ): Promise<number>;

    /**
     * Returns the ID of the renderer process for the specified tab.
     *
     * @param tabId The ID of the tab for which the renderer process ID is to be returned.
     * @param callback A callback to return the ID of the renderer process of a tab.
     */
    export function getProcessIdForTab(

      tabId: number,

      /**
       * @param processId Process ID of the tab's renderer process.
       */
      callback?: (
        processId: number,
      ) => void,
    ): void;

    /**
     * Terminates the specified renderer process. Equivalent to visiting about:crash, but without changing the tab's URL.
     *
     * @param processId The ID of the process to be terminated.
     */
    export function terminate(

      processId: number,
    ): Promise<boolean>;

    /**
     * Terminates the specified renderer process. Equivalent to visiting about:crash, but without changing the tab's URL.
     *
     * @param processId The ID of the process to be terminated.
     * @param callback A callback to report the status of the termination.
     */
    export function terminate(

      processId: number,

      /**
       * @param didTerminate True if terminating the process was successful, and false otherwise.
       */
      callback?: (
        didTerminate: boolean,
      ) => void,
    ): void;

    /**
     * Retrieves the process information for each process ID specified.
     *
     * @param processIds The list of process IDs or single process ID for which to return the process information. An empty list indicates all processes are requested.
     * @param includeMemory True if detailed memory usage is required. Note, collecting memory usage information incurs extra CPU usage and should only be queried for when needed.
     */
    export function getProcessInfo(

      processIds: number | number[],

      includeMemory: boolean,
    ): Promise<{[name: string]: any}>;

    /**
     * Retrieves the process information for each process ID specified.
     *
     * @param processIds The list of process IDs or single process ID for which to return the process information. An empty list indicates all processes are requested.
     * @param includeMemory True if detailed memory usage is required. Note, collecting memory usage information incurs extra CPU usage and should only be queried for when needed.
     * @param callback A callback called when the processes information is collected.
     */
    export function getProcessInfo(

      processIds: number | number[],

      includeMemory: boolean,

      /**
       * @param processes A dictionary of {@link Process} objects for each requested process that is a live child process of the current browser process, indexed by process ID. Metrics requiring aggregation over time will not be populated in each Process object.
       */
      callback?: (
        processes: {[name: string]: any},
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.proxy` API to manage Chrome's proxy settings. This API relies on the [ChromeSetting prototype of the type API](https://developer.chrome.com/docs/extensions/reference/api/types#type-ChromeSetting) for getting and setting the proxy configuration.
   *
   * @chrome-permission proxy
   */
  export namespace proxy {

    /**
     * @since Chrome 54
     */
    export type Scheme = "http" | "https" | "quic" | "socks4" | "socks5";

    /**
     * @since Chrome 54
     */
    export type Mode = "direct" | "auto_detect" | "pac_script" | "fixed_servers" | "system";

    /**
     * An object encapsulating a single proxy server's specification.
     */
    export interface ProxyServer {

      /**
       * The scheme (protocol) of the proxy server itself. Defaults to 'http'.
       */
      scheme?: Scheme;

      /**
       * The hostname or IP address of the proxy server. Hostnames must be in ASCII (in Punycode format). IDNA is not supported, yet.
       */
      host: string;

      /**
       * The port of the proxy server. Defaults to a port that depends on the scheme.
       */
      port?: number;
    }

    /**
     * An object encapsulating the set of proxy rules for all protocols. Use either 'singleProxy' or (a subset of) 'proxyForHttp', 'proxyForHttps', 'proxyForFtp' and 'fallbackProxy'.
     */
    export interface ProxyRules {

      /**
       * The proxy server to be used for all per-URL requests (that is http, https, and ftp).
       */
      singleProxy?: ProxyServer;

      /**
       * The proxy server to be used for HTTP requests.
       */
      proxyForHttp?: ProxyServer;

      /**
       * The proxy server to be used for HTTPS requests.
       */
      proxyForHttps?: ProxyServer;

      /**
       * The proxy server to be used for FTP requests.
       */
      proxyForFtp?: ProxyServer;

      /**
       * The proxy server to be used for everthing else or if any of the specific proxyFor... is not specified.
       */
      fallbackProxy?: ProxyServer;

      /**
       * List of servers to connect to without a proxy server.
       */
      bypassList?: string[];
    }

    /**
     * An object holding proxy auto-config information. Exactly one of the fields should be non-empty.
     */
    export interface PacScript {

      /**
       * URL of the PAC file to be used.
       */
      url?: string;

      /**
       * A PAC script.
       */
      data?: string;

      /**
       * If true, an invalid PAC script will prevent the network stack from falling back to direct connections. Defaults to false.
       */
      mandatory?: boolean;
    }

    /**
     * An object encapsulating a complete proxy configuration.
     */
    export interface ProxyConfig {

      /**
       * The proxy rules describing this configuration. Use this for 'fixed\_servers' mode.
       */
      rules?: ProxyRules;

      /**
       * The proxy auto-config (PAC) script for this configuration. Use this for 'pac\_script' mode.
       */
      pacScript?: PacScript;

      /**
       * 'direct' = Never use a proxy
       * 'auto\_detect' = Auto detect proxy settings
       * 'pac\_script' = Use specified PAC script
       * 'fixed\_servers' = Manually specify proxy servers
       * 'system' = Use system proxy settings
       */
      mode: Mode;
    }

    /**
     * Proxy settings to be used. The value of this setting is a ProxyConfig object.
     */
    export const settings: types.ChromeSetting<ProxyConfig>;

    /**
     * Notifies about proxy errors.
     */
    export const onProxyError: events.Event<(
      details: {

        /**
         * If true, the error was fatal and the network transaction was aborted. Otherwise, a direct connection is used instead.
         */
        fatal: boolean,

        /**
         * The error description.
         */
        error: string,

        /**
         * Additional details about the error such as a JavaScript runtime error.
         */
        details: string,
      },
    ) => void>;
  }

  /**
   * Use the `chrome.readingList` API to read from and modify the items in the [Reading List](https://support.google.com/chrome/answer/7343019).
   *
   * @since Chrome 120
   * @chrome-permission readingList
   * @chrome-min-manifest MV3
   */
  export namespace readingList {

    export interface ReadingListEntry {

      /**
       * The url of the entry.
       */
      url: string;

      /**
       * The title of the entry.
       */
      title: string;

      /**
       * Will be `true` if the entry has been read.
       */
      hasBeenRead: boolean;

      /**
       * The last time the entry was updated. This value is in milliseconds since Jan 1, 1970.
       */
      lastUpdateTime: number;

      /**
       * The time the entry was created. Recorded in milliseconds since Jan 1, 1970.
       */
      creationTime: number;
    }

    export interface AddEntryOptions {

      /**
       * The url of the entry.
       */
      url: string;

      /**
       * The title of the entry.
       */
      title: string;

      /**
       * Will be `true` if the entry has been read.
       */
      hasBeenRead: boolean;
    }

    export interface RemoveOptions {

      /**
       * The url to remove.
       */
      url: string;
    }

    export interface UpdateEntryOptions {

      /**
       * The url that will be updated.
       */
      url: string;

      /**
       * The new title. The existing tile remains if a value isn't provided.
       */
      title?: string;

      /**
       * The updated read status. The existing status remains if a value isn't provided.
       */
      hasBeenRead?: boolean;
    }

    export interface QueryInfo {

      /**
       * A url to search for.
       */
      url?: string;

      /**
       * A title to search for.
       */
      title?: string;

      /**
       * Indicates whether to search for read (`true`) or unread (`false`) items.
       */
      hasBeenRead?: boolean;
    }

    /**
     * Triggered when a `ReadingListEntry` is added to the reading list.
     */
    export const onEntryAdded: events.Event<(
      entry: ReadingListEntry,
    ) => void>;

    /**
     * Triggered when a `ReadingListEntry` is removed from the reading list.
     */
    export const onEntryRemoved: events.Event<(
      entry: ReadingListEntry,
    ) => void>;

    /**
     * Triggered when a `ReadingListEntry` is updated in the reading list.
     */
    export const onEntryUpdated: events.Event<(
      entry: ReadingListEntry,
    ) => void>;

    /**
     * Adds an entry to the reading list if it does not exist.
     *
     * @param entry The entry to add to the reading list.
     */
    export function addEntry(

      entry: AddEntryOptions,
    ): Promise<void>;

    /**
     * Adds an entry to the reading list if it does not exist.
     *
     * @param entry The entry to add to the reading list.
     * @param callback Invoked once the entry has been added.
     */
    export function addEntry(

      entry: AddEntryOptions,

      callback?: () => void,
    ): void;

    /**
     * Removes an entry from the reading list if it exists.
     *
     * @param info The entry to remove from the reading list.
     */
    export function removeEntry(

      info: RemoveOptions,
    ): Promise<void>;

    /**
     * Removes an entry from the reading list if it exists.
     *
     * @param info The entry to remove from the reading list.
     * @param callback Invoked once the entry has been removed.
     */
    export function removeEntry(

      info: RemoveOptions,

      callback?: () => void,
    ): void;

    /**
     * Updates a reading list entry if it exists.
     *
     * @param info The entry to update.
     */
    export function updateEntry(

      info: UpdateEntryOptions,
    ): Promise<void>;

    /**
     * Updates a reading list entry if it exists.
     *
     * @param info The entry to update.
     * @param callback Invoked once the matched entries have been updated.
     */
    export function updateEntry(

      info: UpdateEntryOptions,

      callback?: () => void,
    ): void;

    /**
     * Retrieves all entries that match the `QueryInfo` properties. Properties that are not provided will not be matched.
     *
     * @param info The properties to search for.
     */
    export function query(

      info: QueryInfo,
    ): Promise<ReadingListEntry[]>;

    /**
     * Retrieves all entries that match the `QueryInfo` properties. Properties that are not provided will not be matched.
     *
     * @param info The properties to search for.
     * @param callback Invoked once the entries have been matched.
     */
    export function query(

      info: QueryInfo,

      callback?: (
        entries: ReadingListEntry[],
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.runtime` API to retrieve the service worker, return details about the manifest, and listen for and respond to events in the app or extension lifecycle. You can also use this API to convert the relative path of URLs to fully-qualified URLs.
   */
  export namespace runtime {

    /**
     * An object which allows two way communication with other pages. See [Long-lived connections](https://developer.chrome.com/docs/extensions/messaging#connect) for more information.
     */
    export interface Port {

      /**
       * The name of the port, as specified in the call to {@link runtime.connect}.
       */
      name: string;

      /**
       * Immediately disconnect the port. Calling `disconnect()` on an already-disconnected port has no effect. When a port is disconnected, no new events will be dispatched to this port.
       */
      disconnect(): void;

      /**
       * Send a message to the other end of the port. If the port is disconnected, an error is thrown.
       *
       * @param message The message to send. This object should be JSON-ifiable.
       */
      postMessage(

        /**
         * @since Chrome 52
         */
        message: any,
      ): void;

      /**
       * This property will **only** be present on ports passed to {@link runtime.onConnect onConnect} / {@link runtime.onConnectExternal onConnectExternal} / {@link runtime.onConnectExternal onConnectNative} listeners.
       */
      sender?: MessageSender;

      /**
       * Fired when the port is disconnected from the other end(s). {@link runtime.lastError} may be set if the port was disconnected by an error. If the port is closed via {@link Port.disconnect disconnect}, then this event is _only_ fired on the other end. This event is fired at most once (see also [Port lifetime](https://developer.chrome.com/docs/extensions/messaging#port-lifetime)).
       */
      onDisconnect: events.Event<(
        port: Port,
      ) => void>;

      /**
       * This event is fired when {@link Port.postMessage postMessage} is called by the other end of the port.
       */
      onMessage: events.Event<(
        message: any,
        port: Port,
      ) => void>;
    }

    /**
     * An object containing information about the script context that sent a message or request.
     */
    export interface MessageSender {

      /**
       * The {@link tabs.Tab} which opened the connection, if any. This property will **only** be present when the connection was opened from a tab (including content scripts), and **only** if the receiver is an extension, not an app.
       */
      tab?: tabs.Tab;

      /**
       * The [frame](https://developer.chrome.com/docs/extensions/reference/webNavigation/#frame_ids) that opened the connection. 0 for top-level frames, positive for child frames. This will only be set when `tab` is set.
       */
      frameId?: number;

      /**
       * The ID of the extension or app that opened the connection, if any.
       */
      id?: string;

      /**
       * The URL of the page or frame that opened the connection. If the sender is in an iframe, it will be iframe's URL not the URL of the page which hosts it.
       */
      url?: string;

      /**
       * The name of the native application that opened the connection, if any.
       *
       * @since Chrome 74
       */
      nativeApplication?: string;

      /**
       * The TLS channel ID of the page or frame that opened the connection, if requested by the extension or app, and if available.
       */
      tlsChannelId?: string;

      /**
       * The origin of the page or frame that opened the connection. It can vary from the url property (e.g., about:blank) or can be opaque (e.g., sandboxed iframes). This is useful for identifying if the origin can be trusted if we can't immediately tell from the URL.
       *
       * @since Chrome 80
       */
      origin?: string;

      /**
       * A UUID of the document that opened the connection.
       *
       * @since Chrome 106
       */
      documentId?: string;

      /**
       * The lifecycle the document that opened the connection is in at the time the port was created. Note that the lifecycle state of the document may have changed since port creation.
       *
       * @since Chrome 106
       */
      documentLifecycle?: string;
    }

    /**
     * The operating system Chrome is running on.
     *
     * @chrome-enum "mac" Specifies the MacOS operating system.
     * @chrome-enum "win" Specifies the Windows operating system.
     * @chrome-enum "android" Specifies the Android operating system.
     * @chrome-enum "cros" Specifies the Chrome operating system.
     * @chrome-enum "linux" Specifies the Linux operating system.
     * @chrome-enum "openbsd" Specifies the OpenBSD operating system.
     * @chrome-enum "fuchsia" Specifies the Fuchsia operating system.
     * @since Chrome 44
     */
    export type PlatformOs = "mac" | "win" | "android" | "cros" | "linux" | "openbsd" | "fuchsia";

    /**
     * The machine's processor architecture.
     *
     * @chrome-enum "arm" Specifies the processer architecture as arm.
     * @chrome-enum "arm64" Specifies the processer architecture as arm64.
     * @chrome-enum "x86-32" Specifies the processer architecture as x86-32.
     * @chrome-enum "x86-64" Specifies the processer architecture as x86-64.
     * @chrome-enum "mips" Specifies the processer architecture as mips.
     * @chrome-enum "mips64" Specifies the processer architecture as mips64.
     * @since Chrome 44
     */
    export type PlatformArch = "arm" | "arm64" | "x86-32" | "x86-64" | "mips" | "mips64";

    /**
     * The native client architecture. This may be different from arch on some platforms.
     *
     * @chrome-enum "arm" Specifies the native client architecture as arm.
     * @chrome-enum "x86-32" Specifies the native client architecture as x86-32.
     * @chrome-enum "x86-64" Specifies the native client architecture as x86-64.
     * @chrome-enum "mips" Specifies the native client architecture as mips.
     * @chrome-enum "mips64" Specifies the native client architecture as mips64.
     * @since Chrome 44
     */
    export type PlatformNaclArch = "arm" | "x86-32" | "x86-64" | "mips" | "mips64";

    /**
     * An object containing information about the current platform.
     */
    export interface PlatformInfo {

      /**
       * The operating system Chrome is running on.
       */
      os: PlatformOs;

      /**
       * The machine's processor architecture.
       */
      arch: PlatformArch;

      /**
       * The native client architecture. This may be different from arch on some platforms.
       */
      nacl_arch: PlatformNaclArch;
    }

    /**
     * Result of the update check.
     *
     * @chrome-enum "throttled" Specifies that the status check has been throttled. This can occur after repeated checks within a short amount of time.
     * @chrome-enum "no\_update" Specifies that there are no available updates to install.
     * @chrome-enum "update\_available" Specifies that there is an available update to install.
     * @since Chrome 44
     */
    export type RequestUpdateCheckStatus = "throttled" | "no_update" | "update_available";

    /**
     * The reason that this event is being dispatched.
     *
     * @chrome-enum "install" Specifies the event reason as an installation.
     * @chrome-enum "update" Specifies the event reason as an extension update.
     * @chrome-enum "chrome\_update" Specifies the event reason as a Chrome update.
     * @chrome-enum "shared\_module\_update" Specifies the event reason as an update to a shared module.
     * @since Chrome 44
     */
    export type OnInstalledReason = "install" | "update" | "chrome_update" | "shared_module_update";

    /**
     * The reason that the event is being dispatched. 'app\_update' is used when the restart is needed because the application is updated to a newer version. 'os\_update' is used when the restart is needed because the browser/OS is updated to a newer version. 'periodic' is used when the system runs for more than the permitted uptime set in the enterprise policy.
     *
     * @chrome-enum "app\_update" Specifies the event reason as an update to the app.
     * @chrome-enum "os\_update" Specifies the event reason as an update to the operating system.
     * @chrome-enum "periodic" Specifies the event reason as a periodic restart of the app.
     * @since Chrome 44
     */
    export type OnRestartRequiredReason = "app_update" | "os_update" | "periodic";

    /**
     * @chrome-enum "TAB" Specifies the context type as a tab
     * @chrome-enum "POPUP" Specifies the context type as an extension popup window
     * @chrome-enum "BACKGROUND" Specifies the context type as a service worker.
     * @chrome-enum "OFFSCREEN\_DOCUMENT" Specifies the context type as an offscreen document.
     * @chrome-enum "SIDE\_PANEL" Specifies the context type as a side panel.
     * @since Chrome 114
     */
    export type ContextType = "TAB" | "POPUP" | "BACKGROUND" | "OFFSCREEN_DOCUMENT" | "SIDE_PANEL";

    /**
     * A context hosting extension content.
     *
     * @since Chrome 114
     */
    export interface ExtensionContext {

      /**
       * The type of context this corresponds to.
       */
      contextType: ContextType;

      /**
       * A unique identifier for this context
       */
      contextId: string;

      /**
       * The ID of the tab for this context, or -1 if this context is not hosted in a tab.
       */
      tabId: number;

      /**
       * The ID of the window for this context, or -1 if this context is not hosted in a window.
       */
      windowId: number;

      /**
       * A UUID for the document associated with this context, or undefined if this context is hosted not in a document.
       */
      documentId?: string;

      /**
       * The ID of the frame for this context, or -1 if this context is not hosted in a frame.
       */
      frameId: number;

      /**
       * The URL of the document associated with this context, or undefined if the context is not hosted in a document.
       */
      documentUrl?: string;

      /**
       * The origin of the document associated with this context, or undefined if the context is not hosted in a document.
       */
      documentOrigin?: string;

      /**
       * Whether the context is associated with an incognito profile.
       */
      incognito: boolean;
    }

    /**
     * A filter to match against certain extension contexts. Matching contexts must match all specified filters; any filter that is not specified matches all available contexts. Thus, a filter of \`{}\` will match all available contexts.
     *
     * @since Chrome 114
     */
    export interface ContextFilter {

      contextTypes?: ContextType[];

      contextIds?: string[];

      tabIds?: number[];

      windowIds?: number[];

      documentIds?: string[];

      frameIds?: number[];

      documentUrls?: string[];

      documentOrigins?: string[];

      incognito?: boolean;
    }

    /**
     * The ID of the extension/app.
     */
    export const id: string;

    /**
     * Fired when a profile that has this extension installed first starts up. This event is not fired when an incognito profile is started, even if this extension is operating in 'split' incognito mode.
     */
    export const onStartup: events.Event<() => void>;

    /**
     * Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version.
     */
    export const onInstalled: events.Event<(
      details: {

        /**
         * The reason that this event is being dispatched.
         */
        reason: OnInstalledReason,

        /**
         * Indicates the previous version of the extension, which has just been updated. This is present only if 'reason' is 'update'.
         */
        previousVersion?: string,

        /**
         * Indicates the ID of the imported shared module extension which updated. This is present only if 'reason' is 'shared\_module\_update'.
         */
        id?: string,
      },
    ) => void>;

    /**
     * Sent to the event page just before it is unloaded. This gives the extension opportunity to do some clean up. Note that since the page is unloading, any asynchronous operations started while handling this event are not guaranteed to complete. If more activity for the event page occurs before it gets unloaded the onSuspendCanceled event will be sent and the page won't be unloaded.
     */
    export const onSuspend: events.Event<() => void>;

    /**
     * Sent after onSuspend to indicate that the app won't be unloaded after all.
     */
    export const onSuspendCanceled: events.Event<() => void>;

    /**
     * Fired when an update is available, but isn't installed immediately because the app is currently running. If you do nothing, the update will be installed the next time the background page gets unloaded, if you want it to be installed sooner you can explicitly call chrome.runtime.reload(). If your extension is using a persistent background page, the background page of course never gets unloaded, so unless you call chrome.runtime.reload() manually in response to this event the update will not get installed until the next time Chrome itself restarts. If no handlers are listening for this event, and your extension has a persistent background page, it behaves as if chrome.runtime.reload() is called in response to this event.
     */
    export const onUpdateAvailable: events.Event<(
      details: {
        [name: string]: any,

        /**
         * The version number of the available update.
         */
        version: string,
      },
    ) => void>;

    /**
     * Fired when a Chrome update is available, but isn't installed immediately because a browser restart is required.
     *
     * @deprecated Please use {@link runtime.onRestartRequired}.
     */
    export const onBrowserUpdateAvailable: events.Event<() => void>;

    /**
     * Fired when a connection is made from either an extension process or a content script (by {@link runtime.connect}).
     */
    export const onConnect: events.Event<(
      port: Port,
    ) => void>;

    /**
     * Fired when a connection is made from another extension (by {@link runtime.connect}), or from an externally connectable web site.
     */
    export const onConnectExternal: events.Event<(
      port: Port,
    ) => void>;

    /**
     * Fired when a connection is made from a user script from this extension.
     *
     * @since Chrome 115
     * @chrome-min-manifest MV3
     */
    export const onUserScriptConnect: events.Event<(
      port: Port,
    ) => void>;

    /**
     * Fired when a connection is made from a native application. This event requires the `"nativeMessaging"` permission. It is only supported on Chrome OS.
     *
     * @since Chrome 76
     * @chrome-permission nativeMessaging
     */
    export const onConnectNative: events.Event<(
      port: Port,
    ) => void>;

    /**
     * Fired when a message is sent from either an extension process (by {@link runtime.sendMessage}) or a content script (by {@link tabs.sendMessage}).
     */
    export const onMessage: events.Event<(
      message: any,
      sender: MessageSender,
      sendResponse: () => void,
    ) => boolean | undefined>;

    /**
     * Fired when a message is sent from another extension/app (by {@link runtime.sendMessage}). Cannot be used in a content script.
     */
    export const onMessageExternal: events.Event<(
      message: any,
      sender: MessageSender,
      sendResponse: () => void,
    ) => boolean | undefined>;

    /**
     * Fired when a message is sent from a user script associated with the same extension.
     *
     * @since Chrome 115
     * @chrome-min-manifest MV3
     */
    export const onUserScriptMessage: events.Event<(
      message: any,
      sender: MessageSender,
      sendResponse: () => void,
    ) => boolean | undefined>;

    /**
     * Fired when an app or the device that it runs on needs to be restarted. The app should close all its windows at its earliest convenient time to let the restart to happen. If the app does nothing, a restart will be enforced after a 24-hour grace period has passed. Currently, this event is only fired for Chrome OS kiosk apps.
     */
    export const onRestartRequired: events.Event<(
      reason: OnRestartRequiredReason,
    ) => void>;

    /**
     * Retrieves the JavaScript 'window' object for the background page running inside the current extension/app. If the background page is an event page, the system will ensure it is loaded before calling the callback. If there is no background page, an error is set.
     *
     * @chrome-returns-extra since Chrome 99
     * @chrome-disallow-service-workers
     */
    export function getBackgroundPage(): Promise<Window | undefined>;

    /**
     * Retrieves the JavaScript 'window' object for the background page running inside the current extension/app. If the background page is an event page, the system will ensure it is loaded before calling the callback. If there is no background page, an error is set.
     *
     * @chrome-disallow-service-workers
     */
    export function getBackgroundPage(

      /**
       * @param backgroundPage The JavaScript 'window' object for the background page.
       */
      callback?: (
        backgroundPage?: Window,
      ) => void,
    ): void;

    /**
     * Open your Extension's options page, if possible.
     *
     * The precise behavior may depend on your manifest's `[options_ui](https://developer.chrome.com/docs/extensions/develop/ui/options-page#embedded_options)` or `[options_page](https://developer.chrome.com/docs/extensions/develop/ui/options-page#full_page)` key, or what Chrome happens to support at the time. For example, the page may be opened in a new tab, within chrome://extensions, within an App, or it may just focus an open options page. It will never cause the caller page to reload.
     *
     * If your Extension does not declare an options page, or Chrome failed to create one for some other reason, the callback will set {@link lastError}.
     *
     * @chrome-returns-extra since Chrome 99
     */
    export function openOptionsPage(): Promise<void>;

    /**
     * Open your Extension's options page, if possible.
     *
     * The precise behavior may depend on your manifest's `[options_ui](https://developer.chrome.com/docs/extensions/develop/ui/options-page#embedded_options)` or `[options_page](https://developer.chrome.com/docs/extensions/develop/ui/options-page#full_page)` key, or what Chrome happens to support at the time. For example, the page may be opened in a new tab, within chrome://extensions, within an App, or it may just focus an open options page. It will never cause the caller page to reload.
     *
     * If your Extension does not declare an options page, or Chrome failed to create one for some other reason, the callback will set {@link lastError}.
     */
    export function openOptionsPage(

      callback?: () => void,
    ): void;

    /**
     * Returns details about the app or extension from the manifest. The object returned is a serialization of the full [manifest file](https://developer.chrome.com/docs/extensions/reference/manifest).
     *
     * @returns The manifest details.
     */
    export function getManifest(): {[name: string]: any};

    /**
     * Converts a relative path within an app/extension install directory to a fully-qualified URL.
     *
     * @param path A path to a resource within an app/extension expressed relative to its install directory.
     * @returns The fully-qualified URL to the resource.
     */
    export function getURL(

      path: string,
    ): string;

    /**
     * Sets the URL to be visited upon uninstallation. This may be used to clean up server-side data, do analytics, and implement surveys. Maximum 1023 characters.
     *
     * @chrome-returns-extra since Chrome 99
     * @param url URL to be opened after the extension is uninstalled. This URL must have an http: or https: scheme. Set an empty string to not open a new tab upon uninstallation.
     */
    export function setUninstallURL(

      url: string,
    ): Promise<void>;

    /**
     * Sets the URL to be visited upon uninstallation. This may be used to clean up server-side data, do analytics, and implement surveys. Maximum 1023 characters.
     *
     * @param url URL to be opened after the extension is uninstalled. This URL must have an http: or https: scheme. Set an empty string to not open a new tab upon uninstallation.
     * @param callback Called when the uninstall URL is set. If the given URL is invalid, {@link runtime.lastError} will be set.
     */
    export function setUninstallURL(

      url: string,

      /**
       * @since Chrome 45
       */
      callback?: () => void,
    ): void;

    /**
     * Reloads the app or extension. This method is not supported in kiosk mode. For kiosk mode, use chrome.runtime.restart() method.
     */
    export function reload(): void;

    /**
     * Requests an immediate update check be done for this app/extension.
     *
     * **Important**: Most extensions/apps should **not** use this method, since Chrome already does automatic checks every few hours, and you can listen for the {@link runtime.onUpdateAvailable} event without needing to call requestUpdateCheck.
     *
     * This method is only appropriate to call in very limited circumstances, such as if your extension/app talks to a backend service, and the backend service has determined that the client extension/app version is very far out of date and you'd like to prompt a user to update. Most other uses of requestUpdateCheck, such as calling it unconditionally based on a repeating timer, probably only serve to waste client, network, and server resources.
     *
     * Note: When called with a callback, instead of returning an object this function will return the two properties as separate arguments passed to the callback.
     *
     * @chrome-returns-extra since Chrome 109
     */
    export function requestUpdateCheck(): Promise<{

      /**
       * Result of the update check.
       */
      status: RequestUpdateCheckStatus,

      /**
       * If an update is available, this contains the version of the available update.
       */
      version?: string,
    }>;

    /**
     * Requests an immediate update check be done for this app/extension.
     *
     * **Important**: Most extensions/apps should **not** use this method, since Chrome already does automatic checks every few hours, and you can listen for the {@link runtime.onUpdateAvailable} event without needing to call requestUpdateCheck.
     *
     * This method is only appropriate to call in very limited circumstances, such as if your extension/app talks to a backend service, and the backend service has determined that the client extension/app version is very far out of date and you'd like to prompt a user to update. Most other uses of requestUpdateCheck, such as calling it unconditionally based on a repeating timer, probably only serve to waste client, network, and server resources.
     *
     * Note: When called with a callback, instead of returning an object this function will return the two properties as separate arguments passed to the callback.
     */
    export function requestUpdateCheck(

      /**
       * @param result RequestUpdateCheckResult object that holds the status of the update check and any details of the result if there is an update available
       */
      callback?: (
        /**
         * @since Chrome 109
         */
        result: {

          /**
           * Result of the update check.
           */
          status: RequestUpdateCheckStatus,

          /**
           * If an update is available, this contains the version of the available update.
           */
          version?: string,
        },
      ) => void,
    ): void;

    /**
     * Restart the ChromeOS device when the app runs in kiosk mode. Otherwise, it's no-op.
     */
    export function restart(): void;

    /**
     * Restart the ChromeOS device when the app runs in kiosk mode after the given seconds. If called again before the time ends, the reboot will be delayed. If called with a value of -1, the reboot will be cancelled. It's a no-op in non-kiosk mode. It's only allowed to be called repeatedly by the first extension to invoke this API.
     *
     * @chrome-returns-extra since Chrome 99
     * @param seconds Time to wait in seconds before rebooting the device, or -1 to cancel a scheduled reboot.
     * @since Chrome 53
     */
    export function restartAfterDelay(

      seconds: number,
    ): Promise<void>;

    /**
     * Restart the ChromeOS device when the app runs in kiosk mode after the given seconds. If called again before the time ends, the reboot will be delayed. If called with a value of -1, the reboot will be cancelled. It's a no-op in non-kiosk mode. It's only allowed to be called repeatedly by the first extension to invoke this API.
     *
     * @param seconds Time to wait in seconds before rebooting the device, or -1 to cancel a scheduled reboot.
     * @param callback A callback to be invoked when a restart request was successfully rescheduled.
     * @since Chrome 53
     */
    export function restartAfterDelay(

      seconds: number,

      callback?: () => void,
    ): void;

    /**
     * Attempts to connect listeners within an extension/app (such as the background page), or other extensions/apps. This is useful for content scripts connecting to their extension processes, inter-app/extension communication, and [web messaging](https://developer.chrome.com/docs/extensions/manifest/externally_connectable). Note that this does not connect to any listeners in a content script. Extensions may connect to content scripts embedded in tabs via {@link tabs.connect}.
     *
     * @param extensionId The ID of the extension or app to connect to. If omitted, a connection will be attempted with your own extension. Required if sending messages from a web page for [web messaging](https://developer.chrome.com/docs/extensions/reference/manifest/externally-connectable).
     * @returns Port through which messages can be sent and received. The port's {@link Port onDisconnect} event is fired if the extension/app does not exist.
     */
    export function connect(

      extensionId?: string,

      connectInfo?: {

        /**
         * Will be passed into onConnect for processes that are listening for the connection event.
         */
        name?: string,

        /**
         * Whether the TLS channel ID will be passed into onConnectExternal for processes that are listening for the connection event.
         */
        includeTlsChannelId?: boolean,
      },
    ): Port;

    /**
     * Connects to a native application in the host machine. This method requires the `"nativeMessaging"` permission. See [Native Messaging](https://developer.chrome.com/extensions/develop/concepts/native-messaging) for more information.
     *
     * @param application The name of the registered application to connect to.
     * @returns Port through which messages can be sent and received with the application
     * @chrome-permission nativeMessaging
     */
    export function connectNative(

      application: string,
    ): Port;

    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to {@link runtime.connect} but only sends a single message, with an optional response. If sending to your extension, the {@link runtime.onMessage} event will be fired in every frame of your extension (except for the sender's frame), or {@link runtime.onMessageExternal}, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use {@link tabs.sendMessage}.
     *
     * @chrome-returns-extra since Chrome 99
     * @param extensionId The ID of the extension/app to send the message to. If omitted, the message will be sent to your own extension/app. Required if sending messages from a web page for [web messaging](https://developer.chrome.com/docs/extensions/manifest/externally_connectable).
     * @param message The message to send. This message should be a JSON-ifiable object.
     */
    export function sendMessage(

      extensionId: string,

      message: any,

      options?: {

        /**
         * Whether the TLS channel ID will be passed into onMessageExternal for processes that are listening for the connection event.
         */
        includeTlsChannelId?: boolean,
      },
    ): Promise<any>;

    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to {@link runtime.connect} but only sends a single message, with an optional response. If sending to your extension, the {@link runtime.onMessage} event will be fired in every frame of your extension (except for the sender's frame), or {@link runtime.onMessageExternal}, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use {@link tabs.sendMessage}.
     *
     * @chrome-returns-extra since Chrome 99
     * @param message The message to send. This message should be a JSON-ifiable object.
     */
    export function sendMessage(

      message: any,

      options?: {

        /**
         * Whether the TLS channel ID will be passed into onMessageExternal for processes that are listening for the connection event.
         */
        includeTlsChannelId?: boolean,
      },
    ): Promise<any>;

    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to {@link runtime.connect} but only sends a single message, with an optional response. If sending to your extension, the {@link runtime.onMessage} event will be fired in every frame of your extension (except for the sender's frame), or {@link runtime.onMessageExternal}, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use {@link tabs.sendMessage}.
     *
     * @param extensionId The ID of the extension/app to send the message to. If omitted, the message will be sent to your own extension/app. Required if sending messages from a web page for [web messaging](https://developer.chrome.com/docs/extensions/manifest/externally_connectable).
     * @param message The message to send. This message should be a JSON-ifiable object.
     */
    export function sendMessage(

      extensionId: string,

      message: any,

      options?: {

        /**
         * Whether the TLS channel ID will be passed into onMessageExternal for processes that are listening for the connection event.
         */
        includeTlsChannelId?: boolean,
      },

      /**
       * @param response The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and {@link runtime.lastError} will be set to the error message.
       * @since Chrome 99
       */
      callback?: (
        response: any,
      ) => void,
    ): void;

    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to {@link runtime.connect} but only sends a single message, with an optional response. If sending to your extension, the {@link runtime.onMessage} event will be fired in every frame of your extension (except for the sender's frame), or {@link runtime.onMessageExternal}, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use {@link tabs.sendMessage}.
     *
     * @param message The message to send. This message should be a JSON-ifiable object.
     */
    export function sendMessage(

      message: any,

      options?: {

        /**
         * Whether the TLS channel ID will be passed into onMessageExternal for processes that are listening for the connection event.
         */
        includeTlsChannelId?: boolean,
      },

      /**
       * @param response The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and {@link runtime.lastError} will be set to the error message.
       * @since Chrome 99
       */
      callback?: (
        response: any,
      ) => void,
    ): void;

    /**
     * Send a single message to a native application. This method requires the `"nativeMessaging"` permission.
     *
     * @chrome-returns-extra since Chrome 99
     * @param application The name of the native messaging host.
     * @param message The message that will be passed to the native messaging host.
     * @chrome-permission nativeMessaging
     */
    export function sendNativeMessage(

      application: string,

      message: {[name: string]: any},
    ): Promise<any>;

    /**
     * Send a single message to a native application. This method requires the `"nativeMessaging"` permission.
     *
     * @param application The name of the native messaging host.
     * @param message The message that will be passed to the native messaging host.
     * @chrome-permission nativeMessaging
     */
    export function sendNativeMessage(

      application: string,

      message: {[name: string]: any},

      /**
       * @param response The response message sent by the native messaging host. If an error occurs while connecting to the native messaging host, the callback will be called with no arguments and {@link runtime.lastError} will be set to the error message.
       * @since Chrome 99
       */
      callback?: (
        response: any,
      ) => void,
    ): void;

    /**
     * Returns information about the current platform.
     *
     * @chrome-returns-extra since Chrome 99
     */
    export function getPlatformInfo(): Promise<PlatformInfo>;

    /**
     * Returns information about the current platform.
     *
     * @param callback Called with results
     */
    export function getPlatformInfo(

      callback?: (
        platformInfo: PlatformInfo,
      ) => void,
    ): void;

    /**
     * Returns a DirectoryEntry for the package directory.
     *
     * @chrome-returns-extra since Pending
     * @chrome-disallow-service-workers
     */
    export function getPackageDirectoryEntry(): Promise<DirectoryEntry>;

    /**
     * Returns a DirectoryEntry for the package directory.
     *
     * @chrome-disallow-service-workers
     */
    export function getPackageDirectoryEntry(

      callback?: (
        directoryEntry: DirectoryEntry,
      ) => void,
    ): void;

    /**
     * Fetches information about active contexts associated with this extension
     *
     * @param filter A filter to find matching contexts. A context matches if it matches all specified fields in the filter. Any unspecified field in the filter matches all contexts.
     * @since Chrome 116
     * @chrome-min-manifest MV3
     */
    export function getContexts(

      filter: ContextFilter,
    ): Promise<ExtensionContext[]>;

    /**
     * Fetches information about active contexts associated with this extension
     *
     * @param filter A filter to find matching contexts. A context matches if it matches all specified fields in the filter. Any unspecified field in the filter matches all contexts.
     * @param callback Invoked with the matching contexts, if any.
     * @since Chrome 116
     * @chrome-min-manifest MV3
     */
    export function getContexts(

      filter: ContextFilter,

      /**
       * @param contexts The matching contexts, if any.
       */
      callback?: (
        contexts: ExtensionContext[],
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.scripting` API to execute script in different contexts.
   *
   * @since Chrome 88
   * @chrome-permission scripting
   * @chrome-min-manifest MV3
   */
  export namespace scripting {

    /**
     * The origin for a style change. See [style origins](https://developer.mozilla.org/en-US/docs/Glossary/Style_origin) for more info.
     */
    export type StyleOrigin = "AUTHOR" | "USER";

    /**
     * The JavaScript world for a script to execute within.
     *
     * @chrome-enum "ISOLATED" Specifies the isolated world, which is the execution environment unique to this extension.
     * @chrome-enum "MAIN" Specifies the main world of the DOM, which is the execution environment shared with the host page's JavaScript.
     * @since Chrome 95
     */
    export type ExecutionWorld = "ISOLATED" | "MAIN";

    export interface InjectionTarget {

      /**
       * The ID of the tab into which to inject.
       */
      tabId: number;

      /**
       * The [IDs](https://developer.chrome.com/docs/extensions/reference/webNavigation/#frame_ids) of specific frames to inject into.
       */
      frameIds?: number[];

      /**
       * The [IDs](https://developer.chrome.com/docs/extensions/reference/webNavigation/#document_ids) of specific documentIds to inject into. This must not be set if `frameIds` is set.
       *
       * @since Chrome 106
       */
      documentIds?: string[];

      /**
       * Whether the script should inject into all frames within the tab. Defaults to false. This must not be true if `frameIds` is specified.
       */
      allFrames?: boolean;
    }

    export interface ScriptInjection {

      /**
       * A JavaScript function to inject. This function will be serialized, and then deserialized for injection. This means that any bound parameters and execution context will be lost. Exactly one of `files` or `func` must be specified.
       *
       * @since Chrome 92
       */
      func?: () => void;

      /**
       * The arguments to pass to the provided function. This is only valid if the `func` parameter is specified. These arguments must be JSON-serializable.
       *
       * @since Chrome 92
       */
      args?: any[];

      /**
       * The path of the JS or CSS files to inject, relative to the extension's root directory. Exactly one of `files` or `func` must be specified.
       */
      files?: string[];

      /**
       * Details specifying the target into which to inject the script.
       */
      target: InjectionTarget;

      /**
       * The JavaScript "world" to run the script in. Defaults to `ISOLATED`.
       *
       * @since Chrome 95
       */
      world?: ExecutionWorld;

      /**
       * Whether the injection should be triggered in the target as soon as possible. Note that this is not a guarantee that injection will occur prior to page load, as the page may have already loaded by the time the script reaches the target.
       *
       * @since Chrome 102
       */
      injectImmediately?: boolean;
    }

    export interface CSSInjection {

      /**
       * Details specifying the target into which to insert the CSS.
       */
      target: InjectionTarget;

      /**
       * A string containing the CSS to inject. Exactly one of `files` and `css` must be specified.
       */
      css?: string;

      /**
       * The path of the CSS files to inject, relative to the extension's root directory. Exactly one of `files` and `css` must be specified.
       */
      files?: string[];

      /**
       * The style origin for the injection. Defaults to `'AUTHOR'`.
       */
      origin?: StyleOrigin;
    }

    export interface InjectionResult {

      /**
       * The result of the script execution.
       */
      result?: any;

      /**
       * The frame associated with the injection.
       *
       * @since Chrome 90
       */
      frameId: number;

      /**
       * The document associated with the injection.
       *
       * @since Chrome 106
       */
      documentId: string;
    }

    /**
     * @since Chrome 96
     */
    export interface RegisteredContentScript {

      /**
       * The id of the content script, specified in the API call. Must not start with a '\_' as it's reserved as a prefix for generated script IDs.
       */
      id: string;

      /**
       * Specifies which pages this content script will be injected into. See [Match Patterns](https://developer.chrome.com/extensions/develop/concepts/match-patterns) for more details on the syntax of these strings. Must be specified for {@link registerContentScripts}.
       */
      matches?: string[];

      /**
       * Excludes pages that this content script would otherwise be injected into. See [Match Patterns](https://developer.chrome.com/extensions/develop/concepts/match-patterns) for more details on the syntax of these strings.
       */
      excludeMatches?: string[];

      /**
       * The list of CSS files to be injected into matching pages. These are injected in the order they appear in this array, before any DOM is constructed or displayed for the page.
       */
      css?: string[];

      /**
       * The list of JavaScript files to be injected into matching pages. These are injected in the order they appear in this array.
       */
      js?: string[];

      /**
       * If specified true, it will inject into all frames, even if the frame is not the top-most frame in the tab. Each frame is checked independently for URL requirements; it will not inject into child frames if the URL requirements are not met. Defaults to false, meaning that only the top frame is matched.
       */
      allFrames?: boolean;

      /**
       * Indicates whether the script can be injected into frames where the URL contains an unsupported scheme; specifically: about:, data:, blob:, or filesystem:. In these cases, the URL's origin is checked to determine if the script should be injected. If the origin is `null` (as is the case for data: URLs) then the used origin is either the frame that created the current frame or the frame that initiated the navigation to this frame. Note that this may not be the parent frame.
       *
       * @since Chrome 119
       */
      matchOriginAsFallback?: boolean;

      /**
       * Specifies when JavaScript files are injected into the web page. The preferred and default value is `document_idle`.
       */
      runAt?: extensionTypes.RunAt;

      /**
       * Specifies if this content script will persist into future sessions. The default is true.
       */
      persistAcrossSessions?: boolean;

      /**
       * The JavaScript "world" to run the script in. Defaults to `ISOLATED`.
       *
       * @since Chrome 102
       */
      world?: ExecutionWorld;
    }

    /**
     * @since Chrome 96
     */
    export interface ContentScriptFilter {

      /**
       * If specified, {@link getRegisteredContentScripts} will only return scripts with an id specified in this list.
       */
      ids?: string[];
    }

    /**
     * Injects a script into a target context. By default, the script will be run at `document_idle`, or immediately if the page has already loaded. If the `injectImmediately` property is set, the script will inject without waiting, even if the page has not finished loading. If the script evaluates to a promise, the browser will wait for the promise to settle and return the resulting value.
     *
     * @chrome-returns-extra since Chrome 90
     * @param injection The details of the script which to inject.
     */
    export function executeScript(

      injection: ScriptInjection,
    ): Promise<InjectionResult[]>;

    /**
     * Injects a script into a target context. By default, the script will be run at `document_idle`, or immediately if the page has already loaded. If the `injectImmediately` property is set, the script will inject without waiting, even if the page has not finished loading. If the script evaluates to a promise, the browser will wait for the promise to settle and return the resulting value.
     *
     * @param injection The details of the script which to inject.
     * @param callback Invoked upon completion of the injection. The resulting array contains the result of execution for each frame where the injection succeeded.
     */
    export function executeScript(

      injection: ScriptInjection,

      callback?: (
        results: InjectionResult[],
      ) => void,
    ): void;

    /**
     * Inserts a CSS stylesheet into a target context. If multiple frames are specified, unsuccessful injections are ignored.
     *
     * @chrome-returns-extra since Chrome 90
     * @param injection The details of the styles to insert.
     */
    export function insertCSS(

      injection: CSSInjection,
    ): Promise<void>;

    /**
     * Inserts a CSS stylesheet into a target context. If multiple frames are specified, unsuccessful injections are ignored.
     *
     * @param injection The details of the styles to insert.
     * @param callback Invoked upon completion of the insertion.
     */
    export function insertCSS(

      injection: CSSInjection,

      callback?: () => void,
    ): void;

    /**
     * Removes a CSS stylesheet that was previously inserted by this extension from a target context.
     *
     * @param injection The details of the styles to remove. Note that the `css`, `files`, and `origin` properties must exactly match the stylesheet inserted through {@link insertCSS}. Attempting to remove a non-existent stylesheet is a no-op.
     * @since Chrome 90
     */
    export function removeCSS(

      injection: CSSInjection,
    ): Promise<void>;

    /**
     * Removes a CSS stylesheet that was previously inserted by this extension from a target context.
     *
     * @param injection The details of the styles to remove. Note that the `css`, `files`, and `origin` properties must exactly match the stylesheet inserted through {@link insertCSS}. Attempting to remove a non-existent stylesheet is a no-op.
     * @param callback A callback to be invoked upon the completion of the removal.
     * @since Chrome 90
     */
    export function removeCSS(

      injection: CSSInjection,

      callback?: () => void,
    ): void;

    /**
     * Registers one or more content scripts for this extension.
     *
     * @param scripts Contains a list of scripts to be registered. If there are errors during script parsing/file validation, or if the IDs specified already exist, then no scripts are registered.
     * @since Chrome 96
     */
    export function registerContentScripts(

      scripts: RegisteredContentScript[],
    ): Promise<void>;

    /**
     * Registers one or more content scripts for this extension.
     *
     * @param scripts Contains a list of scripts to be registered. If there are errors during script parsing/file validation, or if the IDs specified already exist, then no scripts are registered.
     * @param callback A callback to be invoked once scripts have been fully registered or if an error has occurred.
     * @since Chrome 96
     */
    export function registerContentScripts(

      scripts: RegisteredContentScript[],

      callback?: () => void,
    ): void;

    /**
     * Returns all dynamically registered content scripts for this extension that match the given filter.
     *
     * @param filter An object to filter the extension's dynamically registered scripts.
     * @since Chrome 96
     */
    export function getRegisteredContentScripts(

      filter?: ContentScriptFilter,
    ): Promise<RegisteredContentScript[]>;

    /**
     * Returns all dynamically registered content scripts for this extension that match the given filter.
     *
     * @param filter An object to filter the extension's dynamically registered scripts.
     * @since Chrome 96
     */
    export function getRegisteredContentScripts(

      filter?: ContentScriptFilter,

      callback?: (
        scripts: RegisteredContentScript[],
      ) => void,
    ): void;

    /**
     * Unregisters content scripts for this extension.
     *
     * @param filter If specified, only unregisters dynamic content scripts which match the filter. Otherwise, all of the extension's dynamic content scripts are unregistered.
     * @since Chrome 96
     */
    export function unregisterContentScripts(

      filter?: ContentScriptFilter,
    ): Promise<void>;

    /**
     * Unregisters content scripts for this extension.
     *
     * @param filter If specified, only unregisters dynamic content scripts which match the filter. Otherwise, all of the extension's dynamic content scripts are unregistered.
     * @param callback A callback to be invoked once scripts have been unregistered or if an error has occurred.
     * @since Chrome 96
     */
    export function unregisterContentScripts(

      filter?: ContentScriptFilter,

      callback?: () => void,
    ): void;

    /**
     * Updates one or more content scripts for this extension.
     *
     * @param scripts Contains a list of scripts to be updated. A property is only updated for the existing script if it is specified in this object. If there are errors during script parsing/file validation, or if the IDs specified do not correspond to a fully registered script, then no scripts are updated.
     * @since Chrome 96
     */
    export function updateContentScripts(

      scripts: RegisteredContentScript[],
    ): Promise<void>;

    /**
     * Updates one or more content scripts for this extension.
     *
     * @param scripts Contains a list of scripts to be updated. A property is only updated for the existing script if it is specified in this object. If there are errors during script parsing/file validation, or if the IDs specified do not correspond to a fully registered script, then no scripts are updated.
     * @param callback A callback to be invoked once scripts have been updated or if an error has occurred.
     * @since Chrome 96
     */
    export function updateContentScripts(

      scripts: RegisteredContentScript[],

      callback?: () => void,
    ): void;
  }

  /**
   * Use the `chrome.search` API to search via the default provider.
   *
   * @since Chrome 87
   * @chrome-permission search
   */
  export namespace search {

    /**
     * @chrome-enum "CURRENT\_TAB" Specifies that the search results display in the calling tab or the tab from the active browser.
     * @chrome-enum "NEW\_TAB" Specifies that the search results display in a new tab.
     * @chrome-enum "NEW\_WINDOW" Specifies that the search results display in a new window.
     */
    export type Disposition = "CURRENT_TAB" | "NEW_TAB" | "NEW_WINDOW";

    export interface QueryInfo {

      /**
       * String to query with the default search provider.
       */
      text: string;

      /**
       * Location where search results should be displayed. `CURRENT_TAB` is the default.
       */
      disposition?: Disposition;

      /**
       * Location where search results should be displayed. `tabId` cannot be used with `disposition`.
       */
      tabId?: number;
    }

    /**
     * Used to query the default search provider. In case of an error, {@link runtime.lastError} will be set.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function query(

      queryInfo: QueryInfo,
    ): Promise<void>;

    /**
     * Used to query the default search provider. In case of an error, {@link runtime.lastError} will be set.
     */
    export function query(

      queryInfo: QueryInfo,

      callback?: () => void,
    ): void;
  }

  /**
   * Use the `chrome.sessions` API to query and restore tabs and windows from a browsing session.
   *
   * @chrome-permission sessions
   */
  export namespace sessions {

    export interface Filter {

      /**
       * The maximum number of entries to be fetched in the requested list. Omit this parameter to fetch the maximum number of entries ({@link sessions.MAX_SESSION_RESULTS}).
       */
      maxResults?: number;
    }

    export interface Session {

      /**
       * The time when the window or tab was closed or modified, represented in milliseconds since the epoch.
       */
      lastModified: number;

      /**
       * The {@link tabs.Tab}, if this entry describes a tab. Either this or {@link sessions.Session.window} will be set.
       */
      tab?: tabs.Tab;

      /**
       * The {@link windows.Window}, if this entry describes a window. Either this or {@link sessions.Session.tab} will be set.
       */
      window?: windows.Window;
    }

    export interface Device {

      /**
       * The name of the foreign device.
       */
      deviceName: string;

      /**
       * A list of open window sessions for the foreign device, sorted from most recently to least recently modified session.
       */
      sessions: Session[];
    }

    /**
     * The maximum number of {@link sessions.Session} that will be included in a requested list.
     */
    export const MAX_SESSION_RESULTS: 25;

    /**
     * Fired when recently closed tabs and/or windows are changed. This event does not monitor synced sessions changes.
     */
    export const onChanged: events.Event<() => void>;

    /**
     * Gets the list of recently closed tabs and/or windows.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function getRecentlyClosed(

      filter?: Filter,
    ): Promise<Session[]>;

    /**
     * Gets the list of recently closed tabs and/or windows.
     */
    export function getRecentlyClosed(

      filter?: Filter,

      /**
       * @param sessions The list of closed entries in reverse order that they were closed (the most recently closed tab or window will be at index `0`). The entries may contain either tabs or windows.
       */
      callback?: (
        sessions: Session[],
      ) => void,
    ): void;

    /**
     * Retrieves all devices with synced sessions.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function getDevices(

      filter?: Filter,
    ): Promise<Device[]>;

    /**
     * Retrieves all devices with synced sessions.
     */
    export function getDevices(

      filter?: Filter,

      /**
       * @param devices The list of {@link sessions.Device} objects for each synced session, sorted in order from device with most recently modified session to device with least recently modified session. {@link tabs.Tab} objects are sorted by recency in the {@link windows.Window} of the {@link sessions.Session} objects.
       */
      callback?: (
        devices: Device[],
      ) => void,
    ): void;

    /**
     * Reopens a {@link windows.Window} or {@link tabs.Tab}, with an optional callback to run when the entry has been restored.
     *
     * @chrome-returns-extra since Chrome 96
     * @param sessionId The {@link windows.Window.sessionId}, or {@link tabs.Tab.sessionId} to restore. If this parameter is not specified, the most recently closed session is restored.
     */
    export function restore(

      sessionId?: string,
    ): Promise<Session>;

    /**
     * Reopens a {@link windows.Window} or {@link tabs.Tab}, with an optional callback to run when the entry has been restored.
     *
     * @param sessionId The {@link windows.Window.sessionId}, or {@link tabs.Tab.sessionId} to restore. If this parameter is not specified, the most recently closed session is restored.
     */
    export function restore(

      sessionId?: string,

      /**
       * @param restoredSession A {@link sessions.Session} containing the restored {@link windows.Window} or {@link tabs.Tab} object.
       */
      callback?: (
        restoredSession: Session,
      ) => void,
    ): void;
  }

  /**
   * Stub namespace for the "import" and "export" manifest keys.
   *
   * @since Chrome 89
   */
  export namespace sharedModule {

    export interface Import {

      /**
       * Extension ID of the shared module this extension or app depends on.
       */
      id: string;

      /**
       * Minimum supported version of the shared module.
       */
      minimum_version?: string;
    }

    export interface Export {

      /**
       * Optional list of extension IDs explicitly allowed to import this Shared Module's resources. If no allowlist is given, all extensions are allowed to import it.
       */
      allowlist?: string[];
    }
  }

  /**
   * Use the `chrome.sidePanel` API to host content in the browser's side panel alongside the main content of a webpage.
   *
   * @since Chrome 114
   * @chrome-permission sidePanel
   * @chrome-min-manifest MV3
   */
  export namespace sidePanel {

    export interface SidePanel {

      /**
       * Developer specified path for side panel display.
       */
      default_path: string;
    }

    export interface PanelOptions {

      /**
       * If specified, the side panel options will only apply to the tab with this id. If omitted, these options set the default behavior (used for any tab that doesn't have specific settings). Note: if the same path is set for this tabId and the default tabId, then the panel for this tabId will be a different instance than the panel for the default tabId.
       */
      tabId?: number;

      /**
       * The path to the side panel HTML file to use. This must be a local resource within the extension package.
       */
      path?: string;

      /**
       * Whether the side panel should be enabled. This is optional. The default value is true.
       */
      enabled?: boolean;
    }

    export interface PanelBehavior {

      /**
       * Whether clicking the extension's icon will toggle showing the extension's entry in the side panel. Defaults to false.
       */
      openPanelOnActionClick?: boolean;
    }

    export interface GetPanelOptions {

      /**
       * If specified, the side panel options for the given tab will be returned. Otherwise, returns the default side panel options (used for any tab that doesn't have specific settings).
       */
      tabId?: number;
    }

    /**
     * @since Chrome 116
     */
    export interface OpenOptions {

      /**
       * The window in which to open the side panel. This is only applicable if the extension has a global (non-tab-specific) side panel or `tabId` is also specified. This will override any currently-active global side panel the user has open in the given window. At least one of this or `tabId` must be provided.
       */
      windowId?: number;

      /**
       * The tab in which to open the side panel. If the corresponding tab has a tab-specific side panel, the panel will only be open for that tab. If there is not a tab-specific panel, the global panel will be open in the specified tab and any other tabs without a currently-open tab- specific panel. This will override any currently-active side panel (global or tab-specific) in the corresponding tab. At least one of this or `windowId` must be provided.
       */
      tabId?: number;
    }

    /**
     * Configures the side panel.
     *
     * @param options The configuration options to apply to the panel.
     */
    export function setOptions(

      options: PanelOptions,
    ): Promise<void>;

    /**
     * Configures the side panel.
     *
     * @param options The configuration options to apply to the panel.
     * @param callback Invoked when the options have been set.
     */
    export function setOptions(

      options: PanelOptions,

      callback?: () => void,
    ): void;

    /**
     * Returns the active panel configuration.
     *
     * @param options Specifies the context to return the configuration for.
     */
    export function getOptions(

      options: GetPanelOptions,
    ): Promise<PanelOptions>;

    /**
     * Returns the active panel configuration.
     *
     * @param options Specifies the context to return the configuration for.
     * @param callback Called with the active panel configuration.
     */
    export function getOptions(

      options: GetPanelOptions,

      callback?: (
        options: PanelOptions,
      ) => void,
    ): void;

    /**
     * Configures the extension's side panel behavior. This is an upsert operation.
     *
     * @param behavior The new behavior to be set.
     */
    export function setPanelBehavior(

      behavior: PanelBehavior,
    ): Promise<void>;

    /**
     * Configures the extension's side panel behavior. This is an upsert operation.
     *
     * @param behavior The new behavior to be set.
     * @param callback Called when the new behavior has been set.
     */
    export function setPanelBehavior(

      behavior: PanelBehavior,

      callback?: () => void,
    ): void;

    /**
     * Returns the extension's current side panel behavior.
     */
    export function getPanelBehavior(): Promise<PanelBehavior>;

    /**
     * Returns the extension's current side panel behavior.
     *
     * @param callback Called with the extension's side panel behavior.
     */
    export function getPanelBehavior(

      callback?: (
        behavior: PanelBehavior,
      ) => void,
    ): void;

    /**
     * Opens the side panel for the extension. This may only be called in response to a user action.
     *
     * @param options Specifies the context in which to open the side panel.
     * @since Chrome 116
     */
    export function open(

      options: OpenOptions,
    ): Promise<void>;

    /**
     * Opens the side panel for the extension. This may only be called in response to a user action.
     *
     * @param options Specifies the context in which to open the side panel.
     * @param callback Called when the side panel has been opened.
     * @since Chrome 116
     */
    export function open(

      options: OpenOptions,

      callback?: () => void,
    ): void;
  }

  /**
   * Use the `chrome.sockets.tcp` API to send and receive data over the network using TCP connections. This API supersedes the TCP functionality previously found in the `chrome.socket` API.
   *
   * @alpha
   * @chrome-manifest sockets
   * @chrome-channel dev
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace sockets.tcp {

    export interface SocketProperties {

      /**
       * Flag indicating if the socket is left open when the event page of the application is unloaded (see [Manage App Lifecycle](https://developer.chrome.com/docs/apps/app_lifecycle)). The default value is "false." When the application is loaded, any sockets previously opened with persistent=true can be fetched with `getSockets`.
       */
      persistent?: boolean;

      /**
       * An application-defined string associated with the socket.
       */
      name?: string;

      /**
       * The size of the buffer used to receive data. The default value is 4096.
       */
      bufferSize?: number;
    }

    export interface CreateInfo {

      /**
       * The ID of the newly created socket. Note that socket IDs created from this API are not compatible with socket IDs created from other APIs, such as the deprecated `{@link socket}` API.
       */
      socketId: number;
    }

    /**
     * DNS resolution preferences. The default is `any` and uses the current OS config which may return IPv4 or IPv6. `ipv4` forces IPv4, and `ipv6` forces IPv6.
     */
    export type DnsQueryType = "any" | "ipv4" | "ipv6";

    export interface SendInfo {

      /**
       * The result code returned from the underlying network call. A negative value indicates an error.
       */
      resultCode: number;

      /**
       * The number of bytes sent (if result == 0)
       */
      bytesSent?: number;
    }

    export interface TLSVersionConstraints {

      /**
       * The minimum and maximum acceptable versions of TLS. Supported values are `tls1.2` or `tls1.3`.
       *
       * The values `tls1` and `tls1.1` are no longer supported. If `min` is set to one of these values, it will be silently clamped to `tls1.2`. If `max` is set to one of those values, or any other unrecognized value, it will be silently ignored.
       */
      min?: string;

      max?: string;
    }

    export interface SecureOptions {

      tlsVersion?: TLSVersionConstraints;
    }

    export interface SocketInfo {

      /**
       * The socket identifier.
       */
      socketId: number;

      /**
       * Flag indicating whether the socket is left open when the application is suspended (see `SocketProperties.persistent`).
       */
      persistent: boolean;

      /**
       * Application-defined string associated with the socket.
       */
      name?: string;

      /**
       * The size of the buffer used to receive data. If no buffer size has been specified explictly, the value is not provided.
       */
      bufferSize?: number;

      /**
       * Flag indicating whether a connected socket blocks its peer from sending more data (see `setPaused`).
       */
      paused: boolean;

      /**
       * Flag indicating whether the socket is connected to a remote peer.
       */
      connected: boolean;

      /**
       * If the underlying socket is connected, contains its local IPv4/6 address.
       */
      localAddress?: string;

      /**
       * If the underlying socket is connected, contains its local port.
       */
      localPort?: number;

      /**
       * If the underlying socket is connected, contains the peer/ IPv4/6 address.
       */
      peerAddress?: string;

      /**
       * If the underlying socket is connected, contains the peer port.
       */
      peerPort?: number;
    }

    export interface ReceiveInfo {

      /**
       * The socket identifier.
       */
      socketId: number;

      /**
       * The data received, with a maxium size of `bufferSize`.
       */
      data: ArrayBuffer;
    }

    export interface ReceiveErrorInfo {

      /**
       * The socket identifier.
       */
      socketId: number;

      /**
       * The result code returned from the underlying network call.
       */
      resultCode: number;
    }

    /**
     * Event raised when data has been received for a given socket.
     */
    export const onReceive: events.Event<(
      info: ReceiveInfo,
    ) => void>;

    /**
     * Event raised when a network error occured while the runtime was waiting for data on the socket address and port. Once this event is raised, the socket is set to `paused` and no more `onReceive` events are raised for this socket.
     */
    export const onReceiveError: events.Event<(
      info: ReceiveErrorInfo,
    ) => void>;

    /**
     * Creates a TCP socket.
     *
     * @param properties The socket properties (optional).
     */
    export function create(

      properties?: SocketProperties,
    ): Promise<CreateInfo>;

    /**
     * Creates a TCP socket.
     *
     * @param properties The socket properties (optional).
     * @param callback Called when the socket has been created.
     */
    export function create(

      properties?: SocketProperties,

      /**
       * @param createInfo The result of the socket creation.
       */
      callback?: (
        createInfo: CreateInfo,
      ) => void,
    ): void;

    /**
     * Updates the socket properties.
     *
     * @param socketId The socket identifier.
     * @param properties The properties to update.
     */
    export function update(

      socketId: number,

      properties: SocketProperties,
    ): Promise<void>;

    /**
     * Updates the socket properties.
     *
     * @param socketId The socket identifier.
     * @param properties The properties to update.
     * @param callback Called when the properties are updated.
     */
    export function update(

      socketId: number,

      properties: SocketProperties,

      callback?: () => void,
    ): void;

    /**
     * Enables or disables the application from receiving messages from its peer. The default value is "false". Pausing a socket is typically used by an application to throttle data sent by its peer. When a socket is paused, no `onReceive` event is raised. When a socket is connected and un-paused, `onReceive` events are raised again when messages are received.
     */
    export function setPaused(

      socketId: number,

      paused: boolean,
    ): Promise<void>;

    /**
     * Enables or disables the application from receiving messages from its peer. The default value is "false". Pausing a socket is typically used by an application to throttle data sent by its peer. When a socket is paused, no `onReceive` event is raised. When a socket is connected and un-paused, `onReceive` events are raised again when messages are received.
     *
     * @param callback Callback from the `setPaused` method.
     */
    export function setPaused(

      socketId: number,

      paused: boolean,

      callback?: () => void,
    ): void;

    /**
     * Enables or disables the keep-alive functionality for a TCP connection.
     *
     * @param socketId The socket identifier.
     * @param enable If true, enable keep-alive functionality.
     * @param delay Set the delay seconds between the last data packet received and the first keepalive probe. Default is 0.
     * @param callback Called when the setKeepAlive attempt is complete.
     */
    export function setKeepAlive(

      socketId: number,

      enable: boolean,

      delay: number,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Enables or disables the keep-alive functionality for a TCP connection.
     *
     * @param socketId The socket identifier.
     * @param enable If true, enable keep-alive functionality.
     * @param callback Called when the setKeepAlive attempt is complete.
     */
    export function setKeepAlive(

      socketId: number,

      enable: boolean,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Sets or clears `TCP_NODELAY` for a TCP connection. Nagle's algorithm will be disabled when `TCP_NODELAY` is set.
     *
     * @param socketId The socket identifier.
     * @param noDelay If true, disables Nagle's algorithm.
     * @param callback Called when the setNoDelay attempt is complete.
     */
    export function setNoDelay(

      socketId: number,

      noDelay: boolean,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Connects the socket to a remote machine. When the `connect` operation completes successfully, `onReceive` events are raised when data is received from the peer. If a network error occurs while the runtime is receiving packets, a `onReceiveError` event is raised, at which point no more `onReceive` event will be raised for this socket until the `resume` method is called.
     *
     * @param socketId The socket identifier.
     * @param peerAddress The address of the remote machine. DNS name, IPv4 and IPv6 formats are supported.
     * @param peerPort The port of the remote machine.
     * @param dnsQueryType The address resolution preference.
     * @param callback Called when the connect attempt is complete.
     */
    export function connect(

      socketId: number,

      peerAddress: string,

      peerPort: number,

      dnsQueryType: DnsQueryType,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Connects the socket to a remote machine. When the `connect` operation completes successfully, `onReceive` events are raised when data is received from the peer. If a network error occurs while the runtime is receiving packets, a `onReceiveError` event is raised, at which point no more `onReceive` event will be raised for this socket until the `resume` method is called.
     *
     * @param socketId The socket identifier.
     * @param peerAddress The address of the remote machine. DNS name, IPv4 and IPv6 formats are supported.
     * @param peerPort The port of the remote machine.
     * @param callback Called when the connect attempt is complete.
     */
    export function connect(

      socketId: number,

      peerAddress: string,

      peerPort: number,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Disconnects the socket.
     *
     * @param socketId The socket identifier.
     */
    export function disconnect(

      socketId: number,
    ): Promise<void>;

    /**
     * Disconnects the socket.
     *
     * @param socketId The socket identifier.
     * @param callback Called when the disconnect attempt is complete.
     */
    export function disconnect(

      socketId: number,

      callback?: () => void,
    ): void;

    /**
     * Start a TLS client connection over the connected TCP client socket.
     *
     * @param socketId The existing, connected socket to use.
     * @param options Constraints and parameters for the TLS connection.
     * @param callback Called when the connection attempt is complete.
     */
    export function secure(

      socketId: number,

      options: SecureOptions,

      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Start a TLS client connection over the connected TCP client socket.
     *
     * @param socketId The existing, connected socket to use.
     * @param callback Called when the connection attempt is complete.
     */
    export function secure(

      socketId: number,

      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Sends data on the given TCP socket.
     *
     * @param socketId The socket identifier.
     * @param data The data to send.
     * @param callback Called when the `send` operation completes.
     */
    export function send(

      socketId: number,

      data: ArrayBuffer,

      /**
       * @param sendInfo Result of the `send` method.
       */
      callback: (
        sendInfo: SendInfo,
      ) => void,
    ): void;

    /**
     * Closes the socket and releases the address/port the socket is bound to. Each socket created should be closed after use. The socket id is no no longer valid as soon at the function is called. However, the socket is guaranteed to be closed only when the callback is invoked.
     *
     * @param socketId The socket identifier.
     */
    export function close(

      socketId: number,
    ): Promise<void>;

    /**
     * Closes the socket and releases the address/port the socket is bound to. Each socket created should be closed after use. The socket id is no no longer valid as soon at the function is called. However, the socket is guaranteed to be closed only when the callback is invoked.
     *
     * @param socketId The socket identifier.
     * @param callback Called when the `close` operation completes.
     */
    export function close(

      socketId: number,

      callback?: () => void,
    ): void;

    /**
     * Retrieves the state of the given socket.
     *
     * @param socketId The socket identifier.
     */
    export function getInfo(

      socketId: number,
    ): Promise<SocketInfo>;

    /**
     * Retrieves the state of the given socket.
     *
     * @param socketId The socket identifier.
     * @param callback Called when the socket state is available.
     */
    export function getInfo(

      socketId: number,

      /**
       * @param socketInfo Object containing the socket information.
       */
      callback?: (
        socketInfo: SocketInfo,
      ) => void,
    ): void;

    /**
     * Retrieves the list of currently opened sockets owned by the application.
     */
    export function getSockets(): Promise<SocketInfo[]>;

    /**
     * Retrieves the list of currently opened sockets owned by the application.
     *
     * @param callback Called when the list of sockets is available.
     */
    export function getSockets(

      /**
       * @param socketInfos Array of object containing socket information.
       */
      callback?: (
        socketInfos: SocketInfo[],
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.sockets.tcpServer` API to create server applications using TCP connections. This API supersedes the TCP functionality previously found in the `chrome.socket` API.
   *
   * @alpha
   * @chrome-manifest sockets
   * @chrome-channel dev
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace sockets.tcpServer {

    export interface SocketProperties {

      /**
       * Flag indicating if the socket remains open when the event page of the application is unloaded (see [Manage App Lifecycle](https://developer.chrome.com/docs/apps/app_lifecycle)). The default value is "false." When the application is loaded, any sockets previously opened with persistent=true can be fetched with `getSockets`.
       */
      persistent?: boolean;

      /**
       * An application-defined string associated with the socket.
       */
      name?: string;
    }

    export interface CreateInfo {

      /**
       * The ID of the newly created server socket. Note that socket IDs created from this API are not compatible with socket IDs created from other APIs, such as the deprecated `{@link socket}` API.
       */
      socketId: number;
    }

    export interface SocketInfo {

      /**
       * The socket identifier.
       */
      socketId: number;

      /**
       * Flag indicating if the socket remains open when the event page of the application is unloaded (see `SocketProperties.persistent`). The default value is "false".
       */
      persistent: boolean;

      /**
       * Application-defined string associated with the socket.
       */
      name?: string;

      /**
       * Flag indicating whether connection requests on a listening socket are dispatched through the `onAccept` event or queued up in the listen queue backlog. See `setPaused`. The default value is "false".
       */
      paused: boolean;

      /**
       * If the socket is listening, contains its local IPv4/6 address.
       */
      localAddress?: string;

      /**
       * If the socket is listening, contains its local port.
       */
      localPort?: number;
    }

    export interface AcceptInfo {

      /**
       * The server socket identifier.
       */
      socketId: number;

      /**
       * The client socket identifier, i.e. the socket identifier of the newly established connection. This socket identifier should be used only with functions from the `chrome.sockets.tcp` namespace. Note the client socket is initially paused and must be explictly un-paused by the application to start receiving data.
       */
      clientSocketId: number;
    }

    export interface AcceptErrorInfo {

      /**
       * The server socket identifier.
       */
      socketId: number;

      /**
       * The result code returned from the underlying network call.
       */
      resultCode: number;
    }

    /**
     * Event raised when a connection has been made to the server socket.
     */
    export const onAccept: events.Event<(
      info: AcceptInfo,
    ) => void>;

    /**
     * Event raised when a network error occured while the runtime was waiting for new connections on the socket address and port. Once this event is raised, the socket is set to `paused` and no more `onAccept` events are raised for this socket until the socket is resumed.
     */
    export const onAcceptError: events.Event<(
      info: AcceptErrorInfo,
    ) => void>;

    /**
     * Creates a TCP server socket.
     *
     * @param properties The socket properties (optional).
     */
    export function create(

      properties?: SocketProperties,
    ): Promise<CreateInfo>;

    /**
     * Creates a TCP server socket.
     *
     * @param properties The socket properties (optional).
     * @param callback Called when the socket has been created.
     */
    export function create(

      properties?: SocketProperties,

      /**
       * @param createInfo The result of the socket creation.
       */
      callback?: (
        createInfo: CreateInfo,
      ) => void,
    ): void;

    /**
     * Updates the socket properties.
     *
     * @param socketId The socket identifier.
     * @param properties The properties to update.
     */
    export function update(

      socketId: number,

      properties: SocketProperties,
    ): Promise<void>;

    /**
     * Updates the socket properties.
     *
     * @param socketId The socket identifier.
     * @param properties The properties to update.
     * @param callback Called when the properties are updated.
     */
    export function update(

      socketId: number,

      properties: SocketProperties,

      callback?: () => void,
    ): void;

    /**
     * Enables or disables a listening socket from accepting new connections. When paused, a listening socket accepts new connections until its backlog (see `listen` function) is full then refuses additional connection requests. `onAccept` events are raised only when the socket is un-paused.
     */
    export function setPaused(

      socketId: number,

      paused: boolean,
    ): Promise<void>;

    /**
     * Enables or disables a listening socket from accepting new connections. When paused, a listening socket accepts new connections until its backlog (see `listen` function) is full then refuses additional connection requests. `onAccept` events are raised only when the socket is un-paused.
     *
     * @param callback Callback from the `setPaused` method.
     */
    export function setPaused(

      socketId: number,

      paused: boolean,

      callback?: () => void,
    ): void;

    /**
     * Listens for connections on the specified port and address. If the port/address is in use, the callback indicates a failure.
     *
     * @param socketId The socket identifier.
     * @param address The address of the local machine.
     * @param port The port of the local machine. When set to `0`, a free port is chosen dynamically. The dynamically allocated port can be found by calling `getInfo`.
     * @param backlog Length of the socket's listen queue. The default value depends on the Operating System (SOMAXCONN), which ensures a reasonable queue length for most applications.
     * @param callback Called when listen operation completes.
     */
    export function listen(

      socketId: number,

      address: string,

      port: number,

      backlog: number,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Listens for connections on the specified port and address. If the port/address is in use, the callback indicates a failure.
     *
     * @param socketId The socket identifier.
     * @param address The address of the local machine.
     * @param port The port of the local machine. When set to `0`, a free port is chosen dynamically. The dynamically allocated port can be found by calling `getInfo`.
     * @param callback Called when listen operation completes.
     */
    export function listen(

      socketId: number,

      address: string,

      port: number,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Disconnects the listening socket, i.e. stops accepting new connections and releases the address/port the socket is bound to. The socket identifier remains valid, e.g. it can be used with `listen` to accept connections on a new port and address.
     *
     * @param socketId The socket identifier.
     */
    export function disconnect(

      socketId: number,
    ): Promise<void>;

    /**
     * Disconnects the listening socket, i.e. stops accepting new connections and releases the address/port the socket is bound to. The socket identifier remains valid, e.g. it can be used with `listen` to accept connections on a new port and address.
     *
     * @param socketId The socket identifier.
     * @param callback Called when the disconnect attempt is complete.
     */
    export function disconnect(

      socketId: number,

      callback?: () => void,
    ): void;

    /**
     * Disconnects and destroys the socket. Each socket created should be closed after use. The socket id is no longer valid as soon at the function is called. However, the socket is guaranteed to be closed only when the callback is invoked.
     *
     * @param socketId The socket identifier.
     */
    export function close(

      socketId: number,
    ): Promise<void>;

    /**
     * Disconnects and destroys the socket. Each socket created should be closed after use. The socket id is no longer valid as soon at the function is called. However, the socket is guaranteed to be closed only when the callback is invoked.
     *
     * @param socketId The socket identifier.
     * @param callback Called when the `close` operation completes.
     */
    export function close(

      socketId: number,

      callback?: () => void,
    ): void;

    /**
     * Retrieves the state of the given socket.
     *
     * @param socketId The socket identifier.
     */
    export function getInfo(

      socketId: number,
    ): Promise<SocketInfo>;

    /**
     * Retrieves the state of the given socket.
     *
     * @param socketId The socket identifier.
     * @param callback Called when the socket state is available.
     */
    export function getInfo(

      socketId: number,

      /**
       * @param socketInfo Object containing the socket information.
       */
      callback?: (
        socketInfo: SocketInfo,
      ) => void,
    ): void;

    /**
     * Retrieves the list of currently opened sockets owned by the application.
     */
    export function getSockets(): Promise<SocketInfo[]>;

    /**
     * Retrieves the list of currently opened sockets owned by the application.
     *
     * @param callback Called when the list of sockets is available.
     */
    export function getSockets(

      /**
       * @param socketInfos Array of object containing socket information.
       */
      callback?: (
        socketInfos: SocketInfo[],
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.sockets.udp` API to send and receive data over the network using UDP connections. This API supersedes the UDP functionality previously found in the "socket" API.
   *
   * @alpha
   * @chrome-manifest sockets
   * @chrome-channel dev
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace sockets.udp {

    export interface SocketProperties {

      /**
       * Flag indicating if the socket is left open when the event page of the application is unloaded (see [Manage App Lifecycle](https://developer.chrome.com/docs/apps/app_lifecycle)). The default value is "false." When the application is loaded, any sockets previously opened with persistent=true can be fetched with `getSockets`.
       */
      persistent?: boolean;

      /**
       * An application-defined string associated with the socket.
       */
      name?: string;

      /**
       * The size of the buffer used to receive data. If the buffer is too small to receive the UDP packet, data is lost. The default value is 4096.
       */
      bufferSize?: number;
    }

    export interface CreateInfo {

      /**
       * The ID of the newly created socket. Note that socket IDs created from this API are not compatible with socket IDs created from other APIs, such as the deprecated `{@link socket}` API.
       */
      socketId: number;
    }

    /**
     * DNS resolution preferences. The default is `any` and uses the current OS config which may return IPv4 or IPv6. `ipv4` forces IPv4, and `ipv6` forces IPv6.
     */
    export type DnsQueryType = "any" | "ipv4" | "ipv6";

    export interface SendInfo {

      /**
       * The result code returned from the underlying network call. A negative value indicates an error.
       */
      resultCode: number;

      /**
       * The number of bytes sent (if result == 0)
       */
      bytesSent?: number;
    }

    export interface SocketInfo {

      /**
       * The socket identifier.
       */
      socketId: number;

      /**
       * Flag indicating whether the socket is left open when the application is suspended (see `SocketProperties.persistent`).
       */
      persistent: boolean;

      /**
       * Application-defined string associated with the socket.
       */
      name?: string;

      /**
       * The size of the buffer used to receive data. If no buffer size has been specified explictly, the value is not provided.
       */
      bufferSize?: number;

      /**
       * Flag indicating whether the socket is blocked from firing onReceive events.
       */
      paused: boolean;

      /**
       * If the underlying socket is bound, contains its local IPv4/6 address.
       */
      localAddress?: string;

      /**
       * If the underlying socket is bound, contains its local port.
       */
      localPort?: number;
    }

    export interface ReceiveInfo {

      /**
       * The socket ID.
       */
      socketId: number;

      /**
       * The UDP packet content (truncated to the current buffer size).
       */
      data: ArrayBuffer;

      /**
       * The address of the host the packet comes from.
       */
      remoteAddress: string;

      /**
       * The port of the host the packet comes from.
       */
      remotePort: number;
    }

    export interface ReceiveErrorInfo {

      /**
       * The socket ID.
       */
      socketId: number;

      /**
       * The result code returned from the underlying recvfrom() call.
       */
      resultCode: number;
    }

    /**
     * Event raised when a UDP packet has been received for the given socket.
     */
    export const onReceive: events.Event<(
      info: ReceiveInfo,
    ) => void>;

    /**
     * Event raised when a network error occured while the runtime was waiting for data on the socket address and port. Once this event is raised, the socket is paused and no more `onReceive` events will be raised for this socket until the socket is resumed.
     */
    export const onReceiveError: events.Event<(
      info: ReceiveErrorInfo,
    ) => void>;

    /**
     * Creates a UDP socket with the given properties.
     *
     * @param properties The socket properties (optional).
     */
    export function create(

      properties?: SocketProperties,
    ): Promise<CreateInfo>;

    /**
     * Creates a UDP socket with the given properties.
     *
     * @param properties The socket properties (optional).
     * @param callback Called when the socket has been created.
     */
    export function create(

      properties?: SocketProperties,

      /**
       * @param createInfo The result of the socket creation.
       */
      callback?: (
        createInfo: CreateInfo,
      ) => void,
    ): void;

    /**
     * Updates the socket properties.
     *
     * @param socketId The socket ID.
     * @param properties The properties to update.
     */
    export function update(

      socketId: number,

      properties: SocketProperties,
    ): Promise<void>;

    /**
     * Updates the socket properties.
     *
     * @param socketId The socket ID.
     * @param properties The properties to update.
     * @param callback Called when the properties are updated.
     */
    export function update(

      socketId: number,

      properties: SocketProperties,

      callback?: () => void,
    ): void;

    /**
     * Pauses or unpauses a socket. A paused socket is blocked from firing `onReceive` events.
     *
     * @param paused Flag to indicate whether to pause or unpause.
     */
    export function setPaused(

      socketId: number,

      paused: boolean,
    ): Promise<void>;

    /**
     * Pauses or unpauses a socket. A paused socket is blocked from firing `onReceive` events.
     *
     * @param paused Flag to indicate whether to pause or unpause.
     * @param callback Called when the socket has been successfully paused or unpaused.
     */
    export function setPaused(

      socketId: number,

      paused: boolean,

      callback?: () => void,
    ): void;

    /**
     * Binds the local address and port for the socket. For a client socket, it is recommended to use port 0 to let the platform pick a free port.
     *
     * Once the `bind` operation completes successfully, `onReceive` events are raised when UDP packets arrive on the address/port specified -- unless the socket is paused.
     *
     * @param socketId The socket ID.
     * @param address The address of the local machine. DNS name, IPv4 and IPv6 formats are supported. Use "0.0.0.0" to accept packets from all local available network interfaces.
     * @param port The port of the local machine. Use "0" to bind to a free port.
     * @param callback Called when the `bind` operation completes.
     */
    export function bind(

      socketId: number,

      address: string,

      port: number,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Sends data on the given socket to the given address and port. The socket must be bound to a local port before calling this method.
     *
     * @param socketId The socket ID.
     * @param data The data to send.
     * @param address The address of the remote machine.
     * @param port The port of the remote machine.
     * @param dnsQueryType The address resolution preference.
     * @param callback Called when the `send` operation completes.
     */
    export function send(

      socketId: number,

      data: ArrayBuffer,

      address: string,

      port: number,

      dnsQueryType: DnsQueryType,

      /**
       * @param sendInfo Result of the `send` method.
       */
      callback: (
        sendInfo: SendInfo,
      ) => void,
    ): void;

    /**
     * Sends data on the given socket to the given address and port. The socket must be bound to a local port before calling this method.
     *
     * @param socketId The socket ID.
     * @param data The data to send.
     * @param address The address of the remote machine.
     * @param port The port of the remote machine.
     * @param callback Called when the `send` operation completes.
     */
    export function send(

      socketId: number,

      data: ArrayBuffer,

      address: string,

      port: number,

      /**
       * @param sendInfo Result of the `send` method.
       */
      callback: (
        sendInfo: SendInfo,
      ) => void,
    ): void;

    /**
     * Closes the socket and releases the address/port the socket is bound to. Each socket created should be closed after use. The socket id is no longer valid as soon at the function is called. However, the socket is guaranteed to be closed only when the callback is invoked.
     *
     * @param socketId The socket ID.
     */
    export function close(

      socketId: number,
    ): Promise<void>;

    /**
     * Closes the socket and releases the address/port the socket is bound to. Each socket created should be closed after use. The socket id is no longer valid as soon at the function is called. However, the socket is guaranteed to be closed only when the callback is invoked.
     *
     * @param socketId The socket ID.
     * @param callback Called when the `close` operation completes.
     */
    export function close(

      socketId: number,

      callback?: () => void,
    ): void;

    /**
     * Retrieves the state of the given socket.
     *
     * @param socketId The socket ID.
     */
    export function getInfo(

      socketId: number,
    ): Promise<SocketInfo>;

    /**
     * Retrieves the state of the given socket.
     *
     * @param socketId The socket ID.
     * @param callback Called when the socket state is available.
     */
    export function getInfo(

      socketId: number,

      /**
       * @param socketInfo Object containing the socket information.
       */
      callback?: (
        socketInfo: SocketInfo,
      ) => void,
    ): void;

    /**
     * Retrieves the list of currently opened sockets owned by the application.
     */
    export function getSockets(): Promise<SocketInfo[]>;

    /**
     * Retrieves the list of currently opened sockets owned by the application.
     *
     * @param callback Called when the list of sockets is available.
     */
    export function getSockets(

      /**
       * @param socketInfos Array of object containing socket information.
       */
      callback?: (
        socketInfos: SocketInfo[],
      ) => void,
    ): void;

    /**
     * Joins the multicast group and starts to receive packets from that group. The socket must be bound to a local port before calling this method.
     *
     * @param socketId The socket ID.
     * @param address The group address to join. Domain names are not supported.
     * @param callback Called when the `joinGroup` operation completes.
     */
    export function joinGroup(

      socketId: number,

      address: string,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Leaves the multicast group previously joined using `joinGroup`. This is only necessary to call if you plan to keep using the socketafterwards, since it will be done automatically by the OS when the socket is closed.
     *
     * Leaving the group will prevent the router from sending multicast datagrams to the local host, presuming no other process on the host is still joined to the group.
     *
     * @param socketId The socket ID.
     * @param address The group address to leave. Domain names are not supported.
     * @param callback Called when the `leaveGroup` operation completes.
     */
    export function leaveGroup(

      socketId: number,

      address: string,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Sets the time-to-live of multicast packets sent to the multicast group.
     *
     * Calling this method does not require multicast permissions.
     *
     * @param socketId The socket ID.
     * @param ttl The time-to-live value.
     * @param callback Called when the configuration operation completes.
     */
    export function setMulticastTimeToLive(

      socketId: number,

      ttl: number,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Sets whether multicast packets sent from the host to the multicast group will be looped back to the host.
     *
     * Note: the behavior of `setMulticastLoopbackMode` is slightly different between Windows and Unix-like systems. The inconsistency happens only when there is more than one application on the same host joined to the same multicast group while having different settings on multicast loopback mode. On Windows, the applications with loopback off will not RECEIVE the loopback packets; while on Unix-like systems, the applications with loopback off will not SEND the loopback packets to other applications on the same host. See MSDN: http://goo.gl/6vqbj
     *
     * Calling this method does not require multicast permissions.
     *
     * @param socketId The socket ID.
     * @param enabled Indicate whether to enable loopback mode.
     * @param callback Called when the configuration operation completes.
     */
    export function setMulticastLoopbackMode(

      socketId: number,

      enabled: boolean,

      /**
       * @param result The result code returned from the underlying network call. A negative value indicates an error.
       */
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Gets the multicast group addresses the socket is currently joined to.
     *
     * @param socketId The socket ID.
     */
    export function getJoinedGroups(

      socketId: number,
    ): Promise<string[]>;

    /**
     * Gets the multicast group addresses the socket is currently joined to.
     *
     * @param socketId The socket ID.
     * @param callback Called with an array of strings of the result.
     */
    export function getJoinedGroups(

      socketId: number,

      /**
       * @param groups Array of groups the socket joined.
       */
      callback?: (
        groups: string[],
      ) => void,
    ): void;

    /**
     * Enables or disables broadcast packets on this socket.
     *
     * @param socketId The socket ID.
     * @param enabled `true` to enable broadcast packets, `false` to disable them.
     * @param callback Callback from the `setBroadcast` method.
     */
    export function setBroadcast(

      socketId: number,

      enabled: boolean,

      /**
       * @param result The result code returned from the underlying network call.
       */
      callback: (
        result: number,
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.storage` API to store, retrieve, and track changes to user data.
   *
   * @chrome-permission storage
   */
  export namespace storage {

    /**
     * The storage area's access level.
     *
     * @chrome-enum "TRUSTED\_CONTEXTS" Specifies contexts originating from the extension itself.
     * @chrome-enum "TRUSTED\_AND\_UNTRUSTED\_CONTEXTS" Specifies contexts originating from outside the extension.
     * @since Chrome 102
     */
    export type AccessLevel = "TRUSTED_CONTEXTS" | "TRUSTED_AND_UNTRUSTED_CONTEXTS";

    export interface StorageChange {

      /**
       * The old value of the item, if there was an old value.
       */
      oldValue?: any;

      /**
       * The new value of the item, if there is a new value.
       */
      newValue?: any;
    }

    export interface StorageArea {

      /**
       * Fired when one or more items change.
       *
       * @since Chrome 73
       */
      onChanged: events.Event<(
        changes: {[name: string]: StorageChange},
      ) => void>;

      /**
       * Gets one or more items from storage.
       *
       * @chrome-returns-extra since Chrome 88
       * @param keys A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object). An empty list or object will return an empty result object. Pass in `null` to get the entire contents of storage.
       */
      get(

        keys?: string | string[] | {[name: string]: any},
      ): Promise<{[name: string]: any}>;

      /**
       * Gets one or more items from storage.
       *
       * @param keys A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object). An empty list or object will return an empty result object. Pass in `null` to get the entire contents of storage.
       * @param callback Callback with storage items, or on failure (in which case {@link runtime.lastError} will be set).
       */
      get(

        keys?: string | string[] | {[name: string]: any},

        /**
         * @param items Object with items in their key-value mappings.
         */
        callback?: (
          items: {[name: string]: any},
        ) => void,
      ): void;

      /**
       * Gets the amount of space (in bytes) being used by one or more items.
       *
       * @chrome-returns-extra since Chrome 88
       * @param keys A single key or list of keys to get the total usage for. An empty list will return 0. Pass in `null` to get the total usage of all of storage.
       */
      getBytesInUse(

        keys?: string | string[],
      ): Promise<number>;

      /**
       * Gets the amount of space (in bytes) being used by one or more items.
       *
       * @param keys A single key or list of keys to get the total usage for. An empty list will return 0. Pass in `null` to get the total usage of all of storage.
       * @param callback Callback with the amount of space being used by storage, or on failure (in which case {@link runtime.lastError} will be set).
       */
      getBytesInUse(

        keys?: string | string[],

        /**
         * @param bytesInUse Amount of space being used in storage, in bytes.
         */
        callback?: (
          bytesInUse: number,
        ) => void,
      ): void;

      /**
       * Sets multiple items.
       *
       * @chrome-returns-extra since Chrome 88
       * @param items

      An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected.

      Primitive values such as numbers will serialize as expected. Values with a `typeof` `"object"` and `"function"` will typically serialize to `{}`, with the exception of `Array` (serializes as expected), `Date`, and `Regex` (serialize using their `String` representation).
       */
      set(

        items: {[name: string]: any},
      ): Promise<void>;

      /**
       * Sets multiple items.
       *
       * @param items

      An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected.

      Primitive values such as numbers will serialize as expected. Values with a `typeof` `"object"` and `"function"` will typically serialize to `{}`, with the exception of `Array` (serializes as expected), `Date`, and `Regex` (serialize using their `String` representation).
       * @param callback Callback on success, or on failure (in which case {@link runtime.lastError} will be set).
       */
      set(

        items: {[name: string]: any},

        callback?: () => void,
      ): void;

      /**
       * Removes one or more items from storage.
       *
       * @chrome-returns-extra since Chrome 88
       * @param keys A single key or a list of keys for items to remove.
       */
      remove(

        keys: string | string[],
      ): Promise<void>;

      /**
       * Removes one or more items from storage.
       *
       * @param keys A single key or a list of keys for items to remove.
       * @param callback Callback on success, or on failure (in which case {@link runtime.lastError} will be set).
       */
      remove(

        keys: string | string[],

        callback?: () => void,
      ): void;

      /**
       * Removes all items from storage.
       *
       * @chrome-returns-extra since Chrome 88
       */
      clear(): Promise<void>;

      /**
       * Removes all items from storage.
       *
       * @param callback Callback on success, or on failure (in which case {@link runtime.lastError} will be set).
       */
      clear(

        callback?: () => void,
      ): void;

      /**
       * Sets the desired access level for the storage area. The default will be only trusted contexts.
       *
       * @since Chrome 102
       */
      setAccessLevel(

        accessOptions: {

          /**
           * The access level of the storage area.
           */
          accessLevel: AccessLevel,
        },
      ): Promise<void>;

      /**
       * Sets the desired access level for the storage area. The default will be only trusted contexts.
       *
       * @param callback Callback on success, or on failure (in which case {@link runtime.lastError} will be set).
       * @since Chrome 102
       */
      setAccessLevel(

        accessOptions: {

          /**
           * The access level of the storage area.
           */
          accessLevel: AccessLevel,
        },

        callback?: () => void,
      ): void;
    }

    /**
     * Items in the `sync` storage area are synced using Chrome Sync.
     */
    export const sync: StorageArea & {

      /**
       * The maximum total amount (in bytes) of data that can be stored in sync storage, as measured by the JSON stringification of every value plus every key's length. Updates that would cause this limit to be exceeded fail immediately and set {@link runtime.lastError} when using a callback, or when a Promise is rejected.
       */
      QUOTA_BYTES: 102400,

      /**
       * The maximum size (in bytes) of each individual item in sync storage, as measured by the JSON stringification of its value plus its key length. Updates containing items larger than this limit will fail immediately and set {@link runtime.lastError} when using a callback, or when a Promise is rejected.
       */
      QUOTA_BYTES_PER_ITEM: 8192,

      /**
       * The maximum number of items that can be stored in sync storage. Updates that would cause this limit to be exceeded will fail immediately and set {@link runtime.lastError} when using a callback, or when a Promise is rejected.
       */
      MAX_ITEMS: 512,

      /**
       * The maximum number of `set`, `remove`, or `clear` operations that can be performed each hour. This is 1 every 2 seconds, a lower ceiling than the short term higher writes-per-minute limit.
       *
       * Updates that would cause this limit to be exceeded fail immediately and set {@link runtime.lastError} when using a callback, or when a Promise is rejected.
       */
      MAX_WRITE_OPERATIONS_PER_HOUR: 1800,

      /**
       * The maximum number of `set`, `remove`, or `clear` operations that can be performed each minute. This is 2 per second, providing higher throughput than writes-per-hour over a shorter period of time.
       *
       * Updates that would cause this limit to be exceeded fail immediately and set {@link runtime.lastError} when using a callback, or when a Promise is rejected.
       */
      MAX_WRITE_OPERATIONS_PER_MINUTE: 120,

      /**
       * @deprecated The storage.sync API no longer has a sustained write operation quota.
       */
      MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: 1000000,
    };

    /**
     * Items in the `local` storage area are local to each machine.
     */
    export const local: StorageArea & {

      /**
       * The maximum amount (in bytes) of data that can be stored in local storage, as measured by the JSON stringification of every value plus every key's length. This value will be ignored if the extension has the `unlimitedStorage` permission. Updates that would cause this limit to be exceeded fail immediately and set {@link runtime.lastError} when using a callback, or a rejected Promise if using async/await.
       */
      QUOTA_BYTES: 10485760,
    };

    /**
     * Items in the `managed` storage area are set by the domain administrator, and are read-only for the extension; trying to modify this namespace results in an error.
     */
    export const managed: StorageArea;

    /**
     * Items in the `session` storage area are stored in-memory and will not be persisted to disk.
     *
     * @since Chrome 102
     * @chrome-min-manifest MV3
     */
    export const session: StorageArea & {

      /**
       * The maximum amount (in bytes) of data that can be stored in memory, as measured by estimating the dynamically allocated memory usage of every value and key. Updates that would cause this limit to be exceeded fail immediately and set {@link runtime.lastError} when using a callback, or when a Promise is rejected.
       */
      QUOTA_BYTES: 10485760,
    };

    /**
     * Fired when one or more items change.
     */
    export const onChanged: events.Event<(
      changes: {[name: string]: StorageChange},
      areaName: string,
    ) => void>;
  }

  /**
   * Use the `system.cpu` API to query CPU metadata.
   *
   * @chrome-permission system.cpu
   */
  export namespace system.cpu {

    export interface CpuTime {

      /**
       * The cumulative time used by userspace programs on this processor.
       */
      user: number;

      /**
       * The cumulative time used by kernel programs on this processor.
       */
      kernel: number;

      /**
       * The cumulative time spent idle by this processor.
       */
      idle: number;

      /**
       * The total cumulative time for this processor. This value is equal to user + kernel + idle.
       */
      total: number;
    }

    export interface ProcessorInfo {

      /**
       * Cumulative usage info for this logical processor.
       */
      usage: CpuTime;
    }

    export interface CpuInfo {

      /**
       * The number of logical processors.
       */
      numOfProcessors: number;

      /**
       * The architecture name of the processors.
       */
      archName: string;

      /**
       * The model name of the processors.
       */
      modelName: string;

      /**
       * A set of feature codes indicating some of the processor's capabilities. The currently supported codes are "mmx", "sse", "sse2", "sse3", "ssse3", "sse4\_1", "sse4\_2", and "avx".
       */
      features: string[];

      /**
       * Information about each logical processor.
       */
      processors: ProcessorInfo[];

      /**
       * List of CPU temperature readings from each thermal zone of the CPU. Temperatures are in degrees Celsius.
       *
       * **Currently supported on Chrome OS only.**
       *
       * @since Chrome 60
       */
      temperatures: number[];
    }

    /**
     * Queries basic CPU information of the system.
     *
     * @chrome-returns-extra since Chrome 91
     */
    export function getInfo(): Promise<CpuInfo>;

    /**
     * Queries basic CPU information of the system.
     */
    export function getInfo(

      callback?: (
        info: CpuInfo,
      ) => void,
    ): void;
  }

  /**
   * Use the `system.display` API to query display metadata.
   *
   * @chrome-permission system.display
   */
  export namespace system.display {

    export interface Bounds {

      /**
       * The x-coordinate of the upper-left corner.
       */
      left: number;

      /**
       * The y-coordinate of the upper-left corner.
       */
      top: number;

      /**
       * The width of the display in pixels.
       */
      width: number;

      /**
       * The height of the display in pixels.
       */
      height: number;
    }

    export interface Insets {

      /**
       * The x-axis distance from the left bound.
       */
      left: number;

      /**
       * The y-axis distance from the top bound.
       */
      top: number;

      /**
       * The x-axis distance from the right bound.
       */
      right: number;

      /**
       * The y-axis distance from the bottom bound.
       */
      bottom: number;
    }

    /**
     * @since Chrome 57
     */
    export interface Point {

      /**
       * The x-coordinate of the point.
       */
      x: number;

      /**
       * The y-coordinate of the point.
       */
      y: number;
    }

    /**
     * @since Chrome 57
     */
    export interface TouchCalibrationPair {

      /**
       * The coordinates of the display point.
       */
      displayPoint: Point;

      /**
       * The coordinates of the touch point corresponding to the display point.
       */
      touchPoint: Point;
    }

    /**
     * @since Chrome 57
     */
    export interface TouchCalibrationPairQuad {

      /**
       * First pair of touch and display point required for touch calibration.
       */
      pair1: TouchCalibrationPair;

      /**
       * Second pair of touch and display point required for touch calibration.
       */
      pair2: TouchCalibrationPair;

      /**
       * Third pair of touch and display point required for touch calibration.
       */
      pair3: TouchCalibrationPair;

      /**
       * Fourth pair of touch and display point required for touch calibration.
       */
      pair4: TouchCalibrationPair;
    }

    /**
     * @since Chrome 52
     */
    export interface DisplayMode {

      /**
       * The display mode width in device independent (user visible) pixels.
       */
      width: number;

      /**
       * The display mode height in device independent (user visible) pixels.
       */
      height: number;

      /**
       * The display mode width in native pixels.
       */
      widthInNativePixels: number;

      /**
       * The display mode height in native pixels.
       */
      heightInNativePixels: number;

      /**
       * The display mode UI scale factor.
       *
       * @deprecated Use {@link displayZoomFactor}
       * @chrome-deprecated-since Chrome 70
       */
      uiScale?: number;

      /**
       * The display mode device scale factor.
       */
      deviceScaleFactor: number;

      /**
       * The display mode refresh rate in hertz.
       *
       * @since Chrome 67
       */
      refreshRate: number;

      /**
       * True if the mode is the display's native mode.
       */
      isNative: boolean;

      /**
       * True if the display mode is currently selected.
       */
      isSelected: boolean;

      /**
       * True if this mode is interlaced, false if not provided.
       *
       * @since Chrome 74
       */
      isInterlaced?: boolean;
    }

    /**
     * Layout position, i.e. edge of parent that the display is attached to.
     *
     * @since Chrome 53
     */
    export type LayoutPosition = "top" | "right" | "bottom" | "left";

    /**
     * @since Chrome 53
     */
    export interface DisplayLayout {

      /**
       * The unique identifier of the display.
       */
      id: string;

      /**
       * The unique identifier of the parent display. Empty if this is the root.
       */
      parentId: string;

      /**
       * The layout position of this display relative to the parent. This will be ignored for the root.
       */
      position: LayoutPosition;

      /**
       * The offset of the display along the connected edge. 0 indicates that the topmost or leftmost corners are aligned.
       */
      offset: number;
    }

    /**
     * @since Chrome 67
     */
    export interface Edid {

      /**
       * 3 character manufacturer code. See Sec. 3.4.1 page 21. Required in v1.4.
       */
      manufacturerId: string;

      /**
       * 2 byte manufacturer-assigned code, Sec. 3.4.2 page 21. Required in v1.4.
       */
      productId: string;

      /**
       * Year of manufacturer, Sec. 3.4.4 page 22. Required in v1.4.
       */
      yearOfManufacture: number;
    }

    /**
     * An enum to tell if the display is detected and used by the system. The display is considered 'inactive', if it is not detected by the system (maybe disconnected, or considered disconnected due to sleep mode, etc). This state is used to keep existing display when the all displays are disconnected, for example.
     *
     * @since Chrome 117
     */
    export type ActiveState = "active" | "inactive";

    export interface DisplayUnitInfo {

      /**
       * The unique identifier of the display.
       */
      id: string;

      /**
       * The user-friendly name (e.g. "HP LCD monitor").
       */
      name: string;

      /**
       * NOTE: This is only available to Chrome OS Kiosk apps and Web UI.
       *
       * @since Chrome 67
       */
      edid?: Edid;

      /**
       * Chrome OS only. Identifier of the display that is being mirrored if mirroring is enabled, otherwise empty. This will be set for all displays (including the display being mirrored).
       */
      mirroringSourceId: string;

      /**
       * Chrome OS only. Identifiers of the displays to which the source display is being mirrored. Empty if no displays are being mirrored. This will be set to the same value for all displays. This must not include `mirroringSourceId`.
       *
       * @since Chrome 64
       */
      mirroringDestinationIds: string[];

      /**
       * True if this is the primary display.
       */
      isPrimary: boolean;

      /**
       * True if this display is enabled.
       */
      isEnabled: boolean;

      /**
       * Active if the display is detected and used by the system.
       *
       * @since Chrome 117
       */
      activeState: ActiveState;

      /**
       * True for all displays when in unified desktop mode. See documentation for {@link enableUnifiedDesktop}.
       *
       * @since Chrome 59
       */
      isUnified: boolean;

      /**
       * The number of pixels per inch along the x-axis.
       */
      dpiX: number;

      /**
       * The number of pixels per inch along the y-axis.
       */
      dpiY: number;

      /**
       * The display's clockwise rotation in degrees relative to the vertical position. Currently exposed only on ChromeOS. Will be set to 0 on other platforms. A value of -1 will be interpreted as auto-rotate when the device is in a physical tablet state.
       */
      rotation: number;

      /**
       * The display's logical bounds.
       */
      bounds: Bounds;

      /**
       * The display's insets within its screen's bounds. Currently exposed only on ChromeOS. Will be set to empty insets on other platforms.
       */
      overscan: Insets;

      /**
       * The usable work area of the display within the display bounds. The work area excludes areas of the display reserved for OS, for example taskbar and launcher.
       */
      workArea: Bounds;

      /**
       * The list of available display modes. The current mode will have isSelected=true. Only available on Chrome OS. Will be set to an empty array on other platforms.
       *
       * @since Chrome 52
       */
      modes: DisplayMode[];

      /**
       * True if this display has a touch input device associated with it.
       *
       * @since Chrome 57
       */
      hasTouchSupport: boolean;

      /**
       * A list of zoom factor values that can be set for the display.
       *
       * @since Chrome 67
       */
      availableDisplayZoomFactors: number[];

      /**
       * The ratio between the display's current and default zoom. For example, value 1 is equivalent to 100% zoom, and value 1.5 is equivalent to 150% zoom.
       *
       * @since Chrome 65
       */
      displayZoomFactor: number;
    }

    export interface DisplayProperties {

      /**
       * Chrome OS only. If set to true, changes the display mode to unified desktop (see {@link enableUnifiedDesktop} for details). If set to false, unified desktop mode will be disabled. This is only valid for the primary display. If provided, mirroringSourceId must not be provided and other properties will be ignored. This is has no effect if not provided.
       *
       * @since Chrome 59
       */
      isUnified?: boolean;

      /**
       * Chrome OS only. If set and not empty, enables mirroring for this display only. Otherwise disables mirroring for all displays. This value should indicate the id of the source display to mirror, which must not be the same as the id passed to setDisplayProperties. If set, no other property may be set.
       *
       * @deprecated Use {@link setMirrorMode}.
       * @chrome-deprecated-since Chrome 68
       */
      mirroringSourceId?: string;

      /**
       * If set to true, makes the display primary. No-op if set to false. Note: If set, the display is considered primary for all other properties (i.e. {@link isUnified} may be set and bounds origin may not).
       */
      isPrimary?: boolean;

      /**
       * If set, sets the display's overscan insets to the provided values. Note that overscan values may not be negative or larger than a half of the screen's size. Overscan cannot be changed on the internal monitor.
       */
      overscan?: Insets;

      /**
       * If set, updates the display's rotation. Legal values are \[0, 90, 180, 270\]. The rotation is set clockwise, relative to the display's vertical position.
       */
      rotation?: number;

      /**
       * If set, updates the display's logical bounds origin along the x-axis. Applied together with {@link boundsOriginY}. Defaults to the current value if not set and {@link boundsOriginY} is set. Note that when updating the display origin, some constraints will be applied, so the final bounds origin may be different than the one set. The final bounds can be retrieved using {@link getInfo}. The bounds origin cannot be changed on the primary display.
       */
      boundsOriginX?: number;

      /**
       * If set, updates the display's logical bounds origin along the y-axis. See documentation for {@link boundsOriginX} parameter.
       */
      boundsOriginY?: number;

      /**
       * If set, updates the display mode to the mode matching this value. If other parameters are invalid, this will not be applied. If the display mode is invalid, it will not be applied and an error will be set, but other properties will still be applied.
       *
       * @since Chrome 52
       */
      displayMode?: DisplayMode;

      /**
       * If set, updates the zoom associated with the display. This zoom performs re-layout and repaint thus resulting in a better quality zoom than just performing a pixel by pixel stretch enlargement.
       *
       * @since Chrome 65
       */
      displayZoomFactor?: number;
    }

    /**
     * @since Chrome 59
     */
    export interface GetInfoFlags {

      /**
       * If set to true, only a single {@link DisplayUnitInfo} will be returned by {@link getInfo} when in unified desktop mode (see {@link enableUnifiedDesktop}). Defaults to false.
       */
      singleUnified?: boolean;
    }

    /**
     * Mirror mode, i.e. different ways of how a display is mirrored to other displays.
     *
     * @chrome-enum "off" Specifies the default mode (extended or unified desktop).
     * @chrome-enum "normal" Specifies that the default source display will be mirrored to all other displays.
     * @chrome-enum "mixed" Specifies that the specified source display will be mirrored to the provided destination displays. All other connected displays will be extended.
     * @since Chrome 65
     */
    export type MirrorMode = "off" | "normal" | "mixed";

    /**
     * @since Chrome 65
     */
    export interface MirrorModeInfo {

      /**
       * The mirror mode that should be set.
       */
      mode: MirrorMode;

      /**
       * The id of the mirroring source display. This is only valid for 'mixed'.
       */
      mirroringSourceId?: string;

      /**
       * The ids of the mirroring destination displays. This is only valid for 'mixed'.
       */
      mirroringDestinationIds?: string[];
    }

    /**
     * Fired when anything changes to the display configuration.
     */
    export const onDisplayChanged: events.Event<() => void>;

    /**
     * Requests the information for all attached display devices.
     *
     * @chrome-returns-extra since Chrome 91
     * @param flags Options affecting how the information is returned.
     */
    export function getInfo(

      /**
       * @since Chrome 59
       */
      flags?: GetInfoFlags,
    ): Promise<DisplayUnitInfo[]>;

    /**
     * Requests the information for all attached display devices.
     *
     * @param flags Options affecting how the information is returned.
     * @param callback The callback to invoke with the results.
     */
    export function getInfo(

      /**
       * @since Chrome 59
       */
      flags?: GetInfoFlags,

      callback?: (
        displayInfo: DisplayUnitInfo[],
      ) => void,
    ): void;

    /**
     * Requests the layout info for all displays. NOTE: This is only available to Chrome OS Kiosk apps and Web UI.
     *
     * @chrome-returns-extra since Chrome 91
     * @since Chrome 53
     */
    export function getDisplayLayout(): Promise<DisplayLayout[]>;

    /**
     * Requests the layout info for all displays. NOTE: This is only available to Chrome OS Kiosk apps and Web UI.
     *
     * @param callback The callback to invoke with the results.
     * @since Chrome 53
     */
    export function getDisplayLayout(

      callback?: (
        layouts: DisplayLayout[],
      ) => void,
    ): void;

    /**
     * Updates the properties for the display specified by `id`, according to the information provided in `info`. On failure, {@link runtime.lastError} will be set. NOTE: This is only available to Chrome OS Kiosk apps and Web UI.
     *
     * @chrome-returns-extra since Chrome 91
     * @param id The display's unique identifier.
     * @param info The information about display properties that should be changed. A property will be changed only if a new value for it is specified in `info`.
     */
    export function setDisplayProperties(

      id: string,

      info: DisplayProperties,
    ): Promise<void>;

    /**
     * Updates the properties for the display specified by `id`, according to the information provided in `info`. On failure, {@link runtime.lastError} will be set. NOTE: This is only available to Chrome OS Kiosk apps and Web UI.
     *
     * @param id The display's unique identifier.
     * @param info The information about display properties that should be changed. A property will be changed only if a new value for it is specified in `info`.
     * @param callback Empty function called when the function finishes. To find out whether the function succeeded, {@link runtime.lastError} should be queried.
     */
    export function setDisplayProperties(

      id: string,

      info: DisplayProperties,

      callback?: () => void,
    ): void;

    /**
     * Set the layout for all displays. Any display not included will use the default layout. If a layout would overlap or be otherwise invalid it will be adjusted to a valid layout. After layout is resolved, an onDisplayChanged event will be triggered. NOTE: This is only available to Chrome OS Kiosk apps and Web UI.
     *
     * @chrome-returns-extra since Chrome 91
     * @param layouts The layout information, required for all displays except the primary display.
     * @since Chrome 53
     */
    export function setDisplayLayout(

      layouts: DisplayLayout[],
    ): Promise<void>;

    /**
     * Set the layout for all displays. Any display not included will use the default layout. If a layout would overlap or be otherwise invalid it will be adjusted to a valid layout. After layout is resolved, an onDisplayChanged event will be triggered. NOTE: This is only available to Chrome OS Kiosk apps and Web UI.
     *
     * @param layouts The layout information, required for all displays except the primary display.
     * @param callback Empty function called when the function finishes. To find out whether the function succeeded, {@link runtime.lastError} should be queried.
     * @since Chrome 53
     */
    export function setDisplayLayout(

      layouts: DisplayLayout[],

      callback?: () => void,
    ): void;

    /**
     * Enables/disables the unified desktop feature. If enabled while mirroring is active, the desktop mode will not change until mirroring is turned off. Otherwise, the desktop mode will switch to unified immediately. NOTE: This is only available to Chrome OS Kiosk apps and Web UI.
     *
     * @param enabled True if unified desktop should be enabled.
     * @since Chrome 46
     */
    export function enableUnifiedDesktop(

      enabled: boolean,
    ): void;

    /**
     * Starts overscan calibration for a display. This will show an overlay on the screen indicating the current overscan insets. If overscan calibration for display `id` is in progress this will reset calibration.
     *
     * @param id The display's unique identifier.
     * @since Chrome 53
     */
    export function overscanCalibrationStart(

      id: string,
    ): void;

    /**
     * Adjusts the current overscan insets for a display. Typically this should either move the display along an axis (e.g. left+right have the same value) or scale it along an axis (e.g. top+bottom have opposite values). Each Adjust call is cumulative with previous calls since Start.
     *
     * @param id The display's unique identifier.
     * @param delta The amount to change the overscan insets.
     * @since Chrome 53
     */
    export function overscanCalibrationAdjust(

      id: string,

      delta: Insets,
    ): void;

    /**
     * Resets the overscan insets for a display to the last saved value (i.e before Start was called).
     *
     * @param id The display's unique identifier.
     * @since Chrome 53
     */
    export function overscanCalibrationReset(

      id: string,
    ): void;

    /**
     * Complete overscan adjustments for a display by saving the current values and hiding the overlay.
     *
     * @param id The display's unique identifier.
     * @since Chrome 53
     */
    export function overscanCalibrationComplete(

      id: string,
    ): void;

    /**
     * Displays the native touch calibration UX for the display with `id` as display id. This will show an overlay on the screen with required instructions on how to proceed. The callback will be invoked in case of successful calibration only. If the calibration fails, this will throw an error.
     *
     * @chrome-returns-extra since Chrome 91
     * @param id The display's unique identifier.
     * @since Chrome 57
     */
    export function showNativeTouchCalibration(

      id: string,
    ): Promise<boolean>;

    /**
     * Displays the native touch calibration UX for the display with `id` as display id. This will show an overlay on the screen with required instructions on how to proceed. The callback will be invoked in case of successful calibration only. If the calibration fails, this will throw an error.
     *
     * @param id The display's unique identifier.
     * @param callback Optional callback to inform the caller that the touch calibration has ended. The argument of the callback informs if the calibration was a success or not.
     * @since Chrome 57
     */
    export function showNativeTouchCalibration(

      id: string,

      callback?: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Starts custom touch calibration for a display. This should be called when using a custom UX for collecting calibration data. If another touch calibration is already in progress this will throw an error.
     *
     * @param id The display's unique identifier.
     * @since Chrome 57
     */
    export function startCustomTouchCalibration(

      id: string,
    ): void;

    /**
     * Sets the touch calibration pairs for a display. These `pairs` would be used to calibrate the touch screen for display with `id` called in startCustomTouchCalibration(). Always call `startCustomTouchCalibration` before calling this method. If another touch calibration is already in progress this will throw an error.
     *
     * @param pairs The pairs of point used to calibrate the display.
     * @param bounds Bounds of the display when the touch calibration was performed. `bounds.left` and `bounds.top` values are ignored.
     * @since Chrome 57
     */
    export function completeCustomTouchCalibration(

      pairs: TouchCalibrationPairQuad,

      bounds: Bounds,
    ): void;

    /**
     * Resets the touch calibration for the display and brings it back to its default state by clearing any touch calibration data associated with the display.
     *
     * @param id The display's unique identifier.
     * @since Chrome 57
     */
    export function clearTouchCalibration(

      id: string,
    ): void;

    /**
     * Sets the display mode to the specified mirror mode. Each call resets the state from previous calls. Calling setDisplayProperties() will fail for the mirroring destination displays. NOTE: This is only available to Chrome OS Kiosk apps and Web UI.
     *
     * @chrome-returns-extra since Chrome 91
     * @param info The information of the mirror mode that should be applied to the display mode.
     * @since Chrome 65
     */
    export function setMirrorMode(

      info: MirrorModeInfo,
    ): Promise<void>;

    /**
     * Sets the display mode to the specified mirror mode. Each call resets the state from previous calls. Calling setDisplayProperties() will fail for the mirroring destination displays. NOTE: This is only available to Chrome OS Kiosk apps and Web UI.
     *
     * @param info The information of the mirror mode that should be applied to the display mode.
     * @param callback Empty function called when the function finishes. To find out whether the function succeeded, {@link runtime.lastError} should be queried.
     * @since Chrome 65
     */
    export function setMirrorMode(

      info: MirrorModeInfo,

      callback?: () => void,
    ): void;
  }

  /**
   * The `chrome.system.memory` API.
   *
   * @chrome-permission system.memory
   */
  export namespace system.memory {

    export interface MemoryInfo {

      /**
       * The total amount of physical memory capacity, in bytes.
       */
      capacity: number;

      /**
       * The amount of available capacity, in bytes.
       */
      availableCapacity: number;
    }

    /**
     * Get physical memory information.
     *
     * @chrome-returns-extra since Chrome 91
     */
    export function getInfo(): Promise<MemoryInfo>;

    /**
     * Get physical memory information.
     */
    export function getInfo(

      callback?: (
        info: MemoryInfo,
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.system.network` API.
   *
   * @alpha
   * @chrome-permission system.network
   * @chrome-channel dev
   */
  export namespace system.network {

    export interface NetworkInterface {

      /**
       * The underlying name of the adapter. On \*nix, this will typically be "eth0", "wlan0", etc.
       */
      name: string;

      /**
       * The available IPv4/6 address.
       */
      address: string;

      /**
       * The prefix length
       */
      prefixLength: number;
    }

    /**
     * Retrieves information about local adapters on this system.
     */
    export function getNetworkInterfaces(): Promise<NetworkInterface[]>;

    /**
     * Retrieves information about local adapters on this system.
     *
     * @param callback Called when local adapter information is available.
     */
    export function getNetworkInterfaces(

      /**
       * @param networkInterfaces Array of object containing network interfaces information.
       */
      callback?: (
        networkInterfaces: NetworkInterface[],
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.system.storage` API to query storage device information and be notified when a removable storage device is attached and detached.
   *
   * @chrome-permission system.storage
   */
  export namespace system.storage {

    /**
     * @chrome-enum "fixed" The storage has fixed media, e.g. hard disk or SSD.
     * @chrome-enum "removable" The storage is removable, e.g. USB flash drive.
     * @chrome-enum "unknown" The storage type is unknown.
     */
    export type StorageUnitType = "fixed" | "removable" | "unknown";

    export interface StorageUnitInfo {

      /**
       * The transient ID that uniquely identifies the storage device. This ID will be persistent within the same run of a single application. It will not be a persistent identifier between different runs of an application, or between different applications.
       */
      id: string;

      /**
       * The name of the storage unit.
       */
      name: string;

      /**
       * The media type of the storage unit.
       */
      type: StorageUnitType;

      /**
       * The total amount of the storage space, in bytes.
       */
      capacity: number;
    }

    export interface StorageAvailableCapacityInfo {

      /**
       * A copied `id` of getAvailableCapacity function parameter `id`.
       */
      id: string;

      /**
       * The available capacity of the storage device, in bytes.
       */
      availableCapacity: number;
    }

    /**
     * @chrome-enum "success" The ejection command is successful -- the application can prompt the user to remove the device.
     * @chrome-enum "in\_use" The device is in use by another application. The ejection did not succeed; the user should not remove the device until the other application is done with the device.
     * @chrome-enum "no\_such\_device" There is no such device known.
     * @chrome-enum "failure" The ejection command failed.
     */
    export type EjectDeviceResultCode = "success" | "in_use" | "no_such_device" | "failure";

    /**
     * Fired when a new removable storage is attached to the system.
     */
    export const onAttached: events.Event<(
      info: StorageUnitInfo,
    ) => void>;

    /**
     * Fired when a removable storage is detached from the system.
     */
    export const onDetached: events.Event<(
      id: string,
    ) => void>;

    /**
     * Get the storage information from the system. The argument passed to the callback is an array of StorageUnitInfo objects.
     *
     * @chrome-returns-extra since Chrome 91
     */
    export function getInfo(): Promise<StorageUnitInfo[]>;

    /**
     * Get the storage information from the system. The argument passed to the callback is an array of StorageUnitInfo objects.
     */
    export function getInfo(

      callback?: (
        info: StorageUnitInfo[],
      ) => void,
    ): void;

    /**
     * Ejects a removable storage device.
     *
     * @chrome-returns-extra since Chrome 91
     */
    export function ejectDevice(

      id: string,
    ): Promise<EjectDeviceResultCode>;

    /**
     * Ejects a removable storage device.
     */
    export function ejectDevice(

      id: string,

      callback?: (
        result: EjectDeviceResultCode,
      ) => void,
    ): void;

    /**
     * Get the available capacity of a specified `id` storage device. The `id` is the transient device ID from StorageUnitInfo.
     *
     * @alpha
     * @chrome-channel dev
     */
    export function getAvailableCapacity(

      id: string,
    ): Promise<StorageAvailableCapacityInfo>;

    /**
     * Get the available capacity of a specified `id` storage device. The `id` is the transient device ID from StorageUnitInfo.
     *
     * @alpha
     * @chrome-channel dev
     */
    export function getAvailableCapacity(

      id: string,

      callback?: (
        info: StorageAvailableCapacityInfo,
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.tabCapture` API to interact with tab media streams.
   *
   * @chrome-permission tabCapture
   */
  export namespace tabCapture {

    export type TabCaptureState = "pending" | "active" | "stopped" | "error";

    export interface CaptureInfo {

      /**
       * The id of the tab whose status changed.
       */
      tabId: number;

      /**
       * The new capture status of the tab.
       */
      status: TabCaptureState;

      /**
       * Whether an element in the tab being captured is in fullscreen mode.
       */
      fullscreen: boolean;
    }

    export interface MediaStreamConstraint {

      mandatory: {[name: string]: any};

      optional?: {[name: string]: any};
    }

    export interface CaptureOptions {

      audio?: boolean;

      video?: boolean;

      audioConstraints?: MediaStreamConstraint;

      videoConstraints?: MediaStreamConstraint;
    }

    /**
     * @since Chrome 71
     */
    export interface GetMediaStreamOptions {

      /**
       * Optional tab id of the tab which will later invoke `getUserMedia()` to consume the stream. If not specified then the resulting stream can be used only by the calling extension. The stream can only be used by frames in the given tab whose security origin matches the consumber tab's origin. The tab's origin must be a secure origin, e.g. HTTPS.
       */
      consumerTabId?: number;

      /**
       * Optional tab id of the tab which will be captured. If not specified then the current active tab will be selected. Only tabs for which the extension has been granted the `activeTab` permission can be used as the target tab.
       */
      targetTabId?: number;
    }

    /**
     * Event fired when the capture status of a tab changes. This allows extension authors to keep track of the capture status of tabs to keep UI elements like page actions in sync.
     */
    export const onStatusChanged: events.Event<(
      info: CaptureInfo,
    ) => void>;

    /**
     * Captures the visible area of the currently active tab. Capture can only be started on the currently active tab after the extension has been _invoked_, similar to the way that [activeTab](https://developer.chrome.com/docs/extensions/activeTab#invoking-activeTab) works. Capture is maintained across page navigations within the tab, and stops when the tab is closed, or the media stream is closed by the extension.
     *
     * @param options Configures the returned media stream.
     * @param callback Callback with either the tab capture MediaStream or `null`. `null` indicates an error has occurred and the client may query {@link runtime.lastError} to access the error details.
     * @chrome-disallow-service-workers
     */
    export function capture(

      options: CaptureOptions,

      callback: (
        stream: LocalMediaStream,
      ) => void,
    ): void;

    /**
     * Returns a list of tabs that have requested capture or are being captured, i.e. status != stopped and status != error. This allows extensions to inform the user that there is an existing tab capture that would prevent a new tab capture from succeeding (or to prevent redundant requests for the same tab).
     *
     * @chrome-returns-extra since Chrome 116
     */
    export function getCapturedTabs(): Promise<CaptureInfo[]>;

    /**
     * Returns a list of tabs that have requested capture or are being captured, i.e. status != stopped and status != error. This allows extensions to inform the user that there is an existing tab capture that would prevent a new tab capture from succeeding (or to prevent redundant requests for the same tab).
     *
     * @param callback Callback invoked with CaptureInfo\[\] for captured tabs.
     */
    export function getCapturedTabs(

      callback?: (
        result: CaptureInfo[],
      ) => void,
    ): void;

    /**
     * Creates a stream ID to capture the target tab. Similar to chrome.tabCapture.capture() method, but returns a media stream ID, instead of a media stream, to the consumer tab.
     *
     * @chrome-returns-extra since Chrome 116
     * @since Chrome 71
     */
    export function getMediaStreamId(

      options?: GetMediaStreamOptions,
    ): Promise<string>;

    /**
     * Creates a stream ID to capture the target tab. Similar to chrome.tabCapture.capture() method, but returns a media stream ID, instead of a media stream, to the consumer tab.
     *
     * @param callback Callback to invoke with the result. If successful, the result is an opaque string that can be passed to the `getUserMedia()` API to generate a media stream that corresponds to the target tab. The created `streamId` can only be used once and expires after a few seconds if it is not used.
     * @since Chrome 71
     */
    export function getMediaStreamId(

      options?: GetMediaStreamOptions,

      callback?: (
        streamId: string,
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.tabGroups` API to interact with the browser's tab grouping system. You can use this API to modify and rearrange tab groups in the browser. To group and ungroup tabs, or to query what tabs are in groups, use the `chrome.tabs` API.
   *
   * @since Chrome 89
   * @chrome-permission tabGroups
   * @chrome-min-manifest MV3
   */
  export namespace tabGroups {

    /**
     * The group's color.
     */
    export type Color = "grey" | "blue" | "red" | "yellow" | "green" | "pink" | "purple" | "cyan" | "orange";

    export interface TabGroup {

      /**
       * The ID of the group. Group IDs are unique within a browser session.
       */
      id: number;

      /**
       * Whether the group is collapsed. A collapsed group is one whose tabs are hidden.
       */
      collapsed: boolean;

      /**
       * The group's color.
       */
      color: Color;

      /**
       * The title of the group.
       */
      title?: string;

      /**
       * The ID of the window that contains the group.
       */
      windowId: number;
    }

    /**
     * An ID that represents the absence of a group.
     */
    export const TAB_GROUP_ID_NONE: -1;

    /**
     * Fired when a group is created.
     */
    export const onCreated: events.Event<(
      group: TabGroup,
    ) => void>;

    /**
     * Fired when a group is updated.
     */
    export const onUpdated: events.Event<(
      group: TabGroup,
    ) => void>;

    /**
     * Fired when a group is moved within a window. Move events are still fired for the individual tabs within the group, as well as for the group itself. This event is not fired when a group is moved between windows; instead, it will be removed from one window and created in another.
     */
    export const onMoved: events.Event<(
      group: TabGroup,
    ) => void>;

    /**
     * Fired when a group is closed, either directly by the user or automatically because it contained zero tabs.
     */
    export const onRemoved: events.Event<(
      group: TabGroup,
    ) => void>;

    /**
     * Retrieves details about the specified group.
     *
     * @chrome-returns-extra since Chrome 90
     */
    export function get(

      groupId: number,
    ): Promise<TabGroup>;

    /**
     * Retrieves details about the specified group.
     */
    export function get(

      groupId: number,

      callback?: (
        group: TabGroup,
      ) => void,
    ): void;

    /**
     * Gets all groups that have the specified properties, or all groups if no properties are specified.
     *
     * @chrome-returns-extra since Chrome 90
     */
    export function query(

      queryInfo: {

        /**
         * Whether the groups are collapsed.
         */
        collapsed?: boolean,

        /**
         * The color of the groups.
         */
        color?: Color,

        /**
         * Match group titles against a pattern.
         */
        title?: string,

        /**
         * The ID of the parent window, or {@link windows.WINDOW_ID_CURRENT} for the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
         */
        windowId?: number,
      },
    ): Promise<TabGroup[]>;

    /**
     * Gets all groups that have the specified properties, or all groups if no properties are specified.
     */
    export function query(

      queryInfo: {

        /**
         * Whether the groups are collapsed.
         */
        collapsed?: boolean,

        /**
         * The color of the groups.
         */
        color?: Color,

        /**
         * Match group titles against a pattern.
         */
        title?: string,

        /**
         * The ID of the parent window, or {@link windows.WINDOW_ID_CURRENT} for the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
         */
        windowId?: number,
      },

      callback?: (
        result: TabGroup[],
      ) => void,
    ): void;

    /**
     * Modifies the properties of a group. Properties that are not specified in `updateProperties` are not modified.
     *
     * @chrome-returns-extra since Chrome 90
     * @param groupId The ID of the group to modify.
     */
    export function update(

      groupId: number,

      updateProperties: {

        /**
         * Whether the group should be collapsed.
         */
        collapsed?: boolean,

        /**
         * The color of the group.
         */
        color?: Color,

        /**
         * The title of the group.
         */
        title?: string,
      },
    ): Promise<TabGroup | undefined>;

    /**
     * Modifies the properties of a group. Properties that are not specified in `updateProperties` are not modified.
     *
     * @param groupId The ID of the group to modify.
     */
    export function update(

      groupId: number,

      updateProperties: {

        /**
         * Whether the group should be collapsed.
         */
        collapsed?: boolean,

        /**
         * The color of the group.
         */
        color?: Color,

        /**
         * The title of the group.
         */
        title?: string,
      },

      /**
       * @param group Details about the updated group.
       */
      callback?: (
        group?: TabGroup,
      ) => void,
    ): void;

    /**
     * Moves the group and all its tabs within its window, or to a new window.
     *
     * @chrome-returns-extra since Chrome 90
     * @param groupId The ID of the group to move.
     */
    export function move(

      groupId: number,

      moveProperties: {

        /**
         * The window to move the group to. Defaults to the window the group is currently in. Note that groups can only be moved to and from windows with {@link windows.WindowType} type `"normal"`.
         */
        windowId?: number,

        /**
         * The position to move the group to. Use `-1` to place the group at the end of the window.
         */
        index: number,
      },
    ): Promise<TabGroup | undefined>;

    /**
     * Moves the group and all its tabs within its window, or to a new window.
     *
     * @param groupId The ID of the group to move.
     */
    export function move(

      groupId: number,

      moveProperties: {

        /**
         * The window to move the group to. Defaults to the window the group is currently in. Note that groups can only be moved to and from windows with {@link windows.WindowType} type `"normal"`.
         */
        windowId?: number,

        /**
         * The position to move the group to. Use `-1` to place the group at the end of the window.
         */
        index: number,
      },

      /**
       * @param group Details about the moved group.
       */
      callback?: (
        group?: TabGroup,
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.tabs` API to interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser.
   */
  export namespace tabs {

    /**
     * The tab's loading status.
     *
     * @since Chrome 44
     */
    export type TabStatus = "unloaded" | "loading" | "complete";

    /**
     * An event that caused a muted state change.
     *
     * @chrome-enum "user" A user input action set the muted state.
     * @chrome-enum "capture" Tab capture was started, forcing a muted state change.
     * @chrome-enum "extension" An extension, identified by the extensionId field, set the muted state.
     * @since Chrome 46
     */
    export type MutedInfoReason = "user" | "capture" | "extension";

    /**
     * The tab's muted state and the reason for the last state change.
     *
     * @since Chrome 46
     */
    export interface MutedInfo {

      /**
       * Whether the tab is muted (prevented from playing sound). The tab may be muted even if it has not played or is not currently playing sound. Equivalent to whether the 'muted' audio indicator is showing.
       */
      muted: boolean;

      /**
       * The reason the tab was muted or unmuted. Not set if the tab's mute state has never been changed.
       */
      reason?: MutedInfoReason;

      /**
       * The ID of the extension that changed the muted state. Not set if an extension was not the reason the muted state last changed.
       */
      extensionId?: string;
    }

    export interface Tab {

      /**
       * The ID of the tab. Tab IDs are unique within a browser session. Under some circumstances a tab may not be assigned an ID; for example, when querying foreign tabs using the {@link sessions} API, in which case a session ID may be present. Tab ID can also be set to `chrome.tabs.TAB_ID_NONE` for apps and devtools windows.
       */
      id?: number;

      /**
       * The zero-based index of the tab within its window.
       */
      index: number;

      /**
       * The ID of the group that the tab belongs to.
       *
       * @since Chrome 88
       */
      groupId: number;

      /**
       * The ID of the window that contains the tab.
       */
      windowId: number;

      /**
       * The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists.
       */
      openerTabId?: number;

      /**
       * Whether the tab is selected.
       *
       * @deprecated Please use {@link tabs.Tab.highlighted}.
       */
      selected: boolean;

      /**
       * The last time the tab was accessed as the number of milliseconds since epoch.
       *
       * @since Chrome 121
       */
      lastAccessed?: number;

      /**
       * Whether the tab is highlighted.
       */
      highlighted: boolean;

      /**
       * Whether the tab is active in its window. Does not necessarily mean the window is focused.
       */
      active: boolean;

      /**
       * Whether the tab is pinned.
       */
      pinned: boolean;

      /**
       * Whether the tab has produced sound over the past couple of seconds (but it might not be heard if also muted). Equivalent to whether the 'speaker audio' indicator is showing.
       *
       * @since Chrome 45
       */
      audible?: boolean;

      /**
       * Whether the tab is discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content is reloaded the next time it is activated.
       *
       * @since Chrome 54
       */
      discarded: boolean;

      /**
       * Whether the tab can be discarded automatically by the browser when resources are low.
       *
       * @since Chrome 54
       */
      autoDiscardable: boolean;

      /**
       * The tab's muted state and the reason for the last state change.
       *
       * @since Chrome 46
       */
      mutedInfo?: MutedInfo;

      /**
       * The last committed URL of the main frame of the tab. This property is only present if the extension's manifest includes the `"tabs"` permission and may be an empty string if the tab has not yet committed. See also {@link Tab.pendingUrl}.
       */
      url?: string;

      /**
       * The URL the tab is navigating to, before it has committed. This property is only present if the extension's manifest includes the `"tabs"` permission and there is a pending navigation.
       *
       * @since Chrome 79
       */
      pendingUrl?: string;

      /**
       * The title of the tab. This property is only present if the extension's manifest includes the `"tabs"` permission.
       */
      title?: string;

      /**
       * The URL of the tab's favicon. This property is only present if the extension's manifest includes the `"tabs"` permission. It may also be an empty string if the tab is loading.
       */
      favIconUrl?: string;

      /**
       * The tab's loading status.
       */
      status?: TabStatus;

      /**
       * Whether the tab is in an incognito window.
       */
      incognito: boolean;

      /**
       * The width of the tab in pixels.
       */
      width?: number;

      /**
       * The height of the tab in pixels.
       */
      height?: number;

      /**
       * The session ID used to uniquely identify a tab obtained from the {@link sessions} API.
       */
      sessionId?: string;
    }

    /**
     * Defines how zoom changes are handled, i.e., which entity is responsible for the actual scaling of the page; defaults to `automatic`.
     *
     * @chrome-enum "automatic" Zoom changes are handled automatically by the browser.
     * @chrome-enum "manual" Overrides the automatic handling of zoom changes. The `onZoomChange` event will still be dispatched, and it is the extension's responsibility to listen for this event and manually scale the page. This mode does not support `per-origin` zooming, and thus ignores the `scope` zoom setting and assumes `per-tab`.
     * @chrome-enum "disabled" Disables all zooming in the tab. The tab reverts to the default zoom level, and all attempted zoom changes are ignored.
     * @since Chrome 44
     */
    export type ZoomSettingsMode = "automatic" | "manual" | "disabled";

    /**
     * Defines whether zoom changes persist for the page's origin, or only take effect in this tab; defaults to `per-origin` when in `automatic` mode, and `per-tab` otherwise.
     *
     * @chrome-enum "per-origin" Zoom changes persist in the zoomed page's origin, i.e., all other tabs navigated to that same origin are zoomed as well. Moreover, `per-origin` zoom changes are saved with the origin, meaning that when navigating to other pages in the same origin, they are all zoomed to the same zoom factor. The `per-origin` scope is only available in the `automatic` mode.
     * @chrome-enum "per-tab" Zoom changes only take effect in this tab, and zoom changes in other tabs do not affect the zooming of this tab. Also, `per-tab` zoom changes are reset on navigation; navigating a tab always loads pages with their `per-origin` zoom factors.
     * @since Chrome 44
     */
    export type ZoomSettingsScope = "per-origin" | "per-tab";

    /**
     * Defines how zoom changes in a tab are handled and at what scope.
     */
    export interface ZoomSettings {

      /**
       * Defines how zoom changes are handled, i.e., which entity is responsible for the actual scaling of the page; defaults to `automatic`.
       */
      mode?: ZoomSettingsMode;

      /**
       * Defines whether zoom changes persist for the page's origin, or only take effect in this tab; defaults to `per-origin` when in `automatic` mode, and `per-tab` otherwise.
       */
      scope?: ZoomSettingsScope;

      /**
       * Used to return the default zoom level for the current tab in calls to tabs.getZoomSettings.
       *
       * @since Chrome 43
       */
      defaultZoomFactor?: number;
    }

    /**
     * The type of window.
     *
     * @since Chrome 44
     */
    export type WindowType = "normal" | "popup" | "panel" | "app" | "devtools";

    /**
     * The maximum number of times that {@link captureVisibleTab} can be called per second. {@link captureVisibleTab} is expensive and should not be called too often.
     *
     * @since Chrome 92
     */
    export const MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND: 2;

    /**
     * An ID that represents the absence of a browser tab.
     *
     * @since Chrome 46
     */
    export const TAB_ID_NONE: -1;

    /**
     * An index that represents the absence of a tab index in a tab\_strip.
     *
     * @since Pending
     */
    export const TAB_INDEX_NONE: -1;

    /**
     * Fired when a tab is created. Note that the tab's URL and tab group membership may not be set at the time this event is fired, but you can listen to onUpdated events so as to be notified when a URL is set or the tab is added to a tab group.
     */
    export const onCreated: events.Event<(
      tab: Tab,
    ) => void>;

    /**
     * Fired when a tab is updated.
     */
    export const onUpdated: events.Event<(
      tabId: number,
      changeInfo: {

        /**
         * The tab's loading status.
         */
        status?: TabStatus,

        /**
         * The tab's URL if it has changed.
         */
        url?: string,

        /**
         * The tab's new group.
         *
         * @since Chrome 88
         */
        groupId?: number,

        /**
         * The tab's new pinned state.
         */
        pinned?: boolean,

        /**
         * The tab's new audible state.
         *
         * @since Chrome 45
         */
        audible?: boolean,

        /**
         * The tab's new discarded state.
         *
         * @since Chrome 54
         */
        discarded?: boolean,

        /**
         * The tab's new auto-discardable state.
         *
         * @since Chrome 54
         */
        autoDiscardable?: boolean,

        /**
         * The tab's new muted state and the reason for the change.
         *
         * @since Chrome 46
         */
        mutedInfo?: MutedInfo,

        /**
         * The tab's new favicon URL.
         */
        favIconUrl?: string,

        /**
         * The tab's new title.
         *
         * @since Chrome 48
         */
        title?: string,
      },
      tab: Tab,
    ) => void>;

    /**
     * Fired when a tab is moved within a window. Only one move event is fired, representing the tab the user directly moved. Move events are not fired for the other tabs that must move in response to the manually-moved tab. This event is not fired when a tab is moved between windows; for details, see {@link tabs.onDetached}.
     */
    export const onMoved: events.Event<(
      tabId: number,
      moveInfo: {

        windowId: number,

        fromIndex: number,

        toIndex: number,
      },
    ) => void>;

    /**
     * Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events so as to be notified when a URL is set.
     */
    export const onActivated: events.Event<(
      activeInfo: {

        /**
         * The ID of the tab that has become active.
         */
        tabId: number,

        /**
         * The ID of the window the active tab changed inside of.
         */
        windowId: number,
      },
    ) => void>;

    /**
     * Fired when the highlighted or selected tabs in a window changes.
     */
    export const onHighlighted: events.Event<(
      highlightInfo: {

        /**
         * The window whose tabs changed.
         */
        windowId: number,

        /**
         * All highlighted tabs in the window.
         */
        tabIds: number[],
      },
    ) => void>;

    /**
     * Fired when a tab is detached from a window; for example, because it was moved between windows.
     */
    export const onDetached: events.Event<(
      tabId: number,
      detachInfo: {

        oldWindowId: number,

        oldPosition: number,
      },
    ) => void>;

    /**
     * Fired when a tab is attached to a window; for example, because it was moved between windows.
     */
    export const onAttached: events.Event<(
      tabId: number,
      attachInfo: {

        newWindowId: number,

        newPosition: number,
      },
    ) => void>;

    /**
     * Fired when a tab is closed.
     */
    export const onRemoved: events.Event<(
      tabId: number,
      removeInfo: {

        /**
         * The window whose tab is closed.
         */
        windowId: number,

        /**
         * True when the tab was closed because its parent window was closed.
         */
        isWindowClosing: boolean,
      },
    ) => void>;

    /**
     * Fired when a tab is replaced with another tab due to prerendering or instant.
     */
    export const onReplaced: events.Event<(
      addedTabId: number,
      removedTabId: number,
    ) => void>;

    /**
     * Fired when a tab is zoomed.
     */
    export const onZoomChange: events.Event<(
      ZoomChangeInfo: {

        tabId: number,

        oldZoomFactor: number,

        newZoomFactor: number,

        zoomSettings: ZoomSettings,
      },
    ) => void>;

    /**
     * Retrieves details about the specified tab.
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function get(

      tabId: number,
    ): Promise<Tab>;

    /**
     * Retrieves details about the specified tab.
     */
    export function get(

      tabId: number,

      callback?: (
        tab: Tab,
      ) => void,
    ): void;

    /**
     * Gets the tab that this script call is being made from. Returns `undefined` if called from a non-tab context (for example, a background page or popup view).
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function getCurrent(): Promise<Tab | undefined>;

    /**
     * Gets the tab that this script call is being made from. Returns `undefined` if called from a non-tab context (for example, a background page or popup view).
     */
    export function getCurrent(

      callback?: (
        tab?: Tab,
      ) => void,
    ): void;

    /**
     * Connects to the content script(s) in the specified tab. The {@link runtime.onConnect} event is fired in each content script running in the specified tab for the current extension. For more details, see [Content Script Messaging](https://developer.chrome.com/docs/extensions/messaging).
     *
     * @returns A port that can be used to communicate with the content scripts running in the specified tab. The port's {@link runtime.Port} event is fired if the tab closes or does not exist.
     */
    export function connect(

      tabId: number,

      connectInfo?: {

        /**
         * Is passed into onConnect for content scripts that are listening for the connection event.
         */
        name?: string,

        /**
         * Open a port to a specific [frame](https://developer.chrome.com/docs/extensions/reference/webNavigation/#frame_ids) identified by `frameId` instead of all frames in the tab.
         */
        frameId?: number,

        /**
         * Open a port to a specific [document](https://developer.chrome.com/docs/extensions/reference/webNavigation/#document_ids) identified by `documentId` instead of all frames in the tab.
         *
         * @since Chrome 106
         */
        documentId?: string,
      },
    ): runtime.Port;

    /**
     * Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The {@link runtime.onMessage} event is fired in each content script running in the specified tab for the current extension.
     *
     * @chrome-returns-extra since Chrome 99
     * @param message The message to send. This message should be a JSON-ifiable object.
     */
    export function sendMessage(

      tabId: number,

      message: any,

      options?: {

        /**
         * Send a message to a specific [frame](https://developer.chrome.com/docs/extensions/reference/webNavigation/#frame_ids) identified by `frameId` instead of all frames in the tab.
         */
        frameId?: number,

        /**
         * Send a message to a specific [document](https://developer.chrome.com/docs/extensions/reference/webNavigation/#document_ids) identified by `documentId` instead of all frames in the tab.
         *
         * @since Chrome 106
         */
        documentId?: string,
      },
    ): Promise<any>;

    /**
     * Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The {@link runtime.onMessage} event is fired in each content script running in the specified tab for the current extension.
     *
     * @param message The message to send. This message should be a JSON-ifiable object.
     */
    export function sendMessage(

      tabId: number,

      message: any,

      options?: {

        /**
         * Send a message to a specific [frame](https://developer.chrome.com/docs/extensions/reference/webNavigation/#frame_ids) identified by `frameId` instead of all frames in the tab.
         */
        frameId?: number,

        /**
         * Send a message to a specific [document](https://developer.chrome.com/docs/extensions/reference/webNavigation/#document_ids) identified by `documentId` instead of all frames in the tab.
         *
         * @since Chrome 106
         */
        documentId?: string,
      },

      /**
       * @param response The JSON response object sent by the handler of the message. If an error occurs while connecting to the specified tab, the callback is called with no arguments and {@link runtime.lastError} is set to the error message.
       * @since Chrome 99
       */
      callback?: (
        response: any,
      ) => void,
    ): void;

    /**
     * Creates a new tab.
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function create(

      createProperties: {

        /**
         * The window in which to create the new tab. Defaults to the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
         */
        windowId?: number,

        /**
         * The position the tab should take in the window. The provided value is clamped to between zero and the number of tabs in the window.
         */
        index?: number,

        /**
         * The URL to initially navigate the tab to. Fully-qualified URLs must include a scheme (i.e., 'http://www.google.com', not 'www.google.com'). Relative URLs are relative to the current page within the extension. Defaults to the New Tab Page.
         */
        url?: string,

        /**
         * Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see {@link windows.update}). Defaults to `true`.
         */
        active?: boolean,

        /**
         * Whether the tab should become the selected tab in the window. Defaults to `true`
         *
         * @deprecated Please use _active_.
         */
        selected?: boolean,

        /**
         * Whether the tab should be pinned. Defaults to `false`
         */
        pinned?: boolean,

        /**
         * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as the newly created tab.
         */
        openerTabId?: number,
      },
    ): Promise<Tab>;

    /**
     * Creates a new tab.
     */
    export function create(

      createProperties: {

        /**
         * The window in which to create the new tab. Defaults to the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
         */
        windowId?: number,

        /**
         * The position the tab should take in the window. The provided value is clamped to between zero and the number of tabs in the window.
         */
        index?: number,

        /**
         * The URL to initially navigate the tab to. Fully-qualified URLs must include a scheme (i.e., 'http://www.google.com', not 'www.google.com'). Relative URLs are relative to the current page within the extension. Defaults to the New Tab Page.
         */
        url?: string,

        /**
         * Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see {@link windows.update}). Defaults to `true`.
         */
        active?: boolean,

        /**
         * Whether the tab should become the selected tab in the window. Defaults to `true`
         *
         * @deprecated Please use _active_.
         */
        selected?: boolean,

        /**
         * Whether the tab should be pinned. Defaults to `false`
         */
        pinned?: boolean,

        /**
         * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as the newly created tab.
         */
        openerTabId?: number,
      },

      /**
       * @param tab The created tab.
       */
      callback?: (
        tab: Tab,
      ) => void,
    ): void;

    /**
     * Duplicates a tab.
     *
     * @chrome-returns-extra since Chrome 88
     * @param tabId The ID of the tab to duplicate.
     */
    export function duplicate(

      tabId: number,
    ): Promise<Tab | undefined>;

    /**
     * Duplicates a tab.
     *
     * @param tabId The ID of the tab to duplicate.
     */
    export function duplicate(

      tabId: number,

      /**
       * @param tab Details about the duplicated tab. The {@link tabs.Tab} object does not contain `url`, `pendingUrl`, `title`, and `favIconUrl` if the `"tabs"` permission has not been requested.
       */
      callback?: (
        tab?: Tab,
      ) => void,
    ): void;

    /**
     * Gets all tabs that have the specified properties, or all tabs if no properties are specified.
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function query(

      queryInfo: {

        /**
         * Whether the tabs are active in their windows.
         */
        active?: boolean,

        /**
         * Whether the tabs are pinned.
         */
        pinned?: boolean,

        /**
         * Whether the tabs are audible.
         *
         * @since Chrome 45
         */
        audible?: boolean,

        /**
         * Whether the tabs are muted.
         *
         * @since Chrome 45
         */
        muted?: boolean,

        /**
         * Whether the tabs are highlighted.
         */
        highlighted?: boolean,

        /**
         * Whether the tabs are discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content is reloaded the next time it is activated.
         *
         * @since Chrome 54
         */
        discarded?: boolean,

        /**
         * Whether the tabs can be discarded automatically by the browser when resources are low.
         *
         * @since Chrome 54
         */
        autoDiscardable?: boolean,

        /**
         * Whether the tabs are in the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
         */
        currentWindow?: boolean,

        /**
         * Whether the tabs are in the last focused window.
         */
        lastFocusedWindow?: boolean,

        /**
         * The tab loading status.
         */
        status?: TabStatus,

        /**
         * Match page titles against a pattern. This property is ignored if the extension does not have the `"tabs"` permission.
         */
        title?: string,

        /**
         * Match tabs against one or more [URL patterns](https://developer.chrome.com/docs/extensions/match_patterns). Fragment identifiers are not matched. This property is ignored if the extension does not have the `"tabs"` permission.
         */
        url?: string | string[],

        /**
         * The ID of the group that the tabs are in, or {@link tabGroups.TAB_GROUP_ID_NONE} for ungrouped tabs.
         *
         * @since Chrome 88
         */
        groupId?: number,

        /**
         * The ID of the parent window, or {@link windows.WINDOW_ID_CURRENT} for the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
         */
        windowId?: number,

        /**
         * The type of window the tabs are in.
         */
        windowType?: WindowType,

        /**
         * The position of the tabs within their windows.
         */
        index?: number,
      },
    ): Promise<Tab[]>;

    /**
     * Gets all tabs that have the specified properties, or all tabs if no properties are specified.
     */
    export function query(

      queryInfo: {

        /**
         * Whether the tabs are active in their windows.
         */
        active?: boolean,

        /**
         * Whether the tabs are pinned.
         */
        pinned?: boolean,

        /**
         * Whether the tabs are audible.
         *
         * @since Chrome 45
         */
        audible?: boolean,

        /**
         * Whether the tabs are muted.
         *
         * @since Chrome 45
         */
        muted?: boolean,

        /**
         * Whether the tabs are highlighted.
         */
        highlighted?: boolean,

        /**
         * Whether the tabs are discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content is reloaded the next time it is activated.
         *
         * @since Chrome 54
         */
        discarded?: boolean,

        /**
         * Whether the tabs can be discarded automatically by the browser when resources are low.
         *
         * @since Chrome 54
         */
        autoDiscardable?: boolean,

        /**
         * Whether the tabs are in the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
         */
        currentWindow?: boolean,

        /**
         * Whether the tabs are in the last focused window.
         */
        lastFocusedWindow?: boolean,

        /**
         * The tab loading status.
         */
        status?: TabStatus,

        /**
         * Match page titles against a pattern. This property is ignored if the extension does not have the `"tabs"` permission.
         */
        title?: string,

        /**
         * Match tabs against one or more [URL patterns](https://developer.chrome.com/docs/extensions/match_patterns). Fragment identifiers are not matched. This property is ignored if the extension does not have the `"tabs"` permission.
         */
        url?: string | string[],

        /**
         * The ID of the group that the tabs are in, or {@link tabGroups.TAB_GROUP_ID_NONE} for ungrouped tabs.
         *
         * @since Chrome 88
         */
        groupId?: number,

        /**
         * The ID of the parent window, or {@link windows.WINDOW_ID_CURRENT} for the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
         */
        windowId?: number,

        /**
         * The type of window the tabs are in.
         */
        windowType?: WindowType,

        /**
         * The position of the tabs within their windows.
         */
        index?: number,
      },

      callback?: (
        result: Tab[],
      ) => void,
    ): void;

    /**
     * Highlights the given tabs and focuses on the first of group. Will appear to do nothing if the specified tab is currently active.
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function highlight(

      highlightInfo: {

        /**
         * The window that contains the tabs.
         */
        windowId?: number,

        /**
         * One or more tab indices to highlight.
         */
        tabs: number[] | number,
      },
    ): Promise<windows.Window>;

    /**
     * Highlights the given tabs and focuses on the first of group. Will appear to do nothing if the specified tab is currently active.
     */
    export function highlight(

      highlightInfo: {

        /**
         * The window that contains the tabs.
         */
        windowId?: number,

        /**
         * One or more tab indices to highlight.
         */
        tabs: number[] | number,
      },

      /**
       * @param window Contains details about the window whose tabs were highlighted.
       */
      callback?: (
        window: windows.Window,
      ) => void,
    ): void;

    /**
     * Modifies the properties of a tab. Properties that are not specified in `updateProperties` are not modified.
     *
     * @chrome-returns-extra since Chrome 88
     * @param tabId Defaults to the selected tab of the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
     */
    export function update(

      tabId: number,

      updateProperties: {

        /**
         * A URL to navigate the tab to. JavaScript URLs are not supported; use {@link scripting.executeScript} instead.
         */
        url?: string,

        /**
         * Whether the tab should be active. Does not affect whether the window is focused (see {@link windows.update}).
         */
        active?: boolean,

        /**
         * Adds or removes the tab from the current selection.
         */
        highlighted?: boolean,

        /**
         * Whether the tab should be selected.
         *
         * @deprecated Please use _highlighted_.
         */
        selected?: boolean,

        /**
         * Whether the tab should be pinned.
         */
        pinned?: boolean,

        /**
         * Whether the tab should be muted.
         *
         * @since Chrome 45
         */
        muted?: boolean,

        /**
         * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab.
         */
        openerTabId?: number,

        /**
         * Whether the tab should be discarded automatically by the browser when resources are low.
         *
         * @since Chrome 54
         */
        autoDiscardable?: boolean,
      },
    ): Promise<Tab | undefined>;

    /**
     * Modifies the properties of a tab. Properties that are not specified in `updateProperties` are not modified.
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function update(

      updateProperties: {

        /**
         * A URL to navigate the tab to. JavaScript URLs are not supported; use {@link scripting.executeScript} instead.
         */
        url?: string,

        /**
         * Whether the tab should be active. Does not affect whether the window is focused (see {@link windows.update}).
         */
        active?: boolean,

        /**
         * Adds or removes the tab from the current selection.
         */
        highlighted?: boolean,

        /**
         * Whether the tab should be selected.
         *
         * @deprecated Please use _highlighted_.
         */
        selected?: boolean,

        /**
         * Whether the tab should be pinned.
         */
        pinned?: boolean,

        /**
         * Whether the tab should be muted.
         *
         * @since Chrome 45
         */
        muted?: boolean,

        /**
         * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab.
         */
        openerTabId?: number,

        /**
         * Whether the tab should be discarded automatically by the browser when resources are low.
         *
         * @since Chrome 54
         */
        autoDiscardable?: boolean,
      },
    ): Promise<Tab | undefined>;

    /**
     * Modifies the properties of a tab. Properties that are not specified in `updateProperties` are not modified.
     *
     * @param tabId Defaults to the selected tab of the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
     */
    export function update(

      tabId: number,

      updateProperties: {

        /**
         * A URL to navigate the tab to. JavaScript URLs are not supported; use {@link scripting.executeScript} instead.
         */
        url?: string,

        /**
         * Whether the tab should be active. Does not affect whether the window is focused (see {@link windows.update}).
         */
        active?: boolean,

        /**
         * Adds or removes the tab from the current selection.
         */
        highlighted?: boolean,

        /**
         * Whether the tab should be selected.
         *
         * @deprecated Please use _highlighted_.
         */
        selected?: boolean,

        /**
         * Whether the tab should be pinned.
         */
        pinned?: boolean,

        /**
         * Whether the tab should be muted.
         *
         * @since Chrome 45
         */
        muted?: boolean,

        /**
         * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab.
         */
        openerTabId?: number,

        /**
         * Whether the tab should be discarded automatically by the browser when resources are low.
         *
         * @since Chrome 54
         */
        autoDiscardable?: boolean,
      },

      /**
       * @param tab Details about the updated tab. The {@link tabs.Tab} object does not contain `url`, `pendingUrl`, `title`, and `favIconUrl` if the `"tabs"` permission has not been requested.
       */
      callback?: (
        tab?: Tab,
      ) => void,
    ): void;

    /**
     * Modifies the properties of a tab. Properties that are not specified in `updateProperties` are not modified.
     */
    export function update(

      updateProperties: {

        /**
         * A URL to navigate the tab to. JavaScript URLs are not supported; use {@link scripting.executeScript} instead.
         */
        url?: string,

        /**
         * Whether the tab should be active. Does not affect whether the window is focused (see {@link windows.update}).
         */
        active?: boolean,

        /**
         * Adds or removes the tab from the current selection.
         */
        highlighted?: boolean,

        /**
         * Whether the tab should be selected.
         *
         * @deprecated Please use _highlighted_.
         */
        selected?: boolean,

        /**
         * Whether the tab should be pinned.
         */
        pinned?: boolean,

        /**
         * Whether the tab should be muted.
         *
         * @since Chrome 45
         */
        muted?: boolean,

        /**
         * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab.
         */
        openerTabId?: number,

        /**
         * Whether the tab should be discarded automatically by the browser when resources are low.
         *
         * @since Chrome 54
         */
        autoDiscardable?: boolean,
      },

      /**
       * @param tab Details about the updated tab. The {@link tabs.Tab} object does not contain `url`, `pendingUrl`, `title`, and `favIconUrl` if the `"tabs"` permission has not been requested.
       */
      callback?: (
        tab?: Tab,
      ) => void,
    ): void;

    /**
     * Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows.
     *
     * @chrome-returns-extra since Chrome 88
     * @param tabIds The tab ID or list of tab IDs to move.
     */
    export function move(

      tabIds: number | number[],

      moveProperties: {

        /**
         * Defaults to the window the tab is currently in.
         */
        windowId?: number,

        /**
         * The position to move the window to. Use `-1` to place the tab at the end of the window.
         */
        index: number,
      },
    ): Promise<Tab | Tab[]>;

    /**
     * Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows.
     *
     * @param tabIds The tab ID or list of tab IDs to move.
     */
    export function move(

      tabIds: number | number[],

      moveProperties: {

        /**
         * Defaults to the window the tab is currently in.
         */
        windowId?: number,

        /**
         * The position to move the window to. Use `-1` to place the tab at the end of the window.
         */
        index: number,
      },

      /**
       * @param tabs Details about the moved tabs.
       */
      callback?: (
        tabs: Tab | Tab[],
      ) => void,
    ): void;

    /**
     * Reload a tab.
     *
     * @chrome-returns-extra since Chrome 88
     * @param tabId The ID of the tab to reload; defaults to the selected tab of the current window.
     */
    export function reload(

      tabId?: number,

      reloadProperties?: {

        /**
         * Whether to bypass local caching. Defaults to `false`.
         */
        bypassCache?: boolean,
      },
    ): Promise<void>;

    /**
     * Reload a tab.
     *
     * @param tabId The ID of the tab to reload; defaults to the selected tab of the current window.
     */
    export function reload(

      tabId?: number,

      reloadProperties?: {

        /**
         * Whether to bypass local caching. Defaults to `false`.
         */
        bypassCache?: boolean,
      },

      callback?: () => void,
    ): void;

    /**
     * Closes one or more tabs.
     *
     * @chrome-returns-extra since Chrome 88
     * @param tabIds The tab ID or list of tab IDs to close.
     */
    export function remove(

      tabIds: number | number[],
    ): Promise<void>;

    /**
     * Closes one or more tabs.
     *
     * @param tabIds The tab ID or list of tab IDs to close.
     */
    export function remove(

      tabIds: number | number[],

      callback?: () => void,
    ): void;

    /**
     * Adds one or more tabs to a specified group, or if no group is specified, adds the given tabs to a newly created group.
     *
     * @since Chrome 88
     */
    export function group(

      options: {

        /**
         * The tab ID or list of tab IDs to add to the specified group.
         */
        tabIds: number | [number, ...number[]],

        /**
         * The ID of the group to add the tabs to. If not specified, a new group will be created.
         */
        groupId?: number,

        /**
         * Configurations for creating a group. Cannot be used if groupId is already specified.
         */
        createProperties?: {

          /**
           * The window of the new group. Defaults to the current window.
           */
          windowId?: number,
        },
      },
    ): Promise<number>;

    /**
     * Adds one or more tabs to a specified group, or if no group is specified, adds the given tabs to a newly created group.
     *
     * @since Chrome 88
     */
    export function group(

      options: {

        /**
         * The tab ID or list of tab IDs to add to the specified group.
         */
        tabIds: number | [number, ...number[]],

        /**
         * The ID of the group to add the tabs to. If not specified, a new group will be created.
         */
        groupId?: number,

        /**
         * Configurations for creating a group. Cannot be used if groupId is already specified.
         */
        createProperties?: {

          /**
           * The window of the new group. Defaults to the current window.
           */
          windowId?: number,
        },
      },

      /**
       * @param groupId The ID of the group that the tabs were added to.
       */
      callback?: (
        groupId: number,
      ) => void,
    ): void;

    /**
     * Removes one or more tabs from their respective groups. If any groups become empty, they are deleted.
     *
     * @param tabIds The tab ID or list of tab IDs to remove from their respective groups.
     * @since Chrome 88
     */
    export function ungroup(

      tabIds: number | [number, ...number[]],
    ): Promise<void>;

    /**
     * Removes one or more tabs from their respective groups. If any groups become empty, they are deleted.
     *
     * @param tabIds The tab ID or list of tab IDs to remove from their respective groups.
     * @since Chrome 88
     */
    export function ungroup(

      tabIds: number | [number, ...number[]],

      callback?: () => void,
    ): void;

    /**
     * Detects the primary language of the content in a tab.
     *
     * @chrome-returns-extra since Chrome 88
     * @param tabId Defaults to the active tab of the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
     */
    export function detectLanguage(

      tabId?: number,
    ): Promise<string>;

    /**
     * Detects the primary language of the content in a tab.
     *
     * @param tabId Defaults to the active tab of the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
     */
    export function detectLanguage(

      tabId?: number,

      /**
       * @param language An ISO language code such as `en` or `fr`. For a complete list of languages supported by this method, see [kLanguageInfoTable](https://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc). The second to fourth columns are checked and the first non-NULL value is returned, except for Simplified Chinese for which `zh-CN` is returned. For an unknown/undefined language, `und` is returned.
       */
      callback?: (
        language: string,
      ) => void,
    ): void;

    /**
     * Captures the visible area of the currently active tab in the specified window. In order to call this method, the extension must have either the [<all\_urls>](https://developer.chrome.com/extensions/develop/concepts/declare-permissions) permission or the [activeTab](https://developer.chrome.com/docs/extensions/develop/concepts/activeTab) permission. In addition to sites that extensions can normally access, this method allows extensions to capture sensitive sites that are otherwise restricted, including chrome:-scheme pages, other extensions' pages, and data: URLs. These sensitive sites can only be captured with the activeTab permission. File URLs may be captured only if the extension has been granted file access.
     *
     * @chrome-returns-extra since Chrome 88
     * @param windowId The target window. Defaults to the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
     */
    export function captureVisibleTab(

      windowId?: number,

      options?: extensionTypes.ImageDetails,
    ): Promise<string>;

    /**
     * Captures the visible area of the currently active tab in the specified window. In order to call this method, the extension must have either the [<all\_urls>](https://developer.chrome.com/extensions/develop/concepts/declare-permissions) permission or the [activeTab](https://developer.chrome.com/docs/extensions/develop/concepts/activeTab) permission. In addition to sites that extensions can normally access, this method allows extensions to capture sensitive sites that are otherwise restricted, including chrome:-scheme pages, other extensions' pages, and data: URLs. These sensitive sites can only be captured with the activeTab permission. File URLs may be captured only if the extension has been granted file access.
     *
     * @param windowId The target window. Defaults to the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
     */
    export function captureVisibleTab(

      windowId?: number,

      options?: extensionTypes.ImageDetails,

      /**
       * @param dataUrl A data URL that encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML `img` element for display.
       */
      callback?: (
        dataUrl: string,
      ) => void,
    ): void;

    /**
     * Zooms a specified tab.
     *
     * @chrome-returns-extra since Chrome 88
     * @param tabId The ID of the tab to zoom; defaults to the active tab of the current window.
     * @param zoomFactor The new zoom factor. A value of `0` sets the tab to its current default zoom factor. Values greater than `0` specify a (possibly non-default) zoom factor for the tab.
     */
    export function setZoom(

      tabId: number,

      zoomFactor: number,
    ): Promise<void>;

    /**
     * Zooms a specified tab.
     *
     * @chrome-returns-extra since Chrome 88
     * @param zoomFactor The new zoom factor. A value of `0` sets the tab to its current default zoom factor. Values greater than `0` specify a (possibly non-default) zoom factor for the tab.
     */
    export function setZoom(

      zoomFactor: number,
    ): Promise<void>;

    /**
     * Zooms a specified tab.
     *
     * @param tabId The ID of the tab to zoom; defaults to the active tab of the current window.
     * @param zoomFactor The new zoom factor. A value of `0` sets the tab to its current default zoom factor. Values greater than `0` specify a (possibly non-default) zoom factor for the tab.
     * @param callback Called after the zoom factor has been changed.
     */
    export function setZoom(

      tabId: number,

      zoomFactor: number,

      callback?: () => void,
    ): void;

    /**
     * Zooms a specified tab.
     *
     * @param zoomFactor The new zoom factor. A value of `0` sets the tab to its current default zoom factor. Values greater than `0` specify a (possibly non-default) zoom factor for the tab.
     * @param callback Called after the zoom factor has been changed.
     */
    export function setZoom(

      zoomFactor: number,

      callback?: () => void,
    ): void;

    /**
     * Gets the current zoom factor of a specified tab.
     *
     * @chrome-returns-extra since Chrome 88
     * @param tabId The ID of the tab to get the current zoom factor from; defaults to the active tab of the current window.
     */
    export function getZoom(

      tabId?: number,
    ): Promise<number>;

    /**
     * Gets the current zoom factor of a specified tab.
     *
     * @param tabId The ID of the tab to get the current zoom factor from; defaults to the active tab of the current window.
     * @param callback Called with the tab's current zoom factor after it has been fetched.
     */
    export function getZoom(

      tabId?: number,

      /**
       * @param zoomFactor The tab's current zoom factor.
       */
      callback?: (
        zoomFactor: number,
      ) => void,
    ): void;

    /**
     * Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.
     *
     * @chrome-returns-extra since Chrome 88
     * @param tabId The ID of the tab to change the zoom settings for; defaults to the active tab of the current window.
     * @param zoomSettings Defines how zoom changes are handled and at what scope.
     */
    export function setZoomSettings(

      tabId: number,

      zoomSettings: ZoomSettings,
    ): Promise<void>;

    /**
     * Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.
     *
     * @chrome-returns-extra since Chrome 88
     * @param zoomSettings Defines how zoom changes are handled and at what scope.
     */
    export function setZoomSettings(

      zoomSettings: ZoomSettings,
    ): Promise<void>;

    /**
     * Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.
     *
     * @param tabId The ID of the tab to change the zoom settings for; defaults to the active tab of the current window.
     * @param zoomSettings Defines how zoom changes are handled and at what scope.
     * @param callback Called after the zoom settings are changed.
     */
    export function setZoomSettings(

      tabId: number,

      zoomSettings: ZoomSettings,

      callback?: () => void,
    ): void;

    /**
     * Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.
     *
     * @param zoomSettings Defines how zoom changes are handled and at what scope.
     * @param callback Called after the zoom settings are changed.
     */
    export function setZoomSettings(

      zoomSettings: ZoomSettings,

      callback?: () => void,
    ): void;

    /**
     * Gets the current zoom settings of a specified tab.
     *
     * @chrome-returns-extra since Chrome 88
     * @param tabId The ID of the tab to get the current zoom settings from; defaults to the active tab of the current window.
     */
    export function getZoomSettings(

      tabId?: number,
    ): Promise<ZoomSettings>;

    /**
     * Gets the current zoom settings of a specified tab.
     *
     * @param tabId The ID of the tab to get the current zoom settings from; defaults to the active tab of the current window.
     * @param callback Called with the tab's current zoom settings.
     */
    export function getZoomSettings(

      tabId?: number,

      /**
       * @param zoomSettings The tab's current zoom settings.
       */
      callback?: (
        zoomSettings: ZoomSettings,
      ) => void,
    ): void;

    /**
     * Discards a tab from memory. Discarded tabs are still visible on the tab strip and are reloaded when activated.
     *
     * @chrome-returns-extra since Chrome 88
     * @param tabId The ID of the tab to be discarded. If specified, the tab is discarded unless it is active or already discarded. If omitted, the browser discards the least important tab. This can fail if no discardable tabs exist.
     * @since Chrome 54
     */
    export function discard(

      tabId?: number,
    ): Promise<Tab | undefined>;

    /**
     * Discards a tab from memory. Discarded tabs are still visible on the tab strip and are reloaded when activated.
     *
     * @param tabId The ID of the tab to be discarded. If specified, the tab is discarded unless it is active or already discarded. If omitted, the browser discards the least important tab. This can fail if no discardable tabs exist.
     * @param callback Called after the operation is completed.
     * @since Chrome 54
     */
    export function discard(

      tabId?: number,

      /**
       * @param tab The discarded tab, if it was successfully discarded; undefined otherwise.
       */
      callback?: (
        tab?: Tab,
      ) => void,
    ): void;

    /**
     * Go foward to the next page, if one is available.
     *
     * @chrome-returns-extra since Chrome 88
     * @param tabId The ID of the tab to navigate forward; defaults to the selected tab of the current window.
     * @since Chrome 72
     */
    export function goForward(

      tabId?: number,
    ): Promise<void>;

    /**
     * Go foward to the next page, if one is available.
     *
     * @param tabId The ID of the tab to navigate forward; defaults to the selected tab of the current window.
     * @since Chrome 72
     */
    export function goForward(

      tabId?: number,

      callback?: () => void,
    ): void;

    /**
     * Go back to the previous page, if one is available.
     *
     * @chrome-returns-extra since Chrome 88
     * @param tabId The ID of the tab to navigate back; defaults to the selected tab of the current window.
     * @since Chrome 72
     */
    export function goBack(

      tabId?: number,
    ): Promise<void>;

    /**
     * Go back to the previous page, if one is available.
     *
     * @param tabId The ID of the tab to navigate back; defaults to the selected tab of the current window.
     * @since Chrome 72
     */
    export function goBack(

      tabId?: number,

      callback?: () => void,
    ): void;
  }

  /**
   * Use the `chrome.topSites` API to access the top sites (i.e. most visited sites) that are displayed on the new tab page. These do not include shortcuts customized by the user.
   *
   * @chrome-permission topSites
   */
  export namespace topSites {

    /**
     * An object encapsulating a most visited URL, such as the default shortcuts on the new tab page.
     */
    export interface MostVisitedURL {

      /**
       * The most visited URL.
       */
      url: string;

      /**
       * The title of the page
       */
      title: string;
    }

    /**
     * Gets a list of top sites.
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function get(): Promise<MostVisitedURL[]>;

    /**
     * Gets a list of top sites.
     */
    export function get(

      callback?: (
        data: MostVisitedURL[],
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.tts` API to play synthesized text-to-speech (TTS). See also the related {@link ttsEngine} API, which allows an extension to implement a speech engine.
   *
   * @chrome-permission tts
   */
  export namespace tts {

    /**
     * @since Chrome 54
     */
    export type EventType = "start" | "end" | "word" | "sentence" | "marker" | "interrupted" | "cancelled" | "error" | "pause" | "resume";

    /**
     * @deprecated Gender is deprecated and is ignored.
     * @since Chrome 54
     * @chrome-deprecated-since Chrome 70
     */
    export type VoiceGender = "male" | "female";

    /**
     * The speech options for the TTS engine.
     *
     * @since Chrome 77
     */
    export interface TtsOptions {

      /**
       * If true, enqueues this utterance if TTS is already in progress. If false (the default), interrupts any current speech and flushes the speech queue before speaking this new utterance.
       */
      enqueue?: boolean;

      /**
       * The name of the voice to use for synthesis. If empty, uses any available voice.
       */
      voiceName?: string;

      /**
       * The extension ID of the speech engine to use, if known.
       */
      extensionId?: string;

      /**
       * The language to be used for synthesis, in the form _language_\-_region_. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'.
       */
      lang?: string;

      /**
       * Gender of voice for synthesized speech.
       *
       * @deprecated Gender is deprecated and will be ignored.
       * @chrome-deprecated-since Chrome 77
       */
      gender?: VoiceGender;

      /**
       * Speaking rate relative to the default rate for this voice. 1.0 is the default rate, normally around 180 to 220 words per minute. 2.0 is twice as fast, and 0.5 is half as fast. Values below 0.1 or above 10.0 are strictly disallowed, but many voices will constrain the minimum and maximum rates further—for example a particular voice may not actually speak faster than 3 times normal even if you specify a value larger than 3.0.
       */
      rate?: number;

      /**
       * Speaking pitch between 0 and 2 inclusive, with 0 being lowest and 2 being highest. 1.0 corresponds to a voice's default pitch.
       */
      pitch?: number;

      /**
       * Speaking volume between 0 and 1 inclusive, with 0 being lowest and 1 being highest, with a default of 1.0.
       */
      volume?: number;

      /**
       * The TTS event types the voice must support.
       */
      requiredEventTypes?: string[];

      /**
       * The TTS event types that you are interested in listening to. If missing, all event types may be sent.
       */
      desiredEventTypes?: string[];

      /**
       * This function is called with events that occur in the process of speaking the utterance.
       *
       * @param event The update event from the text-to-speech engine indicating the status of this utterance.
       */
      onEvent?: (
        event: TtsEvent,
      ) => void;
    }

    /**
     * An event from the TTS engine to communicate the status of an utterance.
     */
    export interface TtsEvent {

      /**
       * The type can be `start` as soon as speech has started, `word` when a word boundary is reached, `sentence` when a sentence boundary is reached, `marker` when an SSML mark element is reached, `end` when the end of the utterance is reached, `interrupted` when the utterance is stopped or interrupted before reaching the end, `cancelled` when it's removed from the queue before ever being synthesized, or `error` when any other error occurs. When pausing speech, a `pause` event is fired if a particular utterance is paused in the middle, and `resume` if an utterance resumes speech. Note that pause and resume events may not fire if speech is paused in-between utterances.
       */
      type: EventType;

      /**
       * The index of the current character in the utterance. For word events, the event fires at the end of one word and before the beginning of the next. The `charIndex` represents a point in the text at the beginning of the next word to be spoken.
       */
      charIndex?: number;

      /**
       * The error description, if the event type is `error`.
       */
      errorMessage?: string;

      /**
       * The length of the next part of the utterance. For example, in a `word` event, this is the length of the word which will be spoken next. It will be set to -1 if not set by the speech engine.
       *
       * @since Chrome 74
       */
      length?: number;
    }

    /**
     * A description of a voice available for speech synthesis.
     */
    export interface TtsVoice {

      /**
       * The name of the voice.
       */
      voiceName?: string;

      /**
       * The language that this voice supports, in the form _language_\-_region_. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'.
       */
      lang?: string;

      /**
       * This voice's gender.
       *
       * @deprecated Gender is deprecated and will be ignored.
       * @chrome-deprecated-since Chrome 70
       */
      gender?: VoiceGender;

      /**
       * If true, the synthesis engine is a remote network resource. It may be higher latency and may incur bandwidth costs.
       */
      remote?: boolean;

      /**
       * The ID of the extension providing this voice.
       */
      extensionId?: string;

      /**
       * All of the callback event types that this voice is capable of sending.
       */
      eventTypes?: EventType[];
    }

    /**
     * Speaks text using a text-to-speech engine.
     *
     * @chrome-returns-extra since Chrome 101
     * @param utterance The text to speak, either plain text or a complete, well-formed SSML document. Speech engines that do not support SSML will strip away the tags and speak the text. The maximum length of the text is 32,768 characters.
     * @param options The speech options.
     */
    export function speak(

      utterance: string,

      options?: TtsOptions,
    ): Promise<void>;

    /**
     * Speaks text using a text-to-speech engine.
     *
     * @param utterance The text to speak, either plain text or a complete, well-formed SSML document. Speech engines that do not support SSML will strip away the tags and speak the text. The maximum length of the text is 32,768 characters.
     * @param options The speech options.
     * @param callback Called right away, before speech finishes. Check {@link runtime.lastError} to make sure there were no errors. Use options.onEvent to get more detailed feedback.
     */
    export function speak(

      utterance: string,

      options?: TtsOptions,

      callback?: () => void,
    ): void;

    /**
     * Stops any current speech and flushes the queue of any pending utterances. In addition, if speech was paused, it will now be un-paused for the next call to speak.
     */
    export function stop(): void;

    /**
     * Pauses speech synthesis, potentially in the middle of an utterance. A call to resume or stop will un-pause speech.
     */
    export function pause(): void;

    /**
     * If speech was paused, resumes speaking where it left off.
     */
    export function resume(): void;

    /**
     * Checks whether the engine is currently speaking. On Mac OS X, the result is true whenever the system speech engine is speaking, even if the speech wasn't initiated by Chrome.
     *
     * @chrome-returns-extra since Chrome 101
     */
    export function isSpeaking(): Promise<boolean>;

    /**
     * Checks whether the engine is currently speaking. On Mac OS X, the result is true whenever the system speech engine is speaking, even if the speech wasn't initiated by Chrome.
     */
    export function isSpeaking(

      /**
       * @param speaking True if speaking, false otherwise.
       */
      callback?: (
        speaking: boolean,
      ) => void,
    ): void;

    /**
     * Gets an array of all available voices.
     *
     * @chrome-returns-extra since Chrome 101
     */
    export function getVoices(): Promise<TtsVoice[]>;

    /**
     * Gets an array of all available voices.
     */
    export function getVoices(

      /**
       * @param voices Array of {@link tts.TtsVoice} objects representing the available voices for speech synthesis.
       */
      callback?: (
        voices: TtsVoice[],
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.ttsEngine` API to implement a text-to-speech(TTS) engine using an extension. If your extension registers using this API, it will receive events containing an utterance to be spoken and other parameters when any extension or Chrome App uses the {@link tts} API to generate speech. Your extension can then use any available web technology to synthesize and output the speech, and send events back to the calling function to report the status.
   *
   * @chrome-permission ttsEngine
   */
  export namespace ttsEngine {

    /**
     * @deprecated Gender is deprecated and will be ignored.
     * @since Chrome 54
     * @chrome-deprecated-since Chrome 70
     */
    export type VoiceGender = "male" | "female";

    /**
     * Options specified to the tts.speak() method.
     *
     * @since Chrome 92
     */
    export interface SpeakOptions {

      /**
       * The name of the voice to use for synthesis.
       */
      voiceName?: string;

      /**
       * The language to be used for synthesis, in the form _language_\-_region_. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'.
       */
      lang?: string;

      /**
       * Gender of voice for synthesized speech.
       *
       * @deprecated Gender is deprecated and will be ignored.
       * @chrome-deprecated-since Chrome 92
       */
      gender?: VoiceGender;

      /**
       * Speaking rate relative to the default rate for this voice. 1.0 is the default rate, normally around 180 to 220 words per minute. 2.0 is twice as fast, and 0.5 is half as fast. This value is guaranteed to be between 0.1 and 10.0, inclusive. When a voice does not support this full range of rates, don't return an error. Instead, clip the rate to the range the voice supports.
       */
      rate?: number;

      /**
       * Speaking pitch between 0 and 2 inclusive, with 0 being lowest and 2 being highest. 1.0 corresponds to this voice's default pitch.
       */
      pitch?: number;

      /**
       * Speaking volume between 0 and 1 inclusive, with 0 being lowest and 1 being highest, with a default of 1.0.
       */
      volume?: number;
    }

    /**
     * Contains the audio stream format expected to be produced by an engine.
     *
     * @since Chrome 92
     */
    export interface AudioStreamOptions {

      /**
       * The sample rate expected in an audio buffer.
       */
      sampleRate: number;

      /**
       * The number of samples within an audio buffer.
       */
      bufferSize: number;
    }

    /**
     * Parameters containing an audio buffer and associated data.
     *
     * @since Chrome 92
     */
    export interface AudioBuffer {

      /**
       * The audio buffer from the text-to-speech engine. It should have length exactly audioStreamOptions.bufferSize and encoded as mono, at audioStreamOptions.sampleRate, and as linear pcm, 32-bit signed float i.e. the Float32Array type in javascript.
       */
      audioBuffer: ArrayBuffer;

      /**
       * The character index associated with this audio buffer.
       */
      charIndex?: number;

      /**
       * True if this audio buffer is the last for the text being spoken.
       */
      isLastBuffer?: boolean;
    }

    /**
     * Called when the user makes a call to tts.speak() and one of the voices from this extension's manifest is the first to match the options object.
     */
    export const onSpeak: events.Event<(
      utterance: string,
      options: SpeakOptions,
      /**
       * @param event The event from the text-to-speech engine indicating the status of this utterance.
       */
      sendTtsEvent: (
        event: tts.TtsEvent,
      ) => void,
    ) => void>;

    /**
     * Called when the user makes a call to tts.speak() and one of the voices from this extension's manifest is the first to match the options object. Differs from ttsEngine.onSpeak in that Chrome provides audio playback services and handles dispatching tts events.
     *
     * @since Chrome 92
     */
    export const onSpeakWithAudioStream: events.Event<(
      utterance: string,
      options: SpeakOptions,
      audioStreamOptions: AudioStreamOptions,
      /**
       * @param audioBufferParams Parameters containing an audio buffer and associated data.
       */
      sendTtsAudio: (
        audioBufferParams: AudioBuffer,
      ) => void,
      /**
       * @param errorMessage A string describing the error.
       * @since Chrome 94
       */
      sendError: (
        errorMessage?: string,
      ) => void,
    ) => void>;

    /**
     * Fired when a call is made to tts.stop and this extension may be in the middle of speaking. If an extension receives a call to onStop and speech is already stopped, it should do nothing (not raise an error). If speech is in the paused state, this should cancel the paused state.
     */
    export const onStop: events.Event<() => void>;

    /**
     * Optional: if an engine supports the pause event, it should pause the current utterance being spoken, if any, until it receives a resume event or stop event. Note that a stop event should also clear the paused state.
     */
    export const onPause: events.Event<() => void>;

    /**
     * Optional: if an engine supports the pause event, it should also support the resume event, to continue speaking the current utterance, if any. Note that a stop event should also clear the paused state.
     */
    export const onResume: events.Event<() => void>;

    /**
     * Called by an engine to update its list of voices. This list overrides any voices declared in this extension's manifest.
     *
     * @param voices Array of {@link tts.TtsVoice} objects representing the available voices for speech synthesis.
     * @since Chrome 66
     */
    export function updateVoices(

      voices: tts.TtsVoice[],
    ): void;
  }

  /**
   * The `chrome.types` API contains type declarations for Chrome.
   */
  export namespace types {

    /**
     * The scope of the ChromeSetting. One of
     *
     * *   `regular`: setting for the regular profile (which is inherited by the incognito profile if not overridden elsewhere),
     * *   `regular\_only`: setting for the regular profile only (not inherited by the incognito profile),
     * *   `incognito\_persistent`: setting for the incognito profile that survives browser restarts (overrides regular preferences),
     * *   `incognito\_session\_only`: setting for the incognito profile that can only be set during an incognito session and is deleted when the incognito session ends (overrides regular and incognito\_persistent preferences).
     *
     * @since Chrome 44
     */
    export type ChromeSettingScope = "regular" | "regular_only" | "incognito_persistent" | "incognito_session_only";

    /**
     * One of
     *
     * *   `not\_controllable`: cannot be controlled by any extension
     * *   `controlled\_by\_other\_extensions`: controlled by extensions with higher precedence
     * *   `controllable\_by\_this\_extension`: can be controlled by this extension
     * *   `controlled\_by\_this\_extension`: controlled by this extension
     *
     * @since Chrome 44
     */
    export type LevelOfControl = "not_controllable" | "controlled_by_other_extensions" | "controllable_by_this_extension" | "controlled_by_this_extension";

    /**
     * An interface that allows access to a Chrome browser setting. See {@link accessibilityFeatures} for an example.
     */
    export interface ChromeSetting<T> {

      /**
       * Fired after the setting changes.
       */
      onChange: events.Event<(
        details: {

          /**
           * The value of the setting after the change.
           */
          value: T,

          /**
           * The level of control of the setting.
           */
          levelOfControl: LevelOfControl,

          /**
           * Whether the value that has changed is specific to the incognito session.
           * This property will _only_ be present if the user has enabled the extension in incognito mode.
           */
          incognitoSpecific?: boolean,
        },
      ) => void>;

      /**
       * Gets the value of a setting.
       *
       * @chrome-returns-extra since Chrome 96
       * @param details Which setting to consider.
       */
      get(

        details: {

          /**
           * Whether to return the value that applies to the incognito session (default false).
           */
          incognito?: boolean,
        },
      ): Promise<{

        /**
         * The value of the setting.
         */
        value: T,

        /**
         * The level of control of the setting.
         */
        levelOfControl: LevelOfControl,

        /**
         * Whether the effective value is specific to the incognito session.
         * This property will _only_ be present if the `incognito` property in the `details` parameter of `get()` was true.
         */
        incognitoSpecific?: boolean,
      }>;

      /**
       * Gets the value of a setting.
       *
       * @param details Which setting to consider.
       */
      get(

        details: {

          /**
           * Whether to return the value that applies to the incognito session (default false).
           */
          incognito?: boolean,
        },

        /**
         * @param details Details of the currently effective value.
         */
        callback?: (
          details: {

            /**
             * The value of the setting.
             */
            value: T,

            /**
             * The level of control of the setting.
             */
            levelOfControl: LevelOfControl,

            /**
             * Whether the effective value is specific to the incognito session.
             * This property will _only_ be present if the `incognito` property in the `details` parameter of `get()` was true.
             */
            incognitoSpecific?: boolean,
          },
        ) => void,
      ): void;

      /**
       * Sets the value of a setting.
       *
       * @chrome-returns-extra since Chrome 96
       * @param details Which setting to change.
       */
      set(

        details: {

          /**
           * The value of the setting.
           * Note that every setting has a specific value type, which is described together with the setting. An extension should _not_ set a value of a different type.
           */
          value: T,

          /**
           * Where to set the setting (default: regular).
           */
          scope?: ChromeSettingScope,
        },
      ): Promise<void>;

      /**
       * Sets the value of a setting.
       *
       * @param details Which setting to change.
       * @param callback Called at the completion of the set operation.
       */
      set(

        details: {

          /**
           * The value of the setting.
           * Note that every setting has a specific value type, which is described together with the setting. An extension should _not_ set a value of a different type.
           */
          value: T,

          /**
           * Where to set the setting (default: regular).
           */
          scope?: ChromeSettingScope,
        },

        callback?: () => void,
      ): void;

      /**
       * Clears the setting, restoring any default value.
       *
       * @chrome-returns-extra since Chrome 96
       * @param details Which setting to clear.
       */
      clear(

        details: {

          /**
           * Where to clear the setting (default: regular).
           */
          scope?: ChromeSettingScope,
        },
      ): Promise<void>;

      /**
       * Clears the setting, restoring any default value.
       *
       * @param details Which setting to clear.
       * @param callback Called at the completion of the clear operation.
       */
      clear(

        details: {

          /**
           * Where to clear the setting (default: regular).
           */
          scope?: ChromeSettingScope,
        },

        callback?: () => void,
      ): void;
    }
  }

  /**
   * Use the `chrome.usb` API to interact with connected USB devices. This API provides access to USB operations from within the context of an app. Using this API, apps can function as drivers for hardware devices. Errors generated by this API are reported by setting {@link runtime.lastError} and executing the function's regular callback. The callback's regular parameters will be undefined in this case.
   *
   * @alpha
   * @chrome-permission usb
   * @chrome-channel dev
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace usb {

    /**
     * Direction, Recipient, RequestType, and TransferType all map to their namesakes within the USB specification.
     */
    export type Direction = "in" | "out";

    export type Recipient = "device" | "interface" | "endpoint" | "other";

    export type RequestType = "standard" | "class" | "vendor" | "reserved";

    export type TransferType = "control" | "interrupt" | "isochronous" | "bulk";

    /**
     * For interrupt and isochronous modes, SynchronizationType and UsageType map to their namesakes within the USB specification.
     */
    export type SynchronizationType = "asynchronous" | "adaptive" | "synchronous";

    export type UsageType = "data" | "feedback" | "explicitFeedback" | "periodic" | "notification";

    export interface Device {

      /**
       * An opaque ID for the USB device. It remains unchanged until the device is unplugged.
       */
      device: number;

      /**
       * The device vendor ID.
       */
      vendorId: number;

      /**
       * The product ID.
       */
      productId: number;

      /**
       * The device version (bcdDevice field).
       */
      version: number;

      /**
       * The iProduct string read from the device, if available.
       */
      productName: string;

      /**
       * The iManufacturer string read from the device, if available.
       */
      manufacturerName: string;

      /**
       * The iSerialNumber string read from the device, if available.
       */
      serialNumber: string;
    }

    export interface ConnectionHandle {

      /**
       * An opaque handle representing this connection to the USB device and all associated claimed interfaces and pending transfers. A new handle is created each time the device is opened. The connection handle is different from {@link Device.device}.
       */
      handle: number;

      /**
       * The device vendor ID.
       */
      vendorId: number;

      /**
       * The product ID.
       */
      productId: number;
    }

    export interface EndpointDescriptor {

      /**
       * Endpoint address.
       */
      address: number;

      /**
       * Transfer type.
       */
      type: TransferType;

      /**
       * Transfer direction.
       */
      direction: Direction;

      /**
       * Maximum packet size.
       */
      maximumPacketSize: number;

      /**
       * Transfer synchronization mode (isochronous only).
       */
      synchronization?: SynchronizationType;

      /**
       * Endpoint usage hint.
       */
      usage?: UsageType;

      /**
       * Polling interval (interrupt and isochronous only).
       */
      pollingInterval?: number;

      /**
       * Extra descriptor data associated with this endpoint.
       */
      extra_data: ArrayBuffer;
    }

    export interface InterfaceDescriptor {

      /**
       * The interface number.
       */
      interfaceNumber: number;

      /**
       * The interface alternate setting number (defaults to `0`
       */
      alternateSetting: number;

      /**
       * The USB interface class.
       */
      interfaceClass: number;

      /**
       * The USB interface sub-class.
       */
      interfaceSubclass: number;

      /**
       * The USB interface protocol.
       */
      interfaceProtocol: number;

      /**
       * Description of the interface.
       */
      description?: string;

      /**
       * Available endpoints.
       */
      endpoints: EndpointDescriptor[];

      /**
       * Extra descriptor data associated with this interface.
       */
      extra_data: ArrayBuffer;
    }

    export interface ConfigDescriptor {

      /**
       * Is this the active configuration?
       */
      active: boolean;

      /**
       * The configuration number.
       */
      configurationValue: number;

      /**
       * Description of the configuration.
       */
      description?: string;

      /**
       * The device is self-powered.
       */
      selfPowered: boolean;

      /**
       * The device supports remote wakeup.
       */
      remoteWakeup: boolean;

      /**
       * The maximum power needed by this device in milliamps (mA).
       */
      maxPower: number;

      /**
       * Available interfaces.
       */
      interfaces: InterfaceDescriptor[];

      /**
       * Extra descriptor data associated with this configuration.
       */
      extra_data: ArrayBuffer;
    }

    export interface ControlTransferInfo {

      /**
       * The transfer direction (`"in"` or `"out"`).
       */
      direction: Direction;

      /**
       * The transfer target. The target given by `index` must be claimed if `"interface"` or `"endpoint"`.
       */
      recipient: Recipient;

      /**
       * The request type.
       */
      requestType: RequestType;

      /**
       * The `bRequest` field, see _Universal Serial Bus Specification Revision 1.1_ § 9.3.
       */
      request: number;

      /**
       * The `wValue` field, see _Ibid_.
       */
      value: number;

      /**
       * The `wIndex` field, see _Ibid_.
       */
      index: number;

      /**
       * The maximum number of bytes to receive (required only by input transfers).
       */
      length?: number;

      /**
       * The data to transmit (required only by output transfers).
       */
      data?: ArrayBuffer;

      /**
       * Request timeout (in milliseconds). The default value `0` indicates no timeout.
       */
      timeout?: number;
    }

    export interface GenericTransferInfo {

      /**
       * The transfer direction (`"in"` or `"out"`).
       */
      direction: Direction;

      /**
       * The target endpoint address. The interface containing this endpoint must be claimed.
       */
      endpoint: number;

      /**
       * The maximum number of bytes to receive (required only by input transfers).
       */
      length?: number;

      /**
       * The data to transmit (required only by output transfers).
       */
      data?: ArrayBuffer;

      /**
       * Request timeout (in milliseconds). The default value `0` indicates no timeout.
       */
      timeout?: number;
    }

    export interface IsochronousTransferInfo {

      /**
       * Transfer parameters. The transfer length or data buffer specified in this parameter block is split along `packetLength` boundaries to form the individual packets of the transfer.
       */
      transferInfo: GenericTransferInfo;

      /**
       * The total number of packets in this transfer.
       */
      packets: number;

      /**
       * The length of each of the packets in this transfer.
       */
      packetLength: number;
    }

    export interface TransferResultInfo {

      /**
       * A value of `0` indicates that the transfer was a success. Other values indicate failure.
       */
      resultCode?: number;

      /**
       * The data returned by an input transfer. `undefined` for output transfers.
       */
      data?: ArrayBuffer;
    }

    export interface DeviceFilter {

      /**
       * Device vendor ID.
       */
      vendorId?: number;

      /**
       * Device product ID, checked only if the vendor ID matches.
       */
      productId?: number;

      /**
       * USB interface class, matches any interface on the device.
       */
      interfaceClass?: number;

      /**
       * USB interface sub-class, checked only if the interface class matches.
       */
      interfaceSubclass?: number;

      /**
       * USB interface protocol, checked only if the interface sub-class matches.
       */
      interfaceProtocol?: number;
    }

    export interface EnumerateDevicesOptions {

      /**
       * @deprecated Equivalent to setting {@link DeviceFilter.vendorId}.
       */
      vendorId?: number;

      /**
       * @deprecated Equivalent to setting {@link DeviceFilter.productId}.
       */
      productId?: number;

      /**
       * A device matching any given filter will be returned. An empty filter list will return all devices the app has permission for.
       */
      filters?: DeviceFilter[];
    }

    export interface EnumerateDevicesAndRequestAccessOptions {

      /**
       * The device vendor ID.
       */
      vendorId: number;

      /**
       * The product ID.
       */
      productId: number;

      /**
       * The interface ID to request access to. Only available on Chrome OS. It has no effect on other platforms.
       */
      interfaceId?: number;
    }

    export interface DevicePromptOptions {

      /**
       * Allow the user to select multiple devices.
       */
      multiple?: boolean;

      /**
       * Filter the list of devices presented to the user. If multiple filters are provided devices matching any filter will be displayed.
       */
      filters?: DeviceFilter[];
    }

    /**
     * Event generated when a device is added to the system. Events are only broadcast to apps and extensions that have permission to access the device. Permission may have been granted at install time, when the user accepted an optional permission (see {@link permissions.request}), or through {@link getUserSelectedDevices}.
     */
    export const onDeviceAdded: events.Event<(
      device: Device,
    ) => void>;

    /**
     * Event generated when a device is removed from the system. See {@link onDeviceAdded} for which events are delivered.
     */
    export const onDeviceRemoved: events.Event<(
      device: Device,
    ) => void>;

    /**
     * Enumerates connected USB devices.
     *
     * @param options The properties to search for on target devices.
     */
    export function getDevices(

      options: EnumerateDevicesOptions,
    ): Promise<Device[]>;

    /**
     * Enumerates connected USB devices.
     *
     * @param options The properties to search for on target devices.
     */
    export function getDevices(

      options: EnumerateDevicesOptions,

      callback?: (
        devices: Device[],
      ) => void,
    ): void;

    /**
     * Presents a device picker to the user and returns the {@link Device}s selected. If the user cancels the picker devices will be empty. A user gesture is required for the dialog to display. Without a user gesture, the callback will run as though the user cancelled.
     *
     * @param options Configuration of the device picker dialog box.
     */
    export function getUserSelectedDevices(

      options: DevicePromptOptions,
    ): Promise<Device[]>;

    /**
     * Presents a device picker to the user and returns the {@link Device}s selected. If the user cancels the picker devices will be empty. A user gesture is required for the dialog to display. Without a user gesture, the callback will run as though the user cancelled.
     *
     * @param options Configuration of the device picker dialog box.
     * @param callback Invoked with a list of chosen {@link Device}s.
     */
    export function getUserSelectedDevices(

      options: DevicePromptOptions,

      callback?: (
        devices: Device[],
      ) => void,
    ): void;

    /**
     * Returns the full set of device configuration descriptors.
     *
     * @param device The {@link Device} to fetch descriptors from.
     */
    export function getConfigurations(

      device: Device,
    ): Promise<ConfigDescriptor[]>;

    /**
     * Returns the full set of device configuration descriptors.
     *
     * @param device The {@link Device} to fetch descriptors from.
     */
    export function getConfigurations(

      device: Device,

      callback?: (
        configs: ConfigDescriptor[],
      ) => void,
    ): void;

    /**
     * Requests access from the permission broker to a device claimed by Chrome OS if the given interface on the device is not claimed.
     *
     * @param device The {@link Device} to request access to.
     * @param interfaceId The particular interface requested.
     * @deprecated This function was Chrome OS specific and calling it on other platforms would fail. This operation is now implicitly performed as part of {@link openDevice} and this function will return `true` on all platforms.
     */
    export function requestAccess(

      device: Device,

      interfaceId: number,
    ): Promise<boolean>;

    /**
     * Requests access from the permission broker to a device claimed by Chrome OS if the given interface on the device is not claimed.
     *
     * @param device The {@link Device} to request access to.
     * @param interfaceId The particular interface requested.
     * @deprecated This function was Chrome OS specific and calling it on other platforms would fail. This operation is now implicitly performed as part of {@link openDevice} and this function will return `true` on all platforms.
     */
    export function requestAccess(

      device: Device,

      interfaceId: number,

      callback?: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Opens a USB device returned by {@link getDevices}.
     *
     * @param device The {@link Device} to open.
     */
    export function openDevice(

      device: Device,
    ): Promise<ConnectionHandle>;

    /**
     * Opens a USB device returned by {@link getDevices}.
     *
     * @param device The {@link Device} to open.
     */
    export function openDevice(

      device: Device,

      callback?: (
        handle: ConnectionHandle,
      ) => void,
    ): void;

    /**
     * Finds USB devices specified by the vendor, product and (optionally) interface IDs and if permissions allow opens them for use.
     *
     * If the access request is rejected or the device fails to be opened a connection handle will not be created or returned.
     *
     * Calling this method is equivalent to calling {@link getDevices} followed by {@link openDevice} for each device.
     *
     * @param options The properties to search for on target devices.
     */
    export function findDevices(

      options: EnumerateDevicesAndRequestAccessOptions,
    ): Promise<ConnectionHandle[]>;

    /**
     * Finds USB devices specified by the vendor, product and (optionally) interface IDs and if permissions allow opens them for use.
     *
     * If the access request is rejected or the device fails to be opened a connection handle will not be created or returned.
     *
     * Calling this method is equivalent to calling {@link getDevices} followed by {@link openDevice} for each device.
     *
     * @param options The properties to search for on target devices.
     */
    export function findDevices(

      options: EnumerateDevicesAndRequestAccessOptions,

      callback?: (
        handles: ConnectionHandle[],
      ) => void,
    ): void;

    /**
     * Closes a connection handle. Invoking operations on a handle after it has been closed is a safe operation but causes no action to be taken.
     *
     * @param handle The {@link ConnectionHandle} to close.
     */
    export function closeDevice(

      handle: ConnectionHandle,
    ): Promise<void>;

    /**
     * Closes a connection handle. Invoking operations on a handle after it has been closed is a safe operation but causes no action to be taken.
     *
     * @param handle The {@link ConnectionHandle} to close.
     */
    export function closeDevice(

      handle: ConnectionHandle,

      callback?: () => void,
    ): void;

    /**
     * Select a device configuration.
     *
     * This function effectively resets the device by selecting one of the device's available configurations. Only configuration values greater than `0` are valid however some buggy devices have a working configuration `0` and so this value is allowed.
     *
     * @param handle An open connection to the device.
     */
    export function setConfiguration(

      handle: ConnectionHandle,

      configurationValue: number,
    ): Promise<void>;

    /**
     * Select a device configuration.
     *
     * This function effectively resets the device by selecting one of the device's available configurations. Only configuration values greater than `0` are valid however some buggy devices have a working configuration `0` and so this value is allowed.
     *
     * @param handle An open connection to the device.
     */
    export function setConfiguration(

      handle: ConnectionHandle,

      configurationValue: number,

      callback?: () => void,
    ): void;

    /**
     * Gets the configuration descriptor for the currently selected configuration.
     *
     * @param handle An open connection to the device.
     */
    export function getConfiguration(

      handle: ConnectionHandle,
    ): Promise<ConfigDescriptor>;

    /**
     * Gets the configuration descriptor for the currently selected configuration.
     *
     * @param handle An open connection to the device.
     */
    export function getConfiguration(

      handle: ConnectionHandle,

      callback?: (
        config: ConfigDescriptor,
      ) => void,
    ): void;

    /**
     * Lists all interfaces on a USB device.
     *
     * @param handle An open connection to the device.
     */
    export function listInterfaces(

      handle: ConnectionHandle,
    ): Promise<InterfaceDescriptor[]>;

    /**
     * Lists all interfaces on a USB device.
     *
     * @param handle An open connection to the device.
     */
    export function listInterfaces(

      handle: ConnectionHandle,

      callback?: (
        descriptors: InterfaceDescriptor[],
      ) => void,
    ): void;

    /**
     * Claims an interface on a USB device. Before data can be transfered to an interface or associated endpoints the interface must be claimed. Only one connection handle can claim an interface at any given time. If the interface is already claimed, this call will fail.
     *
     * {@link releaseInterface} should be called when the interface is no longer needed.
     *
     * @param handle An open connection to the device.
     * @param interfaceNumber The interface to be claimed.
     */
    export function claimInterface(

      handle: ConnectionHandle,

      interfaceNumber: number,
    ): Promise<void>;

    /**
     * Claims an interface on a USB device. Before data can be transfered to an interface or associated endpoints the interface must be claimed. Only one connection handle can claim an interface at any given time. If the interface is already claimed, this call will fail.
     *
     * {@link releaseInterface} should be called when the interface is no longer needed.
     *
     * @param handle An open connection to the device.
     * @param interfaceNumber The interface to be claimed.
     */
    export function claimInterface(

      handle: ConnectionHandle,

      interfaceNumber: number,

      callback?: () => void,
    ): void;

    /**
     * Releases a claimed interface.
     *
     * @param handle An open connection to the device.
     * @param interfaceNumber The interface to be released.
     */
    export function releaseInterface(

      handle: ConnectionHandle,

      interfaceNumber: number,
    ): Promise<void>;

    /**
     * Releases a claimed interface.
     *
     * @param handle An open connection to the device.
     * @param interfaceNumber The interface to be released.
     */
    export function releaseInterface(

      handle: ConnectionHandle,

      interfaceNumber: number,

      callback?: () => void,
    ): void;

    /**
     * Selects an alternate setting on a previously claimed interface.
     *
     * @param handle An open connection to the device where this interface has been claimed.
     * @param interfaceNumber The interface to configure.
     * @param alternateSetting The alternate setting to configure.
     */
    export function setInterfaceAlternateSetting(

      handle: ConnectionHandle,

      interfaceNumber: number,

      alternateSetting: number,
    ): Promise<void>;

    /**
     * Selects an alternate setting on a previously claimed interface.
     *
     * @param handle An open connection to the device where this interface has been claimed.
     * @param interfaceNumber The interface to configure.
     * @param alternateSetting The alternate setting to configure.
     */
    export function setInterfaceAlternateSetting(

      handle: ConnectionHandle,

      interfaceNumber: number,

      alternateSetting: number,

      callback?: () => void,
    ): void;

    /**
     * Performs a control transfer on the specified device.
     *
     * Control transfers refer to either the device, an interface or an endpoint. Transfers to an interface or endpoint require the interface to be claimed.
     *
     * @param handle An open connection to the device.
     */
    export function controlTransfer(

      handle: ConnectionHandle,

      transferInfo: ControlTransferInfo,
    ): Promise<TransferResultInfo>;

    /**
     * Performs a control transfer on the specified device.
     *
     * Control transfers refer to either the device, an interface or an endpoint. Transfers to an interface or endpoint require the interface to be claimed.
     *
     * @param handle An open connection to the device.
     */
    export function controlTransfer(

      handle: ConnectionHandle,

      transferInfo: ControlTransferInfo,

      callback?: (
        info: TransferResultInfo,
      ) => void,
    ): void;

    /**
     * Performs a bulk transfer on the specified device.
     *
     * @param handle An open connection to the device.
     * @param transferInfo The transfer parameters.
     */
    export function bulkTransfer(

      handle: ConnectionHandle,

      transferInfo: GenericTransferInfo,
    ): Promise<TransferResultInfo>;

    /**
     * Performs a bulk transfer on the specified device.
     *
     * @param handle An open connection to the device.
     * @param transferInfo The transfer parameters.
     */
    export function bulkTransfer(

      handle: ConnectionHandle,

      transferInfo: GenericTransferInfo,

      callback?: (
        info: TransferResultInfo,
      ) => void,
    ): void;

    /**
     * Performs an interrupt transfer on the specified device.
     *
     * @param handle An open connection to the device.
     * @param transferInfo The transfer parameters.
     */
    export function interruptTransfer(

      handle: ConnectionHandle,

      transferInfo: GenericTransferInfo,
    ): Promise<TransferResultInfo>;

    /**
     * Performs an interrupt transfer on the specified device.
     *
     * @param handle An open connection to the device.
     * @param transferInfo The transfer parameters.
     */
    export function interruptTransfer(

      handle: ConnectionHandle,

      transferInfo: GenericTransferInfo,

      callback?: (
        info: TransferResultInfo,
      ) => void,
    ): void;

    /**
     * Performs an isochronous transfer on the specific device.
     *
     * @param handle An open connection to the device.
     */
    export function isochronousTransfer(

      handle: ConnectionHandle,

      transferInfo: IsochronousTransferInfo,
    ): Promise<TransferResultInfo>;

    /**
     * Performs an isochronous transfer on the specific device.
     *
     * @param handle An open connection to the device.
     */
    export function isochronousTransfer(

      handle: ConnectionHandle,

      transferInfo: IsochronousTransferInfo,

      callback?: (
        info: TransferResultInfo,
      ) => void,
    ): void;

    /**
     * Tries to reset the USB device. If the reset fails, the given connection handle will be closed and the USB device will appear to be disconnected then reconnected. In this case {@link getDevices} or {@link findDevices} must be called again to acquire the device.
     *
     * @param handle A connection handle to reset.
     */
    export function resetDevice(

      handle: ConnectionHandle,
    ): Promise<boolean>;

    /**
     * Tries to reset the USB device. If the reset fails, the given connection handle will be closed and the USB device will appear to be disconnected then reconnected. In this case {@link getDevices} or {@link findDevices} must be called again to acquire the device.
     *
     * @param handle A connection handle to reset.
     */
    export function resetDevice(

      handle: ConnectionHandle,

      callback?: (
        success: boolean,
      ) => void,
    ): void;
  }

  /**
   * Use the `userScripts` API to execute user scripts in the User Scripts context.
   *
   * @since Chrome 120
   * @chrome-permission userScripts
   * @chrome-min-manifest MV3
   */
  export namespace userScripts {

    /**
     * The JavaScript world for a user script to execute within.
     *
     * @chrome-enum "MAIN" Specifies the execution environment of the DOM, which is the execution environment shared with the host page's JavaScript.
     * @chrome-enum "USER\_SCRIPT" Specifies the execution enviroment that is specific to user scripts and is exempt from the page's CSP.
     */
    export type ExecutionWorld = "MAIN" | "USER_SCRIPT";

    export interface ScriptSource {

      /**
       * A string containing the JavaScript code to inject. Exactly one of `file` or `code` must be specified.
       */
      code?: string;

      /**
       * The path of the JavaScript file to inject relative to the extension's root directory. Exactly one of `file` or `code` must be specified.
       */
      file?: string;
    }

    export interface RegisteredUserScript {

      /**
       * If true, it will inject into all frames, even if the frame is not the top-most frame in the tab. Each frame is checked independently for URL requirements; it will not inject into child frames if the URL requirements are not met. Defaults to false, meaning that only the top frame is matched.
       */
      allFrames?: boolean;

      /**
       * Excludes pages that this user script would otherwise be injected into. See [Match Patterns](https://developer.chrome.com/extensions/develop/concepts/match-patterns) for more details on the syntax of these strings.
       */
      excludeMatches?: string[];

      /**
       * The ID of the user script specified in the API call. This property must not start with a '\_' as it's reserved as a prefix for generated script IDs.
       */
      id: string;

      /**
       * Specifies wildcard patterns for pages this user script will be injected into.
       */
      includeGlobs?: string[];

      /**
       * Specifies wildcard patterns for pages this user script will NOT be injected into.
       */
      excludeGlobs?: string[];

      /**
       * The list of ScriptSource objects defining sources of scripts to be injected into matching pages.
       */
      js: ScriptSource[];

      /**
       * Specifies which pages this user script will be injected into. See [Match Patterns](https://developer.chrome.com/extensions/develop/concepts/match-patterns) for more details on the syntax of these strings. This property must be specified for ${ref:register}.
       */
      matches?: string[];

      /**
       * Specifies when JavaScript files are injected into the web page. The preferred and default value is `document_idle`.
       */
      runAt?: extensionTypes.RunAt;

      /**
       * The JavaScript execution environment to run the script in. The default is `` `USER_SCRIPT` ``.
       */
      world?: ExecutionWorld;
    }

    export interface UserScriptFilter {

      /**
       * {@link getScripts} only returns scripts with the IDs specified in this list.
       */
      ids?: string[];
    }

    export interface WorldProperties {

      /**
       * Specifies the world csp. The default is the `` `ISOLATED` `` world csp.
       */
      csp?: string;

      /**
       * Specifies whether messaging APIs are exposed. The default is `false`.
       */
      messaging?: boolean;
    }

    /**
     * Registers one or more user scripts for this extension.
     *
     * @param scripts Contains a list of user scripts to be registered.
     */
    export function register(

      scripts: RegisteredUserScript[],
    ): Promise<void>;

    /**
     * Registers one or more user scripts for this extension.
     *
     * @param scripts Contains a list of user scripts to be registered.
     * @param callback Called once scripts have been fully registered or if an error has ocurred.
     */
    export function register(

      scripts: RegisteredUserScript[],

      callback?: () => void,
    ): void;

    /**
     * Returns all dynamically-registered user scripts for this extension.
     *
     * @param filter If specified, this method returns only the user scripts that match it.
     */
    export function getScripts(

      filter?: UserScriptFilter,
    ): Promise<RegisteredUserScript[]>;

    /**
     * Returns all dynamically-registered user scripts for this extension.
     *
     * @param filter If specified, this method returns only the user scripts that match it.
     * @param callback Called once scripts have been fully registered or if an error occurs.
     */
    export function getScripts(

      filter?: UserScriptFilter,

      callback?: (
        scripts: RegisteredUserScript[],
      ) => void,
    ): void;

    /**
     * Unregisters all dynamically-registered user scripts for this extension.
     *
     * @param filter If specified, this method unregisters only the user scripts that match it.
     */
    export function unregister(

      filter?: UserScriptFilter,
    ): Promise<void>;

    /**
     * Unregisters all dynamically-registered user scripts for this extension.
     *
     * @param filter If specified, this method unregisters only the user scripts that match it.
     * @param callback Called once scripts have been fully unregistered or if an error ocurs
     */
    export function unregister(

      filter?: UserScriptFilter,

      callback?: () => void,
    ): void;

    /**
     * Updates one or more user scripts for this extension.
     *
     * @param scripts Contains a list of user scripts to be updated. A property is only updated for the existing script if it is specified in this object. If there are errors during script parsing/file validation, or if the IDs specified do not correspond to a fully registered script, then no scripts are updated.
     */
    export function update(

      scripts: RegisteredUserScript[],
    ): Promise<void>;

    /**
     * Updates one or more user scripts for this extension.
     *
     * @param scripts Contains a list of user scripts to be updated. A property is only updated for the existing script if it is specified in this object. If there are errors during script parsing/file validation, or if the IDs specified do not correspond to a fully registered script, then no scripts are updated.
     * @param callback Called once scripts have been fully updated or if an error occurs.
     */
    export function update(

      scripts: RegisteredUserScript[],

      callback?: () => void,
    ): void;

    /**
     * Configures the `` `USER_SCRIPT` `` execution environment.
     *
     * @param properties Contains the user script world configuration.
     */
    export function configureWorld(

      properties: WorldProperties,
    ): Promise<void>;

    /**
     * Configures the `` `USER_SCRIPT` `` execution environment.
     *
     * @param properties Contains the user script world configuration.
     * @param callback Called once world hase been configured.
     */
    export function configureWorld(

      properties: WorldProperties,

      callback?: () => void,
    ): void;
  }

  /**
   * The `chrome.virtualKeyboard` API is a kiosk only API used to configure virtual keyboard layout and behavior in kiosk sessions.
   *
   * @alpha
   * @chrome-permission virtualKeyboard
   * @chrome-channel dev
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace virtualKeyboard {

    export interface FeatureRestrictions {

      /**
       * Whether virtual keyboards can provide auto-complete.
       */
      autoCompleteEnabled?: boolean;

      /**
       * Whether virtual keyboards can provide auto-correct.
       */
      autoCorrectEnabled?: boolean;

      /**
       * Whether virtual keyboards can provide input via handwriting recognition.
       */
      handwritingEnabled?: boolean;

      /**
       * Whether virtual keyboards can provide spell-check.
       */
      spellCheckEnabled?: boolean;

      /**
       * Whether virtual keyboards can provide voice input.
       */
      voiceInputEnabled?: boolean;
    }

    /**
     * Sets restrictions on features provided by the virtual keyboard.
     *
     * @param restrictions the preferences to enabled/disabled virtual keyboard features.
     */
    export function restrictFeatures(

      restrictions: FeatureRestrictions,
    ): Promise<FeatureRestrictions>;

    /**
     * Sets restrictions on features provided by the virtual keyboard.
     *
     * @param restrictions the preferences to enabled/disabled virtual keyboard features.
     * @param callback Invoked with the values which were updated.
     */
    export function restrictFeatures(

      restrictions: FeatureRestrictions,

      callback?: (
        update: FeatureRestrictions,
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.vpnProvider` API to implement a VPN client.
   *
   * @since Chrome 43
   * @chrome-permission vpnProvider
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace vpnProvider {

    export interface Parameters {

      /**
       * IP address for the VPN interface in CIDR notation. IPv4 is currently the only supported mode.
       */
      address: string;

      /**
       * Broadcast address for the VPN interface. (default: deduced from IP address and mask)
       */
      broadcastAddress?: string;

      /**
       * MTU setting for the VPN interface. (default: 1500 bytes)
       */
      mtu?: string;

      /**
       * Exclude network traffic to the list of IP blocks in CIDR notation from the tunnel. This can be used to bypass traffic to and from the VPN server. When many rules match a destination, the rule with the longest matching prefix wins. Entries that correspond to the same CIDR block are treated as duplicates. Such duplicates in the collated (exclusionList + inclusionList) list are eliminated and the exact duplicate entry that will be eliminated is undefined.
       */
      exclusionList: string[];

      /**
       * Include network traffic to the list of IP blocks in CIDR notation to the tunnel. This parameter can be used to set up a split tunnel. By default no traffic is directed to the tunnel. Adding the entry "0.0.0.0/0" to this list gets all the user traffic redirected to the tunnel. When many rules match a destination, the rule with the longest matching prefix wins. Entries that correspond to the same CIDR block are treated as duplicates. Such duplicates in the collated (exclusionList + inclusionList) list are eliminated and the exact duplicate entry that will be eliminated is undefined.
       */
      inclusionList: string[];

      /**
       * A list of search domains. (default: no search domain)
       */
      domainSearch?: string[];

      /**
       * A list of IPs for the DNS servers.
       */
      dnsServers: string[];

      /**
       * Whether or not the VPN extension implements auto-reconnection.
       *
       * If true, the `linkDown`, `linkUp`, `linkChanged`, `suspend`, and `resume` platform messages will be used to signal the respective events. If false, the system will forcibly disconnect the VPN if the network topology changes, and the user will need to reconnect manually. (default: false)
       *
       * This property is new in Chrome 51; it will generate an exception in earlier versions. try/catch can be used to conditionally enable the feature based on browser support.
       *
       * @since Chrome 51
       */
      reconnect?: string;
    }

    /**
     * The enum is used by the platform to notify the client of the VPN session status.
     *
     * @chrome-enum "connected" Indicates that the VPN configuration connected.
     * @chrome-enum "disconnected" Indicates that the VPN configuration disconnected.
     * @chrome-enum "error" Indicates that an error occurred in VPN connection, for example a timeout. A description of the error is given as the {@link onPlatformMessage.error error argument to onPlatformMessage}.
     * @chrome-enum "linkDown" Indicates that the default physical network connection is down.
     * @chrome-enum "linkUp" Indicates that the default physical network connection is back up.
     * @chrome-enum "linkChanged" Indicates that the default physical network connection changed, e.g. wifi->mobile.
     * @chrome-enum "suspend" Indicates that the OS is preparing to suspend, so the VPN should drop its connection. The extension is not guaranteed to receive this event prior to suspending.
     * @chrome-enum "resume" Indicates that the OS has resumed and the user has logged back in, so the VPN should try to reconnect.
     */
    export type PlatformMessage = "connected" | "disconnected" | "error" | "linkDown" | "linkUp" | "linkChanged" | "suspend" | "resume";

    /**
     * The enum is used by the VPN client to inform the platform of its current state. This helps provide meaningful messages to the user.
     *
     * @chrome-enum "connected" Specifies that VPN connection was successful.
     * @chrome-enum "failure" Specifies that VPN connection has failed.
     */
    export type VpnConnectionState = "connected" | "failure";

    /**
     * The enum is used by the platform to indicate the event that triggered `onUIEvent`.
     *
     * @chrome-enum "showAddDialog" Requests that the VPN client show the add configuration dialog box to the user.
     * @chrome-enum "showConfigureDialog" Requests that the VPN client show the configuration settings dialog box to the user.
     */
    export type UIEvent = "showAddDialog" | "showConfigureDialog";

    /**
     * Triggered when a message is received from the platform for a VPN configuration owned by the extension.
     */
    export const onPlatformMessage: events.Event<(
      id: string,
      message: PlatformMessage,
      error: string,
    ) => void>;

    /**
     * Triggered when an IP packet is received via the tunnel for the VPN session owned by the extension.
     */
    export const onPacketReceived: events.Event<(
      data: ArrayBuffer,
    ) => void>;

    /**
     * Triggered when a configuration created by the extension is removed by the platform.
     */
    export const onConfigRemoved: events.Event<(
      id: string,
    ) => void>;

    /**
     * Triggered when a configuration is created by the platform for the extension.
     */
    export const onConfigCreated: events.Event<(
      id: string,
      name: string,
      data: {[name: string]: any},
    ) => void>;

    /**
     * Triggered when there is a UI event for the extension. UI events are signals from the platform that indicate to the app that a UI dialog needs to be shown to the user.
     */
    export const onUIEvent: events.Event<(
      event: UIEvent,
      id?: string,
    ) => void>;

    /**
     * Creates a new VPN configuration that persists across multiple login sessions of the user.
     *
     * @chrome-returns-extra since Chrome 96
     * @param name The name of the VPN configuration.
     */
    export function createConfig(

      name: string,
    ): Promise<string>;

    /**
     * Creates a new VPN configuration that persists across multiple login sessions of the user.
     *
     * @param name The name of the VPN configuration.
     * @param callback Called when the configuration is created or if there is an error.
     */
    export function createConfig(

      name: string,

      /**
       * @param id A unique ID for the created configuration, or `undefined` on failure.
       */
      callback?: (
        id: string,
      ) => void,
    ): void;

    /**
     * Destroys a VPN configuration created by the extension.
     *
     * @chrome-returns-extra since Chrome 96
     * @param id ID of the VPN configuration to destroy.
     */
    export function destroyConfig(

      id: string,
    ): Promise<void>;

    /**
     * Destroys a VPN configuration created by the extension.
     *
     * @param id ID of the VPN configuration to destroy.
     * @param callback Called when the configuration is destroyed or if there is an error.
     */
    export function destroyConfig(

      id: string,

      callback?: () => void,
    ): void;

    /**
     * Sets the parameters for the VPN session. This should be called immediately after `"connected"` is received from the platform. This will succeed only when the VPN session is owned by the extension.
     *
     * @chrome-returns-extra since Chrome 96
     * @param parameters The parameters for the VPN session.
     */
    export function setParameters(

      parameters: Parameters,
    ): Promise<void>;

    /**
     * Sets the parameters for the VPN session. This should be called immediately after `"connected"` is received from the platform. This will succeed only when the VPN session is owned by the extension.
     *
     * @param parameters The parameters for the VPN session.
     * @param callback Called when the parameters are set or if there is an error.
     */
    export function setParameters(

      parameters: Parameters,

      callback?: () => void,
    ): void;

    /**
     * Sends an IP packet through the tunnel created for the VPN session. This will succeed only when the VPN session is owned by the extension.
     *
     * @chrome-returns-extra since Chrome 96
     * @param data The IP packet to be sent to the platform.
     */
    export function sendPacket(

      data: ArrayBuffer,
    ): Promise<void>;

    /**
     * Sends an IP packet through the tunnel created for the VPN session. This will succeed only when the VPN session is owned by the extension.
     *
     * @param data The IP packet to be sent to the platform.
     * @param callback Called when the packet is sent or if there is an error.
     */
    export function sendPacket(

      data: ArrayBuffer,

      callback?: () => void,
    ): void;

    /**
     * Notifies the VPN session state to the platform. This will succeed only when the VPN session is owned by the extension.
     *
     * @chrome-returns-extra since Chrome 96
     * @param state The VPN session state of the VPN client.
     */
    export function notifyConnectionStateChanged(

      state: VpnConnectionState,
    ): Promise<void>;

    /**
     * Notifies the VPN session state to the platform. This will succeed only when the VPN session is owned by the extension.
     *
     * @param state The VPN session state of the VPN client.
     * @param callback Called when the notification is complete or if there is an error.
     */
    export function notifyConnectionStateChanged(

      state: VpnConnectionState,

      callback?: () => void,
    ): void;
  }

  /**
   * Use the `chrome.wallpaper` API to change the ChromeOS wallpaper.
   *
   * @since Chrome 43
   * @chrome-permission wallpaper
   * @chrome-platform chromeos
   * @chrome-platform lacros
   */
  export namespace wallpaper {

    /**
     * The supported wallpaper layouts.
     *
     * @since Chrome 44
     */
    export type WallpaperLayout = "STRETCH" | "CENTER" | "CENTER_CROPPED";

    /**
     * Sets wallpaper to the image at _url_ or _wallpaperData_ with the specified _layout_
     *
     * @chrome-returns-extra since Chrome 96
     */
    export function setWallpaper(

      details: {

        /**
         * The jpeg or png encoded wallpaper image as an ArrayBuffer.
         */
        data?: ArrayBuffer,

        /**
         * The URL of the wallpaper to be set (can be relative).
         */
        url?: string,

        /**
         * The supported wallpaper layouts.
         */
        layout: WallpaperLayout,

        /**
         * The file name of the saved wallpaper.
         */
        filename: string,

        /**
         * True if a 128x60 thumbnail should be generated. Layout and ratio are not supported yet.
         */
        thumbnail?: boolean,
      },
    ): Promise<ArrayBuffer | undefined>;

    /**
     * Sets wallpaper to the image at _url_ or _wallpaperData_ with the specified _layout_
     */
    export function setWallpaper(

      details: {

        /**
         * The jpeg or png encoded wallpaper image as an ArrayBuffer.
         */
        data?: ArrayBuffer,

        /**
         * The URL of the wallpaper to be set (can be relative).
         */
        url?: string,

        /**
         * The supported wallpaper layouts.
         */
        layout: WallpaperLayout,

        /**
         * The file name of the saved wallpaper.
         */
        filename: string,

        /**
         * True if a 128x60 thumbnail should be generated. Layout and ratio are not supported yet.
         */
        thumbnail?: boolean,
      },

      /**
       * @param thumbnail The jpeg encoded wallpaper thumbnail. It is generated by resizing the wallpaper to 128x60.
       */
      callback?: (
        thumbnail?: ArrayBuffer,
      ) => void,
    ): void;
  }

  /**
   * Stub namespace for the "web\_accessible\_resources" manifest key.
   *
   * @since Chrome 90
   */
  export namespace webAccessibleResources {

    export interface WebAccessibleResource {

      /**
       * Relative paths within the extension package representing web accessible resources.
       */
      resources: string[];

      /**
       * List of [match patterns](https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns) to which "resources" are accessible. These patterns should have an effective path of "\*". Each match will be checked against the initiating origin.
       */
      matches?: string[];

      /**
       * List of extension IDs the "resources" are accessible to. A wildcard can be used, denoted by "\*".
       */
      extension_ids?: string[];

      /**
       * If true, the web accessible resources will only be accessible through a dynamic ID. This is an identifier that uniquely identifies the extension and is generated each session. The corresponding dynamic extension URL is available through {@link runtime.getURL}.
       */
      use_dynamic_url?: boolean;
    }
  }

  /**
   * The `chrome.webAuthenticationProxy` API lets remote desktop software running on a remote host intercept Web Authentication API (WebAuthn) requests in order to handle them on a local client.
   *
   * @since Chrome 115
   * @chrome-permission webAuthenticationProxy
   * @chrome-min-manifest MV3
   * @chrome-platform win
   * @chrome-platform linux
   * @chrome-platform mac
   */
  export namespace webAuthenticationProxy {

    export interface IsUvpaaRequest {

      /**
       * An opaque identifier for the request.
       */
      requestId: number;
    }

    export interface CreateRequest {

      /**
       * An opaque identifier for the request.
       */
      requestId: number;

      /**
       * The `PublicKeyCredentialCreationOptions` passed to `navigator.credentials.create()`, serialized as a JSON string. The serialization format is compatible with [`PublicKeyCredential.parseCreationOptionsFromJSON()`](https://w3c.github.io/webauthn/#sctn-parseCreationOptionsFromJSON).
       */
      requestDetailsJson: string;
    }

    export interface GetRequest {

      /**
       * An opaque identifier for the request.
       */
      requestId: number;

      /**
       * The `PublicKeyCredentialRequestOptions` passed to `navigator.credentials.get()`, serialized as a JSON string. The serialization format is compatible with [`PublicKeyCredential.parseRequestOptionsFromJSON()`](https://w3c.github.io/webauthn/#sctn-parseRequestOptionsFromJSON).
       */
      requestDetailsJson: string;
    }

    export interface DOMExceptionDetails {

      name: string;

      message: string;
    }

    export interface CreateResponseDetails {

      /**
       * The `requestId` of the `CreateRequest`.
       */
      requestId: number;

      /**
       * The `DOMException` yielded by the remote request, if any.
       */
      error?: DOMExceptionDetails;

      /**
       * The `PublicKeyCredential`, yielded by the remote request, if any, serialized as a JSON string by calling href="https://w3c.github.io/webauthn/#dom-publickeycredential-tojson"> `PublicKeyCredential.toJSON()`.
       */
      responseJson?: string;
    }

    export interface GetResponseDetails {

      /**
       * The `requestId` of the `CreateRequest`.
       */
      requestId: number;

      /**
       * The `DOMException` yielded by the remote request, if any.
       */
      error?: DOMExceptionDetails;

      /**
       * The `PublicKeyCredential`, yielded by the remote request, if any, serialized as a JSON string by calling href="https://w3c.github.io/webauthn/#dom-publickeycredential-tojson"> `PublicKeyCredential.toJSON()`.
       */
      responseJson?: string;
    }

    export interface IsUvpaaResponseDetails {

      requestId: number;

      isUvpaa: boolean;
    }

    /**
     * A native application associated with this extension can cause this event to be fired by writing to a file with a name equal to the extension's ID in a directory named `WebAuthenticationProxyRemoteSessionStateChange` inside the [default user data directory](https://chromium.googlesource.com/chromium/src/+/main/docs/user_data_dir.md#default-location)
     *
     * The contents of the file should be empty. I.e., it is not necessary to change the contents of the file in order to trigger this event.
     *
     * The native host application may use this event mechanism to signal a possible remote session state change (i.e. from detached to attached, or vice versa) while the extension service worker is possibly suspended. In the handler for this event, the extension can call the `attach()` or `detach()` API methods accordingly.
     *
     * The event listener must be registered synchronously at load time.
     */
    export const onRemoteSessionStateChange: events.Event<() => void>;

    /**
     * Fires when a WebAuthn `navigator.credentials.create()` call occurs. The extension must supply a response by calling `completeCreateRequest()` with the `requestId` from `requestInfo`.
     */
    export const onCreateRequest: events.Event<(
      requestInfo: CreateRequest,
    ) => void>;

    /**
     * Fires when a WebAuthn navigator.credentials.get() call occurs. The extension must supply a response by calling `completeGetRequest()` with the `requestId` from `requestInfo`
     */
    export const onGetRequest: events.Event<(
      requestInfo: GetRequest,
    ) => void>;

    /**
     * Fires when a `PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()` call occurs. The extension must supply a response by calling `completeIsUvpaaRequest()` with the `requestId` from `requestInfo`
     */
    export const onIsUvpaaRequest: events.Event<(
      requestInfo: IsUvpaaRequest,
    ) => void>;

    /**
     * Fires when a `onCreateRequest` or `onGetRequest` event is canceled (because the WebAuthn request was aborted by the caller, or because it timed out). When receiving this event, the extension should cancel processing of the corresponding request on the client side. Extensions cannot complete a request once it has been canceled.
     */
    export const onRequestCanceled: events.Event<(
      requestId: number,
    ) => void>;

    /**
     * Reports the result of a `navigator.credentials.create()` call. The extension must call this for every `onCreateRequest` event it has received, unless the request was canceled (in which case, an `onRequestCanceled` event is fired).
     */
    export function completeCreateRequest(

      details: CreateResponseDetails,
    ): Promise<void>;

    /**
     * Reports the result of a `navigator.credentials.create()` call. The extension must call this for every `onCreateRequest` event it has received, unless the request was canceled (in which case, an `onRequestCanceled` event is fired).
     */
    export function completeCreateRequest(

      details: CreateResponseDetails,

      callback?: () => void,
    ): void;

    /**
     * Reports the result of a `navigator.credentials.get()` call. The extension must call this for every `onGetRequest` event it has received, unless the request was canceled (in which case, an `onRequestCanceled` event is fired).
     */
    export function completeGetRequest(

      details: GetResponseDetails,
    ): Promise<void>;

    /**
     * Reports the result of a `navigator.credentials.get()` call. The extension must call this for every `onGetRequest` event it has received, unless the request was canceled (in which case, an `onRequestCanceled` event is fired).
     */
    export function completeGetRequest(

      details: GetResponseDetails,

      callback?: () => void,
    ): void;

    /**
     * Reports the result of a `PublicKeyCredential.isUserVerifyingPlatformAuthenticator()` call. The extension must call this for every `onIsUvpaaRequest` event it has received.
     */
    export function completeIsUvpaaRequest(

      details: IsUvpaaResponseDetails,
    ): Promise<void>;

    /**
     * Reports the result of a `PublicKeyCredential.isUserVerifyingPlatformAuthenticator()` call. The extension must call this for every `onIsUvpaaRequest` event it has received.
     */
    export function completeIsUvpaaRequest(

      details: IsUvpaaResponseDetails,

      callback?: () => void,
    ): void;

    /**
     * Makes this extension the active Web Authentication API request proxy.
     *
     * Remote desktop extensions typically call this method after detecting attachment of a remote session to this host. Once this method returns without error, regular processing of WebAuthn requests is suspended, and events from this extension API are raised.
     *
     * This method fails with an error if a different extension is already attached.
     *
     * The attached extension must call `detach()` once the remote desktop session has ended in order to resume regular WebAuthn request processing. Extensions automatically become detached if they are unloaded.
     *
     * Refer to the `onRemoteSessionStateChange` event for signaling a change of remote session attachment from a native application to to the (possibly suspended) extension.
     */
    export function attach(): Promise<string | undefined>;

    /**
     * Makes this extension the active Web Authentication API request proxy.
     *
     * Remote desktop extensions typically call this method after detecting attachment of a remote session to this host. Once this method returns without error, regular processing of WebAuthn requests is suspended, and events from this extension API are raised.
     *
     * This method fails with an error if a different extension is already attached.
     *
     * The attached extension must call `detach()` once the remote desktop session has ended in order to resume regular WebAuthn request processing. Extensions automatically become detached if they are unloaded.
     *
     * Refer to the `onRemoteSessionStateChange` event for signaling a change of remote session attachment from a native application to to the (possibly suspended) extension.
     */
    export function attach(

      callback?: (
        error?: string,
      ) => void,
    ): void;

    /**
     * Removes this extension from being the active Web Authentication API request proxy.
     *
     * This method is typically called when the extension detects that a remote desktop session was terminated. Once this method returns, the extension ceases to be the active Web Authentication API request proxy.
     *
     * Refer to the `onRemoteSessionStateChange` event for signaling a change of remote session attachment from a native application to to the (possibly suspended) extension.
     */
    export function detach(): Promise<string | undefined>;

    /**
     * Removes this extension from being the active Web Authentication API request proxy.
     *
     * This method is typically called when the extension detects that a remote desktop session was terminated. Once this method returns, the extension ceases to be the active Web Authentication API request proxy.
     *
     * Refer to the `onRemoteSessionStateChange` event for signaling a change of remote session attachment from a native application to to the (possibly suspended) extension.
     */
    export function detach(

      callback?: (
        error?: string,
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.webNavigation` API to receive notifications about the status of navigation requests in-flight.
   *
   * @chrome-permission webNavigation
   */
  export namespace webNavigation {

    /**
     * Cause of the navigation. The same transition types as defined in the history API are used. These are the same transition types as defined in the [history API](https://developer.chrome.com/docs/extensions/reference/history/#transition_types) except with `"start_page"` in place of `"auto_toplevel"` (for backwards compatibility).
     *
     * @since Chrome 44
     */
    export type TransitionType = "link" | "typed" | "auto_bookmark" | "auto_subframe" | "manual_subframe" | "generated" | "start_page" | "form_submit" | "reload" | "keyword" | "keyword_generated";

    /**
     * @since Chrome 44
     */
    export type TransitionQualifier = "client_redirect" | "server_redirect" | "forward_back" | "from_address_bar";

    /**
     * Fired when a navigation is about to occur.
     */
    export const onBeforeNavigate: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the tab in which the navigation is about to occur.
           */
          tabId: number,

          url: string,

          /**
           * The value of -1.
           *
           * @deprecated The processId is no longer set for this event, since the process which will render the resulting document is not known until onCommit.
           * @chrome-deprecated-since Chrome 50
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique for a given tab and process.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or `-1` if this is the main frame.
           */
          parentFrameId: number,

          /**
           * The time when the browser was about to start the navigation, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * A UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the navigation occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,
        },
      ) => void,
      filters?: {

        /**
         * Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event.
         */
        url: events.UrlFilter[],
      },
    ) => void>;

    /**
     * Fired when a navigation is committed. The document (and the resources it refers to, such as images and subframes) might still be downloading, but at least part of the document has been received from the server and the browser has decided to switch to the new document.
     */
    export const onCommitted: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the tab in which the navigation occurs.
           */
          tabId: number,

          url: string,

          /**
           * The ID of the process that runs the renderer for this frame.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or `-1` if this is the main frame.
           *
           * @since Chrome 74
           */
          parentFrameId: number,

          /**
           * Cause of the navigation.
           */
          transitionType: TransitionType,

          /**
           * A list of transition qualifiers.
           */
          transitionQualifiers: TransitionQualifier[],

          /**
           * The time when the navigation was committed, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * A UUID of the document loaded.
           *
           * @since Chrome 106
           */
          documentId: string,

          /**
           * A UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the navigation occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,
        },
      ) => void,
      filters?: {

        /**
         * Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event.
         */
        url: events.UrlFilter[],
      },
    ) => void>;

    /**
     * Fired when the page's DOM is fully constructed, but the referenced resources may not finish loading.
     */
    export const onDOMContentLoaded: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the tab in which the navigation occurs.
           */
          tabId: number,

          url: string,

          /**
           * The ID of the process that runs the renderer for this frame.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or `-1` if this is the main frame.
           *
           * @since Chrome 74
           */
          parentFrameId: number,

          /**
           * The time when the page's DOM was fully constructed, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * A UUID of the document loaded.
           *
           * @since Chrome 106
           */
          documentId: string,

          /**
           * A UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the navigation occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,
        },
      ) => void,
      filters?: {

        /**
         * Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event.
         */
        url: events.UrlFilter[],
      },
    ) => void>;

    /**
     * Fired when a document, including the resources it refers to, is completely loaded and initialized.
     */
    export const onCompleted: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the tab in which the navigation occurs.
           */
          tabId: number,

          url: string,

          /**
           * The ID of the process that runs the renderer for this frame.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or `-1` if this is the main frame.
           *
           * @since Chrome 74
           */
          parentFrameId: number,

          /**
           * The time when the document finished loading, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * A UUID of the document loaded.
           *
           * @since Chrome 106
           */
          documentId: string,

          /**
           * A UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the navigation occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,
        },
      ) => void,
      filters?: {

        /**
         * Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event.
         */
        url: events.UrlFilter[],
      },
    ) => void>;

    /**
     * Fired when an error occurs and the navigation is aborted. This can happen if either a network error occurred, or the user aborted the navigation.
     */
    export const onErrorOccurred: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the tab in which the navigation occurs.
           */
          tabId: number,

          url: string,

          /**
           * The value of -1.
           *
           * @deprecated The processId is no longer set for this event.
           * @chrome-deprecated-since Chrome 50
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or `-1` if this is the main frame.
           *
           * @since Chrome 74
           */
          parentFrameId: number,

          /**
           * The error description.
           */
          error: string,

          /**
           * The time when the error occurred, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * A UUID of the document loaded.
           *
           * @since Chrome 106
           */
          documentId: string,

          /**
           * A UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the navigation occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,
        },
      ) => void,
      filters?: {

        /**
         * Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event.
         */
        url: events.UrlFilter[],
      },
    ) => void>;

    /**
     * Fired when a new window, or a new tab in an existing window, is created to host a navigation.
     */
    export const onCreatedNavigationTarget: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the tab in which the navigation is triggered.
           */
          sourceTabId: number,

          /**
           * The ID of the process that runs the renderer for the source frame.
           */
          sourceProcessId: number,

          /**
           * The ID of the frame with sourceTabId in which the navigation is triggered. 0 indicates the main frame.
           */
          sourceFrameId: number,

          /**
           * The URL to be opened in the new window.
           */
          url: string,

          /**
           * The ID of the tab in which the url is opened
           */
          tabId: number,

          /**
           * The time when the browser was about to create a new view, in milliseconds since the epoch.
           */
          timeStamp: number,
        },
      ) => void,
      filters?: {

        /**
         * Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event.
         */
        url: events.UrlFilter[],
      },
    ) => void>;

    /**
     * Fired when the reference fragment of a frame was updated. All future events for that frame will use the updated URL.
     */
    export const onReferenceFragmentUpdated: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the tab in which the navigation occurs.
           */
          tabId: number,

          url: string,

          /**
           * The ID of the process that runs the renderer for this frame.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or `-1` if this is the main frame.
           *
           * @since Chrome 74
           */
          parentFrameId: number,

          /**
           * Cause of the navigation.
           */
          transitionType: TransitionType,

          /**
           * A list of transition qualifiers.
           */
          transitionQualifiers: TransitionQualifier[],

          /**
           * The time when the navigation was committed, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * A UUID of the document loaded.
           *
           * @since Chrome 106
           */
          documentId: string,

          /**
           * A UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the navigation occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,
        },
      ) => void,
      filters?: {

        /**
         * Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event.
         */
        url: events.UrlFilter[],
      },
    ) => void>;

    /**
     * Fired when the contents of the tab is replaced by a different (usually previously pre-rendered) tab.
     */
    export const onTabReplaced: events.Event<(
      details: {

        /**
         * The ID of the tab that was replaced.
         */
        replacedTabId: number,

        /**
         * The ID of the tab that replaced the old tab.
         */
        tabId: number,

        /**
         * The time when the replacement happened, in milliseconds since the epoch.
         */
        timeStamp: number,
      },
    ) => void>;

    /**
     * Fired when the frame's history was updated to a new URL. All future events for that frame will use the updated URL.
     */
    export const onHistoryStateUpdated: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the tab in which the navigation occurs.
           */
          tabId: number,

          url: string,

          /**
           * The ID of the process that runs the renderer for this frame.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or `-1` if this is the main frame.
           *
           * @since Chrome 74
           */
          parentFrameId: number,

          /**
           * Cause of the navigation.
           */
          transitionType: TransitionType,

          /**
           * A list of transition qualifiers.
           */
          transitionQualifiers: TransitionQualifier[],

          /**
           * The time when the navigation was committed, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * A UUID of the document loaded.
           *
           * @since Chrome 106
           */
          documentId: string,

          /**
           * A UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the navigation occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,
        },
      ) => void,
      filters?: {

        /**
         * Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event.
         */
        url: events.UrlFilter[],
      },
    ) => void>;

    /**
     * Retrieves information about the given frame. A frame refers to an <iframe> or a <frame> of a web page and is identified by a tab ID and a frame ID.
     *
     * @chrome-returns-extra since Chrome 93
     * @param details Information about the frame to retrieve information about.
     */
    export function getFrame(

      details: {

        /**
         * The ID of the tab in which the frame is.
         */
        tabId?: number,

        /**
         * The ID of the process that runs the renderer for this tab.
         *
         * @deprecated Frames are now uniquely identified by their tab ID and frame ID; the process ID is no longer needed and therefore ignored.
         * @chrome-deprecated-since Chrome 49
         */
        processId?: number,

        /**
         * The ID of the frame in the given tab.
         */
        frameId?: number,

        /**
         * The UUID of the document. If the frameId and/or tabId are provided they will be validated to match the document found by provided document ID.
         *
         * @since Chrome 106
         */
        documentId?: string,
      },
    ): Promise<{

      /**
       * True if the last navigation in this frame was interrupted by an error, i.e. the onErrorOccurred event fired.
       */
      errorOccurred: boolean,

      /**
       * The URL currently associated with this frame, if the frame identified by the frameId existed at one point in the given tab. The fact that an URL is associated with a given frameId does not imply that the corresponding frame still exists.
       */
      url: string,

      /**
       * The ID of the parent frame, or `-1` if this is the main frame.
       */
      parentFrameId: number,

      /**
       * A UUID of the document loaded.
       *
       * @since Chrome 106
       */
      documentId: string,

      /**
       * A UUID of the parent document owning this frame. This is not set if there is no parent.
       *
       * @since Chrome 106
       */
      parentDocumentId?: string,

      /**
       * The lifecycle the document is in.
       *
       * @since Chrome 106
       */
      documentLifecycle: extensionTypes.DocumentLifecycle,

      /**
       * The type of frame the navigation occurred in.
       *
       * @since Chrome 106
       */
      frameType: extensionTypes.FrameType,
    } | undefined>;

    /**
     * Retrieves information about the given frame. A frame refers to an <iframe> or a <frame> of a web page and is identified by a tab ID and a frame ID.
     *
     * @param details Information about the frame to retrieve information about.
     */
    export function getFrame(

      details: {

        /**
         * The ID of the tab in which the frame is.
         */
        tabId?: number,

        /**
         * The ID of the process that runs the renderer for this tab.
         *
         * @deprecated Frames are now uniquely identified by their tab ID and frame ID; the process ID is no longer needed and therefore ignored.
         * @chrome-deprecated-since Chrome 49
         */
        processId?: number,

        /**
         * The ID of the frame in the given tab.
         */
        frameId?: number,

        /**
         * The UUID of the document. If the frameId and/or tabId are provided they will be validated to match the document found by provided document ID.
         *
         * @since Chrome 106
         */
        documentId?: string,
      },

      /**
       * @param details Information about the requested frame, null if the specified frame ID and/or tab ID are invalid.
       */
      callback?: (
        details?: {

          /**
           * True if the last navigation in this frame was interrupted by an error, i.e. the onErrorOccurred event fired.
           */
          errorOccurred: boolean,

          /**
           * The URL currently associated with this frame, if the frame identified by the frameId existed at one point in the given tab. The fact that an URL is associated with a given frameId does not imply that the corresponding frame still exists.
           */
          url: string,

          /**
           * The ID of the parent frame, or `-1` if this is the main frame.
           */
          parentFrameId: number,

          /**
           * A UUID of the document loaded.
           *
           * @since Chrome 106
           */
          documentId: string,

          /**
           * A UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the navigation occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,
        },
      ) => void,
    ): void;

    /**
     * Retrieves information about all frames of a given tab.
     *
     * @chrome-returns-extra since Chrome 93
     * @param details Information about the tab to retrieve all frames from.
     */
    export function getAllFrames(

      details: {

        /**
         * The ID of the tab.
         */
        tabId: number,
      },
    ): Promise<{

      /**
       * True if the last navigation in this frame was interrupted by an error, i.e. the onErrorOccurred event fired.
       */
      errorOccurred: boolean,

      /**
       * The ID of the process that runs the renderer for this frame.
       */
      processId: number,

      /**
       * The ID of the frame. 0 indicates that this is the main frame; a positive value indicates the ID of a subframe.
       */
      frameId: number,

      /**
       * The ID of the parent frame, or `-1` if this is the main frame.
       */
      parentFrameId: number,

      /**
       * The URL currently associated with this frame.
       */
      url: string,

      /**
       * A UUID of the document loaded.
       *
       * @since Chrome 106
       */
      documentId: string,

      /**
       * A UUID of the parent document owning this frame. This is not set if there is no parent.
       *
       * @since Chrome 106
       */
      parentDocumentId?: string,

      /**
       * The lifecycle the document is in.
       *
       * @since Chrome 106
       */
      documentLifecycle: extensionTypes.DocumentLifecycle,

      /**
       * The type of frame the navigation occurred in.
       *
       * @since Chrome 106
       */
      frameType: extensionTypes.FrameType,
    }[] | undefined>;

    /**
     * Retrieves information about all frames of a given tab.
     *
     * @param details Information about the tab to retrieve all frames from.
     */
    export function getAllFrames(

      details: {

        /**
         * The ID of the tab.
         */
        tabId: number,
      },

      /**
       * @param details A list of frames in the given tab, null if the specified tab ID is invalid.
       */
      callback?: (
        details?: {

          /**
           * True if the last navigation in this frame was interrupted by an error, i.e. the onErrorOccurred event fired.
           */
          errorOccurred: boolean,

          /**
           * The ID of the process that runs the renderer for this frame.
           */
          processId: number,

          /**
           * The ID of the frame. 0 indicates that this is the main frame; a positive value indicates the ID of a subframe.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or `-1` if this is the main frame.
           */
          parentFrameId: number,

          /**
           * The URL currently associated with this frame.
           */
          url: string,

          /**
           * A UUID of the document loaded.
           *
           * @since Chrome 106
           */
          documentId: string,

          /**
           * A UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the navigation occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,
        }[],
      ) => void,
    ): void;
  }

  /**
   * Use the `chrome.webRequest` API to observe and analyze traffic and to intercept, block, or modify requests in-flight.
   *
   * @chrome-permission webRequest
   */
  export namespace webRequest {

    /**
     * @chrome-enum "main\_frame" Specifies the resource as the main frame.
     * @chrome-enum "sub\_frame" Specifies the resource as a sub frame.
     * @chrome-enum "stylesheet" Specifies the resource as a stylesheet.
     * @chrome-enum "script" Specifies the resource as a script.
     * @chrome-enum "image" Specifies the resource as an image.
     * @chrome-enum "font" Specifies the resource as a font.
     * @chrome-enum "object" Specifies the resource as an object.
     * @chrome-enum "xmlhttprequest" Specifies the resource as an XMLHttpRequest.
     * @chrome-enum "ping" Specifies the resource as a ping.
     * @chrome-enum "csp\_report" Specifies the resource as a Content Security Policy (CSP) report.
     * @chrome-enum "media" Specifies the resource as a media object.
     * @chrome-enum "websocket" Specifies the resource as a WebSocket.
     * @chrome-enum "webbundle" Specifies the resource as a WebBundle.
     * @chrome-enum "other" Specifies the resource as a type not included in the listed types.
     * @since Chrome 44
     */
    export type ResourceType = "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "font" | "object" | "xmlhttprequest" | "ping" | "csp_report" | "media" | "websocket" | "webbundle" | "other";

    /**
     * @chrome-enum "blocking" Specifies the request is blocked until the callback function returns.
     * @chrome-enum "requestBody" Specifies that the request body should be included in the event.
     * @chrome-enum "extraHeaders" Specifies that headers can violate Cross-Origin Resource Sharing (CORS).
     * @since Chrome 44
     */
    export type OnBeforeRequestOptions = "blocking" | "requestBody" | "extraHeaders";

    /**
     * @chrome-enum "requestHeaders" Specifies that the request header should be included in the event.
     * @chrome-enum "blocking" Specifies the request is blocked until the callback function returns.
     * @chrome-enum "extraHeaders" Specifies that headers can violate Cross-Origin Resource Sharing (CORS).
     * @since Chrome 44
     */
    export type OnBeforeSendHeadersOptions = "requestHeaders" | "blocking" | "extraHeaders";

    /**
     * @chrome-enum "requestHeaders" Specifies that the request header should be included in the event.
     * @chrome-enum "extraHeaders" Specifies that headers can violate Cross-Origin Resource Sharing (CORS).
     * @since Chrome 44
     */
    export type OnSendHeadersOptions = "requestHeaders" | "extraHeaders";

    /**
     * @chrome-enum "blocking" Specifies the request is blocked until the callback function returns.
     * @chrome-enum "responseHeaders" Specifies that the response headers should be included in the event.
     * @chrome-enum "extraHeaders" Specifies that headers can violate Cross-Origin Resource Sharing (CORS).
     * @since Chrome 44
     */
    export type OnHeadersReceivedOptions = "blocking" | "responseHeaders" | "extraHeaders";

    /**
     * @chrome-enum "responseHeaders" Specifies that the response headers should be included in the event.
     * @chrome-enum "blocking" Specifies the request is blocked until the callback function returns.
     * @chrome-enum "asyncBlocking" Specifies that the callback function is handled asynchronously.
     * @chrome-enum "extraHeaders" Specifies that headers can violate Cross-Origin Resource Sharing (CORS).
     * @since Chrome 44
     */
    export type OnAuthRequiredOptions = "responseHeaders" | "blocking" | "asyncBlocking" | "extraHeaders";

    /**
     * @chrome-enum "responseHeaders" Specifies that the response headers should be included in the event.
     * @chrome-enum "extraHeaders" Specifies that headers can violate Cross-Origin Resource Sharing (CORS).
     * @since Chrome 44
     */
    export type OnResponseStartedOptions = "responseHeaders" | "extraHeaders";

    /**
     * @chrome-enum "responseHeaders" Specifies that the response headers should be included in the event.
     * @chrome-enum "extraHeaders" Specifies that headers can violate Cross-Origin Resource Sharing (CORS).
     * @since Chrome 44
     */
    export type OnBeforeRedirectOptions = "responseHeaders" | "extraHeaders";

    /**
     * @chrome-enum "responseHeaders" Specifies that the response headers should be included in the event.
     * @chrome-enum "extraHeaders" Specifies that headers can violate Cross-Origin Resource Sharing (CORS).
     * @since Chrome 44
     */
    export type OnCompletedOptions = "responseHeaders" | "extraHeaders";

    /**
     * @chrome-enum "extraHeaders" Specifies that headers can violate Cross-Origin Resource Sharing (CORS).
     * @since Chrome 79
     */
    export type OnErrorOccurredOptions = "extraHeaders";

    /**
     * An object describing filters to apply to webRequest events.
     */
    export interface RequestFilter {

      /**
       * A list of URLs or URL patterns. Requests that cannot match any of the URLs will be filtered out.
       */
      urls: string[];

      /**
       * A list of request types. Requests that cannot match any of the types will be filtered out.
       */
      types?: ResourceType[];

      tabId?: number;

      windowId?: number;
    }

    /**
     * An array of HTTP headers. Each header is represented as a dictionary containing the keys `name` and either `value` or `binaryValue`.
     */
    export type HttpHeaders = {

      /**
       * Name of the HTTP header.
       */
      name: string,

      /**
       * Value of the HTTP header if it can be represented by UTF-8.
       */
      value?: string,

      /**
       * Value of the HTTP header if it cannot be represented by UTF-8, stored as individual byte values (0..255).
       */
      binaryValue?: number[],
    }[];

    /**
     * Returns value for event handlers that have the 'blocking' extraInfoSpec applied. Allows the event handler to modify network requests.
     */
    export interface BlockingResponse {

      /**
       * If true, the request is cancelled. This prevents the request from being sent. This can be used as a response to the onBeforeRequest, onBeforeSendHeaders, onHeadersReceived and onAuthRequired events.
       */
      cancel?: boolean;

      /**
       * Only used as a response to the onBeforeRequest and onHeadersReceived events. If set, the original request is prevented from being sent/completed and is instead redirected to the given URL. Redirections to non-HTTP schemes such as `data:` are allowed. Redirects initiated by a redirect action use the original request method for the redirect, with one exception: If the redirect is initiated at the onHeadersReceived stage, then the redirect will be issued using the GET method. Redirects from URLs with `ws://` and `wss://` schemes are **ignored**.
       */
      redirectUrl?: string;

      /**
       * Only used as a response to the onBeforeSendHeaders event. If set, the request is made with these request headers instead.
       */
      requestHeaders?: HttpHeaders;

      /**
       * Only used as a response to the onHeadersReceived event. If set, the server is assumed to have responded with these response headers instead. Only return `responseHeaders` if you really want to modify the headers in order to limit the number of conflicts (only one extension may modify `responseHeaders` for each request).
       */
      responseHeaders?: HttpHeaders;

      /**
       * Only used as a response to the onAuthRequired event. If set, the request is made using the supplied credentials.
       */
      authCredentials?: {

        username: string,

        password: string,
      };
    }

    /**
     * Contains data uploaded in a URL request.
     */
    export interface UploadData {

      /**
       * An ArrayBuffer with a copy of the data.
       */
      bytes?: any;

      /**
       * A string with the file's path and name.
       */
      file?: string;
    }

    /**
     * Contains data passed within form data. For urlencoded form it is stored as string if data is utf-8 string and as ArrayBuffer otherwise. For form-data it is ArrayBuffer. If form-data represents uploading file, it is string with filename, if the filename is provided.
     *
     * @since Chrome 66
     */
    export type FormDataItem = ArrayBuffer | string;

    /**
     * @since Chrome 70
     */
    export type IgnoredActionType = "redirect" | "request_headers" | "response_headers" | "auth_credentials";

    /**
     * The maximum number of times that `handlerBehaviorChanged` can be called per 10 minute sustained interval. `handlerBehaviorChanged` is an expensive function call that shouldn't be called often.
     */
    export const MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES: 20;

    /**
     * Fired when a request is about to occur.
     */
    export const onBeforeRequest: CustomChromeEvent<(
      /**
       * @returns If "blocking" is specified in the "extraInfoSpec" parameter, the event listener should return an object of this type.
       */
      callback: (
        details: {

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
           */
          requestId: string,

          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
           */
          parentFrameId: number,

          /**
           * The UUID of the document making the request.
           *
           * @since Chrome 106
           */
          documentId?: string,

          /**
           * The UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle?: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the request occurred in.
           *
           * @since Chrome 106
           */
          frameType?: extensionTypes.FrameType,

          /**
           * Contains the HTTP request body data. Only provided if extraInfoSpec contains 'requestBody'.
           */
          requestBody?: {

            /**
             * Errors when obtaining request body data.
             */
            error?: string,

            /**
             * If the request method is POST and the body is a sequence of key-value pairs encoded in UTF8, encoded as either multipart/form-data, or application/x-www-form-urlencoded, this dictionary is present and for each key contains the list of all values for that key. If the data is of another media type, or if it is malformed, the dictionary is not present. An example value of this dictionary is {'key': \['value1', 'value2'\]}.
             */
            formData?: {[name: string]: FormDataItem[]},

            /**
             * If the request method is PUT or POST, and the body is not already parsed in formData, then the unparsed request body elements are contained in this array.
             */
            raw?: UploadData[],
          },

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
           *
           * @since Chrome 63
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,
        },
      ) => BlockingResponse | undefined,
      filter: RequestFilter,
      extraInfoSpec?: OnBeforeRequestOptions[],
    ) => void>;

    /**
     * Fired before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any HTTP data is sent.
     */
    export const onBeforeSendHeaders: CustomChromeEvent<(
      /**
       * @returns If "blocking" is specified in the "extraInfoSpec" parameter, the event listener should return an object of this type.
       */
      callback: (
        details: {

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
           */
          requestId: string,

          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
           */
          parentFrameId: number,

          /**
           * The UUID of the document making the request.
           *
           * @since Chrome 106
           */
          documentId: string,

          /**
           * The UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the request occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
           */
          tabId: number,

          /**
           * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
           *
           * @since Chrome 63
           */
          initiator?: string,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The HTTP request headers that are going to be sent out with this request.
           */
          requestHeaders?: HttpHeaders,
        },
      ) => BlockingResponse | undefined,
      filter: RequestFilter,
      extraInfoSpec?: OnBeforeSendHeadersOptions[],
    ) => void>;

    /**
     * Fired just before a request is going to be sent to the server (modifications of previous onBeforeSendHeaders callbacks are visible by the time onSendHeaders is fired).
     */
    export const onSendHeaders: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
           */
          requestId: string,

          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
           */
          parentFrameId: number,

          /**
           * The UUID of the document making the request.
           *
           * @since Chrome 106
           */
          documentId: string,

          /**
           * The UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the request occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
           *
           * @since Chrome 63
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The HTTP request headers that have been sent out with this request.
           */
          requestHeaders?: HttpHeaders,
        },
      ) => void,
      filter: RequestFilter,
      extraInfoSpec?: OnSendHeadersOptions[],
    ) => void>;

    /**
     * Fired when HTTP response headers of a request have been received.
     */
    export const onHeadersReceived: CustomChromeEvent<(
      /**
       * @returns If "blocking" is specified in the "extraInfoSpec" parameter, the event listener should return an object of this type.
       */
      callback: (
        details: {

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
           */
          requestId: string,

          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
           */
          parentFrameId: number,

          /**
           * The UUID of the document making the request.
           *
           * @since Chrome 106
           */
          documentId: string,

          /**
           * The UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the request occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
           *
           * @since Chrome 63
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line).
           */
          statusLine: string,

          /**
           * The HTTP response headers that have been received with this response.
           */
          responseHeaders?: HttpHeaders,

          /**
           * Standard HTTP status code returned by the server.
           *
           * @since Chrome 43
           */
          statusCode: number,
        },
      ) => BlockingResponse | undefined,
      filter: RequestFilter,
      extraInfoSpec?: OnHeadersReceivedOptions[],
    ) => void>;

    /**
     * Fired when an authentication failure is received. The listener has three options: it can provide authentication credentials, it can cancel the request and display the error page, or it can take no action on the challenge. If bad user credentials are provided, this may be called multiple times for the same request. Note, only one of `'blocking'` or `'asyncBlocking'` modes must be specified in the `extraInfoSpec` parameter.
     */
    export const onAuthRequired: CustomChromeEvent<(
      /**
       * @param asyncCallback Only valid if `'asyncBlocking'` is specified as one of the `OnAuthRequiredOptions`.
       * @returns If "blocking" is specified in the "extraInfoSpec" parameter, the event listener should return an object of this type.
       */
      callback: (
        details: {

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
           */
          requestId: string,

          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
           */
          parentFrameId: number,

          /**
           * The UUID of the document making the request.
           *
           * @since Chrome 106
           */
          documentId: string,

          /**
           * The UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the request occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
           *
           * @since Chrome 63
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The authentication scheme, e.g. Basic or Digest.
           */
          scheme: string,

          /**
           * The authentication realm provided by the server, if there is one.
           */
          realm?: string,

          /**
           * The server requesting authentication.
           */
          challenger: {

            host: string,

            port: number,
          },

          /**
           * True for Proxy-Authenticate, false for WWW-Authenticate.
           */
          isProxy: boolean,

          /**
           * The HTTP response headers that were received along with this response.
           */
          responseHeaders?: HttpHeaders,

          /**
           * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.
           */
          statusLine: string,

          /**
           * Standard HTTP status code returned by the server.
           *
           * @since Chrome 43
           */
          statusCode: number,
        },
        /**
         * @since Chrome 58
         */
        asyncCallback?: (
          response: BlockingResponse,
        ) => void,
      ) => BlockingResponse | undefined,
      filter: RequestFilter,
      extraInfoSpec?: OnAuthRequiredOptions[],
    ) => void>;

    /**
     * Fired when the first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.
     */
    export const onResponseStarted: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
           */
          requestId: string,

          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
           */
          parentFrameId: number,

          /**
           * The UUID of the document making the request.
           *
           * @since Chrome 106
           */
          documentId: string,

          /**
           * The UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the request occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
           *
           * @since Chrome 63
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address.
           */
          ip?: string,

          /**
           * Indicates if this response was fetched from disk cache.
           */
          fromCache: boolean,

          /**
           * Standard HTTP status code returned by the server.
           */
          statusCode: number,

          /**
           * The HTTP response headers that were received along with this response.
           */
          responseHeaders?: HttpHeaders,

          /**
           * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.
           */
          statusLine: string,
        },
      ) => void,
      filter: RequestFilter,
      extraInfoSpec?: OnResponseStartedOptions[],
    ) => void>;

    /**
     * Fired when a server-initiated redirect is about to occur.
     */
    export const onBeforeRedirect: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
           */
          requestId: string,

          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
           */
          parentFrameId: number,

          /**
           * The UUID of the document making the request.
           *
           * @since Chrome 106
           */
          documentId: string,

          /**
           * The UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the request occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
           *
           * @since Chrome 63
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address.
           */
          ip?: string,

          /**
           * Indicates if this response was fetched from disk cache.
           */
          fromCache: boolean,

          /**
           * Standard HTTP status code returned by the server.
           */
          statusCode: number,

          /**
           * The new URL.
           */
          redirectUrl: string,

          /**
           * The HTTP response headers that were received along with this redirect.
           */
          responseHeaders?: HttpHeaders,

          /**
           * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.
           */
          statusLine: string,
        },
      ) => void,
      filter: RequestFilter,
      extraInfoSpec?: OnBeforeRedirectOptions[],
    ) => void>;

    /**
     * Fired when a request is completed.
     */
    export const onCompleted: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
           */
          requestId: string,

          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
           */
          parentFrameId: number,

          /**
           * The UUID of the document making the request.
           *
           * @since Chrome 106
           */
          documentId: string,

          /**
           * The UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the request occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
           *
           * @since Chrome 63
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address.
           */
          ip?: string,

          /**
           * Indicates if this response was fetched from disk cache.
           */
          fromCache: boolean,

          /**
           * Standard HTTP status code returned by the server.
           */
          statusCode: number,

          /**
           * The HTTP response headers that were received along with this response.
           */
          responseHeaders?: HttpHeaders,

          /**
           * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.
           */
          statusLine: string,
        },
      ) => void,
      filter: RequestFilter,
      extraInfoSpec?: OnCompletedOptions[],
    ) => void>;

    /**
     * Fired when an error occurs.
     */
    export const onErrorOccurred: CustomChromeEvent<(
      callback: (
        details: {

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
           */
          requestId: string,

          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists.
           */
          parentFrameId: number,

          /**
           * The UUID of the document making the request. This value is not present if the request is a navigation of a frame.
           *
           * @since Chrome 106
           */
          documentId: string,

          /**
           * The UUID of the parent document owning this frame. This is not set if there is no parent.
           *
           * @since Chrome 106
           */
          parentDocumentId?: string,

          /**
           * The lifecycle the document is in.
           *
           * @since Chrome 106
           */
          documentLifecycle: extensionTypes.DocumentLifecycle,

          /**
           * The type of frame the request occurred in.
           *
           * @since Chrome 106
           */
          frameType: extensionTypes.FrameType,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
           *
           * @since Chrome 63
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address.
           */
          ip?: string,

          /**
           * Indicates if this response was fetched from disk cache.
           */
          fromCache: boolean,

          /**
           * The error description. This string is _not_ guaranteed to remain backwards compatible between releases. You must not parse and act based upon its content.
           */
          error: string,
        },
      ) => void,
      filter: RequestFilter,
      /**
       * @since Chrome 79
       */
      extraInfoSpec?: OnErrorOccurredOptions[],
    ) => void>;

    /**
     * Fired when an extension's proposed modification to a network request is ignored. This happens in case of conflicts with other extensions.
     *
     * @since Chrome 70
     */
    export const onActionIgnored: events.Event<(
      details: {

        /**
         * The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
         */
        requestId: string,

        /**
         * The proposed action which was ignored.
         */
        action: IgnoredActionType,
      },
    ) => void>;

    /**
     * Needs to be called when the behavior of the webRequest handlers has changed to prevent incorrect handling due to caching. This function call is expensive. Don't call it often.
     *
     * @chrome-returns-extra since Chrome 116
     */
    export function handlerBehaviorChanged(): Promise<void>;

    /**
     * Needs to be called when the behavior of the webRequest handlers has changed to prevent incorrect handling due to caching. This function call is expensive. Don't call it often.
     */
    export function handlerBehaviorChanged(

      callback?: () => void,
    ): void;
  }

  /**
   * Use the `chrome.windows` API to interact with browser windows. You can use this API to create, modify, and rearrange windows in the browser.
   */
  export namespace windows {

    /**
     * The type of browser window this is. In some circumstances a window may not be assigned a `type` property; for example, when querying closed windows from the {@link sessions} API.
     *
     * @chrome-enum "normal" A normal browser window.
     * @chrome-enum "popup" A browser popup.
     * @chrome-enum "panel" _Deprecated in this API._ A Chrome App panel-style window. Extensions can only see their own panel windows.
     * @chrome-enum "app" _Deprecated in this API._ A Chrome App window. Extensions can only see their app own windows.
     * @chrome-enum "devtools" A Developer Tools window.
     * @since Chrome 44
     */
    export type WindowType = "normal" | "popup" | "panel" | "app" | "devtools";

    /**
     * The state of this browser window. In some circumstances a window may not be assigned a `state` property; for example, when querying closed windows from the {@link sessions} API.
     *
     * @chrome-enum "normal" Normal window state (not minimized, maximized, or fullscreen).
     * @chrome-enum "minimized" Minimized window state.
     * @chrome-enum "maximized" Maximized window state.
     * @chrome-enum "fullscreen" Fullscreen window state.
     * @chrome-enum "locked-fullscreen" Locked fullscreen window state. This fullscreen state cannot be exited by user action and is available only to allowlisted extensions on Chrome OS.
     * @since Chrome 44
     */
    export type WindowState = "normal" | "minimized" | "maximized" | "fullscreen" | "locked-fullscreen";

    export interface Window {

      /**
       * The ID of the window. Window IDs are unique within a browser session. In some circumstances a window may not be assigned an `ID` property; for example, when querying windows using the {@link sessions} API, in which case a session ID may be present.
       */
      id?: number;

      /**
       * Whether the window is currently the focused window.
       */
      focused: boolean;

      /**
       * The offset of the window from the top edge of the screen in pixels. In some circumstances a window may not be assigned a `top` property; for example, when querying closed windows from the {@link sessions} API.
       */
      top?: number;

      /**
       * The offset of the window from the left edge of the screen in pixels. In some circumstances a window may not be assigned a `left` property; for example, when querying closed windows from the {@link sessions} API.
       */
      left?: number;

      /**
       * The width of the window, including the frame, in pixels. In some circumstances a window may not be assigned a `width` property; for example, when querying closed windows from the {@link sessions} API.
       */
      width?: number;

      /**
       * The height of the window, including the frame, in pixels. In some circumstances a window may not be assigned a `height` property; for example, when querying closed windows from the {@link sessions} API.
       */
      height?: number;

      /**
       * Array of {@link tabs.Tab} objects representing the current tabs in the window.
       */
      tabs?: tabs.Tab[];

      /**
       * Whether the window is incognito.
       */
      incognito: boolean;

      /**
       * The type of browser window this is.
       */
      type?: WindowType;

      /**
       * The state of this browser window.
       */
      state?: WindowState;

      /**
       * Whether the window is set to be always on top.
       */
      alwaysOnTop: boolean;

      /**
       * The session ID used to uniquely identify a window, obtained from the {@link sessions} API.
       */
      sessionId?: string;
    }

    /**
     * Specifies what type of browser window to create. 'panel' is deprecated and is available only to existing allowlisted extensions on Chrome OS.
     *
     * @chrome-enum "normal" Specifies the window as a standard window.
     * @chrome-enum "popup" Specifies the window as a popup window.
     * @chrome-enum "panel" Specifies the window as a panel.
     * @since Chrome 44
     */
    export type CreateType = "normal" | "popup" | "panel";

    /**
     * @since Chrome 88
     */
    export interface QueryOptions {

      /**
       * If true, the {@link windows.Window} object has a `tabs` property that contains a list of the {@link tabs.Tab} objects. The `Tab` objects only contain the `url`, `pendingUrl`, `title`, and `favIconUrl` properties if the extension's manifest file includes the `"tabs"` permission.
       */
      populate?: boolean;

      /**
       * If set, the {@link windows.Window} returned is filtered based on its type. If unset, the default filter is set to `['normal', 'popup']`.
       */
      windowTypes?: WindowType[];
    }

    /**
     * The windowId value that represents the absence of a Chrome browser window.
     */
    export const WINDOW_ID_NONE: -1;

    /**
     * The windowId value that represents the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#the_current_window).
     */
    export const WINDOW_ID_CURRENT: -2;

    /**
     * Fired when a window is created.
     */
    export const onCreated: CustomChromeEvent<(
      /**
       * @param window Details of the created window.
       * @since Chrome 46
       */
      callback: (
        window: Window,
      ) => void,
      /**
       * @since Chrome 46
       */
      filters?: {

        /**
         * Conditions that the window's type being created must satisfy. By default it satisfies `['normal', 'popup']`.
         */
        windowTypes: WindowType[],
      },
    ) => void>;

    /**
     * Fired when a window is removed (closed).
     */
    export const onRemoved: CustomChromeEvent<(
      /**
       * @param windowId ID of the removed window.
       * @since Chrome 46
       */
      callback: (
        windowId: number,
      ) => void,
      /**
       * @since Chrome 46
       */
      filters?: {

        /**
         * Conditions that the window's type being removed must satisfy. By default it satisfies `['normal', 'popup']`.
         */
        windowTypes: WindowType[],
      },
    ) => void>;

    /**
     * Fired when the currently focused window changes. Returns `chrome.windows.WINDOW_ID_NONE` if all Chrome windows have lost focus. **Note:** On some Linux window managers, `WINDOW_ID_NONE` is always sent immediately preceding a switch from one Chrome window to another.
     */
    export const onFocusChanged: CustomChromeEvent<(
      /**
       * @param windowId ID of the newly-focused window.
       * @since Chrome 46
       */
      callback: (
        windowId: number,
      ) => void,
      /**
       * @since Chrome 46
       */
      filters?: {

        /**
         * Conditions that the window's type being removed must satisfy. By default it satisfies `['normal', 'popup']`.
         */
        windowTypes: WindowType[],
      },
    ) => void>;

    /**
     * Fired when a window has been resized; this event is only dispatched when the new bounds are committed, and not for in-progress changes.
     *
     * @since Chrome 86
     */
    export const onBoundsChanged: events.Event<(
      window: Window,
    ) => void>;

    /**
     * Gets details about a window.
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function get(

      windowId: number,

      /**
       * @since Chrome 88
       */
      queryOptions?: QueryOptions,
    ): Promise<Window>;

    /**
     * Gets details about a window.
     */
    export function get(

      windowId: number,

      /**
       * @since Chrome 88
       */
      queryOptions?: QueryOptions,

      callback?: (
        window: Window,
      ) => void,
    ): void;

    /**
     * Gets the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function getCurrent(

      /**
       * @since Chrome 88
       */
      queryOptions?: QueryOptions,
    ): Promise<Window>;

    /**
     * Gets the [current window](https://developer.chrome.com/docs/extensions/reference/windows/#current-window).
     */
    export function getCurrent(

      /**
       * @since Chrome 88
       */
      queryOptions?: QueryOptions,

      callback?: (
        window: Window,
      ) => void,
    ): void;

    /**
     * Gets the window that was most recently focused — typically the window 'on top'.
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function getLastFocused(

      /**
       * @since Chrome 88
       */
      queryOptions?: QueryOptions,
    ): Promise<Window>;

    /**
     * Gets the window that was most recently focused — typically the window 'on top'.
     */
    export function getLastFocused(

      /**
       * @since Chrome 88
       */
      queryOptions?: QueryOptions,

      callback?: (
        window: Window,
      ) => void,
    ): void;

    /**
     * Gets all windows.
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function getAll(

      /**
       * @since Chrome 88
       */
      queryOptions?: QueryOptions,
    ): Promise<Window[]>;

    /**
     * Gets all windows.
     */
    export function getAll(

      /**
       * @since Chrome 88
       */
      queryOptions?: QueryOptions,

      callback?: (
        windows: Window[],
      ) => void,
    ): void;

    /**
     * Creates (opens) a new browser window with any optional sizing, position, or default URL provided.
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function create(

      createData?: {

        /**
         * A URL or array of URLs to open as tabs in the window. Fully-qualified URLs must include a scheme, e.g., 'http://www.google.com', not 'www.google.com'. Non-fully-qualified URLs are considered relative within the extension. Defaults to the New Tab Page.
         */
        url?: string | string[],

        /**
         * The ID of the tab to add to the new window.
         */
        tabId?: number,

        /**
         * The number of pixels to position the new window from the left edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels.
         */
        left?: number,

        /**
         * The number of pixels to position the new window from the top edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels.
         */
        top?: number,

        /**
         * The width in pixels of the new window, including the frame. If not specified, defaults to a natural width.
         */
        width?: number,

        /**
         * The height in pixels of the new window, including the frame. If not specified, defaults to a natural height.
         */
        height?: number,

        /**
         * If `true`, opens an active window. If `false`, opens an inactive window.
         */
        focused?: boolean,

        /**
         * Whether the new window should be an incognito window.
         */
        incognito?: boolean,

        /**
         * Specifies what type of browser window to create.
         */
        type?: CreateType,

        /**
         * The initial state of the window. The `minimized`, `maximized`, and `fullscreen` states cannot be combined with `left`, `top`, `width`, or `height`.
         *
         * @since Chrome 44
         */
        state?: WindowState,

        /**
         * If `true`, the newly-created window's 'window.opener' is set to the caller and is in the same [unit of related browsing contexts](https://www.w3.org/TR/html51/browsers.html#unit-of-related-browsing-contexts) as the caller.
         *
         * @since Chrome 64
         */
        setSelfAsOpener?: boolean,
      },
    ): Promise<Window | undefined>;

    /**
     * Creates (opens) a new browser window with any optional sizing, position, or default URL provided.
     */
    export function create(

      createData?: {

        /**
         * A URL or array of URLs to open as tabs in the window. Fully-qualified URLs must include a scheme, e.g., 'http://www.google.com', not 'www.google.com'. Non-fully-qualified URLs are considered relative within the extension. Defaults to the New Tab Page.
         */
        url?: string | string[],

        /**
         * The ID of the tab to add to the new window.
         */
        tabId?: number,

        /**
         * The number of pixels to position the new window from the left edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels.
         */
        left?: number,

        /**
         * The number of pixels to position the new window from the top edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels.
         */
        top?: number,

        /**
         * The width in pixels of the new window, including the frame. If not specified, defaults to a natural width.
         */
        width?: number,

        /**
         * The height in pixels of the new window, including the frame. If not specified, defaults to a natural height.
         */
        height?: number,

        /**
         * If `true`, opens an active window. If `false`, opens an inactive window.
         */
        focused?: boolean,

        /**
         * Whether the new window should be an incognito window.
         */
        incognito?: boolean,

        /**
         * Specifies what type of browser window to create.
         */
        type?: CreateType,

        /**
         * The initial state of the window. The `minimized`, `maximized`, and `fullscreen` states cannot be combined with `left`, `top`, `width`, or `height`.
         *
         * @since Chrome 44
         */
        state?: WindowState,

        /**
         * If `true`, the newly-created window's 'window.opener' is set to the caller and is in the same [unit of related browsing contexts](https://www.w3.org/TR/html51/browsers.html#unit-of-related-browsing-contexts) as the caller.
         *
         * @since Chrome 64
         */
        setSelfAsOpener?: boolean,
      },

      /**
       * @param window Contains details about the created window.
       */
      callback?: (
        window?: Window,
      ) => void,
    ): void;

    /**
     * Updates the properties of a window. Specify only the properties that to be changed; unspecified properties are unchanged.
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function update(

      windowId: number,

      updateInfo: {

        /**
         * The offset from the left edge of the screen to move the window to in pixels. This value is ignored for panels.
         */
        left?: number,

        /**
         * The offset from the top edge of the screen to move the window to in pixels. This value is ignored for panels.
         */
        top?: number,

        /**
         * The width to resize the window to in pixels. This value is ignored for panels.
         */
        width?: number,

        /**
         * The height to resize the window to in pixels. This value is ignored for panels.
         */
        height?: number,

        /**
         * If `true`, brings the window to the front; cannot be combined with the state 'minimized'. If `false`, brings the next window in the z-order to the front; cannot be combined with the state 'fullscreen' or 'maximized'.
         */
        focused?: boolean,

        /**
         * If `true`, causes the window to be displayed in a manner that draws the user's attention to the window, without changing the focused window. The effect lasts until the user changes focus to the window. This option has no effect if the window already has focus. Set to `false` to cancel a previous `drawAttention` request.
         */
        drawAttention?: boolean,

        /**
         * The new state of the window. The 'minimized', 'maximized', and 'fullscreen' states cannot be combined with 'left', 'top', 'width', or 'height'.
         */
        state?: WindowState,
      },
    ): Promise<Window>;

    /**
     * Updates the properties of a window. Specify only the properties that to be changed; unspecified properties are unchanged.
     */
    export function update(

      windowId: number,

      updateInfo: {

        /**
         * The offset from the left edge of the screen to move the window to in pixels. This value is ignored for panels.
         */
        left?: number,

        /**
         * The offset from the top edge of the screen to move the window to in pixels. This value is ignored for panels.
         */
        top?: number,

        /**
         * The width to resize the window to in pixels. This value is ignored for panels.
         */
        width?: number,

        /**
         * The height to resize the window to in pixels. This value is ignored for panels.
         */
        height?: number,

        /**
         * If `true`, brings the window to the front; cannot be combined with the state 'minimized'. If `false`, brings the next window in the z-order to the front; cannot be combined with the state 'fullscreen' or 'maximized'.
         */
        focused?: boolean,

        /**
         * If `true`, causes the window to be displayed in a manner that draws the user's attention to the window, without changing the focused window. The effect lasts until the user changes focus to the window. This option has no effect if the window already has focus. Set to `false` to cancel a previous `drawAttention` request.
         */
        drawAttention?: boolean,

        /**
         * The new state of the window. The 'minimized', 'maximized', and 'fullscreen' states cannot be combined with 'left', 'top', 'width', or 'height'.
         */
        state?: WindowState,
      },

      callback?: (
        window: Window,
      ) => void,
    ): void;

    /**
     * Removes (closes) a window and all the tabs inside it.
     *
     * @chrome-returns-extra since Chrome 88
     */
    export function remove(

      windowId: number,
    ): Promise<void>;

    /**
     * Removes (closes) a window and all the tabs inside it.
     */
    export function remove(

      windowId: number,

      callback?: () => void,
    ): void;
  }
}
