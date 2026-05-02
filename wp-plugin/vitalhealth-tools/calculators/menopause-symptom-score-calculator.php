<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$uid = 'vht_menopause_symptom_score_calculator_' . uniqid();
?>
<div class="vht-calculator" id="<?php echo esc_attr($uid); ?>" data-calculator="menopause-symptom-score-calculator">
    <h3 class="vht-calc-title"><?php esc_html_e('Menopause Symptom Score Calculator', 'vitalhealth-tools'); ?></h3>
    <form class="vht-calc-form" onsubmit="return false;">
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_hot_flushes"><?php esc_html_e('Hot Flushes (0–3)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_hot_flushes" name="hot_flushes" placeholder="<?php esc_attr_e('0', 'vitalhealth-tools'); ?>" min="0" max="3">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_sleep_problems"><?php esc_html_e('Sleep Problems (0–3)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_sleep_problems" name="sleep_problems" placeholder="<?php esc_attr_e('0', 'vitalhealth-tools'); ?>" min="0" max="3">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_mood_changes"><?php esc_html_e('Mood Changes (0–3)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_mood_changes" name="mood_changes" placeholder="<?php esc_attr_e('0', 'vitalhealth-tools'); ?>" min="0" max="3">
        </div>
        <div class="vht-field">
            <label for="<?php echo esc_attr($uid); ?>_physical_exhaustion"><?php esc_html_e('Physical Exhaustion (0–3)', 'vitalhealth-tools'); ?></label>
            <input type="number" id="<?php echo esc_attr($uid); ?>_physical_exhaustion" name="physical_exhaustion" placeholder="<?php esc_attr_e('0', 'vitalhealth-tools'); ?>" min="0" max="3">
        </div>
        <button type="button" class="vht-btn-calculate" onclick="vht_calc_menopause_symptom_score_calculator('<?php echo esc_js($uid); ?>')"><?php esc_html_e('Calculate', 'vitalhealth-tools'); ?></button>
    </form>
    <div class="vht-result" id="<?php echo esc_attr($uid); ?>_result" style="display:none;"></div>
    <p class="vht-disclaimer"><?php esc_html_e('This calculator provides general health information only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-tools'); ?></p>
</div>
