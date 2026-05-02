<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_screen_time_wellness_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="screen-time-wellness-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Screen Time Wellness Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_daily_hours"><?php esc_html_e('Daily Screen Time (hours)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_daily_hours" name="daily_hours" placeholder="<?php esc_attr_e('e.g. 8', 'vitalhealth-tools'); ?>" min="0" max="24">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_breaks"><?php esc_html_e('Breaks per Hour', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_breaks" name="breaks">
            <option value="<?php echo esc_attr('0'); ?>"><?php esc_html_e('None', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('1'); ?>"><?php esc_html_e('1 break', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('2'); ?>"><?php esc_html_e('2 breaks', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('3'); ?>"><?php esc_html_e('3+ breaks', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_night_use"><?php esc_html_e('Screen Use Before Bed?', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_night_use" name="night_use">
            <option value="<?php echo esc_attr('yes'); ?>"><?php esc_html_e('Yes', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('no'); ?>"><?php esc_html_e('No', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_screen_time_wellness_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
