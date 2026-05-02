<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_posture_risk_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="posture-risk-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Posture Risk Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_sitting_hours"><?php esc_html_e('Hours Sitting Per Day', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_sitting_hours" name="sitting_hours" placeholder="<?php esc_attr_e('e.g. 8', 'vitalhealth-tools'); ?>" min="0" max="24">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_screen_hours"><?php esc_html_e('Screen Hours Per Day', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_screen_hours" name="screen_hours" placeholder="<?php esc_attr_e('e.g. 6', 'vitalhealth-tools'); ?>" min="0" max="24">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_exercise_days"><?php esc_html_e('Exercise Days Per Week', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_exercise_days" name="exercise_days" placeholder="<?php esc_attr_e('e.g. 3', 'vitalhealth-tools'); ?>" min="0" max="7">
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_posture_risk_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
