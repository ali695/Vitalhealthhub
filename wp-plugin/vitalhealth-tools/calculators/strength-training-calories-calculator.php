<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_strength_training_calories_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="strength-training-calories-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Strength Training Calories Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_weight_kg"><?php esc_html_e('Body Weight (kg)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_weight_kg" name="weight_kg" placeholder="<?php esc_attr_e('e.g. 70', 'vitalhealth-tools'); ?>" min="30" max="200">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_duration_min"><?php esc_html_e('Session Duration (minutes)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_duration_min" name="duration_min" placeholder="<?php esc_attr_e('e.g. 60', 'vitalhealth-tools'); ?>" min="10" max="180">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_intensity"><?php esc_html_e('Intensity', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_intensity" name="intensity">
            <option value="<?php echo esc_attr('light'); ?>"><?php esc_html_e('Light', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('moderate'); ?>"><?php esc_html_e('Moderate', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('heavy'); ?>"><?php esc_html_e('Heavy', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_strength_training_calories_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
