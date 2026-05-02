<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_mindfulness_minutes_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="mindfulness-minutes-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Mindfulness Minutes Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_stress_level"><?php esc_html_e('Stress Level (1–10)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_stress_level" name="stress_level" placeholder="<?php esc_attr_e('e.g. 6', 'vitalhealth-tools'); ?>" min="1" max="10">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_experience"><?php esc_html_e('Meditation Experience', 'vitalhealth-tools'); ?></label>
            <select id="<?php echo esc_attr($uid); ?>_experience" name="experience">
            <option value="<?php echo esc_attr('beginner'); ?>"><?php esc_html_e('Beginner', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('intermediate'); ?>"><?php esc_html_e('Intermediate', 'vitalhealth-tools'); ?></option>
            <option value="<?php echo esc_attr('advanced'); ?>"><?php esc_html_e('Advanced', 'vitalhealth-tools'); ?></option>
            </select>
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_mindfulness_minutes_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
