<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_heart_health_lifestyle_score_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="heart-health-lifestyle-score">
    <h3 class="vht-calc-title"><?php esc_html_e('Heart Health Lifestyle Score', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_exercise_days"><?php esc_html_e('Exercise Days Per Week', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_exercise_days" name="exercise_days" placeholder="<?php esc_attr_e('e.g. 3', 'vitalhealth-tools'); ?>" min="0" max="7">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_fruit_veg"><?php esc_html_e('Fruit & Veg Portions Per Day', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_fruit_veg" name="fruit_veg" placeholder="<?php esc_attr_e('e.g. 4', 'vitalhealth-tools'); ?>" min="0" max="15">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_smoking"><?php esc_html_e('Do You Smoke?', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_smoking" name="smoking">
            <option value="<?php echo esc_attr('no'); ?>"><?php esc_html_e('No', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('occasional'); ?>"><?php esc_html_e('Occasionally', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('yes'); ?>"><?php esc_html_e('Yes, daily', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_stress"><?php esc_html_e('Stress Level (1–10)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_stress" name="stress" placeholder="<?php esc_attr_e('e.g. 5', 'vitalhealth-tools'); ?>" min="1" max="10">
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_heart_health_lifestyle_score('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
