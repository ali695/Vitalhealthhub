<?php
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Import or update all 50 calculator pages.
 * Safe to run multiple times — updates existing, creates missing.
 */
function vht_import_all_calculators() {
    $registry = vht_get_calculator_registry();

    // Ensure parent /calculators/ page exists
    $parent = get_page_by_path( 'calculators', OBJECT, 'page' );
    if ( ! $parent ) {
        $parent_id = wp_insert_post( [
            'post_title'  => 'Health Calculators',
            'post_name'   => 'calculators',
            'post_status' => 'publish',
            'post_type'   => 'page',
            'post_author' => 1,
            'post_content'=> '<p>Browse our full library of free, evidence-based health calculators. From BMI and calorie tracking to heart rate zones and sleep cycles — every tool is free, instant, and requires no sign-up.</p>',
        ] );
        vh_update_rank_math_meta(
            $parent_id,
            'Free Health Calculators — 50+ Tools | VitalHealth Hub',
            'Browse 50+ free health calculators covering BMI, calories, sleep, heart rate, hydration, and more. Evidence-based results, instantly.',
            'free health calculators'
        );
    } else {
        $parent_id = $parent->ID;
    }

    foreach ( $registry as $calc ) {
        vht_create_calculator_page( $calc, $parent_id );
    }
}

/**
 * Create or update a single calculator page.
 */
function vht_create_calculator_page( $calc, $parent_id = 0 ) {
    $slug    = sanitize_title( $calc['slug'] );
    $content = vht_build_calculator_page_content( $calc );

    $existing = get_page_by_path( $slug, OBJECT, 'page' );
    $page_data = [
        'post_title'   => sanitize_text_field( $calc['title'] ),
        'post_name'    => $slug,
        'post_content' => wp_kses_post( $content ),
        'post_status'  => 'publish',
        'post_type'    => 'page',
        'post_author'  => 1,
        'post_parent'  => (int) $parent_id,
        'comment_status' => 'closed',
    ];

    if ( $existing ) {
        $page_data['ID'] = $existing->ID;
        $post_id = wp_update_post( $page_data );
    } else {
        $post_id = wp_insert_post( $page_data );
    }

    if ( is_wp_error( $post_id ) || ! $post_id ) return false;

    // SEO meta
    vh_update_rank_math_meta(
        $post_id,
        $calc['seo_title'],
        $calc['seo_desc'],
        $calc['focus_keyword']
    );

    // Mark as VHT calculator
    update_post_meta( $post_id, '_vht_calculator_id', sanitize_key( $calc['id'] ) );
    update_post_meta( $post_id, '_vht_related_calcs', array_map( 'sanitize_key', $calc['related'] ?? [] ) );

    return $post_id;
}

/**
 * Build the full HTML content for a calculator page.
 */
function vht_build_calculator_page_content( $calc ) {
    $id      = esc_attr( $calc['id'] );
    $title   = esc_html( $calc['title'] );
    $related = $calc['related'] ?? [];

    $intro = vht_get_calculator_intro( $calc );
    $faq   = vht_get_calculator_faq( $calc );

    $related_html = '';
    if ( ! empty( $related ) ) {
        $related_html = '<div class="vht-related"><h2>Related Calculators</h2><ul>';
        foreach ( $related as $r_slug ) {
            $rpage = get_page_by_path( sanitize_title( $r_slug ), OBJECT, 'page' );
            if ( $rpage ) {
                $related_html .= '<li><a href="' . esc_url( get_permalink( $rpage->ID ) ) . '">' . esc_html( get_the_title( $rpage->ID ) ) . '</a></li>';
            } else {
                // Page not imported yet — use slug as placeholder
                $related_html .= '<li><a href="/calculators/' . esc_attr( $r_slug ) . '/">' . esc_html( ucwords( str_replace( '-', ' ', $r_slug ) ) ) . '</a></li>';
            }
        }
        $related_html .= '</ul></div>';
    }

    $faq_schema = vht_faq_schema_html( $faq );
    $faq_html   = vht_build_faq_html( $faq );
    $disclaimer = vht_disclaimer();

    return <<<HTML
{$intro}

[vh_calculator id="{$id}"]

<div class="vht-how-it-works">
<h2>How This Calculator Works</h2>
<p>This calculator uses evidence-based formulas referenced by leading health organisations including the WHO, NIH, and NHS. Simply enter your details above and receive instant, personalised results. No sign-up, no cost — ever.</p>
<p>All calculations are performed locally in your browser. No personal data is stored or transmitted.</p>
</div>

<div class="vht-understanding-results">
<h2>Understanding Your Results</h2>
<p>Your result gives you a personalised baseline to work from. Use it as a starting point alongside guidance from a qualified healthcare professional, especially if you have existing health conditions.</p>
<p>For the most accurate results, use accurate measurements and re-check periodically as your body and lifestyle change.</p>
</div>

<div class="vht-tips">
<h2>Helpful Tips</h2>
<ul>
<li>Use consistent measurement units (metric or imperial) throughout.</li>
<li>Re-calculate every 4–8 weeks as your body composition or goals change.</li>
<li>Combine your results with a balanced diet, regular physical activity, and adequate sleep.</li>
<li>Always consult a healthcare professional for personalised medical guidance.</li>
</ul>
</div>

{$related_html}

{$faq_html}
{$faq_schema}

{$disclaimer}
HTML;
}

