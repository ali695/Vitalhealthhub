<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_desk_break_reminder_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="desk-break-reminder-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Desk Break Reminder Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_sitting_hours"><?php esc_html_e('Hours at Desk Per Day', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_sitting_hours" name="sitting_hours" placeholder="<?php esc_attr_e('e.g. 8', 'vitalhealth-tools'); ?>" min="1" max="24">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_risk_level"><?php esc_html_e('Back/Neck Discomfort', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_risk_level" name="risk_level">
            <option value="<?php echo esc_attr('none'); ?>"><?php esc_html_e('None', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('mild'); ?>"><?php esc_html_e('Mild', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('moderate'); ?>"><?php esc_html_e('Moderate', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('severe'); ?>"><?php esc_html_e('Severe', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_desk_break_reminder_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
