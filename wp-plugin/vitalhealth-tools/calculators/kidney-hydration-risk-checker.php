<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_kidney_hydration_risk_checker_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="kidney-hydration-risk-checker">
    <h3 class="vht-calc-title"><?php esc_html_e('Kidney Hydration Risk Checker', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_water_litres"><?php esc_html_e('Daily Water Intake (litres)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_water_litres" name="water_litres" placeholder="<?php esc_attr_e('e.g. 1.5', 'vitalhealth-tools'); ?>" min="0" max="10">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_urine_colour"><?php esc_html_e('Urine Colour', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_urine_colour" name="urine_colour">
            <option value="<?php echo esc_attr('pale_yellow'); ?>"><?php esc_html_e('Pale Yellow (ideal)', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('yellow'); ?>"><?php esc_html_e('Yellow', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('dark_yellow'); ?>"><?php esc_html_e('Dark Yellow', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('amber'); ?>"><?php esc_html_e('Amber or Brown', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_activity"><?php esc_html_e('Activity Level', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_activity" name="activity">
            <option value="<?php echo esc_attr('sedentary'); ?>"><?php esc_html_e('Sedentary', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('moderate'); ?>"><?php esc_html_e('Moderate', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('active'); ?>"><?php esc_html_e('Very Active', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_kidney_hydration_risk_checker('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