/**
 * Returns a short intro paragraph tailored to each calculator's category.
 */
function vht_get_calculator_intro( $calc ) {
    $title    = esc_html( $calc['title'] );
    $category = $calc['category'] ?? 'Health';
    $intros   = [
        'Nutrition'         => "Good nutrition starts with understanding your personal numbers. The <strong>{$title}</strong> gives you evidence-based dietary targets tailored to your age, sex, weight, and activity level — so you can eat smarter, not harder.",
        'Fitness'           => "Whether you are training for a goal or simply staying active, the <strong>{$title}</strong> gives you instant, personalised insights based on your weight, activity type, and duration. No guesswork — just data.",
        'Sleep'             => "Quality sleep is the foundation of good health. The <strong>{$title}</strong> uses established sleep science to help you optimise your rest, feel more refreshed, and support your body's natural recovery cycles.",
        'Mental Wellness'   => "Mental wellbeing is just as important as physical health. The <strong>{$title}</strong> helps you understand and manage a key aspect of your mental wellness with a simple, evidence-informed assessment.",
        'Lifestyle'         => "Small lifestyle changes have a big impact over time. Use the <strong>{$title}</strong> to understand where you stand and get actionable, data-driven recommendations for a healthier day-to-day life.",
        'Pregnancy & Baby'  => "Pregnancy and early parenthood come with many questions. The <strong>{$title}</strong> uses trusted clinical guidelines to give you clear, reassuring answers — always with a reminder to check in with your healthcare provider.",
        'Preventive Health' => "Prevention is always better than cure. The <strong>{$title}</strong> helps you identify risk factors early so you can take proactive steps toward long-term health — supported by your doctor when needed.",
        'Wellness Guides'   => "Your overall wellbeing depends on many interconnected factors. The <strong>{$title}</strong> gives you a holistic snapshot so you can focus your energy where it matters most.",
    ];
    $intro = $intros[ $category ] ?? "The <strong>{$title}</strong> is a free, evidence-based tool designed to give you personalised health insights in seconds. No sign-up required.";
    return '<p class="vht-intro">' . $intro . '</p>';
}

/**
 * Returns 5 FAQ items appropriate for the calculator's category.
 */
function vht_get_calculator_faq( $calc ) {
    $title = $calc['title'];
    return [
        [
            'q' => "How accurate is the {$title}?",
            'a' => "This calculator uses validated formulas based on peer-reviewed research and guidelines from organisations including the WHO, NIH, and NHS. Results are accurate for the average healthy adult. Individual variation exists — always use your result as a starting point, not a clinical diagnosis.",
        ],
        [
            'q' => 'Do I need to create an account to use this calculator?',
            'a' => 'No. All VitalHealth Hub calculators are completely free and require no registration, no email address, and no personal data submission. Your entries are processed locally in your browser.',
        ],
        [
            'q' => 'How often should I recalculate?',
            'a' => 'We recommend recalculating every 4–8 weeks, or whenever your weight, activity level, or health goals change significantly. Regular reassessment helps you stay on track.',
        ],
        [
            'q' => 'Can I use these results with my doctor?',
            'a' => 'Yes — sharing your calculator results with your doctor or dietitian is a great idea. They can help you interpret the numbers in the context of your full health picture and personal history.',
        ],
        [
            'q' => 'Is this a medical tool?',
            'a' => 'No. This calculator is an educational and informational resource only. It does not diagnose, treat, or replace professional medical advice. If you have a medical condition, please consult a qualified healthcare provider.',
        ],
    ];
}
