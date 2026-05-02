<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_wellness_score_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="wellness-score-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Wellness Score Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_sleep_score"><?php esc_html_e('Sleep Quality (1–10)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_sleep_score" name="sleep_score" placeholder="<?php esc_attr_e('e.g. 7', 'vitalhealth-tools'); ?>" min="1" max="10">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_nutrition_score"><?php esc_html_e('Nutrition Quality (1–10)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_nutrition_score" name="nutrition_score" placeholder="<?php esc_attr_e('e.g. 6', 'vitalhealth-tools'); ?>" min="1" max="10">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_exercise_score"><?php esc_html_e('Exercise Consistency (1–10)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_exercise_score" name="exercise_score" placeholder="<?php esc_attr_e('e.g. 5', 'vitalhealth-tools'); ?>" min="1" max="10">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_stress_score"><?php esc_html_e('Stress Management (1–10)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_stress_score" name="stress_score" placeholder="<?php esc_attr_e('e.g. 6', 'vitalhealth-tools'); ?>" min="1" max="10">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_mindfulness_score"><?php esc_html_e('Mental Wellbeing (1–10)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_mindfulness_score" name="mindfulness_score" placeholder="<?php esc_attr_e('e.g. 7', 'vitalhealth-tools'); ?>" min="1" max="10">
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_wellness_score_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
