<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_stress_recovery_time_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="stress-recovery-time-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Stress Recovery Time Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_stress_level"><?php esc_html_e('Current Stress Level (1–10)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_stress_level" name="stress_level" placeholder="<?php esc_attr_e('e.g. 7', 'vitalhealth-tools'); ?>" min="1" max="10">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_sleep_hours"><?php esc_html_e('Average Sleep (hours/night)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_sleep_hours" name="sleep_hours" placeholder="<?php esc_attr_e('e.g. 6', 'vitalhealth-tools'); ?>" min="2" max="12">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_exercise"><?php esc_html_e('Weekly Exercise', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_exercise" name="exercise">
            <option value="<?php echo esc_attr('none'); ?>"><?php esc_html_e('None', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('light'); ?>"><?php esc_html_e('1–2 days', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('moderate'); ?>"><?php esc_html_e('3–4 days', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('high'); ?>"><?php esc_html_e('5+ days', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_stress_recovery_time_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
