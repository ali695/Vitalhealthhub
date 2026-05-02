<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_pms_symptom_tracker_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="pms-symptom-tracker">
    <h3 class="vht-calc-title"><?php esc_html_e('PMS Symptom Tracker Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_mood_swings"><?php esc_html_e('Mood Swings (0–3)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_mood_swings" name="mood_swings" placeholder="<?php esc_attr_e('0', 'vitalhealth-tools'); ?>" min="0" max="3">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_bloating"><?php esc_html_e('Bloating (0–3)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_bloating" name="bloating" placeholder="<?php esc_attr_e('0', 'vitalhealth-tools'); ?>" min="0" max="3">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_cramps"><?php esc_html_e('Cramps (0–3)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_cramps" name="cramps" placeholder="<?php esc_attr_e('0', 'vitalhealth-tools'); ?>" min="0" max="3">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_fatigue"><?php esc_html_e('Fatigue (0–3)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_fatigue" name="fatigue" placeholder="<?php esc_attr_e('0', 'vitalhealth-tools'); ?>" min="0" max="3">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_headaches"><?php esc_html_e('Headaches (0–3)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_headaches" name="headaches" placeholder="<?php esc_attr_e('0', 'vitalhealth-tools'); ?>" min="0" max="3">
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_pms_symptom_tracker('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
