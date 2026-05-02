<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_nap_time_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="nap-time-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Nap Time Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_goal"><?php esc_html_e('Nap Goal', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_goal" name="goal">
            <option value="<?php echo esc_attr('energy'); ?>"><?php esc_html_e('Quick Energy Boost', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('memory'); ?>"><?php esc_html_e('Memory & Focus', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('recovery'); ?>"><?php esc_html_e('Full Recovery', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('creativity'); ?>"><?php esc_html_e('Creativity Reset', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_time_available"><?php esc_html_e('Time Available (minutes)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_time_available" name="time_available" placeholder="<?php esc_attr_e('e.g. 30', 'vitalhealth-tools'); ?>" min="5" max="120">
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_nap_time_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
