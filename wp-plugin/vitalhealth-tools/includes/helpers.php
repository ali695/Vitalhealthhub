<?php
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Get or create a WordPress Page by slug.
 * Safe to run multiple times — updates if already exists.
 */
function vh_get_or_create_page( $args ) {
    $slug     = sanitize_title( $args['slug'] );
    $existing = get_page_by_path( $slug, OBJECT, 'page' );

    $page_data = [
        'post_title'     => sanitize_text_field( $args['title'] ),
        'post_name'      => $slug,
        'post_content'   => wp_kses_post( $args['content'] ?? '' ),
        'post_status'    => 'publish',
        'post_type'      => 'page',
        'post_author'    => 1,
        'comment_status' => 'closed',
    ];

    if ( $existing ) {
        $page_data['ID'] = $existing->ID;
        $post_id = wp_update_post( $page_data );
    } else {
        $post_id = wp_insert_post( $page_data );
    }

    if ( is_wp_error( $post_id ) ) return false;

    if ( ! empty( $args['seo_title'] ) ) {
        vh_update_rank_math_meta( $post_id, $args['seo_title'], $args['seo_desc'] ?? '', $args['focus_keyword'] ?? '' );
    }

    return $post_id;
}

/**
 * Get or create a WordPress Post by slug.
 */
function vh_get_or_create_post( $args ) {
    $slug     = sanitize_title( $args['slug'] );
    $existing = get_page_by_path( $slug, OBJECT, 'post' );

    $post_data = [
        'post_title'     => sanitize_text_field( $args['title'] ),
        'post_name'      => $slug,
        'post_content'   => wp_kses_post( $args['content'] ?? '' ),
        'post_excerpt'   => sanitize_textarea_field( $args['excerpt'] ?? '' ),
        'post_status'    => 'publish',
        'post_type'      => 'post',
        'post_author'    => 1,
        'post_date'      => $args['date'] ?? current_time( 'mysql' ),
        'comment_status' => 'open',
    ];

    if ( $existing ) {
        $post_data['ID'] = $existing->ID;
        $post_id = wp_update_post( $post_data );
    } else {
        $post_id = wp_insert_post( $post_data );
    }

    if ( is_wp_error( $post_id ) ) return false;

    if ( ! empty( $args['category'] ) ) {
        vh_assign_category( $post_id, $args['category'] );
    }

    if ( ! empty( $args['seo_title'] ) ) {
        vh_update_rank_math_meta( $post_id, $args['seo_title'], $args['seo_desc'] ?? '', $args['focus_keyword'] ?? '' );
    }

    return $post_id;
}

/**
 * Update Rank Math SEO meta fields.
 */
function vh_update_rank_math_meta( $post_id, $title, $desc, $keyword = '' ) {
    update_post_meta( $post_id, 'rank_math_title',         sanitize_text_field( $title ) );
    update_post_meta( $post_id, 'rank_math_description',   sanitize_textarea_field( $desc ) );
    if ( $keyword ) {
        update_post_meta( $post_id, 'rank_math_focus_keyword', sanitize_text_field( $keyword ) );
    }
    update_post_meta( $post_id, 'rank_math_robots', [ 'index', 'follow' ] );
}

/**
 * Assign a category to a post by name (creates if not existing).
 */
function vh_assign_category( $post_id, $category_name ) {
    $term = get_term_by( 'name', $category_name, 'category' );
    if ( ! $term ) {
        $result = wp_insert_term( $category_name, 'category' );
        if ( is_wp_error( $result ) ) return;
        $term_id = $result['term_id'];
    } else {
        $term_id = $term->term_id;
    }
    wp_set_post_categories( $post_id, [ $term_id ], false );
}

/**
 * Create all required blog categories on plugin activation.
 */
function vht_create_blog_categories() {
    $categories = [
        'Health Calculators',
        'Nutrition',
        'Fitness',
        'Pregnancy & Baby',
        'Sleep',
        'Mental Wellness',
        'Lifestyle',
        'Preventive Health',
        'Wellness Guides',
    ];
    foreach ( $categories as $cat ) {
        if ( ! get_term_by( 'name', $cat, 'category' ) ) {
            wp_insert_term( $cat, 'category' );
        }
    }
}

/**
 * Build a standard FAQ section HTML.
 */
function vht_build_faq_html( $faqs ) {
    if ( empty( $faqs ) ) return '';
    $html  = '<div class="vht-faq">';
    $html .= '<h2>Frequently Asked Questions</h2>';
    foreach ( $faqs as $faq ) {
        $html .= '<div class="vht-faq-item">';
        $html .= '<h3 class="vht-faq-q">' . esc_html( $faq['q'] ) . '</h3>';
        $html .= '<p class="vht-faq-a">' . wp_kses_post( $faq['a'] ) . '</p>';
        $html .= '</div>';
    }
    $html .= '</div>';
    return $html;
}

/**
 * Standard medical disclaimer block.
 */
function vht_disclaimer() {
    return '<div class="vht-disclaimer">'
        . '<p><strong>⚕️ Medical Disclaimer:</strong> This tool is for informational and educational purposes only. '
        . 'It is not a substitute for professional medical advice, diagnosis, or treatment. '
        . 'Always consult a qualified healthcare provider before making changes to your health routine.</p>'
        . '</div>';
}

/**
 * Build related calculators HTML from an array of slugs.
 */
function vht_related_calculators_html( $slugs ) {
    if ( empty( $slugs ) ) return '';
    $html = '<div class="vht-related"><h3>Related Calculators</h3><ul>';
    foreach ( $slugs as $slug ) {
        $page = get_page_by_path( sanitize_title( $slug ), OBJECT, 'page' );
        if ( $page ) {
            $html .= '<li><a href="' . esc_url( get_permalink( $page->ID ) ) . '">' . esc_html( get_the_title( $page->ID ) ) . '</a></li>';
        }
    }
    $html .= '</ul></div>';
    return $html;
}
