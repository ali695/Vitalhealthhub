<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_hiit_calories_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="hiit-calories-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('HIIT Calories Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_weight_kg"><?php esc_html_e('Body Weight (kg)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_weight_kg" name="weight_kg" placeholder="<?php esc_attr_e('e.g. 70', 'vitalhealth-tools'); ?>" min="30" max="200">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_duration_min"><?php esc_html_e('HIIT Duration (minutes)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_duration_min" name="duration_min" placeholder="<?php esc_attr_e('e.g. 30', 'vitalhealth-tools'); ?>" min="5" max="120">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_intensity"><?php esc_html_e('Intensity Level', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_intensity" name="intensity">
            <option value="<?php echo esc_attr('moderate'); ?>"><?php esc_html_e('Moderate', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('high'); ?>"><?php esc_html_e('High', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('extreme'); ?>"><?php esc_html_e('Extreme', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_hiit_calories_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
