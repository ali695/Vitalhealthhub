<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_insulin_resistance_risk_estimator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="insulin-resistance-risk-estimator">
    <h3 class="vht-calc-title"><?php esc_html_e('Insulin Resistance Risk Estimator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_waist_cm"><?php esc_html_e('Waist Circumference (cm)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_waist_cm" name="waist_cm" placeholder="<?php esc_attr_e('e.g. 90', 'vitalhealth-tools'); ?>" min="40" max="200">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_activity"><?php esc_html_e('Physical Activity', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_activity" name="activity">
            <option value="<?php echo esc_attr('sedentary'); ?>"><?php esc_html_e('Sedentary', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('light'); ?>"><?php esc_html_e('Light', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('moderate'); ?>"><?php esc_html_e('Moderate', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('active'); ?>"><?php esc_html_e('Active', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_sugar_drinks"><?php esc_html_e('Sugary Drinks Per Day', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_sugar_drinks" name="sugar_drinks">
            <option value="<?php echo esc_attr('0'); ?>"><?php esc_html_e('None', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('1'); ?>"><?php esc_html_e('1', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('2'); ?>"><?php esc_html_e('2', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('3plus'); ?>"><?php esc_html_e('3 or more', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_insulin_resistance_risk_estimator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
