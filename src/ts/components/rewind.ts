import {ToggleButton, ToggleButtonConfig} from './togglebutton';
import {UIInstanceManager} from '../uimanager';
import { PlayerAPI, PlayerEventBase, WarningEvent } from 'bitmovin-player';
import { i18n } from '../localization/i18n';

/**
 * A button that toggles the video view between normal/mono and VR/stereo.
 */
export class RewindButton extends ToggleButton<ToggleButtonConfig> {

  constructor(config: ToggleButtonConfig = {}) {
    super(config);

    this.config = this.mergeConfig(config, {
      cssClass: 'ui-rewind',
      text: i18n.getLocalizer('rw'),
    }, this.config);
  }

  configure(player: PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);

    this.onClick.subscribe(() => {
      if (!player.isLive()) {
        if (console) {
          console.log('No live content');
        }
      } else {
        player.timeShift(-30 + player.getTimeShift())
      }
    });
  }
}