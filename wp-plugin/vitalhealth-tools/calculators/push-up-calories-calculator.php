<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_push_up_calories_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="push-up-calories-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Push-Up Calories Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_weight_kg"><?php esc_html_e('Body Weight (kg)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_weight_kg" name="weight_kg" placeholder="<?php esc_attr_e('e.g. 70', 'vitalhealth-tools'); ?>" min="30" max="200">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_reps"><?php esc_html_e('Number of Push-Ups', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_reps" name="reps" placeholder="<?php esc_attr_e('e.g. 50', 'vitalhealth-tools'); ?>" min="1" max="500">
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_push_up_calories_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
