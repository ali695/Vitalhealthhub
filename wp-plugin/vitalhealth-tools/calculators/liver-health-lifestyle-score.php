<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_liver_health_lifestyle_score_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="liver-health-lifestyle-score">
    <h3 class="vht-calc-title"><?php esc_html_e('Liver Health Lifestyle Score', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_alcohol_units"><?php esc_html_e('Alcohol Units Per Week', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_alcohol_units" name="alcohol_units" placeholder="<?php esc_attr_e('e.g. 10', 'vitalhealth-tools'); ?>" min="0" max="100">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_bmi"><?php esc_html_e('Your BMI', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_bmi" name="bmi" placeholder="<?php esc_attr_e('e.g. 24', 'vitalhealth-tools'); ?>" min="10" max="60">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_exercise_days"><?php esc_html_e('Exercise Days Per Week', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_exercise_days" name="exercise_days" placeholder="<?php esc_attr_e('e.g. 3', 'vitalhealth-tools'); ?>" min="0" max="7">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_diet_quality"><?php esc_html_e('Diet Quality', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_diet_quality" name="diet_quality">
            <option value="<?php echo esc_attr('poor'); ?>"><?php esc_html_e('Poor', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('average'); ?>"><?php esc_html_e('Average', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('good'); ?>"><?php esc_html_e('Good', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('excellent'); ?>"><?php esc_html_e('Excellent', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_liver_health_lifestyle_score('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
