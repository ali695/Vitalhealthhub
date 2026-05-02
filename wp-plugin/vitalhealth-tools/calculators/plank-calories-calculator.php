<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_plank_calories_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="plank-calories-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Plank Calories Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_weight_kg"><?php esc_html_e('Body Weight (kg)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_weight_kg" name="weight_kg" placeholder="<?php esc_attr_e('e.g. 70', 'vitalhealth-tools'); ?>" min="30" max="200">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_duration_sec"><?php esc_html_e('Plank Hold Duration (seconds)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_duration_sec" name="duration_sec" placeholder="<?php esc_attr_e('e.g. 60', 'vitalhealth-tools'); ?>" min="5" max="600">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_sets"><?php esc_html_e('Number of Sets', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_sets" name="sets" placeholder="<?php esc_attr_e('e.g. 3', 'vitalhealth-tools'); ?>" min="1" max="20">
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_plank_calories_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
