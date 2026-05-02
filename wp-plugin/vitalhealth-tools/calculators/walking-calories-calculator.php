<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_walking_calories_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="walking-calories-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Walking Calories Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_weight_kg"><?php esc_html_e('Body Weight (kg)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_weight_kg" name="weight_kg" placeholder="<?php esc_attr_e('e.g. 70', 'vitalhealth-tools'); ?>" min="30" max="200">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_distance_km"><?php esc_html_e('Distance (km)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_distance_km" name="distance_km" placeholder="<?php esc_attr_e('e.g. 5', 'vitalhealth-tools'); ?>" min="0.1" max="100">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_speed"><?php esc_html_e('Walking Speed', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_speed" name="speed">
            <option value="<?php echo esc_attr('slow'); ?>"><?php esc_html_e('Slow (3 km/h)', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('moderate'); ?>"><?php esc_html_e('Moderate (5 km/h)', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('brisk'); ?>"><?php esc_html_e('Brisk (6.5 km/h)', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('fast'); ?>"><?php esc_html_e('Fast (8 km/h)', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_walking_calories_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
